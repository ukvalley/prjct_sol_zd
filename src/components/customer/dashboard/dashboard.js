import React, { useState } from 'react';
import './dashboard.css';
import 'react-pro-sidebar/dist/css/styles.css';
import { IntlProvider } from 'react-intl';
import Layout from '../layout/layout';
import '../layout/sidebar.css';



export default function dashboard() {


  
 
    

   

  return (
    <IntlProvider>
        <div>
        <Layout />
        </div>
    </IntlProvider>



   
  );
}


