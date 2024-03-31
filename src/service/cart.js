import {del, get, PREFIX} from "./common";

export async function getCartItems (){
    let url = `${PREFIX}/cart`;
    let result;
    try {
        result = await get(url);
    } catch (error) {
        console.log(error);
        result = {ok: false, message: 'network error'};
    }
    return result;
}

export async function deleteCartItem(id) {
    let url = `${PREFIX}/cart/${id}`;
    let result;
    try {
        result = await del(url);
        console.log(result);
    } catch (error) {
        console.log(error);
        result = {ok: false, message: 'network error'};
    }
    return result;
}
