import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Landing
import LandingLayout from "../Layouts/LandingLayout/LandingLayout";
import LandingPage from "../Pages/Landing/LandingPage";
import LoadingPage from "../Pages/Loading/LoadingPage";

// Auth
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login";

// Main
import MainLayout from "../Layouts/DashboardLayout/DashboardLayout";
import Overview from "../Pages/Overview/OverviewPage";

// Guests
import GuestsLayout from "../Layouts/GuestsLayout/GuestLayout";

// Marketing
import MarketingLayout from "../Layouts/MarketingLayout/MarketingLayout";
import EmailPage from "../Pages/Marketing/Email/EmailPage";

// Campaign
import CampaignLayout from "../Layouts/CampaignLayout/CampaignLayout";
import CampaignSetupLayout from "../Layouts/CampaignSetupLayout/CampaignSetupLayout";
import TemplateBuilderLayout from "../Layouts/TemplateBuilderLayout/TemplateBuilderLayout";
import CampaignPage from "../Pages/Campaign/CampaignPage";
import CreateCampaignPage from "../Pages/Campaign/CreateCampaign";
import EmailTemplatePage from "../Pages/Campaign/EmailTemplate/EmailTemplatePage";
import TemplateBuilder from "../Pages/Campaign/EmailTemplate/TemplateBuilder";
import CampaignSetupPage from "../Pages/Campaign/CampaignSetup/CampaignSetupPage";
import CampaignTemplatePage from "../Pages/Campaign/CampaignSetup/CampaignTemplatePage";
import CampaignCustomizePage from "../Pages/Campaign/CampaignSetup/CampaignCustomizePage";
import CampaignReviewPage from "../Pages/Campaign/CampaignSetup/CampaignReviewPage";
import CampaignSchedulePage from "../Pages/Campaign/CampaignSetup/CampaignSchedule";

// Reservation
import ReservationLayout from "../Layouts/ReservationLayout/ReservationLayout";

export default function AppRouter(): React.ReactElement {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />

      <Routes>
        {/* Landing */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/loading" element={<LoadingPage />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
        </Route>

        {/* Dashboard / Main */}
        <Route element={<MainLayout />}>
          <Route path="/overview" element={<Overview />} />
        </Route>

        {/* Campaign */}
        <Route path="/campaign" element={<CampaignLayout />}>
          <Route index element={<CampaignPage />} />
          <Route path="all-campaign" element={<CampaignPage />} />
          <Route path="create-new-campaign" element={<CreateCampaignPage />} />
          <Route path="email-template" element={<EmailTemplatePage />} />

          <Route element={<CampaignSetupLayout />}>
            <Route path="setup" element={<CampaignSetupPage />} />
            <Route path="create-template" element={<CampaignTemplatePage />} />
            <Route path="review" element={<CampaignReviewPage />} />
            <Route path="schedule" element={<CampaignSchedulePage />} />
          </Route>
        </Route>

        <Route path="/campaign/customize-template" element={<TemplateBuilderLayout />}>
          <Route index element={<CampaignCustomizePage />} />
        </Route>

        <Route path="/campaign/email-template" element={<TemplateBuilderLayout />}>
          <Route path="template-builder" element={<TemplateBuilder />} />
        </Route>

        {/* Guests */}
        <Route path="/guests" element={<GuestsLayout />} />

        {/* Marketing */}
        <Route path="/marketing" element={<MarketingLayout />}>
          <Route path="email" element={<EmailPage />} />
        </Route>

        {/* Reservation */}
        <Route path="/reservation" element={<ReservationLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
