import React from 'react';
import {Link} from 'react-router-dom';
// import ItemList from './ItemList';

function Explore(){
    return (
<div>
<Link className="waves-effect waves-light btn" to={'/explore/stocks'}>Stocks</Link>
<Link className="waves-effect waves-light btn" to={'/explore/mutual-funds'}>Mutual Funds</Link>

</div>   
    )
        }

export default Explore;