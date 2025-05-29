"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  title: string;
  deadline: string;
  created_at: string;
  category: number;
  userId: string;
}

interface Comment {
  id: number,
  content: string,
  userId: number,
  postId: number
}

interface commentChatModalProps {
  post: Post;
  onClose: () => void;
}

export default function CommentChatModal({
  post,
  onClose,
}: commentChatModalProps) {
  // console.log(post)
  const [tab, setTab] = useState<"comment" | "chat">("comment");
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputComments, setInputComments] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    // console.log(inputComments);
    e.preventDefault();
    if (!inputComments.trim()) return;

    await axios.post("http://localhost:8000/comments", {
      content: inputComments,
      userInfo: sessionStorage.getItem("loginUser"),
      postId: post.id,
    })
    setInputComments("");

    axios.get(`http://localhost:8000/comments/${post.id}`).then((res) => {
      setComments(res.data);
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:8000/comments/${post.id}`).then((res) => {
      setComments(res.data);
    });
  }, [post])

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
    >
      <div className="bg-white rounded-xl shadow-lg p-6 w-[60vw] max-h-[80vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">{post.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            ✕
          </button>
        </div>

        {/* 탭 버튼 */}
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setTab("comment")}
            className={`flex-1 py-2 rounded-lg border font-semibold text-sm transition ${
              tab === "comment"
                ? "bg-primary-color text-white border-primary-color"
                : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            댓글
          </button>
          <button
            type="button"
            onClick={() => setTab("chat")}
            className={`flex-1 py-2 rounded-lg border font-semibold text-sm transition ${
              tab === "chat"
                ? "bg-primary-color text-white border-primary-color"
                : "bg-gray-50 text-gray-600 border-gray-300 hover:bg-gray-100"
            }`}
          >
            실시간 채팅
          </button>
        </div>

        <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg p-3 mb-4">
          {tab === "comment" ? (
            comments.length > 0 ? (
              comments.map((c) => (
                <div key={c.id} className="border-b border-gray-100 pb-2 mb-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {c.userId}
                  </p>
                  <p className="text-gray-700 text-sm">{c.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm text-center mt-8">
                아직 댓글이 없습니다.
              </p>
            )
          ) : (
            <div className="text-gray-500 text-sm text-center mt-8">
              실시간 채팅
            </div>
          )}
        </div>

        {tab === "comment" ? (
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              placeholder="댓글을 입력하세요"
              value={inputComments}
              onChange={(e) => setInputComments(e.target.value)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-color text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary-color text-white font-semibold hover:bg-opacity-90 transition text-sm"
            >
              등록
            </button>
          </form>
        ) : (
          <form className="flex gap-2">
            <input
              placeholder="채팅을 입력하세요"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-color text-sm"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-primary-color text-white font-semibold hover:bg-opacity-90 transition text-sm"
            >
              등록
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
