import { Container, Row, Col, Card } from "react-bootstrap";
import { FaHome, FaPaintBrush, FaCouch, FaLightbulb } from "react-icons/fa";
import modernLivingRoom from "../../assets/images/modern-living-room.jpg";
import elegantBedroom from "../../assets/images/elegant-bedroom.jpg";
import contemporaryKitchen from "../../assets/images/contemporary-kitchen.jpg";
import aestheticTemple from "../../assets/images/aesthetic-temple.jpg";
import cozyStudyRoom from "../../assets/images/cozy-study-room.jpg";
import stylishDiningArea from "../../assets/images/stylish-dining-area.jpg";

export function Services() {
  const services = [
    {
      icon: <FaHome />,
      title: "Residential Design",
      description: "Transform your home into a beautiful living space"
    },
    {
      icon: <FaPaintBrush />,
      title: "Color Consultation",
      description: "Expert color schemes for every room"
    },
    {
      icon: <FaCouch />,
      title: "Furniture Selection",
      description: "Curated furniture pieces for your style"
    },
    {
      icon: <FaLightbulb />,
      title: "Lighting Design",
      description: "Perfect lighting solutions for ambiance"
    }
  ];

  const portfolio = [
    {
      image: modernLivingRoom,
      title: "Modern Living Room"
    },
    {
      image: elegantBedroom,
      title: "Elegant Bedroom"
    },
    {
      image: contemporaryKitchen,
      title: "Contemporary Kitchen"
    },
    {
      image: aestheticTemple,
      title: "Aesthetic Temple"
    },
    {
      image: cozyStudyRoom,
      title: "Cozy Study Room"
    },
    {
      image: stylishDiningArea,
      title: "Stylish Dining Area"
    }
  ];

  return (
    <>
      {/* Services Section */}
      <section className="py-5">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Our Services</h2>
          <Row className="g-4">
            {services.map((service, index) => (
              <Col md={6} lg={3} key={index}>
                <Card className="service-card h-100 text-center">
                  <Card.Body>
                    <div className="service-icon">{service.icon}</div>
                    <Card.Title className="fw-bold">{service.title}</Card.Title>
                    <Card.Text>{service.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Portfolio Section */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Our Work</h2>
          <Row>
            {portfolio.map((item, index) => (
              <Col md={4} key={index}>
                <div className="portfolio-item">
                  <img src={item.image} alt={item.title} />
                  <div className="portfolio-overlay">
                    <h5 className="fw-bold">{item.title}</h5>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
}