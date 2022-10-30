import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { Mainnet, DAppProvider, Config, Goerli } from "@usedapp/core"
import { BrowserRouter } from "react-router-dom"

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
  },
})
const config: Config = {
  readOnlyChainId: Mainnet.chainId,
  readOnlyUrls: {
    [Mainnet.chainId]:
      "https://mainnet.infura.io/v3/379d2d85420a445cb0f197f6c7b01977",
    [Goerli.chainId]:
      "https://goerli.infura.io/v3/379d2d85420a445cb0f197f6c7b01977",
  },
  notifications: {
    expirationPeriod: 10000,
    checkInterval: 1000,
  },
}

ReactDOM.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <App isServerInfo />
        </BrowserRouter>
      </ChakraProvider>
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById("root")
)

reportWebVitals()
