import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bone, 
  Calendar, 
  Phone, 
  Award,
  Clock,
  CheckCircle
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Orthopedics = () => {
  const navigate = useNavigate();
  
  // Image assets - replace these URLs with your actual image locations
  const images = {
    banner: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1920&auto=format&fit=crop",
    overview: "/Images/Overview.png",
    doctor1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    doctor2: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    doctor3: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=400&auto=format&fit=crop",
    surgery: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=600&auto=format&fit=crop",
    rehabilitation: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
  };
  
  const specialtyData = {
    name: "Orthopedics",
    icon: <Bone size={28} />,
    tagline: "Restore mobility and quality of life with our expert orthopedic care.",
    overview: "Our Orthopedics Department specializes in the diagnosis, treatment, and rehabilitation of conditions affecting the musculoskeletal system. From joint replacements to sports injuries, our board-certified orthopedic surgeons and specialists provide comprehensive care using the latest techniques and technologies. We're dedicated to helping patients regain mobility, reduce pain, and improve their quality of life through personalized treatment plans.",
    highlights: [
      "Nationally recognized orthopedic surgeons",
      "Minimally invasive surgical techniques",
      "Comprehensive rehabilitation services",
      "Advanced imaging and diagnostics",
      "Sports medicine specialists"
    ],
    services: [
      {
        name: "Joint Replacement",
        description: "Specializing in hip, knee, shoulder, and ankle replacement surgeries using the latest prosthetic devices and techniques.",
        image: images.surgery
      },
      {
        name: "Sports Medicine",
        description: "Treatment for athletes of all levels, focusing on injury prevention, performance enhancement, and specialized rehabilitation.",
        image: images.rehabilitation
      },
      {
        name: "Spine Care",
        description: "Diagnosis and treatment of spinal disorders including herniated discs, spinal stenosis, scoliosis, and degenerative conditions.",
        image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Trauma & Fracture Care",
        description: "Emergency treatment and rehabilitation for fractures, dislocations, and other traumatic injuries.",
        image: "https://images.unsplash.com/photo-1624727828489-a1e03b79bba8?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Hand & Upper Extremity",
        description: "Specialized care for conditions affecting the hand, wrist, elbow, and shoulder including carpal tunnel syndrome and tendonitis.",
        image: "/Images/HandUpperExtremity.jpg"
      },
      {
        name: "Foot & Ankle Care",
        description: "Treatment for complex foot and ankle disorders, including sports injuries, arthritis, and congenital deformities.",
        image: "https://images.unsplash.com/photo-1508387027939-27cccde53673?q=80&w=600&auto=format&fit=crop"
      }
    ],
    equipment: [
      {
        name: "3D Motion Analysis Lab",
        description: "Advanced technology to analyze gait and movement patterns for precise diagnosis and treatment planning.",
        image: "/Images/3DMotion.jpg"
      },
      {
        name: "Computer-Assisted Surgery",
        description: "Enhanced surgical precision for joint replacements and complex orthopedic procedures.",
        image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Musculoskeletal Ultrasound",
        description: "Real-time imaging for diagnosis and guided injections for pain management.",
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=600&auto=format&fit=crop"
      },
      {
        name: "Arthroscopic Equipment",
        description: "Minimally invasive tools for joint procedures with reduced recovery time and improved outcomes.",
        image: "https://images.unsplash.com/photo-1580281657702-257584239a55?q=80&w=600&auto=format&fit=crop"
      }
    ],
    doctors: [
      {
        name: "Dr. Sarah Johnson",
        title: "Chief of Orthopedic Surgery",
        description: "Renowned surgeon specializing in hip and knee replacements with over 15 years of experience.",
        image: images.doctor1
      },
      {
        name: "Dr. James Wilson",
        title: "Sports Medicine Specialist",
        description: "Former team physician for professional athletes, expert in sports-related injuries and rehabilitation.",
        image: images.doctor2
      },
      {
        name: "Dr. Lisa Patel",
        title: "Spine Surgeon",
        description: "Specializing in minimally invasive spine procedures and complex spinal reconstruction.",
        image: images.doctor3
      }
    ],
    conditions: [
      "Arthritis",
      "Fractures & Dislocations",
      "Ligament & Tendon Injuries",
      "Osteoporosis",
      "Carpal Tunnel Syndrome",
      "Spinal Disorders",
      "Sports Injuries",
      "Joint Pain & Inflammation"
    ],
    testimonials: [
      {
        name: "David P.",
        quote: "After years of knee pain, my total knee replacement by Dr. Johnson has given me back my active lifestyle. The whole team provided exceptional care."
      },
      {
        name: "Rebecca M.",
        quote: "The sports medicine team helped me recover from my ACL tear and return to competitive soccer. Their expertise and personalized approach made all the difference."
      },
      {
        name: "George T.",
        quote: "Dr. Patel's minimally invasive approach to my spinal fusion resulted in less pain and a faster recovery than I expected. I'm grateful for her skill and compassion."
      }
    ]
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Banner with Background Image */}
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
            {/* Overview Section */}
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

            {/* Services Section */}
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

            {/* Technology and Equipment */}
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

            {/* Meet Our Team */}
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

          <div className="col-lg-4">
            {/* Quick Appointment */}
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

            {/* Common Conditions */}
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

            {/* Opening Hours */}
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
                    <strong>Note:</strong> Emergency orthopedic services are available 24/7. For urgent cases, please visit our Emergency Department.
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
                    {specialtyData.name} FAQs
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

export default Orthopedics;