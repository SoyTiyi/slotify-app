import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  href: string;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
}

const SidebarNavItem = ({ href, label, icon: Icon, onClick }: Props) => {
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
          : "text-text-secondary hover:bg-surface-2 hover:text-text-primary",
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="font-medium">{label}</span>
    </Link>
  );
};
