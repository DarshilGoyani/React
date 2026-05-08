import axios from "axios";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRightLeft, Loader2, ChevronDown, Search, Check, Copy, CheckCircle2, Languages } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" }, { code: "gu", name: "Gujarati" }, { code: "hi", name: "Hindi" },
  { code: "fr", name: "French" }, { code: "de", name: "German" }, { code: "ja", name: "Japanese" },
  { code: "es", name: "Spanish" }, { code: "ru", name: "Russian" }, { code: "zh", name: "Chinese" },
  { code: "it", name: "Italian" }, { code: "ko", name: "Korean" }, { code: "pt", name: "Portuguese" },
  { code: "ar", name: "Arabic" }, { code: "bn", name: "Bengali" }, { code: "pa", name: "Punjabi" }
].sort((a, b) => a.name.localeCompare(b.name));

// --- CLEAN SEARCH OVERLAY ---
const LanguageSearch = ({ value, onChange, isOpen, onClose }: any) => {
  const [search, setSearch] = useState("");
  const filtered = LANGUAGES.filter(l => l.name.toLowerCase().includes(search.toLowerCase()));

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.15 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-100 flex items-center gap-3">
              <Search className="text-zinc-400" size={20} />
              <input 
                autoFocus placeholder="Search language..." 
                className="w-full text-lg outline-none bg-transparent text-zinc-800 placeholder-zinc-400"
                value={search} onChange={(e) => setSearch(e.target.value)}
              />
              <button onClick={onClose} className="text-xs font-semibold text-zinc-400 hover:text-zinc-600 px-2 py-1 bg-zinc-100 rounded">ESC</button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <div className="p-4 text-center text-zinc-500 text-sm">No results found</div>
              ) : (
                filtered.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { onChange(lang.code); onClose(); setSearch(""); }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-colors ${value === lang.code ? 'bg-zinc-900 text-white' : 'hover:bg-zinc-100 text-zinc-700'}`}
                  >
                    <span className="font-medium">{lang.name}</span>
                    {value === lang.code && <Check size={18} />}
                  </button>
                ))
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [source, setSource] = useState("en");
  const [target, setTarget] = useState("gu");
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelector, setActiveSelector] = useState<"src" | "tgt" | null>(null);
  const [copied, setCopied] = useState(false);

  const translate = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const res = await axios.post(
        "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        { q: input, source, target },
        { headers: { 
          'x-rapidapi-key': '05802c517cmsh82fe1267dbcad2dp1a8e5ajsneccfe9ce5a26',
          'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
          'Content-Type': 'application/json' 
        }}
      );
      setOutput(res.data.data.translations.translatedText[0]);
    } catch (e) { 
      console.error(e); 
      setOutput("Translation failed. Please try again.");
    } finally { 
      setIsLoading(false); 
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 font-sans relative flex flex-col items-center">
      
      {/* Subtle Dot Pattern Background */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

      <LanguageSearch 
        isOpen={!!activeSelector} 
        value={activeSelector === "src" ? source : target}
        onChange={(val: any) => activeSelector === "src" ? setSource(val) : setTarget(val)}
        onClose={() => setActiveSelector(null)}
      />

      {/* --- MINIMAL HEADER --- */}
      <header className="w-full max-w-6xl px-6 py-8 relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
            <Languages className="text-white" size={18} />
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900">Translate</span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={translate}
            disabled={isLoading || !input.trim()}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-colors"
          >
            {isLoading ? <Loader2 className="animate-spin" size={16} /> : "Translate"}
          </button>
        </div>
      </header>

      {/* --- CORE TRANSLATOR UI --- */}
      <main className="w-full max-w-6xl px-6 flex-1 flex flex-col relative z-10 pb-12">
        
        <div className="w-full flex flex-col lg:flex-row bg-white rounded-3xl shadow-sm border border-zinc-200 overflow-hidden relative">
          
          {/* INPUT SECTION */}
          <div className="flex-1 flex flex-col min-h-[400px] lg:min-h-[500px]">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center">
              <button 
                onClick={() => setActiveSelector("src")}
                className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
              >
                {LANGUAGES.find(l => l.code === source)?.name}
                <ChevronDown size={16} className="text-zinc-400 group-hover:text-zinc-600" />
              </button>
            </div>
            <textarea 
              placeholder="Type your text here..."
              className="w-full flex-1 p-6 bg-transparent border-none outline-none text-xl lg:text-2xl text-zinc-800 placeholder-zinc-300 resize-none leading-relaxed"
              value={input} onChange={(e) => setInput(e.target.value)}
            />
          </div>

          {/* DIVIDER & SWAP BUTTON */}
          <div className="lg:w-px bg-zinc-100 relative flex items-center justify-center h-px w-full lg:h-auto">
             <button 
                onClick={() => { setSource(target); setTarget(source); setInput(output); setOutput(""); }}
                className="absolute z-10 p-3 bg-white border border-zinc-200 rounded-full shadow-sm text-zinc-500 hover:text-zinc-900 hover:shadow-md transition-all active:scale-95"
                title="Swap languages"
              >
                <ArrowRightLeft size={18} className="rotate-90 lg:rotate-0" />
              </button>
          </div>

          {/* OUTPUT SECTION */}
          <div className="flex-1 flex flex-col bg-zinc-50/50 min-h-[400px] lg:min-h-[500px]">
            <div className="px-6 py-4 border-b border-zinc-100 flex items-center justify-between">
              <button 
                onClick={() => setActiveSelector("tgt")}
                className="group flex items-center gap-2 text-zinc-600 hover:text-zinc-900 font-medium transition-colors"
              >
                {LANGUAGES.find(l => l.code === target)?.name}
                <ChevronDown size={16} className="text-zinc-400 group-hover:text-zinc-600" />
              </button>
              <button 
                onClick={handleCopy} 
                className={`p-2 rounded-md transition-colors ${copied ? 'text-emerald-600 bg-emerald-50' : 'text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100'}`}
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
            </div>
            <textarea 
              readOnly 
              placeholder="Translation will appear here..."
              className="w-full flex-1 p-6 bg-transparent border-none outline-none text-xl lg:text-2xl text-zinc-800 placeholder-zinc-300 resize-none leading-relaxed"
              value={output}
            />
          </div>
          
        </div>
      </main>

    </div>
  );
}