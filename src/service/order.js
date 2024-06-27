import dayjs from "dayjs";
import { getJsonOrThrow, postJsonOrThrow, PREFIX } from "./common";
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
export async function getOrders(q, from, to) {
    const params = new URLSearchParams({
        q,
        ...(from ? { from: from.utc().format('YYYY-MM-DD HH:mm:ss') } : {}),
        ...(to ? { to: to.utc().format('YYYY-MM-DD HH:mm:ss') } : {})
    });
    const url = `${PREFIX}/orders?${params}`;
    return await getJsonOrThrow(url);
}
export async function getAllOrders(q, from, to) {
    const params = new URLSearchParams({
        q,
        ...(from ? { from: from.utc().format('YYYY-MM-DD HH:mm:ss') } : {}),
        ...(to ? { to: to.utc().format('YYYY-MM-DD HH:mm:ss') } : {})
    });
    const url = `${PREFIX}/orders/all?${params}`;
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