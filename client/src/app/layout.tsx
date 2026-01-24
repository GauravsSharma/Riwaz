import "./globals.css";
import type { Metadata } from "next";
import { Figtree,Fraunces } from "next/font/google";
import { ToastContainer } from "react-toastify";
import QueryProvider from "./QueryProvider";
import NextTopLoader from "nextjs-toploader";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riwaz - Elegant Sarees for Every Occasion",
  description: "Discover our exquisite collection of sarees, blending traditional craftsmanship with contemporary designs. Perfect for weddings, festivals, and special events.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${fraunces.variable} ${figtree.className}  antialiased`}>
        <QueryProvider>
        <NextTopLoader color="black"/>
          {children}
          <ToastContainer />
        </QueryProvider>

      </body>
    </html>
  );
}