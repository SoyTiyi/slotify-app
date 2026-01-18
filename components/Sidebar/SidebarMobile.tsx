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