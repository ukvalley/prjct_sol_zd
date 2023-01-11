
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Loader from "../../customer/layout/loader";
import Swal from 'sweetalert2';
import logo from '../../../assets/callistoworldlogo.png';
import '../../../App.css';



import { useState, useEffect } from 'react';
import { Connection } from '@solana/web3.js';
import { Provider } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';


import img_11 from '../../../components/customer/dashboard/my_css/project_images/solzed.png';





/* create an account  */
const opts = {
  preflightCommitment: "processed"
}







function Login() {


  const wallet = useWallet();
  const [walletAddr, setWalletaddr] = useState();

  const navigate = useNavigate();
  const [loading, setLoading] = useState(null);
  const header = { "Access-Control-Allow-Origin": "*" }

  const [siteSetting, setSiteSetting] = useState(null);

  let base_url = process.env.REACT_APP_BASE_URL


  useEffect(() => {
    if (siteSetting == null) {
      fetchSetting();
    }
  }, [siteSetting]);




  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.mainnet-beta.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);


    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,

    );
    setWalletaddr(wallet.publicKey.toBase58());
    // console.log(wallet.publicKey.toBase58());

    return provider;
  }



  // end of useeffects

  async function fetchSetting() {
    setLoading(true);
    axios.get(base_url + `show/1`)
      .then(res => {
        const animals = res.data;
        setSiteSetting(res.data);
        setLoading(false);

      });

  }

  function handleSubmit(e) {
    e.preventDefault()
    setLoading(true);
    // console.log(e);
    const { idnumber } = e.target.elements
    //  console.log({idnumber: idnumber.value })

    axios.get(base_url + 'fetch_user_data/' + idnumber.value, { headers: header })
      .then(res => {

        if (res.data.email != null) {
          //  console.log(res.data);
          localStorage.clear();
          localStorage.setItem('loggedInUser', res.data.email);
          navigate('/dashboard');
          //  console.log(res.data); 
        }
        else {
          //  console.log('userid not present');
          Swal.fire({
            title: 'Error!',
            text: "Account Not Present",
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        }
      })
      .catch(error => {
        //   console.error('There was an error!', error);
        Swal.fire({
          title: 'Error!',
          text: "Something Went Wrong",
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      });

    setLoading(false);
  };

  async function login_user_with_wallet() {
    const provider = await getProvider();




    setLoading(true);
    const wallet_addr = wallet.publicKey.toBase58();
    const url = base_url + "fetch_user_data_email/" + wallet_addr;
    //  console.log(url);
    axios.get(base_url + 'fetch_user_data_email/' + wallet_addr, { headers: header })
      .then(res => {

        if (res.data.email != null) {
          if (res.data.email != null) {
            //   console.log(res.data);
            localStorage.clear();
            localStorage.setItem('loggedInUser', res.data.email);
            navigate('/Dashboard');

          }
          else {
            // console.log(res.data);
            console.log('Account not present');
            Swal.fire({
              title: 'Error!',
              text: "Account Not Present",
              icon: 'error',
              confirmButtonText: 'Okay'
            })

          }

          //  console.log(res.data); 
        }
        else {
          // console.log('userid not present');
          Swal.fire({
            title: 'Error!',
            text: "Account Not Present",
            icon: 'error',
            confirmButtonText: 'Okay'
          })
        }
      })
      .catch(error => {
        //  console.error('There was an error!', error);
        Swal.fire({
          title: 'Error!',
          text: "Something Went Wrong",
          icon: 'error',
          confirmButtonText: 'Okay'
        })
      });


    setLoading(false);
  }






  if (loading == true) {
    return (
      <Loader />
    )
  }
  else {




    return (
      <div className="container">

        <div className="row d-flex justify-content-center mt20">
          <div className="col-12 col-md-8  col-xl-5">
            <div className="background_theme login_card py-3 px-2 p-3 mb-5">
              <div className="row mx-auto">

                <div className="col-12 photo">
                  <img className='img_logo pulse' src={img_11} alt='import' style={{ width: "200px" }}></img>
                </div>
              </div>
              <p className="text-center mb-3 mt-2 yello-bg">Sign in through Wallet OR Enter ID</p>

              <div className="division">
                <div className="row">

                  <div className="col-12"><span className="bg-white">Wallet Address : {walletAddr}</span></div>

                </div>
              </div>
              <form className="myform" onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    id='idnumber'
                    required={true}
                    className="form-control"
                    placeholder="Enter ID Number OR Address" />
                </div>

                <div className="row">



                </div>
                <div className="form-group mt-3">
                  <button type="submit" className="btn btn-primary btn-lg full">
                    <small><i className="fa fa-lock" />  Login</small>
                  </button> </div>
              </form>



              <div className='row mts30'>
                {!wallet.connected
                  ?
                  <WalletMultiButton />

                  : <button type="button" onClick={login_user_with_wallet} className="btn btn-secondary btn-lg full">
                    <small> <i className="fa fa-caret-right" /> Login With Wallet</small>
                  </button>
                }
              </div>
              <br />
              <div className='row mts30'>
                <Link to="/register"> <p>Not Registered yet, Login here</p> </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    );


  }
}




export default Login;





