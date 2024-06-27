import { TableCell,  List, ListItem, TableRow, Collapse, Fab, Box, Divider, Typography, Link, Avatar } from "@mui/material";
import { useState } from "react";
import React from "react";
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const OrderTableItem = ({ order, showUser }) => {
    const [collapseOpen, setCollapseOpen] = useState(false);

    return <>
        <TableRow>
            <TableCell>
                <Fab
                    color={collapseOpen ? "primary" : "default"}
                    size="small"
                    onClick={() => { setCollapseOpen(!collapseOpen); }}>
                    {
                        collapseOpen ? "-" : "+"
                    }
                </Fab>
            </TableCell>
            {
                showUser ?
                    <TableCell>
                        <Link href={`/profile/${order.user.id}`} underline="none">
                            <Avatar src={order.user.avatar} />
                            <Typography>
                                {order.user.username}
                            </Typography>
                        </Link>
                    </TableCell>
                    : ''
            }
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
                {/* 将UTC时间转为浏览器本地时间 */}
                {dayjs.utc(order.time).local().format('YYYY-MM-DD HH:mm:ss')}
            </TableCell>
            <TableCell>
                <Typography variant="h6" color="red">{`¥${order.totalPrice / 100} `}</Typography>
            </TableCell>
        </TableRow>
        <TableCell colSpan={6}>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding> {
                    order.books.map(
                        book => (
                            <React.Fragment key={book.id}>
                                <ListItem style={{ display: 'flex', flexDirection: 'row', gap: 20 }}>
                                    <div>
                                        <img src={book.cover} alt={book.title} style={{ width: 150 }} />
                                    </div>
                                    <Typography variant="h6" color="darkblue">
                                        <Link
                                            href={`/book/${book.bookId}`}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            {book.title}
                                        </Link>
                                    </Typography>
                                    <Box flexGrow={1} />
                                    <Typography variant="h6" color="red">{`¥${book.price / 100} `}</Typography>
                                    <Typography variant="body1" color="tomato">{`x${book.number}`}</Typography>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        )
                    )
                }
                </List>
            </Collapse>
        </TableCell>

    </>;
};
export default OrderTableItem;