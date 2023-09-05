import React, { useEffect, useState } from 'react';

import { Product } from './types';
import { getProducts } from './services/productService';
import ProductsTable from './components/ProductsTable';
import BasePage from './pages/BasePage';
import FabButton from './components/FabButton';
import { GridAddIcon } from '@mui/x-data-grid';
import ProductDialog from './components/ProductDialog';
import { showErrorMessage } from './utils/toast';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      showErrorMessage('Error fetching products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <BasePage>
        <div>
          <ProductsTable products={products} isLoading={isLoading} />
          <FabButton
            tooltipMessage="Add Product"
            onClick={() => {
              setIsCreateDialogOpen(true);
              fetchData();
            }}
          >
            <GridAddIcon />
          </FabButton>
        </div>
      </BasePage>
      <ProductDialog
        isOpen={isCreateDialogOpen}
        mode={'create'}
        onClose={() => {
          setIsCreateDialogOpen(false);
        }}
      />
    </>
  );
}

export default App;
