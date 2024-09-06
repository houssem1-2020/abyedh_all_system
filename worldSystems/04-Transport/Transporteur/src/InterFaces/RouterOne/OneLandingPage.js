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
    const SelectCountry = (lan, country) => {
        i18n.changeLanguage(lan)
        localStorage.setItem('country', country);
        //navigate(`/`)
        //window.location.href = '/';
    
    }
    /*#########################[Card]###########################*/
    const MainTopCard = () =>{
        return(<>
             <div className={`card p-3 fixed-top border-0 shadow-sm rounded-0 ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1' : '' }`}>
                <div className='row'>
                    <div className='col-8 align-self-center'><h2> <span className="badge bg-info"> <span className='bi bi-pc-display-horizontal '></span>  {OneGConf.forPID.CM_Name} </span></h2></div>
 
                    <div className='col-1 align-self-center' >
                        {/* <NavLink to='up' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s me-4" : "ps-1 pe-1 abyedh-list me-4"}><i className="bi bi-cloud-arrow-down-fill text-danger bi-upl "></i></NavLink> */}
                        <div className="form-check form-switch ">
                            <input className="form-check-input form-check-input-lg " type="checkbox" defaultChecked={OneGConf.themeMode == 'dark'}  onChange={() => ChangeThemeMode()}   />
                        </div>
                    </div>
                    <div className='col-1 align-self-center' >
                        <NavLink to='up' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s me-4" : "ps-1 pe-1 abyedh-list me-4"}><i className="bi bi-cloud-arrow-down-fill text-danger bi-upl "></i></NavLink>
                    </div>
                    <div className='col-1 align-self-center' >
                        <Dropdown floating scrolling className='me-3'  labeled  button direction='left'  icon={<span className='bi bi-translate bi-sm text-info'></span>}>
                            <Dropdown.Menu >
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('en_US','US')}>  <img src="https://flagcdn.com/us.svg" className="img-responsive   border" width="10px" height="25px" /> English  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('fr_FR','FR')}>  <img src="https://flagcdn.com/fr.svg" className="img-responsive   border" width="10px" height="25px" /> Français  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('zh_CN','CN')}>  <img src="https://flagcdn.com/cn.svg" className="img-responsive   border" width="10px" height="25px" /> Chineese  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('hi','IN')}>  <img src="https://flagcdn.com/in.svg" className="img-responsive   border" width="10px" height="25px" /> Hindi  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('ru','RU')}>  <img src="https://flagcdn.com/ru.svg" className="img-responsive   border" width="10px" height="25px" /> Russian  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('ja','JP')}>  <img src="https://flagcdn.com/pa.svg" className="img-responsive   border" width="10px" height="25px" /> Japonny  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('de_DE','DE')}>  <img src="https://flagcdn.com/de.svg" className="img-responsive   border" width="10px" height="25px" /> Germany  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('it_IT','IT')}>  <img src="https://flagcdn.com/it.svg" className="img-responsive   border" width="10px" height="25px" /> Italy  </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        
                    </div>
                    <div className='col-1 align-self-center'>
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