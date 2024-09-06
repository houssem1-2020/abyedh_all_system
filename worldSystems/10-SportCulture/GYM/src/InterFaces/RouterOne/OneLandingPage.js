import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Bounce, Fade } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Dropdown } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import LinkCard from './Assets/Cards/linksCard'
import OneGConf from './Assets/OneGConf'
import { useTranslation, Trans } from 'react-i18next';

function InputLandingPage() {
    /*#########################[Const]###########################*/
    const { t, i18n } = useTranslation();

    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        //get position 
        //  navigator.geolocation.getCurrentPosition(
        //     function(position) {
        //         if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
        //         else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
        //         else{
        //             axios.post(`${GConf.ApiCamionLink}/main/position`, {
        //                 tag : GConf.SystemTag,
        //                 camId : camId,
        //                 position : {lat:position.coords.latitude, lng:position.coords.longitude}
        //             }).then(function (response) {
        //                 console.log('saved-pos')
        //             }).catch((error) => {
        //                 if(error.request) {
        //                     console.log(error.message)
        //                   toast.error(<><div><h5>PAS DE CONNEXTION</h5></div></>, GConf.TostInternetGonf)   
        //                 }
        //             });
        //         }
        //     },
        //     function(error) {
        //         toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
        //     }
        // );
        if (!OneGConf.forPID) {window.location.href = `/${OneGConf.routerName}/logIn` ;}
    })

    /*#########################[Function]###########################*/

    /*#########################[Card]###########################*/
 
    const MainTopCard = () =>{
        return(<>
             <div className={`card p-3 fixed-top border-0 shadow-sm rounded-0 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1' : '' }`}>
                <div className='row'>
                    <div className='col-8 col-lg-10 align-self-center'><h2> <span className="badge " style={{backgroundColor : GConf.themeColor}} > <span className='bi bi-pc-display-horizontal '></span>  {OneGConf.forPID[OneGConf.topBarName]} </span></h2></div>
                    <div className='col-2 col-lg-1 align-self-center' >
                        <NavLink to='up' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s me-4" : "ps-1 pe-1 abyedh-list me-4"}><i className="bi bi-cloud-arrow-down-fill bi-upl " style={{color : GConf.themeColor}}></i></NavLink>
                    </div>
                    <div className='col-2 col-lg-1 align-self-center' >
                        <NavLink to='st' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s me-4" : "ps-1 pe-1 abyedh-list me-4"}><i className="bi bi-gear-wide-connected bi-md "></i></NavLink>
                    </div>
                </div>
            </div>
        </>)
    }
    return ( <>
            <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
                <MainTopCard />
                <br />                
                <br />                
                <br />                
                <br />   
                <br />   
                <br />   
                <br />   
                <Fade >            
                    <div className='container '>
                        <div className='row'>
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[0]} /> </div>
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[1]} /> </div>
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[2]} /> </div>
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[3]} /> </div>
                             
                        </div>
                    </div>
                </Fade> 
            </div>
        </> );
}

export default InputLandingPage;