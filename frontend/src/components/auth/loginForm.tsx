"use client";
import { useState } from "react";

interface Login {
  id: string;
  pw: string;
}

export default function LoginForm() {
  const [loginInfo, setLoginInfo] = useState<Login>({ id: "", pw: "" });
  console.log(loginInfo)

  const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setLoginInfo({...loginInfo, [name]:value})
  }

  return (
    <div className="my-10 text-gray-700 w-full max-w-sm">
      <h2 className="text-3xl font-bold text-center mb-8">로그인</h2>
      <div className="space-y-5">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            onChange={changeInput}
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex space-x-2">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            onChange={changeInput}
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <button className="w-full py-3 mt-4 bg-primary-color text-white rounded-md font-semibold ">
          로그인
        </button>
      </div>
    </div>
  );
}
