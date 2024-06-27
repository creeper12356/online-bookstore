import { Table, TableContainer, TableHead, TableCell, TableBody } from "@mui/material";
import OrderTableItem from "./OrderTableItem";

const OrderTable = ({ orders, showUser = false }) => {
    const baseColumns = ['收件人', '电话', '地址', '时间', '总价'];
    const columns = showUser ? ['用户', ...baseColumns] : baseColumns;
    return <TableContainer>
        <Table>
            <TableHead>
                <TableCell />
                {columns.map(column =>
                    <TableCell
                        key={column.id}
                        align="left"
                    >
                        {column}
                    </TableCell>)}
            </TableHead>
            <TableBody>
                {orders.map((order) => <OrderTableItem order={order} showUser={showUser} key={order.id} />)}
            </TableBody>
        </Table>
    </TableContainer>
};

export default OrderTable;