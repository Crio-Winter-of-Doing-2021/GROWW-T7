import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Header from './Header';
import Landing from './pages/Landing';
import About from './pages/About';
import Explore from './explore/Explore';
import Stocks from './explore/Stocks';
import MutualFunds from './explore/MutualFunds';
import Chatbot from './chatbot/Chatbot';
function App(){
    return(
        <div>
  
<BrowserRouter>
                <div>
                    
                    <Header/>
                    <Route exact path="/" component ={Landing} />
                    <Route exact path="/about" component ={About} />
                    <Route exact path="/explore" component ={Explore} />
                    <Route exact path="/explore/stocks" component ={Stocks} />
                    <Route exact path="/explore/mutual-funds" component ={MutualFunds} />
                    
                    <Chatbot/>
                </div>
            </BrowserRouter>
        </div>
    )
}

export default App; 