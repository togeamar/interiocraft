import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Offcanvas, Button } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function NavigationBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check auth state on mount and when location changes (e.g. after login redirect)
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("type");
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    localStorage.removeItem("loggedinuser");
    localStorage.removeItem("loggedinemail");
    setIsAuthenticated(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <Navbar
      expand="lg"
      sticky="top"
      className={`custom-navbar ${isScrolled ? "scrolled" : ""}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          InterioCraft
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              InterioCraft
            </Offcanvas.Title>
          </Offcanvas.Header>

          <Offcanvas.Body>
            <Nav className="justify-content-center flex-grow-1">
              <Nav.Link as={Link} to="/">Home</Nav.Link>

              {isAuthenticated && userRole === 'customer' && (
                <Nav.Link as={Link} to="/customer-dashboard">Dashboard</Nav.Link>
              )}
              {isAuthenticated && userRole === 'admin' && (
                <Nav.Link as={Link} to="/admin-dashboard">Dashboard</Nav.Link>
              )}
              
              <Nav.Link as={Link} to="/services">Services</Nav.Link>
              
              <Nav.Link as={Link} to="/budget-estimator">Budget</Nav.Link>
              
              
              
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>

            <div className="d-flex gap-2">
              {!isAuthenticated ? (
                <Button as={Link} to="/login" size="sm" style={{borderColor: 'var(--primary-color)', color: 'var(--primary-color)', backgroundColor: 'transparent', padding: '0.25rem 0.75rem'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--primary-color)'; e.target.style.color = 'white';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--primary-color)'}}>
                  Login
                </Button>
              ) : (
                <Button onClick={handleLogout} size="sm" style={{borderColor: 'var(--primary-color)', color: 'var(--primary-color)', backgroundColor: 'transparent', padding: '0.25rem 0.75rem'}} onMouseEnter={(e) => {e.target.style.backgroundColor = 'var(--primary-color)'; e.target.style.color = 'white';}} onMouseLeave={(e) => {e.target.style.backgroundColor = 'transparent'; e.target.style.color = 'var(--primary-color)'}}>
                  Logout
                </Button>
              )}
              
            </div>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
}