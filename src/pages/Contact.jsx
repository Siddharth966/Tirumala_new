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
      sub: 'Mon-Sat 8am to 8pm',
      color: 'text-green-600',
      bg: 'bg-green-100/50'
    },
    {
      icon: Mail,
      title: 'Email Us',
      value: 'info@tirumalaagro.com',
      sub: 'Response within 24 hours',
      color: 'text-orange-600',
      bg: 'bg-orange-100/50'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      value: '123 Agro Tech Park',
      sub: 'Main Road, Tirumala',
      color: 'text-blue-600',
      bg: 'bg-blue-100/50'
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
    <div className="min-h-screen bg-transparent font-sans text-slate-900 pt-12 overflow-hidden">

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-20 sm:pt-24 pb-16 sm:pb-20">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-bold tracking-widest text-green-600 uppercase bg-green-100 border border-green-200 rounded-full"
          >
            Get In Touch
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight px-2"
          >
            Let's Start a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">Conversation</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 px-4"
          >
            Whether you're looking for heavy machinery or have questions about our services, our team is here to help you grow.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">

          {/* Left Column: Contact Methods */}
          <div className="lg:col-span-5 space-y-6">
            {contactMethods.map((method, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.3 }}
                whileHover={{ x: 10, backgroundColor: '#fff' }}
                className="group p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-5">
                  <div className={`w-14 h-14 ${method.bg} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110`}>
                    <method.icon className={`w-7 h-7 ${method.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">{method.title}</p>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">{method.value}</h3>
                    <p className="text-slate-500 text-sm">{method.sub}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Availability Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="p-8 rounded-3xl bg-gradient-to-br from-green-700 to-emerald-800 text-white relative overflow-hidden shadow-2xl shadow-green-900/20"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Clock size={80} strokeWidth={1} />
              </div>
              <h3 className="text-xl font-bold mb-3 relative z-10 text-white">We're Always Ready</h3>
              <p className="text-green-50 mb-6 relative z-10 opacity-90 leading-relaxed">Our field support team is available 24/7 for emergency equipment maintenance and technical assistance.</p>
              <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-md w-fit px-4 py-2 rounded-full border border-white/20">
                <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse shadow-[0_0_10px_#86efac]"></span>
                <span className="text-xs font-bold uppercase tracking-wider">Live Support Active</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 bg-white border border-slate-200 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl shadow-slate-200 relative"
          >
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Send a Message</h2>
              <p className="text-slate-500 text-sm font-medium">Fill out the form below and we will get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4 mb-2 block">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 focus:bg-white outline-none transition-all"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="relative">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4 mb-2 block">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 focus:bg-white outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4 mb-2 block">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 focus:bg-white outline-none transition-all"
                  placeholder="+91 00000 00000"
                />
              </div>

              <div className="relative">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-4 mb-2 block">Your Message</label>
                <textarea
                  rows="4"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 text-slate-900 placeholder-slate-400 focus:ring-4 focus:ring-green-500/10 focus:border-green-600 focus:bg-white outline-none transition-all resize-none"
                  placeholder="How can we help your farm today?"
                ></textarea>
              </div>

              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#065f46' }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`w-full group bg-green-700 text-white font-bold py-5 rounded-2xl transition-all shadow-xl shadow-green-900/20 flex justify-center items-center overflow-hidden ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="relative z-10 flex items-center">
                  {loading ? 'Sending...' : 'Send Message'} <Send className={`ml-3 h-5 w-5 ${loading ? 'animate-pulse' : 'group-hover:translate-x-1 group-hover:-translate-y-1'} transition-transform`} />
                </span>
              </motion.button>
            </form>
          </motion.div>

        </div>

        {/* Floating Map/Location Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 rounded-[3rem] overflow-hidden border border-slate-200 bg-white p-4 shadow-2xl"
        >
          <div className="relative h-96 w-full rounded-[2.5rem] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1524660988544-2749c7f1aeba?q=80&w=2670&auto=format&fit=crop"
              className="w-full h-full object-cover grayscale opacity-20"
              alt="Map view"
            />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl shadow-green-500/50">
                <MapPin className="text-white h-8 w-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Our Central Hub</h3>
              <p className="text-slate-600 max-w-md font-medium">Coordination center for all our field operations across the region.</p>
              <button className="mt-6 flex items-center text-green-700 font-bold hover:text-green-800 transition-colors">
                Get Directions <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <SuccessModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Message Sent Successfully!"
        message="Thank you for reaching out! Our team will get back to you within 24 hours to assist with your agricultural needs."
      />

      {/* Trust Quote */}
      <div className="border-t border-slate-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-400 font-bold italic uppercase tracking-widest text-xs">
            "Communication is the first step towards a successful harvest."
          </p>
        </div>
      </div>

    </div>
  );
};

export default Contact;
