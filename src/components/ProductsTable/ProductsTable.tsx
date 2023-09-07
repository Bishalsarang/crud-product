import React, { useMemo } from 'react';
import { MdDelete } from 'react-icons/md';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Product } from '../../types';
import ThreeDotMenu from '../ThreeDotMenu';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onDeleteProduct: (id: string) => void;
}

export default function ProductsTable({
  products = [],
  isLoading = false,
  onDeleteProduct,
}: ProductsTableProps) {
  const columns: GridColDef<Product>[] = useMemo(() => {
    return [
      {
        field: 'actions',
        headerName: '',
        type: 'actions',
        width: 20,
        headerClassName: 'tes',

        renderCell(params) {
          return (
            <ThreeDotMenu
              menuItems={[
                {
                  label: 'Delete',
                  icon: <MdDelete size={24} />,
                  onClick: () => {
                    onDeleteProduct(params.row.id);
                  },
                },
              ]}
            />
          );
        },
      },
      {
        field: 'imageURL',
        headerName: 'Image',
        width: 100,
        sortable: false,
        renderCell: (params) => (
          <img
            src={params.value || './no-image.jpg'}
            alt="Product"
            style={{ width: '100%', height: '100%' }}
          />
        ),
      },
      {
        field: 'name',
        headerName: 'Name',
        width: 200,
        sortable: true,
      },
      {
        field: 'price',
        headerName: 'Price',
        width: 120,
        sortable: true,
      },
      {
        field: 'id',
        headerName: 'ID',
        width: 150,
        sortable: true,
      },
      {
        field: 'description',
        headerName: 'Description',
        width: 300,
        sortable: false,
      },
    ];
  }, [onDeleteProduct]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        loading={isLoading}
        columns={columns}
        density="comfortable"
      />
    </div>
  );
}
