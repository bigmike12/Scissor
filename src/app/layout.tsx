import Navbar from "@/components/Navbar/Navbar";
import "./globals.css";
import { Mulish } from "next/font/google";
import Footer from "@/components/Footer/Footer";
import "react-toastify/dist/ReactToastify.css";
import Providers from "@/components/Provider/Provider";
import Toast from "@/components/Toast/Toast";
import { analytics } from "@/firebase/config/firebase";
import { logEvent } from "firebase/analytics";

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
  if (analytics !== null) {
    logEvent(analytics, "/");
  }
  return (
    <html lang="en">
      <body
        className={`bg-ScissorPrimary-100 h-screen w-screen relative min-h-screen font-[Mulish] ${mulish.className}`}
      >
        <Toast />
        <Providers>
          <Navbar />
          <div className={`px-[120px] py-6 ${mulish.className}`}>
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
