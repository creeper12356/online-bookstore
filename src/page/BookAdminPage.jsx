import React, { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { getBooks, updateBook } from "../service/book";
import { Box, Button, Divider, List, ListItem, TextField, Typography } from "@mui/material";
import BookAdminItem from "../components/BookAdminItem";

const AdminBookPage = () => {
    const [bookList, setBookList] = useState([]);
    const getBookList = (q, page, pageSize) => {
        getBooks(q, page, pageSize)
            .then(result => {
                // setPageCount(Math.ceil(result.total / pageSize));
                setBookList(result.books);
            })
            .catch(e => { console.log(e); });
    };

    useEffect(() => {
        getBookList('', 0, 10);
    }, []);

    return (
        <PrivateLayout>
            <Divider textAlign="left">
                管理书籍
            </Divider>
            <List>
                {bookList.map(book => (
                    <React.Fragment key={book.id}>
                        <BookAdminItem book={book} onDelete={() => {
                            setBookList(bookList.filter(b => b.id !== book.id));
                        }}/>
                        <Divider />
                    </React.Fragment>


                ))}
            </List>
        </PrivateLayout>
    );
}
export default AdminBookPage;