// 요청 fetch
export async function apiFetch(input: string, init: RequestInit = {}) {
    const accessToken = localStorage.getItem("accessToken");

    /**
     * GET : init 작성 X
     * POST, PATCH, PUT, DELETE  : method, body 작성 필요
     */
    const headers = new Headers(init.headers);
    headers.set("Accept", "application/json");
    if (init.body && !headers.has("Content-type")) {
        headers.set("Content-Type", "application/json");
    }
    if(accessToken) headers.set("Authorization", accessToken.startsWith("Bearer ")
        ? accessToken
        : `Bearer ${accessToken}`);

    const res = await fetch(input, {...init, headers});

    return res;
}

// 회원 정보 가지고 오기
