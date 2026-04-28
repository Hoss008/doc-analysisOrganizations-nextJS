import type { Metadata } from "next";
import {Inter} from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import "./globals.css";

  const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuAI - Document Analysis with powerful AI",
  description: "DocuAI is an AI-powered document analysis tool that helps you extract insights, summarize content, and understand sentiment from your documents. With advanced features like keyword extraction and Q&A generation, DocuAI makes it easy to analyze and manage your documents efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={inter.className}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
