"use client";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";
import { FiMenu, FiShoppingCart, FiSearch } from "react-icons/fi";
import {apiFetch} from "@/util/common_function";


export default function MainHeader({
    hamburgerOpenYn,
    setHamburgerOpenYn,
}: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
}) {

    const router = useRouter();

    const [accessToken, setAccessToken] = useState<string | null>(null);

    // 토큰 저장 및 변경 감지 업데이트
    useEffect(() => {
        const sync = () => setAccessToken(localStorage.getItem("accessToken"));
        window.addEventListener("storage", sync);                   // 탭a 에서 로그아웃했을 때 localStorage.removeItem("accessToken")을 해주면
        return () => window.removeEventListener("storage", sync);   // 탭b 또한 자동으로 변경된 걸 감지할 수 있도록 storage 이벤트 발생하고, sync() 실행
        // 참고로 같은 탭에서는 적용이 안 되므로, 로그아웃 할 때 setAccessToken 업데이트 필수
    }, [])

    // 로그아웃 실행
    const logout = () => {
        const res = apiFetch("api/v1/customer/logout")

    }

    return (
        <>
            {/* 로그인을 한 상태 */}
            <header className="p-fixed wd-100 z-index-100 ">
                <div className="d-flex m-15 justify-space-between ">
                    <div className="logo_box">
                        <img src={"/img/01_logo_white.png"} />
                    </div>
                    <div className="d-flex gap-4">
                        {accessToken ?
                            <>
                                <div>
                                    <p className="text-15 default_font text-white cursor-point" onClick={() => {
                                        router.push('/customer/login')
                                    }}>Login</p>
                                </div>
                                <div>
                                    <p className="text-15 default_font text-white cursor-point" onClick={() => {
                                        router.push('/customer/join')
                                    }}>Join</p>
                                </div>
                            </>
                        :
                            <>
                                <div>
                                    <p className="text-15 default_font text-white cursor-point" onClick={() => logout}>Logout</p>
                                </div>
                            </>
                        }

                        <div>
                            <FiSearch size={"20"} color="white" className="cursor-point"/>
                        </div>
                        <div>
                            <FiShoppingCart size={"20"} color="white" className="cursor-point"/>
                        </div>
                        {!hamburgerOpenYn ? (
                            <div onClick={setHamburgerOpenYn}>
                                <FiMenu size={"20"} color="white" className="cursor-point" />
                            </div>
                        ) : <div className="pl-15"></div>}

                    </div>
                </div>
            </header>

            {/* 로그인을 안 한 상태 */}
        </>
    );
}
