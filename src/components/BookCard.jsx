import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import '../css/BookCard.css'
import Inventory2Icon from '@mui/icons-material/Inventory2';

const BookCard = ({ book }) => {
    return (
        <Card className="book-card">
            <CardActionArea href={`/book/${book.id}`} className="book-card-action-area">
                <CardHeader>
                    Book
                </CardHeader>
                <CardContent>
                    <img src={book.cover} alt={book.title} className="book-card-img" />
                </CardContent>
                <CardContent
                    className="book-card-title"
                >
                    <Typography component="h1" variant="h6">
                        {book.title}
                    </Typography>
                    <Typography component="h1" fontSize={10} color="grey">
                        {book.isbn}
                    </Typography>
                </CardContent>
                <CardContent
                    className="book-card-bottom"
                >
                    <Typography component="h1" variant="h5" className="book-card-price">
                        {`￥${book.price / 100}`}
                    </Typography>
                    <div className="book-card-stock-div" style={{color: book.stock ? 'black' : 'grey'}}>
                        <Inventory2Icon />
                        <Typography component="h1" variant="h5">
                            {book.stock}
                        </Typography>
                    </div>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default BookCard;
