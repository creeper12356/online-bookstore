import { useEffect, useState } from "react";
import { getBookRank } from "../service/book";
import { Button, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import RankNumber from "./RankNumber";

const BookSalesRankSubPage = () => {
    const [bookSalesList, setBookSalesList] = useState([]);
    const column = ['排行', '书名', '封面', '销量'];
    const [searchArgs, setSearchArgs] = useState({ from: null, to: null });


    const fetchAndSetBookSaleList = () => {
        getBookRank(searchArgs.from, searchArgs.to, 10).then(res => {
            setBookSalesList(res.items);
        }).catch(e => {
            console.error(e);
        });
    };

    useEffect(() => {
        fetchAndSetBookSaleList();
    }, [searchArgs]);

    return <>
        <Divider textAlign="left" sx={{ marginBottom: 5 }}>书籍热销榜</Divider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }} >
                <Button onClick={() => {
                    setSearchArgs({ ...searchArgs, from: null, to: null });
                }}>清除</Button>
                <DateRangePicker
                    value={[searchArgs.from, searchArgs.to]}
                    localeText={{ start: '开始日期', end: '结束日期' }}
                    onChange={(value) => {
                        setSearchArgs({ ...searchArgs, from: value[0], to: value[1] });
                    }}
                    shouldDisableDate={(date) => {
                        const tomorrow = dayjs().add(1, 'day');
                        return date.isAfter(tomorrow);
                    }}
                />
            </div>
        </LocalizationProvider>
        <Table style={{ border: '1px solid', margin: 20 }}>
            <TableHead>
                {column.map((attr, index) =>
                    <TableCell style={{width: index === 0 || index === 1 || index === 3 ? '20%' : '40%'}}>{attr}</TableCell>)}
            </TableHead>
            <TableBody>
                {bookSalesList.map((book, index) =>
                    <TableRow>
                        <TableCell>
                            <RankNumber rank={index + 1} />
                        </TableCell>
                        <TableCell>
                            <Link href={`/book/${book.id}`} underline="none">
                                <Typography variant="h5">
                                    {book.title}
                                </Typography>
                            </Link>
                        </TableCell>
                        <TableCell>
                            <img src={book.cover} alt={book.title} style={{ width: 150 }} />
                        </TableCell>
                        <TableCell>
                            <Typography variant="h5">
                                {book.sales}
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    </>
};

export default BookSalesRankSubPage;