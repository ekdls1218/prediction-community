"use client";

import { useState } from "react";

interface Post {
  id: number;
  title: string;
  deadline: string;
  created_at: string;
  category: number;
  userId: string;
}

type PostProps = {
  post: Post;
};

export default function Post({ post }: PostProps) {
  const [selected, setSelected] = useState(1);
  const getDday = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - today.getTime();
    const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dday > 0 ? dday : "Day";
  };
  const dday = getDday(post.deadline);
  const changeButtonColor = (color:string) => {
    if (selected === 1) {
        return `border-${color}-200 bg-${color}-50 text-${color}-700  hover:bg-${color}-100 transition-colors`
    }else if(selected === 0) {
        return "border-primary-color bg-primary-color text-white"
    }else {
        return "border-gray-500 bg-gray-500 text-gray-200"
    }
  }
  return (
    <div className="border-2 border-gray-100 shadow-sm rounded-xl p-5 bg-white max-w-lg mx-auto mb-5">
      <div className="flex justify-between items-center mb-3">
        <div className="max-w-full border border-blue-100 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold">
          {post.category}
        </div>
        <div className={`text-sm ${dday === "Day" ? "text-red-500" : "text-gray-400"}`}>D-{dday}</div>
      </div>

      <div className="mb-3">
        <div className="text-lg font-bold text-gray-900 truncate">
          {post.title}
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-4">💬 댓글 개수</div>

      <div className="flex justify-between gap-3">
        <button onClick={()=> {setSelected(0)}} className={`flex-1 border-2 font-bold py-3 rounded-lg ${changeButtonColor("green")}`}>
          <span className="mr-2">👍</span> 맞을 것 같아!
        </button>

        <button onClick={()=> {setSelected(2)}}  className={`flex-1 border-2 font-bold py-3 rounded-lg ${changeButtonColor("red")}`}>
          <span className="mr-2">👎</span> 틀릴 듯
        </button>
      </div>
    </div>
  );
}
