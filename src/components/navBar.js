import {
  Button,
  Container,
  Flex,
  Box,
  Text,
  Modal,
  ModalOverlay,
  Divider,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
} from "@chakra-ui/react"
import WalletConnectIcon from "../images/walletconnectlogo.png"
import metamask from "../images/metamaskWallet.png"
import coinbase from "../images/coinbase.png"
import React, { useEffect } from "react"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { WalletLinkConnector } from "@web3-react/walletlink-connector"
const NavBar = ({ activateBrowserWallet, account, activate, deactivate }) => {
  const isConnected = account !== undefined
  const { isOpen, onOpen, onClose } = useDisclosure()

  async function onConnect() {
    try {
      const provider = new WalletConnectProvider({
        infuraId: "379d2d85420a445cb0f197f6c7b01977",
      })
      await provider.enable()
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }
  async function onCoinbaseConnect() {
    try {
      const provider = new WalletLinkConnector({
        url: `https://mainnet.infura.io/v3/379d2d85420a445cb0f197f6c7b01977`,
        appName: "nft Mania Demo",

        supportedChainIds: [1, 3, 4, 5, 42],
      })
      await activate(provider)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (account) {
      onClose()
    }
  }, [account, onClose])
  return (
    <>
      <Container maxW='100%' p='2% 10%' align='center' minh='15vh'>
        <Flex align='center' justify='space-between'>
          <Text
          color='yellow'
            fontSize='5xl'
            fontWeight='extrabold'
          >
            NFT MANIA
          </Text>
          {!isConnected ? (
            <Button
              colorScheme='yellow'
              size='lg'
              onClick={isConnected ? deactivate : onOpen}
            >
              Connect Wallet
            </Button>
          ) : (
            <Box>
              <Flex>
                <Text
                  color='whiteAlpha.700'
                  align='center'
                  mr='5'
                  fontSize='2em'
                >
                  {getEllipsisTxt(account, 5)}
                </Text>
                <Button colorScheme='yellow' size='lg' onClick={deactivate}>
                  Disconnect
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
      </Container>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Connect Your Wallet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Divider orientation='horizontal' />
            <Box
              maxW='sm'
              p='2'
              onClick={activateBrowserWallet}
              _hover={{
                cursor: "pointer",
              }}
            >
              <Flex align='center' justify='center'>
                <Image src={metamask} alt='metamask' boxSize='50px' mr='5' />
                <Text>MetaMask</Text>
              </Flex>
            </Box>
            <Divider orientation='horizontal' />
            <Box
              maxW='sm'
              p='2'
              onClick={onConnect}
              _hover={{
                cursor: "pointer",
              }}
            >
              <Flex align='center' justify='center'>
                <Image
                  src={WalletConnectIcon}
                  alt='metamask'
                  boxSize='50px'
                  mr='5'
                />
                <Text>Wallet Connect</Text>
              </Flex>
            </Box>
            <Divider orientation='horizontal' />
            <Box
              maxW='sm'
              p='2'
              onClick={onCoinbaseConnect}
              _hover={{
                cursor: "pointer",
              }}
            >
              <Flex align='center' justify='center'>
                <Image src={coinbase} alt='metamask' boxSize='50px' mr='5' />
                <Text>coinbase</Text>
              </Flex>
            </Box>
            <Divider orientation='horizontal' />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str, n = 6) => {
  if (str) {
    return `${str.slice(0, n)}...${str.slice(str.length - n)}`
  }
  return ""
}
export default NavBar
