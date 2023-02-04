import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { Bounce, Fade } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import LinkCard from './Assets/linksCard'
import InputLinks from './Assets/linksData'

function InputLandingPage() {
    /*#########################[Const]###########################*/
    let dirData = InputLinks.forTeamM;

    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        //get position 
        //  navigator.geolocation.getCurrentPosition(
        //     function(position) {
        //         if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
        //         else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
        //         else{
        //             axios.post(`${GConf.ApiInputLink}/main/position`, {
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
        //  );
        const inputIsLogged = localStorage.getItem(`Admin_Subs_LocalD`);
        if (!inputIsLogged) {window.location.href = "/Subs/logIn";}
    })

    /*#########################[Function]###########################*/
    const logOutInput = () =>{    
        localStorage.clear();
        window.location.href = "/Subs";
    }

    /*#########################[Card]###########################*/
    const MainTopCard = () =>{
        return(<>
            <div className='card p-3 fixed-top border-0 shadow-sm rounded-0'>
                <div className='row'>
                    <div className='col-8 align-self-center'><h2> <span className="badge bg-info"> <span className='bi bi-person '></span>  {dirData.Name} </span></h2></div>
                    <div className='col-2 align-self-center' >
                        <NavLink to='up' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s me-4" : "ps-1 pe-1 abyedh-list me-4"}><i className="bi bi-cloud-arrow-down-fill text-danger bi-upl "></i></NavLink>
                    </div>
                    <div className='col-2 align-self-center' >
                        <Button onClick={logOutInput} style={{backgroundColor:GConf.themeColor}} className='rounded-circle text-white p-2' icon='log out' />
                    </div>
                </div>
            </div>
        </>)
    }

    return ( <>
            <MainTopCard />
            <br />                
            <br />                
            <br />                
            <br />   
            <Fade>            
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[0]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[1]} /> </div>
                        {/* <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[2]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[3]} /> </div>*/}
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[4]} /> </div> 
                        <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[5]} /> </div>
                    </div>
                </div>
            </Fade> 
              
        </> );
}

export default InputLandingPage;