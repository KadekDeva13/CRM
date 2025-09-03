type AppFooterProps = {
  variant?: "auth" | "app";
};

export default function AppFooter({ variant = "auth" }: AppFooterProps) {
  if (variant === "app") {
    return (
      <footer className="h-14 w-full flex items-center px-4 text-xs bg-[color:var(--bg,#0b1220)] text-white/70">
        <span>© {new Date().getFullYear()} CRM</span>
        <nav className="flex gap-4 ml-auto">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Help</a>
        </nav>
      </footer>
    );
  }

  return (
    <footer className="h-14 w-full grid grid-cols-1 lg:grid-cols-2 text-xs">
      <div className="hidden lg:flex items-center px-4 text-white/80 bg-gradient-to-br from-indigo-600 to-blue-600">
        © {new Date().getFullYear()} CRM — All rights reserved.
      </div>
      <div className="flex items-center px-4 bg-[color:var(--bg,#0b1220)] text-white/70">
        <span className="lg:hidden">© {new Date().getFullYear()} CRM</span>
        <nav className="flex gap-4 ml-auto">
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Help</a>
        </nav>
      </div>
    </footer>
  );
}
