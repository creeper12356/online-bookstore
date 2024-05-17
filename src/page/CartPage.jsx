import { PrivateLayout } from "../components/Layout";
import { useEffect, useState } from "react";
import { deleteCartItem, getCartItems, updateCartItem } from "../service/cart";
import '../css/CartPage.css'
import React from "react";
import {
    Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField
} from "@mui/material";
import { NavigatorIndexContext } from "../lib/Context";
import CartItemTable from "../components/CartItemTable";
import { useErrorHandler } from "../hooks/useErrorHandler";
import { addOrder } from "../service/order";
import { useOkHandler } from "../hooks/useOkHandler";



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

    const handleBuy = async () => {
        console.log('buy');
        handleOpenDialog();

        addOrder({
            orderItems: selectedCartItemList.map(
                cartItem => ({ bookId: cartItem.bookId, number: cartItem.number })
            ),
            receiver: 'receiver',
            address: 'address',
            tel: 'tel'
        })
            .then(() => {
                selectedCartItemList.forEach(cartItem => {
                    deleteCartItem(cartItem.id).catch(e => {
                        messageError(e.message);
                    });
                });
                setCartItemList(cartItemList.filter(cartItem => !selectedCartItemList.includes(cartItem)));
            }).catch(e => {
                messageError(e.message);
            });
    };

    const handleOpenDialog = () => {
        setOrderFormOpen(true);
    };

    const handleCloseDialog = () => {
        setOrderFormOpen(false);
    }

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
                        onClick={handleBuy}
                    >
                        立即下单
                    </Button>
                </div>
                <OkSnackbar />
                <ErrorSnackbar />
                <Dialog
                    open={orderFormOpen}
                    onClose={handleCloseDialog}
                    PaperProps={{
                        component: 'form',
                        // onSubmit: (event) => {
                        //     event.preventDefault();
                        //     const formData = new FormData(event.currentTarget);
                        //     const formJson = Object.fromEntries(formData.entries());
                        //     const email = formJson.email;
                        //     console.log(email);
                        //     handleClose();
                        // },
                    }}
                >
                    <DialogTitle>Subscribe</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To subscribe to this website, please enter your email address here. We
                            will send updates occasionally.
                        </DialogContentText>
                        <TextField />
                    </DialogContent>
                    <DialogActions>
                        <Button>Cancel</Button>
                        <Button type="submit">Subscribe</Button>
                    </DialogActions>
                </Dialog>
            </PrivateLayout>
        </NavigatorIndexContext.Provider>);
}

export default CartPage;
