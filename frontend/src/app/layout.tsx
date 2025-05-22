import Header from "@/components/Header"
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
      <body className="bg-secondary-color">
        <header className="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
          <Header />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}