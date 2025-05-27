import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddEditProject from "./pages/AddEditProject";
import AddEditTestimonial from "./pages/AddEditTestimonial";
import ManageProjects from './pages/ManageProjects';
import ManageTestimonials from './pages/ManageTestimonials';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/admin/dashboard");
  };

  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-[#1E1E1E] text-white font-sans scroll-smooth">
            <Navbar />
            <Hero />
            <About />
            <Projects />
            <Skills />
            {/* <Testimonials /> */}
            <Contact />
            <Footer />
            <ScrollToTop />
          </div>
        }
      />
      <Route path="/admin" element={<AdminLogin onLogin={handleLogin} />} />
      <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/projects/new"
        element={
          <ProtectedRoute>
            <AddEditProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/projects/:id"
        element={
          <ProtectedRoute>
            <AddEditProject />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/testimonials/new"
        element={
          <ProtectedRoute>
            <AddEditTestimonial />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/projects" element={<ProtectedRoute><ManageProjects /></ProtectedRoute>} />
      <Route path="/admin/testimonials" element={<ProtectedRoute><ManageTestimonials /></ProtectedRoute>} />

      <Route
        path="/admin/testimonials/:id"
        element={
          <ProtectedRoute>
            <AddEditTestimonial />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
