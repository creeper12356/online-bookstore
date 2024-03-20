import {useParams} from "react-router";
import {useEffect, useState} from "react";
import {getBook} from "../service/book";
import Navigator from "../components/Navigator";
import {Box, Card, CardMedia, Divider, Toolbar} from "@mui/material";

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
            <Box component="main" sx={{flexGrow: 1, p: 3}}>
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
                        <Divider>基本信息</Divider>
                        <p>{`作者：${bookDetail.author}\t销量：${bookDetail.sales}`}</p>
                        <Divider>作品简介</Divider>
                        <Box>{bookDetail.description}</Box>
                    </Box>
                </Box>

            </Box>

        </Box>
    )
}
export default BookDetailPage;
