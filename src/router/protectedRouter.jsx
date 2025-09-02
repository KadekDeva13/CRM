import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AuthLayout from "../Layouts/AuthLayouts/AuthLayout.jsx";
import MainLayout from "../Layouts/Main Layouts/MainLayout.jsx";
import Login from "../Pages/Auth/Login.jsx";
import Dashboard from "../Pages/Dashboard/dashboardPage.jsx";

const Contacts  = () => <div className="text-white">Contacts content</div>;
const Contracts = () => <div className="text-white">Contracts content</div>;
const Reports   = () => <div className="text-white">Reports content</div>;

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts"  element={<Contacts />} />
          <Route path="/contracts" element={<Contracts />} />
          <Route path="/reports"   element={<Reports />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
