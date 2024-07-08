import React, { useEffect} from 'react';
import { Bounce } from 'react-reveal';
import { NavLink, Outlet } from 'react-router-dom';
import { Button, Dropdown, Modal, Popup } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function ProfileLandingPage() {
    /*#########################[Const]###########################*/
    let userData = JSON.parse(localStorage.getItem("UserData"));
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        const UIDisSet = localStorage.getItem('UID');
        if (!UIDisSet) {window.location.href = "/Profile/logIn";}
        
    })

    /*#########################[Function]###########################*/
    const logOutInput = () =>{    
        //localStorage.clear();
        localStorage.removeItem('UID')
        localStorage.removeItem('UserData')
        localStorage.removeItem('PID')
        localStorage.removeItem('APP_TAG')
        window.location.href = "/Profile";
    }

    /*#########################[Card]###########################*/
    /*style={{backgroundColor:'#4287f5'}}*/
    const MainTopCard = () =>{
        const TopAppBar = () =>{
            return(<>
                <div className='rounded-0 border-0 p-2 m-0 mt-2 ' >
                        <div className='row m-0'>
                            <div className='col-6 text-start align-self-center'>
                                <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                    <img  className="border-div-s bg-danger border border-danger" src="https://cdn.abyedh.com/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px', borderRadius: '10px 20px 10px 50px'}} />
                                </NavLink>
                                
                            </div>
                            <div className='col-6 align-self-center text-end' >
                                <img  className="rounded-circle p-0 m-0  ms-2" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />

                                {/* <Modal
                                    closeIcon
                                    centered={false}
                                    size='mini'
                                    dimmer='blurring'
                                    trigger={<img  className="rounded-circle p-0 m-0  ms-2" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />}
                                    >
                                    <Modal.Content className='mt-4' >
                                        <h5 className='text-center mb-2'>شكرا لمشاركتنا التجربة </h5> 
                                        <h5 className='text-center  '>لا تنسي العودة قريبا </h5> 
                                        <Button onClick={logOutInput}  size='mini' style={{backgroundColor:GConf.themeColor}} fluid className='rounded-pill text-white'  >تسجيل الخروج </Button>
                                    </Modal.Content>
                                </Modal>  */}
                            </div>     
                        </div>
                </div>
            </>)
        }
        const LandingCard = () =>{
            const MainLink = (props) => {
                return (<>
                    <NavLink exact="true" className={({ isActive  }) => isActive ? "p-3 abyedh-list" : "p-3 abyedh-list"} to={props.link}>
                            {({ isActive }) => (
                                <i className={`icons-a bi bi-${props.icon}${isActive ? '-fill ' : ' text-secondary'} bi-profile`}></i>
                            )}
                    </NavLink>
                </>)
            }

            return(<>
                <div className='border-0 bg-white rounded-0 text-center p-4 sticky-top shadow-bottom-card' dir={isRTL ? 'rtl' : 'ltr'} style={{margingTop:'80px', zIndex: 3}}>
                        {GConf.ProfileNavsData.map((links) => 
                                <MainLink key={links.id} name={links.name} link={links.link} icon={links.icon} />
                        )}
                </div>
            </>)
        }
        return(<>
                <TopAppBar />
                <LandingCard />
        </>)
    }

    return ( <>
            <Helmet>
                <title dir='rtl'>{userData.Name} </title>
                <meta name="description" content='الملف الشخصي , CV' />
            </Helmet>
            <MainTopCard />
            <br />                
            <br />  
            <div className='container' dir={isRTL ? 'rtl' : 'ltr'}>
                <div className='row justify-content-center'>
                    <div className='col-12 col-lg-8'>
                    <Outlet />
                    </div>
                </div> 
                
            </div>                          
        </> );
}

export default ProfileLandingPage;