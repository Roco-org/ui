import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const Dm_Sans = DM_Sans({ subsets: ["latin"], weight: "400" });

export const metadata: Metadata = {
  title: "Personal Banking Dashboard",
  description: "Monitor your financial transactions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Dm_Sans.className}>
        <header className="border-b border-border-gray py-4 bg-black">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold text-white pl-5">
              Personal Banking
            </h1>
            <ul className="flex space-x-4 pr-5">
              <li>
                <a href="/" className="text-white hover:text-gray-600">
                  Home
                </a>
              </li>
              <li>
                <a href="/summary" className="text-white hover:text-gray-600">
                  Summary
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-border-gray py-4 text-center">
          <p className="text-sm">
            &copy; 2024 Personal Banking App. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
