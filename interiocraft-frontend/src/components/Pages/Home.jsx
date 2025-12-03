import { Button, Carousel, Container, Row, Col, Card,Badge } from "react-bootstrap";
import { FaAward, FaUsers, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { Award, Users, Clock, ArrowRight,MapPin } from 'lucide-react';
import heroBg1 from "../../assets/images/hero-bg-1.jpg";
import heroBg2 from "../../assets/images/hero-bg-2.jpg";
import heroBg3 from "../../assets/images/hero-bg-3.jpg";
import heroBg4 from "../../assets/images/hero-bg-4.jpg";
import "./Home.css";
import { useEffect, useState } from "react";
import { getAllProjects } from "../../services/projectservices.js";

export function Home() {

  const [Projects,setallprojects]= useState([]);

  const heroImages = {
    bg1: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=1600",
    bg2: "https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?auto=format&fit=crop&q=80&w=1600",
    bg3: "https://images.unsplash.com/photo-1616137466211-f939a420be84?auto=format&fit=crop&q=80&w=1600",
    bg4: "https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&q=80&w=1600"
  };
  const heroSlides = [
    {
      image: heroBg1,
      title: "Transform Your Space",
      description: "Professional interior design services to create beautiful, functional spaces"
    },
    {
      image: heroBg2,
      title: "Modern Living Solutions",
      description: "Contemporary designs that blend style with functionality"
    },
    {
      image: heroBg3,
      title: "Elegant Interiors",
      description: "Sophisticated designs tailored to your lifestyle"
    },
    {
      image: heroBg4,
      title: "Dream Spaces",
      description: "Creating the perfect environment for your home"
    }
  ];
  useEffect(() => {
  const fetchallprojects = async () => {
    try {
      const projects = await getAllProjects();
      console.log("project"+projects.data)
      setallprojects(projects.data);
    } catch(error) {
      let message = "Something went wrong";

      if (error.response) {
        message = error.response.data?.message || "Server error";
      } else if (error.request) {
        message = "Network error. Please check your connection.";
      } else {
        message = error.message;
      }
      console.error("getallproject error2:", message);
    }
  }
  
  fetchallprojects(); // ADD THIS LINE - calls the function when component mounts
}, []);


  return (
    <>
      {/* Hero Slider Section */}
      <section className="home-slider">
        <Carousel interval={3000} controls={false} indicators={true}>
          {heroSlides.map((slide, index) => (
            <Carousel.Item key={index} className="hero-slide" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`}}>
              <Carousel.Caption>
                <h1 className="display-4 fw-bold mb-4">{slide.title}</h1>
                <p className="lead mb-4">{slide.description}</p>
                <Button size="lg" className="fw-semibold" style={{backgroundColor: '#ced4da', borderColor: '#ced4da', color: '#333'}}>
                  Our Design
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Why Choose Us</h2>
          <Row className="g-4">
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <FaAward size={50} style={{color: 'var(--primary-color)'}} />
                  </div>
                  <Card.Title className="fw-bold mb-3">Expert Design Team</Card.Title>
                  <Card.Text>
                    Our certified interior designers bring years of experience and creativity to transform your space with professional expertise.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <FaUsers size={50} style={{color: 'var(--primary-color)'}} />
                  </div>
                  <Card.Title className="fw-bold mb-3">Personalized Service</Card.Title>
                  <Card.Text>
                    We work closely with each client to understand their unique style and needs, delivering customized solutions that reflect your personality.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className="h-100 text-center border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="text-center mb-3">
                    <FaClock size={50} style={{color: 'var(--primary-color)'}} />
                  </div>
                  <Card.Title className="fw-bold mb-3">Timely Delivery</Card.Title>
                  <Card.Text>
                    We respect your time and ensure all projects are completed on schedule without compromising on quality or attention to detail.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
       <section className="py-5">
        <Container className="py-5">
          <div className="text-center mb-5">
            <h6 className="featured fw-bold text-uppercase">Featured</h6>
            <h2 className="recent display-5 fw-bold">Recent Projects</h2>
            <p className="recent text-muted w-75 mx-auto mt-3">
              Explore our latest interior design masterpieces, crafted with passion and precision to exceed client expectations.
            </p>
          </div>

          <Row className="g-4">
            {Projects.map((project) => (
              <Col lg={4} md={6} key={project.id}>
                <Card className="h-100 border-0 shadow-sm project-card overflow-hidden">
                  <div className="project-img-wrapper position-relative">
                    <Card.Img variant="top" src={project.imageUrls && project.imageUrls.length > 0 
                                                ? project.imageUrls[0] 
                                                : "https://via.placeholder.com/400x300?text=No+Image"} alt={project.projectName} />
                    <Badge bg="light" text="dark" className="position-absolute top-0 end-0 m-3 shadow-sm">
                      {project.projectType}
                    </Badge>
                  </div>
                  <Card.Body className="p-4">
                    <div className="d-flex align-items-center text-muted mb-2 small">
                      {project.projectName}
                    </div>
                    <div className="d-flex align-items-center text-muted mb-2 small">
                      <MapPin className="me-2 text-primary" size={16} />
                      <Badge>{project.location}</Badge>
                    </div>
                    <Card.Title className="fw-bold fs-5 mb-3">{project.title}</Card.Title>
                    <Card.Text className="text-muted small mb-4">
                      {project.areaSqft+" sqrft"}
                    </Card.Text>
                    <Button variant="outline-primary" size="sm" className="w-100 fw-semibold">
                      View Project <ArrowRight className="ms-2" size={16} />
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          
        </Container>
      </section>
    </>
  );
}