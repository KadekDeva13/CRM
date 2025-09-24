import * as React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  IconRoomOffers,
  IconEvent,
  IconNews,
  IconBirthday,
  IconOffers,
  IconLove,
  IconHelp,
} from "../../components/Campaign/CreateCampaignIcon";

type Tab = "one-time" | "automated";

type TemplateCard = {
  key: string;
  title: string;
  subtitle: string;
  desc: string;
  badge: string;
  tone: "orange" | "blue" | "green" | "pink" | "red";
  icon: React.ReactNode;
};

function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const tones: Record<TemplateCard["tone"], string> = {
  orange: "bg-orange-100 text-orange-600",
  blue: "bg-sky-100 text-sky-600",
  green: "bg-emerald-100 text-emerald-600",
  pink: "bg-pink-100 text-pink-600",
  red: "bg-rose-100 text-rose-600",
};

const ONE_TIME_TEMPLATES: TemplateCard[] = [
  {
    key: "room-offer",
    title: "Room Offer",
    subtitle: "Hotel promotions",
    desc: "Perfect for showcasing special room deals, seasonal packages, and exclusive accommodation offers to drive bookings.",
    badge: "Hospitality",
    tone: "orange",
    icon: <IconRoomOffers />,
  },
  {
    key: "event-announcement",
    title: "Event & Announcement",
    subtitle: "Important updates",
    desc: "Announce upcoming events, company news, product launches, and important updates to keep your audience informed.",
    badge: "General",
    tone: "blue",
    icon: <IconEvent />,
  },
  {
    key: "newsletter",
    title: "Newsletter",
    subtitle: "Regular updates",
    desc: "Share regular updates, insights, and valuable content with your subscribers through professionally designed newsletters.",
    badge: "Content",
    tone: "green",
    icon: <IconNews />,
  },
  {
    key: "we-miss-you",
    title: "We Miss You",
    subtitle: "Re-engagement",
    desc: "Win back inactive customers with personalized messages and special offers to re-engage your dormant audience.",
    badge: "Retention",
    tone: "pink",
    icon: <IconLove />,
  },
  {
    key: "birthday",
    title: "Birthday Campaign",
    subtitle: "Special occasions",
    desc: "Celebrate your customers’ birthdays with personalized greetings and exclusive birthday offers to build loyalty.",
    badge: "Personal",
    tone: "pink",
    icon: <IconBirthday />,
  },
  {
    key: "offer",
    title: "Offer",
    subtitle: "Promotional deals",
    desc: "Promote special discounts, flash sales, and limited-time offers to drive immediate action and boost sales.",
    badge: "Sales",
    tone: "red",
    icon: <IconOffers />,
  },
];

const AUTOMATED_TEMPLATES: TemplateCard[] = [
  {
    key: "room-offer",
    title: "Room Offer",
    subtitle: "Hotel promotions",
    desc: "Perfect for showcasing special room deals, seasonal packages, and exclusive accommodation offers to drive bookings.",
    badge: "Hospitality",
    tone: "orange",
    icon: <IconRoomOffers />,
  },
  {
    key: "event-announcement",
    title: "Event & Announcement",
    subtitle: "Important updates",
    desc: "Announce upcoming events, company news, product launches, and important updates to keep your audience informed.",
    badge: "General",
    tone: "blue",
    icon: <IconEvent />,
  },
  {
    key: "newsletter",
    title: "Newsletter",
    subtitle: "Regular updates",
    desc: "Share regular updates, insights, and valuable content with your subscribers through professionally designed newsletters.",
    badge: "Content",
    tone: "green",
    icon: <IconNews />,
  },
  {
    key: "we-miss-you",
    title: "We Miss You",
    subtitle: "Re-engagement",
    desc: "Win back inactive customers with personalized messages and special offers to re-engage your dormant audience.",
    badge: "Retention",
    tone: "pink",
    icon: <IconLove />,
  },
  {
    key: "birthday",
    title: "Birthday Campaign",
    subtitle: "Special occasions",
    desc: "Celebrate your customers’ birthdays with personalized greetings and exclusive birthday offers to build loyalty.",
    badge: "Personal",
    tone: "pink",
    icon: <IconBirthday />,
  },
  {
    key: "offer",
    title: "Offer",
    subtitle: "Promotional deals",
    desc: "Promote special discounts, flash sales, and limited-time offers to drive immediate action and boost sales.",
    badge: "Sales",
    tone: "red",
    icon: <IconOffers />,
  },
];

function TemplateBox({
  item,
  onClick,
}: {
  item: TemplateCard;
  onClick: (t: TemplateCard) => void;
}) {
  return (
    <div
      onClick={() => onClick(item)}
      className="
        group relative cursor-pointer rounded-xl border border-zinc-200 bg-white p-5 shadow-sm
        transition-colors hover:border-[#0F5A62] hover:bg-[#0F5A62]
      "
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 rounded-lg bg-white p-2">
          <span
            className={`
              block ${tones[item.tone]} text-current
              [&_path]:fill-current [&_rect]:fill-current
              group-hover:text-[#0F5A62] group-hover:[&_path]:fill-[#0F5A62] group-hover:[&_rect]:fill-[#0F5A62]
            `}
          >
            {item.icon}
          </span>
        </div>

        <div className="flex-1 pr-6">
          <h3 className="text-[16px] font-semibold text-zinc-900 group-hover:text-white">
            {item.title}
          </h3>
          <p className=" -mt-0.5 text-sm text-zinc-500 group-hover:text-zinc-200">
            {item.subtitle}
          </p>
          <p className="mt-2 text-sm text-zinc-600 group-hover:text-zinc-100">
            {item.desc}
          </p>
          <div className="mt-3">
            <span
              className="
                inline-flex items-center rounded-md border border-zinc-200 bg-white px-2 py-0.5 text-xs text-zinc-600
                group-hover:text-[#0F5A62]
              "
            >
              {item.badge}
            </span>
          </div>
        </div>
      </div>

      <span className="absolute bottom-4 right-4 text-zinc-400 group-hover:text-white">→</span>
    </div>
  );
}

export default function CreateCampaignPage() {
  const query = useQuery();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("one-time");

  useEffect(() => {
    const t = query.get("tab");
    if (t === "automated" || t === "one-time") setTab(t);
  }, [query]);

  const templates = tab === "one-time" ? ONE_TIME_TEMPLATES : AUTOMATED_TEMPLATES;

  const handleSelect = (t: TemplateCard) => {
    navigate(`/campaign/setup?template=${encodeURIComponent(t.key)}&type=${encodeURIComponent(tab)}`);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#D9D9D9] p-6">
      <div className="mb-6">
        <h1 className="text-[28px] font-semibold text-zinc-900">Choose Campaign Template</h1>
        <p className="mt-1 text-sm text-zinc-600">Select the perfect template for your campaign needs</p>
      </div>

      <div className="mb-5">
        <div className="inline-flex overflow-hidden rounded-lg border border-zinc-300 bg-[#EAEBEB8A] shadow-sm">
          <button
            onClick={() => setTab("one-time")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "one-time" ? "bg-black text-white" : "text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            One-Time Campaign
          </button>
          <button
            onClick={() => setTab("automated")}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              tab === "automated" ? "bg-black text-white" : "text-zinc-700 hover:bg-zinc-50"
            }`}
          >
            Automated Campaign
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {templates.slice(0, 3).map((t) => (
          <TemplateBox key={t.key} item={t} onClick={handleSelect} />
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        {templates.slice(3).map((t) => (
          <TemplateBox key={t.key} item={t} onClick={handleSelect} />
        ))}
      </div>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-[#BFDBFE] bg-[#EFF6FF] p-4">
        <div className="mt-0.5 flex-shrink-0">
          <IconHelp />
        </div>
        <div>
          <p className="font-medium text-[#1D4ED8]">Need help choosing the right template?</p>
          <p className="mt-1 text-sm text-[#1E3A8A]">
            Our campaign templates are designed to help you achieve specific marketing goals. If you're unsure which one
            to choose, consider your primary objective:
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm text-[#1E3A8A]">
            <li>
              <span className="font-medium text-[#1D4ED8]">One-time campaigns</span> are perfect for specific promotions,
              announcements, or seasonal content
            </li>
            <li>
              <span className="font-medium text-[#1D4ED8]">Automated campaigns</span> work continuously in the background
              based on customer behavior and triggers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
