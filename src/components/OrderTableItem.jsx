import { TableHead, TableCell, TableBody, List, ListItem, ListItemText, TableRow, Collapse, Button, SpeedDial, SpeedDialIcon, Fab, Box, Divider, Typography, Link } from "@mui/material";
import { useState } from "react";
import React from "react";


const OrderTableItem = ({ order }) => {
    const [collapseOpen, setCollapseOpen] = useState(false);

    return <>
        <TableRow>
            <TableCell>
                <Fab size="small" onClick={() => { setCollapseOpen(!collapseOpen); }}>+</Fab>
            </TableCell>
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
        </TableRow>
        <TableCell colSpan={5}>
            <Collapse in={collapseOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding> {
                order.books.map(
                    book => (
                        <React.Fragment key={book.id}>
                            <ListItem style={{ display: 'flex', flexDirection: 'row', gap: 20}}>
                                <div>
                                    <img src={book.cover} alt={book.title} style={{width: 150}}/>
                                </div>
                                <Typography variant="h6" color="darkblue">
                                    <Link
                                    href={`/book/${book.bookId}`}
                                    style={{textDecoration: 'none'}}
                                >
                                    { book.title }
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