import React from 'react';
import { useFormik } from 'formik';
import { z } from 'zod';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import DialogWrapper from '../Dialog';
import { CreateProductRequestDTO } from '../../types';
import { createProductRequestSchema } from '../../schema/productSchema';
import Button from '../Button';

import { getBase64 } from '../../utils/misc';

interface ProductDialogProps {
  isOpen?: boolean;
  mode: 'create' | 'edit' | 'delete';
  data: CreateProductRequestDTO;
  onClose: () => void;
  onAccept: (values: CreateProductRequestDTO) => void;
}

export default function ProductDialog({
  isOpen = false,
  mode = 'create',
  onClose,
  onAccept,
  data,
}: ProductDialogProps) {
  const formik = useFormik({
    initialValues: data,
    onSubmit: async (values) => {
      try {
        createProductRequestSchema.parse(values.product);
      } catch (error) {
        if (error instanceof z.ZodError) {
          let formikErrors: typeof formik.errors = {};

          error.issues.forEach((issue) => {
            const fieldName = issue.path.join('.');
            formikErrors = {
              ...formik.errors,
              product: {
                ...formikErrors.product,
                [fieldName]: issue.message,
              },
            };
          });

          formik.setErrors(formikErrors);
        }

        return;
      }

      onAccept(values);
      onClose();

      formik.resetForm();
    },
  });

  const { product } = formik.values;

  return (
    <DialogWrapper
      open={isOpen}
      onAccept={formik.handleSubmit}
      onClose={onClose}
      heading={mode === 'create' ? 'Create Product' : 'Update Product'}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="false">
        <Box className="grid" sx={{ gridTemplateColumns: '1fr 2fr' }}>
          <Box>
            <Box
              src={product?.imageURL || './no-image.jpg'}
              component="img"
              className="shadow-lg"
              sx={{ height: '150px', width: 'auto', maxWidth: '150px' }}
            />
            <Button variant="contained" label="Upload Image">
              <input
                hidden
                type="file"
                accept=".*"
                onBlur={formik.handleBlur}
                onChange={async (
                  event: React.ChangeEvent<HTMLInputElement>,
                ) => {
                  const selectedFile = event.target.files?.[0];
                  if (selectedFile) {
                    const base64Content = await getBase64(selectedFile);
                    const base64 = base64Content.split(',')[1];
                    const url = URL.createObjectURL(selectedFile);
                    await formik.setFieldValue('product.imageURL', url);
                    await formik.setFieldValue('base64ImageString', base64);
                  }
                }}
              />
            </Button>
          </Box>
          <Box className="flex flex-col gap-2">
            <TextField
              required
              id="name"
              label="Name"
              variant="standard"
              name="product.name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(
                formik.errors.product?.name && formik.touched.product?.name,
              )}
              helperText={formik.errors.product?.name}
              value={product?.name}
            />
            <TextField
              id="description"
              label="Description"
              variant="standard"
              multiline
              name="product.description"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(
                formik.errors.product?.description &&
                  formik.touched.product?.description,
              )}
              value={product?.description}
            />
            <TextField
              type="number"
              id="price"
              name="product.price"
              label="Price"
              required
              variant="standard"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              error={Boolean(
                formik.errors.product?.price && formik.touched.product?.price,
              )}
              value={formik.values?.product?.price}
            />
          </Box>
        </Box>
      </form>
    </DialogWrapper>
  );
}
