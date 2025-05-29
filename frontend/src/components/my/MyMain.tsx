
export default function MyMain() {
  return (
    <div className="flex flex-col gap-6 overflow-y-auto pr-2 mb-10">
      {/* 섹션: 통계 */}
      <section id="statistics" className="bg-white rounded-2xl shadow-sm p-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-5">
          <span>📈 적중률 통계</span>
        </h2>

        {/* 상단 3카드 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="rounded-xl border border-violet-100 bg-gradient-to-tr from-[#f8f5fc] to-white p-5">
            <div className="text-4xl font-extrabold bg-gradient-to-tr from-[#6B4C9A] to-[#8B5FBF] bg-clip-text text-transparent">
              %
            </div>
            <div className="text-sm text-gray-600 mt-1">전체 적중률</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="text-4xl font-extrabold text-gray-800"></div>
            <div className="text-sm text-gray-600 mt-1">전체 참여 횟수</div>
          </div>
          <div className="rounded-xl border border-gray-100 bg-white p-5">
            <div className="text-4xl font-extrabold text-gray-800"></div>
            <div className="text-sm text-gray-600 mt-1">전체 맞힌 횟수</div>
          </div>
        </div>

        {/* 카테고리별 원형 */}
        <div className="rounded-xl border border-gray-100 p-5">
          <div className="text-base font-semibold text-gray-800 mb-4">
            카테고리별 적중률
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6"></div>
        </div>
      </section>

      {/* 섹션: 내 예측 목록 */}
      <div id="predictions" className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          📝 내 예측 목록
        </h2>
        <div className="flex flex-col gap-3">
          {/* {predictions.map((p, i) => (
                <article
                  key={i}
                  className="rounded-xl border border-gray-100 p-4 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-[15px] font-semibold text-gray-800 flex-1">
                      {p.title}
                    </h3>
                    <span
                      className={[
                        "px-3 py-1 rounded-full text-xs font-semibold",
                        p.status === "적중" && "bg-emerald-100 text-emerald-700",
                        p.status === "진행중" && "bg-amber-100 text-amber-700",
                        p.status === "오답" && "bg-rose-100 text-rose-700",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {p.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    <span>{p.category}</span>
                    <span>•</span>
                    <span>{p.dday}</span>
                    <span>•</span>
                    <span>{p.choice} 선택</span>
                  </div>
                </article>
              ))} */}
        </div>
        <div className="mt-4">
          <button className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-tr from-[#6B4C9A] to-[#8B5FBF] hover:shadow-md">
            새 예측 만들기
          </button>
        </div>
      </div>

      {/* 섹션: 결과 인증 */}
      <section id="verification" className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">✓ 결과 인증</h2>

        {/* {verifications.map((v, i) => (
              <div
                key={i}
                className="rounded-xl border border-gray-100 p-4 mb-3 last:mb-0"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="text-[15px] font-semibold text-gray-800">
                      {v.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      마감일: {v.due}
                    </div>
                  </div>
                  <span
                    className={[
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      v.state === "인증 완료" &&
                        "bg-emerald-100 text-emerald-700",
                      v.state === "인증 대기" && "bg-amber-100 text-amber-700",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {v.state}
                  </span>
                </div>

                {v.submitted ? (
                  <div className="p-3 rounded-lg bg-[#f8f5fc] text-sm text-gray-700">
                    ✓ 제출된 증거: <span className="font-medium">{v.submitted}</span>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor={`file-${i}`}
                      className="block border-2 border-dashed border-gray-200 hover:border-[#6B4C9A] rounded-lg p-6 text-center text-gray-500 cursor-pointer transition"
                    >
                      <div className="text-3xl mb-2">📎</div>
                      증거 파일을 업로드하거나 URL을 입력해주세요
                      <div className="text-xs text-gray-400 mt-1">
                        이미지, PDF, 링크 등
                      </div>
                    </label>
                    <input id={`file-${i}`} type="file" className="hidden" />
                    <div className="flex gap-2 mt-3">
                      <button className="px-4 py-2 rounded-lg text-white font-semibold bg-gradient-to-tr from-[#6B4C9A] to-[#8B5FBF] hover:shadow-md">
                        증거 제출하기
                      </button>
                      <button className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                        나중에 하기
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))} */}
      </section>

      {/* 섹션: 내 정보 */}
      <section id="myinfo" className="bg-white rounded-2xl shadow-sm p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">⚙️ 내 정보</h2>
        <div className="text-gray-500">{">"}</div>
      </section>

      <section className="mb-6 pt-6 border-t border-gray-100 text-center">
          <button className="px-4 py-2 rounded-lg border border-rose-200 bg-rose-50 text-rose-700 font-semibold hover:bg-rose-100">
            회원 탈퇴
          </button>
          <p className="text-xs text-gray-500 mt-2">
            회원 탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.
          </p>
      </section>
    </div>
  );
}
