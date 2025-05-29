export default function NaviSideBar() {
    return(
        <div className="md:sticky md:top-8 bg-white rounded-2xl shadow-sm p-4 h-max">
          <div className="text-center pb-6 mb-6 border-b border-gray-100">
            <div className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold bg-primary-color">
              N
            </div>
            <div className="text-lg font-semibold text-gray-800">닉네임</div>
          </div>

          <ul className="space-y-2 text-[15px]">
            <li className="px-4 py-3 rounded-lg bg-[#f8f5fc] text-[#6B4C9A] font-semibold">
              📊 적중률 통계
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700">
              📝 내 예측 목록
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700">
              ✓ 결과 인증
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700">
              ⚙️ 내 정보
            </li>
            <li className="px-4 py-3 rounded-lg hover:bg-gray-50 cursor-pointer text-gray-700">
              🚪 로그아웃
            </li>
          </ul>
        </div>
    );
}