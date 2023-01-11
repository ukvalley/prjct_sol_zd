
import React, { Component } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";


import Home from "./components/customer/dashboard/home";

import Register from "./components/auth/register/register"
import Login1 from "./components/auth/login/login"
import Dashboard1 from "./components/customer/dashboard/dashboard"
import Report from "./components/customer/dashboard/report/report"
import MatchingReport from "./components/customer/dashboard/matching_report/matching_report"
import Report_Activation from "./components/customer/dashboard/report_activation/report_activation"
import Report_Withdrawal from "./components/customer/dashboard/report_withdrawal/report_withdrawal"

import Report_Package from "./components/customer/dashboard/report_activation/report_package";

import Package from './components/customer/dashboard/package/package';
import Illuminating_tree from './components/customer/dashboard/illuminating_level_tree/illuminating_tree';
import Rapid_tree from './components/customer/dashboard/rapidfire_level_tree/rapid_tree';
import My_team from './components/customer/dashboard/my_team/my_team';
import Staking from './components/customer/dashboard/staking/staking'
import Staking_details from './components/customer/dashboard/staking_detail/Staking_detail'
import Staking_team from "./components/customer/dashboard/staking_team/staking_team";

import Report_Sender from "./components/customer/dashboard/report_activation/report_sender";

import My_Direct_Team from "./components/customer/dashboard/my_team/my_direct_team";

import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet, getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';



require('@solana/wallet-adapter-react-ui/styles.css');
const opts = {
  preflightCommitment: "processed"
}
const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet(),
  getMathWallet(),
  getSolletWallet(),
  getSolflareWallet(),
  getCoin98Wallet(),
]

function App() {


  document.title = 'Solzed';
  const wallet = useWallet();



  return (
    <div className="background_theme">

      




      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />


          <Route path="/login" element={<Login1 />} />
          <Route path="/register/:sponcer_id" element={<Register />} />
          <Route path="/register" element={<Register />} />

          <Route path="/dashboard/*" element={<Dashboard1 />} >

            <Route path="report/:id" element={<Report />} />
            <Route path="staking" element={<Staking />} />
            <Route path="staking_detail/:user_id/:packageamt" element={<Staking_details />} />


            <Route path="staking_team/:id/:packageamt" element={<Staking_team />} />

            <Route path="matching_report/:id/:packageamt" element={<MatchingReport />} />

            <Route path="report_activation/:id" element={<Report_Activation />} />
            <Route path="report_sender/:id" element={<Report_Sender />} />
            <Route path="report_Package/:id/:package_amt" element={<Report_Package />} />

            
            <Route path="report_withdrawal/:id" element={<Report_Withdrawal />} />


            <Route path="package/:id/:user_id" element={<Package />} />
            <Route path="illuminating_tree/:id/:user_id" element={<Illuminating_tree />} />
            <Route path="rapid_tree/:id/:user_id" element={<Rapid_tree />} />
            <Route path="my_team" element={<My_team />} />
            <Route path="my_direct_team" element={<My_Direct_Team />} />
            


          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}



const AppWithProvider = () => (
  <ConnectionProvider endpoint="https://api.mainnet-beta.solana.com">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;






