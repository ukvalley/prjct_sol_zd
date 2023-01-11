import { Component } from "react";
import { Link } from "react-router-dom";


import { useState,useEffect } from 'react';
import { Connection, PublicKey , Transaction, sendAndConfirmTransaction} from '@solana/web3.js';


import {
  BN,
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from '../../idl.json';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Token,TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { set } from '@project-serum/anchor/dist/cjs/utils/features';
import axios from 'axios';  
require('@solana/wallet-adapter-react-ui/styles.css');


const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet()
] 



const { SystemProgram, Keypair } = web3;
/* create an account  */

const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}


const programID = new PublicKey(idl.metadata.address);







function Login() {


 


  const [walletdata, setwalletdata] = useState();

const wallet = useWallet();
const { connected,  signTransaction, sendTransaction } = useWallet()
const [walletAddr, setWalletaddr] = useState();
const [value, setvalue] = useState();
const [increment, setincrement] = useState();



  
  useEffect(() => {
      console.log(connected ? "true" : "false");

  });


  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);
    

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
  
    );
    setWalletaddr(wallet.publicKey.toBase58());
    console.log(walletAddr);

    return provider;
  }

  async function register(registration_address)
  {
    console.log("reg_address",registration_address);
    axios.get(`https://jsonholder.com/users`)  
      .then(res => {  
        const animals = res.data;  
        
        console.log('animals',animals);

    

  });
}


  async function takeandsendtoken()
  {
   
    let wallets_add_data = '';
    axios.get(`https://raisingfinanance.com/soulignite/api/activate_package/300/7CnwJ9gjr1gfsz4cVNGFepJ5C1es51fxcR4hHsmwifqj`)  
      .then(res => {  
        const wallets_data = res.data;  
        wallets_add_data = res.data;
      //  console.log('wallets',wallets_data);
        setwalletdata(wallets_data);
        
     });


    const mint = new PublicKey('Fhpnx9y4tWyVUPbPWwfpGBS2Yrx9BBdmZ7BeMgGWwMWe');
    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);
    let secretKeyAdmin = Uint8Array.from([245,201,51,124,100,242,137,82,137,177,105,163,59,239,7,177,55,146,162,204,225,250,95,74,87,228,98,162,213,244,36,103,78,227,20,122,131,210,250,15,236,113,135,120,205,246,235,53,97,170,106,214,19,7,101,1,167,227,76,212,177,0,105,96]);
    let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);

    console.log(AdminKeypair.publicKey.toBase58())


    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );

    var fromWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    )

    var AdminWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
      AdminKeypair.publicKey
    )


    const INTERACTION_FEE = 200000000000000;

    console.log('****');
    console.log('from',wallet.publicKey.toBase58())
    console.log('to',AdminKeypair.publicKey.toBase58())


    try {
      /* interact with the program via rpc */
     const tx =await   program.rpc.interaction(new BN(6000000000),{
        accounts: {
          from: fromWalletTokenAcc.address,
          to: AdminWalletTokenAcc.address,
          owner: wallet.publicKey,
          tokenProgram: TOKEN_PROGRAM_ID,
        },
      });

      console.log(tx);

      
    } catch (err) {
      console.log("Transaction error: ", err);
    }

    console.log('wall',wallets_add_data);
    for (let i = 0; i < wallets_add_data.length; i++) {
       let to_wall =  new PublicKey(wallets_add_data[i].wall_address);
       let to_amt =  wallets_add_data[i].amount;

       

       var to_TokenAccount = await myToken.getOrCreateAssociatedAccountInfo(
        to_wall
      )

      var transaction_token1 = new web3.Transaction()
    .add(
      Token.createTransferInstruction(
        TOKEN_PROGRAM_ID,
        AdminWalletTokenAcc.address,
        to_TokenAccount.address,
        AdminKeypair.publicKey,
        [],
        to_amt*1000000000
      )
    );
  // Sign transaction, broadcast, and confirm
  var signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction_token1,
    [AdminKeypair]
  );

    console.log(signature);


    }

   

    


  }




    
  
  

  
  
    if (!wallet.connected) {
      /* If the user's wallet is not connected, display connect wallet button. */
      return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
          <WalletMultiButton />
        </div>
      )
    } else {
      return (
        <div className="App">
          <div>
            {
              !value && (<button onClick={takeandsendtoken}>Create counter {walletAddr}</button>)
            }
            {
              value && <button onClick={increment}>Increment counter</button>
            }
  
            {
              value && value >= Number(0) ? (
                <h2>{value}</h2>
              ) : (
                <h3>Please create the counter.</h3>
              )
            }
          </div>
        </div>

        
      );
    }

  }


  const AppWithProvider = () => (
    <ConnectionProvider endpoint="https://api.devnet.solana.com">
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Login />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  )
  
  export default AppWithProvider;


