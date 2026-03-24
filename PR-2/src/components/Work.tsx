import React from 'react';

const Work = () => {
  const products = [
    { 
      id: 1, 
      name: 'Organic Bananas', 
      price: '$4.99', 
      oldPrice: '$6.99',
      img: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=400',
      tag: 'Organic'
    },
    { 
      id: 2, 
      name: 'Red Strawberries', 
      price: '$12.00', 
      oldPrice: '$15.00',
      img: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&q=80&w=400',
      tag: 'Fresh'
    },
    { 
      id: 3, 
      name: 'Green Bell Peppers', 
      price: '$3.50', 
      oldPrice: '$5.00',
      img: 'https://imgs.search.brave.com/R00hOwl6ycJFweRtwRh8sPHoFsnYEU8XBz7O-qRdlic/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGFzdGVvZmhvbWUu/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzA5L0dldHR5/SW1hZ2VzLTIxNjcy/OTk4MDItZTE3MjY0/OTAwNTAyOTEuanBn',
      tag: 'Veggies'
    },
    { 
      id: 4, 
      name: 'Organic Milk', 
      price: '$8.25', 
      oldPrice: '$10.00',
      img: 'https://imgs.search.brave.com/KKj_bgMWD4FFDkx7H23IGvvI4bf0lw-N8dyNc_aoYaM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90aHJl/ZS1zbWFsbC1ib3R0/bGVzLW1pbGstbWVh/ZG93LWNvdy01MjYw/ODI2OC5qcGc',
      tag: 'Dairy'
    },
  ];

  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="container">
        <div className="d-flex justify-content-between align-items-end mb-5">
          <div>
            <span className="text-theme-green fw-bold text-uppercase small tracking-wider">Our Shop</span>
            <h2 className="display-5 fw-bold text-dark-sec mb-0">Featured Products</h2>
          </div>
          <button className="btn btn-link text-theme-green fw-bold text-decoration-none hover-underline">
            View All Products →
          </button>
        </div>
        
        <div className="row g-4">
          {products.map(product => (
            <div key={product.id} className="col-md-3">
              <div className="card h-100 border-0 shadow-sm custom-card rounded-4 p-2">
                <div className="position-relative overflow-hidden rounded-4">
                  <span className="position-absolute top-0 start-0 m-3 badge bg-theme-green z-2 px-3 py-2">
                    {product.tag}
                  </span>
                  <img src={product.img} className="card-img-top img-hover rounded-4" alt={product.name} style={{height: '220px', objectFit: 'cover'}} />
                  <div className="card-overlay position-absolute bottom-0 start-0 w-100 p-3 z-2 d-flex justify-content-center opacity-0 transition-3">
                     <button className="btn btn-light rounded-circle shadow mx-1">🛒</button>
                     <button className="btn btn-light rounded-circle shadow mx-1">❤️</button>
                  </div>
                </div>
                <div className="card-body px-3 pt-4 pb-3">
                  <h5 className="card-title fw-bold text-dark mb-1 h6">{product.name}</h5>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-theme-green fw-bold fs-5">{product.price}</span>
                    <span className="text-muted text-decoration-line-through small">{product.oldPrice}</span>
                  </div>
                  <button className="btn bg-theme-green w-100 rounded-pill py-2 fw-bold text-white transition-all hover-shadow">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
