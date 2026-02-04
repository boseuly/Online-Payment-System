"use client";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter} from "next/navigation";
import {notify} from "@/util/toast";
import MainHeader from "@/components/common/MainHeader";


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
    const [hamburgerOpenYn, setHamburgerOpenYn] = useState(false);


    const {
        register,
        handleSubmit
    } = useForm<SignupForm>({
        defaultValues: initForm,
    });

    // 전화번호 목록 data
    const telData = ['010', '011', '016', '017', '018', '019'].map(
        item => ({label: item, value: item})
    );

    const onSubmit = async (data: SignupForm) => {
        console.log(data)
        try {
            const response = await fetch(`/api/v1/customer/join`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
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

    // 전화번호 올바른 입력 확인
    function checkNumber(event: React.FormEvent<HTMLInputElement>) {
        console.log('event : ',event.target);
        const data = event.target as HTMLInputElement;
        // 숫자형식인지 확인
        if((Number(data.value) >= 0 && Number(data.value) <= 9) ) {
            return true;
        }

        return false;
    }


    return (
        <>
            <MainHeader
                hamburgerOpenYn={hamburgerOpenYn}
                setHamburgerOpenYn={() => setHamburgerOpenYn(!hamburgerOpenYn)}
                color={"black"}
            ></MainHeader>
            <form className="mt-50"
                  onSubmit={handleSubmit(onSubmit)}>
                <div className="d-flex flex-justify-center wd-100">
                    <div className="mo-wd-90 wd-70">
                        {/* 공통 타이틀 */}
                        <div className="common-title text-center p-tb-15 text-30 font-600">회원가입</div>

                        <div className="d-flex">
                            <p className="wd-20">이름</p>
                            <input className="gray_input border-1 wd-80" type={"text"} {...register("customerName")}/>
                        </div>
                        <div className="d-flex mt-10">
                            <p className="wd-20">아이디</p>
                            <input className="gray_input border-1 wd-80" type={"text"} {...register('customerId')} />
                        </div>
                        <div className="d-flex mt-10">
                            <p className="wd-20">패스워드</p>
                            <input className="gray_input border-1 wd-80" type={"password"} {...register("password")} />
                        </div>
                        <div className="d-flex mt-10">
                            <p className="wd-20">이메일</p>
                            <input className="gray_input border-1 wd-80" type={"email"} {...register("email")}/>
                        </div>
                        <div className="d-flex mt-10 wd-100">
                            <p className="wd-20">핸드폰 번호</p>
                            <div className="d-flex flex-justify-space-around wd-80">
                                <select className="border-1 wd-32 text-center">
                                    {telData.map((d) => {
                                        return (<>
                                            <option key={d.value}>{d.value}</option>
                                        </>)
                                    })}

                                </select>
                                <div className="d-flex flex-align-center">-</div>
                                <input maxLength={4} className="gray_input border-1 wd-32" type="text" pattern="[0-9]+"  {...register("phoneNumber")} onChange={(e) => checkNumber(e)} />
                                <div className="d-flex flex-align-center">-</div>
                                <input maxLength={4} className="gray_input border-1 wd-32" type="text" pattern="[0-9]+" {...register("phoneNumber")} onChange={(e) => checkNumber(e)}/>
                            </div>
                        </div>
                        <div className="gap-3 mt-30">
                            <button className="wd-100 black_btn border-2" type="submit">가입</button>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}