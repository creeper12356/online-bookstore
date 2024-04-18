import {PrivateLayout} from "../components/Layout";
import {useEffect, useState} from "react";
import {deleteCartItem, getCartItems} from "../service/cart";
import '../css/CartPage.css'
import React from "react";
import {
    Button,
    Checkbox,
    Link,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {NavigatorIndexContext} from "../lib/Context";

const columns = [
    '书名',
    '数量',
    '价格',
    '操作',
];

const CartPage = () => {
    const [cartItemList, setCartItemList] = useState([]);
    const [selectedCartItemCount, setSelectedCartItemCount] = useState(0);
    const getCartItemList = () => {
        getCartItems()
            .then(res => {setCartItemList(res.map(cartItem => {return {...cartItem, selected: false};}) ); })
            .catch(e => {console.log(e); });
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalChecked, setTotalChecked] = useState(false);
    const [totalIndeterminate, setTotalIndeterminate] = useState(false);


    useEffect(() => {
        getCartItemList();
    }, []);
    useEffect(() => {
        let count = cartItemList.filter(cartItem => cartItem.selected).length;
        setSelectedCartItemCount(count)
        setTotalChecked(cartItemList.length && count === cartItemList.length);
        setTotalIndeterminate(count && count !== cartItemList.length);
    }, [cartItemList]);

    const handleTotalCheckboxChange = () => {
        setCartItemList(cartItemList.map(cartItem => {
            return {...cartItem, selected: !totalChecked};
        }));
    };
    const handleItemCheckboxChange = (id, selected) => {
        setCartItemList(cartItemList.map(cartItem =>
            cartItem.id === id ?
                {...cartItem, selected: selected} :
                cartItem));
    };

    const handleCartItemDelete = async (id) => {
        setCartItemList(cartItemList.filter(cartItem => cartItem.id !== id));
        await deleteCartItem(id);
    };

    return (
        <NavigatorIndexContext.Provider value={1} >
            <PrivateLayout>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={totalChecked}
                                    indeterminate={totalIndeterminate}
                                    onChange={handleTotalCheckboxChange}
                                    disabled={!cartItemList.length}
                                />
                            </TableCell>
                            { columns.map(column =>
                                <TableCell
                                    key={column.id}
                                    align="left"
                                >
                                    {column}
                                </TableCell>)}
                        </TableHead>
                        <TableBody>
                            { cartItemList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((cartItem ) => {
                                    return <TableRow>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={cartItem.selected}
                                                onChange={(_, selected) => {
                                                    handleItemCheckboxChange(cartItem.id, selected);
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell align="left">
                                            <Link
                                                href={`/book/${cartItem.book.id}`}
                                                style={{textDecoration: 'none'}}
                                            >
                                                { cartItem.book.title}
                                            </Link>
                                        </TableCell>
                                        <TableCell align="left">
                                            {cartItem.number}
                                        </TableCell>
                                        <TableCell align="left">
                                            {cartItem.book.price / 100}
                                        </TableCell>
                                        <TableCell align="left">
                                            <Button
                                                variant="outlined"
                                                onClick={async () => {
                                                    await handleCartItemDelete(cartItem.id);
                                            }}>
                                                删除
                                            </Button>
                                        </TableCell>
                                    </TableRow>;
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[2, 10, 20, 50, 100]}
                    component="div"
                    count={cartItemList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={(_, newPage) => {
                        setPage(newPage);
                    }}
                    onRowsPerPageChange={(event) => {
                        setRowsPerPage(event.target.value);
                        setPage(0);
                        setCartItemList(cartItemList.map(cartItem => {
                            return {...cartItem, selected: false};
                        }));
                    }}
                />
                <div>{`总价：${cartItemList
                    .filter(cartItem => cartItem.selected)
                    .map(cartItem => cartItem.book.price)
                    .reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 100}元`
                }</div>
                <Button variant="outlined" disabled={!selectedCartItemCount}>立即下单</Button>
            </PrivateLayout>
        </NavigatorIndexContext.Provider>);
}
export default CartPage;
