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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const categoryRes = await fetch("http://localhost:8000/category", {
    cache: "no-store",
  });
  const predictionsRes = await fetch("http://localhost:8000/predictions", {
    cache: "no-store",
  });
  const categories = await categoryRes.json();
  const predictions = await predictionsRes.json();

  return (
    <html lang="ko" className={pyeongChangPeace.variable}>
      <body>
        <Providers initialCategories={categories} initialPredictions={predictions} >
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
