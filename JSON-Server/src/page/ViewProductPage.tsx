import { Edit3, Trash2, IndianRupee } from "lucide-react";

const SAMPLE_PRODUCTS = [
  { id: 1, name: "Amul Taaza Milk", price: 27, weight: "500 ml", img: "https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_1280.jpg" },
  { id: 2, name: "Fresh Bananas", price: 40, weight: "1 kg", img: "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg" },
];

export default function ViewProducts() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-black text-gray-900">All Products</h2>
        <span className="bg-gray-100 text-gray-600 px-4 py-1 rounded-full text-sm font-bold">
          {SAMPLE_PRODUCTS.length} Items
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {SAMPLE_PRODUCTS.map((product) => (
          <div key={product.id} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all group">
            {/* Image Container */}
            <div className="h-40 bg-gray-50 rounded-xl mb-3 overflow-hidden relative">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-white rounded-full shadow-md text-blue-600 hover:bg-blue-50">
                  <Edit3 size={16} />
                </button>
                <button className="p-2 bg-white rounded-full shadow-md text-red-600 hover:bg-red-50">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">{product.weight}</span>
              <h3 className="font-bold text-gray-800 text-sm leading-tight h-10 line-clamp-2">{product.name}</h3>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center font-black text-sm text-gray-900">
                  <IndianRupee size={12} />
                  {product.price}
                </div>
                <button className="text-[#0c831f] border border-[#0c831f] px-4 py-1 rounded-lg text-xs font-black hover:bg-[#0c831f] hover:text-white transition-colors uppercase">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}