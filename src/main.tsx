// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import ThemeProvider from "./Theme/ThemeProvider";
import "./index.css";
import App from "./Router/ProtectedRoute";
import { store } from "./store";

// ⬇︎ add this line if you want shared state between /campaign/types and /campaign/setup
import { CampaignDraftProvider } from "./stores/campaignDraft";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        {/* Wrap the app so /campaign/types → /campaign/setup can share data */}
        <CampaignDraftProvider>
          <App />
        </CampaignDraftProvider>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
