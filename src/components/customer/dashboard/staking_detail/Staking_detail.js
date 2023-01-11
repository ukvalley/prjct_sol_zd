import React, { useState,useEffect } from 'react';
import { FaHeart, FaBars } from 'react-icons/fa';
import axios from 'axios';  
import {  Link, useNavigate, useParams  } from "react-router-dom";
import Loader from "../../../customer/layout/loader";
import logo from '../../../../assets1/soullogo1.png';
import Swal from 'sweetalert2';




const Staking_details = ({
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
  const [fetch,setFetch] = useState(false);
  const [walletAddr, setWalletaddr] = useState();
  const [userdata, setUserData ] = useState();
  const [package_data, setpackage_data ] = useState();
  const loggedInUser = localStorage.getItem("loggedInUser");
  const {id} =  useParams();
  const navigate = useNavigate();

  let base_url = process.env.REACT_APP_BASE_URL

  const {user_id} =  useParams();
  const {packageamt} =  useParams();



  useEffect(() => {

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
     //  console.log(loggedInUser);
      
    }
    else{
       navigate('/login');
    }


   
    
    setLoading(true);
    
   // console.log(id)
    fetch_reports(user_id)

    
 

  },[id,packageamt]);

  


  async  function fetch_reports(loggedInUser)
    {

        

        
      await axios.get(base_url+'dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

           
            setUserData(res.data);
            
            
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });




      await axios.get(base_url+'staking_details/'+loggedInUser+'/'+packageamt, {headers:header})
      .then(res => { 

           
            setpackage_data(res.data);
            setFetch(true)

                
                setLoading(false);


            
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

    }


    if(loading == true || loading == null)
   
    {
       return(
          <main className='fullh'>
             <Loader/>
          </main>          )
       
       
    }

    if((typeof package_data.roi === 'undefined'))
    {
        return(
            <main className='fullh'>

<div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>


<div className="row">


<div className="col-xl-6 col-md-12 mt-4">
<div  className='card3'>
      <div className="card-content">
        <div className="card-body cleartfix">
          <div className="media align-items-stretch">
            <div className="align-self-center">
              <i className="icon-speech warning font-large-2"></i>
            </div>
            <div className="media-body">
              <h6>Staking Package</h6>
              <span> <h6> Amount: {packageamt} $ <br></br>You Don't Have Active Package
              </h6></span>
              
            </div>

           <Link to="/dashboard/staking">  <button className="btn btn-dark mt-5">Purchase Now</button> </Link>
            
          </div>




         

        </div>
      </div>
    </div>
    </div>
    </div>


            </main>
        )
    }

  
  return (
    <main className='fullh'>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)}>
        <FaBars />
      </div>




        <div className="container last-block  mb-5">
<section id="minimal-statistics mt20">
<p className="text-center mb-3 focus_bg mt-4">Staking Details {packageamt} $</p>


<div className="row">


<div className="col-xl-6 col-md-12 mt-4">
<div  className='card3'>
      <div className="card-content">
        <div className="card-body cleartfix">
          <div className="media align-items-stretch">
            <div className="align-self-center">
              <i className="icon-speech warning font-large-2"></i>
            </div>
            <div className="media-body">
              <h6>Staking Package</h6>
              <span> <h3> Amount: {packageamt} $ <br></br>
                       <span> <h6>  Dividend: {package_data.staking_roi.amount} $ Daily for {package_data.staking_roi.level} Months </h6> </span>
              </h3></span>
              
            </div>

             <button className="btn btn-dark mt-5">Signature : {package_data.staking_details.hash}</button> 
            
          </div>




         

        </div>
      </div>
    </div>
    </div>



    <div className="col-xl-6 col-md-12 mt-4">
        <div  className='card2'>
      <div className="card-content">
        <div className="card-body cleartfix">
          <div className="media align-items-stretch">
            <div className="align-self-center">
              <i className="icon-speech warning font-large-2"></i>
            </div>
            <div className="media-body">
              <h6>Dividand</h6>
              <span> <h3> Amount: {package_data.roi} $ <br></br>
                       <span> <h6> Started on: {package_data.staking_details.date} till {package_data.staking_roi.level} Months </h6> </span>
              </h3></span>
              
            </div>

             <button className="btn btn-dark mt-5">Earn Profit Every Second</button> 
            
          </div>




         

        </div>
      </div>
    </div>
</div>



</div>
    






</section>

</div>


    
    </main>

    
  );
};

export default Staking_details;