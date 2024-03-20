import {
    Box, ImageList, ImageListItem, Toolbar
} from "@mui/material";
import BookCard from "../components/BookCard";
import Navigator from "../components/Navigator";
import SideBar from "../components/SideBar";
import SearchBar from "../components/SearchBar";
import {useEffect, useState} from "react";
import {getBooks} from "../service/book";

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
        <Box sx={{display: 'flex'}}>
            <Navigator />
            <SideBar />
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
                <Toolbar/>
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
            </Box>
        </Box>

    );
};

//book data
const bookData = [
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },
    {
        img: 'https://img.dsjtm.com/book-dsjtm/20230926052016199.jpg',
        title: 'CSAPP',
        author: '@Bryant and O\'Hallaron',
        price: 200,
    },

];
export default HomePage;
