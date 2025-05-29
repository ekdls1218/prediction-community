import MyMain from "@/components/my/MyMain";
import NaviSideBar from "@/components/my/NaviSideBar";

export default function MyPage() {
  return (
    <div className="mx-auto max-w-[1200px] h-screen px-5 py-8 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6">
      <NaviSideBar />
      <MyMain />
    </div>
  );
}