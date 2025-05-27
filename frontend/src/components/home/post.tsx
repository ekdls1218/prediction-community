export default function Post() {
    return (
        <div className="border-2 border-gray-100 shadow-sm rounded-xl p-5 bg-white max-w-lg mx-auto">
            <div className="flex justify-between items-center mb-3">
                <div className="max-w-full border border-blue-100 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold">
                카테고리
                </div>
                <div className="text-gray-400 text-sm">마감일 D-?</div>
            </div>

            <div className="mb-3">
                <div className="text-lg font-bold text-gray-900 truncate">예측 제목</div>
            </div>

            <div className="text-sm text-gray-400 mb-4">💬 댓글 개수</div>

            <div className="flex justify-between gap-3">
                <button className="flex-1 border-2 border-green-200 bg-green-50 text-green-700 font-bold py-3 rounded-lg hover:bg-green-100 transition-colors">
                    <span className="mr-2">👍</span> 맞을 것 같아!
                </button>

                <button className="flex-1 border-2 border-red-200 bg-red-50 text-red-600 font-bold py-3 rounded-lg hover:bg-red-100 transition-colors">
                    <span className="mr-2">👎</span> 틀릴 듯
                </button>
            </div>
        </div>

        
    );
}