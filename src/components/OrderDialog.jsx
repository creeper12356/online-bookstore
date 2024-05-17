import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

const OrderDialog = ({ open, onClose, onSubmit }) => {
    const [receiver, setReceiver] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');

    const handleClose = () => {
        onClose?.();
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <form onSubmit={(e) => {
                    e.preventDefault();
                    onSubmit?.(receiver, address, tel);
                }}>
                    <DialogTitle id="alert-dialog-title">提交订单</DialogTitle>
                    <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                        <TextField required label="收货人" fullWidth value={receiver} onChange={(e) => setReceiver(e.target.value)} />
                        <TextField required label="地址" fullWidth value={address} onChange={(e) => setAddress(e.target.value)} />
                        <TextField required label="电话" fullWidth value={tel} onChange={(e) => setTel(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={handleClose}
                            color="primary"
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            color="primary"
                            autoFocus
                        >
                            提交
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default OrderDialog;
