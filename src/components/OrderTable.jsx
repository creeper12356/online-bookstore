import { Table, TableContainer, TableHead, TableCell, TableBody } from "@mui/material";
import OrderTableItem from "./OrderTableItem";

const OrderTable = ({orders}) => {
    const columns = ['收货人', '联系方式', '收货地址', '下单时间'];
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
                {orders.map((order) => <OrderTableItem order={order} key={order.id}/>)}
            </TableBody>
        </Table>
    </TableContainer>
};

export default OrderTable;