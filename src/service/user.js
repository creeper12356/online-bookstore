import {get, PREFIX} from "./common";

export async function getMe() {
    const url = `${PREFIX}/user/me`;
    let result;
    try {
        result = await get(url);
    }
    catch (e) {
        result = null;
    }
    return result;
}
