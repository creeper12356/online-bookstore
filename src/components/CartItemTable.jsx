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
import React, {useEffect, useState} from "react";

const CartItemTable = ({ cartItemList, onCartItemDelete, onSelectedCartItemListChanged }) => {
    const columns = [
        '书名',
        '数量',
        '价格',
        '操作',
    ];
    const [cartItemWrapperList, setCartItemWrapperList] = useState([]);

    useEffect(() => {
        setCartItemWrapperList(cartItemList.map(cartItem => {
            return {cartItem: cartItem, selected: false};
        }));
    }, [cartItemList]);

    useEffect(() => {
        let count = cartItemWrapperList.filter(cartItemWrapper => cartItemWrapper.selected).length;
        setTotalChecked(cartItemWrapperList.length && count === cartItemWrapperList.length);
        setTotalIndeterminate(count && count !== cartItemWrapperList.length);

        onSelectedCartItemListChanged(
            cartItemWrapperList
                .filter(cartItemWrapper => cartItemWrapper.selected)
                .map(cartItemWrapper => cartItemWrapper.cartItem));

    }, [cartItemWrapperList]);


    const handleTotalCheckboxChange = () => {
        setCartItemWrapperList(cartItemWrapperList.map(cartItemWrapper => {
            return {...cartItemWrapper, selected: !totalChecked};
        }));
    };
    const handleItemCheckboxChange = (id, selected) => {
        setCartItemWrapperList(cartItemWrapperList.map(cartItemWrapper =>
            cartItemWrapper.cartItem.id === id ?
                {...cartItemWrapper, selected: selected} :
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
                      { columns.map(column =>
                          <TableCell
                              key={column.id}
                              align="left"
                          >
                              {column}
                          </TableCell>)}
                  </TableHead>
                  <TableBody>
                      { cartItemWrapperList
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((cartItemWrapper ) => {
                              return <TableRow>
                                  <TableCell padding="checkbox">
                                      <Checkbox
                                          checked={cartItemWrapper.selected}
                                          onChange={(_, selected) => {
                                              handleItemCheckboxChange(cartItemWrapper.cartItem.id, selected);
                                          }}
                                      />
                                  </TableCell>
                                  <TableCell align="left">
                                      <Link
                                          href={`/book/${cartItemWrapper.cartItem.book.id}`}
                                          style={{textDecoration: 'none'}}
                                      >
                                          { cartItemWrapper.cartItem.book.title}
                                      </Link>
                                  </TableCell>
                                  <TableCell align="left">
                                      {cartItemWrapper.cartItem.number}
                                  </TableCell>
                                  <TableCell align="left">
                                      {cartItemWrapper.cartItem.book.price / 100}
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
                        return {...cartItemWrapper, selected: false };
                    }));
                }}
            />
        </>);
};

export default CartItemTable;
