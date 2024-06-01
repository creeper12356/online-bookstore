import {Avatar, Button, Divider, Link, TextField} from "@mui/material";
import ValueCounter from "./ValueCounter";

const UserProfile = ({user}) => {
    return <div style={{
        display: 'flex',
        flexDirection: 'row',
    }}>
        <Avatar src="/creeper.png" sx={{width: 150, height: 150}}/>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '80px',
            marginRight: '80px',
            flexGrow: 1,
            gap: 20,
        }}>
            <div style={{font: '60px bold'}}>{user.username}</div>
            <Link>{user.email}</Link>
            <TextField
                variant="outlined"
                contentEditable={false}
                fullWidth
                value={'Better late than never.'}
            />
            <Divider style={{marginTop: '20px'}}/>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '70%',
                marginTop: '10px',
            }}>
                <ValueCounter value={1} label="关注"/>
                <ValueCounter value={0} label="粉丝"/>
                <ValueCounter value={user.balance / 100} label="余额"/>
                <Button variant="outlined">编辑资料</Button>
            </div>
        </div>
    </div>
}
export default UserProfile;
