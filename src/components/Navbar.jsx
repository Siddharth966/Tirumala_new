import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Login', path: '/login' },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-green-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src="/images/logo.png"
              alt="Tirumala Agro"
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
            <span className="font-bold text-2xl tracking-tight text-green-900">
              Tirumala Agro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`
                    px-4 py-2 rounded-md text-sm font-medium transition-all
                    ${location.pathname === link.path
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'text-green-700 hover:bg-green-50 hover:text-green-900'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-green-100 transition-all"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-green-900" />
              ) : (
                <Menu className="h-6 w-6 text-green-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-green-50 shadow-inner border-t border-green-100"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    block px-4 py-3 rounded-md text-base font-medium
                    ${location.pathname === link.path
                      ? 'bg-green-200 text-green-900'
                      : 'text-green-800 hover:bg-green-100'
                    }
                  `}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
