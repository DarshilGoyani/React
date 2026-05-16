"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function BlogView() {

    const [viewType, setViewType] = useState("grid");
    const [blogsData, setBlogsData] = useState<any[]>([]);

    const router = useRouter();

    useEffect(() => {
        const storedBlog = localStorage.getItem("blog");

        if (storedBlog) {
            setBlogsData(JSON.parse(storedBlog));
        }
    }, []);

    const deleteBlog = (id: number) => {
        const updatedBlogs = blogsData.filter(blog => blog.id !== id);

        setBlogsData(updatedBlogs);
        localStorage.setItem("blog", JSON.stringify(updatedBlogs));

        toast.success("Blog deleted successfully!");
    };

    return (
        <section className="min-h-screen bg-[#f4f6fa] py-35 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto w-full">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                    <div>
                        <span className="text-indigo-600 text-sm font-bold tracking-widest uppercase mb-2 block">
                            Manage Content
                        </span>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#12121c] leading-[1.1] tracking-tight">
                            <span className="font-bold font-sans">All </span>
                            <span className="font-serif italic font-light text-gray-500">published </span>
                            <span className="font-bold font-sans">Stories.</span>
                        </h2>
                    </div>

                    <div className="bg-white p-1.5 rounded-full border border-gray-200 flex items-center shadow-sm">
                        <button
                            onClick={() => setViewType("grid")}
                            className={`p-2.5 rounded-full transition-all duration-300 ${viewType === "grid" ? "bg-[#4f46e5] text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                        </button>
                        <button
                            onClick={() => setViewType("list")}
                            className={`p-2.5 rounded-full transition-all duration-300 ${viewType === "list" ? "bg-[#4f46e5] text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </button>
                        <button
                            onClick={() => setViewType("table")}
                            className={`p-2.5 rounded-full transition-all duration-300 ${viewType === "table" ? "bg-[#4f46e5] text-white shadow-md" : "text-gray-500 hover:bg-gray-100"}`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                        </button>
                    </div>
                </div>

                {viewType === "grid" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
                        {blogsData.map((blog, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">

                                <div className="flex justify-between items-start mb-6">
                                    <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{blog.category}</span>
                                    <span className="text-xs text-gray-400 font-medium">{blog.date}</span>
                                </div>

                                <h3 className="text-2xl font-bold text-[#12121c] mb-4 leading-snug group-hover:text-indigo-600 transition-colors">{blog.blogTitle}</h3>
                                <p className="text-gray-500 text-sm mb-8 flex-grow leading-relaxed">{blog.sortExcerpt}</p>

                                <div className="flex justify-between items-center pt-6 border-t border-gray-100">
                                    <span className="text-sm font-semibold text-[#12121c]">{blog.authName}</span>
                                    <div className="flex gap-2">
                                        <button onClick={() => {
                                            router.push(`/editBlog/${blog.id}`);
                                        }} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-full transition-all" title="Edit">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                        </button>
                                        <button onClick={() => {
                                            deleteBlog(blog.id)
                                        }} className="p-2 cursor-pointer text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all" title="Delete">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {viewType === "list" && (
                    <div className="flex flex-col gap-5 animate-fade-in">
                        {blogsData.map((blog, index) => (
                            <div key={index} className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between gap-6 group">

                                <div className="flex-grow">
                                    <div className="flex items-center gap-4 mb-3">
                                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{blog.category}</span>
                                        <span className="text-xs text-gray-400 font-medium">{blog.date}</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#12121c] mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{blog.blogTitle}</h3>
                                    <p className="text-gray-500 text-sm max-w-3xl leading-relaxed">{blog.sortExcerpt}</p>
                                </div>

                                <div className="flex md:flex-col justify-between items-end md:min-w-[140px] pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-6 mt-4 md:mt-0">
                                    <span className="text-sm font-semibold text-[#12121c] text-right w-full">{blog.authName}</span>

                                    <div className="flex gap-2 md:mt-auto">
                                        <button onClick={() => {
                                            router.push(`/editBlog/${blog.id}`);
                                        }} className="px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-full transition-colors flex items-center gap-2">
                                            Edit
                                        </button>
                                        <button onClick={() => {
                                            deleteBlog(blog.id)
                                        }} className="px-4 py-2 cursor-pointer text-sm font-medium text-red-500 bg-red-50 hover:bg-red-100 rounded-full transition-colors flex items-center gap-2">
                                            Delete
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

                {viewType === "table" && (
                    <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden animate-fade-in">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#f4f6fa] text-[#12121c] text-xs font-bold uppercase tracking-widest">
                                        <th className="px-6 py-5 rounded-tl-[2rem]">Title</th>
                                        <th className="px-6 py-5">Category</th>
                                        <th className="px-6 py-5">Author</th>
                                        <th className="px-6 py-5">Date</th>
                                        <th className="px-6 py-5 text-right rounded-tr-[2rem]">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-gray-600 divide-y divide-gray-100">
                                    {blogsData.map((blog, index) => (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors duration-200 group">
                                            <td className="px-6 py-5 font-semibold text-[#12121c] group-hover:text-indigo-600 transition-colors max-w-xs truncate">
                                                {blog.blogTitle}
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                                                    {blog.category}
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 font-medium">{blog.authName}</td>
                                            <td className="px-6 py-5">{blog.date}</td>
                                            <td className="px-6 py-5">
                                                <div className="flex justify-end gap-3">
                                                    <button onClick={() => {
                                                        router.push(`/editBlog/${blog.id}`);
                                                    }} className="text-gray-400 hover:text-indigo-600 transition-colors" title="Edit">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                                                    </button>
                                                    <button onClick={() => {
                                                        deleteBlog(blog.id)
                                                    }} className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" title="Delete">
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </section>
    );
}