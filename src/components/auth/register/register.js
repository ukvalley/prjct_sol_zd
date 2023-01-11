
import React, { useEffect, useState } from "react";
import axios from 'axios';

import Loader2 from '../../customer/layout/loader2';

import { Link, useParams, useNavigate } from "react-router-dom";
import Loader from "../../customer/layout/loader";
import img_11 from '../../../components/customer/dashboard/my_css/project_images/solzed.png';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet, getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import Swal from 'sweetalert2';

import {
  BN,
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from '../../../idl.json';


const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet(),
  getMathWallet(),
  getSolletWallet(),
  getSolflareWallet(),
  getCoin98Wallet(),
]
const { SystemProgram, Keypair } = web3;

const CONTRACT_KEY = process.env.REACT_APP_CONTRACT_KEY.split(',');


let base_url = process.env.REACT_APP_BASE_URL



const opts = {
  preflightCommitment: "processed"
}


const programID = new PublicKey(idl.metadata.address);



export default function Register() {

  const wallet = useWallet();
  const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
  const [walletAddr, setWalletaddr] = useState();
  const [walletdata, setwalletdata] = useState();
  const [userdata, setUserData] = useState();
  const [loadermsg, setLoadermsg] = useState();



  const [siteSetting, setSiteSetting] = useState(null);
  const [sponsorData, setsponsorData] = useState(null);
  const [sponcerValue, setSponcerValue] = useState(null);
  const [walletAddress, setwalletAddress] = useState(null);
  const [loading, setLoading] = useState(null);

  const {sponcer_id} = useParams();

  const navigate = useNavigate();




  const header = {
    "Access-Control-Allow-Origin": "*"
  }




  useEffect(() => {

    

    if (siteSetting == null) {
      fetchSetting();

    }

    
  },[]);

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.mainnet-beta.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);


    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,

    );
    setWalletaddr(wallet.publicKey.toBase58());
    console.log(wallet.publicKey.toBase58());

    return provider;
  }

  // end of useeffects

  async function fetchSetting() {
    setLoading(true);
    setLoadermsg('Fetching Information');
    
    axios.get(base_url + `show/1`)
      .then(res => {
        setSiteSetting(res.data);
        setLoading(false);
      });

  }


  function register_user(sponcer_id, amount) {

    setLoading(true);
    setwalletAddress("ABC");

    const userdata =
    {
      email: 'walletAddress',
      sponcer: sponcerValue
    };
    axios.post(base_url + 'register_user1', userdata, { headers: header })
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

    setLoading(false);

  }


  async function update_transaction_hash(hash_data) {
    setLoadermsg('Updating Transaction');

    const header = {
      "Access-Control-Allow-Origin": "*"
    }
    console.log(hash_data);

    await axios({
      url: base_url + 'update_transaction_hash',
      method: 'post',
      data: hash_data,
      header: header
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }


  async function takeandsendtoken(amount, sponcer) {
    setLoadermsg('Fetching Wallet');

    const provider = await getProvider();
    console.log(provider);
    const wallet_addr = wallet.publicKey.toBase58();
    const program = new Program(idl, programID, provider);
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);


    let package_amt = amount;
    let wallets_add_data = wallet.publicKey.toBase58();
    console.log('wal_ad', wallet_addr);



    const mint = new PublicKey('So11111111111111111111111111111111111111112');

    let tx1_hash = null;

    let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
    let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);

    // console.log(AdminKeypair.publicKey.toBase58())


    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );

    setLoading(true);



    let INTERACTION_FEE = parseFloat(package_amt) + parseFloat(1);

    INTERACTION_FEE = INTERACTION_FEE / 10

    console.log(INTERACTION_FEE);

    console.log('****');
    console.log('from', wallet.publicKey.toBase58())
    console.log('****tokenaccount');
    console.log('to', AdminKeypair.publicKey.toBase58())

    setLoadermsg('Sending Request to your wallet');

    try {
      /* interact with the program via rpc */
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: AdminKeypair.publicKey,
          lamports: 10 * 1000000,
        })
      );

      const signature123 = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature123, 'processed');

      console.log(signature123);

      tx1_hash = signature123;




    } catch (err) {
      console.log("Transaction error: ", err);
      Swal.fire({
        title: 'Error!',
        text: err,
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
    }

    if (tx1_hash != null) {
      setLoadermsg('Payment Capture Now Splitting to all');

      let trans_hash_data = [];

      //  await axios.get(base_url+'register_user/'+wallets_add_data+'/'+sponcer+'');  

      await axios.get(base_url + 'dummy_data')
        .then(res => {
          const wallets_data = res.data;
          wallets_add_data = res.data;
          console.log('wallets', wallets_data);
          setwalletdata(wallets_data);

        });

      console.log('wall', wallets_add_data);
      for (let i = 0; i < wallets_add_data.length; i++) {
        let to_wall = new PublicKey(wallets_add_data[i].wall_address);
        let to_amt = wallets_add_data[i].amount;

        console.log(wallets_add_data[i].wall_address);


        setLoadermsg('Transferring to ' + to_wall);


        //  console.log(wallets_add_data[i].trans_hash);


        var transaction_token1 = new web3.Transaction()
          .add(
            SystemProgram.transfer(
              AdminKeypair.publicKey,
              to_wall.toBase58(),
              AdminKeypair.publicKey,
              to_amt * 1000000
            )
          );
        // Sign transaction, broadcast, and confirm
        try {
          var signature = await web3.sendAndConfirmTransaction(
            connection,
            transaction_token1,
            [AdminKeypair]
          );




          let signature_pair = [wallets_add_data[i].trans_hash, signature]
          trans_hash_data[i] = signature_pair;
          console.log(signature_pair);
          setLoadermsg('Transferred Successfully signature is:' + signature);

        } catch (error) {
          console.log(error);
          setLoadermsg('Transferred failed to' + to_wall + ' Due to Network Error. Hold Transferring to next');

        }



      }

      console.log(trans_hash_data);

      // update_transaction_hash(trans_hash_data);
      setLoading(false);

      // localStorage.setItem('loggedInUser', wallet.publicKey.toBase58());                
      // navigate('/Dashboard');



    }





  }





  function handleSubmit(e) {
    e.preventDefault()
    setLoadermsg('Fetching Wallet');
    setLoading(true);
    const provider = getProvider();
    console.log(provider);
    const wallet_addr = wallet.publicKey.toBase58();
    const program = new Program(idl, programID, provider);
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);

    console.log(e);
    const { sponsor } = e.target.elements;
    if (sponsor.value != null || sponsor.value != '' || sponsor != null) {
      //  takeandsendtoken(10,sponsor.value);
      axios.get(base_url + 'register_user/' + wallet_addr + '/' + sponsor.value + '')
        .then(res => {
          console.log(res.data)
          if (res.data.status == 'success') {

            localStorage.setItem('loggedInUser', wallet.publicKey.toBase58());
            navigate('/Dashboard');


          }
          else {

            Swal.fire({
              title: 'Error!',
              text: res.data.error_name,
              icon: 'error',
              confirmButtonText: 'Okay'
            })

          }
          setLoading(false);
        });

      //  console.log({'sponsor': sponsor.value })

    }
    else {
      Swal.fire({
        title: 'Error!',
        text: "Sponcer Account does not exists",
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    }

  };

  if (loading == false) {
    return (
      <div className="container">

        <div className="row d-flex justify-content-center mt20">
          <div className="col-12 col-md-8  col-xl-5">
            <div className="login_card py-3 px-2 shadow p-3 mb-5">
              <div className="row mx-auto ">

                <div className="col-12 photo">
                  <img className='img_logo pulse' src={img_11} alt='import' style={{ width: "200px" }}></img>

                </div>
              </div>
              <p className="text-center mb-3 mt-2 yello-bg">Register through Solana Token Wallet {siteSetting['site_name']}</p>

              <div className="division">
                <div className="row">

                  <div className="col-12"><span className="bg-white">Wallet Address : Wallet Address</span></div>

                </div>
              </div>
              <form className="myform" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id='sponsor'
                    className="form-control"
                    value={sponcer_id}
                    required={true}
                    minLength={35}
                    placeholder="Enter Referral Address" />

                </div>

               

                <div className="row">



                </div>
                <div className="form-group mt-3">
                {!wallet.connected
                  ?
                  <WalletMultiButton />
                  :
                  <button type="submit" className="btn btn-primary btn-lg full">
                    <small><i className="fa fa-credit-card" />Register & Pay.</small>
                  </button> 
                }
                </div>
              </form>





              <div className='row mts30'>
                <Link to="/login"> <p>Already Registered Click here</p></Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    );

  }
  else {
    return (
      <Loader2
        msg={loadermsg}
      />
    )
  }
}


