import { Table, TableBody, TableCell, TableContainer, TableHead } from "@mui/material";
import UserTableItem from "./UserTableItem";

const UserTable = ({ users }) => {
    const columns = ['ID', '用户名', 'email', '余额', '身份', '状态'];
    return <TableContainer>
        <Table>
            <TableHead>
                {columns.map(column =>
                    <TableCell
                        key={column.id}
                        align="left"
                    >
                        {column}
                    </TableCell>)}
            </TableHead>
            <TableBody>
                {users.map((user) => <UserTableItem user={user} key={user.id}/>)}
            </TableBody>
        </Table>
    </TableContainer>
};
export default UserTable;