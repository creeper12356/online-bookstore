import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { Slide } from '@mui/material';

export function useOkHandler() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const messageOk = (okMsg) => {
    setMessage(okMsg);
    setOpen(true);
  };

  const OkSnackbar = () => (
    <Snackbar
      open={open}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={() => setOpen(false)}
      message={message}
      TransitionComponent={Slide}
    />
  );

  return [messageOk, OkSnackbar];
}