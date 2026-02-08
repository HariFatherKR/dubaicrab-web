import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dubai Crab - 한국 사무직을 위한 로컬 AI 비서",
  description: "데이터가 외부로 나가지 않는 100% 로컬 AI. HWP 지원, 이메일 작성, 엑셀 분석까지. ChatGPT 못 쓰는 직장인을 위한 최고의 AI 비서.",
  keywords: ["AI", "로컬AI", "ChatGPT", "HWP", "한글", "이메일", "엑셀", "사무직", "직장인", "Dubai Crab"],
  authors: [{ name: "Snovium" }],
  creator: "Snovium",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://dubaicrab.ai",
    siteName: "Dubai Crab",
    title: "Dubai Crab - 한국 사무직을 위한 로컬 AI 비서",
    description: "데이터가 외부로 나가지 않는 100% 로컬 AI. HWP 지원, 이메일 작성, 엑셀 분석까지.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dubai Crab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dubai Crab - 한국 사무직을 위한 로컬 AI 비서",
    description: "데이터가 외부로 나가지 않는 100% 로컬 AI",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
