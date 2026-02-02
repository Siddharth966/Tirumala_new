import React from "react";
import { motion } from "framer-motion";
import {
  Target,
  Eye,
  Users,
  Award,
  Sprout,
  Tractor,
  Heart,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  { id: 1, label: "Farmers Empowered", value: "500+", icon: Users },
  { id: 2, label: "Quality Machines", value: "50+", icon: Tractor },
  { id: 3, label: "Hours of Service", value: "10,000+", icon: Award },
  { id: 4, label: "Villages Covered", value: "25+", icon: Sprout },
];

const values = [
  {
    title: "Accessibility",
    desc: "Making premium machinery affordable and available to small-scale farmers across the region.",
    icon: Heart,
    color: "text-rose-600",
    bg: "bg-rose-100",
  },
  {
    title: "Innovation",
    desc: "Continuously upgrading our fleet with the latest IoT-enabled smart farming machinery.",
    icon: Sprout,
    color: "text-green-600",
    bg: "bg-green-100",
  },
  {
    title: "Reliability",
    desc: "Ensuring 100% equipment uptime with 24/7 on-field maintenance and expert support.",
    icon: CheckCircle2,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
];

const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-12 overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[60vh] flex items-center justify-center py-20 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-5 py-2 mb-6 uppercase text-xs tracking-widest font-bold text-green-700 bg-green-200/60 border border-green-300 rounded-full">
              Our Journey
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold leading-tight text-slate-900">
              Empowering the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500">
                Roots of Prosperity
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mt-6 leading-relaxed">
              Tirumala Agro is transforming agriculture by enabling farmers with
              world-class machinery without ownership burden.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center hover:shadow-2xl transition-all"
            >
              <div className="text-green-600 flex justify-center mb-4">
                <stat.icon size={34} />
              </div>
              <h3 className="text-3xl font-extrabold text-green-700">{stat.value}</h3>
              <p className="text-[11px] uppercase tracking-widest text-slate-500 font-bold mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NARRATIVE SECTION */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Image Card */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}>
            <div className="rounded-3xl overflow-hidden border-4 border-white shadow-2xl">
              <img
                src="/images/about_hero.png"
                alt="Farmer"
                className="w-full h-[450px] object-cover"
              />
            </div>
            <div className="bg-white mt-[-40px] mx-4 p-10 rounded-3xl shadow-xl border border-green-200/50">
              <p className="italic text-slate-700 text-sm">
                "Our vision is to ensure that every farmer has access to modern tools that uplift productivity."
              </p>
              <div className="flex items-center mt-2">
                <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center text-white font-bold">
                  TA
                </div>
                <p className="ml-3 text-green-700 text-xs uppercase font-bold">
                  Founder’s Message
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Text */}
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}>
            <span className="text-orange-500 font-bold uppercase text-xs tracking-widest">
              Our Story
            </span>

            <h2 className="text-4xl font-extrabold text-slate-900 mt-3 mb-5">
              Democratizing Modern <br />
              <span className="text-green-600">Agriculture Equipment</span>
            </h2>

            <p className="text-slate-600 leading-relaxed text-lg mb-5">
              Founded in 2020, Tirumala Agro bridges the gap between farmers
              and high-performance machinery that was once accessible only to
              large-scale producers.
            </p>

            <p className="text-slate-600 leading-relaxed text-lg mb-8">
              With our rental model, farmers increase efficiency by up to 40%
              while drastically reducing labor and capital costs.
            </p>

            <Link
              to="/products"
              className="px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 transition-all shadow-xl"
            >
              Explore Our Fleet
            </Link>
          </motion.div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 gap-8">

          <motion.div
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-3xl border border-green-200 shadow hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6 text-green-700">
              <Target size={32} />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">
              Our Mission
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              To empower farmers with world-class equipment that boosts
              productivity, efficiency, and profitability.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-10 bg-white rounded-3xl border border-orange-200 shadow hover:shadow-2xl transition-all"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-6 text-orange-700">
              <Eye size={32} />
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">
              Our Vision
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              To build a future where every farmer thrives with access to
              modern tools and smart solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALUES */}
      <section className="py-24 bg-green-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <span className="text-orange-500 font-bold uppercase tracking-widest">
              Our Values
            </span>
            <h2 className="text-4xl font-extrabold text-slate-900 mt-3">
              Values That Build Trust
            </h2>
            <p className="text-slate-600 mt-3 text-lg">
              We stand on transparency, quality, and farmer-first service.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl bg-white border border-green-100 hover:shadow-2xl transition-all"
              >
                <div className={`w-16 h-16 ${v.bg} rounded-2xl flex items-center justify-center mb-6`}>
                  <v.icon className={`h-7 w-7 ${v.color}`} />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">{v.title}</h3>
                <p className="text-slate-600 mt-3">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-700 to-emerald-600 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Ready to grow your productivity?
          </h2>
          <p className="text-green-100 text-lg mb-10">
            Join thousands of progressive farmers who trust Tirumala Agro.
          </p>
          <Link
            to="/products"
            className="px-10 py-5 bg-white text-green-700 font-extrabold rounded-2xl shadow-xl hover:bg-green-50"
          >
            Browse Equipment
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
