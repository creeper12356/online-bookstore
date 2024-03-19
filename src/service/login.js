import {post, PREFIX} from "./common";

export async function login(username, password) {
    let result;
    let url = `${PREFIX}/login`;
    try {
        result = await post(url, {username, password});
    }
    catch (e) {
        result = {ok: false, message: 'network error'};
    }
    return result;
}
