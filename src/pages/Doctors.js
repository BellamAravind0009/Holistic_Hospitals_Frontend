import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Search, 
  Calendar, 
  Phone, 
  Filter,
  Star,
  Award,
  Stethoscope,
  MapPin,
  Clock,
  Users,
  ChevronRight
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Doctors = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Enhanced doctor data with more complete information
  const doctorsData = [
    {
      id: 1,
      name: "Dr. Robert Chen",
      image: "/Images/Cardiology/Chen.jpeg",
      specialty: "Cardiology",
      title: "Chief of Cardiology",
      description: "Renowned surgeon specializing in critical heart and stunt operations with over 15 years of experience.",
      education: "MD, Harvard Medical School",
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
      biography: "Dr. Robert Chen completed his medical degree at Harvard Medical School, followed by his residency in cardiac surgery at Massachusetts General Hospital. He furthered his training with a fellowship in interventional cardiology at the Hospital for Special Surgery in New York."
    },
    {
      id: 2,
      name: "Dr. David Kim",
      image: "/Images/Neurology/Kim.jpeg",
      specialty: "Neurology",
      title: "Head of Neuroscience Department",
      description: "Expert in neurological disorders with specialized focus on epilepsy and movement disorders.",
      education: "MD, Johns Hopkins University",
      experience: "12+ years",
      languages: ["English", "French"],
      rating: 4.8,
      reviewCount: 98,
      location: "Main Campus, Building B, Floor 2",
      availability: {
        monday: "8:00 AM - 4:00 PM",
        tuesday: "8:00 AM - 4:00 PM",
        wednesday: "8:00 AM - 4:00 PM",
        thursday: "8:00 AM - 12:00 PM",
        friday: "8:00 AM - 4:00 PM",
        saturday: "9:00 AM - 12:00 PM",
        sunday: "Closed"
      },
      certifications: [
        "American Board of Psychiatry and Neurology",
        "Fellowship in Movement Disorders"
      ],
      specializations: [
        "Movement Disorders",
        "Epilepsy Treatment",
        "Stroke Recovery",
        "Neurological Diagnostics"
      ],
      biography: "Dr. Sarah Johnson completed her medical education at Johns Hopkins University and residency at Mayo Clinic. She specializes in diagnosing and treating complex neurological disorders and has pioneered several innovative treatment protocols."
    },
    {
      id: 3,
      name: "Dr. Michael Patel",
      image: "/Images/Patel.jpeg",
      specialty: "Orthopedics",
      title: "Senior Orthopedic Surgeon",
      description: "Specializes in sports medicine, joint replacements, and minimally invasive orthopedic procedures.",
      education: "MD, Stanford University School of Medicine",
      experience: "18+ years",
      languages: ["English", "Hindi", "Gujarati"],
      rating: 4.9,
      reviewCount: 145,
      location: "Sports Medicine Center, 2nd Floor",
      availability: {
        monday: "7:30 AM - 5:00 PM",
        tuesday: "7:30 AM - 5:00 PM",
        wednesday: "7:30 AM - 5:00 PM",
        thursday: "7:30 AM - 5:00 PM",
        friday: "7:30 AM - 3:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      },
      certifications: [
        "American Board of Orthopedic Surgery",
        "Fellowship in Sports Medicine"
      ],
      specializations: [
        "Joint Replacement",
        "Sports Medicine",
        "Arthroscopic Surgery",
        "Trauma Care"
      ],
      biography: "Dr. Michael Patel earned his medical degree from Stanford University and completed his residency at the Hospital for Special Surgery. He has worked with professional athletes and specializes in getting patients back to their active lifestyles after injury."
    },
    {
      id: 4,
      name: "Dr. Emily Rodriguez",
      image: "/Images/Cardiology/Emily.jpeg",
      specialty: "Cardiology",
      title: "Heart Surgeon",
      description: "Compassionate pediatrician with expertise in child development, preventative care, and chronic conditions management.",
      education: "MD, Columbia University",
      experience: "14+ years",
      languages: ["English", "Spanish"],
      rating: 4.9,
      reviewCount: 132,
      location: "Children's Wing, Floor 1",
      availability: {
        monday: "8:30 AM - 5:00 PM",
        tuesday: "8:30 AM - 5:00 PM",
        wednesday: "8:30 AM - 5:00 PM",
        thursday: "8:30 AM - 5:00 PM",
        friday: "8:30 AM - 3:00 PM",
        saturday: "9:00 AM - 12:00 PM",
        sunday: "Closed"
      },
      certifications: [
        "American Board of Pediatrics",
        "Fellowship in Developmental Pediatrics"
      ],
      specializations: [
        "Child Development",
        "Preventative Care",
        "Chronic Conditions Management",
        "Adolescent Medicine"
      ],
      biography: "Dr. Emily Rodriguez graduated from Columbia University College of Physicians and Surgeons and completed her residency at Children's Hospital of Philadelphia. She is passionate about preventative care and helping children with developmental challenges."
    },
    {
      id: 5,
      name: "Dr.Daniel James",
      image: "/Images/GeneralMedicine/James.jpeg",
      specialty: "General Medicine",
      title: "Director of General Medicine",
      description: "Expert in chronic diseases and general diseases , holds hiher knowledge.",
      education: "MD, Yale School of Medicine",
      experience: "10+ years",
      languages: ["English", "Korean"],
      rating: 4.7,
      reviewCount: 89,
      location: "Outpatient Center, Floor 4",
      availability: {
        monday: "9:00 AM - 4:00 PM",
        tuesday: "9:00 AM - 4:00 PM",
        wednesday: "9:00 AM - 4:00 PM",
        thursday: "9:00 AM - 4:00 PM",
        friday: "9:00 AM - 2:00 PM",
        saturday: "Closed",
        sunday: "Closed"
      },
      certifications: [
        "American Board of General Medicine",
        "Fellowship in Mohs Micrographic Surgery"
      ],
      specializations: [
        "Skin Cancer Treatment",
        "Mohs Surgery",
        "Cosmetic Dermatology",
        "Laser Procedures"
      ],
      biography: "Dr. David Kim earned his medical degree from Yale School of Medicine and completed his residency at NYU Langone. He has published extensively on innovative approaches to dermatologic surgery and skin cancer treatment."
    }
  ];

  // List of available specialties for filtering
  const specialties = ["All", "Cardiology", "Neurology", "Orthopedics", "Pediatrics", "Dermatology"];

  useEffect(() => {
    // Simulate loading from API
    setTimeout(() => {
      filterDoctors();
      setLoading(false);
    }, 500);
  }, [searchTerm, selectedSpecialty]);

  const filterDoctors = () => {
    let filtered = [...doctorsData];

    // Filter by specialty if not "All"
    if (selectedSpecialty !== "All") {
      filtered = filtered.filter(doctor => doctor.specialty === selectedSpecialty);
    }

    // Filter by search term (name, specialty, or description)
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        doctor => 
          doctor.name.toLowerCase().includes(term) || 
          doctor.specialty.toLowerCase().includes(term) || 
          doctor.description.toLowerCase().includes(term)
      );
    }

    setFilteredDoctors(filtered);
  };

  const handleDoctorClick = (doctor) => {
    // Store selected doctor in localStorage for profile page access
    localStorage.setItem("selectedDoctor", JSON.stringify(doctor));
    navigate("/doctorprofile");
  };

  if (loading) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100 bg-light pb-5">
      {/* Header Section */}
      <div className="bg-primary text-white py-4 mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="fw-bold mb-2">Find a Doctor</h1>
              <p className="lead mb-0">Connect with top specialists at Holistic Hospitals</p>
            </div>
            <div className="col-lg-6">
              <div className="bg-white rounded-3 p-2 shadow-sm">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-0">
                    <Search size={20} className="text-primary" />
                  </span>
                  <input 
                    type="text" 
                    className="form-control border-0 shadow-none"
                    placeholder="Search by name, specialty, or condition"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Filter Section */}
        <div className="card border-0 shadow-sm rounded-4 mb-4">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="d-flex align-items-center">
                  <Filter size={20} className="text-primary me-2" />
                  <h5 className="fw-bold mb-0">Filter by Specialty</h5>
                </div>
              </div>
              <div className="col-md-6">
                <select 
                  className="form-select form-select-lg shadow-none"
                  value={selectedSpecialty}
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                >
                  {specialties.map((specialty) => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h4 className="fw-bold mb-0">
            {filteredDoctors.length} {filteredDoctors.length === 1 ? "Doctor" : "Doctors"} Found
          </h4>
          <div className="d-flex align-items-center">
            <span className="text-muted me-2">Sort by:</span>
            <select className="form-select form-select-sm shadow-none border-0">
              <option>Relevance</option>
              <option>Rating: High to Low</option>
              <option>Experience: High to Low</option>
            </select>
          </div>
        </div>

        {/* Doctor Cards */}
        {filteredDoctors.length > 0 ? (
          <div className="row g-4">
            {filteredDoctors.map(doctor => (
              <div key={doctor.id} className="col-lg-6">
                <div className="card border-0 shadow-sm rounded-4 h-100">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="col-md-4 mb-3 mb-md-0">
                        <div className="rounded-circle overflow-hidden mx-auto" style={{ width: "120px", height: "120px" }}>
                          <img 
                            src={doctor.image} 
                            alt={doctor.name} 
                            className="img-fluid w-100 h-100 object-fit-cover" 
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="d-flex align-items-center mb-2">
                          <h4 className="fw-bold mb-0">{doctor.name}</h4>
                          <span className="badge bg-primary ms-2">{doctor.specialty}</span>
                        </div>
                        <p className="text-muted mb-2">{doctor.title}</p>
                        
                        <div className="d-flex align-items-center mb-3">
                          <div className="me-3 d-flex align-items-center">
                            <Star size={16} className="text-warning fill-warning me-1" />
                            <span className="fw-bold">{doctor.rating}</span>
                            <span className="text-muted ms-1">({doctor.reviewCount})</span>
                          </div>
                          <div className="me-3 d-flex align-items-center">
                            <Award size={16} className="text-primary me-1" />
                            <span>{doctor.experience}</span>
                          </div>
                        </div>
                        
                        <p className="mb-3">{doctor.description}</p>
                        
                        <div className="d-flex align-items-center mb-3">
                          <MapPin size={16} className="text-primary me-2" />
                          <span className="text-muted">{doctor.location}</span>
                        </div>
                        
                        <div className="d-flex flex-wrap gap-2 mb-3">
                          {doctor.specializations.slice(0, 2).map((spec, index) => (
                            <span key={index} className="badge bg-light text-dark">{spec}</span>
                          ))}
                          {doctor.specializations.length > 2 && (
                            <span className="badge bg-light text-dark">+{doctor.specializations.length - 2} more</span>
                          )}
                        </div>
                        
                        <div className="d-flex gap-2 mt-auto">
                          <button 
                            onClick={() => navigate("/book")} 
                            className="btn btn-primary d-flex align-items-center gap-1"
                          >
                            <Calendar size={16} /> Book
                          </button>
                          <button 
                            onClick={() => handleDoctorClick(doctor)} 
                            className="btn btn-outline-primary d-flex align-items-center gap-1"
                          >
                            <ChevronRight size={16} /> View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card border-0 shadow-sm rounded-4 p-5 text-center">
            <div className="mb-4">
              <Stethoscope size={48} className="text-primary" />
            </div>
            <h3 className="fw-bold mb-2">No Doctors Found</h3>
            <p className="text-muted mb-4">We couldn't find any doctors matching your search criteria. Please try adjusting your filters.</p>
            <div className="d-flex justify-content-center">
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedSpecialty("All");
                }} 
                className="btn btn-primary"
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="card border-0 shadow-sm rounded-4 mt-5 bg-primary text-white">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-lg-8">
                <h3 className="fw-bold mb-2">Need Immediate Assistance?</h3>
                <p className="mb-0">Our patient coordinators are available to help you find the right doctor.</p>
              </div>
              <div className="col-lg-4 mt-3 mt-lg-0 text-lg-end">
                <a 
                  href="tel:+18004275982" 
                  className="btn btn-light text-primary d-flex align-items-center justify-content-center gap-2 py-2 mx-auto mx-lg-0 ms-lg-auto"
                  style={{ maxWidth: "250px" }}
                >
                  <Phone size={18} /> Call (800) 427-5982
                </a>
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
      `}</style>
    </div>
  );
};

export default Doctors;