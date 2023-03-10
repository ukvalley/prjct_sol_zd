import React, { useState, useEffect } from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../customer/layout/loader";
import logo from '../../../../assets1/soullogo1.png';

import './report.css';
import { FaEye, FaFileContract } from 'react-icons/fa';
import { AiOutlineFileProtect, AiOutlineNumber } from "react-icons/ai";
import { BiMoney } from 'react-icons/bi';
import { HiShieldExclamation, HiClock } from "react-icons/hi";


const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="entry-summary">
      {isReadMore ? text.slice(0, 15) : text}
      <span onClick={toggleReadMore} className="read-or-hide">
        {isReadMore ? "..." : " show less"}
      </span>
    </p>
  );
};


const Report_Sender = ({
  collapsed,
  rtl,
  image,
  handleToggleSidebar,
  handleCollapsedChange,
  handleRtlChange,
  handleImageChange,
  name,
}) => {

  const header = {
    "Access-Control-Allow-Origin": "*"
  }
  const [loading, setLoading] = useState();

  const [fetch, setFetch] = useState(false);
  const [walletAddr, setWalletaddr] = useState();
  const [userdata, setUserData] = useState();
  const [package_data, setpackage_data] = useState();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const { id } = useParams();
  const navigate = useNavigate();
  const [Popdata, SetPopdata] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const [hash, Sethash] = useState();
  const [amount, Setamount] = useState();
  const [date, Setdate] = useState();

  let base_url = process.env.REACT_APP_BASE_URL





  useEffect(() => {

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      //  console.log(loggedInUser);

    }
    else {
      navigate('/login');
    }





    setLoading(true);

    // console.log(id)
    fetch_reports(loggedInUser)




  }, [id]);




  async function fetch_reports(loggedInUser) {





    await axios.get(base_url + 'dashboard_information/' + loggedInUser, { headers: header })
      .then(res => {

        // console.log(res.data)

        setUserData(res.data);


      })
      .catch(error => {
        console.error('There was an error!', error);
      });




    await axios.get(base_url + 'fetch_reports_sender/' + id + '/' + loggedInUser, { headers: header })
      .then(res => {

        //  console.log(res.data)

        setpackage_data(res.data);
        setFetch(true)
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }

  async function opan_pop(transaction) {
    alert(transaction);
    SetPopdata(id);

  }

  const handleChoosedRow = (transaction) => {
    console.log(transaction);
    Sethash(transaction.hash);
    Setamount(transaction.amount);
    Setdate(transaction.date);
    


  };

  const handleOnClick = () => {
    Sethash();
    Setamount();

  }




  if (loading == true || loading == null) {
    return (
      <main className='fullh'>
        <Loader />
      </main>)


  }


  return (
    <main className=''>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(false)}>
        <FaBars />
      </div>

      <div className="container-fluid mt-5">
        {
          amount != null
            ?

            <div className="popup">
              <h3>{<HiClock />} {date}</h3><br />
              <a className="close" onClick={handleOnClick}>
                ??
              </a>
              <div className="content">
                <div className="d-flex flex-row mt-2 mb-3 seprate_pop">
                  <div className="icon_for_popup" style={{ fontSize: "17px" }}>
                    <i>{<BiMoney />}</i>
                  </div>
                  <div className="mb-3">
                    <h2>Amount</h2>
                    <p className="address mb-0"><b>{amount}$</b></p>
                  </div>
                </div>
                <div className="d-flex flex-row mt-2 mb-3 seprate_pop">
                  <div className="icon_for_popup" style={{ fontSize: "17px" }}>
                    <i>{<FaFileContract />}</i>
                  </div>
                  <div className="mb-3">
                    <h6 style={{fontSize:"8px"}}>Contract Address</h6>
                    <p style={{fontSize:"8px"}} className="mb-0"><b>6ikzhQNyAGjYS1JqqZHRcoDDrSQPkLQbG9PEmT7RcPAT</b></p>
                  </div>
                </div>
                <div className="d-flex flex-row mt-2 mb-3 seprate_pop">
                  <div className="icon_for_popup" style={{ fontSize: "17px" }}>
                    <i>{<AiOutlineNumber />}</i>
                  </div>
                  <div className="mb-3">
                    <h2>Hash</h2>
                    <p className="address mb-0"><b>{hash}</b></p>
                  </div>
                </div>
                <div className="d-flex flex-row mt-2 mb-3">
                  <div className="icon_for_popup" style={{ fontSize: "17px" }}>
                    <i>{<HiShieldExclamation />}</i>
                  </div>
                  <div className="mb-3">
                    <h2>Reason</h2>
                    <p className="address mb-0"><b>Stake Contract</b></p>
                  </div>
                </div>
              </div>
            </div>




            : <></>
        }
        <section>

          <div className="mt-5">
            <div className="mb-4">
              <h6>{id} Transaction</h6>
              {package_data.transaction.map((transaction, index) => (
                <div className="card-report" data-item={transaction} onClick={() => handleChoosedRow(transaction)}>
                  <div className="card-body">
                    <div className="d-flex justify-content-between p-md-1">
                      <div className="d-flex flex-row">
                        <div className="align-self-center-icon mt-1" style={{ fontSize: "25px" }}>
                          <i>{<AiOutlineFileProtect />}</i>
                        </div>
                        <div>
                          <h5>Contract Account</h5>
                          <p style={{fontSize:"8px"}} className=" mb-0"><b>{transaction.sender}</b></p>
                        </div>
                      </div>
                      <div className="align-self-center">
                        <h3 className="h3 mb-0" style={{ color: "green" }}>{transaction.amount}$</h3>
                      </div>

                    </div>
                    <div className="footer">
                      {transaction.date}
                      <span className="footer-right float-right"><b>Stake Contract</b></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

      </div >

    </main >


  );
};

export default Report_Sender;