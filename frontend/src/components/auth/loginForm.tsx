"use client";
import { AppDispatch } from "@/redux/store";
import { setUser } from "@/redux/userSlice";
import { isEmpty } from "@/validators";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

interface Login {
  id: string;
  pw: string;
}

export default function LoginForm() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [loginInfo, setLoginInfo] = useState<Login>({ id: "", pw: "" });

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const inputRef = useRef<Record<string, HTMLInputElement | null>>({});
  const loginFormData = new FormData();

  const makeFormData = () => {
    for (const [key, value] of Object.entries(loginInfo)) {
      loginFormData.append(key, value);
    }
  };

  const validCheck = () => {
    if (isEmpty(loginInfo.id) && inputRef.current.id) {
      alert("아이디를 다시 입력해주세요.");
      inputRef.current.id.value = "";
      inputRef.current.id.focus();
      return false;
    }
    if (isEmpty(loginInfo.pw) && inputRef.current.pw) {
      alert("비밀번호를 다시 입력해주세요.");
      inputRef.current.pw.value = "";
      inputRef.current.pw.focus();
      return false;
    }
    return true;
  };

  const login = () => {
    if (validCheck()) {
      makeFormData();
      axios
        .post("http://localhost:8000/auth/login", loginFormData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data.result === "로그인 성공") {
            // console.log(res.data)
            sessionStorage.setItem("loginUser", res.data.token);
            dispatch(setUser({"id":res.data.id, "nick":res.data.nick, "psa": res.data.psa, "token": res.data.token, "isLogin": true}));
            router.push("/");
          } else if (res.data.result === "로그인 실패(아이디)") {
            alert("잘못된 아이디입니다. 다시 입력해주세요.");
            if (inputRef.current.id) {
              inputRef.current.id.value = "";
              inputRef.current.id.focus();
            }
          } else if (res.data.result === "로그인 실패(비밀번호)") {
            alert("잘못된 비밀번호입니다. 다시 입력해주세요.");
            if (inputRef.current.pw) {
              inputRef.current.pw.value = "";
              inputRef.current.pw.focus();
            }
          }
        });
    }
  };

  return (
    <div className="my-10 text-gray-700 w-full max-w-sm">
      <h2 className="text-3xl font-bold text-center mb-8">로그인</h2>
      <div className="space-y-5">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="아이디를 입력해주세요."
            name="id"
            onChange={changeInput}
            ref={(thisInput) => {
              inputRef.current.id = thisInput;
            }}
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <div className="flex space-x-2">
          <input
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="pw"
            onChange={changeInput}
            ref={(thisInput) => {
              inputRef.current.pw = thisInput;
            }}
            className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>
        <button
          onClick={login}
          className="w-full py-3 mt-4 bg-primary-color text-white rounded-md font-semibold "
        >
          로그인
        </button>
      </div>
    </div>
  );
}
