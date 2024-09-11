import { FirebaseDataProvider } from "@/context/firebaseDataContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (

<FirebaseDataProvider>
    <Component {...pageProps} />
</FirebaseDataProvider>
);
}
