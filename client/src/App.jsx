import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/HomePage";

import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddEditProject from "./pages/AddEditProject";
import AddEditTestimonial from "./pages/AddEditTestimonial";
import ManageProjects from './pages/ManageProjects';
import ManageTestimonials from './pages/ManageTestimonials';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const location = useLocation();
  
  useEffect(() => {
    AOS.init({ duration: 800, once: false, mirror: true });
    AOS.refresh();
  }, [location.pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />

      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />

      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="projects" element={<ManageProjects />} />
        <Route path="projects/new" element={<AddEditProject />} />
        <Route path="projects/:id" element={<AddEditProject />} />
        <Route path="testimonials" element={<ManageTestimonials />} />
        <Route path="testimonials/new" element={<AddEditTestimonial />} />
        <Route path="testimonials/:id" element={<AddEditTestimonial />} />
      </Route>
    </Routes>
  );
}

export default App;