import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full text-[14px]">

      {/* Top */}
      <div className="bg-gray-100 py-1">
        <div className="max-w-7xl mx-auto flex justify-between px-4">
          <p className="font-semibold">
            Super Value Deals - Save more with coupons
          </p>

          <div className="hidden md:flex items-center gap-2">
            <img src="/images/english.svg" alt="" className="w-5" />
            <select className="bg-gray-100 border-none outline-none text-gray-600 hover:text-green-600">
              <option>English</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="py-3 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4">

          {/* Logo */}
          <img src="/images/freshcart-logo.svg" className="h-10" />

          {/* Search */}
          <div className="hidden lg:flex items-center gap-2">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border rounded-lg px-3 py-2"
            >
              <input
                type="text"
                placeholder="Search for products"
                className="w-[453px] text-[14px] outline-none"
              />
              <button>
                <i className="ri-search-line"></i>
              </button>
            </form>

            <button className="border px-3 py-2 rounded-lg text-gray-500">
              📍 Location
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            
            {/* Wishlist */}
            <div className="relative">
              ❤️
              <span className="absolute text-[10px] bg-green-600 text-white px-1 rounded-full top-[-2px] right-[12px]">
                4
              </span>
            </div>

            {/* User */}
            <button onClick={() => setIsModalOpen(true)}>👤</button>

            {/* Cart */}
            <div className="relative">
              🛒
              <span className="absolute text-[10px] bg-green-600 text-white px-1 rounded-full top-[-2px] right-[-6px]">
                4
              </span>
            </div>

            {/* Mobile Menu */}
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(true)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="hidden lg:block border-b">
        <div className="max-w-7xl mx-auto flex items-center px-4">

          {/* Button */}
          <button className="px-6 py-2 bg-green-600 text-white rounded mr-6 hover:text-green-200">
            All Department
          </button>

          {/* Menu */}
          <nav className="flex gap-6 font-semibold">

            <div className="group relative">
              <a href="/">Home</a>
            </div>

            <div className="group relative">
              <a href="/shop">Shop</a>
            </div>

            <div className="group relative">
              <a href="/stores">Stores</a>
            </div>

            {/* Mega Menu */}
            <div className="group relative">
              <button className="flex items-center gap-1">
                Mega Menu ⌄
              </button>

              <div className="absolute hidden group-hover:block top-full left-0 w-[800px] bg-white shadow-lg p-6">
                <div className="grid grid-cols-4 gap-4 text-[14px]">

                  <div>
                    <h6 className="text-green-600 font-semibold mb-2">
                      Dairy
                    </h6>
                    <ul>
                      <li className="hover:bg-gray-100 p-1">Butter</li>
                      <li className="hover:bg-gray-100 p-1">Milk</li>
                      <li className="hover:bg-gray-100 p-1">Cheese</li>
                    </ul>
                  </div>

                  <div>
                    <h6 className="text-green-600 font-semibold mb-2">
                      Snacks
                    </h6>
                    <ul>
                      <li className="hover:bg-gray-100 p-1">Noodles</li>
                      <li className="hover:bg-gray-100 p-1">Soup</li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            {/* Submenu */}
            <div className="group relative">
              <button>Pages ⌄</button>

              <div className="absolute hidden group-hover:block top-full bg-white shadow rounded p-2 min-w-[200px]">
                <a className="block px-3 py-1 hover:bg-gray-100">Blog</a>
                <a className="block px-3 py-1 hover:bg-gray-100">About</a>
              </div>
            </div>

          </nav>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">

          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsModalOpen(false)}
          ></div>

          <div className="bg-white p-6 rounded-lg z-10 w-96">

            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Sign Up</h2>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <form className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Name"
                className="border p-2 rounded text-[14px]"
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded text-[14px]"
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded text-[14px]"
              />

              <p className="text-[12px]">
                By Signup, you agree to{" "}
                <span className="text-green-600">Terms</span>
              </p>

              <button className="bg-green-600 text-white py-2 rounded">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;