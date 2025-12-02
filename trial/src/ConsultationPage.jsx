import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ConsultationPage = ({ onBack }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    propertyType: '',
    bhkType: '',
    budget: '',
    specificRequests: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="container mt-5">
      {onBack && (
        <button className="btn btn-link mb-3" onClick={onBack}>
          ← Back to Dashboard
        </button>
      )}
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h3 className="mb-0 text-center">Consultation Request</h3>
            </div>
            <div className="card-body">
              <div className="mb-4">
                
                <p className="text-muted text-center mb-3">
                  Share a few details about your home. Our interior design team will review your requirements and get back to you with a personalised consultation.
                </p>
                <h5 className="mb-3">Tell us about your space</h5>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label className="form-label">Phone Number *</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-4">
                    <label className="form-label">Property Type *</label>
                    <select
                      className="form-select"
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Property Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="independent-house">Independent House</option>
                      <option value="villa">Villa</option>
                      <option value="office-commercial">Office/Commercial</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">BHK Type *</label>
                    <select
                      className="form-select"
                      name="bhkType"
                      value={formData.bhkType}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select BHK</option>
                      <option value="1bhk">1 BHK</option>
                      <option value="2bhk">2 BHK</option>
                      <option value="3bhk">3 BHK</option>
                      <option value="4bhk">4 BHK</option>
                      <option value="4bhk+">4 BHK+</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">Budget *</label>
                    <select
                      className="form-select"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Budget</option>
                      <option value="below-3">Below 3 Lakhs</option>
                      <option value="3-7">3-7 Lakhs</option>
                      <option value="7-15">7-15 Lakhs</option>
                      <option value="15+">15 Lakhs+</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Specific Requests</label>
                  <textarea
                    className="form-control"
                    name="specificRequests"
                    rows="4"
                    value={formData.specificRequests}
                    onChange={handleChange}
                    placeholder="Tell us about your specific requirements, preferences, or any special requests..."
                  ></textarea>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Submit Consultation Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;

