import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert, Carousel } from 'react-bootstrap';
import { ArrowLeft, MapPin, Calendar, User, DollarSign, Home } from 'lucide-react';
import client from '../../services/client';
import { API_BASE_URL } from '../../constants/ApiConstants';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await client.get(`${API_BASE_URL}/Project/${id}`);
        setProject(response.data);
      } catch (err) {
        console.error("Error fetching project details:", err);
        setError("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error || !project) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error || "Project not found"}</Alert>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Button variant="outline-secondary" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft size={16} className="me-2" />
        Back
      </Button>

      <Row>
        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            {project.imageUrls && project.imageUrls.length > 0 ? (
                <Carousel>
                    {project.imageUrls.map((url, index) => (
                        <Carousel.Item key={index}>
                            <img
                                className="d-block w-100"
                                src={url}
                                alt={`Project Image ${index + 1}`}
                                style={{ height: '400px', objectFit: 'cover' }}
                            />
                        </Carousel.Item>
                    ))}
                </Carousel>
            ) : (
                <div style={{ height: '400px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="text-muted">No images available</span>
                </div>
            )}
            
            <Card.Body className="p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <h1 className="fw-bold">{project.projectName}</h1>
                <Badge bg={project.projectStatus === 'COMPLETED' ? 'success' : project.projectStatus === 'IN_PROGRESS' ? 'primary' : 'warning'} className="fs-6">
                    {project.projectStatus}
                </Badge>
              </div>
              
              <div className="d-flex align-items-center text-muted mb-3">
                <MapPin size={16} className="me-2" />
                {project.location}, {project.city}, {project.state}
              </div>

              <div className="mb-4">
                <h5>Description</h5>
                <p className="lead" style={{ fontSize: '1rem' }}>{project.statusMessage || "No description provided."}</p>
              </div>
              
              {project.feedback && (
                  <div className="mb-4">
                    <h5>Feedback</h5>
                    <p>{project.feedback}</p>
                  </div>
              )}
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
                <p className="mb-0 ms-4">{project.designerName || "Not Assigned"}</p>
              </div>

              {project.startDate && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <Calendar size={16} className="me-2 text-primary" />
                      <strong>Start Date</strong>
                    </div>
                    <p className="mb-0 ms-4">{new Date(project.startDate).toLocaleDateString()}</p>
                  </div>
              )}

              {project.completionDate && (
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <Calendar size={16} className="me-2 text-primary" />
                      <strong>Completion Date</strong>
                    </div>
                    <p className="mb-0 ms-4">{new Date(project.completionDate).toLocaleDateString()}</p>
                  </div>
              )}

              <div className="mb-3">
                <Badge bg="light" text="dark" className="fs-6">{project.projectType}</Badge>
              </div>
              
              <div className="mt-4">
                  <strong>Address:</strong>
                  <p className="text-muted">{project.address}</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetails;