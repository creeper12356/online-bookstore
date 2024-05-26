import { Table, TableHead, TableCell, TableBody, List, ListItem, ListItemText, TableRow, Collapse, Button, SpeedDial, SpeedDialIcon, Fab, Box, Divider } from "@mui/material";
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
                            <ListItem style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                                <ListItemText primary={book.title} secondary={book.author} />
                                <Box>
                                    <img src={book.cover} alt={book.title} style={{height: 150, width: 'auto'}}/>
                                </Box>
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