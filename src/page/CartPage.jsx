import {
    Button
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CartItemTable from "../components/CartItemTable";
import { PrivateLayout } from "../components/Layout";
import OrderDialog from "../components/OrderDialog";
import '../css/CartPage.css';
import { useErrorHandler } from "../hooks/useErrorHandler";
import { useOkHandler } from "../hooks/useOkHandler";
import { NavigatorIndexContext, UserContext } from "../lib/Context";
import { deleteCartItem, getCartItems, updateCartItem } from "../service/cart";
import { createWebSocketConnection } from "../service/websocket";



const CartPage = () => {
    const [cartItemList, setCartItemList] = useState([]);
    const [selectedCartItemList, setSelectedCartItemList] = useState([]);
    const [buyButtonDisabled, setBuyButtonDisabled] = useState(true);
    const [totalPrice, setTotalPrice] = useState(0);
    const [messageOk, OkSnackbar] = useOkHandler();
    const [messageError, ErrorSnackbar] = useErrorHandler();
    const [orderFormOpen, setOrderFormOpen] = useState(false);

    const user = useContext(UserContext);

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

                        const message = JSON.stringify({
                            books: selectedCartItemList.map(
                                cartItem => ({ bookId: cartItem.bookId, number: cartItem.number })
                            ),
                            receiver: receiver,
                            address: address,
                            tel: tel,
                            userId: user.id,
                        });
                        console.log('message: ' + JSON.stringify(message));
                        createWebSocketConnection('ws://localhost:8080/orders', message)
                            .then(socket => {
                                console.log('socket: ' + JSON.stringify(socket));
                                socket.onmessage = (msg) => {
                                    console.log(msg);
                                    let res = JSON.parse(msg.data);
                                    if (res.ok) {
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
                                        socket.close();
                                    } else {
                                        messageError(res.message);
                                    }
                                }
                            })
                            .catch(e => {
                                messageError(e);
                            });
                    }
                    } />
            </PrivateLayout>
        </NavigatorIndexContext.Provider>);
}

export default CartPage;
