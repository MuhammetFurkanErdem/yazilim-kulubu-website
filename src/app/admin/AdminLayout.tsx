import { Outlet, Link, useLocation } from "react-router";
import { useTheme } from "next-themes";
import { 
  LayoutDashboard, 
  Calendar, 
  Briefcase, 
  Users, 
  Settings, 
  LogOut,
  Sun,
  Moon,
  Code2,
  Inbox
} from "lucide-react";
import { useEffect, useState } from "react";

export function AdminLayout() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const menuItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Etkinlikler", path: "/admin/etkinlikler", icon: Calendar },
    { name: "Projeler", path: "/admin/projeler", icon: Briefcase },
    { name: "Başvurular", path: "/admin/basvurular", icon: Inbox },
    { name: "Ekip Yönetimi", path: "/admin/ekip", icon: Users },
    { name: "Ayarlar", path: "/admin/ayarlar", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-page flex">
      {/* Sidebar */}
      <aside className="w-64 bg-surface border-r border-default flex flex-col transition-colors duration-300">
        {/* Brand */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-default">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white overflow-hidden shadow-sm p-0.5">
            <img src="/logo.png" alt="YGK Logo" className="w-full h-full object-cover scale-110" />
          </div>
          <span className="font-bold tracking-tight text-primary">YGK Admin</span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  isActive 
                    ? "bg-[var(--brand-primary)] text-[var(--brand-text)] shadow-sm" 
                    : "text-muted hover:bg-page hover:text-primary"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-default flex flex-col gap-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-muted hover:bg-page hover:text-primary transition-all"
          >
            <LogOut className="w-5 h-5" />
            Siteye Dön
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-20 bg-page border-b border-default px-8 flex items-center justify-between transition-colors duration-300">
          <h1 className="text-xl font-bold text-primary">
            {menuItems.find(i => i.path === location.pathname)?.name || "Yönetim Paneli"}
          </h1>
          <div className="flex items-center gap-4">
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-surface border border-default text-muted hover:text-primary transition-colors"
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            )}
            <div className="flex items-center gap-3 pl-4 border-l border-default">
              <div className="text-right hidden sm:block">
                <div className="text-sm font-bold text-primary">Admin User</div>
                <div className="text-xs text-muted">Yönetici</div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)] text-[var(--brand-text)] flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto bg-surface p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
