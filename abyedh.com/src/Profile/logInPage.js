import React ,{useEffect, useState} from 'react';
import { Button, Icon, Input, Loader, Segment } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';
import { toast } from 'react-toastify';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function LogInPage() {
    /*#########################[Const]##################################*/
    const [loginD, setLoginD] = useState([])
    const [loaderState, setLS] = useState(false)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        const UIDisSet = localStorage.getItem('UID');
        if (UIDisSet) {window.location.href = "/Profile/L";}
        
    });

    /*#########################[Functions]##################################*/
    const logInSystem = () =>{
        if (!loginD.Log) {toast.error(t('loginPage.toastText.enterLog') , GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error(t('loginPage.toastText.saved'), GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiProfileLink}/LogIn`, {
                tag : GConf.SystemTag,
                LoginData : loginD,
            }).then(function (response) {
                if(response.data.Exist == true) {
                        toast.success(t('loginPage.toastText.saved'), GConf.TostSuucessGonf)
                        setLS(false)
                        localStorage.setItem('UserData', JSON.stringify(response.data.UserD));
                        localStorage.setItem('UID', response.data.UserD.UID);
                        window.location.href = "/Profile";
                }
                else{
                    toast.error(t('loginPage.toastText.notSaved'), GConf.TostSuucessGonf)
                    setLS(false)
                }
            })
        } 
    }

    const TopNavBar = () =>{
        return(<>
                <div className="rounded-0 border-0 p-2 m-0 bg-danger navshad" >
                    <div className='row m-0'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                <img  className="border-div-s" src="https://cdn.abyedh.tn/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px', borderRadius: '10px 20px 10px 50px'}} />
                            </NavLink>
                        </div>
                        
                    </div>
                </div>
            </>)
    }

    return ( <>
            <Helmet>
                <title>  منصة أبيض : تسجيل الدخول </title>
            </Helmet>
            <TopNavBar  />
             <div className='container d-flex align-items-center justify-content-center' style={{paddingTop:'70px'}}>
                <div className='col-12 col-lg-4'>
                <Segment padded className={`sub-sys-round  ${isRTL ? 'text-end' : 'text-start'} `} style={{borderTop:`3px solid ${GConf.themeColor}`}}>
                            
                            <br />
                            <div className='mb-3'>
                                <Input   icon='user' iconPosition={isRTL ? 'rigth' : 'left'} placeholder={t('loginPage.inputIdentifiantText')} className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Log: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Input  icon='key' iconPosition={isRTL ? 'rigth' : 'left'} placeholder={t('loginPage.inputPasswordText')} type='password' className='shadow-sm w-100' onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Button onClick={logInSystem}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm w-100 rounded-pill'> {t('loginPage.btnLogInText')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                            </div>
                            <br />
                            <h5>{t('loginPage.inscrireLinkText')}</h5>
                            <div className='mb-3'>
                                <NavLink exact='true' to='/Profile/signUp'>
                                    <Button  style={{backgroundColor:'white', color:GConf.themeColor}} className='shadow-sm border w-100 rounded-pill'> {t('loginPage.inscrireLinkText')} </Button>
                                </NavLink>
                            </div>
                            <br />
                            <small> {t('loginPage.pleaseInscrireOneText')}  </small>
                            <br />
                            <small> {t('loginPage.pleaseInscrireTwoText')} </small>

                </Segment>
                </div>
            </div>
            
    </> );
}

export default LogInPage;