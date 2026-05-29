import { useEffect, useState } from 'react';
import { api } from './api';


interface productType {
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  thumbnail: string,
  discountPercentage: number,
  availabilityStatus: string,
  stock: number,
  brand: string,
  rating: number
  shippingInformation: string,
  warrantyInformation: string
}

export default function App() {
  // Aap apna logic, state (like: search state, filtered API data state) yahan add kar sakte hain.
  const [data, setData] = useState<productType[]>([])
  const [search, setSearch] = useState<string>("");
  const [currentPage , setCurrentPage] = useState<number>(1);
  const [itemPerPage , setItemPerPage] = useState<number>(10);

  useEffect(() => {
    const allData = async () => {
      const allData = await api()
      console.log(allData.data.products);
      setData(allData.data.products)
    }
    allData()
  }, [])

  const totalItems = data.length; // totalItems = 30
  const totalPage = Math.ceil(totalItems / itemPerPage); // 30 / 10 = 3

  const startIndex = (currentPage - 1) * itemPerPage; // startIndex = 10
  const endIndex = startIndex + itemPerPage; // 0 + 10 = 10

  // for live search
  let currentProducts = data.filter((product) => {
    return product.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || product.category.toLocaleLowerCase().includes(search.toLocaleLowerCase());
  });   

   currentProducts = currentProducts.slice(startIndex, endIndex);



  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header aur Search Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Product Catalog</h1>
            <p className="mt-1 text-sm text-gray-500">Discover our amazing beauty products</p>
          </div>

          {/* Search Field */}
          <div className="w-full md:w-80 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {/* Search Icon SVG */}
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              onChange={(e) => {
                e.preventDefault()
                setSearch(e.target.value)
                console.log("set search ", search)
              }}
              className="block w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm shadow-sm transition duration-150 ease-in-out"
            // Aap yahan onChange aur value pass kar sakte hain apne logic ke hisab se
            />
          </div>
        </div>

        {/* Product Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col overflow-hidden group"
            >
              {/* Image aur Badge Container */}
              <div className="relative bg-gray-100 pt-[80%] overflow-hidden">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
                {/* Discount Badge */}
                {product.discountPercentage && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                    {product.discountPercentage}% OFF
                  </span>
                )}
                {/* Availability Badge */}
                <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${product.availabilityStatus === "In Stock" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}>
                  {product.availabilityStatus} ({product.stock})
                </span>
              </div>

              {/* Product Info Body */}
              <div className="p-5 flex-1 flex flex-col">
                {/* Brand aur Category */}
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">
                  <span>{product.brand}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded">{product.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 line-clamp-1 group-hover:text-indigo-600 transition-colors duration-200">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
                  {product.description}
                </p>

                {/* Rating & Tags */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {/* Rating Badge */}
                  <div className="flex items-center bg-amber-50 text-amber-700 text-xs font-bold px-2 py-1 rounded border border-amber-200">
                    <svg className="w-3.5 h-3.5 text-amber-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {product.rating}
                  </div>
                  {/* Tags */}
                  {/* {product.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-md font-medium">
                      #{tag}
                    </span>
                  ))} */}
                </div>

                {/* Price, Shipping, & Footer */}
                <div className="mt-5 pt-4 border-t border-gray-100 flex items-end justify-between">
                  <div>
                    <span className="text-xs text-gray-400 block">Price</span>
                    <span className="text-2xl font-black text-gray-900">${product.price}</span>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm px-4 py-2 rounded-xl transition duration-150 shadow-sm hover:shadow ease-in-out">
                    Add to Cart
                  </button>
                </div>

                {/* Meta details (Shipping / Warranty) */}
                <div className="mt-3 flex items-center justify-between text-[11px] text-gray-400 bg-gray-50 p-2 rounded-lg">
                  <span className="flex items-center">
                    🚚 {product.shippingInformation}
                  </span>
                  <span className="flex items-center">
                    🛡️ {product.warrantyInformation}
                  </span>
                </div>

              </div>
            </div>
          ))}

           <div>
                <button disabled={currentPage === 1} onClick={() => { setCurrentPage(value => value - 1) }} className={`ml-1 px-3 py-1 border rounded `}>{"<"}</button>
                {[...Array(totalPage)].map((_, index) => (
                    <button onClick={() => setCurrentPage(index + 1)} className={`ml-1 px-3 py-1 border rounded ${(currentPage === index + 1) ? 'bg-indigo-500 text-white' : 'border-gray-500'}`}>{index + 1}</button>
                ))}
                {/* 3 >= 3 */}
                <button disabled={currentPage >= totalPage} onClick={() => { 
                     setCurrentPage(value => value + 1)
                  
                }} className={`ml-1 px-3 py-1 border rounded `}>{">"}</button>


                <select name="" id="" onChange={(event) => {
                    setItemPerPage(Number(event.target.value));
                    setCurrentPage(1);
                }}  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
        </div>

      </div>
    </div>
  );
}