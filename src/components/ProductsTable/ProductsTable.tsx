import React, { useMemo } from 'react';

import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Product } from '../../types';

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductsTable({
  products = [],
  isLoading = false,
}: ProductsTableProps) {
  const columns: GridColDef<Product>[] = [
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
    {
      field: 'imageURL',
      headerName: 'Image',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <img
          src={params.value}
          alt="Product"
          style={{ width: '100%', height: '100%' }}
        />
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        loading={isLoading}
        columns={columns}
        density={'compact'}
      />
    </div>
  );
}
