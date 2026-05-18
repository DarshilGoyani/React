"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, BarChart3, Binary, Layers } from 'lucide-react';

const valuesData = [
    {
        icon: <ShieldAlert className="w-5 h-5 text-emerald-400" />,
        title: "Clean, Defensible Architecture",
        description: "We bypass quick hacks to ensure long-term viability, writing highly predictable, componentized, and completely tested infrastructure."
    },
    {
        icon: <BarChart3 className="w-5 h-5 text-emerald-400" />,
        title: "Measurable System Output",
        description: "Performance isn't an assumption. Every system is deeply integrated with monitoring tools tracking precise transaction times and metrics."
    },
    {
        icon: <Binary className="w-5 h-5 text-emerald-400" />,
        title: "Agile System Iteration",
        description: "Adapting quickly to shifts in technology requires clean abstraction layers. We assemble modular platforms configured for immediate change."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function About() {
    return (
        <main className="min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            
            {/* BENTO BOX SECTION */}
            <section className="py-28 px-6 max-w-7xl mx-auto w-full">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                    {/* LEFT CELL (Profile/Vision) */}
                    <motion.div 
                        variants={itemVariants}
                        className="lg:col-span-5 bg-[#0d0d0d] border border-white/[0.05] rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/[0.02] blur-[80px] pointer-events-none" />
                        
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-xs uppercase font-bold tracking-widest text-emerald-400">The Operator</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white leading-snug">
                                Darshil Goyani runs a micro-collective engineered to deploy highly resilient technical structures.
                            </h2>
                        </div>

                        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/[0.05] relative shadow-inner">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
                                alt="Engineering Infrastructure Ecosystem"
                                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter grayscale brightness-75 contrast-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>
                    </motion.div>

                    {/* RIGHT CELL (Stats & Statement) */}
                    <motion.div 
                        variants={itemVariants}
                        className="lg:col-span-7 bg-[#0d0d0d] border border-white/[0.05] rounded-3xl p-8 md:p-10 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Track Record</span>
                                <div className="h-[1px] flex-1 bg-white/[0.05]" />
                            </div>
                            <h3 className="text-2xl md:text-4xl font-light tracking-tight text-gray-300 leading-relaxed">
                                Over the years, we have scaled digital ecosystems for global clients, mitigating load failures, modernizing brittle frameworks, and translating raw code arrays into absolute runtime assets.
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/[0.04]">
                            <div>
                                <h4 className="text-4xl font-extrabold tracking-tight text-white font-mono">99.9%</h4>
                                <p className="text-gray-400 text-xs font-medium mt-1">Uptime Maintained</p>
                            </div>
                            <div>
                                <h4 className="text-4xl font-extrabold tracking-tight text-white font-mono">12M+</h4>
                                <p className="text-gray-400 text-xs font-medium mt-1">API Node Requests</p>
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <h4 className="text-4xl font-extrabold tracking-tight text-white font-mono">180+</h4>
                                <p className="text-gray-400 text-xs font-medium mt-1">Environments Deployed</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* VALUES SECTION */}
            <section className="py-20 px-6 max-w-7xl mx-auto w-full border-t border-white/[0.04]">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                >
                    <div className="mb-16">
                        <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-2">Architectural Philosophy</span>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                            Operational Rules We Commit To.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {valuesData.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="bg-[#0d0d0d] border border-white/[0.04] hover:border-emerald-500/20 transition-all duration-300 rounded-2xl p-8 flex flex-col group"
                            >
                                <div className="mb-6 p-3 bg-white/[0.03] border border-white/[0.06] group-hover:bg-emerald-500/[0.06] group-hover:border-emerald-500/20 transition-all duration-300 rounded-xl w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-200">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed font-light">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>
        </main>
    );
}