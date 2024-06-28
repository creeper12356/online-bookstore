import { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";
import { getOrders } from "../service/order";
import OrderTable from "../components/OrderTable";


import SearchBar from "../components/SearchBar";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { Box, Divider } from "@mui/material";
import SimpleDateRangePicker from "../components/SimpleDateRangePicker";

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
                    <SimpleDateRangePicker onRangeChanged={(from, to) => {
                        setSearchArgs({ ...searchArgs, from: from, to: to });
                    }}/>
                    <Divider textAlign="left">{`订单列表（${orders.length}条）`}</Divider>
                    <OrderTable orders={orders} />
                </Box>

                <ErrorSnackbar />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};
export default OrderPage;