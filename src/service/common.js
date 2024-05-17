export const BASE_URL = process.env.REACT_APP_BASE_URL ?? 'http://localhost:8080';
export const PREFIX = `${BASE_URL}/api`;

// 基本HTTP请求
export async function get(url) {
    let opts = {
        method: 'GET',
        credentials: 'include',
    }
    let res = await fetch(url, opts);
    return {
        json: await res.json(),
        status: res.status,
    };
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
    return {
        json: await res.json(),
        status: res.status,
    };
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
    return {
        json: await res.json(),
        status: res.status,
    };
}

export async function del(url) {
    let opts = {
        method: 'DELETE',
        credentials: 'include'
    }
    let res = await fetch(url, opts);
    return {
        json: await res.json(),
        status: res.status,
    };
}


// 返回JSON或抛出异常的HTTP请求

export async function getJsonOrThrow(url) {
    let result;
    try {
        result = await get(url);
    } catch(e) {
        throw {ok: false, message: 'network error'};
    }

    if(result.status !== 200) {
        throw {ok: false, message: result.json.message ?? 'network error'};
    }
    return result.json;
}

export async function postJsonOrThrow(url, data) {
    let result;
    try {
        result = await post(url, data);
    } catch(e) {
        throw {ok: false, message: 'network error'};
    }

    if(result.status !== 200) {
        throw {ok: false, message: result.json.message ?? 'network error'};
    }
    return result.json;
}

export async function putJsonOrThrow(url, data) {
    let result;
    try {
        result = await put(url, data);
    } catch(e) {
        throw {ok: false, message: 'network error'};
    }

    if(result.status !== 200) {
        throw {ok: false, message: result.json.message ?? 'network error'};
    }
    return result.json;
}

export async function delJsonOrThrow(url) {
    let result;
    try {
        result = await del(url);
    } catch(e) {
        throw {ok: false, message: 'network error'};
    }

    if(result.status !== 200) {
        throw {ok: false, message: result.json.message ?? 'network error'};
    }
    return result.json;
}