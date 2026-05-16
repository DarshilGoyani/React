"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Target, Zap } from 'lucide-react';

// Values data with Lucide icons
const valuesData = [
    {
        icon: <Flame className="w-8 h-8 text-emerald-400" />,
        title: "Bold work wins",
        description: "We challenge conventions, push creative boundaries, and build solutions that stand out—because safe ideas don't spark real growth."
    },
    {
        icon: <Target className="w-8 h-8 text-emerald-400" />,
        title: "Performance over promises",
        description: "We don't rely on buzzwords or empty claims—every strategy is tracked, measured, and optimized for results you can actually see."
    },
    {
        icon: <Zap className="w-8 h-8 text-emerald-400" />,
        title: "Think smart, act fast",
        description: "In a fast-moving digital world, we combine agile execution with intelligent planning to stay ahead of trends and ahead of competitors."
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

export default function About() {
    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-emerald-500/30 font-sans">
            
            {/* 1. ABOUT BENTO BOX SECTION */}
            <section className="py-24 px-6 flex justify-center items-center overflow-hidden">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-6"
                >
                    {/* LEFT CARD */}
                    <motion.div 
                        variants={itemVariants}
                        className="lg:col-span-5 bg-gradient-to-br from-emerald-900/20 to-[#121212] border border-emerald-500/20 rounded-[2rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden group"
                    >
                        {/* Subtle Glow Effect */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.1),transparent_60%)]" />
                        
                        <div className="relative z-10">
                            <h2 className="text-2xl md:text-3xl leading-snug font-medium mb-10 text-gray-200">
                                <span className="text-emerald-400 font-semibold">Darshil Goyani</span> represents a collective of strategists, developers, and creatives who care deeply about scalable outcomes.
                            </h2>
                        </div>

                        <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl relative z-10">
                            <img
                                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop"
                                alt="Coding Workspace"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out grayscale hover:grayscale-0"
                            />
                        </div>
                    </motion.div>

                    {/* RIGHT CARD */}
                    <motion.div 
                        variants={itemVariants}
                        className="lg:col-span-7 bg-[#121212] border border-white/5 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex items-center gap-3 mb-6">
                                <span className="w-8 h-[1px] bg-emerald-500/50"></span>
                                <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">About</span>
                            </div>
                            <h3 className="text-3xl md:text-4xl lg:text-[2.5rem] leading-[1.2] font-medium tracking-tight text-gray-100">
                                Over the years, we've helped tech innovators and bold businesses break through the noise with high-end, performant architectures.
                            </h3>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-16 pt-10 border-t border-white/5">
                            <div className="flex flex-col">
                                <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">99%</h4>
                                <p className="text-gray-400 text-sm font-medium mt-2">Client Satisfaction</p>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">12M+</h4>
                                <p className="text-gray-400 text-sm font-medium mt-2">Requests Handled</p>
                            </div>
                            <div className="flex flex-col">
                                <h4 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">180+</h4>
                                <p className="text-gray-400 text-sm font-medium mt-2">Projects Deployed</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* 2. VALUES SECTION */}
            <section className="py-32 px-6 flex justify-center">
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="max-w-6xl w-full"
                >
                    {/* Heading Text */}
                    <motion.div variants={itemVariants} className="text-center mb-20">
                        <span className="text-emerald-400 text-sm font-semibold tracking-widest uppercase mb-4 block">Our Values</span>
                        <h2 className="text-5xl md:text-7xl text-white leading-[1.1] tracking-tight mt-4">
                            <span className="font-bold">Bold Values </span>
                            <span className="font-serif italic font-light text-gray-500">Behind</span>
                            <br />
                            <span className="font-serif italic font-light text-gray-500">Every </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Breakthrough</span>
                        </h2>
                    </motion.div>

                    {/* Grid Components */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {valuesData.map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -8 }}
                                className="bg-[#121212] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 rounded-[2rem] p-10 flex flex-col group cursor-pointer"
                            >
                                <div className="mb-8 p-4 bg-emerald-500/10 group-hover:bg-emerald-500/20 transition-colors duration-300 rounded-2xl w-fit">
                                    {item.icon}
                                </div>
                                <h3 className="text-2xl font-semibold text-white mb-4">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-base leading-relaxed">
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