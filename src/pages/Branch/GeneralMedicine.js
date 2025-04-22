import React from "react";
import { useNavigate } from "react-router-dom";
import { 
  Stethoscope,
  Heart, 
  Brain,
  Bone,
  Calendar, 
  Phone, 
  Award,
  Clock,
  CheckCircle
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const GeneralMedicine = () => {
  const navigate = useNavigate();


  const images = {
    banner: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?q=80&w=1920&auto=format&fit=crop",
    overview: "/Images/GeneralMedicine/Overview.jpeg",
    doctor1: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    doctor2: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    doctor3: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=400&auto=format&fit=crop",
    surgery: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?q=80&w=600&auto=format&fit=crop",
    rehabilitation: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=600&auto=format&fit=crop",
  };
  
  const specialtyData = {
    name: "General Medicine",
    icon: <Stethoscope size={28} />,
    tagline: "Comprehensive primary care for patients of all ages with a focus on prevention.",
    overview: "The General Medicine Department provides comprehensive primary healthcare services for patients of all ages. Our internists and family physicians focus on disease prevention, diagnosis, and treatment of acute and chronic illnesses. We provide continuity of care for our patients, coordinating with specialists when needed to ensure the best possible health outcomes.",
    highlights: [
      "Holistic approach to patient care",
      "Focus on preventive health and wellness",
      "Coordination with specialists for comprehensive care",
      "Same-day appointments for urgent needs",
      "Telehealth services available"
    ],
    services: [
      {
        name: "Preventive Care",
        description: "Annual physicals, health screenings, immunizations, and personalized preventive care plans.",
        image:"/Images/GeneralMedicine/PC.jpeg"
      },
      {
        name: "Chronic Disease Management",
        description: "Ongoing care and management of conditions like diabetes, hypertension, asthma, and thyroid disorders.",
        image:"/Images/GeneralMedicine/CDM.jpeg"
      },
      {
        name: "Acute Care",
        description: "Diagnosis and treatment of common illnesses and infections requiring immediate attention.",
        image:"/Images/GeneralMedicine/AC.jpeg"
      },
      {
        name: "Health Counseling",
        description: "Guidance on nutrition, exercise, stress management, and lifestyle modifications.",
        image:"/Images/GeneralMedicine/HC.jpeg"
      },
      {
        name: "Diagnostic Services",
        description: "Blood tests, EKGs, spirometry, and other common diagnostic procedures.",
        image:"/Images/GeneralMedicine/DS.jpeg"
      },
      {
        name: "Geriatric Care",
        description: "Specialized care for older adults focusing on maintaining quality of life and independence.",
        image:"/Images/GeneralMedicine/GC.jpeg"
      }
    ],
    equipment: [
      {
        name: "Point-of-Care Testing",
        description: "Rapid testing for common conditions including strep, flu, and blood glucose.",
        image:"/Images/GeneralMedicine/POCT.jpeg"
      },
      {
        name: "Digital Health Records",
        description: "Secure electronic health records system for coordinated care across departments.",
        image:"/Images/GeneralMedicine/DHR.jpeg"
      },
      {
        name: "Spirometry",
        description: "For diagnosis and management of respiratory conditions like asthma and COPD.",
        image:"/Images/GeneralMedicine/SP.jpeg"
      },
      {
        name: "Electrocardiogram (EKG)",
        description: "For evaluating heart rhythm and detecting cardiac abnormalities.",
        image:"/Images/GeneralMedicine/EKG.jpeg"
      }
    ],
    doctors: [
      {
        name: "Dr. Amanda Peterson",
        title: "Director of General Medicine",
        description: "Board-certified in Internal Medicine with special interest in preventive care and women's health.",
        image:"/Images/GeneralMedicine/Amanda.jpeg"
      },
      {
        name: "Dr. James Wilson",
        title: "Family Physician",
        description: "Provides care for patients of all ages with expertise in managing chronic conditions.",
        image:"/Images/GeneralMedicine/James.jpeg"
      },
      {
        name: "Dr. Sofia Garcia",
        title: "Internal Medicine Physician",
        description: "Specializes in adult medicine with a focus on complex medical conditions.",
        image:"/Images/GeneralMedicine/Sofia.jpeg"
      }
    ],
    conditions: [
      "Hypertension",
      "Diabetes",
      "Respiratory Infections",
      "Gastrointestinal Disorders",
      "Allergies",
      "Skin Conditions",
      "Minor Injuries",
      "Thyroid Disorders"
    ],
    testimonials: [
      {
        name: "Susan L.",
        quote: "Dr. Peterson has been my primary care physician for years. She truly takes the time to listen and provide personalized care."
      },
      {
        name: "David M.",
        quote: "The staff at General Medicine is always friendly and efficient. I appreciate how they coordinate my care with specialists."
      },
      {
        name: "Karen W.",
        quote: "As someone managing multiple health conditions, I value the comprehensive approach the team takes with my care."
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

export default GeneralMedicine;