"use client";
import {useState} from "react";
import { useForm } from "react-hook-form";
import {useRouter} from "next/navigation";
import {notify} from "@/util/toast";


interface SignupForm {
    customerId: string;
    email: string;
    phoneNumber: string;
    password: string;
    customerName: string;
}

const initForm = {
    customerId: "",
    email: "",
    phoneNumber: "",
    password: "",
    customerName: "",
}

export default function Join() {
    const router = useRouter();

    const {
        register,
        handleSubmit
    } = useForm<SignupForm>({
        defaultValues :initForm,
    });

    const onSubmit = async (data: SignupForm) => {
        console.log(data)
        try {
            const response = await fetch(`/api/v1/customer/join`, {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                notify.error("회원가입 실패");
            } else {
                router.push("/customer/login")
                notify.info("성공");
            }
        } catch (error) {
            notify.error("이메일이 중복되었습니다.");
        }
    };


    return (
        <>
            <form
                onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>이름</p>
                    <input className="default_input" type={"text"} {...register("customerName")}/>
                </div>
                <div>
                    <p>아이디</p>
                    <input className="default_input" type={"text"} {...register('customerId')} />
                </div>
                <div>
                    <p>패스워드</p>
                    <input className="default_input" type={"password"} {...register("password")} />
                </div>
                <div>
                    <p>이메일</p>
                    <input className="default_input" type={"email"} {...register("email")}/>
                </div>
                <div>
                    <p>핸드폰 번호</p>
                    <input type={"tel"} {...register("phoneNumber")} />
                </div>
                <div>
                    <button type="submit">가입</button>
                    <button onClick={() => router.push("/")}>취소</button>
                </div>

            </form>
        </>
    )
}