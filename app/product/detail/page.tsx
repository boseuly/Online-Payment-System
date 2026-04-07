"use client"
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import MainHeader from "@/components/common/MainHeader";
import Hamburger from "@/components/common/Hamburger";
import {useQuery} from "@tanstack/react-query";
import Image from "next/image";
import instanceAcf from "@/util/axiosInterceptors";

export default function ProductDetail() {

    const searchParams = useSearchParams();
    const productCode = searchParams.get("productCode");

    const [hamburgerOpenYn, setHamburgerOpenYn] = useState(false);

    const productInfo = useQuery({
        queryKey: ["PRODUCT_INFO", productCode],
        queryFn: async () => {
            const {data} = await instanceAcf.get(`/api/v1/products/${productCode}`);
            return data;
        },
        gcTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        select: data => data?.data
    });

    useEffect(() => {
        console.log(productInfo?.data)
    }, [productInfo]);

    return (
        <>
        {/* 공통 헤더 START */}
        <MainHeader
            hamburgerOpenYn={hamburgerOpenYn}
            setHamburgerOpenYn={() => setHamburgerOpenYn(!hamburgerOpenYn)}
            color={"black"}
        ></MainHeader>
        {hamburgerOpenYn && (
            <Hamburger
                hamburgerOpenYn={hamburgerOpenYn}
                setHamburgerOpenYn={() => setHamburgerOpenYn(!hamburgerOpenYn)}
            />
        )}
        {/* 공통 헤더 END */}
            <div className="pd_detail_box">
                <div className="pd_detail_top">
                    <div className="p-tb-60 p-lr-15">
                        {!(productInfo.isLoading || productInfo.isFetching) && productInfo?.data ?
                            <div className="pd_detail_top_box d-flex mo_d_block mo_wd_100">
                                <div className="wd-50 p-5 mo_wd_100">
                                    <Image src={`${productInfo?.data?.thumbnailPath}`}
                                           alt="Cursed Allure - 마녀, 유물, 신화적 반지 이미지"
                                           width={300}
                                           height={300}
                                           style={{
                                               width: '100%',
                                               height: 'auto',
                                           }}
                                    />

                                </div>
                                <div className="wd-50 p-5 mo_wd_100">
                                    <p className="font-700">{productInfo?.data?.productName}</p>
                                    <div className="d-flex gap-10 mt-15">
                                        <ul className="wd-15">
                                            <li className="pb-15">판매가</li>
                                            <li className="pb-15">배송방법</li>
                                            <li className="pb-15">배송비</li>
                                            <li>SIZE</li>
                                        </ul>
                                        <ul className="wd-80">
                                            <li className="pb-15 text-bold">{productInfo?.data?.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</li>
                                            <li className="pb-15">택배</li>
                                            <li className="pb-15">무료</li>
                                            <li>
                                                <select className="border-1 text-center wd-100 hg-100 default">
                                                    <option>[필수] 옵션을 선택해주세요.</option>
                                                    <option disabled={true}>---------------------</option>
                                                    <option disabled={true}>SIZE</option>
                                                    {/*{productInfo?.data?.itemList?.optionName}*/}

                                                </select>
                                            </li>
                                        </ul>


                                    </div>


                                </div>
                            </div>


                            : ""}
                    </div>
                </div>
                <div className="pd_detail_body">


                </div>


            </div>

        </>
    )
}