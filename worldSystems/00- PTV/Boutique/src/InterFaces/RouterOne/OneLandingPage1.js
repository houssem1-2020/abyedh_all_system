import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Bounce, Fade } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import LinkCard from './Assets/Cards/linksCard'
import OneGConf from './Assets/OneGConf'

function InputLandingPage() {
    /*#########################[Const]###########################*/


    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        //get position 
        //  navigator.geolocation.getCurrentPosition(
        //     function(position) {
        //         if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
        //         else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
        //         else{
        //             axios.post(`${GConf.ApiRouterOneLink}/main/position`, {
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
    const logOutInput = () =>{    
        localStorage.removeItem(`${OneGConf.routerTagName}_LocalD`);
        window.location.href = `/${OneGConf.routerName}`;
    }

    const ChangeThemeMode = () =>{
        if (OneGConf.themeMode == 'dark') {
            localStorage.setItem(`${OneGConf.routerTagName}_Theme`, 'ligth');
            window.location.reload()
        } else {
            localStorage.setItem(`${OneGConf.routerTagName}_Theme`, 'dark');
            window.location.reload()
        }
       
    }

    /*#########################[Card]###########################*/
    const MainTopCard = () =>{
        return(<>
             <div className={`card p-3 fixed-top border-0 shadow-sm rounded-0 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1' : '' }`}>
                <div className='row'>
                    <div className='col-9 align-self-center'><h2> <span className="badge bg-info"> <span className='bi bi-pc-display-horizontal '></span>  {OneGConf.forPID.CA_Name} </span></h2></div>
                    <div className='col-1 align-self-center' >
                        <div className="form-check form-switch ">
                            <input className="form-check-input form-check-input-lg " type="checkbox" defaultChecked={OneGConf.themeMode == 'dark'}  onChange={() => ChangeThemeMode()}   />
                        </div>
                    </div>
                    <div className='col-1 align-self-center' >
                        <NavLink to='up' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s me-4" : "ps-1 pe-1 abyedh-list me-4"}><i className="bi bi-cloud-arrow-down-fill text-danger bi-upl "></i></NavLink>
                    </div>
                    <div className='col-1 align-self-center' >
                        <Button onClick={logOutInput} style={{backgroundColor:GConf.themeColor}} className='rounded-circle text-white p-2' icon='log out' />
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
                            {/* <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[2]} /> </div> */}
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[1]} /> </div>
                            {/* <div className='col-4 mb-3'> <LinkCard data={OneGConf.main[3]} /> </div> */}
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[4]} /> </div>
                            <div className='col-6 mb-3'> <LinkCard data={OneGConf.main[5]} /> </div>
                        </div>
                    </div>
                </Fade> 
            </div>
        </> );
}

export default InputLandingPage;