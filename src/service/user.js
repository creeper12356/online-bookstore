import { getJsonOrThrow, postJsonOrThrow, PREFIX} from "./common";

export async function getMe() {
    const url = `${PREFIX}/users/me`;
    return await getJsonOrThrow(url);
}

export async function getUserProfile(userId) {
    const url = `${PREFIX}/users/${userId}`;
    return await getJsonOrThrow(url);
}

export async function getAllUsers() {
    const url = `${PREFIX}/users`;
    return await getJsonOrThrow(url);
}

export async function banUser(userId) {
    const url = `${PREFIX}/users/${userId}/ban`;
    return await postJsonOrThrow(url);
}

export async function unbanUser(userId) {
    const url = `${PREFIX}/users/${userId}/unban`;
    return await postJsonOrThrow(url);
}
