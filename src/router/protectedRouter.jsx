import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Auth
import AuthLayout from "../Layouts/AuthLayouts/AuthLayout.jsx";
import Login from "../Pages/Auth/Login.jsx";

//Main
import MainLayout from "../Layouts/Main Layouts/MainLayout.jsx";
import Dashboard from "../Pages/Dashboard/dashboardPage.jsx";
import ContactsPage from "../Pages/Contact/contactPage.jsx";
import ContractsPage from "../Pages/Contract/ContractsPage.jsx";
import ReportsPage from "../Pages/Reports/ReportsPage.jsx";
import ProfilePage from "../Pages/Profile/profilePage.jsx";



export default function AppRouter() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/profile"  element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contacts"  element={<ContactsPage />} />
          <Route path="/contracts" element={<ContractsPage />} />
          <Route path="/reports"   element={<ReportsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
