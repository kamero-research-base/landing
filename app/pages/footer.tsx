import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Links */}
        <nav className="flex flex-wrap justify-center gap-6 text-sm mb-6">
          <Link href="/about" className="text-slate-400 hover:text-black/70 transition-colors">
            About
          </Link>
          <Link href="/contact-us" className="text-slate-400 hover:text-black/70 transition-colors">
            Contact
          </Link>
          <Link href="/~/help" className="text-slate-400 hover:text-black/70 transition-colors">
            Documentation
          </Link>
          <Link href="/~/privacy" className="text-slate-400 hover:text-black/70 transition-colors">
            Privacy
          </Link>
          <Link href="/~/terms_of_services" className="text-slate-400 hover:text-black/70 transition-colors">
            Terms
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-sm text-slate-500 text-center">
          Kamero &copy; {currentYear}. All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;