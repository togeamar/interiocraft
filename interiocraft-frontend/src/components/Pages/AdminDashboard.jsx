import { useState, useEffect } from 'react';
import { Container, Row, Col, Nav, Tab, Table, Button, Modal, Form, Badge, Card } from 'react-bootstrap';
import client from '../../services/client';
import { API_BASE_URL } from '../../constants/ApiConstants';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [designers, setDesigners] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'projects') {
      fetchProjects();
    } else if (activeTab === 'designers') {
      fetchDesigners();
    } else if (activeTab === 'customers') {
      fetchCustomers();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await client.get(`${API_BASE_URL}/Project/projects`);
      console.log('Fetched projects:', response.data);
      console.log('Sample project structure:', response.data?.[0]);
      setProjects(response.data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDesigners = async () => {
    try {
      const response = await client.get(`${API_BASE_URL}/Admin/designers`);
      setDesigners(response.data || []);
    } catch (error) {
      console.error('Error fetching designers:', error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await client.get(`${API_BASE_URL}/customer/all`);
      setCustomers(response.data || []);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editingDesigner, setEditingDesigner] = useState(null);

  const [projectFormData, setProjectFormData] = useState({ 
    projectName: '', 
    designerId: '', 
    location: '', 
    budget: '', 
    projectType: '', 
    areaSqft: '', 
    address: '', 
    city: '', 
    state: '',
    customerName: '' 
  });
  const [designerFormData, setDesignerFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', experienceYears: '' });

  const getStatusBadge = (status) => {
    const variants = { 'REQUESTED': 'warning', 'ONGOING': 'primary', 'COMPLETED': 'success', 'CANCELLED': 'danger' };
    return <Badge bg={variants[status]}>{status.replace('ONGOING', 'IN PROGRESS')}</Badge>;
  };

  const handleStatusUpdate = async (projectId, newStatus) => {
    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) {
        console.error('Project not found:', projectId);
        return;
      }

      console.log('Project data:', project);
      console.log('Updating project status to:', newStatus);

      const updateData = {
        projectName: project.projectName,
        designerId: project.designerId || null,
        location: project.location,
        budget: Number(project.budget),
        projectStatus: newStatus,
        projectType: project.projectType,
        areaSqft: Number(project.areaSqft),
        address: project.address,
        city: project.city,
        state: project.state
      };

      // Only add customerId if it exists
      if (project.customerId) {
        updateData.customerId = project.customerId;
      }

      console.log('Update payload:', updateData);

      const response = await client.put(`${API_BASE_URL}/Project/${projectId}`, updateData);
      console.log('Update response:', response);
      
      await fetchProjects();
    } catch (error) {
      console.error('Error updating project status:', error);
      console.error('Error details:', error.response?.data);
      alert(`Failed to update project status: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      if (editingProject) {
          // Update existing project
          const projectData = {
            projectName: projectFormData.projectName,
            designerId: parseInt(projectFormData.designerId) || null,
            location: projectFormData.location,
            budget: parseFloat(projectFormData.budget),
            projectType: projectFormData.projectType,
            areaSqft: parseFloat(projectFormData.areaSqft),
            address: projectFormData.address,
            city: projectFormData.city,
            state: projectFormData.state,
            projectStatus: editingProject.projectStatus // Keep existing status
          };
          await client.put(`${API_BASE_URL}/Project/${editingProject.id}`, projectData);
      } else {
          // Create new project
          const formData = new FormData();
          const projectData = {
            projectName: projectFormData.projectName,
            designerId: parseInt(projectFormData.designerId) || null,
            location: projectFormData.location,
            budget: parseFloat(projectFormData.budget),
            projectType: projectFormData.projectType,
            areaSqft: parseFloat(projectFormData.areaSqft),
            address: projectFormData.address,
            city: projectFormData.city,
            state: projectFormData.state,
            projectStatus: 'REQUESTED'
          };
          
          formData.append('project', new Blob([JSON.stringify(projectData)], { type: 'application/json' }));
          const customerEmail = projectFormData.customerName; 

          await client.post(`${API_BASE_URL}/Project/addProject/${customerEmail}`, formData, {
              headers: { 'Content-Type': 'multipart/form-data' }
          });
      }

      await fetchProjects();
      setShowProjectModal(false);
      setEditingProject(null);
      setProjectFormData({ 
        projectName: '', 
        designerId: '', 
        location: '', 
        budget: '', 
        projectType: '', 
        areaSqft: '', 
        address: '', 
        city: '', 
        state: '',
        customerName: ''
      });
    } catch (error) {
      console.error('Error saving project:', error);
      alert('Error saving project. Please check your inputs.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (project) => {
      setEditingProject(project);
      setProjectFormData({
        projectName: project.projectName,
        designerId: project.designerId || '',
        location: project.location,
        budget: project.budget,
        projectType: project.projectType,
        areaSqft: project.areaSqft,
        address: project.address,
        city: project.city,
        state: project.state,
        customerName: project.customerName // Note: This is name, not email. Edit might fail if we need email for update? 
        // Actually updateProject endpoint uses ID, so we don't need customer email for update.
      });
      setShowProjectModal(true);
  };

  const handleDeleteProject = async (id) => {
      if (window.confirm('Are you sure you want to delete this project?')) {
          try {
              await client.delete(`${API_BASE_URL}/Project/${id}`);
              fetchProjects();
          } catch (error) {
              console.error('Error deleting project:', error);
          }
      }
  };

  const handleDesignerSubmit = async (e) => {
    e.preventDefault();
    try {
        const designerData = {
            fullName: `${designerFormData.firstName} ${designerFormData.lastName}`,
            email: designerFormData.email,
            phoneNumber: designerFormData.phoneNumber,
            experienceYears: parseInt(designerFormData.experienceYears)
        };

        if (editingDesigner) {
            await client.put(`${API_BASE_URL}/Admin/designer/${editingDesigner.id}`, designerData);
        } else {
            await client.post(`${API_BASE_URL}/Admin/AddDesigner`, designerData);
        }
        
        await fetchDesigners();
        setShowDesignerModal(false);
        setEditingDesigner(null);
        setDesignerFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', experienceYears: '' });
    } catch (error) {
        console.error("Error saving designer", error);
        alert("Error saving designer.");
    }
  };

  const handleEditDesigner = (designer) => {
      setEditingDesigner(designer);
      const [firstName, ...lastNameParts] = designer.fullName.split(' ');
      setDesignerFormData({
          firstName: firstName,
          lastName: lastNameParts.join(' '),
          email: designer.email,
          phoneNumber: designer.phoneNumber,
          experienceYears: designer.experienceYears
      });
      setShowDesignerModal(true);
  };

  const handleDeleteDesigner = async (id) => {
      if (window.confirm('Are you sure you want to delete this designer?')) {
          try {
              await client.delete(`${API_BASE_URL}/Admin/designer/${id}`);
              fetchDesigners();
          } catch (error) {
              console.error('Error deleting designer:', error);
          }
      }
  };

  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerFormData, setCustomerFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '' });

  const handleCustomerSubmit = async (e) => {
    e.preventDefault();
    try {
        if (editingCustomer) {
            // Update
            const updateData = {
                firstName: customerFormData.firstName,
                lastName: customerFormData.lastName,
                email: customerFormData.email,
                phoneNumber: customerFormData.phoneNumber
            };
            await client.put(`${API_BASE_URL}/customer/${editingCustomer.id}`, updateData);
        } else {
            // Create
            const createData = {
                firstName: customerFormData.firstName,
                lastname: customerFormData.lastName, // Note: DTO uses 'lastname' (lowercase n)
                email: customerFormData.email,
                phoneNumber: customerFormData.phoneNumber,
                password: customerFormData.password
            };
            await client.post(`${API_BASE_URL}/customer/signup`, createData);
        }
        await fetchCustomers();
        setShowCustomerModal(false);
        setEditingCustomer(null);
        setCustomerFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '' });
    } catch (error) {
        console.error("Error saving customer", error);
        alert("Error saving customer. Please check your inputs.");
    }
  };

  const handleEditCustomer = (customer) => {
      setEditingCustomer(customer);
      setCustomerFormData({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email,
          phoneNumber: customer.phoneNumber,
          password: '' // Password not needed for update
      });
      setShowCustomerModal(true);
  };

  const handleDeleteCustomer = async (id) => {
      if (window.confirm('Are you sure you want to delete this customer?')) {
          try {
              await client.delete(`${API_BASE_URL}/customer/${id}`);
              fetchCustomers();
          } catch (error) {
              console.error('Error deleting customer:', error);
          }
      }
  };

  const ProjectManagement = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ color: 'var(--primary-color)' }}>Project Management</h4>
        <Button style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => { setEditingProject(null); setProjectFormData({ projectName: '', designerId: '', location: '', budget: '', projectType: '', areaSqft: '', address: '', city: '', state: '', customerName: '' }); setShowProjectModal(true); }}>Add Project</Button>
      </div>
      
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center" onClick={() => setSelectedStatus(selectedStatus === 'REQUESTED' ? null : 'REQUESTED')} style={{ cursor: 'pointer', borderTop: '4px solid #ffc107', backgroundColor: selectedStatus === 'REQUESTED' ? '#fff3cd' : 'white' }}>
            <Card.Body>
              <h6 style={{ color: '#ffc107' }}>Requested</h6>
              <h4>{projects.filter(p => p.projectStatus === 'REQUESTED').length}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" onClick={() => setSelectedStatus(selectedStatus === 'ONGOING' ? null : 'ONGOING')} style={{ cursor: 'pointer', borderTop: '4px solid #007bff', backgroundColor: selectedStatus === 'ONGOING' ? '#cce5ff' : 'white' }}>
            <Card.Body>
              <h6 style={{ color: '#007bff' }}>In Progress</h6>
              <h4>{projects.filter(p => p.projectStatus === 'ONGOING').length}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" onClick={() => setSelectedStatus(selectedStatus === 'COMPLETED' ? null : 'COMPLETED')} style={{ cursor: 'pointer', borderTop: '4px solid #28a745', backgroundColor: selectedStatus === 'COMPLETED' ? '#d4edda' : 'white' }}>
            <Card.Body>
              <h6 style={{ color: '#28a745' }}>Completed</h6>
              <h4>{projects.filter(p => p.projectStatus === 'COMPLETED').length}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" onClick={() => setSelectedStatus(selectedStatus === 'CANCELLED' ? null : 'CANCELLED')} style={{ cursor: 'pointer', borderTop: '4px solid #dc3545', backgroundColor: selectedStatus === 'CANCELLED' ? '#f8d7da' : 'white' }}>
            <Card.Body>
              <h6 style={{ color: '#dc3545' }}>Cancelled</h6>
              <h4>{projects.filter(p => p.projectStatus === 'CANCELLED').length}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
            <tr><th>ID</th><th>Name</th><th>Customer</th><th>Status</th><th>Budget</th><th>Actions</th></tr>
        </thead>
        <tbody>
            {(selectedStatus ? projects.filter(p => p.projectStatus === selectedStatus) : projects).map(project => (
                <tr key={project.id}>
                    <td>{project.id}</td>
                    <td>{project.projectName}</td>
                    <td>{project.customerName}</td>
                    <td>{getStatusBadge(project.projectStatus)}</td>
                    <td>₹{project.budget?.toLocaleString()}</td>
                    <td>
                        {project.projectStatus === 'REQUESTED' && (
                            <>
                                <Button size="sm" variant="success" className="me-2" onClick={() => handleStatusUpdate(project.id, 'ONGOING')}>Accept</Button>
                                <Button size="sm" variant="danger" className="me-2" onClick={() => handleStatusUpdate(project.id, 'CANCELLED')}>Reject</Button>
                            </>
                        )}
                        {project.projectStatus === 'ONGOING' && (
                            <Button size="sm" variant="success" className="me-2" onClick={() => handleStatusUpdate(project.id, 'COMPLETED')}>Complete</Button>
                        )}
                        <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditProject(project)}>Edit</Button>
                        <Button size="sm" variant="outline-danger" onClick={() => handleDeleteProject(project.id)}>Delete</Button>
                    </td>
                </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );

  const CustomerManagement = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ color: 'var(--primary-color)' }}>Customer Management</h4>
        <Button style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => { setEditingCustomer(null); setCustomerFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '' }); setShowCustomerModal(true); }}>Add Customer</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Phone</th><th>Joined Date</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {customers.map(customer => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.firstName} {customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phoneNumber}</td>
              <td>{customer.createdOn}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditCustomer(customer)}>Edit</Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDeleteCustomer(customer.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showCustomerModal} onHide={() => setShowCustomerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCustomerSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={customerFormData.firstName} onChange={(e) => setCustomerFormData({...customerFormData, firstName: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={customerFormData.lastName} onChange={(e) => setCustomerFormData({...customerFormData, lastName: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={customerFormData.email} onChange={(e) => setCustomerFormData({...customerFormData, email: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" value={customerFormData.phoneNumber} onChange={(e) => setCustomerFormData({...customerFormData, phoneNumber: e.target.value})} required />
            </Form.Group>
            {!editingCustomer && (
                <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={customerFormData.password} onChange={(e) => setCustomerFormData({...customerFormData, password: e.target.value})} required />
                <Form.Text className="text-muted">
                    Must contain at least one uppercase, one lowercase, one number, and one special character.
                </Form.Text>
                </Form.Group>
            )}
            <Button type="submit" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>{editingCustomer ? 'Update Customer' : 'Add Customer'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );

  const BudgetManagement = () => (
    <div>
      <h4 style={{ color: 'var(--primary-color)' }} className="mb-4">Budget Management</h4>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center" style={{ borderTop: '4px solid var(--primary-color)' }}>
            <Card.Body>
              <h6 style={{ color: 'var(--primary-color)' }}>Total Projects</h6>
              <h4>{projects.length}</h4>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center" style={{ borderTop: '4px solid var(--primary-color)' }}>
            <Card.Body>
              <h6 style={{ color: 'var(--primary-color)' }}>Total Budget</h6>
              <h4>₹{projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}</h4>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>Project</th><th>Budget</th><th>Area</th><th>Cost/Sq Ft</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>₹{project.budget?.toLocaleString()}</td>
              <td>{project.areaSqft} sq ft</td>
              <td>₹{project.areaSqft ? Math.round(project.budget / project.areaSqft) : 0}</td>
              <td><Button size="sm" variant="outline-primary" onClick={() => handleEditProject(project)}>Edit Budget</Button></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const DesignerManagement = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ color: 'var(--primary-color)' }}>Designer Management</h4>
        <Button style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => { setEditingDesigner(null); setDesignerFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', experienceYears: '' }); setShowDesignerModal(true); }}>Add Designer</Button>
      </div>
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Experience</th><th>Rating</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {designers.map(designer => (
            <tr key={designer.id}>
              <td>{designer.id}</td>
              <td>{designer.fullName}</td>
              <td>{designer.email}</td>
              <td>{designer.experienceYears} years</td>
              <td>{designer.rating || 'N/A'}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2" onClick={() => handleEditDesigner(designer)}>Edit</Button>
                <Button size="sm" variant="outline-danger" onClick={() => handleDeleteDesigner(designer.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  return (
    <Container fluid style={{ padding: '20px 0', minHeight: 'calc(100vh - 180px)' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-5" style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>Admin Dashboard</h2>
        <Nav variant="pills" className="mb-4">
          <Nav.Item>
            <Nav.Link active={activeTab === 'projects'} onClick={() => setActiveTab('projects')} style={{ marginRight: '10px', borderRadius: '8px', backgroundColor: activeTab === 'projects' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'projects' ? 'white' : 'var(--secondary-color)' }}>Project Management</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'customers'} onClick={() => setActiveTab('customers')} style={{ marginRight: '10px', borderRadius: '8px', backgroundColor: activeTab === 'customers' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'customers' ? 'white' : 'var(--secondary-color)' }}>Customer Management</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'budgets'} onClick={() => setActiveTab('budgets')} style={{ marginRight: '10px', borderRadius: '8px', backgroundColor: activeTab === 'budgets' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'budgets' ? 'white' : 'var(--secondary-color)' }}>Budget Management</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link active={activeTab === 'designers'} onClick={() => setActiveTab('designers')} style={{ borderRadius: '8px', backgroundColor: activeTab === 'designers' ? 'var(--primary-color)' : 'transparent', color: activeTab === 'designers' ? 'white' : 'var(--secondary-color)' }}>Designer Management</Nav.Link>
          </Nav.Item>
        </Nav>
        
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'budgets' && <BudgetManagement />}
        {activeTab === 'designers' && <DesignerManagement />}
      </div>

      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingProject ? 'Edit Project' : 'Add Project'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" value={projectFormData.projectName} onChange={(e) => setProjectFormData({...projectFormData, projectName: e.target.value})} required />
            </Form.Group>
            {!editingProject && (
                <Form.Group className="mb-3">
                <Form.Label>Customer Email</Form.Label>
                <Form.Control type="email" value={projectFormData.customerName} onChange={(e) => setProjectFormData({...projectFormData, customerName: e.target.value})} required placeholder="Enter customer email" />
                </Form.Group>
            )}
            <Form.Group className="mb-3">
              <Form.Label>Designer ID (Optional)</Form.Label>
              <Form.Control type="number" value={projectFormData.designerId} onChange={(e) => setProjectFormData({...projectFormData, designerId: e.target.value})} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Budget</Form.Label>
              <Form.Control type="number" value={projectFormData.budget} onChange={(e) => setProjectFormData({...projectFormData, budget: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Area (sq ft)</Form.Label>
              <Form.Control type="number" value={projectFormData.areaSqft} onChange={(e) => setProjectFormData({...projectFormData, areaSqft: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" value={projectFormData.location} onChange={(e) => setProjectFormData({...projectFormData, location: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" value={projectFormData.city} onChange={(e) => setProjectFormData({...projectFormData, city: e.target.value})} required />
            </Form.Group>
             <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control type="text" value={projectFormData.state} onChange={(e) => setProjectFormData({...projectFormData, state: e.target.value})} required />
            </Form.Group>
             <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" value={projectFormData.address} onChange={(e) => setProjectFormData({...projectFormData, address: e.target.value})} required />
            </Form.Group>
             <Form.Group className="mb-3">
              <Form.Label>Project Type</Form.Label>
               <Form.Select value={projectFormData.projectType} onChange={(e) => setProjectFormData({...projectFormData, projectType: e.target.value})} required>
                <option value="">Select project type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Office">Office</option>
              </Form.Select>
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>{editingProject ? 'Update Project' : 'Add Project'}</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDesignerModal} onHide={() => setShowDesignerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingDesigner ? 'Edit Designer' : 'Add Designer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleDesignerSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="text" value={designerFormData.firstName} onChange={(e) => setDesignerFormData({...designerFormData, firstName: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="text" value={designerFormData.lastName} onChange={(e) => setDesignerFormData({...designerFormData, lastName: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={designerFormData.email} onChange={(e) => setDesignerFormData({...designerFormData, email: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" value={designerFormData.phoneNumber} onChange={(e) => setDesignerFormData({...designerFormData, phoneNumber: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Experience (years)</Form.Label>
              <Form.Control type="number" value={designerFormData.experienceYears} onChange={(e) => setDesignerFormData({...designerFormData, experienceYears: e.target.value})} required />
            </Form.Group>
            <Button type="submit" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>{editingDesigner ? 'Update Designer' : 'Add Designer'}</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}