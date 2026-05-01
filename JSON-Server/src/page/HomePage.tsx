import { ShoppingBag } from "lucide-react";

// Robust links from a different provider (Pexels/via.placeholder)
const CATEGORIES = [
  { 
    id: 1, 
    name: "Dairy, Bread & Eggs", 
    img: "https://cdn.pixabay.com/photo/2017/07/05/15/41/milk-2474993_1280.jpg" 
  },
  { 
    id: 2, 
    name: "Fruits & Vegetables", 
    img: "https://cdn.pixabay.com/photo/2017/10/09/19/29/eat-2834549_1280.jpg" 
  },
  { 
    id: 3, 
    name: "Cold Drinks & Juices", 
    img: "https://cdn.pixabay.com/photo/2018/02/25/07/15/food-3179853_1280.jpg" 
  },
  { 
    id: 4, 
    name: "Snacks & Munchies", 
    img: "https://cdn.pixabay.com/photo/2016/09/01/19/23/chips-1637305_1280.jpg" 
  },
];

export default function HomePage() {
  return (
    <div className="p-6">
      {/* Banner Section */}
      <div className="w-full h-[300px] bg-[#F7EFCF] rounded-3xl mb-10 overflow-hidden flex items-center justify-between px-12 border border-yellow-100">
        <div>
          <h2 className="text-4xl font-black mb-4">Superfast Delivery <br /> in <span className="text-green-700">10 Minutes</span></h2>
          <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all">Shop Now</button>
        </div>
        <img 
          src="https://cdn.pixabay.com/photo/2016/04/12/21/13/shoppings-1325413_1280.jpg" 
          alt="Grocery Delivery"
          className="h-64 w-64 object-cover rounded-2xl shadow-2xl rotate-3"
          onError={(e) => {
             console.error("Banner Image Load Failed");
             (e.target as HTMLImageElement).src = 'https://via.placeholder.com/500x300?text=Blinkit+Banner';
          }}
        />
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.id} className="group cursor-pointer">
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm group-hover:shadow-md transition-all">
              <div className="h-40 overflow-hidden rounded-xl mb-4 bg-gray-100">
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onLoad={() => console.log(`${cat.name} loaded`)}
                  onError={(e) => {
                    console.error(`${cat.name} failed to load`);
                    (e.target as HTMLImageElement).src = `https://via.placeholder.com/300?text=${cat.name}`;
                  }}
                />
              </div>
              <h3 className="font-bold text-center group-hover:text-green-600 transition-colors">{cat.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}