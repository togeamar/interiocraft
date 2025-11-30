import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

export function Login() {
  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h2 className="text-center fw-bold mb-4">Login</h2>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" required />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password" required />
                  </Form.Group>
                  <Button 
                    type="submit" 
                    className="w-100 fw-semibold" 
                    style={{backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)'}}
                  >
                    Login
                  </Button>
                </Form>
                <div className="text-center mt-3">
                  <small className="text-muted">Don't have an account? <a href="/register" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>Register here</a></small>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}