import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";
import Image from "next/image";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Puedes agregar otros elementos dentro del Head si lo necesitas */}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
