import React from 'react';
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import logo from '../../../components/customer/dashboard/my_css/project_images/solzed.png';

import { FaTachometerAlt, FaGem, FaRegLaughWink, FaPiggyBank, FaUserTie, FaFileInvoiceDollar } from 'react-icons/fa';

import { Link, useNavigate } from "react-router-dom";
require('../dashboard/solzed.css');
const Aside = ({ image, collapsed, rtl, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  const loggedInUser = localStorage.getItem("loggedInUser");


  function logout() {
    localStorage.removeItem("loggedInUser");
    navigate('/login');
  }

  return (
    <div id="header1">

      <ProSidebar

        rtl={rtl}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div className='side_logo'
            style={{
              padding: '24px',
              textTransform: 'uppercase',
              fontWeight: 'bold',
              fontSize: 14,
              letterSpacing: '1px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',



            }}
          >
            <img className="sidebar_logo" src={logo}></img>
          </div>
        </SidebarHeader>



        <SidebarContent style={{ background: "#fff" }}>

          <Menu iconShape="circle">
            <MenuItem className='side_text'
              icon={<FaTachometerAlt />}
              style={{ background: "#fff" }}
            // suffix={<span className="badge red">Refresh</span>}
            >
              <span>Dashboard</span>
              <Link to="/dashboard" />
            </MenuItem>


          </Menu>

          <Menu iconShape="circle" className='side_text'>


            <SubMenu
              suffix={<span className="badge yellow">6</span>}
              title='Report 50$'
              icon={<FaFileInvoiceDollar />}
              style={{ background: "white" }}
            >
              <MenuItem>Direct Income <Link to="/dashboard/report_Package/direct/50" /> </MenuItem>
              <MenuItem>Level Income <Link to="/dashboard/report_Package/level/50" /> </MenuItem>
              <MenuItem>Direct Working Income  <Link to="/dashboard/report_Package/direct_working/50" /> </MenuItem>
              <MenuItem>Generation Income<Link to="/dashboard/report_Package/generation_income/50" /> </MenuItem>
              <MenuItem>Leadership Bonus  <Link to="/dashboard/report_Package/leadership_income/50" /> </MenuItem>
              <MenuItem>Royalty Income  <Link to="/dashboard/report_Package/royalty_income/50" /> </MenuItem>
             
            </SubMenu>


            <SubMenu
              suffix={<span className="badge yellow">6</span>}
              title='Report 100$'
              icon={<FaFileInvoiceDollar />}
              style={{ background: "white" }}
            >
              <MenuItem>Direct Income <Link to="/dashboard/report_Package/direct/100" /> </MenuItem>
              <MenuItem>Level Income <Link to="/dashboard/report_Package/level/100" /> </MenuItem>
              <MenuItem>Direct Working Income  <Link to="/dashboard/report_Package/direct_working/100" /> </MenuItem>
              <MenuItem>Generation Income<Link to="/dashboard/report_Package/generation_income/100" /> </MenuItem>
              <MenuItem>Leadership Bonus  <Link to="/dashboard/report_Package/leadership_income/100" /> </MenuItem>
              <MenuItem>Royalty Income  <Link to="/dashboard/report_Package/royalty_income/100" /> </MenuItem>
              

            </SubMenu>

            <SubMenu
              suffix={<span className="badge yellow">6</span>}
              title='Common Reports'
              icon={<FaFileInvoiceDollar />}
              style={{ background: "white" }}
            >

              <MenuItem >Activation History  <Link to="/dashboard/report_activation/activate_package/" /> </MenuItem>
              <MenuItem>Withdrawal History <Link to="/dashboard/report_activation/withdrawal/" /> </MenuItem>
              <MenuItem>Generation Wallet Recharge <Link to="/dashboard/report_activation/generation_purchase/" /> </MenuItem>
              <MenuItem>Generation Wallet Credits <Link to="/dashboard/report_activation/generation_credit/" /> </MenuItem>
              <MenuItem>Generation Deduct <Link to="/dashboard/report_sender/generation_deduct/" /> </MenuItem>
              </SubMenu>

              
            <SubMenu
              suffix={<span className="badge yellow">2</span>}
              title='Team'
              icon={<FaUserTie />}
            >

              <MenuItem>Downline Team <Link to="/dashboard/my_team" /> </MenuItem>
              <MenuItem>Direct Team <Link to="/dashboard/my_direct_team" /> </MenuItem>
              
            </SubMenu>


            <MenuItem icon={<FaGem />} onClick={logout}> Logout</MenuItem>
          </Menu>



        </SidebarContent>


      </ProSidebar>

    </div >
  );
};

export default Aside;