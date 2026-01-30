import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const footerLinks = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
  { name: "About Us", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-black text-gray-300 border-t border-white/10 relative overflow-hidden">
      {/* Animated background overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:30px_30px]"></div>

      <div className="max-w-7xl mx-auto px-4 py-14 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <img src="/images/logo.png" alt="Tirumala Agro" className="h-12 w-auto object-contain" />
              <h3 className="text-2xl font-bold text-green-400">Tirumala Agro</h3>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Modern agricultural machinery on rent to make farming easier, faster, and more productive.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-5 pt-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  whileHover={{ scale: 1.15 }}
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  <Icon className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link, idx) => (
                <motion.li key={idx} whileHover={{ x: 6 }}>
                  <Link to={link.path} className="hover:text-white transition-colors text-gray-400">
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3">
                <MapPin className="h-6 w-6 text-green-400 mt-1 flex-shrink-0" />
                <span>123 Agro Tech Park, Main Road, Tirumala</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span>info@tirumalaagro.com</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-700/50 mt-12 pt-6 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Tirumala Agro. All rights reserved.</p>
          <p>
            Designed & developed by Guru Software Solutions
          </p>
        </div>
      </div>
    </footer>
  );
}
