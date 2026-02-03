"use client";
import { useEffect, useState } from "react";
import { FiMenu, FiShoppingCart, FiSearch, FiX } from "react-icons/fi";
import { TfiClose } from "react-icons/tfi";

export default function Hamburger({
    hamburgerOpenYn,
    setHamburgerOpenYn,
}: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
}) {

    type AccordionKeys = "shop" | "contactUs" | "sns" | "csCenter" | "bankInfo";

    const [accordion, setAccordion] = useState(
        {
            "shop": false,
            "contactUs": false,
            "sns": false,
            "csCenter": false,
            "bankInfo": false
        });
    
    // 아코디언 클릭하면 해당 값이 변경되어야 한다. 
    const handleAccordion = (menu: AccordionKeys) => {
        // menu값과 openAccordion의 키값을 비교해서 
        // 같은 키값을 갖는 메뉴의 value를 !value로 변경해줘야 한다.

        setAccordion((prev) => ({
            ...prev,
            [menu] : !prev[menu]
        }));

        // accordion값을 순회하면서 
        console.log(accordion);
    
    }


    return (
        <>
            <div className="hamburger_container hamburger_background">
                <div className="hamburger_header">
                    <div className="d-flex mt-15 flex-justify-space-between ">
                        <div className="hamburger_logo_container">
                            <img className="wd-100" src={"/img/01_logo_white.png"} />
                        </div>
                        <div className="d-flex gap-4 mr-10">
                            <div onClick={setHamburgerOpenYn}>
                                <TfiClose size={"20"} color="white" className="cursor-point" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hamburger_menu">
                    {/* <div className="d-flex">
                        <span className="hamburger_menu_list default_font">Login</span>
                        <span className="hamburger_menu_list default_font">Join</span>
                    </div> */}
                    <div className="d-flex flex-col">
                        <span className="hamburger_menu_list default_font">MY PAGE</span>
                        <span className="hamburger_menu_list default_font">ORDER</span>
                    </div>
                    <div className="mt-20 mb-20">
                        <span className="hamburger_menu_list default_font">CART(0)</span>
                    </div>

                    <div className="hamburger_category">
                        <ul className="hamburger_category_ul accordion">
                            <li className="hamburger_category_li">ABOUT</li>
                            <li onClick={() => handleAccordion("shop")}>SHOP</li>
                            {/* Shop 하위 리스트 */}
                            <ul className={`accordion_container ${accordion.shop && "open"}`}>
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
                            <li onClick={() => handleAccordion("contactUs")}>CONTACT US</li>
                            {/* CONTACT US 하위 리스트 */}
                            <ul className={`accordion_container ${accordion.contactUs && "open"}`}>
                                <li>NOTICE</li>
                                <li>REVIEW</li>
                                <li>Q&A</li>
                                <li>FAQ</li>
                            </ul>
                            <li onClick={() => handleAccordion("sns")}>SNS</li>
                            {/* SNS 하위 리스트 */}
                            <ul className={`accordion_container ${accordion.sns && "open"}`}>
                                <li>Instagram</li>
                            </ul>
                                <li className="text-15 mt-20" onClick={() => handleAccordion("csCenter")}>CS CENTER</li>
                            {/* CS CENTER 하위 리스트 */}
                            <ul className={`accordion_container ${accordion.csCenter && "open"}`}>
                                <li>
                                    <p className="call">
                                        <a href="tel:010-2029-5309"> 010-2029-5309</a>
                                    </p>
                                    <p><strong>open</strong>  11:00 A.M~ 19:00 P.M<br />
                                        <strong>lunch</strong> 12:00 P.M ~ 13:00 P.M</p>
                                    <p>SAT, SUN, HOLIDAY closed</p>
                                </li>
                            </ul>
                            <li className="text-15">BANK INFO</li>
                        </ul>

                    </div>
                </div>

            </div>
        </>
    );
}
