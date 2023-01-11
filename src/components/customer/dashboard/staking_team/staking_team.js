import React, { useState,useEffect } from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';
import axios from 'axios';  
import Table from 'react-bootstrap/Table'
import {  useNavigate, useParams  } from "react-router-dom";
import Loader from "../../../customer/layout/loader";
import logo from '../../../../assets1/soullogo1.png';




const Staking_team = ({
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
  const [loading, setLoading ] = useState();
  const [transtype, setTranstype ] = useState();
  const [fetch,setFetch] = useState(false);
  const [walletAddr, setWalletaddr] = useState();
  const [userdata, setUserData ] = useState();
  const [package_data, setpackage_data ] = useState();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const {id} =  useParams();
  const {packageamt} =  useParams();
  const navigate = useNavigate();

  let base_url = process.env.REACT_APP_BASE_URL



  useEffect(() => {

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
     //  console.log(loggedInUser);
      
    }
    else{
       navigate('/login');
    }


   if(id == "GENERATION")
   {
     setTranstype("Team Matching Dividand")
   }
   else if(id == "matching_entry" && packageamt == "100")
   {
    setTranstype("Bronze Matching")
   }
   else if(id == "flush_entry" && packageamt == "25")
   {
    setTranstype("Silver Capping")
   }
   else if(id == "flush_entry" && packageamt == "100")
   {
    setTranstype("Bronze Capping")
   }
   else if(id == "gold_deduction" && packageamt == "25")
   {
    setTranstype("Gold Deduction")
   }
   else if(id == "diamond_deduction" && packageamt == "100")
   {
    setTranstype("Diamond Deduction")
   }
   else
   {
    setTranstype("")
   }

    

   
    
    setLoading(true);
    
   // console.log(id)
    fetch_reports(loggedInUser)

    
 

  },[id,packageamt]);

  


  async  function fetch_reports(loggedInUser)
    {

  


        
      await axios.get(base_url+'dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

        // console.log(res.data)
           
            setUserData(res.data);
            
            
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });




      await axios.get(base_url+'fetch_reports/'+id+'/'+loggedInUser, {headers:header})
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


    if(loading == true || loading == null )
   
    {
       return(
          <main className='fullh'>
             <Loader/>
          </main>          )
       
       
    }

  
  return (
    <main className='fullh'>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>

      <header>
      <div className='row mb10'>
        </div>


      <div className="card-badge label-purchased">{transtype} Report</div>
      <div className="table-wrapper">
  <div className="table-scroll">

      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>#</th>
      <th>Sender Name</th>
      <th>Amount Daily</th>
      <th>Level</th>
      <th>Package</th>
      <th>Reason</th>
      <th>Started Date</th>
      

    </tr>
  </thead>
  <tbody>
  {package_data.transaction.map((transaction,index) => (  
  
    <tr>
      <td>{index+1}</td>
      <td>{transaction.sender}</td>
      <td>{transaction.amount}</td>
      <th>{transaction.level}</th>
      <th>{transaction.package}</th>
      <th>{transtype}</th>
      <td>{transaction.date}</td>
      

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

export default Staking_team;