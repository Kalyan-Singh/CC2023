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
import { ApolloProvider } from "@apollo/client";
import { apolloClient, subgraphClient } from "@/apollo";
import { AuthContextProvider } from "@/context/auth";
import { createReactClient, LivepeerConfig, studioProvider } from '@livepeer/react';

// const cclient = urqlcreateClient({
//   url: "https://api.cyberconnect.dev/testnet/playground",
//   fetchOptions: () => {
//     const api=process.env.NEXT_PUBLIC_api;
//     const token= localStorage.getItem('jwt');
//     return {
//       headers: {
//         'X-API-KEY': `${api}`,
//         'authorization':  token ? token : "" },
//     };
//   },
// });

// const graphClient = urqlcreateClient({
//   url: "https://api.thegraph.com/subgraphs/name/kalyan-singh/connectedtournaments",
// });

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

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: '4dc128fe-0676-4a28-ba28-65a2c9a420d4' }),
});

export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  });
  return (
    <ApolloProvider client={apolloClient}>
        <ChakraProvider theme={theme}>
          {ready ? (
            <WagmiConfig client={wagmiClient}>
              <RainbowKitProvider coolMode chains={chains} theme={darkTheme()}>
                <AuthContextProvider>
                  <LivepeerConfig client={livepeerClient}>
                    <Navbar />
                    <Component {...pageProps} />
                  </LivepeerConfig>
                </AuthContextProvider>
              </RainbowKitProvider>
            </WagmiConfig>
          ) : null}
        </ChakraProvider>
    </ApolloProvider>
  );
}
