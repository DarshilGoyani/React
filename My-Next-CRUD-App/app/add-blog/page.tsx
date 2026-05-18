"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { Terminal, ChevronDown, FileCode2 } from "lucide-react";
import { blogDataType } from "../utils/type";

export default function AddBlogForm() {
    const blogCategory = ["Development", "AI Infrastructure", "Systems Architecture", "Frontend Performance", "Database Optimization"];

    const [blogData, setBlogData] = useState<blogDataType>({
        id: 0,
        blogTitle: "",
        category: "",
        authName: "",
        blogTag: "",
        sortExcerpt: "",
    });

    const [errorBlog, setErrorBlog] = useState<Partial<Record<keyof blogDataType, string>>>({});
    const [allBlog, setAllBlog] = useState<blogDataType[]>([]);

    useEffect(() => {
        if (allBlog.length > 0) {
            localStorage.setItem('blog', JSON.stringify(allBlog));
        }
    }, [allBlog]);

    useEffect(() => {
        const storedBlog = localStorage.getItem('blog');
        if (storedBlog) {
            try {
                setAllBlog(JSON.parse(storedBlog));
            } catch (e) {
                console.error("Failed to parse localized logs", e);
            }
        }
    }, []);

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!validation()) return;

        const newBlog = {
            ...blogData,
            id: Date.now()
        };

        setAllBlog(blog => [...blog, newBlog]);

        toast.success("Article Dispatched to Local Array", {
            theme: "dark",
            className: "border border-emerald-500/20 bg-[#0d0d0d] text-white font-sans rounded-xl",
        });

        setBlogData({
            id: 0,
            blogTitle: "",
            category: "",
            authName: "",
            blogTag: "",
            sortExcerpt: "",
        });
    };

    const validation = () => {
        const error: Partial<Record<keyof blogDataType, string>> = {};

        if (!blogData.blogTitle.trim()) error.blogTitle = "Title context parameter missing.";
        if (!blogData.category) error.category = "Category allocation required.";
        if (!blogData.authName.trim()) error.authName = "Author signature verified array missing.";
        if (!blogData.sortExcerpt.trim()) {
            error.sortExcerpt = "An excerpt summary is required.";
        } else if (blogData.sortExcerpt.length > 150) {
            error.sortExcerpt = "Character overflow. Limit payload to under 150 characters.";
        }
        if (!blogData.blogTag.trim()) error.blogTag = "Indexing tags required.";

        setErrorBlog(error);
        return Object.keys(error).length === 0;
    };

    return (
        <main className="min-h-screen bg-[#050505] flex items-center justify-center py-20 px-4 sm:px-6 selection:bg-emerald-500/30 font-sans">
            <motion.div 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-3xl bg-[#0d0d0d] rounded-2xl p-6 sm:p-10 shadow-2xl border border-white/[0.05] relative overflow-hidden"
            >
                {/* Background Grid Pattern Accent */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/[0.01] blur-[60px] pointer-events-none" />

                {/* Header Container */}
                <div className="mb-10 flex items-center justify-between pb-6 border-b border-white/[0.04]">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-mono">Content Dispatch Node</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                            Draft Technical Story
                        </h2>
                    </div>
                </div>

                {/* Form Input Matrix */}
                <form onSubmit={onSubmit} className="flex flex-col gap-6">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Title Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400">Blog Title <span className="text-emerald-500">*</span></label>
                            <input
                                type="text"
                                value={blogData.blogTitle}
                                onChange={(e) => setBlogData({ ...blogData, blogTitle: e.target.value })}
                                placeholder="e.g., Mitigating V8 Memory Leaks"
                                className={`w-full bg-[#121212] border ${errorBlog.blogTitle ? 'border-red-500/40 focus:border-red-500/50' : 'border-white/[0.06] focus:border-emerald-500/40'} px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/[0.03] transition-all duration-200`}
                            />
                            {errorBlog.blogTitle && <span className="text-red-400 text-[11px] font-mono mt-0.5">{errorBlog.blogTitle}</span>}
                        </div>

                        {/* Category Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400">System Category <span className="text-emerald-500">*</span></label>
                            <div className="relative">
                                <select
                                    value={blogData.category}
                                    onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                                    className={`w-full bg-[#121212] border ${errorBlog.category ? 'border-red-500/40 focus:border-red-500/50' : 'border-white/[0.06] focus:border-emerald-500/40'} px-4 py-3 rounded-xl text-sm text-white appearance-none focus:outline-none focus:ring-4 focus:ring-emerald-500/[0.03] transition-all duration-200 cursor-pointer`}
                                >
                                    <option value="" className="text-gray-600">Select parameter allocation</option>
                                    {blogCategory.map((category) => (
                                        <option key={category} value={category} className="bg-[#0d0d0d]">{category}</option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <ChevronDown className="w-4 h-4" />
                                </div>
                            </div>
                            {errorBlog.category && <span className="text-red-400 text-[11px] font-mono mt-0.5">{errorBlog.category}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Author Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400">Author Verification Signature <span className="text-emerald-500">*</span></label>
                            <input
                                type="text"
                                value={blogData.authName}
                                onChange={(e) => setBlogData({ ...blogData, authName: e.target.value })}
                                placeholder="Darshil Goyani"
                                className={`w-full bg-[#121212] border ${errorBlog.authName ? 'border-red-500/40 focus:border-red-500/50' : 'border-white/[0.06] focus:border-emerald-500/40'} px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/[0.03] transition-all duration-200`}
                            />
                            {errorBlog.authName && <span className="text-red-400 text-[11px] font-mono mt-0.5">{errorBlog.authName}</span>}
                        </div>

                        {/* Tags Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-xs font-semibold text-gray-400">Indexing Meta-Tags (Comma Separated) <span className="text-emerald-500">*</span></label>
                            <input
                                type="text"
                                value={blogData.blogTag}
                                onChange={(e) => setBlogData({ ...blogData, blogTag: e.target.value })}
                                placeholder="nextjs, architecture, node"
                                className={`w-full bg-[#121212] border ${errorBlog.blogTag ? 'border-red-500/40 focus:border-red-500/50' : 'border-white/[0.06] focus:border-emerald-500/40'} px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/[0.03] transition-all duration-200`}
                            />
                            {errorBlog.blogTag && <span className="text-red-400 text-[11px] font-mono mt-0.5">{errorBlog.blogTag}</span>}
                        </div>
                    </div>

                    {/* Excerpt Textarea */}
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-semibold text-gray-400">Short Payload Summary Excerpt <span className="text-emerald-500">*</span></label>
                            <span className={`text-[10px] font-mono ${blogData.sortExcerpt.length > 150 ? 'text-red-400 font-bold' : 'text-gray-600'}`}>
                                {blogData.sortExcerpt.length}/150
                            </span>
                        </div>
                        <textarea
                            value={blogData.sortExcerpt}
                            onChange={(e) => setBlogData({ ...blogData, sortExcerpt: e.target.value })}
                            rows={3}
                            placeholder="Provide a granular overview of your structural narrative analysis context payload..."
                            className={`w-full bg-[#121212] border ${errorBlog.sortExcerpt ? 'border-red-500/40 focus:border-red-500/50' : 'border-white/[0.06] focus:border-emerald-500/40'} px-4 py-3 rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-4 focus:ring-emerald-500/[0.03] transition-all duration-200 resize-none`}
                        />
                        {errorBlog.sortExcerpt && <span className="text-red-400 text-[11px] font-mono mt-0.5">{errorBlog.sortExcerpt}</span>}
                    </div>

                    {/* Form Footer Action */}
                    <div className="mt-4 pt-6 border-t border-white/[0.04] flex justify-end">
                        <button 
                            type="submit" 
                            className="bg-emerald-500 hover:bg-emerald-400 text-[#050505] pl-6 pr-2 py-1.5 rounded-full flex items-center gap-3 transition-all duration-200 text-xs font-semibold group shadow-md shadow-emerald-500/5"
                        >
                            Publish Component Story
                            <div className="bg-[#050505] text-emerald-400 group-hover:bg-white group-hover:text-black rounded-full p-2 transition-all duration-200">
                                <FileCode2 className="w-3.5 h-3.5" />
                            </div>
                        </button>
                    </div>

                </form>
            </motion.div>
        </main>
    );
}