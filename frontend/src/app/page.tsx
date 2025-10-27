import MainBoard from "@/components/home/MainBoard";
import SideBoardLeft from "@/components/home/SideBoardLeft";
import SideBoardRight from "@/components/home/SideBoardRight";

export default function HomePage() {
  return (
    <div className="flex gap-2 w-full h-full px-4 py-4">
      <SideBoardLeft />
      <MainBoard />
      <SideBoardRight />
    </div>
  );
}