import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

export function Footer() {
  return (
    <footer className="footer py-4">
      <Container>
        <Row className="align-items-center gy-3">
          <Col md={4} className="text-center text-md-start">
            <h5 className="fw-bold mb-2" style={{color: 'var(--primary-color)'}}>InterioCraft</h5>
            <small className="d-block">
              © {new Date().getFullYear()} InterioCraft. All Rights Reserved
            </small>
          </Col>

          <Col md={4} className="text-center">
          </Col>

          <Col md={4} className="d-flex justify-content-center justify-content-md-end gap-3">
            <a href="#" aria-label="Facebook" className="social-icon">
              <FaFacebookF size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="social-icon">
              <FaInstagram size={20} />
            </a>
            <a href="#" aria-label="Pinterest" className="social-icon">
              <FaPinterest size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="social-icon">
              <FaLinkedinIn size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="social-icon">
              <FaTwitter size={20} />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}