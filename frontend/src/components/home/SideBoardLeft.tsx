"use client";

import { setCategory } from "@/redux/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function SideBoardLeft() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.category
  );

  return (
    <div className="w-1/5 h-full bg-white border-2 border-gray-200 rounded-xl p-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 pl-1 mb-2">
          카테고리
        </h3>
        {categories.map((cate) => {
          return (
            <button
              key={cate.id}
              onClick={() =>
                selectedCategory === cate.id
                  ? dispatch(setCategory(null))
                  : dispatch(setCategory(cate.id))
              }
              className={`border-2 shadow-sm rounded-md w-full px-2 py-1 mb-2 hover:border-primary-color transition-colors ${
                selectedCategory === cate.id
                  ? "bg-primary-color text-white border-primary-color"
                  : "bg-white text-gray-800 border-gray-100"
              } `}
            >
              {cate.name}
            </button>
          );
        })}
      </div>
      {user.isLogin && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 pl-1 mb-2">
            내 통계
          </h3>
          <div className="border-2 border-gray-100 text-center shadow-sm rounded-md px-2 py-2 bg-white mb-2">
            <span className="text-primary-color text-xl font-bold mb-2">
              79%
            </span>
            <span className="block text-xs text-gray">전체 적중률</span>
          </div>
          <div className="border-2 border-gray-100 text-center shadow-sm rounded-md px-2 py-2 bg-white mb-2">
            <span className="text-primary-color text-xl font-bold mb-2">5</span>
            <span className="block text-xs text-gray">참여 예측 수</span>
          </div>
        </div>
      )}
    </div>
  );
}
