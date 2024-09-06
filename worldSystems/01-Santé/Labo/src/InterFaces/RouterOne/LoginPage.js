import React ,{useEffect, useState} from 'react';
import { Button, Divider, Icon, Input, Loader, Dropdown, Segment } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import { toast } from 'react-toastify';
import axios from 'axios';
import OneGConf from './Assets/OneGConf'
import { useTranslation, Trans } from 'react-i18next';

function LoginPage() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    const [loginD, setLoginD] = useState([])
    const [loaderState, setLS] = useState(false)
    const [loginCheckValue, setLoginCheckValue] = useState('')
    const [userLoggedCorrectely, setUserLoggedCorrectely] = useState(false)
    

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
                console.log(response.data)
                if(response.data.userData != false ) {
                        setUserLoggedCorrectely(true)
                        toast.success("Membre Trouveé !", GConf.TostSuucessGonf)
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
    const CheckLogin = () =>{
        if (!loginCheckValue) {toast.error("Entrer Le Smart ID !", GConf.TostErrorGonf)}
        else if (!loginD.Log) {toast.error("Entrer Un identifiant !", GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error("Entrer Le mot DP  !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiRouterOneLink}/LogIn/check`, {
                LoginData : loginD,
                loginCheckValue : loginCheckValue,
            }).then(function (response) {
                if(response.data.length != 0 ) {
                        toast.success("Connecteé !", GConf.TostSuucessGonf)
                        if (!OneGConf.oneOffline) {
                            localStorage.setItem(`${OneGConf.routerTagName}_Offline`, JSON.stringify(OneGConf.default_Offline));
                        }
                        localStorage.setItem(`${OneGConf.routerTagName}_LocalD`, JSON.stringify(response.data));
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
    const SelectCountry = (lan, country) => {
        i18n.changeLanguage(lan)
        localStorage.setItem('country', country);
        //navigate(`/`)
        //window.location.href = '/';
    
    }

    return ( <>

             <div className='container d-flex align-items-center justify-content-center' style={{paddingTop:'80px'}}>
                <div className='col-12 col-lg-5'>
                    <Segment padded className='sub-sys-round' style={{borderBottom:`3px solid ${GConf.themeColor}`}}>
                                <div className='text-end '>
                                    <Dropdown floating scrolling   labeled  button direction='left'  icon={<span className='bi bi-translate bi-sm text-info'></span>}>
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
                                <h2 className='text-cente mt-1'><Icon name='linkify' />{t('alternativeS.rdvPortail.loginInPage.connextionText')}</h2>
                                <br />
                                <div className='mb-3'>
                                    <Input   icon='user' iconPosition='left' placeholder='PID' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, PID: e.target.value })}/>
                                </div>
                                <Divider />
                                <div className='mb-3'>
                                    <Input   icon='user' iconPosition='left' placeholder={t('alternativeS.rdvPortail.loginInPage.identifiant')} className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Log: e.target.value })}/>
                                </div>
                                <div className='mb-3'>
                                    <Input  icon='key' iconPosition='left' placeholder={t('alternativeS.rdvPortail.loginInPage.pwd')} type='password' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                                </div>
                                <div className='mb-3'>
                                    <Button onClick={logInSystem}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm w-100'>{t('alternativeS.rdvPortail.loginInPage.connBtn')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                                </div>
                                {userLoggedCorrectely ? 
                                <>
                                <Divider />
                                <div className='mb-3'>
                                    <Input  icon='key' iconPosition='left' placeholder={t('alternativeS.rdvPortail.loginInPage.smartId')}  type='text' className='shadow-sm w-100' onChange={(e) => setLoginCheckValue(e.target.value)}/>
                                </div>
                                <div className='mb-3'>
                                    <Button onClick={() => CheckLogin()}   className='shadow-sm w-100'>{t('alternativeS.rdvPortail.loginInPage.validBtn')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                                </div>
                                </>
                                :
                                <></>}
                    </Segment>
                </div>
            </div>
            
    </> );
}

export default LoginPage;