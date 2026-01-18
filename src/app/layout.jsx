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
    // 1. Add data-theme here
    <html lang="en" data-theme="tech-gear"> 
     <body className="...">
        <CartProvider>
          <Navbar />
          {children}
          <CartSidebar /> 
        </CartProvider>
      </body>
    </html>
  );
}