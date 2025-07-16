import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Everyone Votes - Online Voting System",
  description: "Secure online voting platform for Indian elections with OTP verification and Aadhar authentication",
  keywords: "voting, elections, India, online voting, secure voting, democracy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gray-50 min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer">
                    🗳️ Everyone Votes
                  </Link>
                </div>
                <div className="text-sm text-gray-600">
                  Secure • Transparent • Democratic
                </div>
              </div>
            </div>
          </header>
          <main className="flex-1">
            {children}
          </main>
          <footer className="bg-gray-800 text-white py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p>&copy; 2025 Everyone Votes - Election Commission of India</p>
              <p className="text-sm text-gray-400 mt-2">
                Built for CareEco Technologies Assignment
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
