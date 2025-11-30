import { Button, Carousel, Container, Row, Col, Card } from "react-bootstrap";
import { FaAward, FaUsers, FaClock } from "react-icons/fa";
import heroBg1 from "../../assets/images/hero-bg-1.jpg";
import heroBg2 from "../../assets/images/hero-bg-2.jpg";
import heroBg3 from "../../assets/images/hero-bg-3.jpg";
import heroBg4 from "../../assets/images/hero-bg-4.jpg";

export function Home() {
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
    </>
  );
}