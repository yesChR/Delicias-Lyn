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
        <Link
          className="fixed bottom-5 right-5 rounded-full text-white shadow-lg hover:bg-blue-500 focus:outline-none"
          href="https://wa.me/89135112">
          <Image src="/whatsapp.png" width={60} height={60}
          />
        </Link>
      </body>
    </Html>
  );
}
