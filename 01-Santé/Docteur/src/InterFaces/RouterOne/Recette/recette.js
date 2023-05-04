import React from 'react';
import LinkCard from '../Assets/linksCard'
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'

function Recette() {
    return ( <>
        <BackCard data={InputLinks.backCard.rt}/>
        <br />
        <br />
        <br />
        <br />
        <div className='container'>
            <div className='row'>
                {InputLinks.recette.map( (links) => <div  key={links.id}  className='col-12 col-md-6 mb-3'><LinkCard data={links} /></div>)}
            </div>
        </div>
        </> );
}

export default Recette;