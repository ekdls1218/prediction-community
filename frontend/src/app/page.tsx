import MainBoard from "@/components/home/MainBoard";
import SideBoardLeft from "@/components/home/SideBoardLeft";
import SideBoardRight from "@/components/home/SideBoardRight";

export default function HomePage() {
  return (
    <div className="flex gap-6 w-full h-screen mt-4 px-6 py-4">
      <SideBoardLeft />
      <MainBoard />
      <SideBoardRight />
    </div>
  );
}