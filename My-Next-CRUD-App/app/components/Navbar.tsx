"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, ArrowUpRight } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Add Blog", href: "/add-blog" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Navbar scroll effect for a premium feel
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [open]);

    return (
        <>
            <motion.div 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 w-full pointer-events-none"
            >
                <nav 
                    className={`pointer-events-auto flex justify-between items-center w-full max-w-6xl rounded-full px-6 transition-all duration-500 ease-in-out ${
                        scrolled 
                            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)]" 
                            : "bg-[#121212]/50 backdrop-blur-md border border-transparent py-4"
                    }`}
                >
                    {/* LOGO */}
                    <div className="flex items-center gap-2 hover:opacity-80 transition duration-300">
                        <Link href="/" className="text-2xl font-bold tracking-tight text-white flex items-baseline">
                            Darshil<span className="text-emerald-400">.</span>
                        </Link>
                    </div>

                    {/* DESKTOP LINKS */}
                    <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        {navItems.map((item, i) => (
                            <li key={i}>
                                <Link
                                    href={item.href}
                                    className="group relative inline-flex overflow-hidden py-1"
                                >
                                    <span className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%] group-hover:opacity-0">
                                        {item.label}
                                    </span>
                                    <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[120%] group-hover:translate-y-0 text-white py-1">
                                        {item.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* DESKTOP RIGHT SECTION */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Notification Bell */}
                        <div className="relative cursor-pointer group">
                            <Bell className="w-5 h-5 text-gray-400 group-hover:text-white transition duration-300" />
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border-2 border-[#121212]"></span>
                            </span>
                        </div>

                        {/* Hire Me Button */}
                        <button className="bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 px-2 py-1.5 pl-6 rounded-full flex items-center gap-3 transition-all duration-300 group">
                            <span className="text-sm font-medium text-gray-200 group-hover:text-emerald-400 transition-colors duration-300">Hire Me</span>
                            <div className="bg-white group-hover:bg-emerald-500 text-black group-hover:text-white rounded-full p-2 transition-all duration-300">
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </button>
                    </div>

                    {/* MOBILE MENU TOGGLE */}
                    <button
                        className="md:hidden text-gray-300 hover:text-white transition p-2 rounded-full hover:bg-white/5"
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="w-6 h-6" />
                    </button>
                </nav>
            </motion.div>

            {/* MOBILE MENU OVERLAY & SIDEBAR */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop Blur */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
                            onClick={() => setOpen(false)}
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/10 text-white z-50 flex flex-col shadow-2xl"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-white/5">
                                <span className="text-xl font-bold tracking-tight">Menu</span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition duration-300"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-6 px-8 mt-8 text-2xl font-medium flex-1">
                                {navItems.map((item, i) => (
                                    <li key={i} className="border-b border-white/5 pb-4">
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="group relative inline-flex overflow-hidden transform transition duration-300 text-gray-300 hover:text-white"
                                        >
                                            <span className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                                                {item.label}
                                            </span>
                                            <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[120%] group-hover:translate-y-0 text-emerald-400">
                                                {item.label}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-8 mb-4">
                                <button className="w-full bg-emerald-500 text-white px-4 py-4 rounded-2xl font-semibold hover:bg-emerald-400 transition duration-300 flex items-center justify-center gap-2">
                                    Hire Me <ArrowUpRight className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}