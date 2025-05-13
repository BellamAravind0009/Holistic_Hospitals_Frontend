import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Calendar,
  Phone,
  Clock,
  CheckCircle
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Ophthalmology = () => {
  const navigate = useNavigate();

  const images = {
    banner: "https://images.unsplash.com/photo-1508385082359-f48fa9f0a2c2?q=80&w=1920&auto=format&fit=crop",
    overview: "/Images/Ophthalmology/Main.jpg",
    doctor1: "/Images/Ophthalmology/Sharma.jpg",
    doctor2: "/Images/Ophthalmology/Kumar.jpg",
    doctor3: "/Images/Ophthalmology/Das.jpg",
    surgery: "/Images/Ophthalmology/Cs.webp",
    diagnostics: "/Images/Ophthalmology/rgc.webp",
    laser: "/Images/Ophthalmology/LEP.jpg",
    pediatric: "/Images/Ophthalmology/PO.jpg"
  };

  const specialtyData = {
    name: "Ophthalmology",
    icon: <Eye size={28} />,
    tagline: "Comprehensive eye care for all ages.",
    overview: "Our Ophthalmology Department offers complete eye care, from routine vision exams and glasses prescriptions to advanced surgical procedures. We combine clinical expertise with the latest technology to preserve and restore your vision.",
    highlights: [
      "Advanced cataract and LASIK surgery",
      "Full-service retina and glaucoma care",
      "Pediatric and strabismus specialists",
      "On-site diagnostics and laser therapy",
      "Personalized treatment for every patient"
    ],
    services: [
      {
        name: "Cataract Surgery",
        description: "State-of-the-art phacoemulsification and lens implants for clear vision.",
        image: images.surgery
      },
      {
        name: "Retina & Glaucoma Clinic",
        description: "Diagnosis and management of retinal diseases and glaucoma.",
        image: images.diagnostics
      },
      {
        name: "Laser Eye Procedures",
        description: "LASIK, PRK, and diabetic retinopathy laser treatments.",
        image: images.laser
      },
      {
        name: "Pediatric Ophthalmology",
        description: "Specialized care for children's vision and eye alignment.",
        image: images.pediatric
      }
    ],
    equipment: [
      {
        name: "OCT & Fundus Imaging",
        description: "High-resolution imaging for retina and optic nerve assessment.",
        image: images.diagnostics
      },
      {
        name: "Laser Suite",
        description: "Precision lasers for vision correction and retinal care.",
        image: images.laser
      }
    ],
    doctors: [
      {
        name: "Dr. Priya Sharma",
        title: "Senior Ophthalmologist",
        description: "Specialist in cataract, refractive, and corneal surgery.",
        image: images.doctor1
      },
      {
        name: "Dr. Vijay Kumar",
        title: "Retina & Glaucoma Consultant",
        description: "Expert in complex retinal and glaucoma cases.",
        image: images.doctor2
      },
      {
        name: "Dr. Meena Das",
        title: "Pediatric Ophthalmologist",
        description: "Focus on children's eye health and strabismus.",
        image: images.doctor3
      }
    ],
    conditions: [
      "Cataracts",
      "Glaucoma",
      "Diabetic Retinopathy",
      "Macular Degeneration",
      "Refractive Errors",
      "Eye Infections",
      "Pediatric Eye Disorders"
    ],
    testimonials: [
      {
        name: "Anita R.",
        quote: "Thanks to the ophthalmology team, I can see the world clearly again."
      },
      {
        name: "Suresh K.",
        quote: "The doctors explained everything and made my cataract surgery easy and comfortable."
      }
    ]
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Banner */}
      <div className="bg-primary text-white py-5" style={{
        backgroundImage: `linear-gradient(rgba(0, 123, 255, 0.85), rgba(0, 123, 255, 0.85)), url(${images.banner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="container py-3">
          <div className="row align-items-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-center mb-3">
                <div className="bg-white rounded-circle p-3 me-3">
                  <span className="text-primary">{specialtyData.icon}</span>
                </div>
                <h1 className="display-5 fw-bold mb-0">{specialtyData.name}</h1>
              </div>
              <p className="lead mb-0">{specialtyData.tagline}</p>
            </div>
            <div className="col-lg-4 d-none d-lg-block text-end">
              <button
                onClick={() => navigate("/book")}
                className="btn btn-light btn-lg px-4 d-inline-flex align-items-center gap-2 fw-bold"
              >
                <Calendar size={20} /> Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* Overview */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4">Overview</h2>
                <p className="lead mb-4">{specialtyData.overview}</p>
                <div className="row mb-4">
                  <div className="col-md-6 mb-4 mb-md-0">
                    <div className="rounded-3 shadow overflow-hidden" style={{ height: "250px" }}>
                      <img
                        src={images.overview}
                        alt={`${specialtyData.name} Department`}
                        className="img-fluid w-100 h-100 object-fit-cover"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h5 className="fw-bold mb-3">Why Choose Us?</h5>
                    <ul className="list-unstyled">
                      {specialtyData.highlights.map((highlight, index) => (
                        <li key={index} className="mb-2 d-flex align-items-start">
                          <CheckCircle size={18} className="text-success me-2 mt-1" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Services */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4">Our Services</h2>
                <div className="row g-4">
                  {specialtyData.services.map((service, index) => (
                    <div key={index} className="col-md-6">
                      <div className="card h-100 border-0 rounded-4 bg-light overflow-hidden">
                        <div className="position-relative" style={{ height: "160px" }}>
                          <img
                            src={service.image}
                            alt={service.name}
                            className="w-100 h-100 object-fit-cover"
                          />
                          <div className="position-absolute bottom-0 start-0 w-100 bg-gradient-dark p-2">
                            <h5 className="card-title fw-bold mb-0 text-white px-2">{service.name}</h5>
                          </div>
                        </div>
                        <div className="card-body p-3">
                          <p className="card-text">{service.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Equipment */}
            {specialtyData.equipment && (
              <div className="card border-0 shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                  <h2 className="fw-bold mb-4">Advanced Technology & Equipment</h2>
                  <p className="mb-4">Our {specialtyData.name} department is equipped with the latest technology to provide accurate diagnosis and effective treatment:</p>
                  <div className="row g-4">
                    {specialtyData.equipment.map((item, index) => (
                      <div key={index} className="col-md-6">
                        <div className="card h-100 border-0 rounded-3 overflow-hidden hover-card">
                          <div style={{ height: "140px" }}>
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-100 h-100 object-fit-cover"
                            />
                          </div>
                          <div className="card-body p-3">
                            <h6 className="mb-1 fw-bold">{item.name}</h6>
                            <p className="text-muted small mb-0">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Doctors */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4">Meet Our {specialtyData.name} Team</h2>
                <div className="row g-4">
                  {specialtyData.doctors.map((doctor, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card h-100 border-0 rounded-4 text-center bg-light">
                        <div className="card-body p-4">
                          <div className="rounded-circle overflow-hidden mx-auto mb-3" style={{ width: "120px", height: "120px" }}>
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="img-fluid w-100 h-100 object-fit-cover"
                            />
                          </div>
                          <h5 className="card-title fw-bold mb-1">{doctor.name}</h5>
                          <p className="text-muted mb-3">{doctor.title}</p>
                          <p className="small mb-0">{doctor.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-4">
                  <button
                    className="btn btn-outline-primary px-4"
                    onClick={() => navigate("/doctors")}
                  >
                    View All Doctors
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Sidebar */}
          <div className="col-lg-4">
            {/* Appointment */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 bg-primary text-white">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Schedule an Appointment</h4>
                <p className="mb-4">Contact us to schedule a consultation with our {specialtyData.name} specialists.</p>
                <div className="d-grid gap-2">
                  <button
                    onClick={() => navigate("/book")}
                    className="btn btn-light d-flex align-items-center justify-content-center gap-2 py-3"
                  >
                    <Calendar size={20} /> Book Online
                  </button>
                  <a
                    href="tel:+18004275982"
                    className="btn btn-outline-light d-flex align-items-center justify-content-center gap-2 py-3"
                  >
                    <Phone size={20} /> Call Us
                  </a>
                </div>
              </div>
            </div>
            {/* Conditions */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Common Conditions We Treat</h4>
                <ul className="list-group list-group-flush">
                  {specialtyData.conditions.map((condition, index) => (
                    <li key={index} className="list-group-item border-0 px-0 py-2 d-flex align-items-center">
                      <CheckCircle size={16} className="text-success me-2" />
                      {condition}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Hours */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Department Hours</h4>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item border-0 px-0 py-2 d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="text-primary me-2" />
                      Monday - Friday
                    </div>
                    <span className="fw-bold">8:00 AM - 5:30 PM</span>
                  </li>
                  <li className="list-group-item border-0 px-0 py-2 d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="text-primary me-2" />
                      Saturday
                    </div>
                    <span className="fw-bold">9:00 AM - 2:00 PM</span>
                  </li>
                  <li className="list-group-item border-0 px-0 py-2 d-flex justify-content-between">
                    <div className="d-flex align-items-center">
                      <Clock size={16} className="text-primary me-2" />
                      Sunday
                    </div>
                    <span className="fw-bold">Closed</span>
                  </li>
                </ul>
                <div className="mt-3 bg-light p-3 rounded-3">
                  <p className="small mb-0">
                    <strong>Note:</strong> Emergency ophthalmology services are available 24/7. For urgent cases, please visit our Emergency Department.
                  </p>
                </div>
              </div>
            </div>
            {/* Patient Resources */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Patient Resources</h4>
                <div className="list-group list-group-flush">
                  <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                    Patient Forms
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                    Insurance Information
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                    Ophthalmology FAQs
                  </a>
                  <a href="#" className="list-group-item list-group-item-action border-0 px-0 py-2">
                    Pre-appointment Instructions
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Testimonials */}
        <div className="row mt-4">
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h2 className="fw-bold mb-4 text-center">Patient Testimonials</h2>
                <div className="row g-4">
                  {specialtyData.testimonials.map((testimonial, index) => (
                    <div key={index} className="col-md-4">
                      <div className="card h-100 border-0 bg-light rounded-4">
                        <div className="card-body p-4">
                          <div className="mb-3 text-warning">
                            {"★".repeat(5)}
                          </div>
                          <p className="card-text">"{testimonial.quote}"</p>
                          <p className="fw-bold mb-0">- {testimonial.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <h5 className="mb-3">Holistic Hospitals</h5>
              <p className="mb-0">Providing quality healthcare services since 2000</p>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="#" className="text-white text-decoration-none">Our Doctors</a></li>
                <li><a href="#" className="text-white text-decoration-none">Services</a></li>
                <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5 className="mb-3">Contact Information</h5>
              <p className="mb-0">123 Healthcare Avenue, Medical District<br />
                Phone: +1 (800) HOLISTIC<br />
                Email: info@holistichospitals.com</p>
            </div>
            <div className="col-12 border-top border-secondary pt-3 mt-3">
              <p className="mb-0 text-center">© 2025 Holistic Hospitals. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      {/* Custom CSS */}
      <style jsx>{`
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        .object-fit-cover {
          object-fit: cover;
        }
        .bg-gradient-dark {
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%);
        }
      `}</style>
    </div>
  );
};

export default Ophthalmology;
