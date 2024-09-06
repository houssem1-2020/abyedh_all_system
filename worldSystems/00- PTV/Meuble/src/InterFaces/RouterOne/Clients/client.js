import React from 'react';
 
import OneGConf from './../../../InterFaces/RouterOne/Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard'
import LinkCard from '../Assets/Cards/linksCard';
import LandingList from '../Assets/Cards/landingList';

function ClientsPage() {
    return ( <>
            <BackCard data={OneGConf.backCard.cl} />
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
                    <LandingList list={OneGConf.client} />
            </div>
             
            </> );
}

export default ClientsPage;