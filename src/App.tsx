import React, { useEffect, useState } from 'react';

import { Product } from './types';
import { getProducts } from './services/productService';
import ProductsTable from './components/ProductsTable';
import BasePage from './pages/BasePage';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        // Handle errors appropriately
        console.error('Error fetching products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <BasePage>
      <ProductsTable products={products} isLoading={isLoading} />
    </BasePage>
  );
}

export default App;
