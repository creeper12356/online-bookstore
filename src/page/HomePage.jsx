import {
    ImageList, ImageListItem, Pagination,
    Tab,
    Tabs,
    Typography
} from "@mui/material";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { PrivateLayout } from "../components/Layout";
import SearchBar from "../components/SearchBar";
import { NavigatorIndexContext } from "../lib/Context";
import { getBookAuthor, getBooks, getSimilarBooksByTag } from "../service/book";

const HomePage = () => {
    const [bookList, setBookList] = useState([]);
    const [searchArgs, setSearchArgs] = useState(
        { query: '', page: 0, pageSize: 10 }
    );
    const [searchTag, setSearchTag] = useState('');

    const [pageCount, setPageCount] = useState(0);
    const [bookAuthor, setBookAuthor] = useState('');
    const [searchOptIdx, setSearchOptIdx] = useState(0);

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
        if (searchOptIdx === 0) {
            getBookList(searchArgs.query, searchArgs.page, searchArgs.pageSize);
        } else {
            getSimilarBooksByTag(searchTag)
                .then(result => {
                    setPageCount(Math.ceil(result.total / searchArgs.pageSize));
                    setBookList(result.books);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }, [searchArgs, searchTag, searchOptIdx]);

    return (
        <NavigatorIndexContext.Provider value={0} >
            <PrivateLayout>
                <Tabs value={searchOptIdx}>
                    <Tab label="搜索书名" onClick={() => { setSearchOptIdx(0); }} />
                    <Tab label="搜索标签" onClick={() => { setSearchOptIdx(1); }} />
                </Tabs>
                {searchOptIdx === 0 && <SearchBar onSearch={(q) => {
                    setSearchArgs({ ...searchArgs, query: q, page: 0 });
                }}
                    placeholder="搜索书名..."
                />}
                {searchOptIdx === 1 && <SearchBar onSearch={(tag) => {
                    setSearchTag(tag);
                }}
                    placeholder="搜索标签..."
                />}
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
