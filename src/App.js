import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import BookAppointment from "./pages/BookAppointment";
import ViewAppointments from "./pages/ViewAppointments";
import UpdateAppointment from "./pages/UpdateAppointment";
import Profile from "./pages/profile";
import Navbar from "./components/Navbar";
import Payment from "./pages/payment";
import Confirmation from "./pages/confirmation";
import ChatAssistant from "./components/ChatAssistant"; // Import the new component
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileManagement from "./pages/ProfileManagement";
import Specialties from "./pages/Specialties";
import Cardiology from "./pages/Branch/Cardiology";
import GeneralMedicine from "./pages/Branch/GeneralMedicine";
import Orthopedics from "./pages/Branch/Orthopedics";
import Neurology from "./pages/Branch/Neurology";
import Doctors from "./pages/Doctors";
import DoctorProfile from "./pages/DoctorProfile";
import Ophthalmology from "./pages/Branch/Ophthalmology"
import Surgery from "./pages/Branch/Surgery";
import Pathology from "./pages/Branch/Pathology";
import InternalMedicine from "./pages/Branch/InternalMedicine";
import Pediatrics from "./pages/Branch/Pediatrics";
import Pulmonology from "./pages/Branch/Pulmonology";

// Authentication check
const isAuthenticated = () => !!localStorage.getItem("token");
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className="app min-vh-100 d-flex flex-column">
      {/* Only show Navbar if not on auth pages and user is authenticated */}
      {!isAuthPage && isAuthenticated() && <Navbar />}
      
      {/* Main content area */}
      <div className={`flex-grow-1 ${!isAuthPage && isAuthenticated() ? "pt-0" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/book" element={<ProtectedRoute element={<BookAppointment />} />} />
          <Route path="/appointments" element={<ProtectedRoute element={<ViewAppointments />} />} />
          <Route path="/update" element={<ProtectedRoute element={<UpdateAppointment />} />} />
          <Route path="/payment" element={<ProtectedRoute element={<Payment />} />} />
          <Route path="/confirmation" element={<ProtectedRoute element={<Confirmation />} />} />
          <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
          <Route path="/ProfileManagement" element={<ProtectedRoute element={<ProfileManagement/>}/>}/>
          <Route path="/Specialties" element={<ProtectedRoute element={<Specialties/>}/>}/>
          <Route path="/Cardiology" element={<ProtectedRoute element={<Cardiology/>}/>}/>
          <Route path="/generalmedicine" element={<ProtectedRoute element={<GeneralMedicine/>}/>}/>
          <Route path="/orthopedics" element={<ProtectedRoute element={<Orthopedics/>}/>}/>
          <Route path="/neurology" element={<ProtectedRoute element={<Neurology/>}/>}/>
          <Route path="/doctors" element={<ProtectedRoute element={<Doctors/>}/>}/>
          <Route path="/doctorprofile" element={<ProtectedRoute element={<DoctorProfile/>}/>}/>
          <Route path="/ophthalmology" element={<ProtectedRoute element={<Ophthalmology/>}/>}/>
          <Route path="/surgery" element={<ProtectedRoute element={<Surgery/>}/>}/>
          <Route path="/pathology" element={<ProtectedRoute element={<Pathology/>}/>}/>
          <Route path="/internalmedicine" element={<ProtectedRoute element={<InternalMedicine/>}/>}/>
          <Route path="/pediatrics" element={<ProtectedRoute element={<Pediatrics/>}/>}/>
          <Route path="/pulmonology" element={<ProtectedRoute element={<Pulmonology/>}/>}/>
        </Routes>
      </div>
      
      {/* Chat Assistant - only show when authenticated */}
      {isAuthenticated() && <ChatAssistant />}
      
      {/* Global styles */}
      <style jsx global>{`
        body {
          font-family: 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
          background-color: #f8f9fa;
        }
        
        .app {
          min-height: 100vh;
        }
        
        .hover-card {
          transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
        }
        
        .btn {
          border-radius: 0.5rem;
          padding: 0.5rem 1.25rem;
        }
        
        .card {
          border-radius: 0.75rem;
        }
      `}</style>
    </div>
  );
}

export default App;