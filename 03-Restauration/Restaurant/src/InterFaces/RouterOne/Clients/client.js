import React from 'react';
import LinkCard from '../Assets/linksCard'
import GConf from '../Assets/linksData'
import BackCard from '../Assets/Cards/backCard'
import LandingList from '../Assets/landingList';

function ClientsPage() {
    return ( <>
            <BackCard data={GConf.backCard.cl} />
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
                    <LandingList list={GConf.client} />
            </div>
             
            </> );
}

export default ClientsPage;