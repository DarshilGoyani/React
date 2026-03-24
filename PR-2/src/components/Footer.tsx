import React from 'react';

const Footer = () => {
  return (
    <footer className="py-5 bg-bg-footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3 text-dark-sec">About Us</h5>
            <p className="text-p-gray">We provide the best quality products for your daily needs. Visit our store for more details.</p>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-3 text-dark-sec">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none text-dark hover:text-theme-green">Home</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover:text-theme-green">Products</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover:text-theme-green">Contact</a></li>
              <li><a href="#" className="text-decoration-none text-dark hover:text-theme-green">FAQ</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5 className="fw-bold mb-3 text-dark-sec">Newsletter</h5>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="Email address" />
              <button className="btn bg-theme-green text-white hover:bg-hover-green border-0" type="button">Subscribe</button>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p className="mb-0 text-p-gray">&copy; 2026 PR-2 Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
