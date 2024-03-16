import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Flowbite } from "flowbite-react";
import { MantineProvider } from "@mantine/core";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider>
      <Flowbite>
        <Component {...pageProps} />
      </Flowbite>
    </MantineProvider>
  )
}
