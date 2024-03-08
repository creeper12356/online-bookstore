import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography} from "@mui/material";
import '../css/BookCard.css'
const BookCard = ({ img, title, price, alt}) => {
    return (
        <Card className="book-card">
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
                    {`￥${price}`}
                </Typography>
            </CardContent>
            <CardActions className="book-card-button">
                <Button className="book-card-button">
                    <Typography component="h1" variant="h5">
                        Buy
                    </Typography>
                </Button>
            </CardActions>
        </Card>
    );
}
export default BookCard;
