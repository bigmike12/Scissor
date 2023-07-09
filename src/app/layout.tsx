/* eslint-disable @next/next/inline-script-id */
import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Mulish } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/components/Provider/Provider";
import Toast from "@/components/Toast/Toast";
import { analytics } from "@/firebase/config/firebase";
import { logEvent } from "firebase/analytics";
import Script from "next/script";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata = {
  title: "Scissor",
  description: "Shorten that URL with one Click.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (typeof window !== "undefined" && analytics !== null) {
    logEvent(analytics, "/");
  }

  return (
    <html lang="en">
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <body
        className={`bg-ScissorPrimary-100 h-screen w-screen relative min-h-screen font-[Mulish] ${mulish.className}`}
      >
        <Toast />
        <Providers>
          <Navbar />
          <div className={`px-8 lg:px-[120px] lg:py-6 ${mulish.className}`}>
            {children}
          </div>
          <div className="mt-32">
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
