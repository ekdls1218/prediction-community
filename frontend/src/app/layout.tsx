import Header from "@/components/header"
import localFont from "next/font/local"
import "./globals.css"

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={pyeongChangPeace.variable}>
      <body>
        <header className="font-pyeongchang">
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}