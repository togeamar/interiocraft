import { Container, Row, Col, Card } from "react-bootstrap";
import aboutImage from "../../assets/images/about.jpg";

export function About() {
  return (
    <>
      <section className="py-5">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="fw-bold mb-4">About Us</h2>
              <p className="mb-3">
                InterioCraft is a premier interior design company dedicated to transforming spaces into beautiful, functional environments. With years of experience and a passion for design excellence, we create personalized solutions that reflect your unique style and enhance your lifestyle.
              </p>
              <p className="mb-3">
                Our team of skilled designers specializes in residential and commercial projects, offering comprehensive services from concept to completion. We believe that great design should be both aesthetically pleasing and practical, creating spaces that inspire and serve your daily needs.
              </p>
              <p className="mb-0">
                From modern minimalist designs to traditional elegance, we work closely with our clients to bring their vision to life while ensuring every detail reflects quality craftsmanship and attention to detail.
              </p>
            </Col>
            <Col lg={6}>
              <img src={aboutImage} alt="About Us" className="img-fluid rounded shadow" />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-5 fw-bold">Our Purpose</h2>
          <Row className="g-4">
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{transition: 'transform 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-4 text-center">
                  <Card.Title className="fw-bold mb-3">Our Mission</Card.Title>
                  <Card.Text>
                    To create exceptional interior spaces that enhance the quality of life for our clients by combining innovative design, functionality, and sustainability in every project we undertake.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="h-100 border-0 shadow-sm" style={{transition: 'transform 0.3s ease', cursor: 'pointer'}} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <Card.Body className="p-4 text-center">
                  <Card.Title className="fw-bold mb-3">Our Vision</Card.Title>
                  <Card.Text>
                    To be the leading interior design company recognized for transforming ordinary spaces into extraordinary environments that inspire, comfort, and reflect the unique personality of each client.
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