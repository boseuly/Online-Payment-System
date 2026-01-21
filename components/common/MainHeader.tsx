"use client";
import { useRouter } from "next/navigation"; 
import { useState, useEffect } from "react";
import { FiMenu, FiShoppingCart, FiSearch } from "react-icons/fi";


export default function MainHeader({
    hamburgerOpenYn,
    setHamburgerOpenYn,
}: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
}) {

    const router = useRouter();

    // const handleClick = (e: any) => {
    //     e.preventDefault()
    //     router.push(href)
    // }

    return (
        <>
            {/* 로그인을 한 상태 */}
            <header className="p-fixed wd-100 z-index-100 ">
                <div className="d-flex m-15 justify-space-between ">
                    <div className="logo_box">
                        <img src={"/img/01_logo_white.png"} />
                    </div>
                    <div className="d-flex gap-4">
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
                        <div>
                            <FiSearch size={"20"} color="white" className="cursor-point" />
                        </div>
                        <div>
                            <FiShoppingCart size={"20"} color="white" className="cursor-point" />
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
