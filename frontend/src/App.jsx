import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile } from "./redux/authSlice";
import Navbar from "./components/shared/Navbar";
import HomePage from "./pages/HomePage";
import JobPage from "./pages/JobPage";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";






export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  
  // Check authentication status on app load
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  
  // Hide navbar on login and signup pages
  const hideNavbar = ['/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/jobs" element={<JobPage />} />
        <Route path="/browse" element={<BrowsePage />} />
      </Routes>
    </div>
  );
}

