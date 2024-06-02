import dayjs from "dayjs";
import { getJsonOrThrow, postJsonOrThrow, PREFIX } from "./common";

export async function getOrders(q, from, to) {
    const params = new URLSearchParams({
        q,
        ...(from ? { from: from.format('YYYY-MM-DD') } : {}),
        ...(to ? { to: to.format('YYYY-MM-DD') } : {})
    });
    const url = `${PREFIX}/orders?${params}`;
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