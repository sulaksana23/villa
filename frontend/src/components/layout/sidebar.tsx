"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store/sidebar";
import { useAuthStore } from "@/store/auth";
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  Users,
  CalendarDays,
  LogIn,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard, permission: "view_dashboard" },
  { href: "/dashboard/villas", label: "Villa", icon: Building2, permission: "view_villas" },
  { href: "/dashboard/rooms", label: "Kamar", icon: BedDouble, permission: "view_rooms" },
  { href: "#", label: "Tamu", icon: Users, permission: "view_guests", disabled: true },
  { href: "#", label: "Reservasi", icon: CalendarDays, permission: "view_reservations", disabled: true },
];

export function Sidebar() {
  const pathname = usePathname();
  const { isOpen, toggle } = useSidebar();
  const { user, logout } = useAuthStore();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const visibleNavItems = navItems.filter(
    (item) => !item.disabled && (user?.permissions.includes(item.permission) || user?.roles.includes("super_admin"))
  );

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 flex flex-col",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
        {isOpen && (
          <Link href="/dashboard" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span className="font-bold text-sm">Villa Management</span>
          </Link>
        )}
        <Button variant="ghost" size="icon" onClick={toggle} className="text-white/70 hover:text-white hover:bg-white/10 ml-auto">
          {isOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="flex-1 py-4 space-y-1 px-2">
        {visibleNavItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                isActive ? "bg-blue-600 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="p-2 border-t border-white/10 space-y-1">
        <Button
          variant="ghost"
          size={isOpen ? "default" : "icon"}
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          {isOpen && <span className="ml-2">{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>}
        </Button>
        <Button
          variant="ghost"
          size={isOpen ? "default" : "icon"}
          onClick={handleLogout}
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span className="ml-2">Keluar</span>}
        </Button>
      </div>
    </aside>
  );
}