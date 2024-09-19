import React from 'react';
import { Button, Typography, Box, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onClose={onClose} aria-labelledby="confirm-delete-dialog">
      <DialogTitle id="confirm-delete-dialog">
        Confirm Delete
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" align="center">
          Are you sure you want to delete this transaction?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="center" width="100%" mt={2}>
          <Button onClick={onConfirm} variant="contained" color="error">
            Delete
          </Button>
          <Button onClick={onClose} variant="contained" color="primary" sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
