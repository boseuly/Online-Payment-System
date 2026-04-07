"use client"
import {useQuery} from "@tanstack/react-query";
import instanceAcf from "../../../util/axiosInterceptors";
import {useState} from "react";
import { useSearchParams } from "next/navigation";
import MainHeader from "@/components/common/MainHeader";
import Link from "next/link";
import Image from "next/image";
import Hamburger from "@/components/common/Hamburger";


type productType = {
    productCode: string;
    productName: string;
    categoryCode: string;
    productPrice: number;
    useYn: string;
    thumbnailPath: string;
}

export default function ProductList() {
    const searchParams = useSearchParams(); // 파라미터 가져오기
    const categoryCode = searchParams.get("categoryCode");

    const [hamburgerOpenYn, setHamburgerOpenYn] = useState(false);

    // 상품 코드 리스트 가져오기
    const productList = useQuery({
        queryKey: ["PRODUCT_LIST", categoryCode],
        queryFn: async () => {
            const {data} = await instanceAcf.get(`/api/v1/products?categoryCode=${categoryCode}`);
            return data;
        },
        gcTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        select: (data) => data.data
    });
    // 카테고리명 가져오기
    const categoryInfo = useQuery({
        queryKey: ["CATEGORY_INFO", categoryCode],
        queryFn: async () => {
            const {data} = await instanceAcf.get(`/api/v1/categories/${categoryCode}`);
            return data;
        },
        gcTime: Infinity,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
        select: (data) => data.data
    });

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

            {/* 상품 카테고리명 노출 공간 START */}
            <div className="pt-70 default_font wd-100 text-center text-bold">
                {!(categoryInfo?.isLoading || categoryInfo?.isFetching) &&
                    categoryInfo?.data ? categoryInfo?.data?.categoryName : ""}
            </div>
            {/* 상품 카테고리명 노출 공간 END */}
            <div className="p-tb-40 p-lr-15">
                <div>
                    <ul className="pd_list grid wd-100">
                        {!(productList?.isLoading || productList?.isFetching)
                            && productList?.data?.map((item: productType) => {
                                return (
                                    <li key={item.productCode}>
                                        <div className="thumbnail wd-100 position-relative">
                                            <Link href={`/product/detail?productCode=${item.productCode}`}>
                                                <Image src={`${item.thumbnailPath}`}
                                                       alt="Cursed Allure - 마녀, 유물, 신화적 반지 이미지"
                                                       width={300}
                                                       height={300}
                                                       style={{
                                                           width: '100%',
                                                           height: 'auto',
                                                       }}
                                                />
                                            </Link>
                                        </div>
                                        <div className="description">
                                            <Link href={`/product/detail?productCode=${item.productCode}`}>
                                                <p className="text-center text-black">{item.productName}</p>
                                            </Link>
                                            <p className="text-center text-bold">{item.productPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</p>

                                        </div>
                                    </li>
                            )
                            })
                        }
                    </ul>
                </div>
                </div>
            </>
            )
            }