import { Chip, TableCell, TableRow, Link, Typography, Avatar } from "@mui/material";
import React from "react";

const UserTableItem = ({ user }) => {
    return <>
        <TableRow>
            <TableCell>
                {user.id}
            </TableCell>
            <TableCell align="left">
                <Link href={`/profile/${user.id}`} underline="none">
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Avatar src={user.avatar} />
                        <Typography>{user.username}</Typography>
                    </div>

                </Link>
            </TableCell>
            <TableCell align="left">
                {user.email}
            </TableCell>
            <TableCell>
                {`¥${user.balance / 100}`}
            </TableCell>
            <TableCell>
                {
                    <Chip label={user.isAdmin ? '管理员' : '用户'} color={user.isAdmin ? 'primary' : 'default'} />
                }
            </TableCell>
            <TableCell>
                {
                    user.isBanned ? <Chip label="封禁中" color="error" /> : <Chip label="正常" color="primary" />
                }
            </TableCell>
        </TableRow>
    </>;
};
export default UserTableItem;