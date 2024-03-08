import {Button, Card, CardActions, CardContent, CardHeader, CardMedia} from "@mui/material";

const BookCard = ({ img, title, price, alt}) => {
    return (
        <Card sx={{ minWidth:275, maxWidth: 400}}>
            <CardHeader>
                Book
            </CardHeader>
            <CardMedia
                component="img"
                image={img}
                alt={alt}
            />
            <CardContent>
                <div>{title}</div>
                <div>{price}</div>
            </CardContent>
            <CardActions>
                <Button size="large">Buy</Button>
            </CardActions>
        </Card>
    );
}
export default BookCard;
