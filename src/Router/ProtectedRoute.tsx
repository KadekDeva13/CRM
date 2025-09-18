import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import Overview from "../Pages/Overview/OverviewPage";

// Guests (baru)
import GuestsLayout from "../Layouts/GuestsLayout/GuestLayout";
// import GuestsAnalyticsPage from "../Pages/Guests/Analytics/GuestsAnalyticsPage";
// import GuestsSearchPage from "../Pages/Guests/Search/GuestsSearchPage";
// import GuestSegmentsPage from "../Pages/Guests/Segments/GuestSegmentsPage";
import GuestListPage from "../Pages/Guests/Analytics/GuestListPage";

//Marketing
import MarketingLayout from "../Layouts/MarketingLayout/MarketingLayout";
import EmailPage from "../Pages/Marketing/Email/EmailPage";

//Reservation
import ReservationLayout from "../Layouts/ReservationLayout/ReservationLayout";

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
          <Route path="/overview" element={<Overview />} />
        </Route>

        <Route path="/guests" element={<GuestsLayout />}>
          {/* <Route index element={<GuestsAnalyticsPage />} />             
            <Route path="search" element={<GuestsSearchPage />} />            */}
          <Route path="guest-insights" element={<GuestListPage />} />
        </Route>

        <Route path="/marketing" element={<MarketingLayout />}>
          <Route path="email" element={<EmailPage />}></Route>
        </Route>

        <Route path="/reservation" element={<ReservationLayout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
