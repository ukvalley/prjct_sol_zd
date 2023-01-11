
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import '../dashboard/my_css/Front.css';




import img_11 from '../dashboard/my_css/project_images/solzed.png';
import about from '../dashboard/my_css/project_images/about.jpg';
import what_do from '../dashboard/my_css/project_images/what_do.jpg';
import home_image from '../dashboard/my_css/project_images/blockchain.png';

import math_logo from '../dashboard/my_css/project_images/math.png';
import phantom from '../dashboard/my_css/project_images/phantom.png';
import flarelogo from '../dashboard/my_css/project_images/flarelogo.png';
import income from '../dashboard/my_css/project_images/income.jpg';
import vission from '../dashboard/my_css/project_images/1.png';
import mission from '../dashboard/my_css/project_images/2.png';

import azam from '../../../assets1/azam.jpg'
import solzed_dist from '../../../assets1/solzed_dist.png'

import mukesh from '../../../assets1/mukesh.jpg'
import donutchart from '../../../assets1/donutchart.png'

import icon2 from '../dashboard/my_css/project_images/income_list/2.png';
import icon3 from '../dashboard/my_css/project_images/income_list/3.png';
import icon4 from '../dashboard/my_css/project_images/income_list/4.png';
import icon5 from '../dashboard/my_css/project_images/income_list/5.png';
import icon6 from '../dashboard/my_css/project_images/income_list/6.png';


import Security from '../dashboard/my_css/project_images/Security.png';
import scrolling from '../dashboard/my_css/project_images/scrolling.jpg';
import { BsFacebook, BsInstagram, BsTelegram,BsYoutube,BsLinkedin, BsTwitter } from 'react-icons/bs';
import { AiOutlineMobile, AiOutlineMail, AiFillTwitterSquare, AiTwotoneStar } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { FaBirthdayCake, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa';
import { MdAddIcCall, MdOutlineEmail } from 'react-icons/md';
import { ImLocation2 } from 'react-icons/im';
import 'bootstrap/dist/css/bootstrap.min.css';

import Loder from '../dashboard/Loder/Loder';
const delay = ms => new Promise(res => setTimeout(res, ms));


const Home = () => {



    const { id } = useParams();
    const [username, Setusername] = useState('');
    const [userdata, Setuserdata] = useState('');
    const [userid, Setuserid] = useState('');
    const [password, Setpassword] = useState('');
    const [Loader, SetLoader] = useState(false);
    let base_url = process.env.REACT_APP_BASE_URL
    const [Setting, SetSetting] = useState(false);
    const header = {
        "Access-Control-Allow-Origin": "*"
      }


    const handleSubmit = (event) => {
        event.preventDefault();
        login_data(userid, password);
    }


    useEffect(() => {

        
        // console.log(id)
        settingData()
    
    
    
    
      }, []);

    async function login_data(userid, password) {
        SetLoader(true);

        await axios.get(base_url + 'FrontData', { headers: header })
        .then(res => {

                
                console.log('success')
                SetLoader(false);
            })
            .catch(error => {
                console.log('errr', error)
                SetLoader(false);
            })

    }


    async function settingData() {
        SetLoader(true);

        await axios.get(base_url + 'FrontData', { headers: header })
        .then(res => {

            SetSetting(res.data)
                console.log('success')
                SetLoader(false);
            })
            .catch(error => {
                console.log('errr', error)
                SetLoader(false);
            })

    }





    if(Setting == null)
    {
        return (
            <Loader/>
        )
    }



    return (
        <body>
            <div className="container-fluid front-home">


                <div className="col-md-12 my-5">
                    <div className='col-md-4'>

                    </div>
                    <div className='col-md-4 text-center'>
                        <img src={img_11} alt="" className='front-logo' />
                    </div>
                    <div className='col-md-4'>

                    </div>
                </div>
                <div className='container'>
                    <div className="row mt-5 front-top">
                        <div className="col-md-6 order-md-6">
                            <img
                                src={home_image}
                                alt=""
                                className="w-100 fade-in-image"
                            />
                        </div>


                        <div className="col-md-6 order-md-1 home_side" style={{ top: "40px" }}>
                            <div className="row align-items-center h-100">
                                <div className="col fade-in-text">

                                    <p className="main-tag text-center">Welcome to solzed  100% verified smart contract<br /></p>
                                    <p className="lead text-center">
                                        Lets Join Hand's Together for better
                                        Tomorrow
                                        <br />
                                        <br />

                                        <button className='home-button m-1'><Link to="/Login">
                                            <a href="#!" className="fw-bold text-body">
                                                Log in
                                            </a></Link>
                                        </button>

                                        <button className='home-button m-1'><Link to="/register">
                                            <a href="#!" className="fw-bold text-body">
                                                Registration
                                            </a></Link>
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>


                    <div className="row client_tag" style={{ margin: "97px 0px 0px 0px" }}>
                        <div className="text-center mb-5">
                            <div className='col-md-12'>

                                <p className="main-client-tag text-center">JOINING WITH SOLZED SUPPORT WALLET</p>
                                <div className="row text-center">

                                    <div className='col-4 col-md-4'>
                                        <img src={math_logo} alt="" className='front-client-logo mt-5' />
                                        <h3 className='text-white'>Math Wallet</h3>
                                    </div>
                                    <div className='col-4 col-md-4'>
                                        <img src={phantom} alt="" className='front-client-logo mt-5' />
                                        <h3 className='text-white'>Phantom Wallet</h3>
                                    </div>
                                    <div className='col-4 col-md-4'>
                                        <img src={flarelogo} alt="" className='front-client-logo mt-5' />
                                        <h3 className='text-white'>Solflare Wallet</h3>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>


                    <div className="row mt-5 about-top" style={{ top: "40px" }}>
                        <div className="row mt-5 about-top">
                            <div className="col-md-6 order-md-6">
                                <img
                                    src={about}
                                    alt=""
                                    className="w-100"
                                />
                            </div>

                            <div className="col-md-6 order-md-1" style={{ top: "30px" }}>
                                <div className="row align-items-center h-100">
                                    <div className="col">
                                        <p className="lead text-center">100% Verified Smart Contract</p>
                                        <p className="main-tag text-center">SOLANA BLOCKCHAIN..!<br /></p>
                                        <p className="lead text-center" style={{ size: "15px" }}>
                                            Solana is a high-performance blockchain platform that is scalable, secure, and
                                            energy-efficient. The platform enables fast and secure transactions without the
                                            need for a centralized authority. Solana is powered by a Proof-of-Stake consensus
                                            algorithm and uses a unique architecture that allows it to process up to 65,000
                                            transactions per second. <br />
                                            <br />


                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>


                </div>

                <div className='container' style={{ padding: "10px" }}>

                    <p className="main-client-tag text-center mb-2 mt-2">About Us</p>

                    <div className="testimonials">
                        <div className="testimonial-inner">

                            <div className="col-md-12" />
                            <div className="row">

                                <div className="col-md-12 mt-3">
                                    <div className="testimonial">


                                        <p>
                                            SOLZED is a Solana based decentralized MLM company that is committed to bringing financial freedom to everyone.
                                            We believe that everyone deserves to have the opportunity to earn a residual income and build long-term wealth.
                                            We offer a simple and affordable solution that anyone can use to get started on their financial journey.<br />

                                            Our team is passionate about providing quality products and services that help people reach their financial goals.
                                            We understand that success doesn’t happen overnight, so we are committed to helping people build a successful business over time.<br />

                                            We believe that everyone deserves to have the opportunity to become financially independent.
                                            Our platform makes it easy for people to start and grow a successful business.<br />
                                            We also offer a wide range of products and services that can help people achieve their financial goals.

                                            If you are looking for a way to achieve financial freedom, then you should consider joining SOLZED.

                                            We offer a simple and affordable solution that can help you reach your goals.
                                            We believe that everyone deserves the opportunity to become financially independent.<br />
                                            Thanks for considering us!
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="testimonial">
                                        <img
                                            src={mission}
                                            alt=""
                                        />
                                        <div className="name">Mission</div>

                                        <p>
                                            Solzed is a Solana blockchain based company that deals in Financial Services.<br />

                                            Our mission is to provide our customers with the best possible products and experiences, while helping them reach their personal financial goals.<br />

                                            We believe in providing our customers with the best possible customer service, and we are committed to working hard to make sure that everyone who joins Solzed feels valued and supported.<br />

                                            We hope that you will join us on our journey to creating the best possible products and experiences for our customers!
                                            <br /><br />
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="testimonial">
                                        <img
                                            src={vission}
                                            alt=""
                                        />
                                        <div className="name">Vision</div>

                                        <p>
                                            Our goal is to create a more sustainable and affordable way for people to buy and sell goods and services. <br />
                                            We are building a decentralized MLM company that uses blockchain technology to connect sellers and buyers in a secure, transparent and trustless environment.<br />


                                            Solzed offers a unique opportunity for individuals to become self-employed and earn a living from their own efforts.<br />

                                            We believe that our company offers a superior product and service and we are committed to providing the best possible experience for our members.
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>



                </div>

                <div className='container' style={{ padding: "10px" }}>

                    <p className="main-client-tag text-center mb-2 mt-2">What is DAPP</p>

                <div className="testimonials">
                    <div className="testimonial-inner">

                        <div className="col-md-12" />
                            <div className="row">

                                <div className="col-md-12 mt-3">
                                    <div className="testimonial">


                                      
                                        <p><span>A <strong>Decentralized Application</strong> (DApp) is an application that runs on a decentralized network. A DApp can be a traditional application, such as a social media platform or a messaging app, that has been decentralized. Alternatively, a DApp can be a new application that has been built from the ground up to run on a decentralized network.</span></p>
                                        
                                    </div>
                                </div>
                               

                            </div>
                         </div>

                    </div>
                </div>


                <div className="what-do">
                    <div className='row'>
                        <div className="col-md-7">
                            <img
                                style={{padding:"25px"}}
                                src={solzed_dist}
                                alt=""
                                className="w-100"
                            />
                        </div>
                        <div className='col-md-5 background_what_do'>

                            <p className='text-center main-client-tag mt-5'>100% DISTRIBUTION</p>
                           

                            

                            <div className="m-3">
                                <div className="card-body card-bacground border-radious25">
                                    <h4 className="card-title what-do-tag text-center">Direct Income 10$ </h4>
                                </div>
                            </div>


                            <div className="m-3">
                                <div className="card-body card-bacground border-radious25">
                                    <h4 className="card-title what-do-tag text-center">Level Income 9$</h4>
                                </div>
                            </div>

                            <div className="m-3">
                                <div className="card-body card-bacground border-radious25">
                                    <h4 className="card-title what-do-tag text-center">Direct Working Income 19$</h4>
                                </div>
                            </div>

                            <div className="m-3">
                                <div className="card-body card-bacground border-radious25">
                                    <h4 className="card-title what-do-tag text-center">Generation Income 5$</h4>
                                </div>
                            </div>

                            <div className="m-3">
                                <div className="card-body card-bacground border-radious25">
                                    <h4 className="card-title what-do-tag text-center">Leadership Income 2$</h4>
                                </div>
                            </div>

                            <div className="m-3">
                                <div className="card-body card-bacground border-radious25">
                                    <h4 className="card-title what-do-tag text-center">Royalty Income 5$ </h4>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className='container-fluid front-home' style={{ display: 'flex', justifyContent: 'center' }}>

                <div className='container col-md-12 mt-5'>
                    <div className='row'>
                        <div className='col-md-9  col-md-offset-3'>
                            <p className="main-tag">Key features of the Solana blockchain include<br /></p>
                            <p className="lead">
                                A high-performance, scalable blockchain platform <br /> <br/>

                                <ul><li>1. A Proof-of-Stake (PoS) consensus algorithm that enables fast and
                                    secure transactions</li>
                                    <li>2. A unique architecture that allows for horizontal scalability</li>
                                    <li>3. No transaction feesThe Solana blockchain is designed to meet the
                                        needs of large</li>
                                    <li>4. Scale enterprise applications.</li>
                                </ul> <br />
                                It is scalable and can handle thousands of transactions per second.
                                Additionally, the platform is secure and efficient.



                            </p>
                        </div>
                    </div>
                </div>

            </div>

            <div className='container-fluid front-home'>

                <div className='container'>
                    <div className="sectiontitle">


                        <div className='col-md-12'>
                            <p className="main-client-tag text-center" style={{ color: "#27AFE8" }}>Our Company by Number</p>
                            <p className='counter_tag'>YOU WILL BE ABLE TO TAKE INCOME AGAIN AND AGAIN FOR LIFE TIME.</p>
                        </div>
                        <span className="headerLine" />
                    </div>
                    {Setting.total_deposit != null &&
                    <div id="projectFacts" className="sectionClass">
                        <div className="fullWidth eight columns">
                            <div className="projectFactsWrap ">
                                <div
                                    className="item wow fadeInUpBig animated animated"
                                    data-number={12}
                                    style={{ visibility: "visible" }}
                                >
                                    <i className="fa fa-briefcase" />
                                    <p id="number1" className="number" style={{ color: "#27AFE8" }}>
                                        {Setting.total_user}
                                    </p>
                                    <span />
                                    <p>Total Contract</p>
                                </div>
                                <div
                                    className="item wow fadeInUpBig animated animated"
                                    data-number={55}
                                    style={{ visibility: "visible" }}
                                >
                                    <i className="fa fa-smile-o" />
                                    <p id="number2" className="number" style={{ color: "#27AFE8" }}>
                                    {Setting.total_deposit.toFixed(2)}$
                                    </p>
                                    <span />
                                    <p>Total Deposit</p>
                                </div>
                                <div
                                    className="item wow fadeInUpBig animated animated"
                                    data-number={359}
                                    style={{ visibility: "visible" }}
                                >
                                    <i className="fa fa-coffee" />
                                    <p id="number3" className="number" style={{ color: "#27AFE8" }}>
                                    {Setting.total_withdrawal.toFixed(2)}$
                                    </p>
                                    <span />
                                    <p>Total Withdrawal</p>
                                </div>
                                <div
                                    className="item wow fadeInUpBig animated animated"
                                    data-number={246}
                                    style={{ visibility: "visible" }}
                                >
                                    <i className="fa fa-camera" />
                                    <p id="number4" className="number" style={{ color: "#27AFE8" }}>
                                    {Setting.transaction_count}
                                    </p>
                                    <span />
                                    <p>Transaction Volume</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    }

                </div>




               
                <div className='row mt-5'>
                    <img className='scrolling' src={scrolling} alt="Alps" style={{ width: "100%" }} />

                </div>

                <div className='container' style={{ padding: "40px" }}>

                    <p className="main-client-tag text-center mb-5">Creators of Plan</p>

                    <div className="testimonials">
                        <div className="testimonial-inner">

                            <div className="col-md-12" />
                            <div className="row">
                                <div className="col-md-6 mt-3">
                                    <div className="testimonial text-center">
                                        <img
                                            src={mukesh}
                                            alt=""
                                        />
                                        <div className="name">Mukesh Gaud</div>
                                        
                                        <p>
                                            Great analyst and having 10+ Years of Experience in Research of Marketing. Mr. Mukesh has 13+ Years of experience in Network Markweting
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 mt-3">
                                    <div className="testimonial text-center">
                                        <img
                                            src={azam}
                                            alt=""
                                        />
                                        <div className="name">Mohd Azam</div>
                                       
                                        <p>
                                            Mr. Mohd Azam is research oriented planner and deployer of Marketing based concepts as well as deep knowledge of Blockchain and cryptocurrency.
                                        </p>
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>



                </div>

                <div className='container-fluit mt-5'>
                    <footer className="site-footer">

                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 col-sm-6 col-xs-12">
                                    <p className="copyright-text">
                                        Copyright © 2022 All Rights Reserved by
                                        <a href="#"> Solzed</a>.
                                    </p>
                                </div>


                                <div className="col-md-4 col-sm-6 col-xs-12">
                                    <ul className="social-icons">
                                        <li>
                                            <a className="facebook" href="https://www.facebook.com/profile.php?id=100087840991397">
                                                <i >{<BsFacebook />}</i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="twitter" href="https://twitter.com/SolZedOfficial?t=Qdlcmzg3dSRnd8M6I2MUCA&s=09">
                                                <i >{<BsTwitter />}</i>
                                            </a>
                                        </li>
                                        <li>
                                            <a className="Youtube" href="https://youtube.com/channel/UCQ2WSgrLFO0S7sSDbRGG1yA">

                                                <i >{<BsYoutube />}</i>
                                            </a>
                                        </li>

                                        <li>
                                            <a className="Linkedin" href="https://t.me/SolZedOfficial">

                                                <i >{<BsTelegram />}</i>
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>

                </div>

            </div>

        </body >

    );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;