import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TechGear Shop",
  description: "Next.js 16 + MongoDB App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="tech-gear" suppressHydrationWarning={true}> 
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true} // And here
      >
        <CartProvider>
          <Navbar />
          {children}
          <CartSidebar /> 
        </CartProvider>
      </body>
    </html>
  );
}