import { getJsonOrThrow, PREFIX} from "./common";

export async function getBooks(q, page, pagesize){
    let url = `${PREFIX}/books?q=${q}&page=${page}&pagesize=${pagesize}`;
    return await getJsonOrThrow(url);
}
export async function getBook(id) {
    let url = `${PREFIX}/books/${id}`;
    return await getJsonOrThrow(url);
}
