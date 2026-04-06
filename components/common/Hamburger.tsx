"use client";
import { useState} from "react";
import {TfiClose} from "react-icons/tfi";
import instanceAcf from "@/util/axiosInterceptors";
import {useQuery} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";

type accordionType = {
    categoryCode: string;
    categoryName: string;
    categoryValue: string | null;
    parentCode: string | null;
    sort: number;
}

export default function Hamburger({
                                      hamburgerOpenYn,
                                      setHamburgerOpenYn,
                                  }: {
    hamburgerOpenYn: boolean;
    setHamburgerOpenYn: () => void;
}) {
    const [csAccordion, setCsAccordion] = useState<boolean>(false);
    const router = useRouter();

    const categoryList = useQuery({
        queryKey: ["ACCORDION_LIST"],
        queryFn: async () => {
            const {data} = await instanceAcf.get("/api/v1/categories")
            return data;
        },
        gcTime: Infinity,   // 이전의 cacheTime이 gcTime으로 변경
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        select: (data) => data.data
    });
    const [openCategory, setOpenCategory] = useState<string | null>();

    // 아코디언 클릭하면 해당 값이 변경되어야 한다.
    const handleAccordion = (menu: string) => {
        setOpenCategory(prev => prev === menu ? null : menu);   // 현재 클릭한 1뎁스를 넣는다.
    }


    return (
        <>
            <div className="hamburger_container hamburger_background">
                <div className="hamburger_header">
                    <div className="d-flex mt-15 flex-justify-space-between ">
                        <div className="hamburger_logo_container">
                            <img className="wd-100" src={"/img/01_logo_white.png"}/>
                        </div>
                        <div className="d-flex gap-4 mr-10">
                            <div onClick={setHamburgerOpenYn}>
                                <TfiClose size={"20"} color="white" className="cursor-point"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hamburger_menu">
                    <div className="d-flex flex-col">
                        <span className="hamburger_menu_list default_font">MY PAGE</span>
                        <span className="hamburger_menu_list default_font">ORDER</span>
                    </div>
                    <div className="mt-20 mb-20">
                        {/* cart에 대한 값도 조회해야 됨*/}
                        <span className="hamburger_menu_list default_font">CART(0)</span>
                    </div>

                    <div className="hamburger_category">
                        <ul className="hamburger_category_ul accordion">
                            {/* 카테고리 리스트를 map을 통해서 보여준다. */}
                            {!(categoryList.isLoading || categoryList.isFetching)
                                && categoryList.data.filter((d: accordionType) => d.parentCode == null)
                                    .map((item: accordionType) => {
                                        const isOpen = openCategory === item.categoryCode;
                                        return (
                                                <li key={item.categoryCode}
                                                    onClick={() => {
                                                        // 만약 1뎁스에서 끝나는 거라면 링크 타고 이동해야 됨
                                                        const subCategory: [] = categoryList.data.filter((d: accordionType) => d.parentCode == item.categoryCode)
                                                        // 임시로 # 으로 이동
                                                        subCategory.length == 0 ? window.location.href = "#" : handleAccordion(item.categoryCode)
                                                    } }>
                                                    <div>{item.categoryName}</div>
                                                    {isOpen && (
                                                        <ul>
                                                            {categoryList.data.filter((sub: accordionType) => sub.parentCode === item.categoryCode)
                                                                .map((sub: accordionType) => (
                                                                    <li key={sub.categoryCode} onClick={setHamburgerOpenYn}>
                                                                        <Link className="text-white" href={`/product/list?categoryCode=${sub.categoryCode}`}>
                                                                            {sub.categoryName}
                                                                        </Link>
                                                                    </li>

                                                                ))}
                                                        </ul>
                                                    )}
                                                </li>
                                        )
                                    })
                            }
                            <li className="text-15 mt-20" onClick={() => csAccordion ? setCsAccordion(false) : setCsAccordion(true)}>CS CENTER</li>
                            {/* CS CENTER 하위 리스트 */}
                            <ul className={`accordion_container ${csAccordion && "open"}`}>
                                <li>
                                    <p className="call">
                                        <a href="tel:010-2029-5309"> 010-2029-5309</a>
                                    </p>
                                    <p><strong>open</strong> 11:00 A.M~ 19:00 P.M<br/>
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
