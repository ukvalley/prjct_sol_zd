import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../customer/layout/loader";
import axios from 'axios';

import ProgressBar from 'react-bootstrap/ProgressBar'


import index_decentralized from '../../../assets1/index_decentralized.webp';
import index_low_cost from '../../../assets1/index_low_cost.webp';
import index_fast_fck from '../../../assets1/index_fast_fck.webp';
import video2782 from '../../../assets1/2781013183.mp4';


import starter from '../../../assets/Starter.gif';
import elite from '../../../assets/elite.gif';
import solzed from '../../../assets/solzed.gif';

import { BiCopy,BiSearchAlt2, BiAbacus, BiBrightness, BiStar, BiHive, BiUserPlus, BiShapePolygon, BiCalendarStar } from "react-icons/bi";
import { FaBullseye, FaRegGem } from "react-icons/fa";
import {FcApproval, FcMoneyTransfer, FcOk, FcWorkflow, FcSalesPerformance, FcSerialTasks, FcNeutralTrading, FcGenealogy, FcPositiveDynamic, FcMindMap, FcScatterPlot, FcGlobe, FcRatings } from "react-icons/fc";

import Swal from 'sweetalert2';
import Loader2 from '../../customer/layout/loader2';

import moment from 'react-moment';




import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import {
  BN,
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from '../../../idl.json';


import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet, getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Token, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import * as splToken from "@solana/spl-token";
import { set } from '@project-serum/anchor/dist/cjs/utils/features';


require('@solana/wallet-adapter-react-ui/styles.css');
require('../dashboard/solzed.css');


const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet(),
  getMathWallet(),
  getSolletWallet(),
  getSolflareWallet(),
  getCoin98Wallet(),
]
const { SystemProgram, Keypair, LAMPORTS_PER_SOL } = web3;
/* create an account  */
//const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "confirmed"
}


const programID = new PublicKey(idl.metadata.address);

const Main = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  name,
}) => {


  const [fname, set_fName] = useState('');

  const wallet = useWallet();
  const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
  const [walletAddr, setWalletaddr] = useState();
  const [walletdata, setwalletdata] = useState();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [trans_hash, settrans_hash] = useState();

  const [loadermsg, setLoadermsg] = useState();

  const [g_hours, set_g_hours] = useState('');
  const [g_mins, set_g_mins] = useState('');

  const [g_sec, set_g_sec] = useState('');



  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [wallets, setWallets] = useState();
  const [packages, setPackages] = useState();
  const [userdata, setUserData] = useState();
  const [endDate, SetendDate] = useState('');

  const [fetch, setFetch] = useState(false);

  const CONTRACT_KEY = process.env.REACT_APP_CONTRACT_KEY.split(',');

  let base_url = process.env.REACT_APP_BASE_URL
  const header = {
    "Access-Control-Allow-Origin": "*"
  }

  const loggedInUser = localStorage.getItem("loggedInUser");










  useEffect(() => {

    if (fetch == false) {

      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
        //  console.log(loggedInUser);

      }
      else {
        navigate('/login');
      }





      setLoading(true);
      setLoadermsg('Fetching Information');


      if (walletdata == null) {
        fetch_dashboard_info(loggedInUser)

      }



    }
  }, [loading, walletdata]);


  const MINUTE_MS = 90000;
  useEffect(() => {
    const interval = setInterval(() => {
      refresh_wall()
    }, MINUTE_MS);

    return () => clearInterval(interval);

  }, []);


  useEffect(() => {
    const interval = setInterval(() => {
      get_time(getTimestampInSeconds, toTimestamp(endDate));
    }, 1000);

    return () => clearInterval(interval)
  })


  //setInterval(refresh_wall, 6000);


  async function refresh_wall() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    fetch_dashboard_info_refresh(loggedInUser);
  }


  function get_time(start_date, end_date) {

    //    console.log(end_date);

    start_date = Date.now();
    // console.log(start_date);


    const diff = end_date - start_date;

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);




    set_g_hours(hours);
    set_g_mins(minutes);
    set_g_sec(seconds);

  }


  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://holy-sleek-daylight.solana-mainnet.discover.quiknode.pro/4246ee919a071c4c9cf81d19d8e0e2232dd47abe/";
    const connection = new Connection(network, {
      commitment: opts.preflightCommitment,
      confirmTransactionInitialTimeout: 150 * 10 * 100
    });



    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,

    );


    setWalletaddr(wallet.publicKey);
    //  console.log(walletAddr)


    return provider;
  }


  async function fetch_dashboard_info(loggedInUser) {




    setLoadermsg("Fetching User's information");

    await axios.get(base_url + 'dashboard_information/' + loggedInUser, { headers: header })
      .then(res => {

        //  console.log(res.data)

        setUserData(res.data);
        setFetch(true);
        setLoading(false);
        setLoadermsg('');


      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }

  function toTimestamp(strDate) {
    var datum = Date.parse(strDate);
    return datum;
  }

  function getTimestampInSeconds() {
    return Math.floor(Date.now() / 1000)
  }





  async function fetch_dashboard_info_refresh(loggedInUser) {





    await axios.get(base_url + 'dashboard_information/' + loggedInUser, { headers: header })
      .then(res => {

        //  console.log(res.data)

        setUserData(res.data);
        setFetch(true);
       

      })
      .catch(error => {
        console.error('There was an error!', error);
      });

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

  function handleNameSubmit(event) {
    event.preventDefault();


    if (!wallet.connected) {
      Swal.fire({
        title: 'Wallet Not connected',
        text: 'Wallet Not connected',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      return false;

    }

    else {
      Update_name(fname, userdata.user_data.email);

    }



  }

  async function Update_name(name, user_id) {
    setLoading(true);
    await axios.get(base_url + 'update_name/' + name + '/' + user_id + '')
      .then(res => {
        if (res.data.status == "success") {
          Swal.fire({
            title: 'Username Updated',
            text: res.data.message,
            icon: 'success',
            confirmButtonText: 'Okay'
          })

          setLoading(false);
        }
      });
  }


  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    setLoadermsg('Processing Instruction please wait...');

    const { amountenter } = e.target.elements

    if (amountenter.value == 25 || amountenter.value == 100) {
      takeandsendtoken(amountenter.value);
    }
    else {
      setLoading('false');
      setLoadermsg('');

      Swal.fire({
        title: 'Error!',
        text: "Enter Package Amount 25$ or 100$",
        icon: 'error',
        confirmButtonText: 'Okay'
      })
    }



  }



  async function takeandsendtoken(amount) {
    setLoadermsg('Fetching Wallet');

    const provider = await getProvider();
    // console.log(provider);
    if (!wallet.connected) {
      Swal.fire({
        title: 'Wallet Not connected',
        text: 'Wallet Not connected',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      return false;

    }
    const wallet_addr = wallet.publicKey.toBase58();
    const program = new Program(idl, programID, provider);
    const network = "https://holy-sleek-daylight.solana-mainnet.discover.quiknode.pro/4246ee919a071c4c9cf81d19d8e0e2232dd47abe/";
    const connection = new Connection(network, {
      commitment: opts.preflightCommitment,
      confirmTransactionInitialTimeout: 120 * 10 * 100
    });


    let package_amt = amount;
    let wallets_add_data = wallet.publicKey.toBase58();
    //  console.log('wal_ad',wallet_addr);

    if (loggedInUser != wallets_add_data) {
      Swal.fire({
        title: 'User Account not Matched',
        text: 'Logged In User Account not matched with Wallet Address',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
      setLoadermsg('');

      return false;
    }

    var mint = new PublicKey('So11111111111111111111111111111111111111112');

    mint = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

    let tx1_hash = null;


    let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
    let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);

    // console.log(AdminKeypair.publicKey.toBase58())

    mint = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

    var myToken = new Token(
      provider.connection,
      mint,
      TOKEN_PROGRAM_ID,
      wallet.PublicKey
    );
    let lamportBalance;
    var balance = await connection.getBalance(wallet.publicKey);

    lamportBalance = (balance / LAMPORTS_PER_SOL)
    console.log(lamportBalance);
    if (lamportBalance < 0.0005) {
      Swal.fire({
        title: 'Please Keep SOL Balance for Network Fees',
        text: 'Please Keep SOL Balance for Network Fees',
        icon: 'error',
        confirmButtonText: 'Okay'
      })

      return false;

    }

    var fromWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
      wallet.publicKey
    )

    var AdminWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
      AdminKeypair.publicKey
    )

    const myWalletMyTokenBalance = await connection.getTokenAccountBalance(
      fromWalletTokenAcc.address
    );

    let INTERACTION_FEE = parseFloat(package_amt) + parseFloat(userdata.fees);
    INTERACTION_FEE = INTERACTION_FEE;


    console.log("wallet balance", myWalletMyTokenBalance.value.uiAmount);

    if (myWalletMyTokenBalance.value.uiAmount < INTERACTION_FEE) {
      Swal.fire({
        title: 'Please Keep USDT Balance for Package',
        text: 'Please Keep USDT Balance for Package',
        icon: 'error',
        confirmButtonText: 'Okay'
      })

      return false;

    }

    setLoading(true);
    setLoadermsg('Fetching Wallet Information');





    console.log(INTERACTION_FEE);

    console.log('****');
    console.log('from', wallet.publicKey.toBase58())
    console.log('from', fromWalletTokenAcc.address)
    console.log('from', AdminWalletTokenAcc.address)
    console.log('****tokenaccount');
    console.log('to', AdminKeypair.publicKey.toBase58())

    setLoadermsg('Sending Request to your wallet');

    try {
      /* interact with the program via rpc */
      const transaction = new Transaction().add(
        Token.createTransferInstruction(
          TOKEN_PROGRAM_ID,
          fromWalletTokenAcc.address,
          AdminWalletTokenAcc.address,
          publicKey,
          [],
          INTERACTION_FEE * 1000000
        )
      )
      setLoadermsg('Communicating with blockchain. It takes 20 Confirmation. Please Wait while...');

      const signature123 = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature123, 'confirmed');

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
      setLoadermsg('');

    }

    if (tx1_hash != null) {
      setLoadermsg('Payment Capture Now Activating Your Account');

      let wallets_data = '';

      if(package_amt == "50")
      {
        await axios.get(base_url + 'activate_package_new/' + package_amt + '/' + wallets_add_data + '')
        .then(res => {
          wallets_data = res.data;
          console.log(wallets_data);
          settrans_hash(res.data);

        });


      }
      else if(package_amt == "100")
      {
        await axios.get(base_url + 'activate_package_new_100/' + package_amt + '/' + wallets_add_data + '')
        .then(res => {
          wallets_data = res.data;
          console.log(wallets_data);
          settrans_hash(res.data);

        });

      }


      else{
        await axios.get(base_url + 'generation_wallet_purchase/'+package_amt+'/' + wallets_add_data + '')
        .then(res => {
          wallets_data = res.data;
          console.log(wallets_data);
          settrans_hash(res.data);

        });

      }

      
      await axios.get(base_url + 'update_transaction_hash_single/' + wallets_data.trans_hash + '/' + tx1_hash + '');




    }
    setLoadermsg('');

    setLoading(false);
    fetch_dashboard_info(wallet.publicKey.toBase58());




  }


  async function copy_link(side) {
    console.log('copied')
    navigator.clipboard.writeText('https://callistoworld.io/register/' + wallet.publicKey.toBase58() + '/' + side);
    Swal.fire({
      title: 'Coppied',
      text: 'Referral Link Copied',
      icon: 'success',
      confirmButtonText: 'Okay'
    })
  }

  async function set_withdrawal_lock(user_id, lock) {
    await axios.get(base_url + 'set_withdrawal_lock/' + user_id + '/' + lock);
  }



  async function withdraw_payment() {


    setLoading(true);
    setLoadermsg('Withdrwal payment initiated. Please wait...');
    const network = "https://holy-sleek-daylight.solana-mainnet.discover.quiknode.pro/4246ee919a071c4c9cf81d19d8e0e2232dd47abe";

    const connection = new Connection(network, {
      commitment: opts.preflightCommitment,
      confirmTransactionInitialTimeout: 120 * 10 * 100
    });

    // await delay(300);

    if (!wallet.connected) {
      Swal.fire({
        title: 'Wallet Not connected',
        text: 'Wallet Not connected',
        icon: 'error',
        confirmButtonText: 'Okay'
      })

      setLoading(false);
      setLoading('');
      return false;


    }




    fetch_dashboard_info_refresh(wallet.publicKey.toBase58());

    console.log(userdata.user_data.withdrawal_lock);
    if (userdata.user_data.withdrawal_lock == 'true') {
      Swal.fire({
        title: 'Error!',
        text: 'Already withdrwal in process',
        icon: 'error',
        confirmButtonText: 'Okay'
      })
      setLoading(false);
      setLoadermsg('');

      return false;
    }



    let loggedInUser = localStorage.getItem("loggedInUser");
    console.log('clicked')
    let amount = userdata.wallets.income_wallet;
    let user_id = loggedInUser;
    let wallet_addr = wallet.publicKey.toBase58();

    if (amount >= 2) {



      if (loggedInUser == wallet_addr) {
        console.log('wallet matched')

        setLoadermsg('Started proceesing on withdrawal. Please wait...');
        set_withdrawal_lock(loggedInUser, true);
        const provider = await getProvider();

        let secretKeyAdmin = Uint8Array.from(CONTRACT_KEY);
        let AdminKeypair = Keypair.fromSecretKey(secretKeyAdmin);
        let to_wall = new PublicKey(wallet_addr);

        var mint = new PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB');

        var myToken = new Token(
          provider.connection,
          mint,
          TOKEN_PROGRAM_ID,
          wallet.PublicKey
        );

        var fromWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
          AdminKeypair.publicKey
        )

        var ToWalletTokenAcc = await myToken.getOrCreateAssociatedAccountInfo(
          wallet.publicKey
        )

        let amount1 = amount * 0.9;
        console.log(amount1);

        const transferTransaction = new Transaction()
          .add(Token.createTransferInstruction(
            TOKEN_PROGRAM_ID,
            fromWalletTokenAcc.address,
            ToWalletTokenAcc.address,
            AdminKeypair.publicKey,
            [],
            amount1 * 1000000
          )
          )





        // Sign transaction, broadcast, and confirm
        try {

          let r = (Math.random() + 1).toString(36).substring(7);

          setLoadermsg('Communicating with blockchain. It needs 20 Confirmation Please wait...');



          var signature = await web3.sendAndConfirmTransaction(
            connection,
            transferTransaction,
            [AdminKeypair]
          );

          await axios.get(base_url + 'withdrawal_all/' + amount + '/' + user_id + '/' + signature);
          

          setLoadermsg('Transferred Successfully signature is:' + signature);
          fetch_dashboard_info(loggedInUser);

          Swal.fire({
            title: 'Success!',
            text: "Withdrawal Successfull",
            icon: 'success',
            confirmButtonText: 'Okay'
          })

        } catch (error) {
          console.log(error);
          Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'Okay'
          })

          set_withdrawal_lock(loggedInUser, false);



        }
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: 'You have not authority to withdrawal fund. Login Through Wallet to withdraw.',
          icon: 'error',
          confirmButtonText: 'Okay'

        })
        set_withdrawal_lock(loggedInUser, false);

      }
    }
    else {
      Swal.fire({
        title: 'Error!',
        text: 'You Dont Have Enough Balance for withdrawal',
        icon: 'error',
        confirmButtonText: 'Okay'

      })

      set_withdrawal_lock(loggedInUser, false);


    }


    set_withdrawal_lock(loggedInUser, false);

    setLoading(false);
    setLoadermsg('');




  }



  if (loading == true || loading == null) {
    return (
      <main className='fullh'>
        <Loader2
          msg={loadermsg}
        />
      </main>
    )


  }



  else {



    if (!userdata.wallets) return (<Loader />)

    else {

      return (
        <body>
          
          <div className="btn-toggle menubtnicon" onClick={() => handleToggleSidebar(false)}>
            <FaBars />
         

          </div>
          <div className='container-fluid new_dashboard'>


            




            <div className="mt-3 mb-5">

           <div className='text-center'>
              <button style={{fontSize:"14px"}} className='inline-block-child btn btn-primary m7'>Team : {userdata.user_data.team_count}</button>
              <img className='inline-block-child m7' style={{height:"50px"}}  src={solzed}></img>
              <button style={{fontSize:"14px"}} className='inline-block-child btn btn-primary m7'>Direct : {userdata.user_data.child_count}</button>

              <p style={{fontSize:"9px"}}> 
              <span> <button className='btn btn-primary btn-small'>
              {userdata.user_data.idnumber}
            </button></span>
              
            &nbsp; {userdata.user_data.email} &nbsp; <span> 
             <a href={"https://solscan.io/account/"+userdata.user_data.email}> <button className='btn btn-primary btn-small'>
              View On SOLSCAN <BiSearchAlt2/>
            </button> </a> </span></p>
            </div>

              <div className="row mb-5">
                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcMoneyTransfer /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.income_wallet}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Today<br /> Income</p>
                      </div>

                    </div>
                  </div>
                </div>
                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcNeutralTrading /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.withdraw_payment}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Total <br />Withdrawal
                        </p>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcGenealogy /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.direct_income}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Direct<br /> Income</p>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcPositiveDynamic /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.level_income}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Level<br /> Income</p>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcRatings /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.direct_working}$</h5>
                        <p className="no-margin"></p>

                        <p className="mb-0 mb-5" style={{ fontSize: 13 }}>Direct working <br /> Income</p>
                      </div>

                    </div>
                  </div>
                </div>

                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcMindMap /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.generation_income}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Generation<br /> Income</p>
                      </div>

                    </div>
                  </div>
                </div>


                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcScatterPlot /></i>

                        <h5 className="mb-0 mt-2">{userdata.wallets.leadership_income}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Leadership<br /> Income
                        {userdata.achieve == 'active' && <FcApproval/>}
                        {userdata.achieve_100 == 'active' && <FcApproval/>}
                        </p>

                        

                      </div>

                    </div>
                  </div>
                </div>


                <div className="col-xl-2 col-sm-4 col-6 mt-1">
                  <div className="card_design padding-4 animate fadeLeft card_solze1">
                    <div className="row">

                      <div className="col s12 m12 center-align">
                        <i
                          className="material-icons background-round mt-5 mb-5">  <FcGlobe /></i>
                        <h5 className="mb-0 mt-2">{userdata.wallets.royalty_income}$</h5>
                        <p className="no-margin"></p>
                        <p className="mb-0 mb-5">Royalty Income</p>
                      </div>

                    </div>
                  </div>
                </div>

                

                

                

                

               

                

                
              </div>


            </div>



           


        <div className='row'>
        {userdata.user_data.is_active != "active" &&
            <div className="card col-md-3 m-2 text-center" >
              <img className="card-img-top" src={starter} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title text-center">$50 Starter</h5>
                 <p className="card-text text-center">You can get all benifit as per plan of 50$</p>
                 {!wallet.connected
                  ?
                  <WalletMultiButton />

                  :
                 <button onClick={() =>takeandsendtoken(50)} className="btn btn-primary btn-block">Purchase</button>
                 }
                 </div>
            </div>
        }



      {userdata.user_data.is_active_100 != "active" &&
            <div className="card col-md-3 m-2 text-center" >
              <img className="card-img-top" src={elite} alt="Card image cap"/>
              <div className="card-body">
                <h5 className="card-title text-center">$100 Elite</h5>
                 <p className="card-text text-center">You can get all benifit as per plan of 100$</p>
                 {!wallet.connected
                  ?
                  <WalletMultiButton />

                  :
                 <button onClick={() =>takeandsendtoken(100)} className="btn btn-primary btn-block">Purchase</button>
                 }</div>
            </div>
        }



        <div className="card col-md-3 m-2 text-center" >
        <div className="card-body">
              <h5 className='text-center m-2'>Generation Wallet Balance   </h5>
              <p className="card-text text-center"><strong>{userdata.wallets.generation_wallet}$</strong></p>
              
                <p className="card-title text-center"><strong>$5 Recharge Generation</strong></p>
                 <p className="card-text text-center">Recharge Your generation wallet with 5$</p>
                 {!wallet.connected
                  ?
                  <WalletMultiButton />

                  :
                 <button onClick={() =>takeandsendtoken(5)} className="btn btn-primary btn-block">Purchase</button>
                  } </div>
            </div>









        </div>


        <div className='row'>


        <div className="card col-md-4 m-2" >
              <div className="card-body">
                <h5 className="card-title text-center">You can Withdraw</h5>
                 <p className="card-text text-center"><strong>{userdata.wallets.wallet_balance}$</strong></p>
                 <p className="card-text text-center">10% Amount will be Deducted and added to generation wallet.</p>
                 {!wallet.connected
                  ?
                  <WalletMultiButton />

                  :
                 <button onClick={() =>withdraw_payment()} className="btn btn-primary btn-block">Withdraw Now</button>
                 }</div>
            </div>


        </div>






          </div >
        </body>
      );
    }
  };

}




export default Main;

