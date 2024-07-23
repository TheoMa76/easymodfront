import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/molecules/Navbar";

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
    <html lang="en">
      <body className={`bg-default-minecraft ${inter.className}`}>
        {/* Ajoutez un div pour l'image d'arrière-plan */}
        <div className="bg-blur-dark fixed top-0 left-0 w-full h-full object-cover z-negative;"></div>
        <div className="h-fit flex flex-col relative">
          <Navbar />
        </div>
        {children}
      </body>
    </html>
  );
}
