import React, { useState,useEffect } from 'react';
import {  Link, useNavigate, useParams  } from "react-router-dom";
import axios from 'axios';  
import logo from '../../../../assets1/soullogo1.png';
import leg1 from '../../../../assets1/leg1.png';
import leg2 from '../../../../assets1/leg2.png';
import leg3 from '../../../../assets1/leg3.png';
import Loader from "../../../customer/layout/loader";
import { FaHeart, FaBars } from 'react-icons/fa';
import Table from 'react-bootstrap/Table'

const Package = ({
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


        
     await axios.get('https://raisingfinanance.com/soulignite/api/fetch_dashboard_information/'+loggedInUser, {headers:header})
      .then(res => { 

       //  console.log(res.data)
           
            setUserData(res.data);
            
            
         })    
      .catch(error => {
              console.error('There was an error!', error);
      });




      await axios.get('https://raisingfinanance.com/soulignite/api/fetch_package_information/'+user_id+'/'+id, {headers:header})
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
          </main>
          )
       
       
    }

    else
    {

        if (!userdata.wallets && !package_data.wallets) 
        {
            return (<Loader/>)
        }

   else {

    
  
  return (
    <main className='fullh'>
      <div className="btn-toggle" onClick={() => handleToggleSidebar(true)} >
        <FaBars />
      </div>

      <header>
        <div className='row mb10'>
          <img className='logo_dashboard' src={logo} alt='import'></img>
          <h4 className='text-gradient text-center-wall'>{userdata.user_data.email}</h4>
        </div>

        <div className='row mb10'>
          <h4 className='text-gradient text-center-wall'>Package : {id}</h4>
        </div>
      <div className="container bootstrap snippets bootdey">
    <div className="row">
        

        <div className="col-md-4 col-sm-6 col-xs-12">
        	<div className="panel panel-dark panel-colorful">
        		<div className="panel-body text-center">
        			<p className="text-uppercase mar-btm text-sm">ILLUMINATING MATRIX</p>
        			<img className='widget_image' src={leg3}></img>
        			<hr/>
             
        			<p className="h2 text-thin text-gradient">$ {package_data.wallets['three_leg']}</p>
        		</div>
        	</div>
        </div>

        <div className="col-md-4 col-sm-6 col-xs-12">
        	<div className="panel panel-dark panel-colorful">
        		<div className="panel-body text-center">
        			<p className="text-uppercase mar-btm text-sm">RAPID FIRE MATRIX</p>
            <img className='widget_image' src={leg2}></img>
        			<hr/>
        			<p className="h2 text-thin text-gradient">$ {package_data.wallets.two_leg}</p>
        		</div>
        	</div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
        	<div className="panel panel-dark panel-colorful">
        		<div className="panel-body text-center">
        			<p className="text-uppercase mar-btm text-sm">LIGHTENING MATRIX</p>
            <img className='widget_image' src={leg1}></img>
        			<hr/>
        			<p className="h2 text-thin text-gradient">$ {package_data.wallets.single_leg}</p>
        		</div>
        	</div>
        </div>        

      </div>
    </div>

    </header>




     
   




      <div className='block'>
        <div className='row'>

       

        <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="card1">
   

   <div className="card-badge label-purchased">Illuminating Matrix</div>
   <div className="card-heading-1 text-white">$ {id}</div>
   <div className="card-label">
      
      <div className="label-purchased"><i className="fa fa-check"></i> {package_data.illu_tree_data.self}</div>
   </div>
   <div className="tree-view">
      <div className="master-leaf"></div>
      <ul>
         <li className="leaf-1">
            <a title={package_data.illu_tree_data.child1} >{package_data.illu_tree_data.child1 != null ? "***"+package_data.illu_tree_data.child1_data.user_id.slice(-6) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
            
         </li>
         <li className="leaf-1">
         
            <a title={package_data.illu_tree_data.child2} > {package_data.illu_tree_data.child2 != null ? "***"+package_data.illu_tree_data.child2_data.user_id.slice(-6) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
        
         </li>
         <li className="leaf-1">
           <a title={package_data.illu_tree_data.child3} >{package_data.illu_tree_data.child3 != null ? "***"+package_data.illu_tree_data.child3_data.user_id.slice(-6) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
           
         </li>
      </ul>
   </div>
   <div className="card-stats text-gradient">
      <div className="stats-1"> <Link to={'/dashboard/illuminating_tree/'+id+'/'+package_data.illu_tree_data.self}>View Detaild Tree:</Link>  <span>&nbsp;</span></div> 
      <div className="stats-2">&nbsp; Reinvest: <span>0 </span></div>
   </div>
</div>
</div>

 
      </div>

      

      </div>

      <div className="card-badge label-purchased">Illuminating Transaction</div>
      <Table striped bordered hover variant="dark">
      
  <thead>
    <tr>
      <th>#</th>
      <th>Sender Name</th>
      <th>Level</th>
      <th>Amount</th>
    </tr>
  </thead>
  <tbody>
  {package_data.illuminating_transaction.map((illuminating,index) => (  
  
    <tr>
      <td>{index+1}</td>
      <td>{illuminating.sender}</td>
      <td>{illuminating.level}</td>
      <td>{illuminating.amount}</td>
    </tr>
  ))}
    
  </tbody>

  
</Table>


<div className="card-badge label-purchased">Illuminating Direct Transaction</div>
      <Table striped bordered hover variant="dark">
      
  <thead>
    <tr>
      <th>#</th>
      <th>Sender Name</th>
      <th>Level</th>
      <th>Amount</th>

      <th>Hash</th>
    </tr>
  </thead>
  <tbody>
  {package_data.illuminating_direct_transaction.map((illuminating_direct,index) => (  
  
    <tr>
      <td>{index+1}</td>
      <td>{illuminating_direct.sender}</td>
      <td>{illuminating_direct.level}</td>
      <td>{illuminating_direct.amount}</td>
      <td>{illuminating_direct.hash}</td>

    </tr>
  ))}
    
  </tbody>

  
</Table>





<div className='block'>
        <div className='row'>

       

        <div className="col-md-12 col-sm-12 col-xs-12">
      <div className="card1">
   

   <div className="card-badge label-purchased">Rapid Fire Matrix</div>
   <div className="card-heading-1 text-white">{id}</div>
   <div className="card-label">
      
      <div className="label-purchased"><i className="fa fa-check"></i> {package_data.illu_tree_data.self}</div>
   </div>
   <div className="tree-view">
      <div className="master-leaf"></div>
      <ul>
         <li className="leaf-1">
            <a title={package_data.rapid_tree_data.child1} >{package_data.rapid_tree_data.child1 != null ? "***"+package_data.rapid_tree_data.child1_data.user_id.slice(-6) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
            
         </li>
         <li className="leaf-1">
         
            <a title={package_data.rapid_tree_data.child2} > {package_data.rapid_tree_data.child2 != null ? "***"+package_data.rapid_tree_data.child2_data.user_id.slice(-6) : 'Blank' } <br /> <i className="icon-hexagon"></i></a>
        
         </li>
         
      </ul>
   </div>
   <div className="card-stats text-gradient">
      <div className="stats-1"><Link to={'/dashboard/rapid_tree/'+id+'/'+package_data.rapid_tree_data.self}>View Detaild Tree</Link> <span> &nbsp;|</span></div> 
      <div className="stats-2">&nbsp; Reinvest: <span> {package_data.rapid_reentry} </span></div>
   </div>
</div>
</div>

 
      </div>

      

      </div>

      <div className="card-badge label-purchased">Rapid Fire Transaction</div>
      <Table striped bordered hover variant="dark">
      
  <thead>
    <tr>
      <th>#</th>
      <th>Sender Name</th>
      <th>Level</th>
      <th>Amount</th>
      <th>Hash</th>
    </tr>
  </thead>
  <tbody>
  {package_data.rapid_transaction.map((rapid,index) => (  
  
    <tr>
      <td>{index+1}</td>
      <td>{rapid.sender}</td>
      <td>{rapid.level}</td>
      <td>{rapid.amount}</td>
      <td>{rapid.hash}</td>
    </tr>
  ))}
    
  </tbody>
</Table>


<div className="card-badge label-purchased">LIGHTENING Transaction</div>

<div className="card-badge label-purchased">Single Leg Transaction</div>
      <Table striped bordered hover variant="dark">
      
  <thead>
    <tr>
      <th>#</th>
      <th>Sender Name</th>
      <th>Level</th>
      <th>Amount</th>
      <th>Hash</th>

    </tr>
  </thead>
  <tbody>
  {package_data.singleleg_transaction.map((singleleg,index) => (  
  
    <tr>
      <td>{index+1}</td>
      <td>{singleleg.sender}</td>
      <td>{singleleg.level}</td>
      <td>{singleleg.amount}</td>
      <td>{singleleg.hash}</td>

    </tr>
  ))}
    
  </tbody>
</Table>

<div className="card-badge label-purchased">Generation Transaction</div>
      <Table striped bordered hover variant="dark">
      
  <thead>
    <tr>
      <th>#</th>
      <th>Sender Name</th>
      <th>Level</th>
      <th>Amount</th>
      <th>Hash</th>
    </tr>
  </thead>
  <tbody>
  {package_data.generation_transaction.map((generation,index) => (  
  
    <tr>
      <td>{index+1}</td>
      <td>{generation.sender}</td>
      <td>{generation.level}</td>
      <td>{generation.amount}</td>
      <td>{generation.hash}</td>
    </tr>
  ))}
    
  </tbody>
</Table>
    
    </main>

    
  );
};
    }
}

export default Package;