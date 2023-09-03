import React, { useEffect, useState } from 'react';

import { Product } from './types';
import { getProducts } from './services/productService';
import ProductsTable from './components/ProductsTable';
import BasePage from './pages/BasePage';
import FabButton from './components/FabButton';
import { GridAddIcon } from '@mui/x-data-grid';

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
      <div>
        <ProductsTable products={products} isLoading={isLoading} />
        <FabButton
          tooltipMessage="Add Product"
          onClick={() => {
            console.log('Open dialog to add.');
          }}
        >
          <GridAddIcon />
        </FabButton>
      </div>
    </BasePage>
  );
}

export default App;
