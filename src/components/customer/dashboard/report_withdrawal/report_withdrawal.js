import React, { useState, useEffect } from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../customer/layout/loader";
import logo from '../../../../assets1/soullogo1.png';




const Report_Withdrawal = ({
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




    await axios.get(base_url + 'fetch_reports/' + id + '/' + loggedInUser, { headers: header })
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


  if (loading == true || loading == null) {
    return (
      <main className='fullh'>
        <Loader />
      </main>)


  }


  return (
    <main className='fullh'>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>

      <header>
        <div className='row mb10'>
        </div>


        <div className="card-badge label-purchased">Withdrawal Report</div>

        <div className="table-wrapper">
          <div className="table-scroll">

            <Table className='table table-bordered'>

              <thead style={{ background: "#5695e3b3" }}>
                <tr>
                  <th>#</th>
                  <th>Contract Address</th>
                  <th>Withdrawal Amount</th>
                  <th>Reason</th>
                  <th>Date</th>
                  <th>hash</th>

                </tr>
              </thead>
              <tbody>
                {package_data.transaction.map((transaction, index) => (

                  <tr>
                    <td>{index + 1}</td>
                    <td>9vTD1yjuozG99axQKNZ3pMQbWZFQh1YQdwq9nVCdTkap</td>
                    <td>{transaction.amount}</td>
                    <td>Withdrawal</td>
                    <td>{transaction.date}</td>
                    <td>{transaction.utr}</td>

                  </tr>
                ))}

              </tbody>


            </Table>

          </div>
        </div>


      </header>


    </main>


  );
};

export default Report_Withdrawal;