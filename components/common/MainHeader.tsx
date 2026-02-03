"use client";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";
import { FiMenu, FiShoppingCart, FiSearch } from "react-icons/fi";
import {apiFetch} from "@/util/common_function";


export default function MainHeader({
    hamburgerOpenYn,
    setHamburgerOpenYn,
    color,
}: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
    color?: string;
}) {

    const router = useRouter();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    // 토큰 저장 및 변경 감지 업데이트
    useEffect(() => {
        const sync = () => setAccessToken(localStorage.getItem("accessToken")); // localStorage 는 모든 탭에서 공유가 되고
        window.addEventListener("storage", sync);                   // 탭a 에서 로그아웃했을 때 localStorage.removeItem("accessToken")을 해주면
        return () => window.removeEventListener("storage", sync);   // 탭b 또한 자동으로 변경된 걸 감지할 수 있도록 storage 이벤트 발생하고, sync() 실행
    }, [])

    // 로그아웃 실행
    const logout = () => {
        const res = apiFetch("api/v1/customer/logout");
        setAccessToken("");
    }

    return (
        <>
            {/* 로그인을 한 상태 */}
            <header className="p-fixed wd-100 z-index-100 top-0">
                <div className="d-flex m-15 flex-justify-space-between ">
                    <div className="logo_box">
                        <img src={`${color == "black" ? "/img/02_logo_black.png" : "/img/01_logo_white.png"}`} />
                    </div>
                    <div className="d-flex gap-4">
                        { !accessToken ?
                            <>
                                <div>
                                    <p className={`${color == "black" ? "text-black" : "text-white"} text-15 default_font cursor-point`} onClick={() => {
                                        router.push('/customer/login')
                                    }}>Login</p>
                                </div>
                                <div>
                                    <p className={`${color == "black" ?"text-black" : "text-white"} text-15 default_font cursor-point`} onClick={() => {
                                        router.push('/customer/join')
                                    }}>Join</p>
                                </div>
                            </>
                        :
                            <>
                                <div>
                                    <p className={`${color == "black" ? "text-black" : "text-white" } text-15 default_font cursor-point`} onClick={() => logout}>Logout</p>
                                </div>
                            </>
                        }

                        <div>
                            <FiSearch size={"20"} color={`${color == "black" ? "black" : "white"}`} className="cursor-point"/>
                        </div>
                        <div>
                            <FiShoppingCart size={"20"} color={`${color == "black" ? "black" : "white"}`} className="cursor-point"/>
                        </div>
                        {!hamburgerOpenYn ? (
                            <div onClick={setHamburgerOpenYn}>
                                <FiMenu size={"20"} color={`${color == "black" ? "black" : "white"}`} className="cursor-point" />
                            </div>
                        ) : <div className="pl-15"></div>}

                    </div>
                </div>
            </header>

            {/* 로그인을 안 한 상태 */}
        </>
    );
}
