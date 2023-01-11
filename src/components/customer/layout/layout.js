import React, { useState } from 'react';
import Aside from '../layout/sidebar';
import Main from "../dashboard/main";
import Report from "../dashboard/report/report";
import Package from "../dashboard/package/package"
import Illuminating_tree from "../dashboard/illuminating_level_tree/illuminating_tree"
import Rapid_tree from "../dashboard/rapidfire_level_tree/rapid_tree"
import MatchingReport from "../dashboard/matching_report/matching_report"
import Report_Activation from "../dashboard/report_activation/report_activation"
import Report_Package from '../dashboard/report_activation/report_package';
import Report_Sender from '../dashboard/report_activation/report_sender';

import Report_Withdrawal from "../dashboard/report_withdrawal/report_withdrawal"
import Staking from '../dashboard/staking/staking';
import Staking_detail from "../dashboard/staking_detail/Staking_detail"
import Staking_team from '../dashboard/staking_team/staking_team';
import { Router, Routes, Route, useMatch } from "react-router-dom";
import My_Direct_Team from '../dashboard/my_team/my_direct_team';


import { getPhantomWallet, getMathWallet, getSolletWallet, getSolflareWallet, getCoin98Wallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import My_team from '../dashboard/my_team/my_team';

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


function Layout() {
  const wallet = useWallet();

  const [rtl, setRtl] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(true);
  const [toggled, setToggled] = useState(false);

  const [name, setName] = useState('Report');





  const handleCollapsedChange = (checked) => {
    setCollapsed(checked);
  };

  const handleRtlChange = (checked) => {
    setRtl(checked);
  };
  const handleImageChange = (checked) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value) => {
    if (toggled === false) {
      setToggled(true);
    }
    else {
      setToggled(false);
    }

  };





  return (
    <div className={`app ${rtl ? 'rtl' : ''} ${toggled ? 'toggled' : ''} themeColor`}>
      <Aside
        image={image}
        collapsed={collapsed}
        rtl={rtl}
        toggled={toggled}
        handleToggleSidebar={handleToggleSidebar}
      />





      <Routes>


        <Route exact path="/" element={<Main
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />




        <Route path="/report_activation/:id" element={<Report_Activation
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />


      <Route path="/report_Package/:id/:package_amt" element={<Report_Package
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />




        <Route path="/matching_report/:id/:packageamt" element={<MatchingReport
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="Matching Report"
        />} />


        <Route path="/staking_team/:id/:packageamt" element={<Staking_team
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="Matching Report"
        />} />



        <Route path="/report_withdrawal/:id" element={<Report_Withdrawal
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />

<Route path="/report_sender/:id" element={<Report_Sender
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />





        <Route path="/report/:id" element={<Report
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />








        <Route path="/my_team" element={<My_team
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />


        
<Route path="/my_direct_team" element={<My_Direct_Team
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="report"
        />} />

        <Route path="/package/:id/:user_id" element={<Package
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="package"
        />} />

        <Route path="/illuminating_tree/:id/:user_id" element={<Illuminating_tree
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="illuminating_tree"
        />} />


        <Route path="/rapid_tree/:id/:user_id" element={<Rapid_tree
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="illuminating_tree"
        />} />


        <Route path="/staking" element={<Staking
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="staking"
        />} />


        <Route path="/staking_detail/:user_id/:packageamt" element={<Staking_detail
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name="staking"
        />} />






        <Route exact path="/example" element={<Report
          image={image}
          toggled={toggled}
          collapsed={collapsed}
          rtl={rtl}
          handleToggleSidebar={handleToggleSidebar}
          handleCollapsedChange={handleCollapsedChange}
          handleRtlChange={handleRtlChange}
          handleImageChange={handleImageChange}
          name={name}
        />} />



        <Route path="*" element={Report} />


      </Routes>









    </div>
  );
}



export default Layout;

