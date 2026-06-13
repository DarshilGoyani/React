import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Article = {
    title: string;
    description: string | null;
    content: string | null;
    author: string | null;
    publishedAt: string;
    urlToImage: string | null;
    source: { name: string };
    url: string;
};

export default function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [article, setArticle] = useState<Article | null>(null);

    useEffect(() => {
        if (!id) return;
        const stored = sessionStorage.getItem("newsArticles");
        if (!stored) return;
        try {
            const parsed = JSON.parse(stored) as Article[];
            const numericId = Number(id);
            if (!isNaN(numericId) && parsed[numericId]) {
                setArticle(parsed[numericId]);
            }
        } catch (error) {
            console.error("Failed to load article", error);
        }
    }, [id]);

    const formatDate = (value: string) => {
        if (!value) return "TIMESTAMP_PENDING";
        return new Date(value).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    if (!article) {
        return (
            <div className="min-h-screen bg-[#F6F6F6] flex flex-col justify-center items-center p-6 text-center text-gray-900" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                <div className="bg-white border border-gray-200/60 p-8 max-w-sm w-full rounded-3xl shadow-sm">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 mb-1.5 font-mono">DATAFRAME_MISSING</h2>
                    <p className="text-xs text-gray-400 mb-6 leading-relaxed">The active reference node pointer has been dropped from application context memories.</p>
                    <button 
                        onClick={() => navigate("/")} 
                        className="w-full bg-gray-950 hover:bg-gray-800 text-white font-bold uppercase tracking-widest text-[11px] py-3.5 rounded-xl transition-all shadow-md cursor-pointer font-mono"
                    >
                        ← FLUSH & RETRACK
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F6F6F6] text-gray-900 font-sans antialiased pb-24" style={{ fontFamily: "'Geist', sans-serif" }}>
            
            {/* Rigid Application Bar */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <button 
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 group text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-gray-900 transition-colors cursor-pointer font-mono"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        SYS_INDEX
                    </button>
                    <div>
                        <span className="text-sm font-black tracking-tighter text-gray-950 uppercase">
                            CONTEXT<span className="font-light text-gray-400">.FILE</span>
                        </span>
                    </div>
                </div>
            </header>

            {/* Immersive Focus Article Frame */}
            <main className="max-w-3xl mx-auto px-4 mt-12 sm:mt-16">
                <article className="bg-white border border-gray-200/60 rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm">
                    
                    {/* Header Track info */}
                    <div className="flex items-center gap-3 mb-4 font-mono text-[10px]">
                        <span className="bg-gray-100 text-gray-900 border border-gray-200 font-bold uppercase px-2.5 py-0.5 rounded-md">
                            NODE // {article.source?.name?.toUpperCase() || "EXTERNAL WIRE"}
                        </span>
                        <time className="text-gray-400 font-bold uppercase tracking-wider">
                            {formatDate(article.publishedAt)}
                        </time>
                    </div>

                    {/* Massive Bold Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-[1.2] mb-6 tracking-tight">
                        {article.title}
                    </h1>

                    {/* Operator Line */}
                    <div className="flex items-center gap-2 pb-5 border-b border-gray-100 mb-8 text-[11px] text-gray-400 font-bold uppercase tracking-wider font-mono">
                        <span>DISPATCHER // <strong className="text-gray-900 font-bold">{article.author || "FIELD NET AGENT"}</strong></span>
                    </div>

                    {/* Smooth Image Layer */}
                    {article.urlToImage && (
                        <div className="w-full bg-gray-50 overflow-hidden rounded-2xl border border-gray-200/50 mb-10 shadow-inner">
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-auto object-cover max-h-[440px]"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = "none";
                                }}
                            />
                        </div>
                    )}

                    {/* Description Block */}
                    {article.description && (
                        <div className="border-l-4 border-gray-950 pl-5 py-1.5 my-8 text-gray-700 text-base md:text-lg leading-relaxed font-medium bg-gray-50 rounded-r-2xl pr-4">
                            “ {article.description} ”
                        </div>
                    )}

                    {/* Story Paragraph Layer */}
                    <div className="text-gray-800 text-base md:text-lg leading-relaxed space-y-6 mb-12 font-normal tracking-wide">
                        {article.content ? (
                            <p className="whitespace-pre-line text-gray-700">
                                {article.content.replace(/ \[\+\d+ chars\]$/, "")}
                            </p>
                        ) : (
                            <p className="text-gray-400 text-xs font-bold font-mono bg-gray-50 border border-gray-100 p-4 rounded-xl uppercase tracking-wider">
                                [ALERT_PAYLOAD_LIMIT] Content array string truncated by parent host parameters. Click terminal routing button below to download the absolute transmission.
                            </p>
                        )}
                    </div>

                    {/* Rounded Action Nodes */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-6 border-t border-gray-100 font-mono">
                        <button
                            onClick={() => window.open(article.url, "_blank", "noopener,noreferrer")}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-950 hover:bg-gray-800 text-white font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-xl shadow-md transition-all cursor-pointer"
                        >
                            CONNECT ORIGIN HUB →
                        </button>
                        
                        <button
                            onClick={() => navigate("/")}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold uppercase tracking-wider text-xs py-3.5 px-8 rounded-xl transition-all cursor-pointer"
                        >
                            CLOSE FILE
                        </button>
                    </div>

                </article>
            </main>
        </div>
    );
}