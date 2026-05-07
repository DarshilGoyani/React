import axios from "axios";
import { useEffect, useState } from "react";
import { 
  Search, Download, Heart, Image as ImageIcon, Loader2, 
  ZoomIn, TrendingUp, Users, Camera, Sparkles,
  ArrowRight, Filter, X, Clock, Award, Gift, Flame, Eye, Check,
  Info, Bookmark, Share2, ExternalLink, Star, AlertCircle, RefreshCw
} from "lucide-react";

interface WallPaperHit {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  previewURL: string;
  tags: string;
  userImageURL: string;
  user: string;
  type: string;
  views: number;
  downloads: number;
  likes: number;
  comments: number;
  pageURL: string;
}

function App() {
  const [allHits, setAllHits] = useState<WallPaperHit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [query, setQuery] = useState<string>("nature");
  const [selectedImage, setSelectedImage] = useState<WallPaperHit | null>(null);
  const [savedImages, setSavedImages] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("nature");

  const API_KEY = "55711406-4a81dc85524a50a06dd0b252b";

  useEffect(() => {
    fetchWallpapers();
  }, [query]);

  const fetchWallpapers = async () => {
    setLoading(true);
    setError(null);
    
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(query)}&image_type=photo&pretty=true&per_page=60`;

    try {
      const res = await axios.get(url, {
        headers: {
          'Accept': 'application/json',
        },
        timeout: 10000
      });
      
      if (res.status === 200 && res.data && res.data.hits) {
        console.log("Images loaded:", res.data.hits.length);
        setAllHits(res.data.hits);
      } else {
        setAllHits([]);
        setError("No images found. Please try a different search term.");
      }
    } catch (e: any) {
      console.error("Failed to fetch wallpapers:", e);
      setError(e.message || "Failed to fetch images. Please check your internet connection.");
      setAllHits([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      setQuery(search);
      setActiveCategory(search);
      setSearch("");
    }
  };

  const toggleSave = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (savedImages.includes(id)) {
      setSavedImages(savedImages.filter(imgId => imgId !== id));
    } else {
      setSavedImages([...savedImages, id]);
    }
  };

  const categories = [
    { name: "Nature", icon: Sparkles, query: "nature" },
    { name: "Mountains", icon: TrendingUp, query: "mountains" },
    { name: "Ocean", icon: Camera, query: "ocean" },
    { name: "Forest", icon: ImageIcon, query: "forest" },
    { name: "City", icon: Star, query: "city" },
    { name: "Space", icon: Award, query: "space" },
    { name: "Technology", icon: Info, query: "technology" },
    { name: "Animals", icon: Heart, query: "animals" },
    { name: "Food", icon: Gift, query: "food" },
    { name: "Travel", icon: ExternalLink, query: "travel" },
  ];

  const formatNumber = (num: number) => {
    if (!num) return "0";
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Function to get valid image URL
  const getImageUrl = (image: WallPaperHit) => {
    // Try different URL formats that Pixabay provides
    if (image.webformatURL && image.webformatURL.startsWith('https')) {
      return image.webformatURL;
    }
    if (image.previewURL && image.previewURL.startsWith('https')) {
      return image.previewURL;
    }
    if (image.largeImageURL && image.largeImageURL.startsWith('https')) {
      return image.largeImageURL;
    }
    // Fallback to a default placeholder
    return `https://picsum.photos/400/300?random=${image.id}`;
  };

  return (
    <div className="min-h-screen bg-white">
      
      {/* Premium Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 group cursor-pointer">
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl p-1.5 transition-transform group-hover:scale-105">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">
                  Pixora<span className="text-gray-400">.</span>
                </span>
                <span className="text-[10px] text-gray-400 block -mt-1">stock photos</span>
              </div>
            </div>
            
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
                <input
                  type="text"
                  placeholder="Search millions of premium photos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all outline-none text-gray-900 text-sm placeholder:text-gray-400"
                />
                {search && (
                  <button 
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-3 h-3 text-gray-400 hover:text-gray-900" />
                  </button>
                )}
              </div>
            </form>

            <div className="flex items-center gap-4">
              <button className="hidden sm:flex text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Explore
              </button>
              <button className="hidden sm:flex text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium">
                Collections
              </button>
              <button className="bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-all hover:shadow-md">
                Upload
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-3 py-1 rounded-full text-sm mb-6 shadow-sm">
              <Sparkles className="w-3 h-3 text-gray-600" />
              <span className="text-gray-600">Free for commercial use</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
              <span className="text-gray-600">No attribution required</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              The best free stock
              <span className="block text-gray-400">photos & videos</span>
            </h1>
            
            <p className="text-gray-500 mb-8 max-w-xl mx-auto text-lg">
              Millions of high-quality images, videos, and music — all completely free.
            </p>
            
            <form onSubmit={handleSearch} className="flex md:hidden">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search images..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-3 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-900 outline-none"
                />
              </div>
            </form>

            <div className="flex justify-center gap-12 mt-12">
              {[
                { value: "4.5M+", label: "Stock photos", icon: Camera },
                { value: "2M+", label: "Happy users", icon: Users },
                { value: "50M+", label: "Downloads", icon: Download }
              ].map((stat, idx) => (
                <div key={idx} className="text-center group cursor-pointer">
                  <stat.icon className="w-5 h-5 text-gray-400 mx-auto mb-2 group-hover:text-gray-900 transition-colors" />
                  <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Categories Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Popular Categories
              </h2>
              <p className="text-xs text-gray-400 mt-1">Explore trending topics</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-3">
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setQuery(category.query);
                  setActiveCategory(category.query);
                }}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all ${
                  activeCategory === category.query
                    ? 'bg-gray-900 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
              >
                <category.icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                  activeCategory === category.query ? 'text-white' : 'text-gray-500'
                }`} />
                <span className="text-xs font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 capitalize flex items-center gap-2">
              {query}
              <span className="text-sm font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
                {allHits.length} results
              </span>
            </h2>
            <p className="text-sm text-gray-400 mt-1">
              Discover amazing {query} photography
            </p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter className="w-3 h-3" />
              Sort by
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl aspect-[4/3]"></div>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <div className="flex-1 h-3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-32">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <p className="text-gray-700 font-medium mb-2">Unable to load images</p>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={fetchWallpapers}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-all inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Try Again
            </button>
          </div>
        )}

        {/* Image Grid */}
        {!loading && !error && (
          <>
            {allHits.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-700 text-lg mb-2">No results found</p>
                <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                  We couldn't find any images matching "{query}". Try searching for something else!
                </p>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => setQuery("nature")}
                    className="px-5 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800"
                  >
                    Browse Nature
                  </button>
                  <button 
                    onClick={() => setQuery("abstract")}
                    className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                  >
                    Explore Abstract
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                {allHits.map((wallpaper, index) => (
                  <div
                    key={wallpaper.id}
                    className="group relative cursor-pointer animate-fadeInUp"
                    style={{ animationDelay: `${index * 30}ms` }}
                    onClick={() => setSelectedImage(wallpaper)}
                  >
                    <div className="relative overflow-hidden rounded-xl bg-gray-100 aspect-[4/3] shadow-sm hover:shadow-xl transition-shadow duration-300">
                      {/* Direct image with proper URL */}
                      <img
                        src={getImageUrl(wallpaper)}
                        alt={wallpaper.tags}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          // If image fails, try a different URL
                          const target = e.target as HTMLImageElement;
                          if (target.src !== wallpaper.previewURL && wallpaper.previewURL) {
                            target.src = wallpaper.previewURL;
                          } else if (target.src !== `https://picsum.photos/400/300?random=${wallpaper.id}`) {
                            target.src = `https://picsum.photos/400/300?random=${wallpaper.id}`;
                          }
                        }}
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute top-3 right-3 flex gap-2">
                          <button 
                            onClick={(e) => toggleSave(wallpaper.id, e)}
                            className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white transition-all transform hover:scale-110"
                          >
                            {savedImages.includes(wallpaper.id) ? (
                              <Check className="w-3.5 h-3.5 text-green-600" />
                            ) : (
                              <Bookmark className="w-3.5 h-3.5 text-gray-700" />
                            )}
                          </button>
                          <button className="bg-white/90 backdrop-blur-sm p-1.5 rounded-lg hover:bg-white transition-all transform hover:scale-110">
                            <ZoomIn className="w-3.5 h-3.5 text-gray-700" />
                          </button>
                        </div>
                        
                        <div className="absolute bottom-3 left-3 right-3">
                          <a
                            href={wallpaper.largeImageURL}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white text-gray-900 px-3 py-1.5 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 hover:bg-gray-50"
                          >
                            <Download className="w-3 h-3" /> Download HD
                          </a>
                        </div>
                      </div>

                      {/* Stats Badge */}
                      <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-md text-white flex items-center gap-1.5">
                        <Heart className="w-2.5 h-2.5" />
                        <span className="text-xs">{formatNumber(wallpaper.likes)}</span>
                        <span className="w-px h-3 bg-white/30 mx-0.5"></span>
                        <Eye className="w-2.5 h-2.5" />
                        <span className="text-xs">{formatNumber(wallpaper.views)}</span>
                      </div>

                      {/* Free Badge */}
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-1.5 py-0.5 rounded text-[10px] font-semibold">
                        FREE
                      </div>
                    </div>
                    
                    {/* User Info */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img 
                          src={wallpaper.userImageURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(wallpaper.user)}&background=000&color=fff&size=24&bold=true`}
                          className="w-5 h-5 rounded-full ring-1 ring-gray-200"
                          alt={wallpaper.user}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(wallpaper.user)}&background=000&color=fff&size=24&bold=true`;
                          }}
                        />
                        <span className="text-xs text-gray-600 truncate max-w-[120px] font-medium">
                          {wallpaper.user}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-6xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors flex items-center gap-2"
            >
              <X className="w-5 h-5" /> Close
            </button>
            
            <div className="relative rounded-xl overflow-hidden shadow-2xl bg-gray-900">
              <img 
                src={selectedImage.largeImageURL}
                alt={selectedImage.tags}
                className="w-full h-auto max-h-[80vh] object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = selectedImage.webformatURL || selectedImage.previewURL || `https://picsum.photos/800/600?random=${selectedImage.id}`;
                }}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={selectedImage.userImageURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedImage.user)}&background=fff&color=000&size=48&bold=true`}
                      className="w-12 h-12 rounded-full border-2 border-white"
                      alt={selectedImage.user}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedImage.user)}&background=fff&color=000&size=48&bold=true`;
                      }}
                    />
                    <div>
                      <p className="text-white font-semibold text-lg">{selectedImage.user}</p>
                      <p className="text-white/60 text-sm">Photographer</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{formatNumber(selectedImage.likes)}</div>
                      <div className="text-white/50 text-xs">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{formatNumber(selectedImage.downloads)}</div>
                      <div className="text-white/50 text-xs">Downloads</div>
                    </div>
                    <div className="text-center">
                      <div className="text-white font-bold text-lg">{formatNumber(selectedImage.views)}</div>
                      <div className="text-white/50 text-xs">Views</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href={selectedImage.pageURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                      <ExternalLink className="w-4 h-4" /> View Original
                    </a>
                    <a
                      href={selectedImage.largeImageURL}
                      download
                      className="bg-white text-gray-900 px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" /> Download HD
                    </a>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedImage.tags.split(',').slice(0, 5).map((tag, idx) => (
                    <span key={idx} className="text-xs text-white/70 bg-white/10 px-2 py-1 rounded">
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-gray-900 rounded-lg p-1">
                  <ImageIcon className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-bold text-gray-900">Pixora</span>
                  <p className="text-[10px] text-gray-400 -mt-1">premium stock photos</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                Free high-quality stock photos, vectors, videos, and music for all your creative projects.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Explore</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Curated Collections</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Trending Today</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Editor's Choice</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Resources</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Blog & Tutorials</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">API Documentation</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Become a Contributor</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Company</h4>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="hover:text-gray-900 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">Contact Support</li>
                <li className="hover:text-gray-900 cursor-pointer transition-colors">License</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-xs text-gray-400">
              © 2026 Pixora. All images are royalty-free. Powered by Pixabay API.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;