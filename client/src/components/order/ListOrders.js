import React,{Fragment,useEffect} from 'react';
import {Link} from 'react-router-dom';
import MetaData from '../layout/MetaData'
import {MDBDataTable} from 'mdbreact'
import {useDispatch,useSelector} from 'react-redux'
import {myOrders} from '../../actions/orderActions'

import OrderDetails from '../product/OrderDetails'

const ListOrders = () =>{
const dispatch = useDispatch();
const {orders} = useSelector(state=>state.myOrders)

useEffect(()=>{
    dispatch(myOrders());
    console.log("1.MY ORDERS ARE -"+orders)

},[dispatch])

return(
<Fragment>
<MetaData title={'My Orders Page'}/>
<h1 id="products_heading">My Orders</h1>
<section id="products" className="container mt-5">
<div className="row">

{orders && orders.map(order => (
    <OrderDetails key={order._id} order={order}/>

))}


</div>
</section>
<div className="d-flex justify-content-center mt-5">

</div>
</Fragment>
) 
}

  
export default ListOrders
