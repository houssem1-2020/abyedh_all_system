import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Input,  Header, Grid, Segment, Loader, Select} from 'semantic-ui-react'
import GConf from '../AssetsM/generalConf';
import Bounce from 'react-reveal/Bounce';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate} from 'react-router-dom';
import ADIL from '../AssetsM/ADIL';

function LogIn() {
    /*#########################[Const]##################################*/
    //const navigate = useNavigate();
    const [loginD, setLoginD] = useState([])
    const [loaderState, setLS] = useState(false)
    const [systemListe, setSystemListe] = useState([])
  
    const genreOptions = [
        { key: 1 , value: 'Sante', text: 'القطاع الصحي' },
        { key: 2 , value: 'PTVente', text: 'قطاع التجارة' },
        { key: 3 , value: 'Education', text: 'قطاع التعليم' },
        { key: 4 , value: 'Transpo', text: 'قطاع النقل' },
        { key: 5 , value: 'Life', text: 'خدمات حياتية' },
        { key: 6 , value: 'Construct', text: 'قطاع البناء' },
        { key: 7 , value: 'Sport', text: 'قطاع الشباب و الرياضة' },
        { key: 8 , value: 'Other', text: 'قطاعات أخري' },
        
      ]
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        const getPID = GConf.PID
        if (getPID) {window.location.href = "/S";}      
    });

    /*#########################[Functions]##################################*/
    const logIn = () =>{
        if (!loginD.Log) {toast.error("Entrer Un identifiant !", GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error("Entrer Le mot DP  !", GConf.TostErrorGonf)}
        else if (!loginD.SystemTag) {toast.error("Entrer Le Un Metier  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/LogIn`, {
                LoginData : loginD,
                systemTag : GConf.systemTag,
            }).then(function (response) {
                if(response.data[0] == 'true') {
                    toast.success("Connecteé !", GConf.TostSuucessGonf)
 
                    localStorage.setItem('PID', response.data[1]);
                    localStorage.setItem('APP_TAG', GetSystemKey(loginD.SystemTag));
                
                    window.location.href = "/";
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        }   
    }
    const GetDelegList = (value) =>{
        const adminRecords = Object.keys(ADIL)
            .filter(key => ADIL[key].FavoriteGenre === value)
            .map(key => ({ key: key, value: ADIL[key].RequestTable, text: ADIL[key].directoryTable }));
            setSystemListe(adminRecords);
    }

    const GetSystemKey = (value) =>{
        for (const key in ADIL) {
            if (ADIL[key].RequestTable === value) {
                return key;
            }
        }
    }

    /*#########################[Card]##################################*/
 
    return (<> 
        {/* <LeftCard color={GConf.themeColor}/> */}
        <div className='row m-0'>
            <div className='col-12  col-lg-4'></div>
            <div className='col-12  col-lg-4'>
                <div className='card-body mt-4' >

                    <div className='mb-2 mt-3'>
                        <Select placeholder='ماهو قطاع عملك ' fluid className='mb-2' options={genreOptions}   onChange={(e, { value }) => GetDelegList(value)} />
                        <Select placeholder='إختر مهنتك' fluid value={loginD.SystemTag} options={systemListe} onChange={(e, { value }) => setLoginD({...loginD, SystemTag: value })} />
                    </div>
                    <Bounce left>
                        <br />
                        <h2 className='text-cente'><Icon name='linkify' /> Connexion :</h2>
                        <br />
                        <div className='mb-3'>
                            <Input   icon='user'  fluid iconPosition='left' placeholder='Identification' className='shadow-sm  '  onChange={(e) => setLoginD({...loginD, Log: e.target.value })} />
                        </div>
                        <div className='mb-3'>
                            <Input  icon='key' fluid  iconPosition='left' placeholder='Mot DP' type='password' className='shadow-sm  '  onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                        </div>
                        <div className='mb-3'>
                            <Button  fluid onClick={logIn}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm  '><Icon name='sign in' /> Connextion <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        <br />
                                
                        </Bounce>
                </div>
            </div>
        </div> 
    </>);
}

export default LogIn;