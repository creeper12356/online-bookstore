import { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";
import { Checkbox, Table, TableBody,TableRow,  TableCell, TableContainer, TableHead, TextField, Button } from "@mui/material";
import { getOrders } from "../service/order";

const OrderPage = () => {
    const fetchAndSetOrders = () => {
        getOrders().then(res => {
            setOrders(res.items);
        }).catch(e => {
            console.log(e);
        })
    }

    const columns = ['收货人', '联系方式', '收货地址', '下单时间'];
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAndSetOrders();
    }, []);

    return (
        <NavigatorIndexContext.Provider value={2}>
            <PrivateLayout>
            <TableContainer>
                <Table>
                  <TableHead>
                      { columns.map(column =>
                          <TableCell
                              key={column.id}
                              align="left"
                          >
                              {column}
                          </TableCell>)}
                  </TableHead>
                  <TableBody>
                      { orders
                          .map((order ) => {
                              return <TableRow>
                                  <TableCell>
                                    {order.receiver}
                                  </TableCell>
                                  <TableCell align="left">
                                    {order.tel}
                                  </TableCell>
                                  <TableCell align="left">
                                    {order.address}
                                  </TableCell>
                                  <TableCell align="left">
                                    {order.time}
                                  </TableCell>
                              </TableRow>;
                          })}
                  </TableBody>
                </Table>
            </TableContainer>
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};
export default OrderPage;