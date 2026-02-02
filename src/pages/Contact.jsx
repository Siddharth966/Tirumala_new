import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock, ArrowRight } from 'lucide-react';
import axios from 'axios';
import SuccessModal from '../components/SuccessModal';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const contactMethods = [
    {
      icon: Phone,
      title: 'Call Us',
      value: '+91 98765 43210',
      sub: 'Mon-Sat · 8am - 8pm',
      color: 'text-green-700',
      bg: 'bg-green-100'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@tirumalaagro.com',
      sub: 'Replies within 24 hours',
      color: 'text-orange-700',
      bg: 'bg-orange-100'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: '123 Agro Tech Park',
      sub: 'Main Road · Tirumala',
      color: 'text-blue-700',
      bg: 'bg-blue-100'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contacts', formData);
      setShowModal(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      alert('Error sending message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 font-sans text-slate-900 pt-20 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-20">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-5 py-2 mb-6 text-sm font-bold tracking-wide text-green-700 uppercase bg-green-200/60 border border-green-300 rounded-full"
          >
            Contact Us
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold text-slate-900 leading-tight"
          >
            We’re Here to  
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
              Assist & Support You
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-slate-600 mt-6"
          >
            Whether you need equipment guidance or want expert help, our team is always ready.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* CONTACT METHODS (LEFT SIDE) */}
          <div className="lg:col-span-5 space-y-6">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ x: 10, boxShadow: "0 10px 30px rgba(0, 128, 0, 0.15)" }}
                className="group p-6 rounded-2xl bg-white border border-green-100 hover:border-green-300 shadow-md hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-5">
                  <div className={`w-14 h-14 ${method.bg} rounded-xl flex items-center justify-center ring-1 ring-white shadow-inner`}>
                    <method.icon className={`w-7 h-7 ${method.color}`} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{method.title}</p>
                    <h3 className="text-xl font-bold text-slate-900">{method.value}</h3>
                    <p className="text-slate-600 text-sm">{method.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 24/7 SUPPORT CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-green-700 to-emerald-700 text-white relative shadow-xl"
            >
              <div className="absolute top-0 right-0 opacity-20">
                <Clock size={90} />
              </div>
              <h3 className="text-2xl font-bold mb-3">24/7 Live Support</h3>
              <p className="text-green-100 leading-relaxed mb-6">
                Our field team is always available for emergency breakdowns and technical help.
              </p>

              <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full border border-white/30 backdrop-blur-md">
                <span className="w-3 h-3 bg-green-300 rounded-full animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-widest">Active Now</span>
              </div>
            </motion.div>
          </div>

          {/* FORM SECTION (RIGHT SIDE) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 bg-white border border-green-200 rounded-3xl p-10 shadow-xl"
          >
            <h2 className="text-3xl font-extrabold text-green-800 mb-4">Send a Message</h2>
            <p className="text-slate-600 mb-10">Fill the details below and our team will respond shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* NAME + EMAIL INPUTS */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-6 py-4 rounded-xl bg-green-50 border border-green-200 focus:ring-4 focus:ring-green-300/40 focus:border-green-600 outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full px-6 py-4 rounded-xl bg-green-50 border border-green-200 focus:ring-4 focus:ring-green-300/40 focus:border-green-600 outline-none"
                  />
                </div>
              </div>

              {/* PHONE INPUT */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                  className="w-full px-6 py-4 rounded-xl bg-green-50 border border-green-200 focus:ring-4 focus:ring-green-300/40 focus:border-green-600 outline-none"
                />
              </div>

              {/* MESSAGE INPUT */}
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help your farm today?"
                  className="w-full px-6 py-4 rounded-xl bg-green-50 border border-green-200 focus:ring-4 focus:ring-green-300/40 focus:border-green-600 outline-none resize-none"
                ></textarea>
              </div>

              {/* SUBMIT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={loading}
                className={`w-full bg-green-700 text-white font-bold py-5 rounded-xl shadow-lg hover:bg-green-800 transition-all ${
                  loading && 'opacity-60 cursor-not-allowed'
                }`}
              >
                {loading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* MAP SECTION */}
        <div className="mt-24 rounded-[3rem] border border-green-200 bg-white p-6 shadow-xl">
          <div className="relative h-96 w-full rounded-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524660988544-2749c7f1aeba?q=80"
              className="w-full h-full object-cover opacity-30 grayscale"
              alt="map"
            />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-sm"></div>

            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900">Our Central Hub</h3>
              <p className="text-slate-600 mt-2 max-w-lg">
                Coordination center for machinery dispatch and field operations.
              </p>

              <button className="mt-6 flex items-center text-green-700 font-bold hover:text-green-800 transition">
                Get Directions <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* SUCCESS MODAL */}
      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Message Sent Successfully!"
        message="Thank you for reaching out! Our team will get back to you within 24 hours."
      />

      {/* QUOTE */}
      <div className="py-12 bg-white border-t border-green-200">
        <p className="text-center text-green-700 font-medium italic tracking-wide">
          “Every conversation brings us closer to a better harvest.”
        </p>
      </div>
    </div>
  );
};

export default Contact;
