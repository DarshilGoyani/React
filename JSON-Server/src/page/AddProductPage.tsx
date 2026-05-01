import { PackagePlus, ImageIcon, Tag, IndianRupee } from "lucide-react";

export default function AddProduct() {
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
        {/* Header - Simple & Clean */}
        <div className="px-8 py-8 border-b border-gray-50">
          <h2 className="text-2xl font-[900] text-gray-900 flex items-center gap-3">
            <PackagePlus className="text-[#0c831f]" size={28} />
            Add New Item
          </h2>
          <p className="text-gray-500 font-medium mt-1">Fill in the details to list your product on the store.</p>
        </div>
        
        <form className="p-8 space-y-5">
          {/* Product Name */}
          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2 tracking-wider">
              <Tag size={14} /> Product Name
            </label>
            <input 
              type="text" 
              placeholder='e.g. Amul Taaza Milk' 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 focus:bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none font-medium" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2 tracking-wider">
                <IndianRupee size={14} /> Price
              </label>
              <input 
                type="number" 
                placeholder="0.00" 
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 focus:bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none font-medium" 
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-400 mb-2 tracking-wider">Category</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 focus:bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none font-medium appearance-none">
                <option>Dairy, Bread & Eggs</option>
                <option>Fruits & Vegetables</option>
                <option>Cold Drinks & Juices</option>
                <option>Snacks & Munchies</option>
              </select>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-xs font-black uppercase text-gray-400 mb-2 tracking-wider">
              <ImageIcon size={14} /> Image URL
            </label>
            <input 
              type="url" 
              placeholder="Paste image link here..." 
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3.5 px-4 focus:bg-white focus:ring-2 focus:ring-yellow-400 transition-all outline-none font-medium" 
            />
          </div>

          <div className="pt-4">
            <button className="w-full py-4 bg-[#0c831f] text-white rounded-xl font-black text-lg hover:bg-[#096a18] transition-all shadow-lg shadow-green-100 flex items-center justify-center gap-2">
              Add to Inventory
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}