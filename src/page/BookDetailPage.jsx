import { Box, Button, Chip, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CommentArea from "../components/CommentArea";
import { PrivateLayout } from "../components/Layout";
import PriceBox from "../components/PriceBox";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useOkHandler } from "../hooks/useOkHandler";
import { NavigatorIndexContext } from "../lib/Context";
import { getBook, getBookTags } from "../service/book";
import { addCartItem } from "../service/cart";

const BookDetailPage = () => {
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [bookTags, setBookTags] = useState([]);
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();

    const getBookDetail = (id) => {
        getBook(id)
            .then(result => { setBookDetail(result); })
            .catch(e => { console.log(e); });
        getBookTags(id)
            .then(result => {
                setBookTags(result);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const onAddToCartClicked = async () => {
        addCartItem(id).then(res => {
            messageOk(res.message);
        }).catch(e => {
            messageError(e.message);
        });
    }

    useEffect(() => {
        getBookDetail(id);
    }, [id]);
    return (
        <NavigatorIndexContext.Provider value={-1}>
            <PrivateLayout>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <Box
                        component="img"
                        sx={{
                            height: 400,
                            width: 'auto',
                            margin: 2,
                        }}
                        src={bookDetail.cover}
                    />
                    <Box>
                        <h1>{bookDetail.title}</h1>
                        {
                            bookTags.map((tag, idx) => (
                                <Chip key={idx} label={tag}
                                    // 简单的循环取颜色
                                    color={["default", "primary", "secondary", "error", "info", "success"][idx % 6]} 
                                />
                            ))
                        }
                        <Divider className="book-detail-divider-text">基本信息</Divider>
                        <Box className="book-detail-box">{`作者：${bookDetail.author}\t销量：${bookDetail.sales}\t库存：${bookDetail.stock}`}</Box>
                        <Box className="book-detail-box">{`ISBN: ${bookDetail.isbn}`}</Box>
                        <Divider className="book-detail-divider-text">作品简介</Divider>
                        <Box className="book-detail-box">{bookDetail.description}</Box>
                        <PriceBox price={bookDetail.price} />
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Button
                                variant="outlined"
                                className="book-detail-button"
                                onClick={onAddToCartClicked}
                            >
                                加入购物车
                            </Button>
                            <Button
                                variant="outlined"
                                className="book-detail-button"
                                disabled={bookDetail.stock === 0}
                            >
                                购买
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <CommentArea bookId={id} />
                <OkSnackbar />
                <ErrorSnackbar />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>

    )
}
export default BookDetailPage;
