import { FiMenu, FiShoppingCart, FiSearch } from "react-icons/fi";

import { useState, useEffect } from "react";

export default function MainHeader({
    hamburgerOpenYn,
    setHamburgerOpenYn,
}: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
}) {
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
                            <p className="text-15 default_font text-white">Login</p>
                        </div>
                        <div>
                            <p className="text-15 default_font text-white">Join</p>
                        </div>
                        <div>
                            <FiSearch size={"20"} color="white" />
                        </div>
                        <div>
                            <FiShoppingCart size={"20"} color="white" />
                        </div>
                        { !hamburgerOpenYn ? (
                        <div onClick={setHamburgerOpenYn}>
                            <FiMenu size={"20"} color="white" />
                        </div>
                        ) : <div className="pl-15"></div>}
                        
                    </div>
                </div>
            </header>

            {/* 로그인을 안 한 상태 */}
        </>
    );
}
