"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ArrowUpRight, Quote, Sparkles } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Pricing() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30 font-sans pb-24">
            
            {/* HERO SECTION */}
            <section className="flex flex-col items-center justify-center relative overflow-hidden pt-40 pb-20 px-6">
                {/* Dark Mode Glow Effects */}
                <div className="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[90vw] h-[70vh] bg-emerald-600/10 blur-[150px] rounded-[100%] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[60vw] h-[40vh] bg-cyan-500/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-8">
                        <Sparkles className="w-4 h-4" /> Pricing Plans
                    </div>
                    
                    <h1 className="text-6xl md:text-8xl lg:text-[7rem] text-white text-center leading-[1.1] tracking-tight">
                        <span className="font-bold font-sans">Best </span>
                        <br />
                        <span className="font-serif italic font-light text-gray-500">plan </span>
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">ever</span>
                    </h1>

                    <p className="mt-8 text-gray-400 text-base md:text-lg max-w-lg text-center tracking-wide">
                        Simple plans—just the way real humans like it. No hidden fees, no surprises.
                    </p>
                </motion.div>
            </section>

            {/* PRICING CARDS SECTION */}
            <section className="px-6 relative z-10">
                <div className="max-w-7xl mx-auto w-full">
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
                    >
                        {/* 1. TESTIMONIAL CARD */}
                        <motion.div 
                            variants={itemVariants} 
                            className="bg-[#121212] rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/5 shadow-2xl hover:border-emerald-500/30 transition-all duration-500 group"
                        >
                            <div className="w-full h-64 bg-[#1a1a1a] rounded-3xl flex flex-col items-center justify-center relative overflow-hidden mb-8 border border-white/5">
                                <div className="absolute inset-0 opacity-[0.2]" style={{ backgroundImage: 'radial-gradient(circle, #333 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>
                                
                                <div className="relative z-10 flex flex-col items-center gap-4 text-gray-400 font-bold text-xl group-hover:scale-105 transition-transform duration-500">
                                    <div className="p-4 bg-[#222] rounded-2xl border border-white/10 shadow-xl">
                                        <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                        </svg>
                                    </div>
                                    <span className="tracking-widest">LOGOIPSUM</span>
                                </div>
                            </div>

                            <div className="relative px-2 pb-4">
                                <Quote className="w-8 h-8 text-emerald-500/20 absolute -top-6 -left-2 rotate-180" />
                                <p className="text-gray-300 font-medium text-lg leading-relaxed relative z-10 pl-4">
                                    "They understood our goals and delivered beyond expectations. Highly recommend their architecture and scaling solutions."
                                </p>
                            </div>
                        </motion.div>

                        {/* 2. BASIC PLAN */}
                        <motion.div 
                            variants={itemVariants} 
                            className="bg-[#121212] rounded-[2.5rem] p-8 flex flex-col justify-between border border-white/5 shadow-2xl hover:border-emerald-500/30 transition-all duration-500"
                        >
                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-3">Basic</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[250px] mx-auto min-h-[40px]">
                                    Perfect for startups and small businesses taking their first step online.
                                </p>
                                <div className="mt-6 flex items-end justify-center gap-1">
                                    <span className="text-6xl font-bold text-white tracking-tighter">$299</span>
                                    <span className="text-gray-500 text-lg font-medium mb-2">/</span>
                                    <span className="text-gray-500 text-sm font-medium mb-2">project</span>
                                </div>
                            </div>

                            <div className="bg-[#1a1a1a] rounded-3xl p-6 flex-grow border border-white/5 mb-6">
                                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">Included</h4>
                                <ul className="flex flex-col gap-4 text-sm text-gray-300 font-medium">
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 1 Campaign Setup</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 8 Social Media Posts/month</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Basic SEO Optimization</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Monthly Performance Report</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Email Support</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-center text-gray-500 mb-4">*Ready for Boost</p>
                                <button className="w-full bg-white/5 hover:bg-emerald-500/10 border border-white/10 hover:border-emerald-500/50 text-white hover:text-emerald-400 py-3.5 rounded-full flex items-center justify-center gap-3 transition-all duration-300 group">
                                    <span className="font-semibold text-sm">Get Started</span>
                                    <div className="bg-white/10 group-hover:bg-emerald-500 text-white rounded-full p-1.5 transition-colors duration-300">
                                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                        {/* 3. PRO PLAN */}
                        <motion.div 
                            variants={itemVariants} 
                            className="bg-gradient-to-b from-[#121212] to-emerald-900/10 rounded-[2.5rem] p-8 flex flex-col justify-between border border-emerald-500/20 shadow-[0_0_40px_rgba(16,185,129,0.05)] hover:border-emerald-500/50 transition-all duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-8 bg-emerald-500 text-[#0a0a0a] text-xs font-bold px-4 py-1.5 rounded-b-lg tracking-widest uppercase shadow-lg">
                                Popular
                            </div>

                            <div className="text-center mb-8 mt-4">
                                <h3 className="text-2xl font-bold text-emerald-400 mb-3">Pro</h3>
                                <p className="text-gray-400 text-sm leading-relaxed max-w-[250px] mx-auto min-h-[40px]">
                                    Advanced features for scaling businesses aiming for market dominance.
                                </p>
                                <div className="mt-6 flex items-end justify-center gap-1">
                                    <span className="text-6xl font-bold text-white tracking-tighter">$999</span>
                                    <span className="text-emerald-500/50 text-lg font-medium mb-2">/</span>
                                    <span className="text-emerald-500/50 text-sm font-medium mb-2">project</span>
                                </div>
                            </div>

                            <div className="bg-[#1a1a1a] rounded-3xl p-6 flex-grow border border-emerald-500/10 mb-6">
                                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-6">Included</h4>
                                <ul className="flex flex-col gap-4 text-sm text-gray-300 font-medium">
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Up to 3 Social Platforms</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 2 Campaign Setups (Google/FB)</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Advanced SEO Optimization</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> Real-time Analytics Dashboard</li>
                                    <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> 24/7 Priority Support</li>
                                </ul>
                            </div>

                            <div>
                                <p className="text-xs font-semibold text-center text-gray-500 mb-4">*Ready to Scale</p>
                                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#0a0a0a] py-3.5 rounded-full flex items-center justify-center gap-3 transition-colors duration-300 group shadow-lg shadow-emerald-500/20">
                                    <span className="font-bold text-sm">Get Started</span>
                                    <div className="bg-[#0a0a0a] text-emerald-400 rounded-full p-1.5 transition-colors duration-300">
                                        <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                                    </div>
                                </button>
                            </div>
                        </motion.div>

                    </motion.div>
                </div>
            </section>
        </main>
    );
}