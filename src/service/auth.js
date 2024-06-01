import {postJsonOrThrow, putJsonOrThrow, PREFIX} from "./common";

export async function register(username, password, email) {
    let url = `${PREFIX}/auth/register`;
    return await postJsonOrThrow(url, {username, password, email});
}
export async function login(username, password) {
    let url = `${PREFIX}/auth/login`;
    return await postJsonOrThrow(url, {username, password});
}
// TODO: backend not implemented yet
export async function logout() {
    let url = `${PREFIX}/auth/logout`;
    await putJsonOrThrow(url, {});
}