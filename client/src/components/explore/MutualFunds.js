import React from 'react';
import {Card} from 'react-bootstrap';

function MutualFunds(){
    const mfInfo = [
        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"ABC MF",price:"Rs 123"},

        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"DEF MF",price:"Rs 225"},

        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"XYZ MF",price:"Rs 552"},

        {image:"https://assets-netstorage.groww.in/stock-assets/logos/INE123W01016.png",title:"GHI MF",price:"Rs 10"}
    ]

    const renderMF = (mf,index) => {
        return(
           
            <Card style={{ width: '18rem',margin:'2rem'}} key={index}>
      <Card.Img variant="top"  src ={mf.image}/>
      <Card.Body>
        <Card.Title>{mf.title}</Card.Title>
        <Card.Text>
        {mf.price}
        </Card.Text>
      </Card.Body>
    </Card>
        );
    };


    return <div style={{display: 'flex', flexDirection: 'row'}} >{mfInfo.map(renderMF)}</div>
   

}


export default MutualFunds;