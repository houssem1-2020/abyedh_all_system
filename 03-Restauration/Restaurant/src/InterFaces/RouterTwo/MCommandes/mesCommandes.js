import React from 'react';
import LinkCard from '../Assets/linksCard'
import GConf from '../Assets/linksData'
import BackCard from '../Assets/Cards/backCard'
import LandingList from '../Assets/landingList';

function MesCommandes() {
    return ( <>
        <BackCard data={GConf.backCard.mf}/>
        <br />
        <LandingList list={GConf.facture} />
        </> );
}

export default MesCommandes;