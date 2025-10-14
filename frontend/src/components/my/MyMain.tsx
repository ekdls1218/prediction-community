"use client";

import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CategoryPieChart from "./CategoryPieChart";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { clearUser } from "@/redux/userSlice";

interface VotePrediction {
  post_id: number;
  title: string;
  deadline: string;
  pick: boolean;
  result: boolean | null;
  category_name: string;
}

interface MyPrediction {
  post_id: number;
  title: string;
  deadline: string;
  result: boolean | null;
  category_name: string;
}

interface AllStat {
  allCorrect: number;
  allTotal: number;
  allAccuracy: number;
}

interface CategoryStats {
  name: string;
  value: number;
}

export default function MyMain() {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [votePredictions, setVotePredictions] = useState<VotePrediction[]>([]);
  const [myPredictions, setMyPredictions] = useState<MyPrediction[]>([]);
  const [allStats, setAllStats] = useState<AllStat>({
    allCorrect: 0,
    allTotal: 0,
    allAccuracy: 0,
  });
  const [categoryStats, setCategoryStats] = useState<CategoryStats[]>([]);
  const choice = { 0: "틀릴 듯!", 1: "맞을 것 같아!" };

  const handleResultPick = async (postId: number, value: number) => {
    console.log(postId, value);
    await axios
      .post("http://localhost:8000/my/prediction/result", {
        post_id: postId,
        result: value,
      })
      .then((res) => {
        console.log(res.data);
        setMyPredictions((p) =>
          p.map((m) =>
            m.post_id === postId ? { ...m, result: Boolean(value) } : m
          )
        );
      });
  };

  const handleDeleteUser = () => {
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      axios
        .post(
          "http://localhost:8000/auth/delete",
          {},
          { headers: { Authorization: `Bearer ${user.token}` } }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.result === "성공") {
            dispatch(clearUser());
            sessionStorage.removeItem("loginUser");
            router.push("/login");
          }
        });
    }
  };

  useEffect(() => {
    if (!user.id) return;

    axios
      .get("http://localhost:8000/my/stats/all-stat", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setAllStats(res.data);
      });

    axios
      .get("http://localhost:8000/my/stats/category-stat", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setCategoryStats(res.data);
      });

    axios
      .get("http://localhost:8000/my/prediction/votes", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        console.log(res.data);
        setVotePredictions(res.data);
      });
  }, [user.id, pathname]);

  useEffect(() => {
    if (!user.id) return;

    axios
      .get("http://localhost:8000/my/prediction", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        // console.log(res.data);
        setMyPredictions(res.data);
      });
  }, [user.id, setMyPredictions, pathname]);

  return (
    <div className="flex flex-col gap-6 overflow-y-auto scrollbar-hide pr-2 mb-10">
      <section
        id="myprofile"
        className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
      >
        <div className="text-center pb-6 mb-6 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold bg-primary-color">
            {/* {user.psa ? (
              <Image
                src={user.psa}
                alt="프로필 사진"
                width={50}
                height={50}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : ( */}
              <span>{user.nick?.charAt(0).toUpperCase()}</span>
            {/* )} */}
          </div>
          <div className="text-lg font-semibold text-gray-800">{user.nick}</div>
        </div>

        <div
          onClick={() => {
            router.push("/my/edit");
          }}
          className="text-sm text-gray-600 space-y-1"
        >
          <p className="text-lg text-gray-800 flex items-center gap-2">
            ⚙️ 내 정보 수정하기
          </p>
        </div>
      </section>
      {/* 섹션: 통계 */}
      <section id="statistics" className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
          <span>📈 적중률 통계</span>
        </h2>

        {/* 상단 3카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-violet-100 bg-gradient-to-tr from-[#f8f5fc] to-white p-5">
            <div className="text-4xl font-extrabold bg-gradient-to-tr from-[#6B4C9A] to-[#8B5FBF] bg-clip-text text-transparent">
              {allStats.allAccuracy}%
            </div>
            <div className="text-sm text-gray-600 mt-1">전체 적중률</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="text-4xl font-extrabold text-gray-800">
              {allStats.allTotal}
            </div>
            <div className="text-sm text-gray-600 mt-1">전체 참여 횟수</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="text-4xl font-extrabold text-gray-800">
              {allStats.allCorrect}
            </div>
            <div className="text-sm text-gray-600 mt-1">전체 맞힌 횟수</div>
          </div>
        </div>

        {/* 카테고리별 원형 */}
        <div className="rounded-xl border border-gray-100 p-5">
          <div className="text-base font-semibold text-gray-800 mb-4">
            카테고리별 적중률
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {categoryStats.map((cs, i) => {
              return (
                <div key={i}>
                  <CategoryPieChart categoryStat={cs} />
                  <div className="text-center">{cs.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 섹션: 내 예측 목록 */}
      <div id="predictions" className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📝 내 예측 목록
        </h2>
        <div className="flex flex-col gap-3">
          {votePredictions.map((p, i) => (
            <article
              key={i}
              className="rounded-xl border border-gray-100 p-4 hover:shadow-sm transition cursor-pointer"
            >
              <div className="flex items-center justify-between gap-3 mb-1">
                <h3 className="text-[15px] font-semibold text-gray-800 flex-1">
                  {p.title}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    p.result === null || new Date(p.deadline) > new Date()
                      ? "bg-amber-100 text-amber-700"
                      : p.result
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {p.result === null || new Date(p.deadline) > new Date()
                    ? "진행중"
                    : p.result
                    ? "적중"
                    : "오답"}
                </span>
              </div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>{p.category_name}</span>
                <span>•</span>
                <span
                  className={`rounded text-xs font-semibold ${
                    p.pick ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {p.pick ? choice[1] : choice[0]}
                </span>
                <span>선택</span>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-4"></div>
      </div>

      {/* 섹션: 결과 인증 */}
      <section id="verification" className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✓ 결과 인증</h2>

        {myPredictions.map((m, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-100 p-4 mb-3 last:mb-0"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="text-[15px] font-semibold text-gray-800">
                  {m.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  마감일: {m.deadline}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold",
                  ${
                    m.result !== null
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
              >
                {m.result !== null ? "정답 입력 완료" : "정답 입력 대기"}
              </span>
            </div>

            {m.result !== null ? (
              <div className="px-4 py-2 inline-block rounded-lg font-bold bg-primary-color text-white">
                {m.result ? choice[1] : choice[0]}
              </div>
            ) : (
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleResultPick(m.post_id, 1)}
                  className="px-4 py-2 rounded-lg font-bold border-green-200 bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                >
                  {choice[1]}
                </button>
                <button
                  onClick={() => handleResultPick(m.post_id, 0)}
                  className="px-4 py-2 rounded-lg font-bold border-red-200 bg-red-50 text-red-700 hover:bg-red-100 transition-colors"
                >
                  {choice[0]}
                </button>
              </div>
            )}
          </div>
        ))}
      </section>

      <section className="mb-6 pt-6 border-t border-gray-100 text-center">
        <button
          onClick={handleDeleteUser}
          className="px-4 py-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100"
        >
          회원 탈퇴
        </button>
        <p className="text-xs text-gray-500 mt-2">
          회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
        </p>
      </section>
    </div>
  );
}
