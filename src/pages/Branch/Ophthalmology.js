import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Ophthalmology = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card text-center shadow-lg">
        <div className="card-header bg-warning text-dark">
          <h3><i className="bi bi-exclamation-triangle-fill me-2"></i>Development Mode</h3>
        </div>
        <div className="card-body">
          <h2 className="card-title">Website Under Construction</h2>
          <p className="card-text">This site is currently in development. We're working hard to bring you an amazing experience soon!</p>
          <div className="progress my-4">
            <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" role="progressbar" style={{ width: '75%' }} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">75%</div>
          </div>
          <button className="btn btn-primary">Contact Us</button>
        </div>
        <div className="card-footer text-muted">
          Expected launch: Coming Soon
        </div>
      </div>
    </div>
  );
};

export default Ophthalmology;