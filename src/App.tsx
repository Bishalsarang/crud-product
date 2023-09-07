import React, { useEffect, useState } from 'react';

import { IdParams, Product } from './types';
import { deleteProduct, getProducts } from './services/productService';
import ProductsTable from './components/ProductsTable';
import BasePage from './pages/BasePage';
import FabButton from './components/FabButton';
import { GridAddIcon } from '@mui/x-data-grid';
import ProductDialog from './components/ProductDialog';
import { showErrorMessage, showSuccessMessage } from './utils/toast';
import ConfirmationDialog from './components/ConfirmationDialog';

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [productDeleteDialogOptions, setProductDeleteDialogOptions] = useState<{
    data: IdParams;
    isOpen: boolean;
  }>({
    isOpen: false,
    data: {
      id: '',
    },
  });

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

  const openProductDeleteDialog = (id: string) => {
    setProductDeleteDialogOptions({
      isOpen: true,
      data: { id },
    });
  };

  const closeProductDeleteDialog = () => {
    setProductDeleteDialogOptions({
      isOpen: false,
      data: { id: '' },
    });
  };

  return (
    <>
      <BasePage>
        <div>
          <ProductsTable
            products={products}
            isLoading={isLoading}
            onDeleteProduct={openProductDeleteDialog}
          />
          <FabButton
            tooltipMessage="Add Product"
            onClick={() => {
              setIsCreateDialogOpen(true);
            }}
          >
            <GridAddIcon />
          </FabButton>
        </div>
      </BasePage>
      <ProductDialog
        isOpen={isCreateDialogOpen}
        mode={'create'}
        onClose={async () => {
          setIsCreateDialogOpen(false);
          await fetchData();
        }}
      />

      <ConfirmationDialog
        heading="Confirm Delete"
        acceptButtontext="Delete"
        onAccept={async () => {
          try {
            await deleteProduct(productDeleteDialogOptions.data.id);
            showSuccessMessage(
              `Product with id ${productDeleteDialogOptions.data.id} deleted successfully.`,
            );
            await fetchData();
          } catch (error) {
            if (error instanceof Error) {
              showErrorMessage(
                `Failed to delete with product id ${productDeleteDialogOptions.data.id} ${error.message}`,
              );
            }
          } finally {
            closeProductDeleteDialog();
          }
        }}
        cancelButtonText="Cancel"
        onClose={closeProductDeleteDialog}
        isOpen={productDeleteDialogOptions.isOpen}
        message="Are you sure you want to delete?"
      />
    </>
  );
}

export default App;
