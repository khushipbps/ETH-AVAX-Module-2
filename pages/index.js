import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const [inputA, setInputA] = useState(2);
  const [inputB, setInputB] = useState(2);

  
  const contractAddress = "0x68B1D87F95878fE05B998F19b66F4baba5De1aed";

  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
      window.ethereum.on("accountsChanged", (accounts) => {
        handleAccount(accounts);
      });
    }

    if (ethWallet) {
      const accounts = await ethWallet.request({method: "eth_accounts"});
      handleAccount(accounts);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAccount(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  }

  const getBalance = async() => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  }

  const deposit = async() => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait()
      getBalance();
    }
  }

  const multiplyBalance = async() => {
    if (atm) {
      const multiple = parseInt(inputA);
      if (multiple < 2) {
        alert("Multiply by atleast 2");
        return;
      }
      let tx = await atm.multiplyBalance(multiple);
      await tx.wait()
      getBalance();
    }
  }

  const divideBalance = async() => {
    if (atm) {
      const divider = parseInt(inputB);
      if (divider < 2 || balance % divider != 0){
        alert("Divide by atleast 2 or can not divide it");
        return;
      } 
      let tx = await atm.divideBalance(divider);
      await tx.wait()
      getBalance();
    }
  }

  const withdraw = async() => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait()
      getBalance();
    }
  }
  const handleInputAChange = (event) => {
    setInputA(event.target.value);
  };

  const handleInputBChange = (event) => {
    setInputB(event.target.value);
  };

  
  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <>
        <div>
          <p style={{ fontFamily: "Sans-serif" }}>Your Account: {account}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Your Balance: {balance}</p>
          <p style={{ fontFamily: "Sans-serif" }}>Built by : <b>Khushi Kumari</b></p>
  
          <button
            style={{ backgroundColor: "green", color: 'white', padding: '5px', border: '1px solid black' }}
          onClick={deposit}>
            Deposit 1 ETH
          </button>
          <button style={{ backgroundColor: "red", color: 'white', padding: '5px', border: '1px solid black' }} onClick={withdraw}>
            Withdraw 1 ETH
          </button>
        </div>
  
        <div>
          <h2>Balance Multiplier and Divider</h2>
          <div>
            <input
              type="number"
              placeholder="Enter value to multiply"
              value={inputA}
              style={{ backgroundColor: "yellow", color: 'black', padding: '5px', border: '1px solid black' }}
              onChange={handleInputAChange}
            />
    
            <button style={{ backgroundColor: "green", color: 'white', padding: '5px', border: 'None' }} onClick={multiplyBalance}>
              Multiply Balance
          </button>
          </div>
          <br></br>
          <div>
            <input
              type="number"
              placeholder="Enter value to divide"
              value={inputB}
              style={{ backgroundColor: "yellow", color: 'black', padding: '5px', border: '1px solid black' }}
              onChange={handleInputBChange}
            />
    
            <button style={{ backgroundColor: "red", color: 'white', padding: '5px', border: 'None'  }} onClick={divideBalance}>
              Divide Balance
          </button>
          </div>
        </div>
      </>
    );
    
  }

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Crypto ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
        
      `}
      </style>
    </main>
  )
}