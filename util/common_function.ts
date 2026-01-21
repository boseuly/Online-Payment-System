// 요청 fetch
export async function apiFetch(input: string, init: RequestInit = {}) {
    const accessToken = localStorage.getItem("accessToken");

    const headers = new Headers(init.headers);
    headers.set("Content-type", "application/json");
    headers.set("Accept", "application/json");
    if(accessToken) headers.set("Authorization", accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`);

    const res = await fetch(input, {...init, headers});

    return res;
}