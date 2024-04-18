import {
    ImageList, ImageListItem, Pagination
} from "@mui/material";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import {useEffect, useState} from "react";
import {getBooks} from "../service/book";
import { PrivateLayout} from "../components/Layout";
import {NavigatorIndexContext} from "../lib/Context";

const HomePage = () => {
    const [bookList, setBookList] = useState([]);
    const getBookList = async () => {
        let result = await getBooks('', 0, 10);
        console.log(result);
        setBookList(result.items);
    }
    useEffect(() => {
        getBookList();
    }, []);
    return (
        <NavigatorIndexContext.Provider value={0} >
            <PrivateLayout>
                <SearchBar />
                <ImageList
                    cols={5}
                >
                    {
                        bookList.map(book => (
                        <ImageListItem key={book.id}>
                            <BookCard
                                img={book.cover}
                                title={book.title}
                                alt={book.alt}
                                price={book.price}
                                href={`/book/${book.id}`}
                            />
                        </ImageListItem> ))
                    }
                </ImageList>
                <Pagination count={2}/>
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};

export default HomePage;
