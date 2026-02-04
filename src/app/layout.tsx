import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "County Sligo Bahá’ís",
  description: "Official website of the Bahá’í Community of County Sligo, Ireland.",
};



import { VisualEditing } from "next-sanity/visual-editing";
import { draftMode } from "next/headers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <html lang="en">
      <body className={outfit.variable}>
        <Header />
        {children}
        {isDraftMode && <VisualEditing />}
      </body>

    </html>
  );
}
