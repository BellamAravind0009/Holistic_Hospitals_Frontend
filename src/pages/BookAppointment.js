import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { bookAppointment, fetchProfiles, getProfileForAppointment } from '../api';
import { Card, Alert, Button, Form, Spinner, Modal, Container, Row, Col } from "react-bootstrap";
import { User, UserPlus, Clock, Calendar, UserCheck } from "react-feather";
// import { validateName, validateAge } from './utils/validators.py';

const departments = [
  "General Medicine", "Pediatrics", "Gynecology/Obstetrics (OB/GYN)", "Cardiology",
  "Orthopedics", "Dermatology", "ENT", "Neurology", "Psychiatry/Mental Health",
  "Ophthalmology", "Gastroenterology", "Pulmonology", "Oncology", "Urology",
];

const doctors = {
  "General Medicine": ["Dr. Smith", "Dr. Johnson", "Dr. Brown"],
  Pediatrics: ["Dr. Anderson", "Dr. Martinez"],
  "Gynecology/Obstetrics (OB/GYN)": ["Dr. Lee", "Dr. Taylor"],
  Cardiology: ["Dr. Wilson", "Dr. Davis", "Dr. Brown"],
  Orthopedics: ["Dr. Thomas", "Dr. Moore"],
  Dermatology: ["Dr. Martin", "Dr. White"],
  ENT: ["Dr. Clark", "Dr. Wright"],
  Neurology: ["Dr. Harris", "Dr. Garcia"],
  "Psychiatry/Mental Health": ["Dr. Martinez", "Dr. Robinson"],
  Ophthalmology: ["Dr. Rodriguez", "Dr. Lewis"],
  Gastroenterology: ["Dr. Walker", "Dr. Hall"],
  Pulmonology: ["Dr. Allen", "Dr. Young"],
  Oncology: ["Dr. Hernandez", "Dr. King"],
  Urology: ["Dr. Scott", "Dr. Green"],
};

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const BookAppointment = () => {
  const [formData, setFormData] = useState({ 
    name: "", 
    age: "", 
    sex: "O",
    date: "", 
    time: "",
    department: "", 
    doctor: "",
    version: 0 
  });
  const [loading, setLoading] = useState(false);
  const [profilesLoading, setProfilesLoading] = useState(true);
  const [departmentsLoading, setDepartmentsLoading] = useState(false);
  const [doctorsLoading, setDoctorsLoading] = useState(false);
  const [timeSlotsLoading, setTimeSlotsLoading] = useState(false);
  const [showDoctorList, setShowDoctorList] = useState(false);
  const [showDepartmentList, setShowDepartmentList] = useState(false);
  const [showTimeSlots, setShowTimeSlots] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch profiles when component mounts
  useEffect(() => {
    const loadProfiles = async () => {
      try {
        setProfilesLoading(true);
        const response = await fetchProfiles();
        setProfiles(response.data);
      } catch (error) {
        console.error("Error loading profiles:", error);
        setError("Failed to load patient profiles");
      } finally {
        setProfilesLoading(false);
      }
    };

    loadProfiles();
  }, []);

  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear errors when user starts changing values
    setError("");
    setErrors({...errors, [name]: ""});
  };

  const handleProfileSelect = async (profile) => {
    try {
      // Get detailed profile data for appointment
      const profileData = await getProfileForAppointment(profile.profile_name);
      
      setFormData({
        ...formData,
        name: profileData.data.name,
        age: profileData.data.age,
        sex: profileData.data.sex
      });
      
      setSelectedProfile(profile.profile_name);
      setShowProfileModal(false);
      
      // Clear any existing errors when profile is selected
      setErrors({});
      setError("");
    } catch (error) {
      console.error("Error loading profile details:", error);
      setError("Failed to load profile details");
    }
  };

  const handleDepartmentSelect = (department) => {
    setFormData({ ...formData, department, doctor: "" });
    setShowDepartmentList(false);
  };

  const handleDoctorSelect = (doctor) => {
    setFormData({ ...formData, doctor });
    setShowDoctorList(false);
  };

  const handleTimeSelect = (time) => {
    // Ensure time is in proper format (HH:MM:00)
    const formattedTime = time.includes(':') && time.split(':').length === 2 ? `${time}:00` : time;
    setFormData({ ...formData, time: formattedTime });
    setShowTimeSlots(false);
  };

  const checkTimeSlotAvailability = async () => {
    if (!formData.date) {
      setError("Please select a date first");
      return;
    }
    
    try {
      setTimeSlotsLoading(true);
      // If you have an API endpoint to check time slot availability, call it here
      // const response = await checkAvailableTimeSlots(formData.date);
      // Then filter timeSlots based on response
      
      // For now, just show all time slots
      setShowTimeSlots(true);
    } catch (error) {
      console.error("Error checking time slot availability:", error);
      setError("Failed to retrieve available time slots");
    } finally {
      setTimeSlotsLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    
    // Validate name (only letters, spaces, apostrophes, and hyphens)
    const nameRegex = /^[A-Za-z\s\'-]+$/;
    if (!formData.name || !nameRegex.test(formData.name)) {
      newErrors.name = "Name contains invalid characters. Only letters, spaces, apostrophes, and hyphens are allowed.";
      isValid = false;
    }
    
    // Validate age
    const age = parseInt(formData.age);
    if (isNaN(age) || age < 0 || age > 120) {
      newErrors.age = "Please enter a valid age between 0 and 120";
      isValid = false;
    }
    
    // Check if date is selected
    if (!formData.date) {
      newErrors.date = "Please select an appointment date";
      isValid = false;
    } else {
      // Check if date is Sunday
      const selectedDate = new Date(formData.date);
      if (selectedDate.getDay() === 0) { // 0 is Sunday
        newErrors.date = "Appointments are not available on Sundays";
        isValid = false;
      }
    }
    
    // Check if time is selected
    if (!formData.time) {
      newErrors.time = "Please select an appointment time";
      isValid = false;
    } else {
      // Check if time is during lunch break
      if (formData.time.startsWith("13:")) {
        newErrors.time = "Appointments are not available during lunch break (1 PM to 2 PM)";
        isValid = false;
      }
    }
    
    // Check if department is selected
    if (!formData.department) {
      newErrors.department = "Please select a department";
      isValid = false;
    }
    
    // Check if doctor is selected
    if (!formData.doctor) {
      newErrors.doctor = "Please select a doctor";
      isValid = false;
    }
    
    setErrors(newErrors);
    
    // If there are any validation errors, display a summary error message
    if (!isValid) {
      const errorMessages = Object.values(newErrors).filter(message => message);
      setError(errorMessages.join('\n'));
    }
    
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book an appointment.");
      navigate("/login");
      return;
    }
  
    // Run client-side validation first
    if (!validateForm()) {
      return;
    }
  
    try {
      setLoading(true);
      setError("");
      
      const response = await bookAppointment(formData);
      
      if (response.status === 200 || response.status === 201) {
        // Update version from response if provided
        if (response.data.version) {
          setFormData({ ...formData, version: response.data.version });
        }
        
        // Redirect to payment page with appointment details
        navigate("/payment", { 
          state: { 
            formData: { ...formData, id: response.data.id }, 
            amount: 500 
          } 
        });
      } else {
        setError("Error booking appointment. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      if (error.response?.data) {
        // Handle validation errors from backend
        const backendErrors = error.response.data;
        if (typeof backendErrors === 'object') {
          // Create formatted error messages for specific fields
          let errorMessages = [];
          const newErrors = {};
          
          // Process specific field errors
          Object.entries(backendErrors).forEach(([key, messages]) => {
            if (Array.isArray(messages)) {
              newErrors[key] = messages.join(', ');
              errorMessages.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${messages.join(', ')}`);
            } else if (typeof messages === 'string') {
              newErrors[key] = messages;
              errorMessages.push(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${messages}`);
            }
          });
          
          setErrors(newErrors);
          setError(errorMessages.join('\n'));
        } else if (typeof backendErrors === 'string') {
          setError(backendErrors);
        } else {
          setError("Failed to book appointment. Please try again later.");
        }
      } else {
        setError("Failed to book appointment. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 rounded-lg">
            <Card.Body className="p-4">
              <h2 className="text-center text-primary mb-4">Book an Appointment</h2>
              
              {error && <Alert variant="danger" className="mb-3" style={{ whiteSpace: 'pre-line' }}>{error}</Alert>}
              
              <Form onSubmit={handleSubmit} noValidate>
                {/* Profile Selection */}
                <Form.Group className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <Form.Label>Patient Profile</Form.Label>
                    <Button 
                      variant="outline-primary" 
                      size="sm" 
                      onClick={() => navigate("/ProfileManagement")}
                    >
                      <UserPlus size={14} className="me-1" /> Manage Profiles
                    </Button>
                  </div>
                  <div className="input-group">
                    <Button 
                      variant="outline-secondary" 
                      onClick={() => setShowProfileModal(true)}
                      disabled={profilesLoading}
                      className="w-100 text-start"
                    >
                      {profilesLoading ? (
                        <><Spinner size="sm" animation="border" className="me-2" /> Loading profiles...</>
                      ) : selectedProfile ? (
                        <><UserCheck size={16} className="me-2" /> {selectedProfile}</>
                      ) : (
                        <><User size={16} className="me-2" /> Select a profile</>
                      )}
                    </Button>
                  </div>
                  {selectedProfile && (
                    <Form.Text className="text-muted">Using profile: {selectedProfile}</Form.Text>
                  )}
                </Form.Group>
                
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Patient Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder="Enter Name"
                        onChange={handleChange}
                        required
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Only letters, spaces, apostrophes, and hyphens
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        name="age"
                        value={formData.age}
                        placeholder="Age"
                        onChange={handleChange}
                        required
                        min="0"
                        max="120"
                        isInvalid={!!errors.age}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.age}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Sex</Form.Label>
                  <Form.Select
                    name="sex"
                    value={formData.sex}
                    onChange={handleChange}
                    required
                    isInvalid={!!errors.sex}
                  >
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errors.sex}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Appointment Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="date"
                        value={formData.date}
                        min={getTodayDate()}
                        onChange={(e) => {
                          handleChange(e);
                          // Reset time when date changes
                          setFormData(prev => ({...prev, time: ""}));
                        }}
                        required
                        isInvalid={!!errors.date}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.date}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Note: Appointments are not available on Sundays
                      </Form.Text>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3 position-relative">
                      <Form.Label>Time Slot</Form.Label>
                      <div className="input-group">
                        <Form.Control
                          type="text"
                          name="time"
                          value={formData.time}
                          placeholder="Select Time"
                          readOnly
                          onClick={() => formData.date ? checkTimeSlotAvailability() : setError("Please select a date first")}
                          required
                          isInvalid={!!errors.time}
                        />
                        <Button 
                          variant="outline-secondary"
                          onClick={() => formData.date ? checkTimeSlotAvailability() : setError("Please select a date first")}
                          disabled={timeSlotsLoading}
                        >
                          {timeSlotsLoading ? <Spinner size="sm" animation="border" /> : <Clock size={16} />}
                        </Button>
                      </div>
                      <Form.Control.Feedback type="invalid">
                        {errors.time}
                      </Form.Control.Feedback>
                      <Form.Text className="text-muted">
                        Note: No appointments during lunch (1 PM - 2 PM)
                      </Form.Text>
                      {showTimeSlots && (
                        <div className="position-absolute bg-white border rounded mt-1 p-2" style={{ zIndex: 1, maxHeight: "200px", overflowY: "auto", width: "100%" }}>
                          {timeSlotsLoading ? (
                            <div className="text-center py-2">
                              <Spinner size="sm" animation="border" />
                              <p className="mb-0 mt-1">Loading available slots...</p>
                            </div>
                          ) : (
                            <div className="d-flex flex-wrap">
                              {timeSlots.map((time) => (
                                <div 
                                  key={time} 
                                  className="p-2 m-1 rounded border text-center hover-bg-light cursor-pointer"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleTimeSelect(time)}
                                >
                                  <Clock size={12} className="me-1" />
                                  {time}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                
                <Form.Group className="mb-3 position-relative">
                  <Form.Label>Department</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      name="department"
                      value={formData.department}
                      placeholder="Select Department"
                      readOnly
                      onClick={() => setShowDepartmentList(!showDepartmentList)}
                      required
                      isInvalid={!!errors.department}
                    />
                    <Button 
                      variant="outline-secondary"
                      onClick={() => setShowDepartmentList(!showDepartmentList)}
                      disabled={departmentsLoading}
                    >
                      {departmentsLoading ? <Spinner size="sm" animation="border" /> : <i className="fa fa-list"></i>}
                    </Button>
                  </div>
                  <Form.Control.Feedback type="invalid">
                    {errors.department}
                  </Form.Control.Feedback>
                  {showDepartmentList && (
                    <div className="position-absolute bg-white border rounded mt-1 p-2" style={{ zIndex: 1, maxHeight: "200px", overflowY: "auto", width: "100%" }}>
                      {departmentsLoading ? (
                        <div className="text-center py-2">
                          <Spinner size="sm" animation="border" />
                          <p className="mb-0 mt-1">Loading departments...</p>
                        </div>
                      ) : (
                        departments.map((dept) => (
                          <div 
                            key={dept} 
                            className="p-2 rounded hover-bg-light"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDepartmentSelect(dept)}
                          >
                            {dept}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </Form.Group>
                
                {formData.department && (
                  <Form.Group className="mb-3 position-relative">
                    <Form.Label>Doctor</Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="text"
                        name="doctor"
                        value={formData.doctor}
                        placeholder="Select Doctor"
                        readOnly
                        onClick={() => setShowDoctorList(!showDoctorList)}
                        required
                        isInvalid={!!errors.doctor}
                      />
                      <Button 
                        variant="outline-secondary"
                        onClick={() => setShowDoctorList(!showDoctorList)}
                        disabled={doctorsLoading}
                      >
                        {doctorsLoading ? <Spinner size="sm" animation="border" /> : <i className="fa fa-user-md"></i>}
                      </Button>
                    </div>
                    <Form.Control.Feedback type="invalid">
                      {errors.doctor}
                    </Form.Control.Feedback>
                    {showDoctorList && (
                      <div className="position-absolute bg-white border rounded mt-1 p-2" style={{ zIndex: 1, width: "100%" }}>
                        {doctorsLoading ? (
                          <div className="text-center py-2">
                            <Spinner size="sm" animation="border" />
                            <p className="mb-0 mt-1">Loading doctors...</p>
                          </div>
                        ) : (
                          doctors[formData.department].map((doctor) => (
                            <div 
                              key={doctor} 
                              className="p-2 rounded hover-bg-light"
                              style={{ cursor: "pointer" }}
                              onClick={() => handleDoctorSelect(doctor)}
                            >
                              {doctor}
                            </div>
                          ))
                        )}
                      </div>
                    )}
                  </Form.Group>
                )}
                
                <Button 
                  type="submit" 
                  variant="success" 
                  className="w-100 py-2 mt-3" 
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                      Booking...
                    </>
                  ) : "Proceed to Payment"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      {/* Profile Selection Modal */}
      <Modal show={showProfileModal} onHide={() => setShowProfileModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Select Patient Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {profilesLoading ? (
            <div className="text-center py-3">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading profiles...</p>
            </div>
          ) : profiles.length === 0 ? (
            <div className="text-center py-3">
              <p>No saved profiles found.</p>
              <Button 
                variant="primary" 
                onClick={() => {
                  setShowProfileModal(false);
                  navigate("/ProfileManagement");
                }}
              >
                Create a Profile
              </Button>
            </div>
          ) : (
            <div className="list-group">
              {profiles.map((profile, index) => (
                <Button
                  key={index}
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  onClick={() => handleProfileSelect(profile)}
                  variant="outline-light"
                >
                  <div>
                    <h6 className="mb-1">{profile.profile_name}</h6>
                    <small className="text-muted">
                      Name: {profile.patient_name}, Age: {profile.age}
                    </small>
                  </div>
                  <User size={16} className="text-primary" />
                </Button>
              ))}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProfileModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => {
              setShowProfileModal(false);
              navigate("/ProfileManagement");
            }}
          >
            Manage Profiles
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BookAppointment;