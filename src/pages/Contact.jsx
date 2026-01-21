import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Get in Touch</h1>
            <p className="text-lg text-gray-600 mb-10">
              Have questions about our equipment or want to book a rental? Reach out to us directly or fill the form.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-5">
                <div className="bg-green-50 p-3 rounded-xl text-green-700 border border-green-100">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Phone</h3>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-sm text-gray-500 mt-1">Mon-Sat 8am to 8pm</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-green-100 p-3 rounded-xl text-green-700">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Email</h3>
                  <p className="text-gray-600">info@tirumalaagro.com</p>
                  <p className="text-sm text-gray-500 mt-1">We rely within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-5">
                <div className="bg-green-100 p-3 rounded-xl text-green-700">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Office</h3>
                  <p className="text-gray-600">123 Agro Tech Park, Main Road,<br />Tirumala, Andhra Pradesh.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gray-50 p-8 rounded-3xl shadow-lg border border-gray-100"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                <textarea rows="4" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all" placeholder="Tell us what you need..."></textarea>
              </div>
              <button type="button" className="w-full bg-green-700 text-white font-bold py-4 rounded-xl hover:bg-green-800 transition-colors shadow-lg flex justify-center items-center">
                Send Message <Send className="ml-2 h-5 w-5" />
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
