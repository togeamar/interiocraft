import { useState } from 'react';
import { Container, Row, Col, Nav, Tab, Table, Button, Modal, Form, Badge, Card } from 'react-bootstrap';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [designers, setDesigners] = useState([]);
  const [projects, setProjects] = useState([
    { id: 1, projectName: 'Modern Living Room', customerName: 'John Doe', budget: 150000, projectStatus: 'IN_PROGRESS', areaSqft: 1200 },
    { id: 2, projectName: 'Kitchen Renovation', customerName: 'Alice Johnson', budget: 80000, projectStatus: 'REQUESTED', areaSqft: 800 },
    { id: 3, projectName: 'Bedroom Design', customerName: 'Bob Wilson', budget: 120000, projectStatus: 'COMPLETED', areaSqft: 1000 }
  ]);
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showDesignerModal, setShowDesignerModal] = useState(false);
  const [projectFormData, setProjectFormData] = useState({ projectName: '', customerName: '', budget: '', areaSqft: '', location: '' });
  const [designerFormData, setDesignerFormData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '', experienceYears: '' });

  const getStatusBadge = (status) => {
    const variants = { 'REQUESTED': 'warning', 'IN_PROGRESS': 'primary', 'COMPLETED': 'success', 'CANCELLED': 'danger' };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const handleStatusUpdate = (projectId, newStatus) => {
    setProjects(projects.map(p => p.id === projectId ? {...p, projectStatus: newStatus} : p));
  };

  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: projects.length + 1,
      ...projectFormData,
      budget: parseInt(projectFormData.budget),
      areaSqft: parseInt(projectFormData.areaSqft),
      projectStatus: 'REQUESTED'
    };
    setProjects([...projects, newProject]);
    setShowProjectModal(false);
    setProjectFormData({ projectName: '', customerName: '', budget: '', areaSqft: '', location: '' });
  };

  const handleDesignerSubmit = (e) => {
    e.preventDefault();
    const newDesigner = {
      id: designers.length + 1,
      ...designerFormData,
      experienceYears: parseInt(designerFormData.experienceYears)
    };
    setDesigners([...designers, newDesigner]);
    setShowDesignerModal(false);
    setDesignerFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', experienceYears: '' });
  };

  const ProjectManagement = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 style={{ color: 'var(--primary-color)' }}>Project Management</h4>
        <Button style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => setShowProjectModal(true)}>Add Project</Button>
      </div>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>ID</th><th>Name</th><th>Customer</th><th>Status</th><th>Budget</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.projectName}</td>
              <td>{project.customerName}</td>
              <td>{getStatusBadge(project.projectStatus)}</td>
              <td>₹{project.budget?.toLocaleString()}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2">Edit</Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );

  const CustomerManagement = () => (
    <div>
      <h4 style={{ color: 'var(--primary-color)' }} className="mb-4">Customer Management</h4>
      <h6 style={{ color: 'var(--secondary-color)' }}>Project Requests</h6>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>ID</th><th>Project</th><th>Customer</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {projects.filter(p => p.projectStatus === 'REQUESTED').map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.projectName}</td>
              <td>{project.customerName}</td>
              <td>{getStatusBadge(project.projectStatus)}</td>
              <td>
                <Button size="sm" variant="success" className="me-2" onClick={() => handleStatusUpdate(project.id, 'IN_PROGRESS')}>Accept</Button>
                <Button size="sm" variant="danger" onClick={() => handleStatusUpdate(project.id, 'CANCELLED')}>Reject</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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
      <Table striped bordered hover>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>Project</th><th>Budget</th><th>Area</th><th>Cost/Sq Ft</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.projectName}</td>
              <td>₹{project.budget?.toLocaleString()}</td>
              <td>{project.areaSqft} sq ft</td>
              <td>₹{Math.round(project.budget / project.areaSqft)}</td>
              <td><Button size="sm" variant="outline-primary">View</Button></td>
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
        <Button style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => setShowDesignerModal(true)}>Add Designer</Button>
      </div>
      <Table striped bordered hover>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Experience</th><th>Rating</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {designers.map(designer => (
            <tr key={designer.id}>
              <td>{designer.id}</td>
              <td>{designer.firstName} {designer.lastName}</td>
              <td>{designer.email}</td>
              <td>{designer.experienceYears} years</td>
              <td>{designer.rating || 'N/A'}</td>
              <td>
                <Button size="sm" variant="outline-primary" className="me-2">Edit</Button>
                <Button size="sm" variant="outline-danger">Delete</Button>
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
            <Nav.Link 
              active={activeTab === 'projects'} 
              onClick={() => setActiveTab('projects')} 
              style={{ 
                marginRight: '10px', 
                borderRadius: '8px',
                backgroundColor: activeTab === 'projects' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'projects' ? 'white' : 'var(--secondary-color)'
              }}
            >
              Project Management
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'customers'} 
              onClick={() => setActiveTab('customers')} 
              style={{ 
                marginRight: '10px', 
                borderRadius: '8px',
                backgroundColor: activeTab === 'customers' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'customers' ? 'white' : 'var(--secondary-color)'
              }}
            >
              Customer Management
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'budgets'} 
              onClick={() => setActiveTab('budgets')} 
              style={{ 
                marginRight: '10px',
                borderRadius: '8px',
                backgroundColor: activeTab === 'budgets' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'budgets' ? 'white' : 'var(--secondary-color)'
              }}
            >
              Budget Management
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'designers'} 
              onClick={() => setActiveTab('designers')} 
              style={{ 
                borderRadius: '8px',
                backgroundColor: activeTab === 'designers' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'designers' ? 'white' : 'var(--secondary-color)'
              }}
            >
              Designer Management
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        {activeTab === 'projects' && <ProjectManagement />}
        {activeTab === 'customers' && <CustomerManagement />}
        {activeTab === 'budgets' && <BudgetManagement />}
        {activeTab === 'designers' && <DesignerManagement />}
      </div>

      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProjectSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Project Name</Form.Label>
              <Form.Control type="text" value={projectFormData.projectName} onChange={(e) => setProjectFormData({...projectFormData, projectName: e.target.value})} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Customer Name</Form.Label>
              <Form.Control type="text" value={projectFormData.customerName} onChange={(e) => setProjectFormData({...projectFormData, customerName: e.target.value})} required />
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
            <Button type="submit" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>Add Project</Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showDesignerModal} onHide={() => setShowDesignerModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Designer</Modal.Title>
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
            <Button type="submit" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>Add Designer</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}