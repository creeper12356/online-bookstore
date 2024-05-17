import { getJsonOrThrow, postJsonOrThrow, PREFIX } from "./common";

export async function getOrders (){
    let url = `${PREFIX}/orders`;
    return await getJsonOrThrow(url);
}
export async function addOrder({ orderItems, receiver, address, tel }) {
    let url = `${PREFIX}/orders`;
    return await postJsonOrThrow(
        url, 
        {
            books: orderItems,
            receiver: receiver,
            address: address,
            tel: tel,
        }
    );
}