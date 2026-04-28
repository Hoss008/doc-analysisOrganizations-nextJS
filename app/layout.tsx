import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";
import "./globals.css";
import { syncUserToDatabase } from "@/lib/sync-user";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuAI - Document Analysis with powerful AI",
  description:
    "DocuAI is an AI-powered document analysis tool that helps you extract insights, summarize content, and understand sentiment from your documents. With advanced features like keyword extraction and Q&A generation, DocuAI makes it easy to analyze and manage your documents efficiently.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncUserToDatabase();
  return (
    <ClerkProvider>
      <html lang="en" className={inter.className}>
        <body className="min-h-screen flex flex-col">
          {/* {header} */}
          <Header />
          {/* {main} */}
          <main className="flex-1">{children}</main>
          {/* {footer} */}
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
