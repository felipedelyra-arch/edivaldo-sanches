import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { content } from "@/content/content";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400", display: "swap" });

const base = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(base),
  title: content.meta.title,
  description: content.meta.description,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    title: content.meta.title,
    description: content.meta.description,
    siteName: content.brand.name,
  },
  twitter: { card: "summary_large_image", title: content.meta.title, description: content.meta.description },
};

export const viewport: Viewport = { themeColor: "#0f0f0d", colorScheme: "dark" };

// Runs before paint: flags the first visit of the session so the intro shows without a flash.
const introFlag = `try{if(!sessionStorage.getItem("es-intro"))document.documentElement.setAttribute("data-intro","")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${serif.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: introFlag }} />
      </head>
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
