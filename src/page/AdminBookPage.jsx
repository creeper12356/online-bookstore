import React, { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { deleteBook, getBooks } from "../service/book";
import { Divider, Fab, List, Typography, } from "@mui/material";
import BookAdminItem from "../components/BookAdminItem";
import { useOkHandler } from "../hooks/useOkHandler";
import { useErrorHandler } from "../hooks/useErrorHandler";
import NewBookForm from "../components/NewBookForm";
import { NavigatorIndexContext } from "../lib/Context";

const AdminBookPage = () => {
    const [bookList, setBookList] = useState([]);
    const [newBookFormVisible, setNewBookFormVisible] = useState(false);
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
        <NavigatorIndexContext.Provider value={5}>
            <PrivateLayout>
                <Fab
                    sx={{ alignSelf: "flex-end" }}
                    color={newBookFormVisible ? "info" : "primary"}
                    title="添加书籍"
                    onClick={() => {
                        setNewBookFormVisible(!newBookFormVisible);
                    }}
                >
                    <Typography>
                        {
                            newBookFormVisible ? "-" : "+"
                        }
                    </Typography>

                </Fab>
                {
                    newBookFormVisible ?
                        <NewBookForm
                            visible={newBookFormVisible}
                            onSaved={(book) => {
                                setBookList([book, ...bookList]);
                                setNewBookFormVisible(false);
                                messageOk('添加成功');
                            }}
                            onCanceled={() => {
                                setNewBookFormVisible(false);
                            }}
                        /> : ''
                }


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
        </NavigatorIndexContext.Provider>

    );
}
export default AdminBookPage;