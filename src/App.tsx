import { useWeb3Modal, useWeb3ModalState } from '@web3modal/wagmi/react'
import { useAccount, useDisconnect } from 'wagmi'
import { useEffect } from 'react';

// 根據需求文件定義的樣式
const styles = {
  container: {
    backgroundColor: '#00008b', // 藍底
    color: 'white',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  button: {
    backgroundColor: '#efc85e', // 黃色按鈕
    color: 'black',
    border: 'none',
    padding: '15px 30px',
    borderRadius: '8px',
    fontSize: '18px',
    cursor: 'pointer',
    margin: '10px',
    fontWeight: 'bold',
  },
  secureText: {
    margin: '20px 0',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  infoText: {
    marginTop: '20px',
    fontSize: '16px',
    wordBreak: 'break-all', // 確保長地址能換行
  }
};

export default function App() {
  const { open } = useWeb3Modal();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { selectedNetworkId } = useWeb3ModalState();

  // 當錢包成功連接後，此 Effect 會被觸發
  useEffect(() => {
    if (isConnected && address) {
      console.log(`錢包已連接: ${address}`);
      
      // === TODO: 串接你的 /api/bind-ref ===
      // 在此處呼叫你的 FastAPI 後端來綁定推薦碼
      const refCode = 'COPYFRENZY';
      const apiUrl = `/api/bind-ref?addr=${address}&ref=${refCode}`;
      
      console.log(`準備呼叫 API: ${apiUrl}`);
      // fetch(apiUrl)
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log('API 回應:', data);
      //     // 若首次綁定，根據需求文件進行跳轉
      //     // window.location.href = 'https://hyperliquid.xyz/?ref=COPYFRENZY';
      //   })
      //   .catch(error => console.error('API 呼叫失敗:', error));
    }
  }, [isConnected, address]);

  const handleGenerateWallet = () => {
    console.log('準備生成新錢包...');

    // === TODO: 串接你的 /api/wallet-init ===
    // 在此處實現生成新錢包的邏輯，並將結果 POST 到你的後端
    // 你可以使用 'viem' 或 'ethers.js' 來生成錢包
    // const payload = {
    //   mother_address: address,
    //   wallet_address: '0xNEW_CHILD_WALLET_ADDRESS',
    //   private_key: '0xNEW_CHILD_WALLET_PRIVATE_KEY'
    // };
    // fetch('/api/wallet-init', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(payload)
    // })...
    
    alert('錢包生成邏輯尚未實現！請在 App.jsx 中完成 TODO 部分。');
  };

  return (
    <div style={styles.container}>
      <div style={styles.secureText}>Secure Onboarding</div>
      {isConnected ? (
        <>
          <button style={styles.button} onClick={handleGenerateWallet}>
            Generate Wallet
          </button>
          <button style={styles.button} onClick={() => disconnect()}>
            Disconnect
          </button>
          <div style={styles.infoText}>
            <p>Connected: {address}</p>
            <p>Network ID: {selectedNetworkId || 'N/A'}</p>
          </div>
        </>
      ) : (
        <button style={styles.button} onClick={() => open()}>
          Connect Wallet
        </button>
      )}
    </div>
  );
}