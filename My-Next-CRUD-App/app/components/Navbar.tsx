"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, ArrowUpRight } from "lucide-react";

const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Add Blog", href: "/add-blog" },
    { label: "Blog Stream", href: "/blog" },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-6 w-full pointer-events-none"
            >
                <nav 
                    className={`pointer-events-auto flex justify-between items-center w-full max-w-6xl rounded-full px-6 transition-all duration-500 ease-in-out ${
                        scrolled 
                            ? "bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.5)]" 
                            : "bg-[#0d0d0d]/40 backdrop-blur-md border border-white/[0.04] py-4"
                    }`}
                >
                    {/* LOGO ENGINE */}
                    <div className="flex items-center gap-2 hover:opacity-90 transition duration-300">
                        <Link href="/" className="text-xl font-black tracking-tight text-white flex items-baseline">
                            Darshil<span className="text-emerald-400 font-extrabold">.</span>
                        </Link>
                    </div>

                    {/* DESKTOP LINKS STREAM */}
                    <ul className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-wider text-gray-400">
                        {navItems.map((item, i) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={i}>
                                    <Link
                                        href={item.href}
                                        className={`group relative inline-flex flex-col overflow-hidden py-1 transition-colors duration-300 ${isActive ? "text-emerald-400 font-bold" : "hover:text-white"}`}
                                    >
                                        <span className="transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[120%]">
                                            {item.label}
                                        </span>
                                        <span className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] translate-y-[120%] group-hover:translate-y-0 text-white font-bold">
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* DESKTOP RIGHTS ENGINE */}
                    <div className="hidden md:flex items-center gap-6">
                        {/* Status Beacon Monitor */}
                        <div className="relative cursor-pointer group p-2 bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.05] rounded-full transition-colors duration-200">
                            <Bell className="w-4 h-4 text-gray-400 group-hover:text-emerald-400 transition duration-300" />
                            <span className="absolute top-1 right-1 flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                        </div>

                        {/* Connection Dispatch Action */}
                        <button className="bg-white/[0.03] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-emerald-500/[0.04] py-1.5 pl-5 pr-1.5 rounded-full flex items-center gap-3 transition-all duration-300 group">
                            <span className="text-xs font-semibold uppercase font-mono tracking-wider text-gray-300 group-hover:text-emerald-400 transition-colors duration-300">HQ Sync</span>
                            <div className="bg-white/[0.05] group-hover:bg-emerald-500 text-white group-hover:text-[#050505] rounded-full p-1.5 transition-all duration-300">
                                <ArrowUpRight className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                            </div>
                        </button>
                    </div>

                    {/* MOBILE TOGGLE CELL */}
                    <button
                        className="md:hidden text-gray-400 hover:text-white transition p-2 rounded-full hover:bg-white/5"
                        onClick={() => setOpen(true)}
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                </nav>
            </motion.div>

            {/* MOBILE SHEET METRIC */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-lg z-40"
                            onClick={() => setOpen(false)}
                        />

                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 220 }}
                            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-white/[0.06] text-white z-50 flex flex-col shadow-2xl"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-white/[0.04]">
                                <span className="text-xs font-mono uppercase tracking-widest text-gray-500">System Navigation</span>
                                <button
                                    onClick={() => setOpen(false)}
                                    className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition duration-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <ul className="flex flex-col gap-5 px-8 mt-12 text-xl font-bold tracking-tight flex-1">
                                {navItems.map((item, i) => (
                                    <li key={i} className="border-b border-white/[0.03] pb-4">
                                        <Link
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="group relative inline-flex overflow-hidden transition duration-300 text-gray-300 hover:text-emerald-400"
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>

                            <div className="p-6 mb-4">
                                <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-[#050505] py-4 rounded-xl font-bold transition duration-300 flex items-center justify-center gap-2 text-sm uppercase font-mono tracking-wider shadow-lg shadow-emerald-500/10">
                                    Sync Terminal <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}