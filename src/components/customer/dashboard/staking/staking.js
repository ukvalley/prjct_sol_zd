import React, { useState, useEffect } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate, Link } from "react-router-dom";
import Loader from "../../../customer/layout/loader";
import axios from 'axios';

import ProgressBar from 'react-bootstrap/ProgressBar'


import video2782 from '../../../../assets1/2781013183.mp4';

import Table from 'react-bootstrap/Table'

import Swal from 'sweetalert2';
import Loader2 from '../../../customer/layout/loader2';




import { Connection, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import {
  BN,
  Program, Provider, web3
} from '@project-serum/anchor';
import idl from '../../../../idl.json';


import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet, getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Token, TOKEN_PROGRAM_ID, getOrCreateAssociatedTokenAccount } from '@solana/spl-token';
import * as splToken from "@solana/spl-token";
import { set } from '@project-serum/anchor/dist/cjs/utils/features';
require('@solana/wallet-adapter-react-ui/styles.css');
require('../../dashboard/newdash.css');

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

const Staking = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  name,
}) => {


  const wallet = useWallet();
  const { connected, publicKey, signTransaction, sendTransaction } = useWallet()
  const [walletAddr, setWalletaddr] = useState();
  const [walletdata, setwalletdata] = useState();
  const delay = ms => new Promise(res => setTimeout(res, ms));

  const [trans_hash, settrans_hash] = useState();

  const [loadermsg, setLoadermsg] = useState();


  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  const [wallets, setWallets] = useState();
  const [packages, setPackages] = useState();
  const [userdata, setUserData] = useState();


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


  //setInterval(refresh_wall, 6000);


  async function refresh_wall() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    fetch_dashboard_info_refresh(loggedInUser);
  }


  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.mainnet-beta.solana.com";
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
    const network = "https://api.mainnet-beta.solana.com";
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
      await axios.get(base_url + 'activate_package_staking/' + package_amt + '/' + wallets_add_data + '')
        .then(res => {
          wallets_data = res.data;
          console.log(wallets_data);
          settrans_hash(res.data);

        });

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
    const network = "https://api.mainnet-beta.solana.com";

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
    let amount = userdata.wallets.stake_wallet;
    let user_id = loggedInUser;
    let wallet_addr = wallet.publicKey.toBase58();

    if (amount >= 10) {



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

          await axios.get(base_url + 'withdrawal_all_staking/' + amount + '/' + user_id + '/' + signature);


          setLoadermsg('Transferred Successfully signature is:' + signature);
          fetch_dashboard_info(loggedInUser);

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
        <main className="fullh">




          <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
            <FaBars />
          </div>

          <div className="container">

          </div>



          <div className="container last-block  mb-5">
            <section id="minimal-statistics mt20">


              <div className="row">


                <div className="col-xl-6 col-md-12 mt-4">
                  <div className='card5'>
                    <div className="card-content">
                      <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2"></i>
                          </div>
                          <div className="media-body">
                            <h6>Callisto Coin Price</h6>
                            <span> <h3> {userdata.coin_price} $ <span className='small_font blinker'>({userdata.wallets.percent_change}%)</span> <span>{userdata.wallets.percent_status == "positive" ? <> <span className="color_green blinker">&#8593;</span></> : <><span className="color_red blinker">&darr;</span></>}</span> <br></br>
                            </h3></span>

                          </div>



                        </div>






                      </div>
                    </div>
                  </div>

                </div>



                <div className="col-xl-6 col-md-12 mt-4">
                  <div className='card5'>
                    <div className="card-content">
                      <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2"></i>
                          </div>
                          <div className="media-body">
                            <h6>Coin Wallet</h6>
                            <span> <h3> {userdata.wallets.my_coin}  <span className='small_font'>({userdata.wallets.my_coin_usd} $)</span> <br></br>
                            </h3></span>

                          </div>



                        </div>






                      </div>
                    </div>
                  </div>

                </div>



                <div className="col-xl-6 col-md-12 mt-4">
                  <div className='card5'>
                    <div className="card-content">
                      <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2"></i>
                          </div>
                          <div className="media-body">
                            <h6>Total Staking Dividand</h6>
                            <span> <h3> Amount: {userdata.wallets.staking_roi} $ <br></br>
                            </h3></span>

                          </div>



                        </div>






                      </div>
                    </div>
                  </div>

                </div>


                <div className="col-xl-6 col-md-12 mt-4">
                  <div className='card5'>
                    <div className="card-content">
                      <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2"></i>
                          </div>
                          <div className="media-body">
                            <h6>Total Team Dividand</h6>
                            <span> <h3> Amount: {userdata.wallets.level_roi_income} $ <br></br>
                            </h3></span>

                          </div>



                        </div>






                      </div>
                    </div>
                  </div>

                </div>


                <div className="col-xl-6 col-md-12 mt-4">
                  <div className='card5'>
                    <div className="card-content">
                      <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2"></i>
                          </div>
                          <div className="media-body">
                            <h6>Staking Wallet</h6>
                            <span> <h3> Amount: {userdata.wallets.stake_wallet} $ <br></br>
                            </h3></span>

                          </div>



                        </div>






                      </div>
                    </div>
                  </div>

                </div>


                <div className="col-xl-6 col-md-12 mt-4">
                  <div className='card5'>
                    <div className="card-content">
                      <div className="card-body cleartfix">
                        <div className="media align-items-stretch">
                          <div className="align-self-center">
                            <i className="icon-speech warning font-large-2"></i>
                          </div>
                          <div className="media-body">
                            <h6>Staking Withdrawal</h6>
                            <span> <h3> Amount: {userdata.wallets.withdrawal_stake} $ <br></br>
                            </h3></span>

                          </div>



                        </div>






                      </div>
                    </div>
                  </div>

                </div>



              </div>


              <div className='withdrwalcard'>

                <button onClick={() => withdraw_payment()} className="withdraw-btn">Withdrawal Staking Profit</button>


              </div>




              <p className="text-center mb-3 focus_bg mt-4">Staking Packages For Silver</p>


              <div className="row">

                {userdata.stake_package_25.map((packages, index) => (

                  <div className="col-xl-6 col-md-12 mt-4">
                    <div className={`${packages.is_active == 'active' ? 'card3' : 'card6'}`}>
                      <div className="card-content">
                        <div className="card-body cleartfix">
                          <div className="media align-items-stretch">
                            <div className="align-self-center">
                              <i className="icon-speech warning font-large-2"></i>
                            </div>
                            <div className="media-body">
                              <h6>Silver Staking Package</h6>
                              <span> <h3> Amount: {packages.amount} $ <br></br>
                                <span> <h6>  Dividend: {packages.roi} $ Daily for {packages.time} Months </h6> </span>
                              </h3></span>

                            </div>
                            {userdata.package_25 == "inactive"
                              ? <Link to="/dashboard" > <button className="btn btn-dark mt-5">Purchase Silver</button> </Link>
                              :
                              <>
                                {packages.is_active == "inactive"

                                  ? <button className="btn btn-dark mt-5" onClick={() => takeandsendtoken(packages.amount)}> Stake Now {packages.amount} $</button>
                                  : <Link to={"/dashboard/staking_details/" + loggedInUser + "/" + packages.amount}> <button className="btn btn-dark mt-5" > View Details {packages.amount} $</button> </Link>

                                }
                              </>
                            }
                          </div>






                        </div>
                      </div>
                    </div>





                  </div>

                ))};

              </div>
            </section>
            <section id="minimal-statistics mt20">

              <p className="text-center mb-3 focus_bg mt-4">Staking Packages For Bronze</p>

              <div className="row">

                {userdata.stake_package_100.map((packages, index) => (

                  <div className="col-xl-6 col-md-12 mt-4">

                    <div className={`${packages.is_active == 'active' ? 'card3' : 'card2'}`}>
                      <div className="card-content">
                        <div className="card-body cleartfix">
                          <div className="media align-items-stretch">
                            <div className="align-self-center">
                              <i className="icon-speech warning font-large-2"></i>
                            </div>
                            <div className="media-body">
                              <h6>Bronze Staking Package</h6>
                              <span> <h3> Amount: {packages.amount} $ <br></br>
                                <span> <h6>  Dividend: {packages.roi} $ Daily for {packages.time} Months </h6> </span>
                              </h3></span>

                            </div>
                            {userdata.package_25 == "inactive"
                              ? <Link to="/dashboard/matching_report/matching_entry/25" > <button className="btn btn-dark mt-5">Purchase Bronze</button> </Link>
                              :
                              <>
                                {packages.is_active == "inactive"

                                  ? <button className="btn btn-dark mt-5" onClick={() => takeandsendtoken(packages.amount)} > Stake Now {packages.amount} $</button>
                                  : <Link to={"/dashboard/staking_details/" + loggedInUser + "/" + packages.amount}> <button className="btn btn-dark mt-5" > View Details {packages.amount} $</button> </Link>
                                }
                              </>
                            }
                          </div>






                        </div>
                      </div>
                    </div>






                  </div>

                ))};

              </div>




            </section>


            <section>


              <div className="card-badge label-purchased">Last Staking Transaction</div>
              <div className="table-wrapper">
                <div className="table-scroll">

                  <Table striped bordered hover variant="dark">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Staking Account</th>
                        <th>Amount</th>
                        <th>date</th>
                        <th>Hash</th>


                      </tr>
                    </thead>
                    <tbody>
                      {userdata.staking_last_10.map((transaction, index) => (

                        <tr>
                          <td>{index + 1}</td>
                          <td>{transaction.sender}</td>
                          <td>{transaction.amount}</td>
                          <td>{transaction.date}</td>
                          <td>{transaction.hash}</td>

                        </tr>
                      ))}

                    </tbody>


                  </Table>

                </div>
              </div>



            </section>

          </div>






        </main >
      );
    }
  };

}



export default Staking;

