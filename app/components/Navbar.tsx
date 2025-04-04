'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="w-full bg-gradient-to-r from-primary to-[#00d68f] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">Match Play</span>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink href="/profile" isActive={isActive('/profile')}>
              Profile
            </NavLink>
            <NavLink href="/golf-courses" isActive={isActive('/golf-courses')}>
              Golf Courses
            </NavLink>
            <NavLink href="/friends" isActive={isActive('/friends')}>
              Friends
            </NavLink>
            <NavLink href="/book-tee-time" isActive={isActive('/book-tee-time')}>
              Your Tee Times
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({
  href,
  isActive,
  children
}: {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors
        ${isActive
          ? 'bg-white/20 text-white'
          : 'text-white/80 hover:bg-white/10 hover:text-white'
        }`}
    >
      {children}
    </Link>
  );
}
