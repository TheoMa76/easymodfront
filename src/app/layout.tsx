import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/molecules/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CookieBanner from "@/components/atoms/CookieBanner/CookieBanner";
import Footer from "@/components/atoms/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EasyModCraft",
  description: "Un site français pour apprendre à faire des mods sur Minecraft facilement pour tous les niveaux.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`bg-default-minecraft w-screen h-screen bg-repeat ${inter.className}`}>
        <ToastContainer />
        <Navbar />
        <div className="bg-blur-dark fixed top-0 left-0 w-full h-full object-cover z-negative;"></div>
        <div className="h-fit flex flex-col relative">
          
        </div>
        {children}
        <CookieBanner />
        <Footer />
      </body>
    </html>
  );
}
