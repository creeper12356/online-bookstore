import {postJsonOrThrow, PREFIX} from "./common";

export async function login(username, password) {
    let url = `${PREFIX}/auth/login`;
    return await postJsonOrThrow(url, {username, password});
}
