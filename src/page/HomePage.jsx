import {
    ImageList, ImageListItem, Pagination
} from "@mui/material";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import { useEffect, useState } from "react";
import { getBooks } from "../service/book";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";

const HomePage = () => {
    const [bookList, setBookList] = useState([]);
    const [searchArgs, setSearchArgs] = useState(
        { query: '', page: 0, pageSize: 10 }
    );
    const [pageCount, setPageCount] = useState(0);

    const getBookList = (q, page, pageSize) => {
        getBooks(q, page, pageSize)
            .then(result => {
                setPageCount(Math.ceil(result.total / pageSize));
                setBookList(result.books);
            })
            .catch(e => { console.log(e); });
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
