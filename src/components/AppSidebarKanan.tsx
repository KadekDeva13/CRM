import React from "react";

type Notification = { id: string; title: string; time: string; icon?: React.ReactNode };
type Activity = { id: string; text: string; time: string; tone?: "purple" | "green" | "blue" | "yellow"; };
type Contact = { id: string; name: string; avatar: string };

export default function AppSidebarKanan(): React.ReactElement {
  const notifications: Notification[] = [
    { id: "n1", title: "You fixed a bug.", time: "just now" },
    { id: "n2", title: "New user registered.", time: "59 minutes ago" },
    { id: "n3", title: "You fixed a bug.", time: "12 hours ago" },
    { id: "n4", title: "Andi Lane subscribed to you.", time: "Today, 11:59 AM" },
  ];

  const activities: Activity[] = [
    { id: "a1", text: "Changed the style.", time: "just now", tone: "purple" },
    { id: "a2", text: "Released a new version.", time: "59 minutes ago", tone: "blue" },
    { id: "a3", text: "Submitted a bug.", time: "12 hours ago", tone: "yellow" },
    { id: "a4", text: "Modified a data in Page X.", time: "Today, 11:59 AM", tone: "green" },
    { id: "a5", text: "Deleted a page in Project X.", time: "Feb 2, 2025", tone: "blue" },
  ];

  const contacts: Contact[] = [
    { id: "c1", name: "Natali Craig", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: "c2", name: "Drew Cano", avatar: "https://i.pravatar.cc/40?img=5" },
    { id: "c3", name: "Andi Lane", avatar: "https://i.pravatar.cc/40?img=7" },
    { id: "c4", name: "Koray Okumus", avatar: "https://i.pravatar.cc/40?img=11" },
    { id: "c5", name: "Kate Morrison", avatar: "https://i.pravatar.cc/40?img=15" },
    { id: "c6", name: "Melody Macy", avatar: "https://i.pravatar.cc/40?img=19" },
  ];

  return (
    <aside
      className={[
        "fixed right-0 top-16 z-30",
        "h-[calc(100vh-4rem)] w-72 shrink-0",
        "border-l border-white/5 bg-[#1a1a1a] text-white",
      ].join(" ")}
      aria-label="Right sidebar"
    >
      <div className="h-full overflow-y-auto p-4 text-sm text-white/80">
        <Section title="Notifications">
          <ul className="space-y-3">
            {notifications.map((n) => (
              <li key={n.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-white/5">
                <Badge className="mt-0.5">
                  <BellIcon className="h-3.5 w-3.5" />
                </Badge>
                <div className="min-w-0">
                  <div className="truncate">{n.title}</div>
                  <div className="text-[11px] text-white/40">{n.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Activities" className="mt-6">
          <ul className="space-y-3">
            {activities.map((a) => (
              <li key={a.id} className="flex items-start gap-3 rounded-lg p-2 hover:bg-white/5">
                <Dot tone={a.tone} />
                <div className="min-w-0">
                  <div className="truncate">{a.text}</div>
                  <div className="text-[11px] text-white/40">{a.time}</div>
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Contacts" className="mt-6">
          <ul className="space-y-3">
            {contacts.map((c) => (
              <li key={c.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="h-8 w-8 rounded-full border border-white/10 object-cover"
                />
                <div className="truncate">{c.name}</div>
              </li>
            ))}
          </ul>
        </Section>
      </div>
    </aside>
  );
}

function Section({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <h3 className="mb-3 px-1 text-[13px] font-semibold text-white">{title}</h3>
      {children}
    </section>
  );
}

function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        "rounded-md border border-white/10 bg-white/5 p-1.5 text-white/80",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

function Dot({ tone = "purple" }: { tone?: "purple" | "green" | "blue" | "yellow" }) {
  const bg =
    tone === "green"
      ? "bg-emerald-400"
      : tone === "blue"
      ? "bg-sky-400"
      : tone === "yellow"
      ? "bg-amber-300"
      : "bg-fuchsia-400";
  return <span className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${bg}`} />;
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden="true">
      <path
        d="M10 17a2 2 0 0 0 2-2H8a2 2 0 0 0 2 2Zm6-5V9a6 6 0 1 0-12 0v3L2 15h16l-2-3Z"
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
