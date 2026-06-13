import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getData, searchNewsData } from "../Services/apiService";
import toast from "react-hot-toast";

export default function DashboardPage() {
    const navigate = useNavigate();

    interface newsDataType {
        urlToImage: string | null;
        title: string;
        source: {
            id: string | null;
            name: string;
        };
        author: string | null;
        publishedAt: string;
        description: string | null;
        content: string | null;
        url: string;
    }

    const categories = [
        { id: "technology", label: "Technology" },
        { id: "business", label: "Business" },
        { id: "sports", label: "Sports" },
        { id: "science", label: "Science" },
        { id: "health", label: "Health" },
        { id: "entertainment", label: "Entertainment" }
    ];

    const [newsAllData, setNewsAllData] = useState<newsDataType[]>([]);
    const [loader, setLoader] = useState<boolean>(false);
    const [searchNews, setSearchNews] = useState("");
    const [activeCategory, setActiveCategory] = useState("technology");

    const fetchNewsByCategory = async function (category: string) {
        setLoader(true);
        const data = await getData(category);
        if (data && data.status === "ok") {
            setNewsAllData(data.articles || []);
        } else {
            toast.error("Failed to fetch news articles");
        }
        setLoader(false);
    };

    const searchNewsArticles = async function (query: string) {
        setLoader(true);
        const searchedData = await searchNewsData(query);
        if (searchedData && searchedData.status === "ok") {
            setNewsAllData(searchedData.articles || []);
        } else {
            toast.error("Failed to search news articles");
        }
        setLoader(false);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchNews.trim() !== "") {
                searchNewsArticles(searchNews);
            } else {
                fetchNewsByCategory(activeCategory);
            }
        }, 400);
        return () => clearTimeout(delayDebounceFn);
    }, [searchNews, activeCategory]);

    useEffect(() => {
        if (newsAllData && newsAllData.length > 0) {
            sessionStorage.setItem("newsArticles", JSON.stringify(newsAllData));
        }
    }, [newsAllData]);

    const heroArticle = newsAllData[0];
    const feedArticles = newsAllData.slice(1);

    return (
        <div className="min-h-screen bg-[#F6F6F6] text-gray-900 antialiased selection:bg-black selection:text-white flex flex-col md:flex-row" style={{ fontFamily: "'Geist', sans-serif" }}>
            
            {/* Left Fixed Application Sidebar */}
            <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-gray-200/80 p-6 md:fixed md:h-screen flex flex-col justify-between shrink-0 z-30">
                <div className="w-full">
                    {/* Minimal Brand Identity */}
                    <div className="mb-10">
                        <h1 
                            className="text-2xl font-black tracking-tighter text-gray-950 flex items-center gap-2 cursor-pointer select-none"
                            onClick={() => { setSearchNews(""); setActiveCategory("technology"); }}
                        >
                            <span className="w-5 h-5 bg-black rounded-md flex items-center justify-center text-white text-xs font-mono">C</span>
                            CONTEXT.
                        </h1>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1.5 font-mono">INTELLIGENCE SYNC</p>
                    </div>

                    {/* App Navigation Categories */}
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2 px-2 font-mono">CHANNELS</p>
                        {categories.map((cat) => {
                            const isSelected = activeCategory === cat.id && searchNews.trim() === "";
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => {
                                        setActiveCategory(cat.id);
                                        setSearchNews("");
                                    }}
                                    className={`w-full text-left text-xs font-semibold px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                                        isSelected
                                            ? "bg-gray-950 text-white shadow-sm"
                                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                                    }`}
                                >
                                    {cat.label}
                                    {isSelected && <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Brand Info */}
                <div className="hidden md:block pt-6 border-t border-gray-100 text-[10px] text-gray-400 font-mono font-medium tracking-wide">
                    SECURE NODE // SURAT_NET
                </div>
            </aside>

            {/* Right Main Dashboard Workspace */}
            <div className="flex-1 md:ml-64 p-4 sm:p-8 lg:p-12 max-w-6xl w-full mx-auto">
                
                {/* Global Workspace Action Header */}
                <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-sm font-bold tracking-widest text-gray-400 uppercase font-mono">
                            {searchNews.trim() !== "" ? "FILTERED ARCHIVE SEARCH" : `CORE DIRECTORY // ${activeCategory.toUpperCase()}`}
                        </h2>
                    </div>

                    {/* Sleek Integrated Search Core */}
                    <div className="flex items-center w-full sm:max-w-xs bg-white rounded-xl border border-gray-200/80 px-3.5 py-2 shadow-sm focus-within:border-gray-900 focus-within:ring-4 focus-within:ring-gray-900/5 transition-all">
                        <input
                            type="text"
                            value={searchNews}
                            onChange={(e) => setSearchNews(e.target.value)}
                            placeholder="Type query to filter stream..."
                            className="w-full bg-transparent text-xs text-gray-900 placeholder-gray-400 font-medium focus:outline-none"
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.2} stroke="currentColor" className="w-3.5 h-3.5 text-gray-400 shrink-0 ml-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.602 10.602Z" />
                        </svg>
                    </div>
                </header>

                {/* Interface Content Router Loader */}
                {loader && (
                    <div className="flex flex-col justify-center items-center py-44 bg-white border border-gray-200/60 rounded-3xl shadow-sm">
                        <div className="h-5 w-5 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                        <span className="mt-4 text-[10px] font-bold tracking-widest text-gray-400 uppercase font-mono">STREAMING IN DATA...</span>
                    </div>
                )}

                {/* Empty State Pipeline */}
                {!loader && newsAllData.length === 0 && (
                    <div className="text-center py-32 bg-white border border-gray-200/60 rounded-3xl p-8 shadow-sm">
                        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-900 mb-1">NO PACKETS DETECTED</h3>
                        <p className="text-xs text-gray-400 max-w-xs mx-auto leading-relaxed">The active matrix configuration returned zero operational metadata rows.</p>
                    </div>
                )}

                {/* Main Interactive Stage Panel */}
                {!loader && newsAllData.length > 0 && (
                    <div className="space-y-12">
                        
                        {/* 1. Cinematic Hero Stage */}
                        {heroArticle && (
                            <section 
                                onClick={() => navigate(`/news/0`)}
                                className="bg-white border border-gray-200/60 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/50 hover:border-gray-300 transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 cursor-pointer group"
                            >
                                <figure className="lg:col-span-7 aspect-[16/10] lg:aspect-auto min-h-[260px] lg:min-h-[400px] bg-gray-50 overflow-hidden relative">
                                    <img 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]" 
                                        src={heroArticle.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=600"} 
                                        alt={heroArticle.title}
                                    />
                                    <div className="absolute top-4 left-4 bg-black text-white text-[9px] font-bold tracking-wider px-2.5 py-1 rounded-md font-mono border border-white/10 uppercase">
                                        {heroArticle.source?.name || "FEATURED SOURCE"}
                                    </div>
                                </figure>
                                <div className="lg:col-span-5 p-6 sm:p-8 md:p-10 flex flex-col justify-between">
                                    <div>
                                        <time className="text-[10px] text-gray-400 font-bold tracking-widest uppercase font-mono block mb-3">
                                            {heroArticle.publishedAt ? new Date(heroArticle.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' }) : "STREAM RECENT"}
                                        </time>
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight leading-snug mb-4 group-hover:text-gray-700 transition-colors">
                                            {heroArticle.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed line-clamp-4">
                                            {heroArticle.description || "Open the full application document interface to evaluate deeper synchronized records."}
                                        </p>
                                    </div>
                                    <footer className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                                        <p className="truncate max-w-[150px]">BY // <span className="text-gray-900">{heroArticle.author || "STAFF WRITE"}</span></p>
                                        <span className="text-gray-900 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">LAUNCH CONTROLS →</span>
                                    </footer>
                                </div>
                            </section>
                        )}

                        {/* 2. Linear Stream List Area */}
                        <section className="space-y-4">
                            <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase font-mono px-1">CONTINUOUS FEED STREAM</h4>
                            <div className="bg-white border border-gray-200/60 rounded-3xl overflow-hidden shadow-sm divide-y divide-gray-100">
                                {feedArticles.map((data, idx) => {
                                    const actualIndex = idx + 1;
                                    return (
                                        <div
                                            key={actualIndex}
                                            onClick={() => navigate(`/news/${actualIndex}`)}
                                            className="p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-gray-50/60 transition-all duration-200 cursor-pointer group"
                                        >
                                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                                {/* Mini Thumbnail */}
                                                <figure className="h-14 w-14 rounded-xl bg-gray-100 overflow-hidden shrink-0 relative hidden sm:block border border-gray-100 shadow-inner">
                                                    <img 
                                                        className="w-full h-full object-cover" 
                                                        src={data.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=200"} 
                                                        alt="" 
                                                    />
                                                </figure>
                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5 text-[10px] font-bold font-mono text-gray-400 uppercase">
                                                        <span className="text-gray-900">{data.source?.name || "GLOBAL"}</span>
                                                        <span>•</span>
                                                        <span>{data.publishedAt ? new Date(data.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : ""}</span>
                                                    </div>
                                                    <h4 className="text-sm sm:text-base font-bold text-gray-900 truncate group-hover:text-gray-700 transition-colors tracking-tight">
                                                        {data.title}
                                                    </h4>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                                                <span className="text-[11px] text-gray-400 font-medium truncate max-w-[120px] block sm:hidden">
                                                    BY // {data.author || "STAFF"}
                                                </span>
                                                <span className="text-xs font-bold text-gray-400 group-hover:text-gray-900 group-hover:translate-x-1 transition-all flex items-center font-mono">
                                                    OPEN_FILE // {String(actualIndex).padStart(2, '0')} →
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                    </div>
                )}

            </div>
        </div>
    );
}