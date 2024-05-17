import { PrivateLayout } from "../components/Layout";
import { useEffect, useState } from "react";
import { deleteCartItem, getCartItems, updateCartItem } from "../service/cart";
import '../css/CartPage.css'
import React from "react";
import {
    Button
} from "@mui/material";
import { NavigatorIndexContext } from "../lib/Context";
import CartItemTable from "../components/CartItemTable";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { addOrder } from "../service/order";
import { useOkHandler } from "../hooks/useOkHandler";
import OrderDialog from "../components/OrderDialog";



const CartPage = () => {
    const [cartItemList, setCartItemList] = useState([]);
    const [selectedCartItemList, setSelectedCartItemList] = useState([]);
    const [buyButtonDisabled, setBuyButtonDisabled] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();
    const [orderFormOpen, setOrderFormOpen] = useState(false);

    useEffect(() => {
        getCartItemList();
    }, []);
    const handleCartItemDelete = async (id) => {
        setCartItemList(cartItemList.filter(cartItem => cartItem.id !== id));
        deleteCartItem(id).catch(e => {
            messageError(e.message);
        });
    };

    const handleCartItemNumberChanged = async (id, number) => {
        setCartItemList(
            cartItemList
                .map(
                    cartItem => cartItem.id === id ?
                        { ...cartItem, number: number } :
                        cartItem
                )
        );
        updateCartItem(id, number).catch(e => {
            messageError(e.message);
        });
    };


    const getCartItemList = () => {
        getCartItems()
            .then(res => {
                setCartItemList(res.items);
            })
            .catch(e => {
                console.log(e);
                messageError(e.message);
            });
    };

    return (
        <NavigatorIndexContext.Provider value={1} >
            <PrivateLayout>
                <CartItemTable
                    cartItemList={cartItemList}
                    onCartItemDelete={handleCartItemDelete}
                    onCartItemNumberChanged={handleCartItemNumberChanged}
                    onSelectedCartItemListChanged={(selectedCartItemList) => {
                        setBuyButtonDisabled(selectedCartItemList.length === 0);
                        setSelectedCartItemList(selectedCartItemList);
                        setTotalPrice(selectedCartItemList
                            .map(cartItem => cartItem.price * cartItem.number)
                            .reduce((accumulator, currentValue) => accumulator + currentValue, 0) / 100);
                    }}
                />
                <div>{`总价：${totalPrice}元`}</div>
                <div>
                    <Button
                        fullWidth={false}
                        variant="outlined"
                        disabled={buyButtonDisabled}
                        onClick={() => {
                            setOrderFormOpen(true);
                        }}
                    >
                        立即下单
                    </Button>
                </div>
                <OkSnackbar />
                <ErrorSnackbar />
                <OrderDialog
                    open={orderFormOpen}
                    onClose={() => {
                        setOrderFormOpen(false);
                    }}
                    onSubmit={(receiver, address, tel) => {
                        setOrderFormOpen(false);
                        addOrder({
                            orderItems: selectedCartItemList.map(
                                cartItem => ({ bookId: cartItem.bookId, number: cartItem.number })
                            ),
                            receiver: receiver,
                            address: address,
                            tel: tel,
                        }).then(() => {
                            selectedCartItemList.forEach(cartItem => {
                                deleteCartItem(cartItem.id).catch(e => {
                                    messageError(e.message);
                                });
                            });
                            setCartItemList(
                                cartItemList.filter(
                                    cartItem => !selectedCartItemList.includes(cartItem)
                                )
                            );
                            messageOk('下单成功');
                        }).catch(e => {
                            messageError(e.message);
                        });
                    }
                    } />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>);
}

export default CartPage;
