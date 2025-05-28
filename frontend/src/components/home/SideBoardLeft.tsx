"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
}

export default function SideBoardLeft() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("전체");

  useEffect(() => {
    const getCategories = async () => {
      await axios
        .get<Category[]>("http://localhost:8000/category")
        .then((res) => {
          //   console.log(res.data);
          const sorted = res.data.sort((a, b) => a.id - b.id);
          setCategories(sorted);
        });
    };
    getCategories();
  }, []);
  return (
    <div className="w-1/5 h-full bg-white border-2 border-gray-200 rounded-xl p-4">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 pl-1 mb-2">
          카테고리
        </h3>
        {categories.map((cate) => {
          return (
            <div
              key={cate.id}
              className="border-2 border-gray-100 shadow-sm rounded-md px-2 py-1 bg-white mb-2 hover:border-primary-color transition-colors"
            >
              {cate.name}
            </div>
          );
        })}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800 pl-1 mb-2">
          내 통계
        </h3>
        <div className="border-2 border-gray-100 text-center shadow-sm rounded-md px-2 py-2 bg-white mb-2">
          <span className="text-primary-color text-xl font-bold mb-2">79%</span>
          <span className="block text-xs text-gray">전체 적중률</span>
        </div>
        <div className="border-2 border-gray-100 text-center shadow-sm rounded-md px-2 py-2 bg-white mb-2">
          <span className="text-primary-color text-xl font-bold mb-2">5</span>
          <span className="block text-xs text-gray">참여 예측 수</span>
        </div>
      </div>
    </div>
  );
}
