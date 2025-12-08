"use client";
import { useEffect } from "react";
import { FiMenu, FiShoppingCart, FiSearch, FiX } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

export default function Hamburger({
    hamburgerOpenYn,
    setHamburgerOpenYn,
}: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
}) {
    useEffect(() => {
        console.log("햄버거 컴포넌트 hamburgerOpenYn", hamburgerOpenYn);
    });

    return (
        <>
            <div className="hamburger_container hamburger_background">
                <div className="hamburger_header">
                    <div className="d-flex mt-15 justify-space-between ">
                        <div className="hamburger_logo_container">
                            <img className="wd-100" src={"/img/01_logo_white.png"} />
                        </div>
                        <div className="d-flex gap-4 mr-10">
                            <div onClick={setHamburgerOpenYn}>
                                <TfiClose size={"20"} color="white" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hamburger_menu">
                    <div className="d-flex">
                        <span className="hamburger_menu_list default_font">Login</span>
                        <span className="hamburger_menu_list default_font">Join</span>
                    </div>
                    <div className="d-flex">
                        <span className="hamburger_menu_list default_font">My Page</span>
                        <span className="hamburger_menu_list default_font">Order</span>
                    </div>
                    <div className="mt-30 mb-30">
                        <span className="hamburger_menu_list default_font">Cart(0)</span>
                    </div>

                    <div className="hamburger_category">
                        <ul className="hamburger_category_ul">
                            <li className="hamburger_category_li">ABOUT</li>
                            <li>SHOP</li>
                            {/* Shop 하위 리스트 */}
                            <ul className="d-none">
                                <li>ALL</li>
                                <li>RINGS</li>
                                <li>BRACELETS</li>
                                <li>NECKLACE</li>
                                <li>EARRINGS</li>
                                <li>ETC</li>
                                <li>COLLECTION</li>
                                <li>CUSTOM</li>
                                <li>WOMENT</li>
                            </ul>
                            <li>CONTACT US</li>
                            {/* CONTACT US 하위 리스트 */}
                            <ul className="d-none">
                                <li>NOTICE</li>
                                <li>REVIEW</li>
                                <li>Q&A</li>
                                <li>FAQ</li>
                            </ul>
                            <li>SNS</li>
                            {/* SNS 하위 리스트 */}
                            <ul className="d-none">
                                <li>Instagram</li>
                            </ul>
                            <li>CS CENTER</li>
                            {/* CS CENTER 하위 리스트 */}
                            <ul className="d-none">
                                <li>
                                    <p className="call">
                                        <a href="tel:010-2029-5309"> 010-2029-5309</a>
                                    </p>
                                    <p><strong>open</strong>  11:00 A.M~ 19:00 P.M<br/>
                                        <strong>lunch</strong> 12:00 P.M ~ 13:00 P.M</p>
                                        <p>SAT, SUN, HOLIDAY closed</p>
                                </li>
                            </ul>
                            <li>BANK INFO</li>
                        </ul>

                    </div>
                </div>

            </div>
        </>
    );
}
