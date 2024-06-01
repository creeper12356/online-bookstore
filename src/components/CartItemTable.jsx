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
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";

const CartItemTable = ({
    cartItemList,
    onCartItemDelete,
    onCartItemNumberChanged,
    onSelectedCartItemListChanged }) => {
    const columns = [
        '书名',
        '数量',
        '价格',
        '操作',
    ];
    const [cartItemWrapperList, setCartItemWrapperList] = useState([]);

    useEffect(() => {
        setCartItemWrapperList(cartItemList.map(cartItem => {
            return { cartItem: cartItem, selected: false };
        }));
    }, [cartItemList]);

    useEffect(() => {
        const selectedCartItemCount = cartItemWrapperList.filter(cartItemWrapper => cartItemWrapper.selected).length;
        const availableCartItemCount = cartItemWrapperList.filter(cartItemWrapper => cartItemWrapper.cartItem.stock).length;
        setTotalChecked(availableCartItemCount && selectedCartItemCount === availableCartItemCount);
        setTotalIndeterminate(selectedCartItemCount && selectedCartItemCount !== availableCartItemCount);

        onSelectedCartItemListChanged(
            cartItemWrapperList
                .filter(cartItemWrapper => cartItemWrapper.selected)
                .map(cartItemWrapper => cartItemWrapper.cartItem));

    }, [cartItemWrapperList]);


    const handleTotalCheckboxChange = () => {
        setCartItemWrapperList(cartItemWrapperList.map(cartItemWrapper => 
            cartItemWrapper.cartItem.stock ? { ...cartItemWrapper, selected: !totalChecked } : cartItemWrapper
        ));
    };
    const handleItemCheckboxChange = (id, selected) => {
        setCartItemWrapperList(cartItemWrapperList.map(cartItemWrapper =>
            cartItemWrapper.cartItem.id === id ?
                { ...cartItemWrapper, selected: selected } :
                cartItemWrapper));
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [totalChecked, setTotalChecked] = useState(false);
    const [totalIndeterminate, setTotalIndeterminate] = useState(false);

    return (
        <>
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
                        {columns.map(column =>
                            <TableCell
                                key={column.id}
                                align="left"
                            >
                                {column}
                            </TableCell>)}
                    </TableHead>
                    <TableBody>
                        {cartItemWrapperList
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((cartItemWrapper) => {
                                return <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            disabled={!cartItemWrapper.cartItem.stock}
                                            checked={cartItemWrapper.selected}
                                            onChange={(_, selected) => {
                                                handleItemCheckboxChange(cartItemWrapper.cartItem.id, selected);
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell align="left">
                                        <Link
                                            href={`/book/${cartItemWrapper.cartItem.bookId}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {cartItemWrapper.cartItem.title}
                                        </Link>
                                    </TableCell>
                                    <TableCell align="left">
                                        <TextField
                                            type="number"
                                            value={ cartItemWrapper.cartItem.number }
                                            disabled={!cartItemWrapper.cartItem.stock}
                                            onChange={(event) => {
                                                let value = event.target.value;
                                                if(value < 1) {
                                                    value = 1;
                                                }
                                                if(value > cartItemWrapper.cartItem.stock) {
                                                    value = cartItemWrapper.cartItem.stock;
                                                }
                                                onCartItemNumberChanged?.(cartItemWrapper.cartItem.id   , value);
                                            }}
                                            InputProps={{
                                                inputProps: { min: 1, max: cartItemWrapper.cartItem.stock, step: 1 }
                                            }} 
                                        />
                                    <Typography variant="body1">
                                        库存: {cartItemWrapper.cartItem.stock}
                                    </Typography>
                                    </TableCell>
                                    <TableCell align="left">
                                        {cartItemWrapper.cartItem.price / 100}
                                    </TableCell>
                                    <TableCell align="left">
                                        <Button
                                            variant="outlined"
                                            onClick={async () => {
                                                await onCartItemDelete(cartItemWrapper.cartItem.id);
                                            }}
                                        >
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
                    setCartItemWrapperList(cartItemWrapperList.map(cartItemWrapper => {
                        return { ...cartItemWrapper, selected: false };
                    }));
                }}
            />
        </>);
};

export default CartItemTable;
