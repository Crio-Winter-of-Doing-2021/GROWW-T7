import React,{Fragment} from 'react';
import {Link} from 'react-router-dom';
// import ItemList from './ItemList';
import MetaData from '../layout/MetaData'

function Explore(){
    return (
        <Fragment>
            <MetaData title={'Explore Page'}/>

<div>
<Link className="waves-effect waves-light btn" to={'/explore/stocks'}>Stocks</Link>
<Link className="waves-effect waves-light btn" to={'/explore/mutual-funds'}>Mutual Funds</Link>

</div>   
</Fragment>
    )
        }

export default Explore;