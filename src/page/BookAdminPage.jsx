import React, { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { deleteBook, getBooks, updateBook } from "../service/book";
import { Box, Button, Divider, List, ListItem, TextField, Typography } from "@mui/material";
import BookAdminItem from "../components/BookAdminItem";
import { useOkHandler } from "../hooks/useOkHandler";
import { useErrorHandler } from "../hooks/useErrorHandler";

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
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();

    useEffect(() => {
        getBookList('', 0, 100);
    }, []);

    return (
        <PrivateLayout>
            <Divider textAlign="left">
                管理书籍
            </Divider>
            <List>
                {bookList.map(book => (
                    <React.Fragment key={book.id}>
                        <BookAdminItem
                            book={book}
                            onSave={() => {
                                // TODO:重构此部分
                                messageOk('保存成功');
                            }}
                            onDelete={() => {
                                deleteBook(book.id).then(result => {
                                    messageOk(result.message);
                                    setBookList(bookList.filter(b => b.id !== book.id));
                                }).catch(e => {
                                    messageError(e.message);
                                });
                            }} />
                        <Divider />
                    </React.Fragment>


                ))}
            </List>
            <OkSnackbar />
            <ErrorSnackbar />
        </PrivateLayout>
    );
}
export default AdminBookPage;