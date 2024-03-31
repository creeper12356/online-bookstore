import {PrivateLayout} from "../components/Layout";
import {useEffect, useState} from "react";
import {deleteCartItem, getCartItems} from "../service/cart";
import '../css/CartPage.css'
import * as React from 'react';
import {
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";

const columns = [
    '书名',
    '数量',
    '价格',
    '操作',
];

const CartPage = () => {
    const [cartItemList, setCartItemList] = useState([]);
    const getCartItemList = async () => {
        setCartItemList(await getCartItems());
    };
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [selectedItemIndexList, setSelectedItemIndexList] = useState([]);
    const [totalChecked, setTotalChecked] = useState(false);
    const [totalIndeterminate, setTotalIndeterminate] = useState(false);


    useEffect(() => {
        getCartItemList();
    }, []);
    useEffect(() => {
        setTotalChecked(selectedItemIndexList.length === cartItemList.length);
        setTotalIndeterminate(selectedItemIndexList.length && selectedItemIndexList.length !== cartItemList.length);
    }, [cartItemList, selectedItemIndexList]);
    return (
        <PrivateLayout>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableCell padding="checkbox">
                            <Checkbox
                                checked={totalChecked}
                                indeterminate={totalIndeterminate}
                                onChange={() => {
                                    setSelectedItemIndexList(totalChecked ? [] : cartItemList.map((_, index) => index));
                                }}
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
                            .map((cartItem , index)=> {
                            return <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedItemIndexList.some(i => i === index)}
                                        onChange={(_,selected) => {
                                            if (selected) {
                                                setSelectedItemIndexList([...selectedItemIndexList, index]);
                                            }
                                            else {
                                                setSelectedItemIndexList(selectedItemIndexList.filter(i => i !== index));
                                            }
                                    }}
                                    />
                                </TableCell>
                                <TableCell align="left">
                                    { cartItem.book.title}
                                </TableCell>
                                <TableCell align="left">
                                    {cartItem.number}
                                </TableCell>
                                <TableCell align="left">
                                    {cartItem.book.price / 100}
                                </TableCell>
                                <TableCell align="left">
                                    <Button onClick={async () => {
                                        setCartItemList(cartItemList.filter(ci => ci.id !== cartItem.id));
                                        await deleteCartItem(cartItem.id);
                                    }}>删除</Button>
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
                    setSelectedItemIndexList([]);
                }}
            />
            <div>{`总价：${
                selectedItemIndexList
                    .map(index => cartItemList[index].book.price)
                    .reduce((partialSum, a) => partialSum + a, 0) / 100}元`
            }</div>
            <Button>立即下单</Button>
        </PrivateLayout>);
}
export default CartPage;
