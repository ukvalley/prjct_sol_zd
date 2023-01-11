import React, { useState, useEffect } from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';
import axios from 'axios';
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../customer/layout/loader";
import logo from '../../../../assets1/soullogo1.png';




const My_Direct_Team = ({
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




  }, [loggedInUser]);




  async function fetch_reports(loggedInUser) {





    await axios.get(base_url + 'dashboard_information/' + loggedInUser, { headers: header })
      .then(res => {

        // console.log(res.data)

        setUserData(res.data);


      })
      .catch(error => {
        console.error('There was an error!', error);
      });




    await axios.get(base_url + 'my_team_direct/' + loggedInUser, { headers: header })
      .then(res => {
        
        console.log(res.data)

        let sort_data = res.data;


        setpackage_data(sort_data);
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


        <div className="card-badge label-purchased">{loggedInUser} Team</div>


        <div className="table-wrapper">
          <div className="table-scroll">


            <Table className='table table-bordered'>

              <thead style={{ background: "#5695e3b3" }}>
                <tr>
                  <th>#</th>
                  <th>Account Address</th>

                  <th>Level</th>
                  <th>Contract Activation</th>
                  <th>Team Count</th>
                  <th>Activation 50$</th>
                  <th>Activation 100$</th>

                </tr>
              </thead>
              <tbody>
                {package_data.map((data, index) => (

                  <tr>
                    <td>{index + 1}</td>
                    <td>{data.sender}</td>
                   
                    <td>{data.level}</td>
                    <td>{data.date}</td>
                    <td>{data.team_count}</td>
                    <td>
                      {data.is_active == "active" ?
                      <>Active</>
                    : <>Inactive</>}
                    </td>
                    <td>
                      {data.is_active_100 == "active" ?
                       <>Active</>
                       : <>Inactive</>}
                    </td>

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

export default My_Direct_Team;