import { mainNavItems, systemNavItems } from "@/lib/constants/navigation";
import SidebarNav from "./SidebarNav";
import SidebarUserSection from "./SidebarUserSection";

const Sidebar = () => {
  return (
    <aside className="hidden md:flex flex-col w-64 h-screen bg-surface border-r border-border">
      <div className="p-6 border-b border-border">
        <span className="text-xl font-bold text-primary">Slotify</span>
      </div>

      <div className="flex-1 py-4 overflow-y-auto">
        <SidebarNav title="Menú Principal" items={mainNavItems} />
        <div className="my-4" />
        <SidebarNav title="Sistema" items={systemNavItems} />
      </div>

      <SidebarUserSection onLogout={() => console.log("logout")}/>
    </aside>
  );
};

export default Sidebar;