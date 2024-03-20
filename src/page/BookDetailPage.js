import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getBook} from "../service/book";
import Navigator from "../components/Navigator";
import {Box, Button, Card, CardMedia, Divider, Tab, Toolbar} from "@mui/material";
import PriceBox from "../components/PriceBox";
import {Tabs} from "@mui/material";
import CommentArea from "../components/CommentArea";

const BookDetailPage = () => {
    const {id} = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const getBookDetail = async (id) => {
        let result = await getBook(id);
        console.log(result);
        setBookDetail(result);
    };

    useEffect(() => {
        getBookDetail(id);
    }, [id]);
    return (
        <Box sx={{display: 'flex'}}>
            <Navigator />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column'
            }}>
                <Toolbar />
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
                                className="book-detail-button"
                            >
                                加入购物车
                            </Button>
                            <Button
                                className="book-detail-button"
                            >
                                购买
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <CommentArea />
            </Box>

        </Box>
    )
}
export default BookDetailPage;
