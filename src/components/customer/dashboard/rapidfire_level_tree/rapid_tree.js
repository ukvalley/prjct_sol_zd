import React, { useState,useEffect } from 'react';
import {  Link, useNavigate, useParams  } from "react-router-dom";
import axios from 'axios';  
import logo from '../../../../assets1/soullogo1.png';
import { FaHeart, FaBars } from 'react-icons/fa';

import Loader from "../../../customer/layout/loader";
import Table from 'react-bootstrap/Table'
import Swal from 'sweetalert2';

import silver from '../../../../assets/red.png';
import bronze from '../../../../assets/bronze.png';


const Rapid_tree = ({
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

      const [fetch,setFetch] = useState(false);
    const [walletAddr, setWalletaddr] = useState();
    const [walletdata, setwalletdata] = useState();
  
  
   const [user,setUser] = useState(null);
   const navigate = useNavigate();
   const [loading, setLoading ] = useState();
   const [wallets, setWallets ] = useState();
   const [packages, setPackages ] = useState();
   const [userdata, setUserData ] = useState();
   const [package_data, setpackage_data ] = useState();

    const loggedInUser = localStorage.getItem("loggedInUser");

    const {id} =  useParams();
    const {user_id} =  useParams();

  
    let base_url = process.env.REACT_APP_BASE_URL

   


   useEffect(() => {

      const loggedInUser = localStorage.getItem("loggedInUser");
      if (loggedInUser) {
       //  console.log(loggedInUser);
        
      }
      else{
         navigate('/login');
      }

      if(fetch == false)
      {

     
      
      setLoading(true);
      

      fetch_dashboard_info(loggedInUser)

      
   }
    },[loading,fetch]);


    async  function fetch_dashboard_info(loggedInUser)
    {

        setLoading(true);
        
     await axios.get(base_url+'fetch_tree_binary/'+loggedInUser, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           
            setUserData(res.data);
            
            
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });




      await axios.get(base_url+'fetch_tree_binary/'+user_id, {headers:header})
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


    async function fetch_tree(user_id,package_amt)
    {
        setLoading(true);
        
        if(user_id == null || !user_id)
        {
            setLoading(false);
            Swal.fire({
                title: 'No Account Present!',
                text: 'No Account Present!',
                icon: 'error',
                confirmButtonText: 'Okay' })
        }
        else
        {

        
            
            await axios.get(base_url+'fetch_tree_binary/'+user_id, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           if(res.data != null)
           {
            setpackage_data(res.data);
           }
            
            setFetch(true)
            setLoading(false);
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });

        }
        

    }


    if(loading == true || loading == null )
   
    {
       return(
        <main className='fullh'>
        <Loader/>
     </main>
     )
       
       
    }

    else
    {

        if (!userdata.user_data && !package_data.wallets) 
        {
            return (<main className='fullh'>
            <Loader/>
         </main>)
        }

   else {

    
  
  return (
    <main className='fullh'>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)} >
        <FaBars />
      </div>

      <header1 className='header1'>
       
    </header1>




     
   




      <div className='block mt-4'>
        <div className='row mt-4'>

       

        <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="card1">


      <div className="card4">
      <div className="card-content">
        <div className="card-body cleartfix">
          <div className="media align-items-stretch">
            <div className="align-self-center">
              <i className="icon-speech warning font-large-2"></i>
            </div>
            <div className="media-body">
              <h3>{package_data.rapid_data.fname}</h3>
              <span> <h6> Left Count: {package_data.rapid_data.left_count}  |
                          Right Count : {package_data.rapid_data.right_count} 
              </h6>
              
              <h6> Left Silver: {package_data.rapid_data.left_business_25} $ |
                          Right Silver : {package_data.rapid_data.right_business_25} $
              </h6>
              
              <h6> Left Bronze: {package_data.rapid_data.left_business_100} $ |
                   Right Bronze : {package_data.rapid_data.right_business_100} $
              </h6>
              </span>
              
            </div>
            
          </div>
           
        </div>
      </div>
    </div>
   

   <div className="card-badge label-purchased ma-5">Binary Tree</div>
  
   <div className="card-label">
      
   <img className='tree_logo center' src={silver} ></img> <br></br>

      <div className="label-purchased"><i className="fa fa-check"></i> {package_data.rapid_data.self}</div>
   </div>
   <div className="tree-view">
      <div className="master-leaf"></div>
      <ul>
         <li className="leaf-1">
            <a className='text-white' onClick={() => fetch_tree(package_data.rapid_data.child1,id)} title={package_data.rapid_data.child1} >{package_data.rapid_data.child1 != null ? "**"+package_data.rapid_data.child1_data.email.slice(-4) : 'Blank' } <br />   <img className='tree_logo center' src={silver} ></img> <br></br>
</a>
            <ul>
                <li className="leaf-1">

                <a className='text-white' onClick={() => fetch_tree(package_data.rapid_data.child3,id)} title={package_data.rapid_data.child3} >{package_data.rapid_data.child3 != null ? "**"+package_data.rapid_data.child3_data.email.slice(-4) : 'Blank' } <br /> <img className='tree_logo center' src={silver} ></img> <br></br> </a>
                </li>
                <li className="leaf-1">
                <a className='text-white' onClick={() => fetch_tree(package_data.rapid_data.child4,id)} title={package_data.rapid_data.child4} >{package_data.rapid_data.child4 != null ? "**"+package_data.rapid_data.child4_data.email.slice(-4) : 'Blank' } <br /> <img className='tree_logo center' src={silver} ></img> <br></br> </a>
                </li>
                
            </ul>
         </li>
         <li className="leaf-1">
         
         
         
            <a className='text-white'
            onClick={() => fetch_tree(package_data.rapid_data.child2,id)}
            title={package_data.rapid_data.child2}  >
            {package_data.rapid_data.child2 != null ? 
             "**"+package_data.rapid_data.child2_data.email.slice(-4) : 'Blank' } 
            <br /> 
            <img className='tree_logo center' src={silver} ></img> <br></br></a>
            <ul>
            <li className="leaf-1">
                <a className='text-white' onClick={() => fetch_tree(package_data.rapid_data.child5,id)} title={package_data.rapid_data.child5} >{package_data.rapid_data.child5 != null ? "**"+package_data.rapid_data.child5_data.email.slice(-4) : 'Blank' } <br /> <img className='tree_logo center' src={silver} ></img> <br></br> </a>
                </li>
                <li className="leaf-1">
                <a className='text-white' onClick={() =>fetch_tree(package_data.rapid_data.child6,id)} title={package_data.rapid_data.child6} >{package_data.rapid_data.child6 != null ? "**"+package_data.rapid_data.child6_data.email.slice(-4) : 'Blank' } <br /> <img className='tree_logo center' src={silver} ></img> <br></br> </a>
                </li>
                
                
            </ul>
         </li>
         
      </ul>
      
   </div>

   <div onClick={() =>fetch_dashboard_info(package_data.rapid_data.self)} className='btn btn-primary ma-5'>Go to Root</div>
   <div onClick={() =>fetch_tree(package_data.rapid_data.sponcer,id)} className='btn btn-primary ma-5'>Go to UP</div>

</div>
</div>

 
      </div>

      




      

      </div>


     


      
    
    </main>

    
  );
};
    }
}

export default Rapid_tree;