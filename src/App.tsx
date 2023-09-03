import React, { useEffect, useState } from 'react';

import { Product } from './types';
import { getProducts } from './services/productService';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div>
      <h1>Products</h1>
      {products.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>Price: ${item.price}</p>
          {item.description && <p>Description: {item.description}</p>}
          {item.imageURL && (
            <img
              src={item.imageURL}
              alt={item.name}
              style={{ maxWidth: '100px' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
