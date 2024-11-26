import Layout from "@/components/Layout/Layout";
import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/context/authContext"; // Ajusta la ruta según tu estructura

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AuthProvider> {/* Proveedor de autenticación envuelve la app */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </NextUIProvider>
  );
}
