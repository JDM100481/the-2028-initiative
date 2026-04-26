import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The 2028 Initiative",
  description: "OFW circles sharing thoughts and turning them into signals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-950">
        {children}
      </body>
    </html>
  );
}
