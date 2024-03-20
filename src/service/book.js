import {get, PREFIX} from "./common";

export async function getBooks(keyword, pageIndex, pageSize){
    let url = `${PREFIX}/books?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let result;
    try {
        result = await get(url);
    }
    catch( error ) {
        console.log(error);
        result = {ok: false, message: 'network error'};
    }
    return result;
}
export async function getBook(id) {
    let url = `${PREFIX}/book/${id}`;
    let result;
    try {
        result = await get(url);
    }
    catch (error) {
        console.log(error);
        result = {ok: false, message: 'network error'};
    }
    return result;
}
