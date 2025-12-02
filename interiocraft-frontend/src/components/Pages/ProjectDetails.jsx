import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button } from 'react-bootstrap';
import { ArrowLeft, MapPin, Calendar, User, DollarSign, Home } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      projectName: "Modern Minimalist Loft",
      projectType: "Residential",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
      description: "A clean, airy renovation maximizing natural light and open space.",
      budget: 250000,
      areaSqft: 1500,
      location: "Downtown Mumbai",
      city: "Mumbai",
      state: "Maharashtra",
      projectStatus: "COMPLETED",
      designerName: "Sarah Johnson",
      startDate: "2024-01-15",
      completionDate: "2024-03-20"
    },
    {
      id: 2,
      projectName: "Eco-Friendly Office",
      projectType: "Commercial",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=1600",
      description: "Sustainable workspace design incorporating biophilic elements.",
      budget: 180000,
      areaSqft: 2000,
      location: "Tech Park Bangalore",
      city: "Bangalore",
      state: "Karnataka",
      projectStatus: "COMPLETED",
      designerName: "Mike Chen",
      startDate: "2024-02-01",
      completionDate: "2024-04-15"
    },
    {
      id: 3,
      projectName: "Luxury Penthouse",
      projectType: "Residential",
      image: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80&w=1600",
      description: "High-end finishes and bespoke furniture for an exclusive client.",
      budget: 500000,
      areaSqft: 3000,
      location: "Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      projectStatus: "COMPLETED",
      designerName: "Emma Wilson",
      startDate: "2023-11-01",
      completionDate: "2024-02-28"
    }
  ];

  const project = projects.find(p => p.id === parseInt(id));

  if (!project) {
    return (
      <Container className="py-5">
        <h2>Project not found</h2>
        <Button onClick={() => navigate('/')}>Back to Home</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate('/')}>
        <ArrowLeft size={16} className="me-2" />
        Back to Home
      </Button>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Img variant="top" src={project.image} style={{ height: '400px', objectFit: 'cover' }} />
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="fw-bold">{project.projectName}</h1>
                <Badge bg="success" className="fs-6">{project.projectStatus}</Badge>
              </div>
              
              <div className="d-flex align-items-center text-muted mb-3">
                <MapPin size={16} className="me-2" />
                {project.location}, {project.city}, {project.state}
              </div>

              <p className="lead mb-4">{project.description}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Header style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}>
              <h5 className="mb-0">Project Information</h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <DollarSign size={16} className="me-2 text-primary" />
                  <strong>Budget</strong>
                </div>
                <p className="mb-0 ms-4">₹{project.budget?.toLocaleString()}</p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <Home size={16} className="me-2 text-primary" />
                  <strong>Area</strong>
                </div>
                <p className="mb-0 ms-4">{project.areaSqft} sq ft</p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <User size={16} className="me-2 text-primary" />
                  <strong>Designer</strong>
                </div>
                <p className="mb-0 ms-4">{project.designerName}</p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <Calendar size={16} className="me-2 text-primary" />
                  <strong>Start Date</strong>
                </div>
                <p className="mb-0 ms-4">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>

              <div className="mb-3">
                <div className="d-flex align-items-center mb-2">
                  <Calendar size={16} className="me-2 text-primary" />
                  <strong>Completion Date</strong>
                </div>
                <p className="mb-0 ms-4">{new Date(project.completionDate).toLocaleDateString()}</p>
              </div>

              <div className="mb-3">
                <Badge bg="light" text="dark" className="fs-6">{project.projectType}</Badge>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;