import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Shield, Star, ChevronRight, MessageCircle, Tractor, Calendar, Key } from 'lucide-react';
import { Link } from 'react-router-dom';


import { Rocket, Workflow } from "lucide-react";

const featuredProducts = [
  {
    id: 1,
    name: 'John Deere 5310',
    category: 'Tractor',
    price: '₹800/hr',
    image: '/images/prod_tractor.png'
  },
  {
    id: 2,
    name: 'Paddy Harvester',
    category: 'Harvester',
    price: '₹2500/hr',
    image: '/images/prod_harvester.png'
  },
  {
    id: 3,
    name: 'Rotavator 6ft',
    category: 'Implements',
    price: '₹300/hr',
    image: '/images/prod_rotavator.png'
  },
];

const testimonials = [
  { id: 1, name: "Ramakrishna Reddy", role: "Farmer, Guntur", text: "Tirumala Agro's service is impeccable. The harvester was in excellent condition and saved me significant time during peak labor shortage." },
  { id: 2, name: "Suresh Babu", role: "Organic Cultivator", text: "Professional team and reasonable rates. I rely on their tractors for all my seasonal plowing needs. Highly recommended." },
];

const slides = [
  {
    id: 1,
    image: '/images/image.png',
    badge: 'The Future of Smart Farming',
    title: 'Modern Agriculture,',
    hightlight: 'Delivered.',
    desc: 'Access premium agricultural machinery without the ownership costs. We provide efficient, high-performance equipment to help you harvest more.'
  },
  {
    id: 2,
    image: '/images/hero_drone.png',
    badge: 'Precision Tech',
    title: 'Aerial Efficiency,',
    hightlight: 'Unleashed.',
    desc: 'Utilize advanced drone technology for precision spraying and crop monitoring. Save time and resources with our tech-forward rental fleet.'
  },
  {
    id: 3,
    image: '/images/about_hero.png',
    badge: 'Community First',
    title: 'Empowering Farmers,',
    hightlight: 'Together.',
    desc: 'Join a network of over 500+ successful farmers who trust Tirumala Agro for their daily machinery needs. Reliability you can count on.'
  }
];
const steps = [
  {
    id: 1,
    icon: <Workflow size={40} />,
    title: "Plan & Discover",
    desc: "Understand requirements, gather insights, and identify the best solution approach for your operations.",
  },
  {
    id: 2,
    icon: <Rocket size={40} />,
    title: "Build & Integrate",
    desc: "We design, develop, and integrate features with clean architecture and reliable performance.",
  },
  {
    id: 3,
    icon: <CheckCircle size={40} />,
    title: "Deploy & Optimize",
    desc: "Monitor performance, optimize workflows, and ensure a smooth experience for all users.",
  },
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="font-sans antialiased text-gray-500 pt-12">

      {/* Hero Section */}
      <div className="relative h-[108dvh] min-h-[600px] w-full flex items-center overflow-hidden bg-slate-900">

        {/* Slider Backgrounds */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
              style={{ backgroundImage: `url('${slides[currentSlide].image}')` }}
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full pt-20">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center px-4 py-1.5 sm:py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white/90 text-xs sm:text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              {slides[currentSlide].badge}
            </div>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 tracking-tight">
              {slides[currentSlide].title} <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-200">
                {slides[currentSlide].hightlight}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 sm:mb-10 leading-relaxed max-w-2xl px-1">
              {slides[currentSlide].desc}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 pb-12 sm:pb-0">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-green-700 rounded-lg hover:bg-green-600 transition-all shadow-lg hover:shadow-green-900/20"
              >
                View Equipment <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white border border-white/30 bg-white/5 backdrop-blur-sm rounded-lg hover:bg-white hover:text-green-900 transition-all"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>

          {/* Slider Controls */}
          <div className="absolute bottom-6 sm:bottom-10 right-6 sm:right-10 flex space-x-3 sm:space-x-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-green-500 w-6 sm:w-8' : 'bg-white/50 hover:bg-white'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section - Clean & Professional */}
      <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">Why Industry Leaders Choose Us</h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed md:px-0 px-2">
              We combine technology with reliability to offer a rental experience that maximizes your farm's productivity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'Premium Quality Assurance', desc: 'Every machine undergoes rigorous inspection before delivery to ensure zero downtime.' },
              { icon: Clock, title: 'Flexible Rental Terms', desc: 'Pay only for what you use. Hourly, daily, and seasonal packages designed for your budget.' },
              { icon: CheckCircle, title: 'Expert Operational Support', desc: 'Get on-field training and 24/7 technical support from our certified agri-machinery experts.' }
            ].map((feature, idx) => (
              <div key={idx} className="group p-8 rounded-2xl bg-gray-50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors duration-300">
                  <feature.icon className="h-7 w-7 text-green-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>






      <section className="py-16 sm:py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_2px_2px,white_1px,transparent_0)] bg-[length:24px_24px] sm:bg-[length:40px_40px]"></div>

        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 border-b border-gray-700 pb-8"
          >
            <div className="max-w-2xl">
              <span className="text-orange-400 font-bold tracking-wider uppercase text-sm">Our Process</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-green-400">Simplify Your Operations</h2>
              <p className="text-gray-300 mt-3">A smooth, structured workflow designed to give you efficiency, speed, and high-quality output.</p>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-16 left-32 right-32 h-0.5 bg-green-500/40 z-0"></div>

            {steps.map((step, idx) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative z-10 text-center"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-tr from-green-500 to-orange-400 rounded-full border-4 border-orange-300 flex items-center justify-center text-white mb-6 sm:mb-8 mx-auto shadow-lg"
                >
                  {React.cloneElement(step.icon, { size: 32, className: "sm:w-10 sm:h-10" })}
                </motion.div>
                <h3 className="text-xl font-bold text-green-300 mb-3">{step.title}</h3>
                <p className="text-gray-400 px-2 sm:px-4 text-sm sm:text-base">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Featured Machinery */}
      <section className="py-16 sm:py-24 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 sm:mb-12">
            <div className="mb-6 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Machinery</h2>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">Top-rated equipment available for immediate booking</p>
            </div>
            <Link to="/products" className="hidden sm:flex items-center px-6 py-3 bg-white border border-gray-200 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
              View Catalog <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-gray-100">
                <div className="aspect-[4/3] bg-gray-50 relative p-8 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-800 uppercase tracking-wider shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight">{product.name}</h3>
                    <span className="text-lg font-bold text-green-700 whitespace-nowrap">{product.price}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="block w-full py-3 text-center border-t border-gray-100 text-gray-600 font-medium hover:text-green-700 hover:bg-green-50 transition-colors mt-4"
                  >
                    Check Availability
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link to="/products" className="inline-flex items-center w-full justify-center px-6 py-4 bg-slate-900 text-white rounded-lg font-bold transition-all shadow-lg">
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonial Section - Minimalist */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <span className="text-green-600 font-bold tracking-wider uppercase text-xs sm:text-sm mb-2 block">Testimonials</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight">Trusted by Farmers Across the Region</h2>
              <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
                We take pride in being the backbone of successful harvests. Hear from the community we serve.
              </p>
              <Link to="/about" className="text-green-700 font-bold hover:text-green-800 inline-flex items-center transition-all group">
                Read Success Stories <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="p-6 bg-gray-50 rounded-xl border border-gray-100 relative">
                  <div className="flex text-yellow-400 mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{t.text}"</p>
                  <div>
                    <h4 className="font-bold text-gray-900">{t.name}</h4>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Final Push */}
      <section className="py-16 sm:py-20 px-6 sm:px-8 bg-green-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">Ready to Modernize Your Harvest?</h2>
          <p className="text-lg sm:text-xl text-green-50 mb-10 max-w-2xl mx-auto">
            Join the network of progressive farmers. Rent top-tier equipment today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-10 py-4 bg-white text-green-900 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg shadow-green-900/40">
              Get Started Now
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
