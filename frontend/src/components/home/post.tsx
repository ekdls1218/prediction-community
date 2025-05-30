"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CommentChatModal from "./CommentChatModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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
  userVotes: { post_id: number; pick: number }[];
};

interface VoteInfo {
  total_vote: number;
  true_votes: number;
  false_votes: number;
  true_rate: number;
  false_rate: number;
}

export default function Post({ post, userVotes }: PostProps) {
  // console.log(post)
  const user = useSelector((state: RootState) => state.user);
  const getDday = (deadline: string) => {
    const today = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - today.getTime();
    const dday = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return dday > 0 ? dday : "Day";
  };
  const dday = getDday(post.deadline);
  const buttons = [
    { vote: 1, label: "맞을 것 같아!", color: "green" },
    { vote: 0, label: "틀릴 듯!", color: "red" },
  ];
  const [selected, setSelected] = useState(2);
  const [voteInfo, setVoteInfo] = useState<VoteInfo>({
    total_vote: 0,
    true_votes: 0,
    false_votes: 0,
    true_rate: 0,
    false_rate: 0,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const changeButtonColor = (vote: number, color: string) => {
    if (selected === 2) {
      return color === "green"
        ? `border-green-200 bg-green-50 text-green-700  hover:bg-green-100 transition-colors`
        : `border-red-200 bg-red-50 text-red-700  hover:bg-red-100 transition-colors`;
    } else if (selected === vote) {
      return "border-primary-color bg-primary-color text-white";
    } else {
      return "border-gray-500 bg-gray-500 text-white";
    }
  };

  const castVote = (v: number) => {
    axios
      .post("http://localhost:8000/predictions/vote", {
        vote: v,
        userInfo: sessionStorage.getItem("loginUser"),
        postId: post.id,
      })
      .then((res) => {
        if (res.data.result === "성공") {
          axios
            .get(`http://localhost:8000/predictions/${post.id}/vote`)
            .then((v) => {
              setVoteInfo(v.data);
            });
        }
      });
  };

  useEffect(() => {
    if (!user.isLogin) return;

    const myVote = userVotes.find((v) => v.post_id === post.id);
    // console.log(userVotes, myVote);
    if (myVote) {
      setSelected(myVote.pick);
      axios
        .get(`http://localhost:8000/predictions/${post.id}/vote`)
        .then((v) => {
          setVoteInfo(v.data);
        });
    }
  }, [userVotes, post.id]);

  return (
    <div className="border-2 border-gray-100 shadow-sm rounded-xl p-5 bg-white max-w-lg mx-auto mb-5">
      <div className="flex justify-between items-center mb-3">
        <div className="max-w-full border border-blue-100 bg-blue-50 text-blue-600 rounded-full px-3 py-1 text-sm font-semibold">
          {post.category}
        </div>
        <div
          className={`text-sm ${
            dday === "Day" ? "text-red-500" : "text-gray-400"
          }`}
        >
          D-{dday}
        </div>
      </div>

      <div className="mb-3">
        <div className="text-lg font-bold text-gray-900 truncate">
          {post.title}
        </div>
      </div>

      <div
        onClick={() => setIsOpenModal(true)}
        className="text-sm text-gray-400 mb-4"
      >
        💬 댓글 개수
      </div>

      <div className="flex justify-between gap-3">
        {buttons.map((btn) => {
          return (
            <button
              key={btn.vote}
              disabled={selected !== 2}
              onClick={() => {
                setSelected(btn.vote);
                castVote(btn.vote);
              }}
              className={`flex-1 border-2 font-bold py-3 rounded-lg ${changeButtonColor(
                btn.vote,
                btn.color
              )}`}
            >
              <span>{btn.label}</span>
              {selected !== 2 &&
                (btn.vote === 1 ? (
                  <span className="block text-xs text-white">
                    {`${voteInfo.true_rate}% (${voteInfo.true_votes}표)`}
                  </span>
                ) : (
                  <span className="block text-xs text-white">
                    {`${voteInfo.false_rate}% (${voteInfo.false_votes}표)`}
                  </span>
                ))}
            </button>
          );
        })}
      </div>
      {isOpenModal && (
        <CommentChatModal post={post} onClose={() => setIsOpenModal(false)} />
      )}
    </div>
  );
}
