import { Avatar, Button, Chip, Divider, Link, TextField } from "@mui/material";
import ValueCounter from "./ValueCounter";
import { imageUpload } from "../service/file";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Typography } from "@mui/material";


const UserProfile = ({ user, isMe, onProfileEdit, onAvatarChange }) => {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Avatar src={user.avatar} sx={{ width: 150, height: 150 }} />
            <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        imageUpload(file).then((res) => {
                            onAvatarChange?.(res.message);
                        }).catch(e => {
                            console.log(e);
                        })
                    }

                }}
                style={{ display: 'none' }}
                id={`avatar-input-${user.id}`}
            />
            {isMe ? <Button>
                <label
                    htmlFor={`avatar-input-${user.id}`}
                >
                    <Box display="flex" flexDirection="row">
                        <FileUploadIcon />
                        <Typography>
                            修改头像
                        </Typography>
                    </Box>
                </label>
            </Button> : ''}
        </div>


        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '80px',
            marginRight: '80px',
            flexGrow: 1,
            gap: 20,
        }}>
            <div style={{ font: '60px bold', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <div>
                    {user.username}
                </div>
                <Chip label={user.isAdmin ? '管理员' : '用户'} color={user.isAdmin ? 'primary' : 'default'} />
            </div>
            <Link>{user.email}</Link>
            <TextField
                variant="outlined"
                contentEditable={false}
                fullWidth
                value={'Better late than never.'}
            />
            <Divider style={{ marginTop: '20px' }} />
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '70%',
                marginTop: '10px',
            }}>
                <ValueCounter value={0} label="关注" />
                <ValueCounter value={0} label="粉丝" />
                <ValueCounter value={user.balance / 100} label="余额" />
                {isMe ? <Button variant="outlined" onClick={() => {
                    onProfileEdit?.();
                }}>编辑资料</Button> : ''}
            </div>
        </div>
    </div>
}
export default UserProfile;
