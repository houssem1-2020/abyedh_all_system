import React, { useEffect, useState } from 'react';
import { Button, Divider, Icon, Input,  Header, Grid, Segment, Dropdown, Loader} from 'semantic-ui-react'
import GConf from '../AssetsM/generalConf';
import Bounce from 'react-reveal/Bounce';
import axios from 'axios';
import { toast } from 'react-toastify';
import { NavLink, useNavigate} from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function LogIn() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    const [loginD, setLoginD] = useState([])
    const [loaderState, setLS] = useState(false)
    const { t, i18n } = useTranslation();
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        const getPID = GConf.PID
        if (getPID) {window.location.href = "/S/ma";}  

        // Check if geolocation is available in the browser
        if ('geolocation' in navigator && !i18n.language) {
          navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
    
            // Make an API call to a reverse geocoding service using Axios
            const reverseGeocodingURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c6fadae8c10c40c599abef5ee21deef3`;
    
            try {
              // const response = await axios.get(reverseGeocodingURL);
              // const country = response.data.results[0].components.country;
              //setUserCountry(country);
              const response = await axios.get(reverseGeocodingURL);
              const countryObject = response.data.results[0].components;
              const countryCode = countryObject['ISO_3166-1_alpha-2']; // ISO country code
              SelectDefaultCountry(countryCode);
              
            } catch (error) {
              console.error('Error fetching geolocation data:', error);
              console.log('Error');
            }
          }, (error) => {
            console.error('Geolocation error:', error);
            console.log('Error');
          });
        } else {
          console.log('Geolocation not supported in this browser');
        }
      }, []);

    /*#########################[Functions]##################################*/
    const logIn = () =>{
        if (!loginD.Log) {toast.error( t('communUsed.logInPage.toast.addIdentif') , GConf.TostErrorGonf)}
        else if (!loginD.Pwd) {toast.error( t('communUsed.logInPage.toast.addPwd') , GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/LogIn`, {
                LoginData : loginD,
                systemTag : GConf.systemTag,
            }).then(function (response) {
                if(response.data[0] == 'true') {
                    toast.success( t('communUsed.logInPage.toast.successLog') , GConf.TostSuucessGonf)
                    if (!GConf.Offline) {
                        localStorage.setItem(`${response.data[1]}_${GConf.systemTag}_Offline`, JSON.stringify(GConf.offline_default_table));
                    }
                    localStorage.setItem('PID', response.data[1]);
                    localStorage.setItem(`${response.data[1]}_${GConf.systemTag}_LocalD`, JSON.stringify(GConf.offline_default_table));

                    //acording to country add position and launguage 
                    //i18n.changeLanguage(lan)
                    //localStorage.setItem('country', country);

                    window.location.href = "/";
                }
                else{
                    toast.error( t('communUsed.logInPage.toast.notfound') , GConf.TostSuucessGonf)
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

    const SelectDefaultCountry = (countryCode) => {
        switch (countryCode) {
            case 'TN':
                i18n.changeLanguage('fr_FR')
                break;
            case 'MA':
                i18n.changeLanguage('fr_FR')
                break;
            case 'EG':
                i18n.changeLanguage('en_US')
                break;
            case 'FR':
                i18n.changeLanguage('fr_FR')
                break;
            case 'IT':
                i18n.changeLanguage('it_IT')
                break;
            case 'GB':
                i18n.changeLanguage('en_US')
                break;
            case 'RU':
                i18n.changeLanguage('ru')
                break;
            case 'DE':
                i18n.changeLanguage('de_DE')
                break;
            case 'CA':
                i18n.changeLanguage('en_US')
                break;
            case 'US':
                i18n.changeLanguage('en_US')
                break;
            case 'SA':
                i18n.changeLanguage('en_US')
                break;
            case 'QA':
                i18n.changeLanguage('en_US')
                break;
            case 'AE':
                i18n.changeLanguage('en_US')
                break;
            case 'JA':
                i18n.changeLanguage('ja')
                break;
            case 'CN':
                i18n.changeLanguage('zh_CN')
                break;
            case 'IN':
                i18n.changeLanguage('hi')
                break;
            default:
                i18n.changeLanguage('en_US')
                break;
        }
        localStorage.setItem('country', countryCode);    
    }

    const SelectCountry = (lan, country) => {
        i18n.changeLanguage(lan)
        localStorage.setItem('country', country);    
    }


    /*#########################[Card]##################################*/
    const LeftCard = (props) =>{
        return(
            <>
            <div className='col-12 col-lg-4  text-center d-none d-lg-block fixed-top ' style={{backgroundColor:props.color, height:'100vh' }}>
                <h1  style={{marginTop:'30%'}} className='text-white'><img src="https://cdn.abyedh.com/Images/main-logo.gif" alt="." className="p-0" width="120px" height="120px"/></h1>
                <h1  style={{marginTop:'1%'}} className='text-white'><img src={`https://cdn.abyedh.com/images/ads/${GConf.systemTag}.svg`} alt="." className="p-0" width="300px" height="300px"/></h1>
            </div>
            </>
        )
    }
    const SubSystemLink = (props) => {

        return (<>
    
            <Segment className='p-2 sub-sys-round w-login-input mb-2'>
                <NavLink exact='true' to={props.data.link}>
                    <Grid>
                        <Grid.Column className="align-self-center" mobile={12} tablet={12} computer={13}>
                            <div className="d-flex align-self-center " style={{color: GConf.themeColor}}>
                                <div className="flex-shrink-0 ps-3 align-self-center">
                                <i className={`bi bi-${props.data.icon} bi-md`}></i>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h5 className="mb-2"> {t(`menusAndTabsName.alternativeLink.${props.number +1 }.title`)}   </h5>
                                    <small className='text-secondary'>  {t(`menusAndTabsName.alternativeLink.${props.number +1 }.descrip`)} </small>
                                </div>
                            </div>
                        </Grid.Column>
                        <Grid.Column className="p-4 text-center align-self-center pe-4" mobile={4} tablet={4} computer={3}>
                            <i className="bi bi-arrow-right-short bi-md" style={{color: GConf.themeColor}}></i>
                        </Grid.Column>
                    </Grid> 
                </NavLink>
            </Segment>
        </>);
    }

    return (<> 
        <LeftCard color={GConf.themeColor}/>
        <div className='row m-0'>
            <div className='col-12 col-md-1 col-lg-5'></div>
            <div className='col-12 col-md-10 col-lg-7'>
                <div className='row mt-3 mb-0'>
                    <div className='col-6'><Button className='me-3' onClick={() => navigate('/download')}><span className='bi bi-cloud-download'></span> {t('communUsed.logInPage.downloadBtn')} </Button></div>
                    <div className='col-6 text-end '>
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
                </div>
                     
                <div className='card-body mt-0 pt-0' >
                <Bounce left>
                            <br />
                            <h2 className='text-cente'><Icon name='linkify' /> {t('communUsed.logInPage.connectionTitle')} </h2>
                            
                            <div className='mb-3'>
                                <Input   icon='user' iconPosition='left' placeholder={t('communUsed.logInPage.identifiant')} className='shadow-sm w-login-input'  onChange={(e) => setLoginD({...loginD, Log: e.target.value })} />
                            </div>
                            <div className='mb-3'>
                                <Input  icon='key' iconPosition='left' placeholder={t('communUsed.logInPage.pwd')} type='password' className='shadow-sm w-login-input'  onChange={(e) => setLoginD({...loginD, Pwd: e.target.value })}/>
                            </div>
                            <div className='mb-3'>
                                <Button onClick={logIn}  style={{backgroundColor:GConf.themeColor, color:'white'}} className='shadow-sm w-login-input'><Icon name='sign in' /> {t('communUsed.logInPage.logInBtn')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                            </div>
                            <br />
                            <div className='border p-2   border-div w-login-input text-center'>
                                    <a href={`https://abyedh.com/S/I/add/${GConf.systemTag}`} target='c_blank'> <span className='bi bi-person-square'></span>  {t('communUsed.logInPage.inscrireLink')}  </a>
                            </div>
                            <br />
                            <Divider horizontal className='w-login-input mt-0 pt-0'>
                                <Header as='h4'>
                                    <Icon circular inverted name='thumbtack' color="yellow" />
                                </Header>
                            </Divider>
                            {GConf.SubSystemLink.map((data,index) => <SubSystemLink key={index} number={index} data={data} />)}
                    </Bounce>
                </div>
            </div>
        </div> 
    </>);
}

export default LogIn;