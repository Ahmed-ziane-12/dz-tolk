import Image from "next/image";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo_white.svg"
                alt="DZ Tolk"
                width={120}
                height={60}
                className="h-9 w-auto"
              />
            </Link>
            <p className="text-white/60 text-sm max-w-md">
              Your personal AI-powered guide to exploring Algeria&apos;s rich
              heritage, culture, and hidden gems.
            </p>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <Link
                  href="/discover"
                  className="hover:text-gold transition-colors"
                >
                  Discover Algeria
                </Link>
              </li>
              <li>
                <Link
                  href="/discover?tag=heritage"
                  className="hover:text-gold transition-colors"
                >
                  Heritage Sites
                </Link>
              </li>
              <li>
                <Link
                  href="/discover?tag=nature"
                  className="hover:text-gold transition-colors"
                >
                  Nature &amp; Landscapes
                </Link>
              </li>
              <li>
                <Link
                  href="/discover?tag=sahara"
                  className="hover:text-gold transition-colors"
                >
                  Sahara Adventures
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-gold font-semibold mb-4 text-sm uppercase tracking-wider">
              About
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>
                <span className="hover:text-gold transition-colors cursor-pointer">
                  Our Mission
                </span>
              </li>
              <li>
                <span className="hover:text-gold transition-colors cursor-pointer">
                  AI Technology
                </span>
              </li>
              <li>
                <span className="hover:text-gold transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-gold transition-colors cursor-pointer">
                  Contact Us
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          &copy; {new Date().getFullYear()} DZ Tolk. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
