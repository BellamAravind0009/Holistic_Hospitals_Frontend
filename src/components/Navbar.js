import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, LogIn, UserPlus, Menu, X, CalendarCheck, Eye, Edit3, Home, Building, User } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const username = localStorage.getItem("username");
  const isLoggedIn = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-light bg-white shadow-sm sticky-top">
        <div className="container">
          <div className="d-flex align-items-center">
            <button className="btn menu-btn p-0 me-3" onClick={toggleSidebar} aria-label="Menu">
              <Menu size={24} />
            </button>
            <Link className="navbar-brand d-flex align-items-center fw-bold text-primary" to="/">
              <Building className="me-2" size={24} />
              Holistic Hospitals
            </Link>
          </div>
          <div className="d-flex align-items-center">
            {isLoggedIn ? (
              <>
                <div className="me-3 d-none d-md-block">
                  <span className="fw-medium">Hello, {username || "User"}</span>
                </div>
                <button 
                  className="btn btn-danger d-flex align-items-center px-3" 
                  onClick={handleLogout}
                >
                  <LogOut className="me-2" size={18} /> Logout
                </button>
              </>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-primary me-2 d-flex align-items-center px-3" to="/login">
                  <LogIn className="me-2" size={18} /> Login
                </Link>
                <Link className="btn btn-primary d-flex align-items-center px-3" to="/register">
                  <UserPlus className="me-2" size={18} /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h5 className="sidebar-title">Dashboard</h5>
          <button className="btn close-btn" onClick={toggleSidebar} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        <div className="user-info">
          {isLoggedIn && (
            <div className="d-flex align-items-center p-3 mb-3 bg-primary bg-opacity-25 rounded-3">
              <div className="avatar-circle">
                <User size={20} />
              </div>
              <div className="ms-3">
                <h6 className="mb-0 text-white">{username || "User"}</h6>
                <small className="text-white-50">Patient</small>
              </div>
            </div>
          )}
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" onClick={toggleSidebar}>
              <Home className="icon" /> Home
            </Link>
          </li>
          <li>
            <Link to="/book" onClick={toggleSidebar}>
              <CalendarCheck className="icon" /> Book Appointment
            </Link>
          </li>
          <li>
            <Link to="/appointments" onClick={toggleSidebar}>
              <Eye className="icon" /> View Appointments
            </Link>
          </li>
          <li>
            <Link to="/update" onClick={toggleSidebar}>
              <Edit3 className="icon" /> Update Appointment
            </Link>
          </li>
          <li>
            <Link to="/ProfileManagement" onClick={toggleSidebar}>
            <Edit3 className="icon" /> Profile
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay for dimming effect */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      <style>{`
        .navbar {
          z-index: 1030;
        }
        .sidebar {
          position: fixed;
          top: 0;
          left: -300px;
          width: 300px;
          height: 100%;
          background-color: #1e88e5;
          transition: all 0.4s ease-in-out;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.2);
          padding: 20px 0;
          z-index: 1050;
          border-radius: 0 15px 15px 0;
        }
        .sidebar.open {
          left: 0;
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        .sidebar-title {
          font-size: 18px;
          font-weight: bold;
          color: #ffffff;
          margin-bottom: 0;
        }
        .close-btn {
          background: none;
          border: none;
          color: #ffffff;
        }
        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin-top: 10px;
        }
        .sidebar-menu li {
          margin: 5px 0;
        }
        .sidebar-menu a {
          text-decoration: none;
          color: #ffffff;
          font-size: 16px;
          display: flex;
          align-items: center;
          padding: 12px 20px;
          transition: all 0.3s ease-in-out;
          font-weight: 500;
        }
        .sidebar-menu a:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateX(5px);
        }
        .sidebar-menu .icon {
          margin-right: 10px;
        }

        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1040;
          transition: all 0.3s ease-in-out;
        }

        .menu-btn {
          background: none;
          border: none;
          color: #333;
          transition: transform 0.2s;
        }
        .menu-btn:hover {
          transform: scale(1.1);
        }
        
        .user-info {
          padding: 0 20px;
        }
        
        .avatar-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        @media (max-width: 768px) {
          .sidebar {
            width: 280px;
          }
        }

        @media (max-width: 480px) {
          .sidebar {
            width: 250px;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;