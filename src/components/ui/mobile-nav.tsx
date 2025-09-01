import { Home, PlusCircle, List, BarChart3, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: Home, label: "Inicio", href: "/" },
  { icon: PlusCircle, label: "Agregar", href: "/add-expense" },
  { icon: List, label: "Gastos", href: "/expenses" },
  { icon: BarChart3, label: "Reportes", href: "/reports" },
  { icon: User, label: "Perfil", href: "/profile" },
];

export function MobileNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center justify-center p-2 rounded-lg transition-colors min-w-0 flex-1",
                isActive
                  ? "text-primary bg-primary-light"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span className="text-xs font-medium truncate">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}