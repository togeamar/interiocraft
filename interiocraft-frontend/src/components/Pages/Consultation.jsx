import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function Consultation() {
  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={8}>
            <div className="bg-light p-4 rounded shadow-sm" style={{border: '2px solid var(--primary-color)'}}>
              <div className="text-center mb-4 p-3 rounded" style={{backgroundColor: 'var(--primary-color)', color: 'white'}}>
                <h2 className="fw-bold mb-3">Book a Consultation</h2>
                <p className="mb-0">
                  Share a few details about your home. Our interior design team will review your requirements and get back to you with a personalised consultation
                </p>
              </div>
              <Form>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your full name" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="tel" placeholder="Enter your phone number" required />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter your city" required />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Property Type</Form.Label>
                    <Form.Select required>
                      <option value="">Select property type</option>
                      <option value="apartment">Apartment</option>
                      <option value="independent-house">Independent House</option>
                      <option value="villa">Villa</option>
                      <option value="office-commercial">Office/Commercial</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>BHK Type</Form.Label>
                    <Form.Select required>
                      <option value="">Select BHK</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4 BHK</option>
                      <option value="4bhk+">4 BHK+</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Budget Range</Form.Label>
                    <Form.Select required>
                      <option value="">Select budget</option>
                      <option value="below-3">Below 3 Lakhs</option>
                      <option value="3-7">3-7 Lakhs</option>
                      <option value="7-15">7-15 Lakhs</option>
                      <option value="15+">15 Lakhs+</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group className="mb-4">
                <Form.Label>Specific Requests</Form.Label>
                <Form.Control 
                  as="textarea" 
                  rows={4} 
                  placeholder="Tell us about your specific requirements, style preferences, or any special requests..."
                />
              </Form.Group>
              <div className="text-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  style={{backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)', color: 'white'}}
                >
                  Book Consultation
                </Button>
              </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}