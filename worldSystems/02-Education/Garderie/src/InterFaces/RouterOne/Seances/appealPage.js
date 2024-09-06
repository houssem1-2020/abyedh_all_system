import React from 'react';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';
function AppealPage() {
    return ( 
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.rt}/>
            <br />
            <div className='container-fluid'>
                <div className='row'>
                     
                </div>
            </div>
        </div>   
    );

}

export default AppealPage;