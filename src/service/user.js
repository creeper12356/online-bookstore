import { getJsonOrThrow, PREFIX} from "./common";

export async function getMe() {
    const url = `${PREFIX}/users/me`;
    return await getJsonOrThrow(url);
}
