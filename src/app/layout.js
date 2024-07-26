import { Header } from "./components/layout/Header.js";
import { SubHeader } from "./components/layout/Subheader.js";
import "./styles/globals.css";
import { roboto } from "./styles/fonts.js";
import Head from "next/head.js";

export const metadata = {
  title: "Esto Es challenge",
  description: "Challenge de Frontend para Esto Es",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <body className={`${roboto.className} antialiased`}>
        <Header />
        <SubHeader />
        {children}
      </body>
    </html>
  );
}
