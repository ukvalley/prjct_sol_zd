import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../../dashboard/my_css/project_images/solzed.png';
import { AiOutlineMenu } from "react-icons/ai";


const Header = ({
  menuCollapse, menuIconClick
}) => (
  <div className="main_header">
    <img src={logo} className="project_logo" />

    <i onClick={menuIconClick} className="material-icons"><AiOutlineMenu /></i>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
