import { useFormik } from 'formik';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';

import DialogWrapper from '../Dialog';
import { CreateProductRequest } from '../../types';
import { createProductRequestSchema } from '../../schema/productSchema';
import { createProduct } from '../../services/productService';
import { showErrorMessage, showSuccessMessage } from '../../utils/toast';

interface ProductDialogProps {
  isOpen?: boolean;
  mode: 'create' | 'edit' | 'delete';
  data?: CreateProductRequest;
  onClose: () => void;
}

export default function ProductDialog({
  isOpen = false,
  mode = 'create',
  onClose,
  data = {
    name: '',
    price: 0,
    description: '',
    imageURL: '',
  },
}: ProductDialogProps) {
  const formik = useFormik({
    initialValues: data,
    validationSchema: toFormikValidationSchema(createProductRequestSchema),
    onSubmit: async (values) => {
      try {
        createProductRequestSchema.parse(values);
        await createProduct(formik.values);
        showSuccessMessage('Product created successfully.');
      } catch (error) {
        if (error instanceof Error) {
          console.log(values);

          showErrorMessage('Failed to create product. ' + error.message);
        } else {
          showErrorMessage('Failed to create product.');
        }
      } finally {
        onClose();
      }
      formik.resetForm();
    },
  });

  return (
    <DialogWrapper
      open={isOpen}
      onAccept={formik.handleSubmit}
      onClose={onClose}
      heading={mode === 'create' ? 'Create Product' : 'Update Product'}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="false">
        <Box className={'flex flex-col gap-2'}>
          <TextField
            required
            id="name"
            label="Name"
            variant="standard"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.name && formik.touched.name)}
            helperText={formik.errors?.name}
            value={formik.values?.name}
          />
          <TextField
            id="description"
            label="Description"
            variant="standard"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(
              formik.errors.description && formik.touched.description,
            )}
            value={formik.values?.description}
          />
          <TextField
            type="number"
            id="price"
            label="Price"
            required
            variant="standard"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            error={Boolean(formik.errors.price && formik.touched.price)}
            value={formik.values?.price}
          />
        </Box>
      </form>
    </DialogWrapper>
  );
}
