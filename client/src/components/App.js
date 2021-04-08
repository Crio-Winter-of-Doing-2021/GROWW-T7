import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import {useEffect} from 'react'
import Header from './layout/Header';
import Landing from './pages/Landing';
import About from './pages/About';
import Explore from './explore/Explore';
import Stocks from './explore/Stocks';
import MutualFunds from './explore/MutualFunds';
import Chatbot from './chatbot/Chatbot'; 
import ProductDetails from './product/ProductDetails' 
import Login from '../components/user/Login'
import Register from '../components/user/Register'
import {loadUser} from '../actions/userActions'
import store from '../store'
function App(){

    useEffect(()=>{
        store.dispatch(loadUser());
    })
    return(
        <div>
  
<BrowserRouter>
                <div>
                    
                    <Header/>
                    <Route exact path="/" component ={Landing} />
                    <Route exact path="/product/:id" component ={ProductDetails} />
                    <Route exact path="/about" component ={About} />
                    <Route exact path="/explore" component ={Explore} />
                    <Route exact path="/explore/stocks" component ={Stocks} />
                    <Route exact path="/explore/mutual-funds" component ={MutualFunds} />
                    <Route exact path="/login" component ={Login} />
                    <Route exact path="/register" component ={Register} />
                    <Chatbot/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App; 