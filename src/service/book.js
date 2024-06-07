import { delJsonOrThrow, getJsonOrThrow, PREFIX, putJsonOrThrow} from "./common";

export async function getBooks(q, page, pagesize){
    let url = `${PREFIX}/books?q=${q}&page=${page}&pagesize=${pagesize}`;
    return await getJsonOrThrow(url);
}
export async function getBook(id) {
    let url = `${PREFIX}/books/${id}`;
    return await getJsonOrThrow(url);
}
export async function updateBook(id, book) {
    let url = `${PREFIX}/books/${id}`;
    return await putJsonOrThrow(url, book);
}

export async function deleteBook(id) {
    let url = `${PREFIX}/books/${id}`;
    return await delJsonOrThrow(url);
}