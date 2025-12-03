import { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';

const ProjectDetailsModal = ({ show, onHide, project, onSave, readOnly = false }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    location: '',
    budget: '',
    projectType: '',
    areaSqft: '',
    address: '',
    city: '',
    state: '',
    startDate: '',
    completionDate: '',
    feedback: '',
    statusMessage: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (project) {
      setFormData({
        projectName: project.projectName || '',
        location: project.location || '',
        budget: project.budget || '',
        projectType: project.projectType || '',
        areaSqft: project.areaSqft || '',
        address: project.address || '',
        city: project.city || '',
        state: project.state || '',
        startDate: project.startDate || '',
        completionDate: project.completionDate || '',
        feedback: project.feedback || '',
        statusMessage: project.statusMessage || ''
      });
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.projectName.trim()) newErrors.projectName = 'Project name is required';
    if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Valid budget is required';
    if (!formData.areaSqft || formData.areaSqft <= 0) newErrors.areaSqft = 'Valid area is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      onHide();
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton style={{ backgroundColor: 'var(--light-bg)' }}>
        <Modal.Title style={{ color: 'var(--primary-color)' }}>
          {readOnly ? 'Project Details' : project?.id ? 'Edit Project' : 'Add New Project'}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Project Name *</Form.Label>
                <Form.Control
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleChange}
                  isInvalid={!!errors.projectName}
                  placeholder="Enter project name"
                  readOnly={readOnly}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.projectName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Budget *</Form.Label>
                <Form.Control
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  isInvalid={!!errors.budget}
                  placeholder="Enter budget"
                  readOnly={readOnly}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.budget}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Project Type</Form.Label>
                <Form.Select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  disabled={readOnly}
                >
                  <option value="">Select project type</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Office">Office</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Area (Sq Ft) *</Form.Label>
                <Form.Control
                  type="number"
                  name="areaSqft"
                  value={formData.areaSqft}
                  onChange={handleChange}
                  isInvalid={!!errors.areaSqft}
                  placeholder="Enter area"
                  readOnly={readOnly}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.areaSqft}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  readOnly={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  readOnly={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                  readOnly={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              readOnly={readOnly}
            />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Completion Date</Form.Label>
                <Form.Control
                  type="date"
                  name="completionDate"
                  value={formData.completionDate}
                  onChange={handleChange}
                  readOnly={readOnly}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Label>Status Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              name="statusMessage"
              value={formData.statusMessage}
              onChange={handleChange}
              placeholder="Enter status message"
              readOnly={readOnly}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Feedback</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Enter project feedback or requirements"
              readOnly={readOnly}
            />
          </Form.Group>

          {project?.id && (
            <Alert variant="info" className="mb-3">
              <strong>Project Status:</strong> {project.projectStatus} <br />
              <strong>Designer:</strong> {project.designerName || 'Not Assigned'}
            </Alert>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          {readOnly ? 'Close' : 'Cancel'}
        </Button>
        {!readOnly && (
          <Button 
            style={{ backgroundColor: 'var(--primary-color)', borderColor: 'var(--primary-color)' }}
            onClick={handleSubmit}
          >
            {project?.id ? 'Update Project' : 'Save Project'}
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProjectDetailsModal;