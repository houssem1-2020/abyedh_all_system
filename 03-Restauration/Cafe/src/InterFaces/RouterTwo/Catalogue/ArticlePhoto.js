import React from 'react';
import BackCard from '../Assets/Cards/backCard';
import GConf from '../Assets/linksData';

function ArticlePhoto() {
    return ( <>
        <BackCard data={GConf.backCard.cgPhoto}/>
        <br />
        Famille List
        </> );
}

export default ArticlePhoto