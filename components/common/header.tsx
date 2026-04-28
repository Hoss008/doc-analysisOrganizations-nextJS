import Link from "next/link";
import { Home, Users, Brain } from "lucide-react";

export default function Header() {
  const getNavItems = () => {
    const baseItems = [
      { href: "/", label: "Home", icon: <Home className="w-4 h-4" /> },
      {
        href: "/select-org",
        label: "Switch Organization",
        icon: <Users className="w-4 h-4" />,
      },
    ];
    return [...baseItems];
  };
  const navItems = getNavItems();
  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-4">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          <Brain className="w-6 h-6 text-blue-600" />
          DocuAI
        </Link>
        {/* Navigation */}
      </div>
    </header>
  );
}
