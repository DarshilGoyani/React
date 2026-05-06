import React from 'react';
import { useCart } from '../utils/CartContext';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router';

export default function CartPage() {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
                <div className="bg-gray-100 p-8 rounded-full mb-6">
                    <ShoppingBag size={64} className="text-gray-400" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
                <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added anything to your cart yet. Go back to shop our amazing products!</p>
                <button 
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                    <ArrowLeft size={20} />
                    Back to Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="py-10 px-4 max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
                    <ShoppingBag className="text-indigo-600" size={32} />
                    Shopping Cart
                </h1>
                <button 
                    onClick={clearCart}
                    className="text-red-500 font-bold hover:bg-red-50 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                >
                    <Trash2 size={18} />
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:shadow-md transition-shadow">
                            <div className="h-24 w-24 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden border border-gray-50">
                                <img src={item.p_image} alt={item.p_name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-black uppercase text-indigo-600 tracking-widest">{item.p_category}</span>
                                <h3 className="text-lg font-bold text-gray-900 truncate mb-1">{item.p_name}</h3>
                                <p className="text-xl font-black text-gray-900">₹{item.p_price.toLocaleString()}</p>
                            </div>

                            <div className="flex flex-col items-end gap-3">
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                                >
                                    <Trash2 size={20} />
                                </button>
                                
                                <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="h-8 w-8 flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm rounded-md transition-all"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl shadow-gray-100 sticky top-28">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-50">Order Summary</h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span className="font-bold text-gray-900">₹{cartTotal.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery Fee</span>
                                <span className="text-green-600 font-bold uppercase text-xs tracking-widest">Free</span>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-gray-50 mb-8">
                            <span className="text-lg font-bold text-gray-900">Total Amount</span>
                            <span className="text-2xl font-black text-indigo-600">₹{cartTotal.toLocaleString()}</span>
                        </div>

                        <button className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all">
                            Checkout Now
                        </button>
                        
                        <div className="mt-4 text-center">
                            <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Secure Checkout Powered by Blinkit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
