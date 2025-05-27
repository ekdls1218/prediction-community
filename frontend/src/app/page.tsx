import MainBoard from "@/components/home/mainBoard";
import SideBoardLeft from "@/components/home/SideBoardLeft";
import SideBoardRight from "@/components/home/SideBoardRight";

export default function HomePage() {
  return (
    <div>
      <SideBoardLeft />
      <MainBoard />
      <SideBoardRight />
    </div>
  );
}