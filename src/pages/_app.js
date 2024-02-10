import { ChakraProvider } from "@chakra-ui/react";
import { ClerkProvider } from "@clerk/nextjs";
import { RecoilRoot } from "recoil";
import './index.css'

export default function App({ Component, pageProps }) {
  return ( 
    <ChakraProvider>
      <ClerkProvider {...pageProps}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </ClerkProvider>
    </ChakraProvider>
  )
}
