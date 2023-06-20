import React from 'react';
import LinkCard from '../Assets/linksCard'
import GConf from '../Assets/linksData'
import BackCard from '../Assets/Cards/backCard'
import LandingList from '../Assets/landingList';


function Stock() {
    return ( <>
        <BackCard data={GConf.backCard.cg}/>
        <br />
        <LandingList list={GConf.stock} />
        </> );
}

export default Stock;