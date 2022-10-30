import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  VStack,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Contract } from "@ethersproject/contracts"
// import m1 from "../images/m1.png"
import bg from "../images/nklogo.png"
import { useContractFunction, useNotifications } from "@usedapp/core"
import { utils } from "ethers"

const Hero = ({ account }) => {
  const { notifications } = useNotifications()
  const [connectWallet, setConnectWallet] = useState(false)
  const [transactionSuccess, settransactionSuccess] = useState(false)
  const nftAddress = "0xa808c739Bb1e649A8B3D8E348647bC6dBE69536F"
  useEffect(() => {
    if (account) {
      setConnectWallet(false)
    }
  }, [account, connectWallet])
  useEffect(() => {
    if (
      notifications.filter(
        (notification) =>
          notification.type === "transactionSucceed" &&
          notification.transactionName === "mintnfttransaction"
      ).length > 0
    ) {
      settransactionSuccess(true)
    } else {
      settransactionSuccess(false)
    }
  }, [notifications, transactionSuccess])
  const abi = [
    {
      inputs: [],
      name: "Mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ]
  const nftInterface = new utils.Interface(abi)
  const contract = new Contract(nftAddress, nftInterface)
  const { state, send } = useContractFunction(contract, "Mint", {
    transactionName: "mintnfttransaction",
  })
  const mintNft = () => {
    send({
      value: utils.parseEther('0.01'),
    })
  }
  const handleMint = () => {
    if (!account) {
      setConnectWallet(true)
    } else {
      mintNft()
    }
  }
  return (
    <VStack minheight='85vh'>
      {connectWallet && (
        <Alert
          status='warning'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
        >
          <AlertIcon />
          Connect Wallet to Mint NFTS
        </Alert>
      )}
      {transactionSuccess && (
        <Alert
          status='success'
          variant='left-accent'
          alignItems='center'
          justifyContent='center'
          textAlign='center'
          autoHideDuration={5000}
        >
          <AlertIcon mr={3} />
          You have successfully Minted Your Nft
        </Alert>
      )}
      <Container maxW='100%' centerContent>
      <Box border='none' centerContent>
        <Image
          src={bg}
          alt='logo'
          objectFit='cover'
          borderRadius='2%'
          maxheight='700px'
        />
      </Box>
      </Container>
      <Container maxW='75%' color='white' centerContent pt='0.3%'>
        <Text
          // bgGradient='linear(to-l, #7928CA, #FF0080)'
          // bgClip='text'
          color='yellow'
          fontSize='3xl'
          fontWeight='extrabold'
        >
          IPFS and Filecoin
        </Text>
      </Container>
      <Container centerContent pt='1%'>
        <Flex>
          <Button
            size='lg'
         color='yellow'
            onClick={() => handleMint()}
            isLoading={state.status === "Mining"}
          >
            Mint NOW
          </Button>
        </Flex>
      </Container>
     
    </VStack>
  )
}
export default Hero
