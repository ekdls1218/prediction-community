import Post from "./Post";
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
  const posts = useSelector((stste: RootState) => stste.prediction.post)
  const seletedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  const filteredPosts = seletedCategory
    ? posts.filter((p) => p.category === seletedCategory)
    : posts;

  return (
    <div>
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post}/>
      ))}
    </div>
  );
}
