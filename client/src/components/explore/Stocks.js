import React from 'react';
import {Card} from 'react-bootstrap';

function Stocks(){
    const stockInfo = [
        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"ABC Stock",price:"Rs 123"},

        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"DEF Stock",price:"Rs 225"},

        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"XYZ Stock",price:"Rs 552"},

        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"GHI Stock",price:"Rs 10"}
    ]

    const renderStock = (stock,index) => {
        return(
           
            <Card style={{ width: '15rem',margin:'2rem'}} key={index}>
      <Card.Img variant="top"  src ={stock.image}/>
      <Card.Body>
        <Card.Title>{stock.title}</Card.Title>
        <Card.Text>
        {stock.price}
        </Card.Text>
      </Card.Body>
    </Card>
        );
    };

    return <div style={{display: 'flex', flexDirection: 'row'}} className="App">{stockInfo.map(renderStock)}</div>
   
}


export default Stocks;