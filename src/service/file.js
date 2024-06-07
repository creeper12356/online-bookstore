import { PREFIX } from "./common";

export async function imageUpload(data) {
    const url = `${PREFIX}/file/upload`;
    let res;
    const formData = new FormData();
    formData.append('file', data);

    let response = await fetch(url, {
        method: 'POST',
        body: formData,
        credentials: "include"
    });
    res = await response.json();

    console.log(res);
    return res;
}