import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";

export const metadata: Metadata = {
  title: "Wheel of Fortune",
  description: "Try your luck with our Wheel of Fortune game!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col">
        <Header />
        <main className="flex-1 bg-gradient-to-b from-blue-900 to-purple-900">
          {children}
        </main>
      </body>
    </html>
  );
}
