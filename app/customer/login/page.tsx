"use client";

import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {notify} from "@/util/toast";

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

            localStorage.setItem("accessToken", auth ?? "");
            localStorage.setItem("refreshToken", refresh ?? "");
            router.push("/");

        } catch(error) {
            notify.error("로그인 실패");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <p>이메일</p>
                    <input className="default_input" type={"text"} {...register('email')} />
                </div>
                <div>
                    <p>패스워드</p>
                    <input className="default_input" type={"password"} {...register("password")} />
                </div>
                <div>
                    <button type="submit">로그인</button>
                    <button type="button" onClick={() => {
                        router.push("/")
                    }}>홈으로</button>
                </div>
            </form>

        </>
    )
}