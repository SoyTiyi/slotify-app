import {
  LayoutDashboard,
  Calendar,
  Users,
  Briefcase,
  Settings,
  HelpCircle,
  LucideIcon,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const mainNavItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/private/dashboard",
    icon: LayoutDashboard,
  },
  { label: "Calendario", href: "/private/calendar", icon: Calendar },
  { label: "Clientes", href: "/private/clients", icon: Users },
  { label: "Proyectos", href: "/private/projects", icon: Briefcase },
];

export const systemNavItems: NavItem[] = [
  { label: "Configuración", href: "/private/settings", icon: Settings },
  { label: "Ayuda y Soporte", href: "/private/help", icon: HelpCircle },
];
