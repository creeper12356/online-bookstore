import {
    ImageList, ImageListItem, Pagination,
    Typography
} from "@mui/material";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { getBookAuthor, getBooks } from "../service/book";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext, UserContext } from "../lib/Context";

const HomePage = () => {
    const [bookList, setBookList] = useState([]);
    const [searchArgs, setSearchArgs] = useState(
        { query: '', page: 0, pageSize: 10 }
    );
    const [pageCount, setPageCount] = useState(0);
    const [bookAuthor, setBookAuthor] = useState('');

    const getBookList = (q, page, pageSize) => {
        getBooks(q, page, pageSize)
            .then(result => {
                setPageCount(Math.ceil(result.total / pageSize));
                setBookList(result.books);
            })
            .catch(e => { console.log(e); });
        getBookAuthor(q)
            .then(res => {
                setBookAuthor(res.author);
            })
            .catch(e => {
                console.log(e);
                setBookAuthor('未找到');
            });
    }
    const handlePageChange = (event, value) => {
        setSearchArgs({ ...searchArgs, page: value - 1 });
    }
    useEffect(() => {
        getBookList(searchArgs.query, searchArgs.page, searchArgs.pageSize);
    }, [searchArgs]);


    return (
        <NavigatorIndexContext.Provider value={0} >
            <PrivateLayout>
                <SearchBar onSearch={(q) => {
                    setSearchArgs({ ...searchArgs, query: q, page: 0 });
                }}
                    placeholder="搜索书名..."
                />
                <Typography variant="h6">作者：{bookAuthor}</Typography>
                <ImageList
                    cols={5}
                >
                    {
                        bookList.map(book => (
                            <ImageListItem key={book.id}>
                                <BookCard
                                    book={book}
                                />
                            </ImageListItem>))
                    }
                </ImageList>
                <Pagination
                    count={pageCount}
                    onChange={handlePageChange}
                    page={searchArgs.page + 1}
                />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};

export default HomePage;
