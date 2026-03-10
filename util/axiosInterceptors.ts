import axios from 'axios';
import {notify} from "@/util/toast";

const instanceAcf = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 120000,
    // withCredentials: true
});



instanceAcf.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("accessToken");

        // url에 auth가 포함되어 있는 경우 따로 토큰이 존재하는지 여부를 파악해야 한다.
        if (config.url?.includes("auth")) {
            if (!accessToken) {
                // 만약 accessToken이 없다면 로그인을 먼저 하도록 로그인 페이지로 리다이렉트
                notify.error("로그인이 필요합니다.")
                window.location.href = "/customer/login"
            } else {
                // 만약 accessToken이 있다면 토큰을 넣어서 전달하기
                config.headers.Authorization = accessToken.startsWith("Bearer ")
                ? accessToken : `Bearer ${accessToken}`
            }

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


instanceAcf.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // 토큰 만료
            if (error.response.status === 401) {
                notify.error("로그인이 필요합니다.");
                localStorage.removeItem("accessToken");

                // 로그인 페이지 이동
                window.location.href = "/customer/login";
            }

            // 서버 에러
            if (error.response.status === 500) {
                notify.error("서버 오류 발생");
            }

        }

        return Promise.reject(error);
    }
);

export default instanceAcf;