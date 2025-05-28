"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
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

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userVotes, setUserVotes] = useState<
    { post_id: number; pick: number }[]
  >([]);
  const seletedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  useEffect(() => {
    axios.get("http://localhost:8000/predictions").then((res) => {
      setPosts(res.data);
    });

    axios
      .get("http://localhost:8000/predictions/votes", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("loginUser")}`,
        },
      })
      .then((res) => {
        setUserVotes(res.data);
      });
  }, []);

  const filteredPosts = seletedCategory
    ? posts.filter((p) => p.category === seletedCategory)
    : posts;

  return (
    <div>
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} userVotes={userVotes} />
      ))}
    </div>
  );
}
