import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/roboto";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { extendTheme } from "@chakra-ui/react";
import { createClient } from "urql";

const cclient = createClient({
  url: "",
  fetchOptions: () => {
    const api=process.env.NEXT_PUBLIC_api;
    const token= localStorage.getItem('jwt');
    return {
      headers: {
        'X-API-KEY': `${api}`,
        'authorization':  token ? token : "" },
    };
  },
});

const graphClient = createClient({
  url: "",
});

const theme = extendTheme({
  fonts: {
    heading: `'Roboto', sans-serif`,
    body: `'Roboto', sans-serif`,
  },
});

const { chains, provider } = configureChains(
  [bscTestnet],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: process.env.NEXT_PUBLIC_rpc,
      }),
    }),
  ]
);
const { connectors } = getDefaultWallets({
  appName: "ConnectedTournaments",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  });
  return (
    <ChakraProvider theme={theme}>
      {ready ? (
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
            <Navbar />
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      ) : null}
    </ChakraProvider>
  );
}
