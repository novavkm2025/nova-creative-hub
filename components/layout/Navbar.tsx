"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

const links = [
  { name: "Home", href: "/" },
  { name: "Services", href: "#services" },
  { name: "Invitations", href: "/invitations" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto mt-6 flex h-16 w-[92%] max-w-7xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-6 backdrop-blur-xl">
        <Link
          href="/"
          className="text-xl font-black tracking-[0.35em] text-white"
        >
          NOVA
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm text-white/70 transition hover:text-cyan-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <button className="hidden rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-600 px-5 py-2 text-sm font-semibold text-white transition duration-300 hover:scale-105 lg:block">
          Get Quote
        </button>

        <button className="lg:hidden">
          <Menu className="text-white" />
        </button>
      </div>
    </header>
  );
}