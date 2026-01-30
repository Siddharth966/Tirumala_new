import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Users, Award, Sprout, Tractor, Heart, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { id: 1, label: 'Farmers Empowered', value: '500+', icon: Users },
  { id: 2, label: 'Quality Machines', value: '50+', icon: Tractor },
  { id: 3, label: 'Hours of Service', value: '10,000+', icon: Award },
  { id: 4, label: 'Villages Covered', value: '25+', icon: Sprout },
];

const values = [
  {
    title: 'Accessibility',
    desc: 'Making premium machinery affordable and available to small-scale farmers across the region.',
    icon: Heart,
    color: 'text-rose-600',
    bg: 'bg-rose-100/50'
  },
  {
    title: 'Innovation',
    desc: 'Continuously upgrading our fleet with the latest IoT-enabled smart farming machinery.',
    icon: Sprout,
    color: 'text-green-600',
    bg: 'bg-green-100/50'
  },
  {
    title: 'Reliability',
    desc: 'Ensuring 100% equipment uptime with 24/7 on-field maintenance and expert support.',
    icon: CheckCircle2,
    color: 'text-orange-600',
    bg: 'bg-orange-100/50'
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-transparent font-sans text-slate-900 pt-12 overflow-hidden">

      {/* Dynamic Hero Section - Light & Modern */}
      <section className="relative min-h-[60dvh] flex items-center justify-center overflow-hidden py-12 sm:py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 text-center pt-12 sm:pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs sm:text-sm font-bold tracking-widest text-green-600 uppercase bg-green-100 border border-green-200 rounded-full">
              Our Journey
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 mb-6 sm:mb-8 tracking-tight leading-tight">
              Empowering the <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Roots of Prosperity
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium px-2">
              Tirumala Agro isn't just a rental service. We are a partner in every farmer's quest for excellence, providing the tools that turn hard work into high yields.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section - Floating Cards */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] shadow-xl shadow-slate-200 border border-slate-100 text-center"
            >
              <div className="flex justify-center mb-4 text-green-600">
                <stat.icon size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Narrative Section - The Why */}
      <section className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-50">
                <img
                  src="/images/about_hero.png"
                  alt="Farmer using machinery"
                  className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent"></div>
              </div>

              <div className="relative -mt-12 mx-4 sm:absolute sm:bottom-6 sm:left-6 sm:right-6 p-5 sm:p-6 bg-white/95 sm:bg-white/90 backdrop-blur-xl rounded-[1.5rem] sm:rounded-[2rem] border border-white shadow-xl z-20">
                <p className="text-slate-800 font-bold italic text-sm sm:text-base leading-snug">
                  "Our goal is to ensure that no farmer is left behind because they couldn't afford the right machine."
                </p>
                <div className="flex items-center mt-4">
                  <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">TA</div>
                  <p className="text-green-700 text-sm ml-3 font-bold uppercase tracking-widest">Founder's Vision</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6 sm:space-y-8 mt-12 lg:mt-0"
            >
              <div>
                <span className="text-orange-600 font-extrabold uppercase tracking-widest text-[10px] sm:text-xs">Our Story</span>
                <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-2 mb-4 sm:mb-6 leading-tight">
                  Democratizing High-Tech <br className="hidden sm:block" />
                  <span className="text-green-600">Agriculture for Everyone</span>
                </h2>
                <div className="space-y-4 sm:space-y-6 text-slate-500 text-base sm:text-lg leading-relaxed font-normal">
                  <p>
                    Founded in 2020, Tirumala Agro emerged from a simple observation: the latest farming technology was reserved for those who could afford the massive capital expenditure. We saw an opportunity to bridge this gap.
                  </p>
                  <p>
                    By building a robust network of high-performance machinery and a seamless rental process, we've enabled farmers to increase their efficiency by up to 40% while significantly reducing labor costs.
                  </p>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center px-10 py-5 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                >
                  Explore Our Fleet
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 sm:py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 sm:p-10 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-600 group-hover:text-white transition-all shadow-inner">
                <Target size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Our Mission</h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                To simplify farming operations through professional equipment rental, ensuring reliability, speed, and affordability for every acre of land we serve.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -10 }}
              className="p-8 sm:p-10 bg-white rounded-[2rem] sm:rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group"
            >
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-orange-600 group-hover:text-white transition-all shadow-inner">
                <Eye size={32} />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 mb-4">Our Vision</h3>
              <p className="text-slate-500 text-lg leading-relaxed font-medium">
                To be the foundation of a modern agricultural ecosystem where every farmer has the digital and mechanical tools to thrive in a global economy.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values Section - NOW LIGHT THEMED */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span className="text-orange-600 font-bold uppercase tracking-widest text-xs">Our Values</motion.span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mt-2 mb-4">Values that Cultivate Trust</h2>
            <p className="text-slate-500 text-lg font-medium">We operate on the principles of transparency and farmer-centric service.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-slate-50 border border-slate-200 hover:bg-white hover:shadow-2xl hover:border-transparent transition-all group"
              >
                <div className={`w-14 h-14 ${v.bg} rounded-2xl flex items-center justify-center mb-8 shadow-inner`}>
                  <v.icon className={`h-7 w-7 ${v.color}`} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 px-6 sm:px-8 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="max-w-6xl mx-auto bg-green-700 rounded-[2.5rem] sm:rounded-[3rem] p-10 sm:p-16 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-green-900/20"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="relative z-10 text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight">Ready to grow your productivity?</h2>
            <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-12 max-w-2xl mx-auto font-medium">Join over 500+ successful farmers who rely on Tirumala Agro for their machinery needs.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/products"
                className="px-10 py-5 bg-white text-green-800 font-extrabold rounded-2xl hover:bg-green-50 transition-all shadow-xl"
              >
                Browse Equipment
              </Link>
              <Link
                to="/contact"
                className="px-10 py-5 bg-green-600 text-white border border-green-500/50 font-extrabold rounded-2xl hover:bg-green-500 transition-all shadow-lg"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
