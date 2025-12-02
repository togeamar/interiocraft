import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ConsultationPage from './ConsultationPage';

const UserDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [projects] = useState({
    requests: 2,
    ongoing: 1,
    completed: 3
  });

  const handleNavigation = (view) => {
    setCurrentView(view);
  };

  if (currentView === 'consultation') {
    return <ConsultationPage onBack={() => setCurrentView('dashboard')} />;
  }

  if (currentView === 'requests') {
    return (
      <div className="container mt-4">
        <button className="btn btn-link mb-3" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</button>
        <h3>Send Requests</h3>
        <div className="card">
          <div className="card-body">
            <button className="btn btn-primary" onClick={() => setCurrentView('consultation')}>New Consultation Request</button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'ongoing') {
    return (
      <div className="container mt-4">
        <button className="btn btn-link mb-3" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</button>
        <h3>Ongoing Projects ({projects.ongoing})</h3>
        <div className="card">
          <div className="card-body">
            <p>Project #001 - Living Room Design</p>
            <div className="progress mb-2">
              <div className="progress-bar" style={{width: '60%'}}>60%</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'completed') {
    return (
      <div className="container mt-4">
        <button className="btn btn-link mb-3" onClick={() => setCurrentView('dashboard')}>← Back to Dashboard</button>
        <h3>Completed Projects ({projects.completed})</h3>
        <div className="card mb-3">
          <div className="card-body">
            <h5>Kitchen Renovation</h5>
            <p className="text-success">Completed on March 15, 2024</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">User Dashboard</h2>
        </div>
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">My Projects</h4>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <button className="btn btn-outline-primary w-100 py-3 position-relative" onClick={() => handleNavigation('requests')}>
                    Send Requests
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{projects.requests}</span>
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-outline-warning w-100 py-3 position-relative" onClick={() => handleNavigation('ongoing')}>
                    Ongoing Projects
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">{projects.ongoing}</span>
                  </button>
                </div>
                <div className="col-md-4">
                  <button className="btn btn-outline-success w-100 py-3 position-relative" onClick={() => handleNavigation('completed')}>
                    Completed Projects
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">{projects.completed}</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="card-footer bg-light">
              <div className="row g-2">
                <div className="col-6">
                  <button className="btn btn-secondary w-100" onClick={() => alert('Budget tracking feature coming soon!')}>
                    Budget
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-secondary w-100" onClick={() => setCurrentView('consultation')}>
                    Consultations
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;