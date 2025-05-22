export default function SignUpForm() {

  return (
    <div className="my-10 text-gray-700">
      <h2 className="text-3xl font-bold text-center mb-8">회원가입</h2>
      <div className="space-y-5">
        {/* 닉네임 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            닉네임
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="닉네임을 입력하세요"
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
          <label className="block text-sm font-medium mb-1">
            아이디
          </label>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="아이디를 입력하세요"
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
          <label className="block text-sm font-medium mb-1">
            비밀번호
          </label>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요"
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
            placeholder="비밀번호를 다시 입력하세요"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* 생년월일 */}
        <div>
          <label className="block text-sm font-medium mb-1">
            생년월일
          </label>
          <input
            type="date"
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />
        </div>

        {/* 성별 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            성별
          </label>
          <div className="flex space-x-3">
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 data-[selected=true]:bg-primary-color data-[selected=true]:text-white"
              data-selected="false"
            >
              남성
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100 data-[selected=true]:bg-primary-color data-[selected=true]:text-white"
              data-selected="false"
            >
              여성
            </button>
          </div>
        </div>  

        {/* 주소 */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">주소</label>

          {/* 우편번호 + 검색 버튼 */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="우편번호"
              name="addr1"
              readOnly
              className="flex-1 border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
            />
            <button
              type="button"
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
            className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-primary-color"
          />

          {/* 상세 주소 */}
          <input
            type="text"
            placeholder="상세주소"
            name="addr3"
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
