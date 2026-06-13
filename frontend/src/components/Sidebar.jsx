import {
  LayoutDashboard,
  Upload,
  BarChart3,
  Brain,
  Briefcase,
  FileText,
  GraduationCap,
  Settings,
} from "lucide-react";
import { FileSearch } from "lucide-react";
import { NavLink } from "react-router-dom";
import { MessageSquare } from "lucide-react";

function Sidebar() {
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      path: "/",
    },
    {
      icon: Upload,
      label: "Upload Resume",
      path: "/upload",
    },
    {
      icon: BarChart3,
      label: "ATS Analysis",
      path: "/analysis",
    },
    {
      icon: Brain,
      label: "Skills Intelligence",
      path: "/skills",
    },
    {
      icon: Briefcase,
      label: "Career Recommendations",
      path: "/roles",
    },
    {
      icon: FileSearch,
      label: "JD Match",
      path: "/jd-match",
    },
    {
      icon: FileText,
      label: "Reports",
      path: "/history",
    },
    {
      icon: GraduationCap,
      label: "Learning Roadmap",
      path: "/roadmap",
    },
    {
  icon: MessageSquare,
  label: "AI Career Coach",
  path: "/coach",
},
    {
      icon: Settings,
      label: "Settings",
      path: "/settings",
    },
  ];

  return (
    <div
      className="
        w-64
        min-h-screen
        bg-[#071426]
        border-r
        border-cyan-900
        p-6
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          text-cyan-400
          mb-10
        "
      >
        CareerCopilot AI
      </h1>

      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) =>
                `
                flex
                items-center
                gap-3
                px-4
                py-3
                rounded-xl
                transition
                ${
                  isActive
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-400"
                }
              `
              }
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
