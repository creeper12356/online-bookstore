import { Avatar, Link, Typography } from "@mui/material";

const UserBriefBox = ({ user }) => {
    return <Link href={`/profile/${user.id}`} underline="none">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Avatar src={user.avatar} />
            <Typography>{user.username}</Typography>
        </div>
    </Link>
};
export default UserBriefBox;