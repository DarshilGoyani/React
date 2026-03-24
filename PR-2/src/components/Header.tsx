import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header className="w-full text-[14px] bg-white shadow-sm sticky-top">

      {/* Top */}
      <div className="bg-light py-1 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          <p className="mb-0 text-p-gray font-semibold">
            Super Value Deals - Save more with coupons
          </p>

          <div className="d-none d-md-flex align-items-center gap-2">
            <select className="form-select form-select-sm border-0 bg-transparent text-p-gray">
              <option>English</option>
              <option>Deutsch</option>
            </select>
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="py-3 border-bottom">
        <div className="container d-flex justify-content-between align-items-center">

          {/* Logo */}
          <div className="navbar-brand">
             <h2 className="fw-bold mb-0 text-theme-green">FreshCart</h2>
          </div>

          {/* Search */}
          <div className="d-none d-lg-flex align-items-center gap-3 flex-grow-1 mx-5">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search for products"
                className="form-control"
              />
              <button className="btn btn-success bg-theme-green border-0">
                🔍
              </button>
            </div>
          </div>

          {/* Icons */}
          <div className="d-flex align-items-center gap-4">
            
            {/* Wishlist */}
            <div className="position-relative cursor-pointer">
              ❤️
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme-green">
                4
              </span>
            </div>

            {/* User */}
            <button className="btn p-0 border-0" onClick={() => setIsModalOpen(true)}>👤</button>

            {/* Cart */}
            <div className="position-relative cursor-pointer">
              🛒
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-theme-green">
                4
              </span>
            </div>

            {/* Mobile Menu */}
            <button
              className="d-lg-none btn border-0"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="d-none d-lg-block border-bottom bg-white py-2">
        <div className="container d-flex align-items-center">

          {/* Button */}
          <button className="btn bg-theme-green text-white px-4 me-4 border-0">
            All Department
          </button>

          {/* Menu */}
          <ul className="nav font-semibold">
            <li className="nav-item">
              <a className="nav-link text-dark hover-text-theme-green" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark hover-text-theme-green" href="/shop">Shop</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-dark hover-text-theme-green" href="/stores">Stores</a>
            </li>
            <li className="nav-item dropdown">
               <a className="nav-link text-dark hover-text-theme-green dropdown-toggle" href="#">Pages</a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal show d-block" tabIndex={-1} style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold">Sign Up</h5>
                <button type="button" className="btn-close" onClick={() => setIsModalOpen(false)}></button>
              </div>
              <div className="modal-body p-4">
                <form className="d-flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control mb-3"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control mb-3"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control mb-3"
                  />

                  <p className="text-muted small">
                    By Signup, you agree to{" "}
                    <span className="text-theme-green">Terms</span>
                  </p>

                  <button className="btn bg-theme-green text-white w-100 py-2 border-0 mt-2">
                    Sign Up
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;