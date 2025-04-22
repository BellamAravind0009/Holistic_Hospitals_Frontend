import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Heart, 
  Stethoscope,
  Brain,
  Bone,
//   Lungs,
  Eye,
  Baby,
  Pill,
  Microscope,
  Scissors
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Specialties = () => {
  const navigate = useNavigate();

  // All hospital specialties
  const allSpecialties = [
    { 
      name: "Cardiology", 
      icon: <Heart size={24} />,
      description: "State-of-the-art cardiac care with advanced diagnostic and treatment procedures for heart conditions.",
      bgColor: "bg-danger bg-opacity-10"
    },
    { 
      name: "GeneralMedicine", 
      icon: <Stethoscope size={24} />,
      description: "Comprehensive primary care services for patients of all ages, focusing on prevention and overall wellness.",
      bgColor: "bg-primary bg-opacity-10"
    },
    { 
      name: "Orthopedics", 
      icon: <Bone size={24} />,
      description: "Expert care for bone, joint, and muscle conditions with minimally invasive surgical techniques.",
      bgColor: "bg-success bg-opacity-10"
    },
    { 
      name: "Neurology", 
      icon: <Brain size={24} />,
      description: "Advanced neurological services for diagnosing and treating disorders of the brain, spine, and nervous system.",
      bgColor: "bg-warning bg-opacity-10"
    },
    { 
      name: "Pulmonology", 
      icon: <Eye size={24} />,
      description: "Specialized care for respiratory conditions and lung diseases with advanced pulmonary function testing.",
      bgColor: "bg-info bg-opacity-10"
    },
    { 
      name: "Ophthalmology", 
      icon: <Eye size={24} />,
      description: "Comprehensive eye care services including diagnosis, treatment, and surgery for various eye conditions.",
      bgColor: "bg-secondary bg-opacity-10"
    },
    { 
      name: "Pediatrics", 
      icon: <Baby size={24} />,
      description: "Compassionate healthcare for infants, children, and adolescents with a focus on growth and development.",
      bgColor: "bg-primary bg-opacity-10"
    },
    { 
      name: "InternalMedicine", 
      icon: <Pill size={24} />,
      description: "Diagnosing and treating complex diseases and chronic conditions in adult patients.",
      bgColor: "bg-danger bg-opacity-10"
    },
    { 
      name: "Pathology", 
      icon: <Microscope size={24} />,
      description: "Advanced laboratory testing and diagnostic services to identify diseases and guide treatment plans.",
      bgColor: "bg-success bg-opacity-10"
    },
    { 
      name: "Surgery", 
      icon: <Scissors size={24} />,
      description: "General and specialized surgical procedures performed with the latest technology and techniques.",
      bgColor: "bg-warning bg-opacity-10"
    }
  ];

  return (
    <div className="min-vh-100 bg-light">
      {/* Header Banner */}
      <div className="bg-primary text-white py-5">
        <div className="container py-3">
          <h1 className="display-4 fw-bold mb-3">Our Medical Specialties</h1>
          <p className="lead mb-0">Providing world-class healthcare across multiple specialties with cutting-edge technology and expert physicians.</p>
        </div>
      </div>

      <div className="container py-5">
        {/* Introduction Section */}
        <div className="row mb-5">
          <div className="col-lg-8 mx-auto text-center">
            <h2 className="fw-bold mb-4">Comprehensive Healthcare Solutions</h2>
            <p className="lead">At Holistic Hospitals, we offer a wide range of medical specialties to provide comprehensive care for all your healthcare needs. Our team of board-certified specialists utilizes the latest medical advancements to deliver exceptional treatment outcomes.</p>
            <p>Each of our specialty departments is equipped with state-of-the-art technology and staffed by highly trained medical professionals who are leaders in their respective fields. We're committed to providing personalized care tailored to each patient's unique needs.</p>
          </div>
        </div>

        {/* Specialties Grid */}
        <div className="row g-4">
          {allSpecialties.map((specialty, index) => (
            <div key={index} className="col-md-6 col-lg-4">
              <div className={`card h-100 border-0 rounded-4 shadow-sm hover-card ${specialty.bgColor}`}>
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-white rounded-circle p-3 text-primary shadow-sm me-3">
                      {specialty.icon}
                    </div>
                    <h4 className="card-title mb-0">{specialty.name}</h4>
                  </div>
                  <p className="card-text">{specialty.description}</p>
                  <button 
                    className="btn btn-primary mt-2"
                    onClick={() => navigate(`/${specialty.name.toLowerCase()}`)}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="row mt-5">
          <div className="col-lg-8 mx-auto">
            <div className="card border-0 shadow rounded-4 bg-primary text-white p-4">
              <div className="card-body text-center">
                <h3 className="fw-bold mb-3">Need Medical Assistance?</h3>
                <p className="lead mb-4">Our expert team is ready to help you with personalized healthcare solutions.</p>
                <button 
                  onClick={() => navigate("/book")} 
                  className="btn btn-light btn-lg px-4 fw-bold"
                >
                  Book an Appointment
                </button>
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
      `}</style>
    </div>
  );
};

export default Specialties;