import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAppointments, updateAppointment } from "../api";
import { 
  Container, 
  Card, 
  Form, 
  Button, 
  Alert, 
  Spinner, 
  Row, 
  Col,
  InputGroup
} from "react-bootstrap";
import { Calendar, Clock, Edit, User, CheckCircle, ArrowLeft } from "react-feather";

const UpdateAppointment = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [appointment, setAppointment] = useState(null);
  const [allAppointments, setAllAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [version, setVersion] = useState(0);

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };
  
  // Fetch all appointments when component mounts
  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setFetchLoading(true);
        const response = await fetchAppointments();
        
        console.log("API Response:", response);
        
        // Handle different response formats
        let appointmentsData = [];
        if (response.data) {
          if (Array.isArray(response.data)) {
            appointmentsData = response.data;
          } else if (response.data.results && Array.isArray(response.data.results)) {
            appointmentsData = response.data.results;
          }
        }
        
        console.log("Loaded appointments:", appointmentsData);
        setAllAppointments(appointmentsData);
        
      } catch (error) {
        console.error("Error loading appointments:", error);
        setMessage({
          type: "danger",
          text: "Failed to load appointments. Please try again."
        });
      } finally {
        setFetchLoading(false);
      }
    };
    
    loadAppointments();
  }, []);

  const fetchAppointment = async () => {
    if (!validateName(name)) {
      setMessage({ 
        type: "warning", 
        text: "Please enter a valid name. Only letters, spaces, apostrophes, and hyphens are allowed." 
      });
      return;
    }
    
    setFetchLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      // Check if allAppointments actually contains the expected data
      if (!Array.isArray(allAppointments) || allAppointments.length === 0) {
        setMessage({ 
          type: "warning", 
          text: "No appointments found. Please create a new appointment." 
        });
        setAppointment(null);
        return;
      }
      
      // Find the appointment with matching name (case insensitive)
      const foundAppointment = allAppointments.find(
        (appt) => appt.name && appt.name.toLowerCase() === name.toLowerCase()
      );
      
      if (!foundAppointment) {
        console.log("Available appointments:", allAppointments);
        setMessage({ 
          type: "warning", 
          text: "No appointment found for this name. Please check the spelling or create a new appointment." 
        });
        setAppointment(null);
        return;
      }
  
      setAppointment(foundAppointment);
      setNewDate(foundAppointment.date);
      // Extract the time from the appointment or set a default
      setNewTime(foundAppointment.time ? foundAppointment.time.substring(0, 5) : "09:00");
      setVersion(foundAppointment.version || 0);
      setStep(2);
    } catch (error) {
      console.error("Error fetching:", error);
      setMessage({ 
        type: "danger", 
        text: "Error fetching appointment details. Please try again." 
      });
    } finally {
      setFetchLoading(false);
    }
  };

  const validateName = (nameToValidate) => {
    // Only letters, spaces, apostrophes, and hyphens are allowed
    const nameRegex = /^[A-Za-z\s\'-]+$/;
    return nameToValidate.trim() !== "" && nameRegex.test(nameToValidate);
  };
  
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate date
    if (!newDate) {
      newErrors.date = "Please select a valid date";
      isValid = false;
    } else {
      // Check if date is Sunday
      const selectedDate = new Date(newDate);
      if (selectedDate.getDay() === 0) { // 0 is Sunday
        newErrors.date = "Appointments are not available on Sundays";
        isValid = false;
      }
    }
    
    // Validate time
    if (!newTime) {
      newErrors.time = "Please select a valid time";
      isValid = false;
    } else {
      // Check if time is during lunch hour (13:00-14:00)
      const hour = parseInt(newTime.split(':')[0], 10);
      if (hour === 13) {
        newErrors.time = "Appointments are not available during lunch break (1 PM to 2 PM)";
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMessage({ 
        type: "warning", 
        text: "Please correct the errors before updating your appointment." 
      });
      return;
    }
    
    if (!appointment || !newDate || !newTime) {
      setMessage({ type: "warning", text: "Please enter valid date and time." });
      return;
    }
    
    if (newDate === appointment.date && newTime === appointment.time) {
      setMessage({ type: "info", text: "The new date and time are the same as current. No changes needed." });
      return;
    }
    
    setLoading(true);
    setMessage({ type: "", text: "" });
  
    try {
      // Make sure we're sending the right data structure
      const response = await updateAppointment({ 
        id: appointment.id, // Make sure ID is included
        date: newDate,
        time: newTime
      });
      
      console.log("Update response:", response);

      // Update from response if available
      if (response.data && response.data.appointment) {
        setAppointment(response.data.appointment);
      }
      
      setMessage({ 
        type: "success", 
        text: "Appointment updated successfully!" 
      });
      setStep(3);
    } catch (error) {
      console.error("Update error:", error);
      
      // Handle various error scenarios
      if (error.response?.status === 409) {
        setMessage({ 
          type: "danger", 
          text: "This appointment has been modified by someone else. Please refresh and try again." 
        });
      } else {
        setMessage({ 
          type: "danger", 
          text: error.response?.data?.error || "Error updating appointment. Please try again." 
        });
      }
    } finally {
      setLoading(false);
    }
  };
  
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  const goBack = () => {
    if (step === 2) {
      setStep(1);
      setAppointment(null);
      setErrors({});
    } else if (step === 3) {
      navigate("/appointments");
    }
  };
  
  const goToAppointments = () => {
    navigate("/appointments");
  };

  // Generate time slots for the time picker
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      if (hour === 13) continue; // Skip lunch hour
      
      const hourStr = hour.toString().padStart(2, '0');
      options.push(
        <option key={`${hourStr}:00`} value={`${hourStr}:00`}>{`${hourStr}:00`}</option>
      );
      options.push(
        <option key={`${hourStr}:30`} value={`${hourStr}:30`}>{`${hourStr}:30`}</option>
      );
    }
    return options;
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow border-0">
            <Card.Header className="bg-primary text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-0">
                  {step === 1 && <><Edit size={20} className="me-2" /> Find Your Appointment</>}
                  {step === 2 && <><Calendar size={20} className="me-2" /> Update Appointment</>}
                  {step === 3 && <><CheckCircle size={20} className="me-2" /> Appointment Updated</>}
                </h4>
                {step > 1 && (
                  <Button 
                    variant="outline-light" 
                    size="sm" 
                    onClick={goBack}
                  >
                    <ArrowLeft size={16} /> Back
                  </Button>
                )}
              </div>
            </Card.Header>
            
            <Card.Body className="p-4">
              {message.text && (
                <Alert variant={message.type} className="mb-4">
                  {message.text}
                </Alert>
              )}
              
              {step === 1 && (
                <>
                  <p className="text-muted mb-4">
                    Enter your name to find your appointment. We'll help you reschedule it.
                  </p>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>Your Name</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <User size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Only letters, spaces, apostrophes, and hyphens are allowed
                    </Form.Text>
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      onClick={fetchAppointment}
                      disabled={fetchLoading || !name.trim()}
                    >
                      {fetchLoading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Searching...
                        </>
                      ) : (
                        "Find Appointment"
                      )}
                    </Button>
                  </div>
                </>
              )}
              
              {step === 2 && appointment && (
                <Form onSubmit={handleUpdate}>
                  <div className="mb-4">
                    <h5>Appointment Details</h5>
                    <Card className="bg-light mb-4">
                      <Card.Body>
                        <Row>
                          <Col sm={6}>
                            <p className="mb-1"><strong>Patient:</strong> {appointment.name}</p>
                            <p className="mb-1"><strong>Department:</strong> {appointment.department}</p>
                          </Col>
                          <Col sm={6}>
                            <p className="mb-1"><strong>Doctor:</strong> {appointment.doctor}</p>
                            <p className="mb-1"><strong>Token:</strong> {appointment.token_number}</p>
                          </Col>
                        </Row>
                        <input type="hidden" name="version" value={version} />
                      </Card.Body>
                    </Card>
                  </div>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Current Appointment Date</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Calendar size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        value={formatDate(appointment.date)}
                        disabled
                        className="bg-light"
                      />
                    </InputGroup>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>New Appointment Date</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Calendar size={16} />
                      </InputGroup.Text>
                      <Form.Control
                        type="date"
                        value={newDate}
                        min={getTodayDate()}
                        onChange={(e) => setNewDate(e.target.value)}
                        required
                        isInvalid={!!errors.date}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Select a new date for your appointment. Note: Appointments are not available on Sundays.
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group className="mb-4">
                    <Form.Label>New Appointment Time</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <Clock size={16} />
                      </InputGroup.Text>
                      <Form.Select
                        value={newTime}
                        onChange={(e) => setNewTime(e.target.value)}
                        required
                        isInvalid={!!errors.time}
                      >
                        {generateTimeOptions()}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.time}
                      </Form.Control.Feedback>
                    </InputGroup>
                    <Form.Text className="text-muted">
                      Select a new time. Note: Appointments are not available during lunch hour (1 PM - 2 PM).
                    </Form.Text>
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      type="submit" 
                      variant="warning" 
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                          Updating...
                        </>
                      ) : (
                        "Update Appointment"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
              
              {step === 3 && (
                <div className="text-center py-3">
                  <div className="mb-4">
                    <CheckCircle size={80} className="text-success mb-3" />
                    <h4>Appointment Updated Successfully!</h4>
                    <p className="text-muted">
                      Your appointment has been rescheduled for {formatDate(newDate)} at {newTime}.
                    </p>
                  </div>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={goToAppointments}
                    >
                      View All Appointments
                    </Button>
                  </div>
                </div>
              )}
            </Card.Body>
            
            <Card.Footer className="bg-light text-center py-3">
              <small className="text-muted">
                Need help? Contact our support team at support@holistichospitals.com
              </small>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateAppointment;