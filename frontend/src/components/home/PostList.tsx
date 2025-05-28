"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";

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
  useEffect(() => {
    axios.get("http://localhost:8000/predictions").then((res) => {
      console.log(res.data);
      setPosts(res.data)
    });
  }, []);
  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
        ))}
    </div>
  );
}
