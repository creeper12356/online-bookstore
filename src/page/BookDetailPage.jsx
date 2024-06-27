import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getBook} from "../service/book";
import {Box, Button, Divider} from "@mui/material";
import PriceBox from "../components/PriceBox";
import CommentArea from "../components/CommentArea";
import {PrivateLayout} from "../components/Layout";
import {NavigatorIndexContext} from "../lib/Context";
import { addCartItem } from "../service/cart";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useOkHandler } from "../hooks/useOkHandler";

const BookDetailPage = () => {
    const {id} = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();

    const getBookDetail = (id) => {
        getBook(id)
            .then(result => { setBookDetail(result);})
            .catch(e => { console.log(e); });
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
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
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
                        <Divider className="book-detail-divider-text">基本信息</Divider>
                        <Box className="book-detail-box">{`作者：${bookDetail.author}\t销量：${bookDetail.sales}\t库存：${bookDetail.stock}`}</Box>
                        <Box className="book-detail-box">{`ISBN: ${bookDetail.isbn}`}</Box>
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
                <CommentArea />
                <OkSnackbar />
                <ErrorSnackbar />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>

    )
}
export default BookDetailPage;
