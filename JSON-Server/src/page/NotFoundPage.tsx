// NotFoundPage.tsx
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="relative">
        <div className="text-9xl font-black text-gray-200 mb-4 relative z-0">404</div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-yellow-400 rounded-full opacity-20 blur-2xl"></div>
        </div>
      </div>
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Lost in the aisles?</h2>
        <p className="text-gray-500 mb-8 max-w-xs">We couldn't find the page you're looking for. Let's get you back home.</p>
        <button 
          onClick={() => navigate("/")}
          className="px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg shadow-green-200"
        >
          🏠 Take Me Home
        </button>
      </div>
    </div>
  );
}