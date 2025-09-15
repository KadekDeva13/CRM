import React from "react";
import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import { Toaster } from "react-hot-toast";

//Landing
import LandingLayout from "../Layouts/LandingLayout/LandingLayout";
import LandingPage from "../Pages/Landing/LandingPage";
import LoadingPage from "../Pages/Loading/LoadingPage";

// Auth
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";

// Main
import MainLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Overeview from "../Pages/Overeview/OvereviewPage";
import GuestListPage from "../Pages/Guests/GusetListPage"

export default function AppRouter(): React.ReactElement {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Route>


        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/overeview" element={<Overeview />} />
          <Route path="/guests" element={<GuestListPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/overeview" />} />
      </Routes>
    </BrowserRouter>
  );
}
