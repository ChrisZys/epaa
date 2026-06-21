import { Geist, Geist_Mono } from "next/font/google";
import { AppHeader } from "@/layouts/AppHeader";
import { NavigationDock } from "@/layouts/NavigationDock";
import { Search, Clipboard, Layers, CheckShield } from "@boxicons/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "EPAA",
  description: "Entorno para el Aprendizaje de Algoritmos",
};

const navItems = [
  { title: "Análisis", href: "/analisis", icon: <Search className="w-full h-full" />, color: "analysis" },
  { title: "Planeación", href: "/planeacion", icon: <Clipboard className="w-full h-full" />, color: "plan" },
  { title: "Diseño", href: "/diseno", icon: <Layers className="w-full h-full" />, color: "design" },
  { title: "Verificación", href: "/verificacion", icon: <CheckShield className="w-full h-full" />, color: "verify" },
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AppHeader />
        <main className="flex flex-1 flex-col pb-24">{children}</main>
        <NavigationDock
          items={navItems}
          desktopClassName="fixed bottom-4 left-1/2 -translate-x-1/2"
          mobileClassName="fixed bottom-4 right-4"
        />
      </body>
    </html>
  );
}
