import { Card, CardActionArea, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import '../css/BookCard.css'
import Inventory2Icon from '@mui/icons-material/Inventory2';

const BookCard = ({ img, title, price, alt, href, stock}) => {
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
                    className="book-card-bottom"
                >
                    <Typography component="h1" variant="h5" className="book-card-price">
                        {`￥${price / 100}`}
                    </Typography>
                    <div className="book-card-stock-div" style={{color: stock ? 'black' : 'grey'}}>
                        <Inventory2Icon />
                        <Typography component="h1" variant="h5">
                            {stock}
                        </Typography>
                    </div>
                    
                </CardContent>
            </CardActionArea>
        </Card>
    );
}
export default BookCard;
