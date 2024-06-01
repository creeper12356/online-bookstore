import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import '../css/BookCard.css'
const BookCard = ({ img, title, price, alt, href }) => {
    return (
        <Card className="book-card">
            <CardActionArea href={href} className="book-card-action-area">
                <CardHeader>
                    Book
                </CardHeader>
                <CardContent>
                    <img src={img} alt={alt} className="book-card-img" />
                </CardContent>
                <CardContent
                    className="book-card-title"
                >
                    <Typography component="h1" variant="h6">
                        {title}
                    </Typography>
                </CardContent>
                <CardContent
                    className="book-card-price"
                >
                    <Typography component="h1" variant="h5">
                        {`￥${price / 100}`}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default BookCard;
