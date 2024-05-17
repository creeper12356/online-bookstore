import { useEffect, useState } from "react";
import { PrivateLayout } from "../components/Layout";
import { NavigatorIndexContext } from "../lib/Context";
import { getOrders } from "../service/order";
import OrderTable from "../components/OrderTable";

const OrderPage = () => {
    const fetchAndSetOrders = () => {
        getOrders().then(res => {
            setOrders(res.items);
        }).catch(e => {
            console.log(e);
        })
    }
    const [orders, setOrders] = useState([]);
    
    

    useEffect(() => {
        fetchAndSetOrders();
    }, []);

    return (
        <NavigatorIndexContext.Provider value={2}>
            <PrivateLayout>
                <OrderTable orders={orders}/>
            </PrivateLayout>
        </NavigatorIndexContext.Provider>
    );
};
export default OrderPage;