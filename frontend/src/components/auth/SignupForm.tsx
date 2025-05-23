"use client";
import {
  containsHS,
  isEmpty,
  lessThan,
  notContains,
  notEqual,
} from "@/validators";
import axios from "axios";
import Script from "next/script";
import { useState, useRef } from "react";

interface User {
  nick: string;
  id: string;
  pw: string;
  checkPw: string;
  birth: string;
  gender: string;
  addr1: string;
  addr2: string;
  addr3: string;
  psa: File | null;
}

interface DaumPostcodeData {
  address: string;
  roadAddress: string;
  jibunAddress: string;
  zonecode: string;
  userSelectedType: string;
}

export default function SignUpForm() {
  const gender = [
    { label: "남성", value: "male" },
    { label: "여성", value: "female" },
  ];

  const [userInfo, setUserInfo] = useState<User>({
    nick: "",
    id: "",
    pw: "",
    checkPw: "",
    birth: "",
    gender: gender[0].value,
    addr1: "",
    addr2: "",
    addr3: "",
    psa: null,
  });

  const [checkDuplicate, setCheckDuplicate] = useState({
    nick: false,
    id: false,
  });

  const userFromData = new FormData();

  const inputRef = useRef<Record<string, HTMLInputElement | null>>({});

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    const { name, value, files } = e.target;

    if (name === "nick") {
      setCheckDuplicate({ ...checkDuplicate, nick: false });
    }

    if (name === "id") {
      setCheckDuplicate({ ...checkDuplicate, id: false });
    }

    if (name === "psa" && files) {
      setUserInfo({ ...userInfo, psa: files[0] });
    } else {
      setUserInfo({ ...userInfo, [name]: value });
    }
    // console.log(userInfo);
  };

  const doubleCheckId = () => {
    axios
      .get(`http://localhost:8000/auth/check-id?id=${userInfo.id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result === "사용 가능한 ID") {
          setCheckDuplicate({ ...checkDuplicate, id: true });
        } else {
          alert(`${res.data.result}입니다.`);
          if (inputRef.current.id) {
            inputRef.current.id.value = "";
            inputRef.current.id.focus();
          }
        }
      });
  };

  const doubleCheckNick = () => {
    axios
      .get(`http://localhost:8000/auth/check-nick?nick=${userInfo.nick}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.result === "사용 가능한 닉네임") {
          setCheckDuplicate({ ...checkDuplicate, nick: true });
        } else {
          alert(`${res.data.result}입니다.`);
          if (inputRef.current.nick) {
            inputRef.current.nick.value = "";
            inputRef.current.nick.focus();
          }
        }
      });
  };

  const makeFormData = () => {
    for (const [key, value] of Object.entries(userInfo)) {
      // console.log(key, value);
      userFromData.append(key, value);
    }
  };

  const showAddSearchAddr = () => {
    new window.daum.Postcode({
      oncomplete: function (data: DaumPostcodeData) {
        let roadAddr;
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          roadAddr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          roadAddr = data.jibunAddress;
        }
        setUserInfo({ ...userInfo, addr1: data.zonecode, addr2: roadAddr });
      },
    }).open();

    inputRef.current.addr3?.focus();
  };

  const signup = () => {
    if (validCheck()) {
      console.log(userInfo)
      makeFormData();
      axios
        .post("http://localhost:8000/auth/signup", userInfo, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);

        });
    }
  };

  const validCheck = () => {
    // 닉네임
    if (
      (isEmpty(userInfo.nick) || lessThan(userInfo.nick, 2)) &&
      inputRef.current.nick &&
      checkDuplicate.nick
    ) {
      // console.log("nick");
      inputRef.current.nick.value = "";
      inputRef.current.nick.focus();
      return false;
    }
    // 아이디
    if (
      (isEmpty(userInfo.id) ||
        lessThan(userInfo.id, 6) ||
        containsHS(userInfo.id)) &&
      inputRef.current.id &&
      checkDuplicate.id
    ) {
      // console.log("id");
      inputRef.current.id.value = "";
      inputRef.current.id.focus();
      return false;
    }
    // 비밀번호, 비밀번호 확인
    if (
      (isEmpty(userInfo.pw) ||
        lessThan(userInfo.pw, 6) ||
        notContains(userInfo.pw, "-_.@^!") ||
        notEqual(userInfo.pw, userInfo.checkPw)) &&
      inputRef.current.pw &&
      inputRef.current.checkPw
    ) {
      // console.log("pw");
      inputRef.current.pw.value = "";
      inputRef.current.checkPw.value = "";
      inputRef.current.pw.focus();
      return false;
    }
    // 생년월일
    if (isEmpty(userInfo.birth) && inputRef.current.birth) {
      // console.log("birth");
      inputRef.current.birth.value = "";
      inputRef.current.birth.focus();
      return false;
    }
    // 상세주소
    if (
      (isEmpty(userInfo.addr1) ||
        isEmpty(userInfo.addr2) ||
        isEmpty(userInfo.addr3)) &&
      inputRef.current.addr3
    ) {
      // console.log("addr");
      inputRef.current.addr3.value = "";
      inputRef.current.addr3.focus();
    }
    return true;
  };

  return (
    <div className="my-10 text-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8">회원가입</h2>
      <div className="space-y-5">
        {/* 닉네임 */}
        <div>
          <label className="block text-sm font-medium mb-1">닉네임</label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
              name="nick"
              maxLength={10}
              onChange={changeInput}
              ref={(thisInput) => {
                inputRef.current.nick = thisInput;
              }}
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="button"
              onClick={doubleCheckNick}
              className={`px-3 py-2 rounded-md ${
                checkDuplicate.nick
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-primary-color text-white"
              }`}
            >
              중복 확인
            </button>
          </div>
        </div>

        {/* 아이디 */}
        <div>
          <label className="block text-sm font-medium mb-1">아이디</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="id"
              maxLength={12}
              onChange={changeInput}
              ref={(thisInput) => {
                inputRef.current.id = thisInput;
              }}
              placeholder="6~12자(대/소문자, 숫자, -_.@^!)를 입력하세요"
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="button"
              onClick={doubleCheckId}
              className={`px-3 py-2 rounded-md ${
                checkDuplicate.id
                  ? "bg-gray-200 hover:bg-gray-300"
                  : "bg-primary-color text-white"
              }`}
            >
              중복 확인
            </button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div>
          <label className="block text-sm font-medium mb-1">비밀번호</label>
          <input
            type="password"
            name="pw"
            maxLength={12}
            onChange={changeInput}
            ref={(thisInput) => {
              inputRef.current.pw = thisInput;
            }}
            placeholder="6~12자(대/소문자, 숫자, -_.@^!)를 입력하세요"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* 비밀번호 확인 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            비밀번호 확인
          </label>
          <input
            type="password"
            name="checkPw"
            maxLength={12}
            onChange={changeInput}
            ref={(thisInput) => {
              inputRef.current.checkPw = thisInput;
            }}
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* 생년월일 */}
        <div>
          <label className="block text-sm font-medium mb-1">생년월일</label>
          <input
            type="date"
            name="birth"
            onChange={changeInput}
            ref={(thisInput) => {
              inputRef.current.birth = thisInput;
            }}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* 성별 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성별
          </label>
          <div className="flex space-x-3">
            {gender.map((g) => (
              <button
                key={g.value}
                name="gender"
                onClick={() =>
                  setUserInfo({ ...userInfo, ["gender"]: g.value })
                }
                className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 data-[selected=true]:bg-primary-color data-[selected=true]:text-white"
                data-selected={userInfo.gender === g.value}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* 주소 */}
        <div className="space-y-3">
          <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
          <label className="block text-sm font-medium text-gray-700">
            주소
          </label>

          {/* 우편번호 + 검색 버튼 */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="우편번호"
              name="addr1"
              readOnly
              value={userInfo.addr1}
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="button"
              onClick={showAddSearchAddr}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              우편번호 검색
            </button>
          </div>

          {/* 기본 주소 */}
          <input
            type="text"
            placeholder="주소"
            name="addr2"
            readOnly
            value={userInfo.addr2}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />

          {/* 상세 주소 */}
          <input
            type="text"
            placeholder="상세주소"
            name="addr3"
            onChange={changeInput}
            ref={(thisInput) => {
              inputRef.current.addr3 = thisInput;
            }}
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* 프로필 사진 (선택) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            프로필 사진 (선택)
          </label>
          <input
            type="file"
            accept="image/*"
            name="psa"
            onChange={changeInput}
            className="w-full text-gray-600"
          />
        </div>

        {/* 제출 버튼 */}
        <button
          // type="submit"
          onClick={signup}
          className="w-full py-3 mt-4 bg-primary-color text-white rounded-md font-semibold "
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
