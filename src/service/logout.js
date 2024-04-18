import {put, PREFIX} from "./common";

export async function logout() {
    let result;
    let url = `${PREFIX}/logout`;
    try {
        result = await put(url, {});
    }
    catch (e) {
        result = {ok: false, message: 'network error'};
    }
    return result;
}
