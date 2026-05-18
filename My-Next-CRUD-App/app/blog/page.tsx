"use client";

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, List, TableProperties, Edit3, Trash2, Calendar, User, Tag } from "lucide-react";
import { blogDataType } from "../utils/type";

export default function BlogView() {
    const [viewType, setViewType] = useState<"grid" | "list" | "table">("grid");
    const [blogsData, setBlogsData] = useState<blogDataType[]>([]);
    const router = useRouter();

    useEffect(() => {
        const storedBlog = localStorage.getItem("blog");
        if (storedBlog) {
            try {
                setBlogsData(JSON.parse(storedBlog));
            } catch (e) {
                console.error("Failed to parse system storage log payload", e);
            }
        }
    }, []);

    const deleteBlog = (id: number) => {
        const updatedBlogs = blogsData.filter(blog => blog.id !== id);
        setBlogsData(updatedBlogs);
        localStorage.setItem("blog", JSON.stringify(updatedBlogs));

        toast.success("Article structural node purged successfully.", {
            theme: "dark",
            className: "border border-red-500/20 bg-[#0d0d0d] text-white font-sans rounded-xl",
        });
    };

    return (
        <section className="min-h-screen bg-[#050505] text-[#ededed] py-32 px-4 md:px-8 font-sans selection:bg-emerald-500/30 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">

                {/* CONTROL ACTION BAR HEADER */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6 pb-6 border-b border-white/[0.04]">
                    <div>
                        <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 block mb-2">
                            Engineered Logs
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                            All <span className="font-light italic text-gray-400">published</span> Stories.
                        </h2>
                    </div>

                    {/* View Switcher Matrix */}
                    <div className="bg-[#0d0d0d] p-1 rounded-full border border-white/[0.06] flex items-center shadow-inner">
                        <button
                            onClick={() => setViewType("grid")}
                            className={`p-2.5 rounded-full transition-all duration-300 ${viewType === "grid" ? "bg-emerald-500 text-[#050505] shadow-md font-bold" : "text-gray-400 hover:text-white hover:bg-white/[0.02]"}`}
                            title="Grid Layout"
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewType("list")}
                            className={`p-2.5 rounded-full transition-all duration-300 ${viewType === "list" ? "bg-emerald-500 text-[#050505] shadow-md font-bold" : "text-gray-400 hover:text-white hover:bg-white/[0.02]"}`}
                            title="List Layout"
                        >
                            <List className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => setViewType("table")}
                            className={`p-2.5 rounded-full transition-all duration-300 ${viewType === "table" ? "bg-emerald-500 text-[#050505] shadow-md font-bold" : "text-gray-400 hover:text-white hover:bg-white/[0.02]"}`}
                            title="Table Matrix"
                        >
                            <TableProperties className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* EMPTY CONTENT FALLBACK */}
                {blogsData.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-white/[0.05] rounded-3xl bg-[#0d0d0d]/30">
                        <p className="text-gray-500 text-sm font-mono">No telemetry logs found in local storage cache.</p>
                    </div>
                )}

                {/* GRID VIEW MODALITY */}
                {viewType === "grid" && blogsData.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogsData.map((blog) => (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                key={blog.id} 
                                className="bg-[#0d0d0d] rounded-3xl p-8 border border-white/[0.05] hover:border-emerald-500/25 transition-all duration-300 flex flex-col group relative overflow-hidden"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <span className="bg-white/[0.03] border border-white/[0.06] text-emerald-400 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase">
                                        {blog.category}
                                    </span>
                                    <span className="text-[11px] text-gray-500 font-mono flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 text-cyan-500" /> {blog.blogTag ? blog.blogTag.split(',')[0] : 'System'}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-4 leading-snug group-hover:text-emerald-400 transition-colors duration-200">
                                    {blog.blogTitle}
                                </h3>
                                <p className="text-gray-400 text-sm mb-8 flex-grow leading-relaxed font-light">
                                    {blog.sortExcerpt}
                                </p>

                                <div className="flex justify-between items-center pt-5 border-t border-white/[0.04]">
                                    <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-gray-500" /> {blog.authName}
                                    </span>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => router.push(`/editBlog/${blog.id}`)} 
                                            className="p-2 text-gray-500 hover:text-emerald-400 hover:bg-emerald-500/[0.05] rounded-xl transition-all duration-200" 
                                            title="Edit Log"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button 
                                            onClick={() => deleteBlog(blog.id)} 
                                            className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/[0.05] rounded-xl transition-all duration-200" 
                                            title="Purge Log"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* LIST VIEW MODALITY */}
                {viewType === "list" && blogsData.length > 0 && (
                    <div className="flex flex-col gap-4">
                        {blogsData.map((blog) => (
                            <motion.div 
                                initial={{ opacity: 0, x: -5 }}
                                animate={{ opacity: 1, x: 0 }}
                                key={blog.id} 
                                className="bg-[#0d0d0d] rounded-2xl p-6 md:p-8 border border-white/[0.04] hover:border-emerald-500/20 transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 group"
                            >
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="bg-white/[0.03] border border-white/[0.05] text-emerald-400 px-2.5 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider">
                                            {blog.category}
                                        </span>
                                        <span className="text-[11px] text-gray-500 font-mono tracking-tight">{blog.blogTag}</span>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-emerald-400 transition-colors duration-200">
                                        {blog.blogTitle}
                                    </h3>
                                    <p className="text-gray-400 text-sm max-w-4xl leading-relaxed font-light">
                                        {blog.sortExcerpt}
                                    </p>
                                </div>

                                <div className="flex md:flex-col justify-between items-end md:min-w-[160px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-white/[0.04] md:pl-6 mt-2 md:mt-0">
                                    <span className="text-xs font-semibold text-gray-300 text-right w-full block font-mono">
                                        // {blog.authName}
                                    </span>

                                    <div className="flex gap-2 md:mt-auto">
                                        <button 
                                            onClick={() => router.push(`/editBlog/${blog.id}`)} 
                                            className="px-4 py-2 text-xs font-medium text-emerald-400 bg-emerald-500/[0.04] hover:bg-emerald-500/10 border border-emerald-500/10 rounded-full transition-all duration-200"
                                        >
                                            Edit Node
                                        </button>
                                        <button 
                                            onClick={() => deleteBlog(blog.id)} 
                                            className="px-4 py-2 text-xs font-medium text-red-400 bg-red-500/[0.04] hover:bg-red-500/10 border border-red-500/10 rounded-full transition-all duration-200"
                                        >
                                            Purge
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* TABLE MATRIX VIEW MODALITY */}
                {viewType === "table" && blogsData.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-[#0d0d0d] rounded-2xl border border-white/[0.05] overflow-hidden"
                    >
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-white/[0.02] text-gray-400 text-[11px] font-mono uppercase tracking-widest border-b border-white/[0.04]">
                                        <th className="px-6 py-4.5">Title Stream</th>
                                        <th className="px-6 py-4.5">System Allocation</th>
                                        <th className="px-6 py-4.5">Author Index</th>
                                        <th className="px-6 py-4.5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-400 divide-y divide-white/[0.03]">
                                    {blogsData.map((blog) => (
                                        <tr key={blog.id} className="hover:bg-white/[0.01] transition-colors duration-150 group">
                                            <td className="px-6 py-4 font-medium text-white group-hover:text-emerald-400 transition-colors duration-200 max-w-xs truncate">
                                                {blog.blogTitle}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-300 font-mono text-xs">
                                                    {blog.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-xs font-mono text-gray-500">
                                                {blog.authName}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-end gap-3">
                                                    <button 
                                                        onClick={() => router.push(`/editBlog/${blog.id}`)} 
                                                        className="text-gray-500 hover:text-emerald-400 transition-colors duration-200" 
                                                        title="Edit Matrix"
                                                    >
                                                        <Edit3 className="w-4 h-4" />
                                                    </button>
                                                    <button 
                                                        onClick={() => deleteBlog(blog.id)} 
                                                        className="text-gray-500 hover:text-red-400 transition-colors duration-200" 
                                                        title="Purge Matrix"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}

            </div>
        </section>
    );
}