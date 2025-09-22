/* eslint-disable react-refresh/only-export-components */
import * as React from "react";

export type CampaignTypeKey =
  | "room-offer" | "event" | "newsletter" | "birthday" | "offer" | "we-miss-you";

export type CampaignDraft = {
  id?: string;
  type?: CampaignTypeKey;
  name: string;
  features: {
    drip: boolean;
    tracking: boolean;
  };
};

const defaultDraft: CampaignDraft = {
  name: "",
  features: { drip: false, tracking: true },
};

type Ctx = {
  draft: CampaignDraft;
  setDraft: React.Dispatch<React.SetStateAction<CampaignDraft>>;
  reset: (patch?: Partial<CampaignDraft>) => void;
};

const DraftContext = React.createContext<Ctx | null>(null);

export function CampaignDraftProvider({ children }: { children: React.ReactNode }) {
  const [draft, setDraft] = React.useState<CampaignDraft>(defaultDraft);
  const reset = (patch?: Partial<CampaignDraft>) =>
    setDraft({ ...defaultDraft, ...patch });
  return (
    <DraftContext.Provider value={{ draft, setDraft, reset }}>
      {children}
    </DraftContext.Provider>
  );
}

export function useCampaignDraft() {
  const ctx = React.useContext(DraftContext);
  if (!ctx) throw new Error("useCampaignDraft must be used inside provider");
  return ctx;
}
