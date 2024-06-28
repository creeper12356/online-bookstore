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

export async function getUserRank(from, to, maxcount) {
    const params = new URLSearchParams({
        ...(from ? { from: from.utc().format('YYYY-MM-DD HH:mm:ss') } : {}),
        ...(to ? { to: to.utc().format('YYYY-MM-DD HH:mm:ss') } : {}),
        maxcount
    });
    const url = `${PREFIX}/users/rank?${params}`;
    return await getJsonOrThrow(url);
}