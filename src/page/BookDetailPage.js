import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getBook} from "../service/book";
import {Box, Button, Divider} from "@mui/material";
import PriceBox from "../components/PriceBox";
import CommentArea from "../components/CommentArea";
import {PrivateLayout} from "../components/Layout";

const BookDetailPage = () => {
    const {id} = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const getBookDetail = (id) => {
        getBook(id)
            .then(result => { setBookDetail(result);})
            .catch(e => { console.log(e); });
    };

    useEffect(() => {
        getBookDetail(id);
    }, [id]);
    return (
        <PrivateLayout>
            <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box
                    component="img"
                    sx={{
                        height: 400,
                        width: 'auto',
                    }}
                    src={bookDetail.cover}
                />
                <Box>
                    <h1>{bookDetail.title}</h1>
                    <Divider className="book-detail-divider-text">基本信息</Divider>
                    <Box className="book-detail-box">{`作者：${bookDetail.author}\t销量：${bookDetail.sales}`}</Box>
                    <Divider className="book-detail-divider-text">作品简介</Divider>
                    <Box className="book-detail-box">{bookDetail.description}</Box>
                    <PriceBox price={bookDetail.price} />
                    <Box sx={{
                        display:'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Button
                            variant="outlined"
                            className="book-detail-button"
                        >
                            加入购物车
                        </Button>
                        <Button
                            variant="outlined"
                            className="book-detail-button"
                        >
                            购买
                        </Button>
                    </Box>
                </Box>
            </Box>
            <CommentArea />
        </PrivateLayout>
    )
}
export default BookDetailPage;
