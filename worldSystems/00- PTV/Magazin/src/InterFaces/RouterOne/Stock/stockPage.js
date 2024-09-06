import React from 'react';
 
import OneGConf from './../../../InterFaces/RouterOne/Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard'
import LinkCard from '../Assets/Cards/linksCard';

function Stock() {
    return ( <>
        <BackCard data={OneGConf.backCard.sk}/>
        <br />
        <br />
        <br />
        <br />
        <div className='container'>
            <div className='row'>
                {OneGConf.stock.map( (links) => <div  key={links.id}  className='col-12 col-md-6 mb-3'><LinkCard data={links} /></div>)}
            </div>
        </div>
        </> );
}

export default Stock;