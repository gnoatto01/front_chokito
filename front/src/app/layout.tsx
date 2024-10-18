import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Head from "next/head"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SuporteBIT",
  description: "Sistema de gestão de suporte, da NaturalBIT",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <Head>
        <meta charSet="UTF-8" />

      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
