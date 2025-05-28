import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

import { WagmiProvider } from 'wagmi'
import { mainnet, arbitrum } from 'wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

// 1. 取得你自己的 projectId。請至 https://cloud.walletconnect.com 申請
//    **注意**: 為了能順利執行，請務必替換成你自己的 Project ID。
const projectId = 'f0b70b73eecbb75655a87cecbcf45f96' // 這是公開的範例 ID，建議換成自己的

// 2. 建立 Wagmi 設定
const metadata = {
  name: 'Copy Frenzy Onboarding',
  description: 'Connect your wallet to get started',
  url: 'https://webtest-0529.vercel.app', // 部署後請換成你的 Vercel 網址
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata
})

// 3. 建立並初始化 Web3Modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  themeMode: 'light'
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)