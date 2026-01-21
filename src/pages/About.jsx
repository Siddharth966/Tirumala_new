import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 pt-12">
      {/* Hero Section */}
      <section className="relative pt-40 pb-24 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-slate-900/90 z-10"></div>
          <img src="/images/about_hero.png" alt="Team" className="w-full h-full object-cover opacity-30" />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Cultivating the Future of Agriculture</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              We are bridging the gap between traditional farming and modern technology, ensuring every farmer has the access to prosperity they deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
                <img src="/images/about_hero.png" alt="Our Team" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-10 -right-10 bg-green-700 text-white p-8 rounded-2xl shadow-xl hidden md:block">
                <p className="text-4xl font-bold">5+</p>
                <p className="text-sm font-medium tracking-wider uppercase">Years of Impact</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-sm font-bold text-green-700 tracking-widest uppercase mb-2">Our Mission</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900">Democratizing Farm Tech</h3>
              </div>

              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Tirumala Agro began in 2020 with a singular vision: to dismantle the financial barriers preventing small-scale farmers from accessing high-efficiency machinery.
                </p>
                <p>
                  Today, we stand as a trusted partner to over 500 farmers, providing on-demand access to state-of-the-art tractors, harvesters, and precision implements. We don't just rent machines; we deliver productivity.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="border-l-4 border-green-600 pl-6">
                  <span className="block text-4xl font-bold text-gray-900 mb-1">500+</span>
                  <span className="text-base text-gray-500 font-medium">Farmers Empowered</span>
                </div>
                <div className="border-l-4 border-green-600 pl-6">
                  <span className="block text-4xl font-bold text-gray-900 mb-1">50+</span>
                  <span className="text-base text-gray-500 font-medium">Premium Machines</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Core Values Driving Us</h2>
            <p className="mt-4 text-gray-600">The principles that guide every interaction and service we provide.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Accessibility', desc: 'Quality equipment should be within reach for all, regardless of farm size.' },
              { title: 'Integrity', desc: 'Transparent pricing with no hidden costs. We build trust through honesty.' },
              { title: 'Innovation', desc: 'Constantly upgrading our fleet to bring the latest agri-tech to your fields.' }
            ].map((item, i) => (
              <div key={i} className="p-8 bg-gray-50 rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
