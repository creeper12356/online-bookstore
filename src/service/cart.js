import {get, PREFIX} from "./common";

export async function getCartItems (){
    let url = `${PREFIX}/cart`;
    let result;
    try {
        result = await get(url);
        console.log(result);
    } catch (error) {
        console.log(error);
        result = {ok: false, message: 'network error'};
    }
    return result;
}
