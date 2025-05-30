"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { clearUser } from "@/redux/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  return (
    <div className="h-20 py-5 flex items-center justify-between px-6">
      <h1
        onClick={() => {
          router.push("/");
        }}
        className="font-pyeongchang font-bold text-5xl text-primary-color"
      >
        과연 맞을까?
      </h1>
      {user.isLogin ? (
        <nav className="flex space-x-4 text-gray-700 text-lg">
          <a href="/my" className="hover:text-primary-color">
            마이 페이지
          </a>
          <button
            onClick={() => {
              dispatch(clearUser());
              sessionStorage.removeItem("loginUser");
              router.push("/login");
            }}
            className="hover:text-primary-color"
          >
            로그아웃
          </button>
        </nav>
      ) : (
        <nav className="flex space-x-4 text-gray-700 text-lg">
          <a href="/login" className="hover:text-primary-color">
            로그인
          </a>
          <a href="/signup" className="hover:text-primary-color">
            회원가입
          </a>
        </nav>
      )}
    </div>
  );
}
