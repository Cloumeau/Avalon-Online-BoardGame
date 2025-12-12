import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avalon - The Resistance",
  description: "Play the classic social deduction game Avalon online",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="min-h-screen bg-midnight-900">
          <div className="fixed inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-royal/10 rounded-full blur-[100px]" />
          </div>
          <main className="relative z-10">{children}</main>
        </div>
      </body>
    </html>
  );
}
