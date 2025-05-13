import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Phone, 
  Star, 
  Award,
  Clock,
  User,
  MapPin,
  Languages,
  FileText,
  CheckCircle,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  MessageSquare,
  Share2,
  ChevronLeft
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  
  useEffect(() => {
    // Get doctor data from localStorage
    const storedDoctor = localStorage.getItem("selectedDoctor");
    
    if (storedDoctor) {
      // Parse the stored doctor data
      const parsedDoctor = JSON.parse(storedDoctor);
      
      // Ensure the doctor data has all required fields for awards and publications
      const enhancedDoctor = {
        ...parsedDoctor,
        // Add default publications if not present
        publications: parsedDoctor.publications || [
          {
            title: "Advances in Cardiac Care: A Review of Modern Techniques",
            journal: "Journal of Cardiology",
            year: "2023"
          },
          {
            title: "Long-term Outcomes of Pacemaker Implantation in Elderly Patients",
            journal: "Cardiac Research Review",
            year: "2021"
          },
          {
            title: "Comparative Analysis of Traditional vs. Minimally Invasive Cardiac Procedures",
            journal: "International Journal of Cardiac Surgery",
            year: "2019"
          }
        ],
        // Add default awards if not present
        awards: parsedDoctor.awards || [
          {
            name: "Excellence in Cardiac Care Award",
            year: "2022"
          },
          {
            name: "Best Cardiologist - City Medical Association",
            year: "2020"
          },
          {
            name: "Patient's Choice Award",
            year: "2019-2023"
          }
        ],
        // Add default biography if not present
        biography: parsedDoctor.biography || `Dr. ${parsedDoctor.name.split(' ')[1]} completed medical training at ${parsedDoctor.education} and has been practicing in ${parsedDoctor.specialty} for ${parsedDoctor.experience}. Throughout their career, they have become known for exceptional patient care and innovative approaches to treatment. They have contributed to numerous research initiatives and are dedicated to staying at the forefront of medical advances in their field.`,
        // Add default reviews if not present
        reviews: parsedDoctor.reviews || [
          {
            name: "John D.",
            rating: 5,
            date: "March 15, 2025",
            comment: `Dr. ${parsedDoctor.name.split(' ')[1]} is an exceptional doctor. Their expertise and compassionate care made a significant difference in my recovery. I'm back to my normal activities and enjoying life without any issues!`
          },
          {
            name: "Mary S.",
            rating: 5,
            date: "February 22, 2025",
            comment: `After seeing multiple specialists for my condition, Dr. ${parsedDoctor.name.split(' ')[1]} was the only one who properly diagnosed me. Their thorough approach and willingness to explore all options first really impressed me. The treatment went smoothly and my recovery has been excellent.`
          },
          {
            name: "Robert T.",
            rating: 4,
            date: "January 10, 2025",
            comment: `Dr. ${parsedDoctor.name.split(' ')[1]} is extremely knowledgeable and professional. They took the time to explain my condition and all treatment options. The only reason for 4 stars instead of 5 is the long wait times in their office, which I understand is due to their popularity.`
          }
        ]
      };
      
      setDoctor(enhancedDoctor);
      setLoading(false);
    } else {
      // If no stored doctor data, we can use a fallback doctor profile
      setTimeout(() => {
        // Fallback doctor data
        const doctorData = {
          id: 1,
          name: "Dr. Robert Chen",
          image: "/Images/Cardiology/Chen.jpeg",
          specialty: "Cardiology",
          title: "Chief of Cardiology",
          description: "Dr. Chen is a renowned cardiologist specializing in heart surgery and pacemaker replacements. With over 15 years of experience, he has performed more than 1,000 successful cardiac procedures and is dedicated to improving his patients' heart health and quality of life.",
          biography: "Dr. Robert Chen completed his medical degree at Harvard Medical School, followed by his residency in cardiac surgery at Massachusetts General Hospital. He furthered his training with a fellowship in interventional cardiology at the Hospital for Special Surgery in New York. Dr. Chen has published numerous research papers on advances in cardiac surgery techniques and has presented his work at national and international conferences. He joined Holistic Hospitals in 2015 and has been serving as the Chief of Cardiology since 2020. His patient-centered approach and commitment to excellence have earned him numerous accolades and the trust of his patients.",
          education: [
            {
              degree: "MD",
              institution: "Harvard Medical School",
              year: "2005"
            },
            {
              degree: "Residency in Cardiac Surgery",
              institution: "Massachusetts General Hospital",
              year: "2010"
            },
            {
              degree: "Fellowship in Interventional Cardiology",
              institution: "Hospital for Special Surgery, New York",
              year: "2012"
            }
          ],
          experience: "15+ years",
          languages: ["English", "Spanish"],
          rating: 4.9,
          reviewCount: 127,
          location: "Main Campus, Building A, Floor 3",
          availability: {
            monday: "9:00 AM - 5:00 PM",
            tuesday: "9:00 AM - 5:00 PM",
            wednesday: "9:00 AM - 1:00 PM",
            thursday: "9:00 AM - 5:00 PM",
            friday: "9:00 AM - 4:00 PM",
            saturday: "Closed",
            sunday: "Closed"
          },
          certifications: [
            "American Board of Cardiology",
            "Fellowship in Interventional Cardiology"
          ],
          specializations: [
            "Pacemaker Implantation",
            "Coronary Angioplasty",
            "Minimally Invasive Cardiac Surgery",
            "Heart Valve Repair"
          ],
          awards: [
            {
              name: "Excellence in Cardiology Award",
              year: "2021"
            },
            {
              name: "Best Cardiac Surgeon - City Medical Association",
              year: "2019"
            },
            {
              name: "Patient's Choice Award",
              year: "2018-2022"
            }
          ],
          publications: [
            {
              title: "Advances in Minimally Invasive Cardiac Surgery Techniques",
              journal: "Journal of Cardiology",
              year: "2022"
            },
            {
              title: "Long-term Outcomes of Pacemaker Implantation in Elderly Patients",
              journal: "Cardiac Research Review",
              year: "2020"
            },
            {
              title: "Comparative Analysis of Traditional vs. Robotic Cardiac Surgery",
              journal: "International Journal of Medical Robotics",
              year: "2018"
            }
          ],
          reviews: [
            {
              name: "John D.",
              rating: 5,
              date: "March 15, 2025",
              comment: "Dr. Chen performed my pacemaker installation three months ago, and I couldn't be happier with the results. His expertise and compassionate care made a significant difference in my recovery. I'm back to normal activities and enjoying life again!"
            },
            {
              name: "Mary S.",
              rating: 5,
              date: "February 22, 2025",
              comment: "After seeing multiple cardiologists for my heart condition, Dr. Chen was the only one who properly diagnosed the issue. His thorough approach and willingness to explore non-surgical options first really impressed me. When surgery became necessary, the procedure went smoothly and my recovery has been excellent."
            },
            {
              name: "Robert T.",
              rating: 4,
              date: "January 10, 2025",
              comment: "Dr. Chen is extremely knowledgeable and professional. He took the time to explain my condition and all treatment options. The only reason for 4 stars instead of 5 is the long wait times in his office, which I understand is due to his popularity."
            }
          ]
        };
        
        setDoctor(doctorData);
        setLoading(false);
      }, 500);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="text-center">
          <h2>Doctor not found</h2>
          <p>The doctor you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate("/doctors")} 
            className="btn btn-primary mt-3"
          >
            Return to Doctors List
          </button>
        </div>
      </div>
    );
  }

  // Format weekday names for availability display
  const weekdays = {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday"
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Back button */}
      <div className="container pt-4">
        <button 
          onClick={() => navigate("/doctors")} 
          className="btn btn-outline-primary mb-4 d-flex align-items-center gap-2"
        >
          <ChevronLeft size={18} /> Back to Doctors
        </button>
      </div>

      {/* Doctor Header */}
      <div className="bg-white shadow-sm py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-3 text-center mb-3 mb-md-0">
              <div className="rounded-circle overflow-hidden mx-auto" style={{ width: "150px", height: "150px" }}>
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="img-fluid w-100 h-100 object-fit-cover" 
                />
              </div>
            </div>
            <div className="col-lg-7 col-md-9">
              <div className="d-flex align-items-center mb-2">
                <h1 className="fw-bold mb-0">{doctor.name}</h1>
                <span className="badge bg-primary ms-3">{doctor.specialty}</span>
              </div>
              <p className="text-muted mb-2">{doctor.title}</p>
              
              <div className="d-flex align-items-center mb-3">
                <div className="me-3 d-flex align-items-center">
                  <Star size={16} className="text-warning fill-warning me-1" />
                  <span className="fw-bold">{doctor.rating}</span>
                  <span className="text-muted ms-1">({doctor.reviewCount} reviews)</span>
                </div>
                <div className="me-3 d-flex align-items-center">
                  <Award size={16} className="text-primary me-1" />
                  <span>{doctor.experience}</span>
                </div>
                <div className="d-flex align-items-center">
                  <Languages size={16} className="text-primary me-1" />
                  <span>{doctor.languages.join(", ")}</span>
                </div>
              </div>
              
              <p className="mb-0">{doctor.description}</p>
            </div>
            <div className="col-lg-3 mt-3 mt-lg-0">
              <div className="d-grid gap-2">
                <button 
                  onClick={() => navigate("/book")} 
                  className="btn btn-primary d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <Calendar size={18} /> Book Appointment
                </button>
                <a 
                  href="tel:+18004275982" 
                  className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2 py-2"
                >
                  <Phone size={18} /> Call for Appointment
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container pb-5">
        <div className="row g-4">
          <div className="col-lg-8">
            {/* Tabs Navigation */}
            <div className="card border-0 shadow-sm rounded-4 mb-4 overflow-hidden">
              <div className="card-header bg-white p-0 border-0">
                <ul className="nav nav-tabs border-0" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link border-0 rounded-0 px-4 py-3 ${activeTab === "overview" ? "active fw-bold" : ""}`}
                      onClick={() => setActiveTab("overview")}
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link border-0 rounded-0 px-4 py-3 ${activeTab === "education" ? "active fw-bold" : ""}`}
                      onClick={() => setActiveTab("education")}
                    >
                      Education & Experience
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link border-0 rounded-0 px-4 py-3 ${activeTab === "publications" ? "active fw-bold" : ""}`}
                      onClick={() => setActiveTab("publications")}
                    >
                      Publications & Awards
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button 
                      className={`nav-link border-0 rounded-0 px-4 py-3 ${activeTab === "reviews" ? "active fw-bold" : ""}`}
                      onClick={() => setActiveTab("reviews")}
                    >
                      Reviews
                    </button>
                  </li>
                </ul>
              </div>
              
              {/* Tab Content */}
              <div className="card-body p-4">
                {/* Overview Tab */}
                {activeTab === "overview" && (
                  <div>
                    <h2 className="fw-bold mb-4">About {doctor.name}</h2>
                    <p className="mb-4">{doctor.biography}</p>
                    
                    <h4 className="fw-bold mb-3">Specializations</h4>
                    <div className="row mb-4">
                      {doctor.specializations.map((specialization, index) => (
                        <div key={index} className="col-md-6 mb-2">
                          <div className="d-flex align-items-center">
                            <CheckCircle size={16} className="text-success me-2" />
                            <span>{specialization}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="fw-bold mb-3">Certifications</h4>
                    <ul className="list-unstyled mb-0">
                      {doctor.certifications.map((certification, index) => (
                        <li key={index} className="mb-2 d-flex align-items-center">
                          <Award size={16} className="text-primary me-2" />
                          <span>{certification}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Education & Experience Tab */}
                {activeTab === "education" && (
                  <div>
                    <h2 className="fw-bold mb-4">Education & Training</h2>
                    <div className="timeline-container mb-5">
                      {doctor.education && doctor.education.map((edu, index) => (
                        <div key={index} className="timeline-item pb-4">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="d-flex justify-content-between mb-1">
                              <h5 className="fw-bold mb-0">{edu.degree}</h5>
                              <span className="badge bg-light text-dark">{edu.year}</span>
                            </div>
                            <p className="mb-0">{edu.institution}</p>
                          </div>
                        </div>
                      ))}
                      {!doctor.education && (
                        <div className="timeline-item pb-4">
                          <div className="timeline-marker"></div>
                          <div className="timeline-content">
                            <div className="d-flex justify-content-between mb-1">
                              <h5 className="fw-bold mb-0">{doctor.education || "MD, Medical School"}</h5>
                              <span className="badge bg-light text-dark">2005</span>
                            </div>
                            <p className="mb-0">Top Medical Institution</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <h4 className="fw-bold mb-3">Professional Experience</h4>
                    <div className="card bg-light border-0 p-3 mb-4">
                      <div className="d-flex align-items-start">
                        <div className="me-3">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <Clock size={20} />
                          </div>
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">Chief of {doctor.specialty}</h5>
                          <p className="text-muted mb-2">Holistic Hospitals | 2020 - Present</p>
                          <p className="mb-0">Leading the {doctor.specialty.toLowerCase()} department, overseeing clinical operations, and implementing innovative treatment protocols.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-light border-0 p-3 mb-4">
                      <div className="d-flex align-items-start">
                        <div className="me-3">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <Clock size={20} />
                          </div>
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">{doctor.specialty} Specialist</h5>
                          <p className="text-muted mb-2">Holistic Hospitals | 2015 - 2020</p>
                          <p className="mb-0">Specialized in {doctor.specializations ? doctor.specializations[0].toLowerCase() : 'specialized procedures'}, pioneering minimally invasive techniques and patient-centered care approaches.</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="card bg-light border-0 p-3">
                      <div className="d-flex align-items-start">
                        <div className="me-3">
                          <div className="bg-primary rounded-circle p-2 text-white">
                            <Clock size={20} />
                          </div>
                        </div>
                        <div>
                          <h5 className="fw-bold mb-1">Associate {doctor.specialty} Specialist</h5>
                          <p className="text-muted mb-2">Memorial Medical Center | 2012 - 2015</p>
                          <p className="mb-0">Performed specialized procedures and participated in clinical research studies.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Publications & Awards Tab */}
                {activeTab === "publications" && (
                  <div>
                    <h2 className="fw-bold mb-4">Publications</h2>
                    {doctor.publications && doctor.publications.map((publication, index) => (
                      <div key={index} className="card bg-light border-0 p-3 mb-3">
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <div className="bg-primary rounded-circle p-2 text-white">
                              <FileText size={20} />
                            </div>
                          </div>
                          <div>
                            <h5 className="fw-bold mb-1">{publication.title}</h5>
                            <p className="text-muted mb-0">{publication.journal} | {publication.year}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    <h2 className="fw-bold mb-4 mt-5">Awards & Recognition</h2>
                    {doctor.awards && doctor.awards.map((award, index) => (
                      <div key={index} className="card bg-light border-0 p-3 mb-3">
                        <div className="d-flex align-items-start">
                          <div className="me-3">
                            <div className="bg-warning rounded-circle p-2 text-white">
                              <Award size={20} />
                            </div>
                          </div>
                          <div>
                            <h5 className="fw-bold mb-1">{award.name}</h5>
                            <p className="text-muted mb-0">{award.year}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <h2 className="fw-bold mb-0">Patient Reviews</h2>
                      <div className="d-flex align-items-center">
                        <div className="me-2">
                          <Star size={24} className="text-warning fill-warning" />
                        </div>
                        <div>
                          <div className="fw-bold fs-4">{doctor.rating}</div>
                          <div className="text-muted small">{doctor.reviewCount} reviews</div>
                        </div>
                      </div>
                    </div>
                    
                    {doctor.reviews && doctor.reviews.map((review, index) => (
                      <div key={index} className="card border-0 shadow-sm mb-4 p-4">
                        <div className="d-flex justify-content-between mb-3">
                          <div>
                            <h5 className="fw-bold mb-1">{review.name}</h5>
                            <p className="text-muted mb-0">{review.date}</p>
                          </div>
                          <div className="d-flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} className={`${i < review.rating ? "text-warning fill-warning" : "text-muted"}`} />
                            ))}
                          </div>
                        </div>
                        <p className="mb-0">{review.comment}</p>
                      </div>
                    ))}
                    
                    <div className="text-center mt-4">
                      <button className="btn btn-outline-primary">Load More Reviews</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="col-lg-4">
            {/* Quick Info Card */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Practice Information</h4>
                
                <div className="d-flex align-items-start mb-3">
                  <MapPin size={20} className="text-primary me-3 mt-1" />
                  <div>
                    <h6 className="fw-bold mb-1">Location</h6>
                    <p className="mb-0">{doctor.location || "Main Campus, Building A, Floor 3"}</p>
                  </div>
                </div>
                
                <hr className="my-3" />
                
                <h5 className="fw-bold mb-3">Office Hours</h5>
                {doctor.availability && Object.entries(doctor.availability).map(([day, hours]) => (
                  <div key={day} className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-medium">{weekdays[day]}</span>
                    <span>{hours}</span>
                  </div>
                ))}
                
                <div className="alert alert-info d-flex align-items-center mt-3 mb-0">
                  <Clock size={18} className="me-2" />
                  <small className="mb-0">Appointments are required. Please call or book online.</small>
                </div>
              </div>
            </div>
            
            {/* Insurance Info */}
            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Insurance Information</h4>
                <p className="text-muted mb-3">This doctor accepts most major insurance plans. Please contact our office to verify your insurance coverage.</p>
                <div className="d-grid">
                  <button className="btn btn-outline-primary">View Accepted Insurance Plans</button>
                </div>
              </div>
            </div>
            
            {/* Share Profile */}
            <div className="card border-0 shadow-sm rounded-4">
              <div className="card-body p-4">
                <h4 className="fw-bold mb-3">Share Profile</h4>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                    <Share2 size={18} /> Share
                  </button>
                  <button className="btn btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-2">
                    <MessageSquare size={18} /> Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .object-fit-cover {
          object-fit: cover;
        }
        .fill-warning {
          fill: #ffc107;
        }
        .timeline-container {
          position: relative;
        }
        .timeline-container::before {
          content: '';
          position: absolute;
          width: 2px;
          height: 100%;
          background-color: #e9ecef;
          left: 10px;
          top: 0;
        }
        .timeline-item {
          position: relative;
          padding-left: 30px;
        }
        .timeline-marker {
          position: absolute;
          left: 5px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: #007bff;
          z-index: 1;
        }
        .nav-tabs .nav-link {
          color: #495057;
          border-bottom: 3px solid transparent;
        }
        .nav-tabs .nav-link.active {
          color: #007bff;
          border-bottom: 3px solid #007bff;
        }
      `}</style>
    </div>
  );
};

export default DoctorProfile;