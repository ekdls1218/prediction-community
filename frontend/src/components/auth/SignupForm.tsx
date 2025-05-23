"use client";
import Script from "next/script";
import { useState, useRef } from "react";

interface User {
  nick: string;
  id: string;
  pw: string;
  checkPw: string;
  birth: string;
  gender: string | null;
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
    gender: null,
    addr1: "",
    addr2: "",
    addr3: "",
    psa: null,
  });

  const inputRef = useRef<Record<string, HTMLInputElement | null>>({});

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    const { name, value, files} = e.target; 

    if(name === "psa" && files) {
      setUserInfo({ ...userInfo, "psa": files[0] });
    }else {
      setUserInfo({ ...userInfo, [name]: value });
    }
    console.log(userInfo);
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
              onChange={changeInput}
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
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
              onChange={changeInput}
              placeholder="6~12자(대/소문자, 숫자, -_.@^!)를 입력하세요"
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="button"
              className="px-3 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
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
            onChange={changeInput}
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
          type="submit"
          className="w-full py-3 mt-4 bg-primary-color text-white rounded-md font-semibold "
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
