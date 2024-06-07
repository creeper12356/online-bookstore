import { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";
import { getOrders } from "../service/order";
import OrderTable from "../components/OrderTable";


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import SearchBar from "../components/SearchBar";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { DateRangePicker } from "@mui/x-date-pickers-pro";
import { Box, Button, Divider } from "@mui/material";
import dayjs from "dayjs";

const OrderPage = () => {
    const fetchAndSetOrders = (q, from, to) => {
        getOrders(q, from, to).then(res => {
            setOrders(res.items);
        }).catch(e => {
            console.log(e);
        })
    }
    const [orders, setOrders] = useState([]);
    const [searchArgs, setSearchArgs] = useState({ q: '', from: null, to: null });
    const [messageError, ErrorSnackbar] = useErrorHandler();


    useEffect(() => {
        console.log(searchArgs);
        fetchAndSetOrders(searchArgs.q, searchArgs.from, searchArgs.to);
    }, [searchArgs]);

    return (
        <NavigatorIndexContext.Provider value={2}>
            <PrivateLayout>
                <Box gap="10px" display="flex" flexDirection="column">
                    <SearchBar placeholder="按书名筛选..." onSearch={q => {
                        setSearchArgs({ ...searchArgs, q: q });
                    }} />
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
                    <Divider textAlign="left">{`订单列表（${orders.length}条）`}</Divider>
                    <OrderTable orders={orders} />
                </Box>

                <ErrorSnackbar />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};
export default OrderPage;