import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Calendar, User, Clock, Award, UserCheck, Home, AlertCircle, FileText } from "react-feather";
import { Container, Card, Button, Row, Col, Badge } from "react-bootstrap";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    name, 
    age, 
    department, 
    doctor, 
    token_number, 
    date, 
    time, 
    transaction_id, 
    payment_status, 
    payment_timestamp 
  } = location.state || {};

  // Check if we have all the required data
  if (![name, department, doctor, token_number, date].every(Boolean)) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Card className="shadow-lg border-0 text-center p-5">
          <h2 className="text-danger mb-4">Invalid Appointment Data</h2>
          <p className="text-muted mb-4">
            We couldn't retrieve your appointment details. Please try booking again.
          </p>
          <Button
            onClick={() => navigate("/")}
            variant="primary"
            size="lg"
            className="px-4"
          >
            <Home size={18} className="me-2" />
            Return to Home
          </Button>
        </Card>
      </Container>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "N/A";
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(timestamp).toLocaleString(undefined, options);
  };

  // Get appropriate status badge color
  const getStatusBadgeVariant = (status) => {
    switch(status) {
      case "Paid": return "success";
      case "Failed": return "danger";
      case "Processing": return "warning";
      case "Pending": return "primary";
      default: return "secondary";
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 py-5">
      <Card className="shadow-lg border-0 overflow-hidden" style={{ maxWidth: "500px" }}>
        {/* Success header */}
        <div className="bg-success text-white p-4 text-center">
          <CheckCircle size={60} className="mb-3" />
          <h2 className="mb-0">Appointment Confirmed!</h2>
          <p className="mb-0">Your appointment has been successfully booked</p>
        </div>
        
        <Card.Body className="p-4">
          {/* Payment status section */}
          {payment_status && (
            <div className="mb-4 pb-3 border-bottom">
              <Row className="align-items-center">
                <Col>
                  <h5 className="mb-2">Payment Status</h5>
                  <Badge bg={getStatusBadgeVariant(payment_status)} className="px-3 py-2">
                    {payment_status}
                  </Badge>
                  {payment_timestamp && (
                    <div className="text-muted mt-2">
                      <small>Transaction time: {formatTimestamp(payment_timestamp)}</small>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}
          
          {/* Transaction ID section */}
          {transaction_id && (
            <div className="mb-4 pb-3 border-bottom">
              <Row className="align-items-center">
                <Col xs="auto">
                  <div className="bg-light p-2 rounded-circle">
                    <FileText size={24} className="text-primary" />
                  </div>
                </Col>
                <Col>
                  <h5 className="mb-1">Transaction ID</h5>
                  <div className="font-monospace">{transaction_id}</div>
                  <small className="text-muted">Please save this for your records</small>
                </Col>
              </Row>
            </div>
          )}
        
          <div className="mb-4 pb-3 border-bottom">
            <Row className="align-items-center">
              <Col xs="auto">
                <div className="bg-light p-2 rounded-circle">
                  <Award size={24} className="text-success" />
                </div>
              </Col>
              <Col>
                <h5 className="mb-0">Token Number</h5>
                <div className="d-flex align-items-center">
                  <span className="display-6 fw-bold text-success">{token_number}</span>
                  <span className="text-muted ms-2">(Please keep this number handy)</span>
                </div>
              </Col>
            </Row>
          </div>
          
          <h5 className="text-primary mb-3">Appointment Details</h5>
          <div className="mb-4">
            <div className="d-flex mb-3">
              <div className="me-3">
                <UserCheck size={20} className="text-primary" />
              </div>
              <div>
                <div className="fw-bold">Patient</div>
                <div>{name}{age ? `, ${age} years` : ''}</div>
              </div>
            </div>
            
            <div className="d-flex mb-3">
              <div className="me-3">
                <Calendar size={20} className="text-primary" />
              </div>
              <div>
                <div className="fw-bold">Date & Time</div>
                <div>{formatDate(date)}{time ? `, ${time}` : ''}</div>
              </div>
            </div>
            
            <div className="d-flex mb-3">
              <div className="me-3">
                <User size={20} className="text-primary" />
              </div>
              <div>
                <div className="fw-bold">Doctor</div>
                <div>{doctor}</div>
              </div>
            </div>
            
            <div className="d-flex">
              <div className="me-3">
                <Clock size={20} className="text-primary" />
              </div>
              <div>
                <div className="fw-bold">Department</div>
                <div>{department}</div>
              </div>
            </div>
          </div>
          
          <div className="alert alert-info d-flex align-items-start" role="alert">
            <AlertCircle size={20} className="me-2 flex-shrink-0 mt-1" />
            <div>
              <strong>Note:</strong> Please arrive 15 minutes before your scheduled appointment time.
              Bring your ID and any relevant medical records.
            </div>
          </div>
        </Card.Body>
        
        <Card.Footer className="bg-white border-0 p-4">
          <Button
            onClick={() => navigate("/")}
            variant="success"
            className="w-100"
            size="lg"
          >
            <Home size={18} className="me-2" />
            Return to Home
          </Button>
          
          <div className="d-flex justify-content-between mt-3">
            <Button 
              variant="outline-primary" 
              size="sm"
              onClick={() => window.print()}
            >
              Print Details
            </Button>
            
            <Button 
              variant="link" 
              className="text-muted" 
              onClick={() => navigate("/appointments")}
            >
              View all appointments
            </Button>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Confirmation;