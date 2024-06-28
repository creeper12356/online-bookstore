import React, { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { Box, Button, Divider, Fab, List, Typography, } from "@mui/material";
import { useOkHandler } from "../hooks/useOkHandler";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { NavigatorIndexContext } from "../lib/Context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import SearchBar from "../components/SearchBar";
import OrderTable from "../components/OrderTable";
import dayjs from "dayjs";
import { getAllOrders, getOrders } from "../service/order";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

const AdminOrderPage = () => {
    const [searchArgs, setSearchArgs] = useState({ q: '', from: null, to: null });
    const [orders, setOrders] = useState([]);
   
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();
    const fetchAndSetOrders = (q, from, to) => {
        getAllOrders(q, from, to).then(res => {
            setOrders(res.items);
        }).catch(e => {
            console.log(e);
        })
    }

    useEffect(() => {
        console.log(searchArgs);
        fetchAndSetOrders(searchArgs.q, searchArgs.from, searchArgs.to);
    }, [searchArgs]);

    return (
        <NavigatorIndexContext.Provider value={6}>
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
                    <OrderTable orders={orders} showUser />
                </Box>
                <OkSnackbar />
                <ErrorSnackbar />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>

    );
}
export default AdminOrderPage;