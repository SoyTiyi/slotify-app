# Plan: Arquitectura de Sidebar para Slotify

## Resumen

Reemplazar el Navbar superior actual por un **Sidebar completo** que contenga toda la navegación, branding y perfil de usuario con logout. El sidebar será consistente en todas las páginas privadas e incluirá soporte responsive para móvil.

## Decisiones de Arquitectura

1. **Crear nuevo componente `Sidebar`** en lugar de usar `FeaturesNavbar` (mejor semántica)
2. **Sidebar en `private/layout.tsx`** - se renderiza una sola vez para todas las rutas privadas
3. **Clerk integrado en el sidebar** - perfil de usuario y logout directamente en el sidebar
4. **Mobile**: Sidebar como drawer con hamburger menu

## Estructura de Archivos a Crear/Modificar

```
components/
├── Sidebar/
│   ├── Sidebar.tsx              # Componente principal
│   ├── SidebarNav.tsx           # Sección de navegación
│   ├── SidebarNavItem.tsx       # Item individual (client - usePathname)
│   ├── SidebarUserSection.tsx   # Perfil + logout (client - Clerk hooks)
│   ├── SidebarMobile.tsx        # Drawer para móvil (client - estado)
│   └── index.ts                 # Barrel export

lib/
└── constants/
    └── navigation.ts            # Configuración de items del menú

app/private/
├── layout.tsx                   # MODIFICAR - usar Sidebar
├── calendar/page.tsx            # CREAR - placeholder
├── clients/page.tsx             # CREAR - placeholder
└── services/page.tsx            # CREAR - placeholder
```

---

## Código Completo por Archivo

### 1. `lib/constants/navigation.ts`

> Crear la carpeta `lib/constants/` si no existe

```typescript
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
  { label: "Dashboard", href: "/private/dashboard", icon: LayoutDashboard },
  { label: "Calendario", href: "/private/calendar", icon: Calendar },
  { label: "Clientes", href: "/private/clients", icon: Users },
  { label: "Servicios", href: "/private/services", icon: Briefcase },
];

export const systemNavItems: NavItem[] = [
  { label: "Configuración", href: "/private/settings", icon: Settings },
  { label: "Ayuda & Soporte", href: "/private/help", icon: HelpCircle },
];
```

---

### 2. `components/Sidebar/SidebarNavItem.tsx`

> Este es un **client component** porque usa `usePathname()`

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  href: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const SidebarNavItem = ({ href, label, icon: Icon, onClick }: SidebarNavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive
          ? "bg-primary-soft text-primary border-l-4 border-primary"
          : "text-text-secondary hover:bg-surface-2 hover:text-text-primary"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default SidebarNavItem;
```

---

### 3. `components/Sidebar/SidebarNav.tsx`

```tsx
import { NavItem } from "@/lib/constants/navigation";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarNavProps {
  title?: string;
  items: NavItem[];
  onItemClick?: () => void;
}

const SidebarNav = ({ title, items, onItemClick }: SidebarNavProps) => {
  return (
    <nav className="px-3">
      {title && (
        <h3 className="px-4 py-2 text-xs font-semibold text-muted uppercase tracking-wider">
          {title}
        </h3>
      )}
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.href}>
            <SidebarNavItem
              href={item.href}
              label={item.label}
              icon={item.icon}
              onClick={onItemClick}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SidebarNav;
```

---

### 4. `components/Sidebar/SidebarUserSection.tsx`

> Este es un **client component** porque usa hooks de Clerk

```tsx
"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, User } from "lucide-react";

interface SidebarUserSectionProps {
  onLogout?: () => void;
}

const SidebarUserSection = ({ onLogout }: SidebarUserSectionProps) => {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();

  const handleLogout = () => {
    if (onLogout) onLogout();
    signOut();
  };

  if (!isLoaded) {
    return (
      <div className="p-4 border-t border-border">
        <div className="animate-pulse flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-surface-2" />
          <div className="flex-1">
            <div className="h-4 bg-surface-2 rounded w-24 mb-2" />
            <div className="h-3 bg-surface-2 rounded w-32" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 border-t border-border">
      <div className="flex items-center gap-3 mb-3">
        {user?.imageUrl ? (
          <img
            src={user.imageUrl}
            alt={user.fullName || "Usuario"}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="h-10 w-10 rounded-full bg-primary-soft flex items-center justify-center">
            <User className="h-5 w-5 text-primary" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {user?.fullName || "Usuario"}
          </p>
          <p className="text-xs text-muted truncate">
            {user?.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 w-full px-3 py-2 text-sm text-muted hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
      >
        <LogOut className="h-4 w-4" />
        <span>Cerrar sesión</span>
      </button>
    </div>
  );
};

export default SidebarUserSection;
```

---

### 5. `components/Sidebar/SidebarMobile.tsx`

> Este es un **client component** porque maneja estado (abrir/cerrar drawer)

```tsx
"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNavItems, systemNavItems } from "@/lib/constants/navigation";
import SidebarNav from "./SidebarNav";
import SidebarUserSection from "./SidebarUserSection";

const SidebarMobile = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeDrawer = () => setIsOpen(false);

  return (
    <>
      {/* Header móvil - solo visible en pantallas pequeñas */}
      <header className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border flex items-center px-4 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="ml-3 text-xl font-bold text-primary">Slotify</span>
      </header>

      {/* Overlay + Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Overlay oscuro */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeDrawer}
          />

          {/* Drawer */}
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-surface flex flex-col animate-in slide-in-from-left duration-300">
            {/* Header del drawer */}
            <div className="p-6 border-b border-border flex items-center justify-between">
              <span className="text-xl font-bold text-primary">Slotify</span>
              <button
                onClick={closeDrawer}
                className="p-2 text-text-secondary hover:text-text-primary hover:bg-surface-2 rounded-lg transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navegación */}
            <div className="flex-1 py-4 overflow-y-auto">
              <SidebarNav
                title="Menú Principal"
                items={mainNavItems}
                onItemClick={closeDrawer}
              />
              <div className="my-4" />
              <SidebarNav
                title="Sistema"
                items={systemNavItems}
                onItemClick={closeDrawer}
              />
            </div>

            {/* Usuario */}
            <SidebarUserSection onLogout={closeDrawer} />
          </aside>
        </div>
      )}
    </>
  );
};

export default SidebarMobile;
```

---

### 6. `components/Sidebar/Sidebar.tsx`

> Componente principal del sidebar (desktop)

```tsx
import { mainNavItems, systemNavItems } from "@/lib/constants/navigation";
import SidebarNav from "./SidebarNav";
import SidebarUserSection from "./SidebarUserSection";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-surface border-r border-border">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <span className="text-xl font-bold text-primary">Slotify</span>
      </div>

      {/* Navegación principal */}
      <div className="flex-1 py-4 overflow-y-auto">
        <SidebarNav title="Menú Principal" items={mainNavItems} />
        <div className="my-4" />
        <SidebarNav title="Sistema" items={systemNavItems} />
      </div>

      {/* Sección de usuario */}
      <SidebarUserSection />
    </aside>
  );
};

export default Sidebar;
```

---

### 7. `components/Sidebar/index.ts`

> Barrel export para importar fácilmente

```typescript
export { default as Sidebar } from "./Sidebar";
export { default as SidebarMobile } from "./SidebarMobile";
export { default as SidebarNav } from "./SidebarNav";
export { default as SidebarNavItem } from "./SidebarNavItem";
export { default as SidebarUserSection } from "./SidebarUserSection";
```

---

### 8. `app/private/layout.tsx` (MODIFICAR)

> Reemplazar el contenido actual por este:

```tsx
import { Sidebar, SidebarMobile } from "@/components/Sidebar";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-base">
      {/* Sidebar móvil (header + drawer) */}
      <SidebarMobile />

      {/* Sidebar desktop */}
      <Sidebar />

      {/* Contenido principal */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
```

---

### 9. Páginas Placeholder

#### `app/private/calendar/page.tsx`

```tsx
const CalendarPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">Calendario</h1>
      <p className="mt-2 text-text-secondary">
        Gestiona tus citas y turnos aquí.
      </p>
    </div>
  );
};

export default CalendarPage;
```

#### `app/private/clients/page.tsx`

```tsx
const ClientsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">Clientes</h1>
      <p className="mt-2 text-text-secondary">
        Administra tu base de clientes.
      </p>
    </div>
  );
};

export default ClientsPage;
```

#### `app/private/services/page.tsx`

```tsx
const ServicesPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-text-primary">Servicios</h1>
      <p className="mt-2 text-text-secondary">
        Configura los servicios que ofreces.
      </p>
    </div>
  );
};

export default ServicesPage;
```

---

## Orden de Implementación Recomendado

1. ✅ Crear `lib/constants/navigation.ts`
2. ✅ Crear carpeta `components/Sidebar/`
3. ✅ Crear `SidebarNavItem.tsx`
4. ✅ Crear `SidebarNav.tsx`
5. ✅ Crear `SidebarUserSection.tsx`
6. ✅ Crear `SidebarMobile.tsx`
7. ✅ Crear `Sidebar.tsx`
8. ✅ Crear `index.ts`
9. ✅ Modificar `app/private/layout.tsx`
10. ✅ Crear páginas placeholder

---

## Notas Importantes

- **`"use client"`**: Solo se necesita en componentes que usan hooks (`useState`, `usePathname`, `useUser`, etc.)
- **`cn()`**: Ya existe en `lib/utils.ts`, úsalo para combinar clases condicionales
- **Lucide React**: Ya está instalado en el proyecto
- **Tailwind**: Los colores `bg-surface`, `text-primary`, etc. ya están definidos en `globals.css`

## Cleanup Opcional

- Puedes eliminar `components/FeaturesNavbar/` ya que no se usará
- El componente `components/Navbar/Navbar.tsx` se puede mantener para páginas públicas si las necesitas en el futuro
