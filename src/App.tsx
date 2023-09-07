import React, { useEffect, useState } from 'react';

import { CreateProductRequestDTO, IdParams, Product } from './types';
import {
  createProduct,
  deleteProduct,
  getProducts,
} from './services/productService';
import ProductsTable from './components/ProductsTable';
import BasePage from './pages/BasePage';
import FabButton from './components/FabButton';
import { GridAddIcon } from '@mui/x-data-grid';
import ProductDialog from './components/ProductDialog';
import { showErrorMessage, showSuccessMessage } from './utils/toast';
import ConfirmationDialog from './components/ConfirmationDialog';

const initialProductData: CreateProductRequestDTO = {
  product: {
    name: '',
    price: 0,
    description: '',
    imageURL: undefined,
  },
  base64ImageString: '',
  filename: 'image',
};

function App() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [initialData, setInitialData] =
    useState<CreateProductRequestDTO>(initialProductData);
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

  const onAccept = async (values: CreateProductRequestDTO) => {
    try {
      await createProduct(values);
      showSuccessMessage('Product created successfully.');
    } catch (error) {
      if (error instanceof Error) {
        showErrorMessage('Failed to create product. ' + error.message);
      } else {
        showErrorMessage('Failed to create product.');
      }
    }

    fetchData();
  };

  const handleDeleteAccept = () => {
    return async () => {
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
    };
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
        data={initialData}
        onAccept={onAccept}
        isOpen={isCreateDialogOpen}
        mode={'create'}
        onClose={async () => {
          setIsCreateDialogOpen(false);
          setInitialData(initialProductData);
        }}
      />

      <ConfirmationDialog
        heading="Confirm Delete"
        acceptButtontext="Delete"
        onAccept={handleDeleteAccept}
        cancelButtonText="Cancel"
        onClose={closeProductDeleteDialog}
        isOpen={productDeleteDialogOptions.isOpen}
        message="Are you sure you want to delete?"
      />
    </>
  );
}

export default App;
