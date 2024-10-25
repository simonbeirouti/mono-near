import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from "@/src/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { NearWalletConnector } from "@/src/components/near-wallet";

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];


const NavBar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-2">
      <div className="text-lg font-semibold">
        <Link href="/">CUBED</Link>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center space-x-4 text-center">
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className="text-foreground hover:text-primary">
            {label}
          </Link>
        ))}
        <NearWalletConnector />
      </div>
      
      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="sm:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="top" className="w-full">
          <nav className="flex flex-col space-y-4 text-center">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} className="text-foreground hover:text-primary">
                {label}
              </Link>
            ))}
            <NearWalletConnector />
          </nav>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default NavBar;
