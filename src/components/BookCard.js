import {Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import '../css/BookCard.css'
const BookCard = ({ img, title, price, alt, href}) => {
    return (
        <Card className="book-card">
            <CardActionArea href={href} className="book-card-action-area">
                <CardHeader>
                    Book
                </CardHeader>
                <CardMedia
                    className="book-card-img"
                    component="img"
                    image={img}
                    alt={alt}
                />
                <CardContent className="book-card-title">
                    <Typography component="h1" variant="h5">
                        {title}
                    </Typography>
                </CardContent>
                <CardContent className="book-card-price">
                    <Typography component="h1" variant="h5">
                        {`￥${price / 100}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default BookCard;
