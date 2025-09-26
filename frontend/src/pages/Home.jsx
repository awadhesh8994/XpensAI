import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain,
  Receipt,
  BarChart3,
  Shield,
  Link as LinkIcon,
  Tag,
  LineChart,
  Star,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";

function Home() {
  const features = useMemo(
    () => [
      {
        title: "AI Insights",
        desc: "Understand spending patterns and get personalized savings tips.",
        icon: Brain,
      },
      {
        title: "Smart Expense Tracking",
        desc: "Auto-import and categorize your transactions in real‑time.",
        icon: Receipt,
      },
      {
        title: "Visual Dashboards",
        desc: "Beautiful charts to visualize budgets and cashflow at a glance.",
        icon: BarChart3,
      },
      {
        title: "Secure & Private",
        desc: "Bank‑grade encryption and privacy by default.",
        icon: Shield,
      },
    ],
    []
  );

  const steps = useMemo(
    () => [
      {
        title: "Connect Accounts",
        desc: "Securely link your bank and cards in seconds.",
        icon: LinkIcon,
      },
      {
        title: "AI Categorizes Expenses",
        desc: "Our models auto‑classify and detect recurring patterns.",
        icon: Tag,
      },
      {
        title: "Get Insights",
        desc: "Actionable recommendations to save more, faster.",
        icon: LineChart,
      },
    ],
    []
  );

  const testimonials = useMemo(
    () => [
      {
        quote:
          "This AI finally made my finances make sense. I cut monthly spending by 18% in the first month.",
        name: "Ava Thompson",
        role: "Freelance Designer",
        rating: 5,
      },
      {
        quote:
          "The categorization is spot on and the dashboards are gorgeous. Budgeting feels effortless.",
        name: "Marcus Lee",
        role: "Product Manager",
        rating: 5,
      },
      {
        quote:
          "I love the insights. It flagged duplicate subscriptions I forgot about — instant savings!",
        name: "Priya Patel",
        role: "Data Analyst",
        rating: 4,
      },
    ],
    []
  );

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveTestimonial((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, [testimonials.length]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-indigo-100">
      {/* Subtle animated background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-400/40 via-violet-400/30 to-fuchsia-400/30 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-gradient-to-tr from-fuchsia-400/30 via-pink-400/20 to-orange-300/20 blur-3xl animate-pulse [animation-duration:5s]" />
        <motion.div
          className="absolute top-1/3 left-10 h-24 w-24 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg shadow-indigo-300/20"
          animate={{ y: [0, -12, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 h-16 w-16 rounded-full bg-white/10 backdrop-blur-md shadow"
          animate={{ y: [0, 14, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 px-6 py-24 md:flex-row md:py-28">
          {/* Text */}
          <motion.div
            className="w-full text-center md:w-1/2 md:text-left"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              Take Control of Your Finances with AI
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600 md:max-w-xl">
              Track, analyze, and optimize your expenses effortlessly with smart
              AI insights.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-7 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Get Started
              </Link>
              <Link
                to="/demo"
                className="inline-flex items-center justify-center rounded-xl border border-indigo-300/60 bg-white/60 px-7 py-3 text-base font-semibold text-indigo-700 backdrop-blur-md transition-all hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Watch Demo
              </Link>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative mx-auto max-w-lg rounded-2xl bg-white/70 p-6 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
              <div className="absolute -top-3 -right-3 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-3 py-1 text-xs font-semibold text-white shadow">
                Preview
              </div>
              {/* Fake dashboard */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-3 w-24 rounded-full bg-indigo-200" />
                  <div className="h-3 w-12 rounded-full bg-violet-200" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-xl bg-gradient-to-tr from-indigo-50 to-white p-4 ring-1 ring-indigo-100">
                    <div className="mb-3 h-4 w-28 rounded bg-indigo-200/70" />
                    <div className="flex items-end gap-1">
                      <div className="h-16 w-4 rounded bg-indigo-400/60" />
                      <div className="h-10 w-4 rounded bg-indigo-300/60" />
                      <div className="h-20 w-4 rounded bg-indigo-500/60" />
                      <div className="h-12 w-4 rounded bg-indigo-300/60" />
                      <div className="h-8 w-4 rounded bg-indigo-200/60" />
                      <div className="h-14 w-4 rounded bg-indigo-400/60" />
                    </div>
                  </div>
                  <div className="rounded-xl bg-gradient-to-tr from-fuchsia-50 to-white p-4 ring-1 ring-fuchsia-100">
                    <div className="mb-3 h-4 w-20 rounded bg-fuchsia-200/70" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-fuchsia-200/70" />
                      <div className="h-2 w-5/6 rounded bg-fuchsia-200/70" />
                      <div className="h-2 w-4/6 rounded bg-fuchsia-200/70" />
                    </div>
                  </div>
                </div>
                <div className="rounded-xl bg-gradient-to-tr from-emerald-50 to-white p-4 ring-1 ring-emerald-100">
                  <div className="mb-3 h-4 w-24 rounded bg-emerald-200/70" />
                  <div className="flex h-2 w-full overflow-hidden rounded bg-emerald-100">
                    <div className="h-full w-1/3 bg-emerald-400" />
                    <div className="h-full w-1/4 bg-emerald-300" />
                    <div className="h-full w-1/6 bg-emerald-200" />
                    <div className="h-full flex-1 bg-emerald-100" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            Powerful features to master your money
          </motion.h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map(({ title, desc, icon: Icon }, idx) => (
              <motion.div
                key={title}
                className="group rounded-2xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl transition-transform hover:scale-[1.02]"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-lg">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            How it works
          </motion.h2>

          <div className="mt-12">
            {/* Timeline: vertical on mobile, horizontal on lg */}
            <div className="relative mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
              {steps.map(({ title, desc, icon: Icon }, idx) => (
                <motion.div
                  key={title}
                  className="relative rounded-2xl bg-white/70 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-fuchsia-500 text-white shadow-lg">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {title}
                      </h3>
                      <p className="mt-2 text-sm text-gray-600">{desc}</p>
                    </div>
                  </div>

                  {/* Connectors */}
                  {idx < steps.length - 1 && (
                    <>
                      {/* Horizontal (lg) */}
                      <div className="hidden lg:block">
                        <div className="absolute right-[-14px] top-1/2 hidden h-[2px] w-6 -translate-y-1/2 rounded bg-gradient-to-r from-indigo-300 to-fuchsia-300 lg:block" />
                      </div>
                      {/* Vertical (mobile) */}
                      <div className="lg:hidden">
                        <div className="absolute bottom-[-14px] left-1/2 h-6 w-[2px] -translate-x-1/2 rounded bg-gradient-to-b from-indigo-300 to-fuchsia-300" />
                      </div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <motion.h2
            className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={fadeInUp}
          >
            Loved by smart savers
          </motion.h2>

          <div className="relative mx-auto mt-10 max-w-3xl overflow-hidden rounded-2xl bg-white/70 p-8 text-center shadow-xl ring-1 ring-black/5 backdrop-blur-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.45 }}
              >
                <div className="flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[activeTestimonial].rating
                          ? "fill-yellow-400 stroke-yellow-400"
                          : "stroke-yellow-400"
                      }`}
                    />
                  ))}
                </div>
                <p className="mt-5 text-lg text-gray-700">
                  “{testimonials[activeTestimonial].quote}”
                </p>
                <div className="mt-6 text-sm font-medium text-gray-900">
                  {testimonials[activeTestimonial].name}
                </div>
                <div className="text-xs text-gray-500">
                  {testimonials[activeTestimonial].role}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-center gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActiveTestimonial(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === activeTestimonial
                      ? "bg-indigo-600"
                      : "bg-indigo-200 hover:bg-indigo-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 p-[1px] shadow-2xl">
            <div className="rounded-3xl bg-white/60 p-10 text-center backdrop-blur-xl">
              <motion.h3
                className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={fadeInUp}
              >
                Start saving smarter today!
              </motion.h3>
              <p className="mx-auto mt-3 max-w-2xl text-gray-700">
                Join thousands using AI to track, analyze, and optimize spending.
              </p>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/25 transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-white/60 focus:ring-offset-2 focus:ring-offset-indigo-500"
                >
                  Sign Up Free
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative border-t border-gray-200/60 bg-white/95 backdrop-blur-xl">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-50/20 to-transparent"></div>
            
            <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-12 sm:flex-row">
                {/* Copyright */}
                <div className="text-sm font-semibold text-gray-600 tracking-wide">
                    © {new Date().getFullYear()}{" "}
                    <span className="font-black text-gray-900 bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                        XpensaAI
                    </span>
                </div>
                
                {/* Navigation Links */}
                <nav className="flex flex-wrap items-center justify-center gap-2">
                    {[
                        { to: "/about", text: "About" },
                        { to: "/pricing", text: "Pricing" },
                        { to: "/contact", text: "Contact" },
                        { to: "/privacy", text: "Privacy Policy" }
                    ].map((item, index) => (
                        <Link
                            key={item.text}
                            to={item.to}
                            className="relative px-4 py-2.5 rounded-2xl text-sm font-bold text-gray-600 hover:text-indigo-700 transition-all duration-300 group overflow-hidden"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Background hover effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-indigo-100/50 scale-x-0 group-hover:scale-x-100 origin-center transition-transform duration-300 rounded-2xl"></div>
                            
                            {/* Text */}
                            <span className="relative z-10">{item.text}</span>
                            
                            {/* Bottom accent line */}
                            <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-indigo-600 group-hover:w-6 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-300 rounded-full"></div>
                            
                            {/* Subtle glow */}
                            <div className="absolute inset-0 bg-indigo-400/5 blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                        </Link>
                    ))}
                </nav>
                
                {/* Social Links */}
                <div className="flex items-center gap-3">
                    {[
                        { href: "https://www.linkedin.com", icon: Linkedin, label: "LinkedIn" },
                        { href: "https://www.twitter.com", icon: Twitter, label: "Twitter" },
                        { href: "https://www.instagram.com", icon: Instagram, label: "Instagram" }
                    ].map((social, index) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noreferrer"
                            aria-label={social.label}
                            className="relative p-3 rounded-2xl text-gray-500 hover:text-indigo-600 transition-all duration-300 group overflow-hidden hover:scale-110"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 scale-90 group-hover:scale-100 transition-transform duration-300 rounded-2xl"></div>
                            
                            {/* Border ring */}
                            <div className="absolute inset-0 rounded-2xl ring-1 ring-gray-200/60 group-hover:ring-indigo-300/60 transition-colors duration-300"></div>
                            
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-indigo-400/10 blur-lg scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
                            
                            {/* Icon */}
                            <social.icon className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:rotate-6" />
                            
                            {/* Shimmer effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 rounded-2xl"></div>
                        </a>
                    ))}
                </div>
            </div>
            
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-200 to-transparent"></div>
            
            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-indigo-300/30 rounded-full animate-pulse"></div>
                <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-indigo-400/40 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute bottom-1/3 left-1/2 w-0.5 h-0.5 bg-indigo-300/50 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
        </footer>
    </main>
  );
}

export default Home;
