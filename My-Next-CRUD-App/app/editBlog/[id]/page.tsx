"use client";

import { blogDataType } from "@/app/utils/type";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Edit3, ChevronDown, Save } from "lucide-react";

export default function EditFormPage() {
    const { id } = useParams();
    const router = useRouter();
    const blogCategory = ["Development", "AI Development", "Advertisement", "Marketing", "Sports"];
    
    const [blogData, setBlogData] = useState<blogDataType>({
        id: 0,
        blogTitle: "",
        category: "",
        authName: "",
        blogTag: "",
        sortExcerpt: "",
    });

    const [errorBlog, setErrorBlog] = useState<any>({});

    useEffect(() => {
        const allBlog: blogDataType[] = JSON.parse(localStorage.getItem('blog') || '[]');
        const existingBlog = allBlog.find((blog) => blog.id === Number(id));

        if (existingBlog) {
            setBlogData(existingBlog);
        }
    }, [id]);

    const validation = () => {
        const error: any = {};

        if (!blogData.blogTitle) {
            error.blogTitle = "Blog Title is required";
        }
        if (!blogData.category) {
            error.category = "Category is required";
        }
        if (!blogData.authName) {
            error.authName = "Author Name is required";
        }
        if (!blogData.sortExcerpt) {
            error.sortExcerpt = "Short Excerpt is required";
        }
        if (blogData.sortExcerpt.length > 150) {
            error.sortExcerpt = "Short Excerpt should be less than 150 characters";
        }
        if (!blogData.blogTag) {
            error.blogTag = "Blog Tag is required";
        }

        setErrorBlog(error);

        return Object.keys(error).length === 0;
    }

    const onSubmit = (event: any) => {
        event.preventDefault();

        if (!validation()) return;

        let allBlog = JSON.parse(localStorage.getItem('blog') || '[]');

        allBlog = allBlog.map((item: any) => {
            if (item.id === Number(id)) {
                return blogData;
            }
            return item;
        });

        localStorage.setItem('blog', JSON.stringify(allBlog));

        toast.success("Blog Updated Successfully", {
            theme: "dark",
            className: "border border-emerald-500/20 bg-[#121212] text-white",
        });
        
        router.push("/blog");
    };

    return (
        <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-24 px-6 selection:bg-emerald-500/30">
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-4xl bg-[#121212] rounded-[2.5rem] p-8 md:p-14 shadow-2xl border border-white/10 font-sans relative overflow-hidden"
            >
                {/* Subtle Glow Effect */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

                <div className="mb-14 relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-[1px] bg-emerald-500/50"></span>
                            <span className="text-emerald-400 text-xs font-semibold tracking-widest uppercase">
                                Update
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl text-white leading-[1.1] tracking-tight">
                            <span className="font-bold">Update </span>
                            <span className="font-serif italic font-light text-gray-500">Your </span>
                            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">Story.</span>
                        </h2>
                    </div>
                    <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                        <Edit3 className="text-emerald-400 w-8 h-8" strokeWidth={1.5} />
                    </div>
                </div>

                <form onSubmit={onSubmit} className="flex flex-col gap-8 relative z-10">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Blog Title *</label>
                            <input
                                type="text"
                                name="blogTitle"
                                onChange={(e) => setBlogData({ ...blogData, blogTitle: e.target.value })}
                                value={blogData.blogTitle}
                                placeholder="E.g., Master Next.js in 2026"
                                className={`w-full bg-[#1a1a1a] border ${errorBlog.blogTitle ? 'border-red-500/50' : 'border-white/5'} px-5 py-4 rounded-2xl text-white placeholder-gray-500 focus:bg-[#222] focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300`}
                            />
                            {errorBlog.blogTitle && <span className="text-red-400 text-xs ml-1 font-medium">{errorBlog.blogTitle}</span>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Category *</label>
                            <div className="relative">
                                <select
                                    name="category"
                                    onChange={(e) => setBlogData({ ...blogData, category: e.target.value })}
                                    value={blogData.category}
                                    className={`w-full bg-[#1a1a1a] border ${errorBlog.category ? 'border-red-500/50' : 'border-white/5'} px-5 py-4 rounded-2xl text-white appearance-none focus:bg-[#222] focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 cursor-pointer`}
                                >
                                    <option value="" className="bg-[#1a1a1a] text-gray-500">Select a category</option>
                                    {blogCategory.map((category) => (
                                        <option key={category} value={category} className="bg-[#1a1a1a]">
                                            {category}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-emerald-400">
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </div>
                            {errorBlog.category && <span className="text-red-400 text-xs ml-1 font-medium">{errorBlog.category}</span>}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Author Name *</label>
                            <input
                                type="text"
                                name="authName"
                                onChange={(e) => setBlogData({ ...blogData, authName: e.target.value })}
                                value={blogData.authName}
                                placeholder="E.g., Darshil Goyani"
                                className={`w-full bg-[#1a1a1a] border ${errorBlog.authName ? 'border-red-500/50' : 'border-white/5'} px-5 py-4 rounded-2xl text-white placeholder-gray-500 focus:bg-[#222] focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300`}
                            />
                            {errorBlog.authName && <span className="text-red-400 text-xs ml-1 font-medium">{errorBlog.authName}</span>}
                        </div>

                        <div className="flex flex-col gap-3">
                            <label className="text-sm font-semibold text-gray-300 ml-1">Tags (Comma Separated) *</label>
                            <input
                                type="text"
                                name="blogTag"
                                onChange={(e) => setBlogData({ ...blogData, blogTag: e.target.value })}
                                value={blogData.blogTag}
                                placeholder="e.g., frontend, react, web design"
                                className={`w-full bg-[#1a1a1a] border ${errorBlog.blogTag ? 'border-red-500/50' : 'border-white/5'} px-5 py-4 rounded-2xl text-white placeholder-gray-500 focus:bg-[#222] focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300`}
                            />
                            {errorBlog.blogTag && <span className="text-red-400 text-xs ml-1 font-medium">{errorBlog.blogTag}</span>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end ml-1">
                            <label className="text-sm font-semibold text-gray-300">Short Excerpt *</label>
                            <span className={`text-xs ${blogData.sortExcerpt.length > 150 ? 'text-red-400' : 'text-gray-500'}`}>
                                {blogData.sortExcerpt.length}/150
                            </span>
                        </div>
                        <textarea
                            name="sortExcerpt"
                            onChange={(e) => setBlogData({ ...blogData, sortExcerpt: e.target.value })}
                            value={blogData.sortExcerpt}
                            rows={3}
                            placeholder="A quick summary of the blog post (max 150 characters)..."
                            className={`w-full bg-[#1a1a1a] border ${errorBlog.sortExcerpt ? 'border-red-500/50' : 'border-white/5'} px-5 py-4 rounded-2xl text-white placeholder-gray-500 focus:bg-[#222] focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all duration-300 resize-none`}
                        ></textarea>
                        {errorBlog.sortExcerpt && <span className="text-red-400 text-xs ml-1 font-medium">{errorBlog.sortExcerpt}</span>}
                    </div>

                    <div className="mt-6 pt-8 border-t border-white/5 flex justify-end">
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit" 
                            className="bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 pl-8 pr-2 py-2 rounded-full flex items-center gap-4 hover:bg-emerald-500 hover:text-white transition-all duration-300 font-medium group"
                        >
                            Update Story
                            <div className="bg-emerald-500 text-white group-hover:bg-white group-hover:text-emerald-600 rounded-full p-2.5 transition-colors duration-300">
                                <Save className="w-4 h-4" />
                            </div>
                        </motion.button>
                    </div>

                </form>
            </motion.div>
        </main>
    );
}