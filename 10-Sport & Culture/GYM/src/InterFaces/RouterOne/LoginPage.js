import React ,{useEffect, useState} from 'react';
import { Button, Icon, Input, Loader, Segment } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import { toast } from 'react-toastify';
import axios from 'axios';
import OneGConf from './Assets/OneGConf'

function LoginPage() {
    /*#########################[Const]##################################*/
    const [loginD, setLoginD] = useState([])
    const [loaderState, setLS] = useState(false)
    

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        if (OneGConf.forPID) {window.location.href = `/${OneGConf.routerName}/L`;} 
    });

    /*#########################[Functions]##################################*/
    const logInSystem = () =>{
        if (!loginD.Log) {toast.error("Entrer Un identifiant !", GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error("Entrer Le mot DP  !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiRouterOneLink}/LogIn`, {
                LoginData : loginD,
            }).then(function (response) {
                if(response.data.length != 0 ) {
                        toast.success("Connecteé !", GConf.TostSuucessGonf)
                        if (!OneGConf.oneOffline) {
                            localStorage.setItem(`Restaurant_Caisse_Offline`, JSON.stringify(OneGConf.default_Offline));
                        }
                        localStorage.setItem(`Restaurant_Caisse_LocalD`, JSON.stringify(response.data));
                        window.location.href = `/${OneGConf.routerName}`;
                }
                else{
                    toast.error('Compte Indéfine ! ', GConf.TostSuucessGonf)
                    
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de se connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 
    }

    return ( <>
             <div className='container d-flex align-items-center justify-content-center' style={{paddingTop:'100px'}}>
                <div className='col-12 col-lg-5'>
                <Segment padded className='sub-sys-round' style={{borderBottom:`3px solid ${GConf.themeColor}`}}>
                            <h2 className='text-cente'><Icon name='linkify' /> Connexion :</h2>
                            <br />
                            <div className='mb-3'>
                                <Input   icon='user' iconPosition='left' placeholder='Identification' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Log: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Input  icon='key' iconPosition='left' placeholder='Mot DP' type='password' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Button onClick={logInSystem}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm w-100'>Connextion <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                            </div>
                </Segment>
                </div>
            </div>
            
    </> );
}

export default LoginPage;