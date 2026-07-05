import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Menu, X, Facebook, Instagram } from "lucide-react";

export default function Layout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Reservations", path: "/reservations" },
    { name: "About", path: "/about" },
    { name: "Events", path: "/events" },
    { name: "Catering", path: "/catering" },
    { name: "Gallery", path: "/gallery" },
    { name: "Blogs", path: "/blogs" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream text-brand-dark font-sans relative">
      {/* Navbar overlay */}
      <header
        className={`absolute top-0 left-0 w-full z-50 px-5 pt-6 sm:px-6 sm:pt-8 md:px-8 md:pt-8 flex justify-between items-center transition-colors duration-300`}
      >
        <Link 
            to="/" 
            className="block w-40 h-10 md:h-12 relative mt-2 md:mt-0"
        >
          {/* We use a text-based logo matching the requested gold logo */}
          <div className={`absolute top-0 left-0 flex flex-col origin-top-left scale-[0.8] sm:scale-100 ${isHome ? 'text-white' : 'text-brand-gold'}`}>
            <div className="font-serif text-[18px] sm:text-[21px] leading-none absolute -top-[12px] sm:-top-[14px] left-0.5 tracking-wider">THE</div>
            <div className="font-serif text-[38px] sm:text-[45px] leading-none tracking-tight flex items-start">
              <span className="pr-1">T</span>
              <span className="pr-1">A</span>
              <span className="relative">
                J
                <div className="absolute top-1 -right-3 sm:-right-4 w-3 sm:w-4 h-3 sm:h-4 border border-current rounded-full flex items-center justify-center opacity-80">
                  <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 border border-current rounded-full"></div>
                </div>
              </span>
            </div>
            <div className="relative mt-1">
              <div className="absolute top-0 left-0 w-[78%] h-[1px] bg-current"></div>
              <div className="pt-1.5">
                <span className="font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.28em] whitespace-nowrap font-bold">Multicuisine Restaurant</span>
              </div>
            </div>
          </div>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4 relative z-[60]">
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center transition-colors ${isHome ? 'border-white text-white hover:bg-white hover:text-brand-dark backdrop-blur-sm bg-white/10' : 'border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-cream'}`}
            >
                {mobileMenuOpen ? <X size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Menu size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </button>
            <Link 
                to="/reservations" 
                className={`hidden md:block px-6 py-2.5 rounded-full border text-xs font-bold uppercase tracking-widest transition-colors ${isHome ? 'border-white text-white hover:bg-white hover:text-brand-dark backdrop-blur-sm bg-white/10' : 'border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-brand-cream'}`}
            >
                Reservation
            </Link>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`absolute top-full right-4 sm:right-6 md:right-10 w-56 sm:w-64 bg-brand-cream shadow-2xl p-6 rounded-xl border border-brand-dark/10 transition-all duration-300 origin-top-right z-[100] ${mobileMenuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'}`}>
            <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                    <Link 
                        key={link.name} 
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-sm font-bold uppercase tracking-wider text-brand-dark hover:text-brand-dark/50 transition-colors block py-1"
                    >
                        {link.name}
                    </Link>
                ))}
            </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-dark/20 mx-5 sm:mx-6 md:mx-8 py-12 text-brand-dark mt-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
                <Link to="/" className="flex flex-col items-start mb-8">
                  <div className="relative flex flex-col text-brand-gold scale-75 origin-left">
                    <div className="font-serif text-2xl leading-none absolute -top-4 left-0.5 tracking-wider">THE</div>
                    <div className="font-serif text-6xl leading-none tracking-tight flex items-start">
                      <span className="pr-1">T</span>
                      <span className="pr-1">A</span>
                      <span className="relative">
                        J
                        <div className="absolute top-1 -right-4 w-5 h-5 border border-current rounded-full flex items-center justify-center opacity-80">
                          <div className="w-3 h-3 border border-current rounded-full"></div>
                        </div>
                      </span>
                    </div>
                    <div className="relative mt-2">
                      <div className="absolute top-0 left-0 w-[76%] h-[1.5px] bg-current"></div>
                      <div className="pt-1.5">
                        <span className="font-sans text-[8px] uppercase tracking-[0.28em] whitespace-nowrap font-bold">Multicuisine Restaurant</span>
                      </div>
                    </div>
                  </div>
                </Link>
                <p className="text-xs font-sans text-brand-dark/60 max-w-sm leading-relaxed">
                  Experience a refined journey through global cuisines, curated by Master Chefs in a luxury setting.
                </p>
            </div>
            
            <div className="flex flex-col gap-3">
                {navLinks.slice(0, 5).map((link) => (
                    <Link key={link.name} to={link.path} className="text-xs font-bold uppercase tracking-wider hover:opacity-50 transition-opacity">
                        {link.name}
                    </Link>
                ))}
            </div>
            <div className="flex flex-col gap-3">
                {navLinks.slice(5).map((link) => (
                    <Link key={link.name} to={link.path} className="text-xs font-bold uppercase tracking-wider hover:opacity-50 transition-opacity">
                        {link.name}
                    </Link>
                ))}
            </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest opacity-50 pt-8 border-t border-brand-dark/10">
            <p>&copy; {new Date().getFullYear()} All Rights Reserved</p>
            <div className="flex space-x-4 mt-4 md:mt-0 text-brand-dark">
                <p>Park Avenue, 80146 NY, USA</p>
                <a href="#" className="hover:opacity-100 transition-opacity ml-4"><Facebook size={16} /></a>
                <a href="#" className="hover:opacity-100 transition-opacity"><Instagram size={16} /></a>
            </div>
        </div>
      </footer>
    </div>
  );
}
