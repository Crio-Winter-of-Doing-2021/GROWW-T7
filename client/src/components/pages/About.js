import React from 'react';
import { Fragment } from 'react';
import MetaData from '../layout/MetaData'

function About(){
    return(
        <Fragment>
        <MetaData title={'About Page'}/>
        <div class="about-section">
  <h1>About Us Page</h1>
  <p>Groww is an India-based online investment platform Headquartered in Bangalore. Groww allows investors to open an account electronically and transact in mutual funds and stocks online. As of Feb 7 2021, Groww had more than 10 million registered users on its platform As of Sep 2020, the company had raised $59 million in venture capita</p>
</div>

<h2 style={{textAlign:'center'}}>Project built by - </h2>
<div class="row" style={{marginLeft:'42%'}}>
  <div class="column">
    <div class="card">
      <img src="data:image/jpeg;base64,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" alt="Satyam" style={{width:'100%'}}/>
      <div class="container">
        <h2>Satyam Naidu</h2>
        <p class="title">Working Professional</p>
        <p>satyamnaidu024@gmail.com</p>
      </div>
    </div>
  </div>

</div>
      </Fragment>
    )
   
}


export default About