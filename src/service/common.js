export const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const PREFIX = `${BASE_URL}/api`;

export async function get(url) {
    let opts = {
        method: 'GET',
        credentials: 'include',
    }
    let res = await fetch(url, opts);
    return res.json();
}
export async function post(url, data) {
    let opts = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    };
    let res = await fetch(url, opts);
    return res.json();
}
export async function put(url, data) {
    let opts = {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }
    let res = await fetch(url, opts);
    return res.json();
}

export async function del(url) {
    let opts = {
        method: 'DELETE',
        credentials: 'include'
    }
    let res = await fetch(url, opts);
    return res;
}
