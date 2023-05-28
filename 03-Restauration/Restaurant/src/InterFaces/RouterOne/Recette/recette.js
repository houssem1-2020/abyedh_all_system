import React from 'react';
import LinkCard from '../Assets/Cards/linksCard'
import OneGConf from '../Assets/OneGConf'
import BackCard from '../Assets/Cards/backCard'

function Recette() {
    return ( <>
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.rt}/>
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
                <div className='row'>
                    {OneGConf.recette.map( (links) => <div  key={links.id}  className='col-12 col-md-6 mb-3'><LinkCard data={links} /></div>)}
                </div>
            </div>
        </div>    
        </> );
}

export default Recette;