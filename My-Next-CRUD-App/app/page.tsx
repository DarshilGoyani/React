"use client";

import { motion } from "framer-motion";
import { Code2, Cpu, Layers, Terminal, ArrowUpRight, PhoneCall, Sparkles } from "lucide-react";

const servicesData = [
    {
        icon: <Code2 className="w-6 h-6" />,
        title: "Full-Stack Engineering",
        description: "Building production-ready applications with React, Next.js, and TypeScript, engineered for speed and structural integrity.",
        tag: "Next.js / TS"
    },
    {
        icon: <Cpu className="w-6 h-6" />,
        title: "Scalable Architecture",
        description: "Designing decoupled, distributed cloud infrastructure that effortlessly handles high concurrency and transactional volume.",
        tag: "AWS / Serverless"
    },
    {
        icon: <Layers className="w-6 h-6" />,
        title: "API & Microservices",
        description: "Crafting bulletproof RESTful and GraphQL endpoints optimized for minimal data overhead and structural longevity.",
        tag: "Node / Go"
    },
    {
        icon: <Terminal className="w-6 h-6" />,
        title: "Performance Optimization",
        description: "Auditing application runtime, asset delivery, and database queries to slash latency and elevate Core Web Vitals.",
        tag: "Lighthouse 100"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function Home() {
    return (
        <main className="w-full min-h-screen bg-[#050505] text-[#ededed] font-sans selection:bg-emerald-500/30 selection:text-emerald-300 overflow-x-hidden">
            
            {/* HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center relative px-6 py-24 border-b border-white/[0.04]">
                {/* Radial Tech Glows */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-gradient-to-r from-emerald-500/10 to-cyan-500/5 blur-[130px] rounded-full pointer-events-none" />
                
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative z-10 flex flex-col items-center max-w-5xl mx-auto"
                >
                    {/* Badge */}
                    <motion.div 
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-medium text-emerald-400 tracking-wide mb-8 shadow-sm"
                    >
                        <Sparkles className="w-3.5 h-3.5" /> Open for Complex Architectural Projects
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl lg:text-[6.5rem] font-bold text-center tracking-tight leading-[0.95]">
                        Hello, I am <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-extrabold">
                            Darshil Goyani
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="mt-8 text-gray-400 text-base sm:text-xl max-w-2xl text-center leading-relaxed font-light">
                        Engineering resilient full-stack systems, dynamic web experiences, and highly scalable cloud architectures focused on performance, not just impressions.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-6 w-full sm:w-auto">
                        <button className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 text-[#050505] pl-7 pr-2 py-2 rounded-full flex items-center justify-between sm:justify-start gap-4 transition-all duration-300 font-semibold shadow-lg shadow-emerald-500/10 group">
                            Let's Connect
                            <div className="bg-[#050505] text-emerald-400 rounded-full p-2 group-hover:bg-white group-hover:text-black transition-all duration-300">
                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </button>

                        <button className="w-full sm:w-auto border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/[0.15] text-gray-300 px-6 py-3 rounded-full flex items-center justify-center gap-3 transition-all duration-300 text-sm font-medium group">
                            <PhoneCall className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                            Book Architecture Strategy Call
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* SERVICES SECTION */}
            <section className="py-32 px-6 max-w-7xl mx-auto w-full">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8"
                >
                    <div>
                        <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-3">Core Expertise</span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            Engineered for <span className="text-gray-400 font-light italic">Production Scale.</span>
                        </h2>
                    </div>

                    <button className="border border-white/[0.08] bg-white/[0.01] hover:bg-emerald-500/[0.04] hover:border-emerald-500/30 text-gray-300 hover:text-emerald-400 pl-6 pr-2 py-2 rounded-full flex items-center gap-4 transition-all duration-300 text-sm font-medium group">
                        Explore Full Technical Stack
                        <div className="bg-white/[0.05] text-white group-hover:bg-emerald-500 rounded-full p-2 transition-all duration-300">
                            <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                        </div>
                    </button>
                </motion.div>

                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {servicesData.map((service, index) => (
                        <motion.div
                            variants={itemVariants}
                            key={index}
                            className="flex flex-col justify-between p-8 rounded-3xl bg-[#0d0d0d] border border-white/[0.05] hover:border-emerald-500/20 transition-all duration-300 group hover:-translate-y-1.5 cursor-pointer relative overflow-hidden"
                        >
                            <div>
                                <div className="mb-8 w-12 h-12 flex items-center justify-center rounded-2xl bg-white/[0.03] border border-white/[0.06] text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/[0.08] group-hover:border-emerald-500/20 transition-all duration-300">
                                    {service.icon}
                                </div>

                                <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors duration-200">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-4 border-t border-white/[0.03] text-[11px] font-mono tracking-wider text-gray-500 group-hover:text-cyan-400 transition-colors duration-300">
                                {service.tag}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>
        </main>
    );
}