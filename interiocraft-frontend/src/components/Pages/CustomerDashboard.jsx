import { useState, useEffect } from 'react';
import { Container, Nav, Table, Button, Form, Badge, Card, Row, Col, Alert, Modal } from 'react-bootstrap';
import client from '../../services/client';
import { API_BASE_URL } from '../../constants/ApiConstants';
import { useNavigate } from 'react-router-dom';

const getStatusBadge = (status) => {
  const variants = { 'REQUESTED': 'warning', 'IN_PROGRESS': 'primary', 'COMPLETED': 'success', 'CANCELLED': 'danger' };
  return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
};

import { Link } from 'react-router-dom';

const MyProjects = ({ projects }) => (
  <div>
    <h4 style={{ color: 'var(--primary-color)' }} className="mb-4">My Projects</h4>
    {projects.length === 0 ? (
      <Alert variant="info">No projects found.</Alert>
    ) : (
      <Table striped bordered hover responsive>
        <thead style={{ backgroundColor: 'var(--light-bg)' }}>
          <tr><th>ID</th><th>Project Name</th><th>Status</th><th>Budget</th><th>Designer</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project.id}>
              <td>{project.id}</td>
              <td>{project.projectName}</td>
              <td>{getStatusBadge(project.projectStatus)}</td>
              <td>₹{project.budget?.toLocaleString()}</td>
              <td>{project.designerName || 'Not Assigned'}</td>
              <td>
                <Button as={Link} to={`/project/${project.id}`} size="sm" variant="outline-primary" className="me-2">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    )}
  </div>
);

const RequestProjectForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    budget: '',
    projectType: '',
    areaSqft: '',
    address: '',
    city: '',
    state: '',
    description: '',
    designerId:''
  });
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData, files);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" name="projectName" value={formData.projectName} onChange={handleChange} required placeholder="Enter project name" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Control type="number" name="budget" value={formData.budget} onChange={handleChange} required placeholder="Enter budget" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Project Type</Form.Label>
            <Form.Select name="projectType" value={formData.projectType} onChange={handleChange} required>
              <option value="">Select project type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Office">Office</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Area (Sq Ft)</Form.Label>
            <Form.Control type="number" name="areaSqft" value={formData.areaSqft} onChange={handleChange} required placeholder="Enter area" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
           <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Enter city" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
         <Col md={6}>
           <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="Enter state" />
          </Form.Group>
        </Col>
         <Col md={6}>
           <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter address" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Description (Status Message)</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} placeholder="Describe your project requirements" />
      </Form.Group>
      <Form.Group className="mb-3">
          <Form.Label>Upload Images (Max 4)</Form.Label>
          <Form.Control type="file" multiple onChange={handleFileChange} />
      </Form.Group>
      <div className="d-flex justify-content-end gap-2">
        <Button variant="secondary" onClick={onCancel}>Cancel</Button>
        <Button type="submit" style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
          Submit Request
        </Button>
      </div>
    </Form>
  );
};

const ProjectStatus = ({ projects }) => (
  <div>
    <h4 style={{ color: 'var(--primary-color)' }} className="mb-4">Project Status</h4>
    <Row className="mb-4">
      <Col md={4}>
        <Card className="text-center" style={{ borderTop: '4px solid var(--primary-color)' }}>
          <Card.Body>
            <h6 style={{ color: 'var(--primary-color)' }}>Total Projects</h6>
            <h4>{projects.length}</h4>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center" style={{ borderTop: '4px solid #28a745' }}>
          <Card.Body>
            <h6 style={{ color: '#28a745' }}>Completed</h6>
            <h4>{projects.filter(p => p.projectStatus === 'COMPLETED').length}</h4>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="text-center" style={{ borderTop: '4px solid #ffc107' }}>
          <Card.Body>
            <h6 style={{ color: '#ffc107' }}>In Progress</h6>
            <h4>{projects.filter(p => p.projectStatus === 'IN_PROGRESS').length}</h4>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Table striped bordered hover responsive>
      <thead style={{ backgroundColor: 'var(--light-bg)' }}>
        <tr><th>Project</th><th>Status</th><th>Progress</th><th>Designer</th></tr>
      </thead>
      <tbody>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.projectName}</td>
            <td>{getStatusBadge(project.projectStatus)}</td>
            <td>
              {project.projectStatus === 'COMPLETED' ? '100%' : 
               project.projectStatus === 'IN_PROGRESS' ? '60%' : '0%'}
            </td>
            <td>{project.designerName || 'Not Assigned'}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("customer");
    if (!stored) {
      navigate("/login");
      return;
    }
    setCustomer(JSON.parse(stored));
  }, [navigate]);

  useEffect(() => {
    if (customer) {
      if (!customer.id) {
        console.error("Customer ID is missing in localStorage data:", customer);
        alert("Session invalid. Please log in again.");
        localStorage.removeItem("customer");
        navigate("/login");
        return;
      }
      fetchProjects();
    }
  }, [customer]);

  const fetchProjects = async () => {
    try {
      const response = await client.get(`${API_BASE_URL}/Project/customer/${customer.id}`);
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects", error);
    }
  };

  const handleRequestSubmit = async (data, files) => {
    try {
      const formData = new FormData();
      const projectDto = {
        projectName: data.projectName,
        customerName:customer.firstName,
        designerId:null,
        budget: data.budget,
        projectType: data.projectType,
        areaSqft: data.areaSqft,
        location: data.location,
        address: data.address,
        city: data.city,
        state: data.state,
        projectStatus: 'REQUESTED',
        statusMessage: data.description,
        feedback:null,
        startDate:null,
        completionDate:null
      };

      formData.append('projectDto', new Blob([JSON.stringify(projectDto)], { type: 'application/json' }));
      
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      await client.post(`${API_BASE_URL}/Project/addProject/${customer.email}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      alert("Project requested successfully!");
      setShowRequestModal(false);
      fetchProjects();
    } catch (error) {
      console.error("Error requesting project", error);
      alert("Failed to request project.");
    }
  };

  if (!customer) return <div>Loading...</div>;

  return (
    <Container fluid style={{ padding: '20px 0', minHeight: 'calc(100vh - 180px)' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-5" style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>
            Welcome, {customer.firstName}
        </h2>
        
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Nav variant="pills">
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
                My Projects
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link 
                active={activeTab === 'status'} 
                onClick={() => setActiveTab('status')} 
                style={{ 
                  borderRadius: '8px',
                  backgroundColor: activeTab === 'status' ? 'var(--primary-color)' : 'transparent',
                  color: activeTab === 'status' ? 'white' : 'var(--secondary-color)'
                }}
              >
                Project Status
              </Nav.Link>
            </Nav.Item>
          </Nav>
          
          <Button 
            onClick={() => setShowRequestModal(true)}
            style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
          >
            Request New Project
          </Button>
        </div>
        
        {activeTab === 'projects' && <MyProjects projects={projects} />}
        {activeTab === 'status' && <ProjectStatus projects={projects} />}
      </div>

      <Modal show={showRequestModal} onHide={() => setShowRequestModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Request New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RequestProjectForm onSubmit={handleRequestSubmit} onCancel={() => setShowRequestModal(false)} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}