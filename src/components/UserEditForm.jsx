import { Button, Dialog, DialogActions, TextField, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";

const UserEditForm = ({ user, open, onClose, onSubmit }) => {
    const handleClose = () => {
        onClose?.();
    };
    console.log(user);
    const [localUser, setLocalUser] = useState({});

    useEffect(() =>{
        setLocalUser({username: user.username, email: user.email, avatar: user.avatar});
    }, [user]);

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{ style: { width: '400px', height: '300px' } }}
            >
                <DialogTitle>编辑用户信息</DialogTitle>
                <DialogContent style={{ display: 'flex', flexDirection: 'column', gap: 40, justifyContent: 'flex-end' }}>
                    <TextField required label="用户名" fullWidth value={localUser.username}
                        onChange={(e) => {
                            setLocalUser({ ...localUser, username: e.target.value })
                        }} />
                    <TextField required label="邮箱" fullWidth value={localUser.email}
                        onChange={(e) => {
                            setLocalUser({ ...localUser, email: e.target.value });
                        }} />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleClose}
                        color="primary"
                    >
                        取消
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => { onSubmit?.(localUser); }}
                        autoFocus
                    >
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        </div>);
};
export default UserEditForm;