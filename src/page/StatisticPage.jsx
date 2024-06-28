import { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context"
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Divider, Link, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import dayjs from "dayjs";
import { getUserStatistic } from "../service/user";
import PriceNumber from "../components/PriceNumber";
import PriceBox from "../components/PriceBox";

const StatisticPage = () => {
    const columns = ['书名', '封面', '单价', '数量', '总价'];
    const [searchArgs, setSearchArgs] = useState({ from: null, to: null });
    const [books, setBooks] = useState([]);

    const fetchAndSetBooks = () => {
        getUserStatistic(searchArgs.from, searchArgs.to).then(res => {
            setBooks(res.items);
        });
    };

    useEffect(() => {
        fetchAndSetBooks();
    }, [searchArgs]);

    return <NavigatorIndexContext.Provider value={3}>
        <PrivateLayout>
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
            <Box>总金额：{<PriceNumber price={books.reduce((total, book) => total + book.totalPrice, 0)} />}</Box>
            <Divider />
            <Table>
                <TableHead>
                    {columns.map((col, index) => <TableCell key={index}>{col}</TableCell>)}
                </TableHead>
                <TableBody>
                    {books.map(book => <TableRow key={book.id}>
                        <TableCell>
                            <Link href={`/book/${book.id}`} underline="none">
                                {book.title}
                            </Link>
                        </TableCell>
                        <TableCell><img src={book.cover} alt={book.title} style={{ width: 100 }} /></TableCell>
                        <TableCell><PriceNumber price={book.price} /></TableCell>
                        <TableCell>{book.sales}</TableCell>
                        <TableCell><PriceNumber price={book.totalPrice} /></TableCell>
                    </TableRow>)}
                </TableBody>
            </Table>
        </PrivateLayout>
    </NavigatorIndexContext.Provider>;
};

export default StatisticPage;