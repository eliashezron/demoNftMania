import "./App.css"
import Hero from "./components/hero"
import Navbar from "./components/navBar"
import { useEthers } from "@usedapp/core"

function App() {
  const { activateBrowserWallet, account, activate, deactivate } = useEthers()

  return (
    <div className='App'>
      <Navbar
        account={account}
        activate={activate}
        deactivate={deactivate}
        activateBrowserWallet={activateBrowserWallet}
      />
      <Hero account={account} />
    </div>
  )
}

export default App
