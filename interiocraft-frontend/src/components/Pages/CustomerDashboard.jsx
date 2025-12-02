import { useState } from 'react';
import { Container, Nav, Table, Button, Form, Badge, Card, Row, Col } from 'react-bootstrap';

const getStatusBadge = (status) => {
  const variants = { 'REQUESTED': 'warning', 'IN_PROGRESS': 'primary', 'COMPLETED': 'success', 'CANCELLED': 'danger' };
  return <Badge bg={variants[status]}>{status}</Badge>;
};

const MyProjects = ({ projects }) => (
  <div>
    <h4 style={{ color: 'var(--primary-color)' }} className="mb-4">My Projects</h4>
    <Table striped bordered hover>
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
              <Button size="sm" variant="outline-primary" className="me-2">View</Button>
              <Button size="sm" variant="outline-secondary">Edit</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
);

const RequestProject = () => (
  <div>
    <h4 style={{ color: 'var(--primary-color)' }} className="mb-4">Request New Project</h4>
    <Form>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Project Name</Form.Label>
            <Form.Control type="text" placeholder="Enter project name" />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Budget</Form.Label>
            <Form.Control type="number" placeholder="Enter budget" />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Project Type</Form.Label>
            <Form.Select>
              <option>Select project type</option>
              <option>Residential</option>
              <option>Commercial</option>
              <option>Office</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Area (Sq Ft)</Form.Label>
            <Form.Control type="number" placeholder="Enter area" />
          </Form.Group>
        </Col>
      </Row>
      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} placeholder="Describe your project requirements" />
      </Form.Group>
      <Button style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}>
        Submit Request
      </Button>
    </Form>
  </div>
);

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
    <Table striped bordered hover>
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
  const [projects] = useState([
    { id: 1, projectName: 'Modern Living Room', budget: 150000, projectStatus: 'IN_PROGRESS', areaSqft: 1200, designerName: 'Jane Smith', startDate: '2024-01-15' },
    { id: 2, projectName: 'Kitchen Renovation', budget: 80000, projectStatus: 'REQUESTED', areaSqft: 800, designerName: null, startDate: null },
    { id: 3, projectName: 'Bedroom Design', budget: 120000, projectStatus: 'COMPLETED', areaSqft: 1000, designerName: 'Mike Brown', startDate: '2023-12-01' }
  ]);

  return (
    <Container fluid style={{ padding: '20px 0', minHeight: 'calc(100vh - 180px)' }}>
      <div style={{ backgroundColor: 'var(--white)', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 className="text-center mb-5" style={{ color: 'var(--secondary-color)', fontWeight: '600' }}>Customer Dashboard</h2>
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
              My Projects
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTab === 'request'} 
              onClick={() => setActiveTab('request')} 
              style={{ 
                marginRight: '10px', 
                borderRadius: '8px',
                backgroundColor: activeTab === 'request' ? 'var(--primary-color)' : 'transparent',
                color: activeTab === 'request' ? 'white' : 'var(--secondary-color)'
              }}
            >
              Request Project
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
        
        {activeTab === 'projects' && <MyProjects projects={projects} />}
        {activeTab === 'request' && <RequestProject />}
        {activeTab === 'status' && <ProjectStatus projects={projects} />}
      </div>
    </Container>
  );
}
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Alert } from "react-bootstrap";

// export function CustomerDashboard() {
//   const navigate = useNavigate();
//   const [customer, setCustomer] = useState(null);

//   useEffect(() => {
//     const stored = localStorage.getItem("customer");
//     if (!stored) {
//       // Not logged in → back to login page
//       navigate("/login");
//       return;
//     }
//     setCustomer(JSON.parse(stored));
//   }, [navigate]);

//   if (!customer) {
//     return (
//       <section className="py-5">
//         <Container>
//           <p>Loading dashboard...</p>
//         </Container>
//       </section>
//     );
//   }

//   return (
//     <section className="py-5">
//       <Container>
//         <Row className="justify-content-center">
//           <Col md={8} lg={6}>
//             <Card className="shadow-sm">
//               <Card.Body className="p-4">
//                 <h2 className="fw-bold mb-3">
//                   Welcome, {customer.firstName} {customer.lastname}
//                 </h2>

//                 <p className="text-muted mb-4">
//                   This is your customer dashboard. We&apos;ll later add your projects,
//                   consultations and budget details here.
//                 </p>

//                 <h5 className="mb-3">Your Details</h5>
//                 <p className="mb-1">
//                   <strong>Email:</strong> {customer.email}
//                 </p>
//                 <p className="mb-1">
//                   <strong>Phone:</strong>{" "}
//                   {customer.phoneNumber ? customer.phoneNumber : "Not provided"}
//                 </p>

//                 <Alert variant="info" className="mt-4 mb-0">
//                   Dashboard is now connected to backend login.
//                 </Alert>
//               </Card.Body>
//             </Card>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// }
