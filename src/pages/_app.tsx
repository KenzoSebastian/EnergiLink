import { ConvexClientProvider } from "@/ConvexClientProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ConvexClientProvider>
        <Component {...pageProps} />
        <Toaster richColors  position="top-center" />
      </ConvexClientProvider>
    </SessionProvider>
  );
}
