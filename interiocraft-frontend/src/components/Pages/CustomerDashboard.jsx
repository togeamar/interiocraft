import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";

export function CustomerDashboard() {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("customer");
    if (!stored) {
      // Not logged in → back to login page
      navigate("/login");
      return;
    }
    setCustomer(JSON.parse(stored));
  }, [navigate]);

  if (!customer) {
    return (
      <section className="py-5">
        <Container>
          <p>Loading dashboard...</p>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body className="p-4">
                <h2 className="fw-bold mb-3">
                  Welcome, {customer.firstName} {customer.lastname}
                </h2>

                <p className="text-muted mb-4">
                  This is your customer dashboard. We&apos;ll later add your projects,
                  consultations and budget details here.
                </p>

                <h5 className="mb-3">Your Details</h5>
                <p className="mb-1">
                  <strong>Email:</strong> {customer.email}
                </p>
                <p className="mb-1">
                  <strong>Phone:</strong>{" "}
                  {customer.phoneNumber ? customer.phoneNumber : "Not provided"}
                </p>

                <Alert variant="info" className="mt-4 mb-0">
                  Dashboard is now connected to backend login.
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
