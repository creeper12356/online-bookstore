import {get, PREFIX} from "./common";

export async function getBooks(keyword, pageIndex, pageSize){
    let url = `${PREFIX}/books?keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    let result;
    try {
        result = get(url);
    }
    catch( error ) {
        console.log(error);
        result = {ok: false, message: 'network error'};
    }
    return result;
}
