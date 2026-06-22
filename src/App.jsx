import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import JobsPage from "./pages/JobsPage";
import SecurityPage from "./pages/SecurityPage";
import AuthPage from "./pages/AuthPage";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="security" element={<SecurityPage />} />
        <Route path="dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}
