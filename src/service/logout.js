import {PREFIX, putJsonOrThrow} from "./common";

export async function logout() {
    let url = `${PREFIX}/logout`;
    await putJsonOrThrow(url, {});
}
