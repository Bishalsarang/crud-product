import React from 'react';

import {
  Dialog,
  Backdrop,
  DialogTitle,
  DialogProps,
  DialogActions,
  DialogContent,
  CircularProgress,
} from '@mui/material';

import Button from '../Button';

/**
 * Represents the properties of the DialogWrapper component.
 *
 * @interface DialogWrapperProps
 * @extends {DialogProps}
 */
interface DialogWrapperProps extends DialogProps {
  /**
   * Indicates whether the dialog is open.
   *
   * @type {boolean}
   */
  open: boolean;

  /**
   * The heading of the dialog.
   *
   * @type {string}
   */
  heading: string;

  /**
   * The onClose handler for the dialog.
   *
   * @type {(() => void | undefined)}
   */
  onClose?: () => void;

  /**
   * The onAccept handler for the dialog.
   *
   * @type {(() => void | undefined)}
   */
  onAccept?: () => void;

  /**
   * The text for the accept button of the dialog.
   *
   * @type {(string | undefined)}
   */
  acceptButtonText?: string;

  /**
   * The boolean whether the accept button is disabled.
   *
   * @type {boolean}
   */
  isAccceptButtonDisabled?: boolean;

  /**
   * The text for the cancel button of the dialog.
   *
   * @type {(string | undefined)}
   */
  cancelButtonText?: string;

  /**
   * The children of the DialogWrapper component.
   *
   * @type {React.ReactNode}
   */
  children: React.ReactNode;

  /**
   * The loading state of dialog.
   *
   * @type {boolean}
   */
  isLoading?: boolean;
}

export function DialogWrapper({
  heading,
  onClose,
  onAccept,
  children,
  open = false,
  isLoading = false,
  cancelButtonText = 'Cancel',
  acceptButtonText = 'Accept',
  isAccceptButtonDisabled = false,
  ...rest
}: DialogWrapperProps) {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      data-testid="dialog"
      {...rest}
    >
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Backdrop
            open
            data-testid="loading-spinner"
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        {children}
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          variant="outlined"
          onClick={onClose}
          label={cancelButtonText}
        ></Button>
        <Button
          color="primary"
          onClick={onAccept}
          label={acceptButtonText}
          isDisabled={isAccceptButtonDisabled}
        ></Button>
      </DialogActions>
    </Dialog>
  );
}
