import { Container, Row, Col } from "react-bootstrap";
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

export function Contact() {
  return (
    <section className="py-5">
      <Container>
        <Row>
          <Col lg={6} className="mx-auto">
            <h2 className="text-center fw-bold mb-4">Ready to Transform Your Space?</h2>
            <p className="text-center lead mb-4">
              Contact us today for a free consultation
            </p>
            <form className="bg-light p-4 rounded">
              <Row>
                <Col md={6}>
                  <div className="mb-3">
                    <input type="text" className="form-control" placeholder="Your Name" required />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="mb-3">
                    <input type="email" className="form-control" placeholder="Your Email" required />
                  </div>
                </Col>
              </Row>
              <div className="mb-3">
                <input type="tel" className="form-control" placeholder="Phone Number" />
              </div>
              <div className="mb-3">
                <textarea className="form-control" rows="4" placeholder="Tell us about your project" required></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-lg" style={{backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)', color: 'white'}}>Send Message</button>
              </div>
            </form>
            
            <div className="mt-5">
              <div className="bg-white p-3 rounded shadow-sm">
                <h5 className="fw-bold text-center mb-4">Get In Touch</h5>
                <Row className="g-2 justify-content-center">
                  <Col md={3} sm={6}>
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="text-white rounded-circle p-2 mb-2" style={{width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-color)'}}>
                        <i className="fas fa-envelope" style={{fontSize: '14px'}}></i>
                      </div>
                      <small className="text-muted">Email</small>
                      <div className="fw-semibold" style={{fontSize: '14px'}}>info@interiocraft.com</div>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="text-white rounded-circle p-2 mb-2" style={{width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-color)'}}>
                        <i className="fas fa-phone" style={{fontSize: '14px'}}></i>
                      </div>
                      <small className="text-muted">Phone</small>
                      <div className="fw-semibold" style={{fontSize: '14px'}}>+1 (555) 123-4567</div>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="text-white rounded-circle p-2 mb-2" style={{width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-color)'}}>
                        <i className="fas fa-map-marker-alt" style={{fontSize: '14px'}}></i>
                      </div>
                      <small className="text-muted">Address</small>
                      <div className="fw-semibold" style={{fontSize: '14px'}}>123 Design Street<br />City, State 12345</div>
                    </div>
                  </Col>
                  <Col md={3} sm={6}>
                    <div className="d-flex flex-column align-items-center text-center">
                      <div className="text-white rounded-circle p-2 mb-2" style={{width: '35px', height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--primary-color)'}}>
                        <i className="fas fa-clock" style={{fontSize: '14px'}}></i>
                      </div>
                      <small className="text-muted">Hours</small>
                      <div className="fw-semibold" style={{fontSize: '14px'}}>Mon-Fri: 9AM-6PM<br />Sat: 10AM-4PM</div>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
            
            <div className="mt-4">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.8130352081924!2d72.96633487518943!3d19.16298348205403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b9c96b0e3a2b%3A0x983b1b982a15c70b!2sCDAC%20Mumbai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{border: 0, borderRadius: '8px'}}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}