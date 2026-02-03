"use client";

import {useForm} from "react-hook-form";
import { useState } from "react";
import {useRouter} from "next/navigation";
import {notify} from "@/util/toast";
import MainHeader from "@/components/common/MainHeader";
import Footer from "@/app/footer";

interface FormValue {
    email: string;
    password: string;
}
const initForm= {
    email : "",
    password: ""
}

export default function Login () {
    const router = useRouter();
    const [hamburgerOpenYn, setHamburgerOpenYn] = useState(false);

    const {
        register,
        handleSubmit,
    } = useForm<FormValue>({
        defaultValues: initForm
    })

    const onSubmit = async (data: FormValue)=> {
        try {
            const res = await fetch(`/api/v1/auth/login`,{
                method: "POST",
                headers: {
                    "content-type" : "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            });
            const auth = res.headers.get("authorization");
            const refresh = res.headers.get("authorization-refresh");

            localStorage.setItem("accessToken", auth ?? "");        // accessToken 값
            localStorage.setItem("refreshToken", refresh ?? "");    // refreshToken 값
            router.push("/");

        } catch(error) {
            notify.error("로그인 실패");
        }
    }

    return (
        <>
            {/* header */}
            <MainHeader
                hamburgerOpenYn={hamburgerOpenYn}
                setHamburgerOpenYn={() => setHamburgerOpenYn(!hamburgerOpenYn)}
                color={"black"}
            ></MainHeader>
            <form className="mt-50" onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-justify-center wd-100">
                    <div className="mo-wd-90 wd-70">
                        {/* 공통 타이틀 */}
                        <div className="common-title text-center p-tb-15 text-30 font-600">로그인</div>
                        <div className="d-flex flex-col flex-align-center flex-justify-space-around gap-3">
                            {/* validation은 이메일로 함 */}
                            <input className="gray_input border-2 wd-100" type={"text"} {...register('email')} placeholder="이메일을 입력해주세요."/>
                            <input className="gray_input border-2 wd-100" type={"password"} {...register("password")} placeholder="패스워드를 입력해주세요."/>
                        </div>
                        <div className="d-flex flex-align-center flex-justify-space-around gap-3 mt-30">
                            <button className="wd-100 black_btn border-2" type="submit">로그인</button>
                        </div>
                        <div className="d-flex flex-align-center flex-justify-center p-15 text-13">
                            <a href="" className="text-14 color-dark-gray text-center p-lr-10">아이디 찾기</a>
                            <a href="" className="text-14 color-dark-gray border-left-1-gray text-center p-lr-10">비밀번호 찾기</a>
                            <a href="" className="text-14 color-dark-gray border-left-1-gray text-center p-lr-10">회원가입</a>
                        </div>
                    </div>

                </div>
            </form>
            {/* footer */}
            <Footer></Footer>

        </>
    )
}