"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { LogOut, User } from "lucide-react";

interface Props {
  onLogout: () => void;
}

const SidebarUserSection = ({ onLogout }: Props) => {
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
