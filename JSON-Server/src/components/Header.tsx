import { LayoutGrid, MapPin, PlusCircle, Search, ShoppingCart } from 'lucide-react'
import { NavLink } from 'react-router'
import { useCart } from '../utils/CartContext'

export default function Header() {
  const { cartCount, cartTotal } = useCart();

  return <>
    {/* GLOBAL TOP BAR */}
      <header className="sticky top-0 z-[100] bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 h-20 flex items-center gap-8">
          
          {/* Logo */}
          <NavLink to="/" className="flex-shrink-0">
            <h1 className="text-3xl font-[1000] tracking-tighter text-yellow-400 drop-shadow-sm">
              BLINK<span className="text-gray-900">IT</span><span className="text-green-600 font-black">.</span>
            </h1>
          </NavLink>

          {/* Delivery Location */}
          <div className="hidden lg:flex items-center gap-2 border-l border-gray-200 pl-6 leading-tight">
            <MapPin size={20} className="text-green-600" />
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-tight">Delivery in 8 minutes</span>
              <span className="text-sm font-medium text-gray-500 truncate w-40">Ahmedabad, Gujarat...</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={18} />
            </div>
            <input 
              type="text" 
              placeholder='Search "milk", "bread" or "atta"' 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-12 focus:bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none"
            />
          </div>

          {/* New Action Nav: Add Product & View Product */}
          <div className="flex items-center gap-4">
            <NavLink 
              to="/addProduct" 
              className={({isActive}) => `${isActive? "text-green-600": "text-gray-700"} flex items-center gap-2 font-bold  hover:text-green-600 transition-colors`}
            >
              <PlusCircle size={20} />
              <span>Add Product</span>
            </NavLink>
            
            <NavLink 
              to="/viewProduct" // Ya jo bhi tumhara route hai
              className={({isActive}) => `${isActive? "bg-[#096a18]": "bg-[#0c831f]"}  text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-[#096a18] transition-all font-bold shadow-md`}
            >
              <LayoutGrid size={18} />
              <span>View Products</span>
            </NavLink>

            {/* Cart Button */}
            <NavLink 
              to="/cart"
              className={({isActive}) => `${isActive? "bg-indigo-700": "bg-indigo-600"} text-white px-5 py-2.5 rounded-lg flex items-center gap-3 hover:bg-indigo-700 transition-all font-bold shadow-md relative group`}
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black h-5 w-5 flex items-center justify-center rounded-full border-2 border-indigo-600 group-hover:border-indigo-700">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-start leading-none">
                <span className="text-[10px] opacity-80 uppercase tracking-tighter">My Cart</span>
                {cartCount > 0 ? (
                  <span className="text-sm">₹{cartTotal.toLocaleString()}</span>
                ) : (
                  <span className="text-sm">Empty</span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </header>
  </>
}
