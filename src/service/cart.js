import {delJsonOrThrow,  getJsonOrThrow, postJsonOrThrow, PREFIX, putJsonOrThrow} from "./common";

export async function getCartItems (){
    let url = `${PREFIX}/cart`;
    return await getJsonOrThrow(url);
}
export async function addCartItem(bookId, number) {
    let url = `${PREFIX}/cart`;
    return await postJsonOrThrow(url, {bookId, number});
}
export async function updateCartItem(id, number) {
    let url = `${PREFIX}/cart/${id}`;
    return await putJsonOrThrow(url, {number});
}
export async function deleteCartItem(id) {
    let url = `${PREFIX}/cart/${id}`;
    return await delJsonOrThrow(url);
}
