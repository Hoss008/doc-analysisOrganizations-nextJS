"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import { Brain, Home, LogIn, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn } = useUser();
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
        <nav className="md:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-100 text-blue-600 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        {/* {auth} */}
        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <div className="md:flex items-center gap-2">
              <UserButton />
            </div>
          ) : (
            <div className="md:flex items-center gap-2">
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  <LogIn className="w-4 h-4 mr-2" />
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button size="sm">Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
