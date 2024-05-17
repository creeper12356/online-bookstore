import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

export function useErrorHandler() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const messageError = (errorMsg) => {
    setMessage(errorMsg);
    setOpen(true);
  };

  const ErrorSnackbar = () => (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setOpen(false)}
      message={message}
    />
  );

  return [messageError, ErrorSnackbar];
}