import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Star,
  ChevronRight,
  Rocket,
  Workflow,
} from "lucide-react";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    id: 1,
    name: "John Deere 5310",
    category: "Tractor",
    price: "₹800/hr",
    image: "/images/prod_tractor.png",
  },
  {
    id: 2,
    name: "Paddy Harvester",
    category: "Harvester",
    price: "₹2500/hr",
    image: "/images/prod_harvester.png",
  },
  {
    id: 3,
    name: "Rotavator 6ft",
    category: "Implements",
    price: "₹300/hr",
    image: "/images/prod_rotavator.png",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Ramakrishna Reddy",
    role: "Farmer, Guntur",
    text: "Tirumala Agro's service is impeccable. The harvester was in excellent condition and saved me significant time.",
  },
  {
    id: 2,
    name: "Suresh Babu",
    role: "Organic Cultivator",
    text: "Professional team and reasonable rates. I rely on their tractors for all my seasonal plowing needs.",
  },
];

const slides = [
  {
    id: 1,
    image: "/images/image.png",
    badge: "The Future of Smart Farming",
    title: "Modern Agriculture,",
    hightlight: "Delivered.",
    desc: "Premium agricultural machinery without ownership.Provide high-performance equipment to help you harvest.",
  },
  {
    id: 2,
    image: "/images/hero_drone.png",
    badge: "Precision Tech",
    title: "Aerial Efficiency,",
    hightlight: "Unleashed.",
    desc: "Advanced drone technology for precision spraying and crop monitoring. Save time and increase yield.",
  },
  {
    id: 3,
    image: "/images/about_hero.png",
    badge: "Community First",
    title: "Empowering Farmers,",
    hightlight: "Together.",
    desc: "Join 500+ successful farmers who trust Tirumala Agro. Reliability you can count on.",
  },
];

const steps = [
  {
    id: 1,
    icon: <Workflow size={40} />,
    title: "Plan & Discover",
    desc: "Understand requirements, gather insights, and identify the best approach.",
  },
  {
    id: 2,
    icon: <Rocket size={40} />,
    title: "Build & Integrate",
    desc: "We design and integrate features with clean architecture and great performance.",
  },
  {
    id: 3,
    icon: <CheckCircle size={40} />,
    title: "Deploy & Optimize",
    desc: "Monitor performance and deliver a smooth experience.",
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
    <div className="font-sans antialiased text-green-900 pt-14 bg-white">

      {/* HERO SECTION */}
      <div className="
        relative
        h-[75vh]
        sm:h-[90vh]
        md:h-[100vh]
        w-full
        flex items-center
        overflow-hidden
        bg-gradient-to-br from-green-50 to-emerald-100
      ">

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-0"
          >
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/75 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-200/40 via-transparent to-white/60"></div>
          </motion.div>
        </AnimatePresence>

        {/* HERO TEXT */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl pt-10 sm:pt-20"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-green-300 bg-green-50 text-green-700 text-sm mb-6">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              {slides[currentSlide].badge}
            </div>

            <h1 className="
              text-3xl 
              sm:text-5xl 
              md:text-6xl 
              lg:text-7xl 
              font-bold 
              leading-tight 
              mb-6
            ">
              {slides[currentSlide].title}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-400">
                {slides[currentSlide].hightlight}
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-green-700 mb-10 max-w-2xl">
              {slides[currentSlide].desc}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/products"
                className="px-8 py-4 text-white bg-green-600 hover:bg-green-700 rounded-lg font-semibold shadow-md"
              >
                View Equipment <ArrowRight className="inline ml-2" />
              </Link>

              <Link
                to="/contact"
                className=" mt-2 px-6 py-4 text-green-800 border border-green-300 bg-white hover:bg-green-50 rounded-lg font-semibold"
              >
                Contact Support
              </Link>
            </div>
          </motion.div>

          {/* SLIDER DOTS */}
          <div className="
            absolute
            bottom-6
            right-1/2
            translate-x-1/2
            sm:right-10 sm:translate-x-0
            flex space-x-3
          ">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full border border-green-600 transition-all ${
                  currentSlide === idx ? "bg-green-600 w-8" : "bg-green-300"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="mt-1 py-14 sm:py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-8">

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-green-900 mb-3">
              Why Industry Leaders Choose Us
            </h2>
            <p className="text-green-700">
              Technology + Reliability = Better Farming Output
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {[
              {
                icon: Shield,
                title: "Premium Quality Assurance",
                desc: "Every machine is inspected before delivery to ensure zero downtime.",
              },
              {
                icon: Clock,
                title: "Flexible Rental Terms",
                desc: "Hourly, daily, and seasonal rentals for your budget.",
              },
              {
                icon: CheckCircle,
                title: "Expert Operational Support",
                desc: "Get on-field guidance and 24/7 support from certified experts.",
              },
            ].map((feature, idx) =>
              <div key={idx} className="p-8 rounded-xl bg-white border border-green-100 hover:shadow-xl transition-all">
                <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-green-700" />
                </div>
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-green-700">{feature.desc}</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* PROCESS SECTION */}
      <section className="py-14 sm:py-20 bg-gradient-to-br from-white to-green-50">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <span className="text-green-600 font-bold uppercase text-sm">
              Our Process
            </span>
            <h2 className="text-3xl font-bold text-green-900 mt-2">
              Simplify Your Operations
            </h2>
            <p className="text-green-700 mt-3">
              A structured workflow designed for efficiency and quality.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {steps.map((step, idx) =>
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="text-center"
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-green-500 to-emerald-400 rounded-full flex items-center justify-center shadow-lg mb-6">
                  {React.cloneElement(step.icon, {
                    size: 32,
                    className: "text-white",
                  })}
                </div>
                <h3 className="text-xl font-bold text-green-900">{step.title}</h3>
                <p className="text-green-700 mt-2">{step.desc}</p>
              </motion.div>
            )}
          </div>

        </div>
      </section>

      {/* FEATURED MACHINERY */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-green-900">Featured Machinery</h2>
              <p className="text-green-700 mt-2">Top-rated equipment available now</p>
            </div>

            <Link
              to="/products"
              className="hidden sm:flex items-center px-6 py-3 bg-white border border-green-300 rounded-lg text-green-800 font-medium hover:bg-green-50"
            >
              View Catalog <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {featuredProducts.map((product) =>
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-green-100"
              >
                <div className="aspect-[4/3] bg-green-50 relative p-8 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-bold text-green-800 border border-green-200 shadow-sm">
                    {product.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-green-900">{product.name}</h3>
                    <span className="text-lg font-bold text-green-700">{product.price}</span>
                  </div>

                  <Link
                    to="/contact"
                    className="block w-full py-3 text-center border-t border-green-100 text-green-700 font-medium hover:bg-green-50"
                  >
                    Check Availability
                  </Link>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <Link
              to="/products"
              className="inline-flex items-center w-full justify-center px-6 py-4 bg-green-700 text-white rounded-lg font-bold shadow-md"
            >
              View All Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-14 sm:py-20 bg-green-50 border-t border-green-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <span className="text-green-600 font-bold uppercase text-sm">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-green-900 mt-2 mb-6">
              Trusted by Farmers Across the Region
            </h2>
            <p className="text-green-700 mb-10">
              Hear real stories from farmers who use our services.
            </p>
            <Link
              to="/about"
              className="text-green-700 font-bold hover:text-green-900 inline-flex items-center"
            >
              Read Success Stories
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>

          <div className="grid gap-6">
            {testimonials.map((t) =>
              <div key={t.id} className="p-6 bg-white rounded-xl border border-green-100 shadow-sm">
                <div className="flex text-yellow-400 mb-3">
                  {Array(5).fill(0).map((_, i) =>
                    <Star key={i} className="h-4 w-4 fill-current" />
                  )}
                </div>
                <p className="text-green-800 italic mb-4">"{t.text}"</p>
                <h4 className="font-bold text-green-900">{t.name}</h4>
                <p className="text-sm text-green-700">{t.role}</p>
              </div>
            )}
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-14 sm:py-20 bg-green-600 text-white relative">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197ebd0031?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Modernize Your Harvest?</h2>
          <p className="text-lg sm:text-xl text-green-100 mb-10">
            Join the network of progressive farmers. Rent top-tier machinery now.
          </p>

          <Link
            to="/contact"
            className="px-10 py-4 bg-white text-green-900 font-bold rounded-lg hover:bg-gray-100 shadow-xl"
          >
            Get Started Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
