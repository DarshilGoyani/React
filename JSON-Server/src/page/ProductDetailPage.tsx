import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; 
import { fetchSingleProduct } from "../services/ProductService";
import type { productFetchType } from "../utils/global";

export default function ProductDetailPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [productData, setProductData] = useState<productFetchType | null>(null);

    useEffect(() => {
        if (productId) {
            getSingleProduct();
        }
    }, [productId]); 

    const getSingleProduct = async () => {
        const data = await fetchSingleProduct(productId || "");
        setProductData(data);
    };

    if (!productData) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
            {/* Navigation & Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 flex items-center text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Back to Products
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Left Column: Image Gallery View */}
                <div className="relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50">
                    <img
                        src={productData.p_image}
                        alt={productData.p_name}
                        className="w-full h-auto object-cover min-h-[400px] max-h-[600px]"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                            {productData.p_category}
                        </span>
                    </div>
                </div>

                {/* Right Column: Product Info */}
                <div className="flex flex-col space-y-6">
                    <div className="border-b border-slate-100 pb-6">
                        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight">
                            {productData.p_name}
                        </h1>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-3xl font-black text-indigo-600">
                                ₹{Number(productData.p_price).toLocaleString()}
                            </span>
                            <span className={`px-3 py-1 rounded-md text-sm font-bold ${productData.p_stock > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                }`}>
                                {productData.p_stock > 0 ? `In Stock: ${productData.p_stock}` : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Description</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {productData.p_description}
                        </p>
                    </div>

                    {/* Action Area */}
                    <div className="pt-6 space-y-4">
                        <div className="flex gap-4">
                            <button className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-100 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Add to Cart
                            </button>
                            <button className="p-4 bg-slate-50 border border-slate-200 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>

                        <p className="text-center text-xs text-slate-400">
                            Free shipping on orders over ₹1,000 • Secure Payment Guarantee
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
