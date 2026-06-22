"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Languages, LogIn, Menu, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

const locales = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "ar", label: "AR", name: "العربية" },
  { code: "ar-dz", label: "AR-DZ", name: "الدارجة" },
];

export default function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const current = locales.find((l) => l.code === currentLocale) ?? locales[0];

  useEffect(() => {
    setIsScrolled(window.scrollY > 100);
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/discover", label: t("discover") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0 md:me-28">
            <Image
              src="/logo.svg"
              alt="DZ Tolk"
              width={100}
              height={50}
              className="h-9 w-auto"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8 me-auto">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-bold transition-colors ${
                    isActive
                      ? "text-gold"
                      : "text-foreground/80 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-foreground/80 hover:text-foreground rounded-lg hover:bg-white/10 transition-colors"
              >
                <Languages size={18} />
                <span className="hidden sm:inline">{current.label}</span>
              </button>

              {open && (
                <div className="absolute end-0 mt-2 w-40 rounded-xl bg-white shadow-lg border border-zinc-200 py-1 overflow-hidden">
                  {locales.map((loc) => (
                    <Link
                      key={loc.code}
                      href={pathname}
                      locale={loc.code}
                      onClick={() => setOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                        loc.code === currentLocale
                          ? "bg-primary/10 text-primary font-semibold"
                          : "text-zinc-700 hover:bg-zinc-50"
                      }`}
                    >
                      <span
                        className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                          loc.code === currentLocale
                            ? "bg-primary text-white"
                            : "bg-zinc-100 text-zinc-500"
                        }`}
                      >
                        {loc.label}
                      </span>
                      <span>{loc.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/login"
              className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-primary hover:bg-primary-light rounded-xl transition-colors"
            >
              <LogIn size={16} />
              {t("login")}
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-foreground/80 hover:text-foreground rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-64" : "max-h-0"
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md border-t border-zinc-200 px-4 py-3 space-y-2">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-lg text-sm font-bold transition-colors ${
                  isActive
                    ? "text-gold bg-gold/5"
                    : "text-zinc-700 hover:bg-zinc-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-primary-light transition-colors mt-2"
          >
            <LogIn size={16} />
            {t("login")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
