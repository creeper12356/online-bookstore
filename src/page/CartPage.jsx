import {PrivateLayout} from "../components/Layout";
import {useEffect, useState} from "react";
import {deleteCartItem, getCartItems} from "../service/cart";
import '../css/CartPage.css'
import React from "react";
import {
    Button,
} from "@mui/material";
import {NavigatorIndexContext} from "../lib/Context";
import CartItemTable from "../components/CartItemTable";


const CartPage = () => {
    const [cartItemList, setCartItemList] = useState([]);
    const [buyButtonDisabled, setBuyButtonDisabled] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        getCartItemList();
    }, []);
    const handleCartItemDelete = async (id) => {
        setCartItemList(cartItemList.filter(cartItem => cartItem.id !== id));
        await deleteCartItem(id);
    };
    const getCartItemList = () => {
        getCartItems()
            .then(res => {setCartItemList(res); })
            .catch(e => { console.log(e); });
    };

    return (
        <NavigatorIndexContext.Provider value={1} >
            <PrivateLayout>
                <CartItemTable
                    cartItemList={cartItemList}
                    onCartItemDelete={handleCartItemDelete}
                    onSelectedCartItemListChanged={(selectedCartItemList) => {
                        setBuyButtonDisabled(selectedCartItemList.length === 0);
                        setTotalPrice(selectedCartItemList
                            .map(cartItem => cartItem.book.price)
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 100);
                    }}
                />
                <div>{`总价：${totalPrice}元`}</div>
                <Button
                    variant="outlined"
                    disabled={buyButtonDisabled}
                >
                    立即下单
                </Button>
            </PrivateLayout>
        </NavigatorIndexContext.Provider>);
}
export default CartPage;
