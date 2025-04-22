import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Edit, 
  Eye, 
  Heart, 
  Stethoscope,
  Brain,
  Bone,
  Calendar as CalendarIcon,
  Clock,
  Award,
  Users,
  Plus,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Star,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { fetchAppointments } from "../api"; 

const Home = () => {
  const navigate = useNavigate();
  const [upcomingAppointment, setUpcomingAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const username = localStorage.getItem("username");

  // Fetch the user's upcoming appointments
  useEffect(() => {
    const getUserAppointments = async () => {
      try {
        setLoading(true);
        // Get today's date in YYYY-MM-DD format for filtering
        const today = new Date().toISOString().split('T')[0];
        
        // Fetch appointments with date filter for upcoming appointments
        const response = await fetchAppointments(1, today);
        
        if (response && response.data && response.data.results && response.data.results.length > 0) {
          // Sort appointments by date and time to get the closest upcoming one
          const appointments = response.data.results;
          appointments.sort((a, b) => {
            // First compare dates
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            if (dateA > dateB) return 1;
            if (dateA < dateB) return -1;
            
            // If dates are equal, compare times
            return a.time.localeCompare(b.time);
          });
          
          // Format the date and time for display
          const nextAppointment = appointments[0];
          const appointmentDate = new Date(nextAppointment.date);
          const formattedDate = appointmentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
          
          // Format time from 24h to 12h format (if it's in 24h format)
          let formattedTime = nextAppointment.time;
          if (formattedTime.includes(':')) {
            const [hours, minutes] = formattedTime.split(':');
            const hour = parseInt(hours, 10);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            formattedTime = `${hour12}:${minutes} ${ampm}`;
          }
          
          setUpcomingAppointment({
            id: nextAppointment.id,
            doctor: nextAppointment.doctor || "Dr. " + nextAppointment.department,
            specialty: nextAppointment.department || nextAppointment.specialty || "General Checkup",
            date: formattedDate,
            time: formattedTime,
            status: nextAppointment.status || "Scheduled"
          });
        } else {
          // No upcoming appointments found
          setUpcomingAppointment(null);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to load your appointments. Please try again later.");
        setLoading(false);
      }
    };

    // Only fetch appointments if user is logged in
    if (localStorage.getItem("token")) {
      getUserAppointments();
    } else {
      setLoading(false);
    }
  }, []);

  // Hospital specialties with descriptions
  const specialties = [
    { 
      name: "Cardiology", 
      icon: <Heart size={24} />,
      description: "State-of-the-art cardiac care with advanced diagnostic and treatment procedures for heart conditions."
    },
    { 
      name: "GeneralMedicine", 
      icon: <Stethoscope size={24} />,
      description: "Comprehensive primary care services for patients of all ages, focusing on prevention and overall wellness."
    },
    { 
      name: "Orthopedics", 
      icon: <Bone size={24} />,
      description: "Expert care for bone, joint, and muscle conditions with minimally invasive surgical techniques."
    },
    { 
      name: "Neurology", 
      icon: <Brain size={24} />,
      description: "Advanced neurological services for diagnosing and treating disorders of the brain, spine, and nervous system."
    }
  ];

  // Hospital stats 
  const hospitalStats = [
    { value: "25+", label: "Years of Excellence", icon: <Award size={24} /> },
    { value: "150+", label: "Specialist Doctors", icon: <Users size={24} /> },
    { value: "50,000+", label: "Patients Annually", icon: <Stethoscope size={24} /> },
    { value: "99%", label: "Patient Satisfaction", icon: <Star size={24} /> }
  ];

  // Function to render the appointment card based on data state
  const renderAppointmentCard = () => {
    // If not logged in
    if (!localStorage.getItem("token")) {
      return (
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-header text-white p-3 rounded-top-4 d-flex align-items-center bg-info">
            <CalendarIcon size={20} className="me-2" />
            <h5 className="mb-0 fw-bold">Appointment Information</h5>
          </div>
          <div className="card-body p-4 text-center">
            <p className="mb-3">Please login to view your upcoming appointments</p>
            <button 
              onClick={() => navigate("/login")} 
              className="btn btn-primary"
            >
              Login
            </button>
          </div>
        </div>
      );
    }
    
    // If loading
    if (loading) {
      return (
        <div className="card border-0 shadow-sm rounded-4 mb-4 upcoming-appointment">
          <div className="card-header text-white p-3 rounded-top-4 d-flex align-items-center">
            <Clock size={20} className="me-2" />
            <h5 className="mb-0 fw-bold">Your Next Appointment</h5>
          </div>
          <div className="card-body p-4 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 mb-0">Loading your appointments...</p>
          </div>
        </div>
      );
    }
    
    // If error
    if (error) {
      return (
        <div className="card border-0 shadow-sm rounded-4 mb-4 upcoming-appointment">
          <div className="card-header text-white p-3 rounded-top-4 d-flex align-items-center bg-danger">
            <Clock size={20} className="me-2" />
            <h5 className="mb-0 fw-bold">Your Next Appointment</h5>
          </div>
          <div className="card-body p-4 text-center">
            <p className="text-danger mb-0">{error}</p>
          </div>
        </div>
      );
    }
    
    // If no upcoming appointments
    if (!upcomingAppointment) {
      return (
        <div className="card border-0 shadow-sm rounded-4 mb-4 upcoming-appointment">
          <div className="card-header text-white p-3 rounded-top-4 d-flex align-items-center">
            <Clock size={20} className="me-2" />
            <h5 className="mb-0 fw-bold">Your Next Appointment</h5>
          </div>
          <div className="card-body p-4 text-center">
            <p className="mb-3">You don't have any upcoming appointments</p>
            <button 
              onClick={() => navigate("/book")} 
              className="btn btn-success d-flex align-items-center justify-content-center gap-2 mx-auto"
            >
              <Plus size={20} /> Book an Appointment
            </button>
          </div>
        </div>
      );
    }
    
    // If has upcoming appointment
    return (
      <div className="card border-0 shadow-sm rounded-4 mb-4 upcoming-appointment">
        <div className="card-header text-white p-3 rounded-top-4 d-flex align-items-center bg-primary">
          <Clock size={20} className="me-2" />
          <h5 className="mb-0 fw-bold">Your Next Appointment</h5>
        </div>
        <div className="card-body p-4">
          <div className="appointment-info">
            <div className="appointment-item">
              <div className="icon-wrapper">
                <Stethoscope size={20} />
              </div>
              <div>
                <h6 className="mb-0">{upcomingAppointment.doctor}</h6>
                <small className="text-muted">{upcomingAppointment.specialty}</small>
              </div>
            </div>
            <div className="appointment-item">
              <div className="icon-wrapper calendar">
                <Calendar size={20} />
              </div>
              <div>
                <h6 className="mb-0">{upcomingAppointment.date}</h6>
                <small className="text-muted">Date</small>
              </div>
            </div>
            <div className="appointment-item">
              <div className="icon-wrapper clock">
                <Clock size={20} />
              </div>
              <div>
                <h6 className="mb-0">{upcomingAppointment.time}</h6>
                <small className="text-muted">Time</small>
              </div>
            </div>
            <div className="appointment-item">
              <div className="icon-wrapper" style={{ backgroundColor: upcomingAppointment.status === "Scheduled" ? "#38a169" : "#ecc94b" }}>
                <CalendarIcon size={20} />
              </div>
              <div>
                <h6 className="mb-0">{upcomingAppointment.status}</h6>
                <small className="text-muted">Status</small>
              </div>
            </div>
          </div>
          <div className="d-grid gap-2 mt-4">
            <button 
              className="btn btn-outline-primary action-button" 
              onClick={() => navigate("/appointments")}
            >
              View Details
            </button>
            <button 
              className="btn btn-outline-warning action-button" 
              onClick={() => navigate(`/update?id=${upcomingAppointment.id}`)}
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light">
      {/* Hero section with hospital introduction */}
      <div className="bg-gradient-primary text-white py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Healing with <span className="text-warning">Compassion</span></h1>
              <p className="lead mb-4 opacity-90">Experience world-class healthcare at Holistic Hospitals. Our patient-centered approach combines medical excellence with genuine care for your wellbeing.</p>
              <div className="d-flex gap-3">
                <button 
                  onClick={() => navigate("/book")} 
                  className="btn btn-warning btn-lg px-4 d-flex align-items-center gap-2 fw-bold"
                >
                  <CalendarIcon size={20} /> Book Appointment
                </button>
                <button 
                  onClick={() => navigate("/about")} 
                  className="btn btn-outline-light btn-lg px-4"
                >
                  Learn More
                </button>
              </div>
            </div>
            <div className="col-lg-6 d-none d-lg-block text-center">
              <img 
                src="/Images/main.avif" 
                alt="Holistic Hospitals Building" 
                className="img-fluid rounded-4 shadow-lg transform-hover" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Hospital stats */}
      <div className="bg-white py-4">
        <div className="container py-3">
          <div className="row g-4 justify-content-center">
            {hospitalStats.map((stat, index) => (
              <div key={index} className="col-6 col-md-3 text-center">
                <div className="stat-card p-3 rounded-4 h-100">
                  <div className="text-primary mb-2 d-flex justify-content-center">
                    {stat.icon}
                  </div>
                  <h2 className="fw-bold text-primary mb-0">{stat.value}</h2>
                  <p className="text-muted mb-0 small">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* About Hospital Section */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="row g-0">
                  <div className="col-md-5">
                    <img 
                      src="/Images/team3.avif" 
                      alt="Medical team" 
                      className="img-fluid h-100 object-cover" 
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-md-7">
                    <div className="p-4 p-md-5">
                      <h2 className="fw-bold mb-3">Welcome to Holistic Hospitals</h2>
                      <div className="title-underline mb-4"></div>
                      <p className="lead text-primary">Where healing meets compassion and innovation.</p>
                      <p className="mb-4">At Holistic Hospitals, we combine advanced medical technology with personalized care. Our team of experienced healthcare professionals is dedicated to providing exceptional medical services tailored to each patient's unique needs.</p>
                      <div className="d-flex align-items-center mt-4 award-badge">
                        <div className="bg-primary rounded-circle p-2 text-white me-3">
                          <Award size={20} />
                        </div>
                        <p className="mb-0"><strong>JCI Accredited</strong> for excellence in healthcare standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specialties section with descriptions */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4 p-md-5">
                <div className="text-center mb-5">
                  <h2 className="fw-bold mb-2">Our Medical Specialties</h2>
                  <div className="title-underline mx-auto"></div>
                  <p className="text-muted mt-3">We offer comprehensive care across multiple specialties with state-of-the-art facilities and expert physicians.</p>
                </div>
                
                <div className="row g-4">
                  {specialties.map((specialty, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card h-100 border-0 rounded-4 specialty-card">
                        <div className="card-body p-4">
                          <div className="icon-circle mb-3">
                            {specialty.icon}
                          </div>
                          <h5 className="card-title mb-2">{specialty.name}</h5>
                          <p className="card-text text-muted mb-3">{specialty.description}</p>
                          <button 
                            className="btn btn-link text-primary p-0 d-flex align-items-center"
                            onClick={() => navigate(`${specialty.name.toLowerCase()}`)}
                          >
                            Learn More <ChevronRight size={16} className="ms-1" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center mt-5">
                  <button 
                    className="btn btn-primary px-4 py-2 rounded-pill"
                    onClick={() => navigate("/specialties")}
                  >
                    View All Specialties
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            {/* Appointments Panel */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 appointment-panel">
              <div className="card-header text-white p-3 rounded-top-4 d-flex align-items-center">
                <CalendarIcon size={20} className="me-2" />
                <h5 className="mb-0 fw-bold">Patient Portal</h5>
              </div>
              <div className="card-body p-4">
                <div className="d-grid gap-3">
                  <button 
                    onClick={() => navigate("/book")} 
                    className="btn btn-success d-flex align-items-center justify-content-center gap-2 py-3 action-button"
                  >
                    <Plus size={20} /> New Appointment
                  </button>
                  <button 
                    onClick={() => navigate("/update")} 
                    className="btn btn-warning d-flex align-items-center justify-content-center gap-2 py-3 action-button"
                  >
                    <Edit size={20} /> Modify Appointment
                  </button>
                  <button 
                    onClick={() => navigate("/appointments")} 
                    className="btn btn-info text-white d-flex align-items-center justify-content-center gap-2 py-3 action-button"
                  >
                    <Eye size={20} /> View Appointments
                  </button>
                </div>
              </div>
            </div>

            {/* Upcoming appointment card */}
            {renderAppointmentCard()}

            {/* Contact info card */}
            <div className="card border-0 shadow-sm rounded-4 bg-white contact-card">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-4 border-bottom pb-2">Contact Information</h5>
                
                <div className="contact-item">
                  <div className="icon-wrapper location">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h6 className="mb-0">Our Location</h6>
                    <small>Christian Lane,Near HSR Layout ,Banglore</small>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="icon-wrapper time">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h6 className="mb-0">Opening Hours</h6>
                    <small>24/7 Emergency Services</small><br />
                    <small>8:00 AM - 8:00 PM (Outpatient)</small>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="icon-wrapper phone">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h6 className="mb-0">Emergency Helpline</h6>
                    <small>7093144766</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
              <div className="card-body p-0">
                <div className="bg-light p-4 p-md-5 text-center">
                  <h2 className="fw-bold mb-2">What Our Patients Say</h2>
                  <div className="title-underline mx-auto"></div>
                </div>
                
                <div className="p-4 p-md-5 pt-0 pt-md-3">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="card h-100 border-0 testimonial-card">
                        <div className="card-body p-4">
                          <div className="mb-3 text-warning d-flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <p className="card-text">"The care I received at Holistic Hospitals was exceptional. The doctors were knowledgeable and the staff was incredibly compassionate."</p>
                          <div className="d-flex align-items-center mt-3">
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center testimonial-avatar">
                              SM
                            </div>
                            <div className="ms-3">
                              <p className="fw-bold mb-0">Sarah M.</p>
                              <small className="text-muted">Cardiology Patient</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card h-100 border-0 testimonial-card">
                        <div className="card-body p-4">
                          <div className="mb-3 text-warning d-flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <p className="card-text">"I was nervous about my surgery, but the medical team made me feel comfortable and explained everything thoroughly. Excellent experience!"</p>
                          <div className="d-flex align-items-center mt-3">
                            <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center testimonial-avatar">
                              JR
                            </div>
                            <div className="ms-3">
                              <p className="fw-bold mb-0">James R.</p>
                              <small className="text-muted">Orthopedic Patient</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card h-100 border-0 testimonial-card">
                        <div className="card-body p-4">
                          <div className="mb-3 text-warning d-flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill="currentColor" />
                            ))}
                          </div>
                          <p className="card-text">"From the reception to the follow-up care, Holistic Hospitals provided a seamless healthcare experience with state-of-the-art facilities."</p>
                          <div className="d-flex align-items-center mt-3">
                            <div className="rounded-circle bg-info text-white d-flex align-items-center justify-content-center testimonial-avatar">
                              ET
                            </div>
                            <div className="ms-3">
                              <p className="fw-bold mb-0">Emily T.</p>
                              <small className="text-muted">Neurology Patient</small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-secondary text-white py-5 mt-5">
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-lg-8 text-center text-lg-start">
              <h2 className="fw-bold mb-2">Ready to experience better healthcare?</h2>
              <p className="lead mb-0">Schedule an appointment today and take the first step toward better health.</p>
            </div>
            <div className="col-lg-4 text-center text-lg-end mt-4 mt-lg-0">
              <button 
                onClick={() => navigate("/book")} 
                className="btn btn-warning btn-lg px-4 py-3 fw-bold"
              >
                Book Your Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-dark text-white py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Holistic Hospitals</h5>
              <p className="mb-3 opacity-75">Providing quality healthcare services with compassion and expertise since 2000</p>
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="social-icon">
                  <Facebook size={18} />
                </a>
                <a href="#" className="social-icon">
                  <Twitter size={18} />
                </a>
                <a href="#" className="social-icon">
                  <Instagram size={18} />
                </a>
                <a href="#" className="social-icon">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled footer-links">
                <li><a href="#" className="text-decoration-none">About Us</a></li>
                <li><a href="/doctors" className="text-decoration-none">Our Doctors</a></li>
                <li><a href="#" className="text-decoration-none">Services</a></li>
                <li><a href="#" className="text-decoration-none">Contact</a></li>
                <li><a href="#" className="text-decoration-none">Careers</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Contact Information</h5>
              <div className="footer-contact">
                <p className="d-flex align-items-center mb-2">
                  <MapPin size={16} className="me-2 opacity-75" />
                  <span>Christian Lane,Near HSR Layout ,Banglore</span>
                </p>
                <p className="d-flex align-items-center mb-2">
                  <Phone size={16} className="me-2 opacity-75" />
                  <span>7093144766</span>
                </p>
                <p className="d-flex align-items-center mb-0">
                  <Mail size={16} className="me-2 opacity-75" />
                  <span>info@holistichospitals.com</span>
                </p>
              </div>
            </div>
            <div className="col-12 border-top border-secondary pt-4 mt-3">
              <p className="mb-0 text-center opacity-75">© 2025 Holistic Hospitals. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        /* Global Styles */
        .bg-gradient-primary {
          background: linear-gradient(135deg, #2b6cb0 0%, #1e4e8c 100%);
        }
        
        .bg-gradient-secondary {
          background: linear-gradient(135deg, #3182ce 0%, #2c5282 100%);
        }
        
        .title-underline {
          height: 4px;
          width: 60px;
          background-color: #3182ce;
          border-radius: 2px;
          margin-bottom: 1rem;
        }
        
        /* Animated Elements */
        .transform-hover {
          transition: transform 0.3s ease;
        }
        
        .transform-hover:hover {
          transform: scale(1.02);
        }
        
        /* Stats Section */
        .stat-card {
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }
        
        /* Specialty Cards */
        .specialty-card {
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background-color: #ffffff;
        }
        
        .specialty-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        
        .icon-circle {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: rgba(49, 130, 206, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3182ce;
        }
        
        /* Action Buttons */
        .action-button {
          border-radius: 8px;
          font-weight: 500;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        /* Appointment Panel */
        .appointment-panel .card-header {
          background-color:rgb(40, 186, 108);
        }
        
        .appointment-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        
        .appointment-item {
          display: flex;
          align-items: center;
        }
        
        .icon-wrapper {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background-color: #3182ce;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 16px;
        }
        
        .icon-wrapper.calendar {
          background-color: #ecc94b;
        }
        
        .icon-wrapper.clock {
          background-color: #4299e1;
        }
        
        .icon-wrapper.location {
          background-color: #e53e3e;
        }
        
        .icon-wrapper.time {
          background-color: #38a169;
        }
        
        .icon-wrapper.phone {
          background-color: #805ad5;
        }
        
        /* Contact Card */
        .contact-card {
          background-color: #ffffff;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: 16px;
        }
        
        .contact-item:last-child {
          margin-bottom: 0;
        }
        
        /* Testimonial Card */
        .testimonial-card {
          background-color: #ffffff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          transition: transform 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-5px);
        }
        
        .testimonial-avatar {
          width: 40px;
          height: 40px;
          font-size: 14px;
        }
        
        /* Award Badge */
        .award-badge {
          background-color: rgba(49, 130, 206, 0.08);
          border-radius: 8px;
          padding: 10px;
        }
        
        /* Footer */
        .footer-links li {
          margin-bottom: 10px;
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.8);
          transition: color 0.2s ease, transform 0.2s ease;
          display: inline-block;
        }
        
        .footer-links a:hover {
          color: #ffffff;
          transform: translateX(5px);
        }
        
        .footer-contact p {
          color: rgba(255, 255, 255, 0.8);
        }
        
        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.1);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, transform 0.2s ease;
        }
        
        .social-icon:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-3px);
        }
        
        /* Object fit for images */
        .object-cover {
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};

export default Home;
