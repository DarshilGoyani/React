"use client";

import { motion } from "framer-motion";
import { Compass, MousePointerClick, Megaphone, FileText, ArrowUpRight, PhoneCall } from "lucide-react";

// Updated data array with Lucide icons instead of emojis for a premium feel
const servicesData = [
    {
        icon: <Compass className="w-10 h-10" />,
        title: "Search engine optimization",
        description: "We optimize your website structure, content, and backlink profile to improve rankings, boost traffic.",
        hasBackground: false
    },
    {
        icon: <MousePointerClick className="w-10 h-10" />,
        title: "Pay-per-click advertising",
        description: "From Google Ads to Facebook, we manage your budget efficiently, craft compelling ads, and continuously test.",
        hasBackground: true
    },
    {
        icon: <Megaphone className="w-10 h-10" />,
        title: "Social media marketing",
        description: "We create scroll-stopping content, manage your platforms, and engage your community to grow.",
        hasBackground: false
    },
    {
        icon: <FileText className="w-10 h-10" />,
        title: "Content Marketing",
        description: "We optimize your website structure, content, and backlink profile to improve rankings, boost traffic.",
        hasBackground: true
    }
];

// Framer Motion Variants
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Home() {
    return (
        <main className="w-full font-sans bg-[#0a0a0a] text-white selection:bg-emerald-500/30">

            {/* 1. HERO SECTION */}
            <section className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-6 py-20">
                {/* Premium Dark Mode Glow Effects */}
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[70vw] h-[50vh] bg-emerald-600/10 blur-[150px] rounded-[100%] pointer-events-none"></div>
                <div className="absolute bottom-[-5%] left-1/2 -translate-x-1/2 w-[40vw] h-[30vh] bg-cyan-500/10 blur-[120px] rounded-[100%] pointer-events-none"></div>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="relative z-10 flex flex-col items-center mt-10"
                >
                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-[7.5rem] text-white text-center leading-[1.05] tracking-tight">
                        <span className="font-bold font-sans">Hello, I </span>
                        <span className="font-serif italic font-light text-gray-500">Am</span>
                        <br />
                        <span className="font-serif italic font-light text-gray-500">Darshil</span>
                        <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">.</span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="mt-8 text-gray-400 text-base md:text-lg max-w-xl text-center tracking-wide">
                        Every project here is designed to deliver highly scalable architecture and real impact—not just impressions.
                    </motion.p>

                    <motion.div variants={itemVariants} className="mt-12 flex flex-col sm:flex-row items-center gap-8">
                        <button className="bg-emerald-500 hover:bg-emerald-400 text-[#0a0a0a] pl-8 pr-2 py-2 rounded-full flex items-center gap-4 transition-all duration-300 font-bold shadow-lg shadow-emerald-500/20 group">
                            Let's Contact
                            <div className="bg-[#0a0a0a] text-emerald-400 rounded-full p-2.5 group-hover:bg-white transition-colors duration-300">
                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </button>

                        <button className="text-gray-300 flex items-center gap-3 hover:text-emerald-400 transition-colors duration-300 font-medium group">
                            <PhoneCall className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            Book a call
                        </button>
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. SERVICES SECTION */}
            <section className="py-32 px-6 border-t border-white/5 relative z-10">
                <div className="max-w-7xl mx-auto w-full">

                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={containerVariants}
                        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8"
                    >
                        <motion.h2 variants={itemVariants} className="text-5xl md:text-6xl lg:text-[4.5rem] text-white leading-[1.05] tracking-tight">
                            <span className="font-bold font-sans">Smart </span>
                            <span className="font-serif italic font-light text-gray-500">Service</span>
                            <br />
                            <span className="font-serif italic font-light text-gray-500">That </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Real Impact.</span>
                        </motion.h2>

                        <motion.button variants={itemVariants} className="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-white hover:text-emerald-400 pl-6 pr-2 py-2 rounded-full flex items-center gap-4 transition-all duration-300 font-medium group">
                            Let's Contact
                            <div className="bg-white/10 text-white group-hover:bg-emerald-500 group-hover:text-white rounded-full p-2.5 transition-colors duration-300">
                                <ArrowUpRight className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </motion.button>
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
                                className={`flex flex-col items-center text-center px-8 py-14 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 group cursor-pointer ${
                                    service.hasBackground 
                                        ? 'bg-[#121212] border-white/5 hover:border-emerald-500/30' 
                                        : 'bg-transparent border-transparent hover:bg-[#121212] hover:border-white/5'
                                }`}
                            >
                                {/* Icon wrapper with glow effect on hover */}
                                <div className="mb-10 p-5 rounded-2xl bg-white/5 text-gray-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors duration-500">
                                    {service.icon}
                                </div>

                                <h3 className="text-xl md:text-[1.35rem] font-bold text-white mb-4 leading-tight px-2 group-hover:text-emerald-400 transition-colors duration-300">
                                    {service.title}
                                </h3>

                                <p className="text-gray-400 text-sm leading-relaxed max-w-[260px]">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </section>

        </main>
    );
}