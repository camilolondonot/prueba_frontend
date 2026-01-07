import type { Metadata } from "next";
import { Montserrat, Figtree } from "next/font/google";
import { DottedBackground } from "./components/ui";
import AppLayout from "./components/layout/AppLayout";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IA Agent Generator",
  description: "Generador de agentes de IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="dark">
      <body
        className={`${montserrat.variable} ${figtree.variable} antialiased`}
      >
        <DottedBackground>
          <AppLayout>
            {children}
          </AppLayout>
        </DottedBackground>
      </body>
    </html>
  );
}
