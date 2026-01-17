import { NavItem } from "@/lib/constants/navigation";
import SidebarNavItem from "./SidebarNavItem";

interface Props {
    title?: string;
    items: NavItem[];
    onItemClick?: () => void;
}

const SidebarNav = ({ title, items, onItemClick }: Props) => {
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