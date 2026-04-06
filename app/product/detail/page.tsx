"use client"
import {useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import MainHeader from "@/components/common/MainHeader";
import Hamburger from "@/components/common/Hamburger";
import {useQuery} from "@tanstack/react-query";
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
                    {!(productInfo.isLoading || productInfo.isFetching) && productInfo?.data ?
                    <>
                      sdfsdf
                    </>
                    : ""}

                </div>
                <div className="pd_detail_body">


                </div>


            </div>

        </>)
}