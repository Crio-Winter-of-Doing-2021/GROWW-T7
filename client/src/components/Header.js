import React from 'react';
import {Link} from 'react-router-dom';
function Header(){
    return(
      

  <nav style={{height:'80px'}}className="navbar navbar-expand-lg navbar-dark bg-dark">
   <Link to={'/'} class="navbar-brand" >
    <img src="https://groww.in/logo-groww270.png" width="50" height="50" alt=""/>
  </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="nav navbar-nav mr-auto">
      <li className="nav-item">
      <Link to={'/explore'} className="nav-link">Explore</Link>
        </li>
      <li className="nav-item">
        <Link to={'/about'} className="nav-link">About</Link>
      </li>
    </ul>
    <ul class="nav navbar-nav navbar-right">
      <li>
    <Link to={'/login'} className="nav-link">Login</Link></li>
    <li>
    <Link to={'/register'} className="nav-link">Register/Sign Up</Link></li>
          </ul>
   
  </div>
</nav>

)
    }
export default Header; 
