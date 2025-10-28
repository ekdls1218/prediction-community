"use client";

import { setPrediction } from "@/redux/predictionSlice";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface PostWriteModalProps {
  onClose: () => void;
}
interface PostForm {
  selectedCategory: number;
  title: string;
  deadline: string;
}

export default function PostWriteModal({ onClose }: PostWriteModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.category.categories
  );
  const yesterday = new Date(
    Date.now() - new Date().getTimezoneOffset() * 60000
  )
    .toISOString()
    .split("T")[0];
  const [postForm, setPostForm] = useState<PostForm>({
    selectedCategory: categories[0].id,
    title: "",
    deadline: "",
  });

  const changeForm = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostForm({ ...postForm, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(postForm);
    await axios
      .post("http://localhost:8000/predictions", postForm, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`,
        },
      })
      .then((res) => {
        // console.log(res);
        axios.get("http://localhost:8000/predictions").then((res2) => {
          dispatch(setPrediction(res2.data));
        });
        onClose();
      });
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4 text-gray-900">예측 작성하기</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              카테고리
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    setPostForm({ ...postForm, selectedCategory: cat.id })
                  }
                  className={`px-3 py-1.5 rounded-full border text-sm transition ${
                    postForm.selectedCategory === cat.id
                      ? "bg-primary-color text-white border-primary-color"
                      : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              제목
            </label>
            <textarea
              placeholder="예측 제목을 입력하세요"
              name="title"
              onChange={changeForm}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-color"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              마감일
            </label>
            <input
              type="date"
              name="deadline"
              min={yesterday}
              onChange={changeForm}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-color"
              required
            />
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary-color text-white font-semibold hover:bg-opacity-90 transition"
            >
              작성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
