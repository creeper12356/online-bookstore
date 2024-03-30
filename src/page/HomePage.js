import {
    ImageList, ImageListItem
} from "@mui/material";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import {useEffect, useState} from "react";
import {getBooks} from "../service/book";
import { PrivateLayout} from "../components/Layout";

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
        <PrivateLayout>
            <SearchBar />
            <ImageList
                cols={4}
            >
                {bookList.map(book => (
                    <ImageListItem key={book.id}>
                        <BookCard
                            img={book.cover}
                            title={book.title}
                            alt={book.alt}
                            price={book.price}
                            href={`/book/${book.id}`}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </PrivateLayout>

    );
};

export default HomePage;
