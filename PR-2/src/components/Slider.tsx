import React from 'react';

const Slider = () => {
  return (
    <section className="py-5 custom-slider bg-light overflow-hidden">
      <div className="container">
        <div className="row align-items-center g-5">
          <div className="col-md-6 animate-fade-in">
            <span className="badge bg-theme-green mb-3 px-3 py-2">Exclusive Offer</span>
            <h1 className="display-3 fw-bold text-dark-sec mb-4 leading-tight">
              Fresh Foods, <br />
              <span className="text-theme-green">Delivered Fast.</span>
            </h1>
            <p className="lead text-p-gray mb-5">
              Experience the finest selection of organic products delivered right to your doorstep. Quality you can trust, prices you'll love.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-lg bg-theme-green px-4 py-3 border-0 shadow-sm hover-up">
                Shop Now 🛍️
              </button>
              <button className="btn btn-lg btn-outline-dark px-4 py-3 border-2 hover-up">
                View Menu
              </button>
            </div>
          </div>
          <div className="col-md-6 position-relative text-center">
            <div className="slider-bg-blob position-absolute top-50 start-50 translate-middle"></div>
            <img 
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000" 
              alt="Fresh Vegetables" 
              className="img-fluid rounded-4 shadow-lg position-relative z-1 img-hover" 
              style={{maxHeight: '450px', objectFit: 'cover'}}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slider;
