import Header from "@/components/Header";
import localFont from "next/font/local";
import "./globals.css";
import Providers from "./providers";
import InitDataLoader from "./InitDataLoader";

const pyeongChangPeace = localFont({
  src: [
    {
      path: "../../public/fonts/PyeongChangPeace-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/PyeongChangPeace-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pyeongchang",
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categoryRes, predictionsRes, rankUserRes, rankPostRes] =
    await Promise.all([
      fetch("http://127.0.0.1:8000/category", { cache: "no-store" }),
      fetch("http://127.0.0.1:8000/predictions", { cache: "no-store" }),
      fetch("http://127.0.0.1:8000/rank/user", { cache: "no-store" }),
      fetch("http://127.0.0.1:8000/rank/post", { cache: "no-store" }),
    ]);
  const categories = await categoryRes.json();
  const predictions = await predictionsRes.json();
  const rankUsers = await rankUserRes.json();
  const rankPosts = await rankPostRes.json();

  return (
    <html lang="ko" className={pyeongChangPeace.variable}>
      <body>
        <Providers
          initialCategories={categories}
          initialPredictions={predictions}
          initialRankUsers={rankUsers}
          initialRankPosts={rankPosts}
        >
          <InitDataLoader />
          <header className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
            <Header />
          </header>
          <main className="h-[calc(100vh-80px)] overflow-hidden">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
