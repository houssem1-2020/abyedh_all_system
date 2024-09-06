import React, { useEffect, useRef } from 'react';
import NavBar from './navBar';
import GConf from '../Assets/generalConf';
import { NavLink } from 'react-router-dom';
import { Button, Icon, Modal, List , Dropdown, DropdownItem } from 'semantic-ui-react'
import ReactGA from 'react-ga';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';


function MainPage() {
    const topRef = useRef(20)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const SelectCountry = (lan, country) => {
        i18n.changeLanguage(lan)
        localStorage.setItem('country', country);
        //navigate(`/`)
        //window.location.href = '/';

    }

    //useEffect
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" })
        ReactGA.pageview(window.location.pathname);
    }, [])

    /* Used Func */
    const PrintFunction = () =>{
        let objectTwo = {}
        for (const key in GConf.landing) {
            // Check if the current key is a property of the object (not inherited)
            if (Object.prototype.hasOwnProperty.call(GConf.landing, key)) {
              // Add the 'a' value to objectTwo with the same key
                let itemToAdd = {};
                // for (const item of GConf.landing[key].systemItemsList) {
                //     //itemToAdd[(item.id)] = item.posName;
                // }

                objectTwo[key] = GConf.landing[key].adsText //itemToAdd;
                //objectTwo[key] = GConf.ADIL[key].systemName;
            }
          }

        // for (const key in APPItem) {
        //     // Check if the current key is a property of the object (not inherited)
        //     if (Object.prototype.hasOwnProperty.call(APPItem, key)) {
        //       // Add the 'a' value to objectTwo with the same key
        //         let itemToAdd = {};
        //         // for (const item of APPItem[key].systemItemsList) {
        //         //     //itemToAdd[(item.id)] = item.posName;
        //         // }

        //         objectTwo[key] = APPItem[key].navItemList2 //itemToAdd;
        //         //objectTwo[key] = GConf.ADIL[key].systemName;
        //     }
        //   }
        // for (const key in APPItem) {
        //     if (Object.prototype.hasOwnProperty.call(APPItem, key)) {
        //         const navItemList2 = APPItem[key].navItemList2;
        //         if (navItemList2 && typeof navItemList2 === 'object') {
        //             let itemToAdd = {};
        //             for (const navIndexName in navItemList2) {
        //                 if (Object.prototype.hasOwnProperty.call(navItemList2, navIndexName)) {
        //                     let houssemToAdd = {};
        //                     //console.log(navItemList2[navIndexName])
                            
        //                     for (const itemHS of navItemList2[navIndexName]) {
        //                         houssemToAdd[(itemHS.navIndexName)] = itemHS.navName;
        //                     }

        //                     itemToAdd[navIndexName] = houssemToAdd //navItemList2[navIndexName][0].navName;
        //                 }
        //             }
        //             objectTwo[key] = itemToAdd;
        //         } else {
        //             console.error(`navItemList2 is not an object for key: ${key}`);
        //         }
        //     }
        // }
        console.log(objectTwo)
    }

    const TopCard = () =>{
        return(<>
            <div className="m-5 ">
                <div className='row'>
                    <div className={`col-4 d-none d-lg-block  ${isRTL ? 'order-1' : 'order-3'}`} ><img src="https://cdn.abyedh.com/images/required/log-img-1.gif" alt='.' className='img-responsive' width='100%' height='150px'/></div>
                    <div className={`col-12 col-lg-5 algin-self-center ${isRTL ? 'text-center' : 'text-start'} order-2`}  ><div><h1 className='text-danger display-3 mt-3'> <b>{t('mainPageLanding.mainTitle')} </b></h1></div></div>
                    <div className={`col-3 d-none d-lg-block  ${isRTL ? 'text-end order-3' : 'text-start order-1'}`}><img src="https://cdn.abyedh.com/images/required/log-img-2.gif" alt='.' className='img-responsive' width='70%' height='150px'/></div>
                </div>
            </div>
        </>)
    }
    const TopNavBar = () =>{
        let UID = localStorage.getItem('UID')
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3">
                    <img  className="rounded-circle p-0 m-0 me-3" src="https://abyedh.com/Assets/images/p_pic/15.gif"   alt="Logo" style={{width:'30px', height:'30px'}} />
                </NavLink>
            </>)
        }
        return(<>
                <div className="rounded-0 border-0 p-2 m-0 bg-danger navshad fixed-top" >
                    <div className='row'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                <img  className="border-div" src="https://cdn.abyedh.com/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px'}} />
                            </NavLink>
                        </div>
                        <div className='col-6 text-end align-self-center text-end'>
                            <Dropdown floating scrolling className='me-3'  labeled  button direction='left'  icon={<span className='bi bi-translate bi-sm text-white'></span>}>
                                <Dropdown.Menu >
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('en_US','US')}>  <img src="https://flagcdn.com/us.svg" className="img-responsive   border" width="10px" height="25px" /> English  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('ar_TN','TN')}>  <img src="https://flagcdn.com/sa.svg" className="img-responsive font-droid  border" width="10px" height="25px" /> العربية  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('fr_FR','FR')}>  <img src="https://flagcdn.com/fr.svg" className="img-responsive   border" width="10px" height="25px" /> Français  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('zh_CN','CN')}>  <img src="https://flagcdn.com/cn.svg" className="img-responsive   border" width="10px" height="25px" /> Chineese  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('hi','IN')}>  <img src="https://flagcdn.com/in.svg" className="img-responsive   border" width="10px" height="25px" /> Hindi  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('ru','RU')}>  <img src="https://flagcdn.com/ru.svg" className="img-responsive   border" width="10px" height="25px" /> Russian  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('ja','JP')}>  <img src="https://flagcdn.com/pa.svg" className="img-responsive   border" width="10px" height="25px" /> Japonny  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('de_DE','DE')}>  <img src="https://flagcdn.com/de.svg" className="img-responsive   border" width="10px" height="25px" /> Germany  </Dropdown.Item>
                                    <Dropdown.Item className='text-start' onClick={() => SelectCountry('it_IT','IT')}>  <img src="https://flagcdn.com/it.svg" className="img-responsive   border" width="10px" height="25px" /> Italy  </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            {/* {UID ? <UserCard />  : ''} */}
                        </div>
                    </div>
                </div>
            </>)
    }
    // const BottomCard = () =>{
    //     return(<>
    //         <div className='card-body rounded-bottom-card bg-danger'>
    //             <div className='row'>
    //                 <div className='col-12 col-lg-4 align-self-center d-none d-lg-block text-end'>
    //                     <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'> +216 96787676  - <span className='bi bi-telephone-outbound-fill' ></span></NavLink></div>
    //                     <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  abyedh@abyedh.com -  <span className='bi bi-mailbox2' ></span></NavLink></div>
    //                     <div className='d-inline mt-2'>
    //                         <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-facebook bi-md' ></span></NavLink></div>
    //                         <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-youtube bi-md' ></span></NavLink></div>
    //                         <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-app-indicator bi-md' ></span></NavLink></div>
    //                     </div>
    //                 </div>
    //                 <div className='col-7 col-lg-4 align-self-center text-end'>
    //                     <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  ماهي  رؤية منصة أبيض  - <span className='bi bi-patch-question-fill' ></span></NavLink></div>
    //                     <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  كيف استعمل المنصة  -  <span className='bi bi-brush-fill' ></span></NavLink></div>
    //                     <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'> من نحن ؟  -  <span className='bi bi-people-fill' ></span> </NavLink></div>
    //                 </div>
    //                 <div className='col-5 col-lg-4 align-self-center text-center'>
    //                     <img  className="rounded-pill-abyedh" src="https://cdn.abyedh.com/images/logo/mlogo.gif" alt="Logo" style={{width:'40px', height:'90px'}} />
    //                 </div>
    //             </div>
    //         </div>
    //     </>)
    // }
    const BottomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card bg-danger'>
                <div className='row'>
                    <div className={` col-12 col-lg-4 align-self-center d-none d-lg-block  ${isRTL ? 'text-end order-1' : 'text-start order-3'}  `}>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}> +216 96787676  - <span className='bi bi-telephone-outbound-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  khelifihoussem53@gmail.com -  <span className='bi bi-mailbox2' ></span></NavLink></div>
                        <div className='d-inline mt-2'>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-facebook bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-youtube bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-app-indicator bi-md' ></span></NavLink></div>
                        </div>
                    </div>
                    <div className={` col-7 col-lg-4 align-self-center order-2 ${isRTL ? 'text-end' : 'text-start'}  text-secondary`}>
                        <div className='mb-1'><NavLink exact='true' to='/About' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  {t('bottomCard.footerVision')} - <span className='bi bi-patch-question-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/Country' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  {t('bottomCard.footerHow')} -  <span className='bi bi-brush-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}> {t('bottomCard.footerWho')}  -  <span className='bi bi-people-fill' ></span> </NavLink></div>
                    </div>
                    <div className={` col-5 col-lg-4 align-self-center text-center  ${isRTL ? 'order-3' : 'order-1'}  `} >
                        <img  className="rounded-pill-abyedh-s" src="https://cdn.abyedh.com/images/logo/mlogo.gif" alt="Logo" style={{width:'40px', height:'90px', borderRadius: '10px 20px 10px 50px'}} />
                    </div>
                </div>
            </div>
        </>)
    }

    const AdsCard = () =>{
        return(<>
        <div className={`${isRTL ? 'text-end' : 'text-start'} jumbtron p-5 border-div`}  dir={isRTL ? 'rtl' : 'ltr'}>
            <div className="row">
                <div className="col-12 col-lg-4 align-self-center ">
                    <NavLink to={`ready`}>
                        <img src="https://cdn.abyedh.com/images/required/system-ads.svg" className="img-responsive mb-4"  width='100%' height='150px' />
                    </NavLink>
                </div>
                <div className="col-12 col-lg-8 align-self-center"> 
                    {t('mainPageLanding.adsText.mainText')}
                    <br /><br />
                    <small>{t('mainPageLanding.adsText.subText')}</small>
                </div>
            </div>
        </div>
        </>)
    }
    const LinkCard = (props) =>{
        return(<>
        <div className={`col-12 col-lg-${props.link.col} mb-2 p-1 `}>
            <NavLink to={`Landing/${props.link.tag}`}>
                <div className={`card border-div shadow-sm p-3 ${props.link.ready ? 'border-ready-s':''} ${props.link.next ? 'border-next-s':''}`} >
                    <div className="row">
                        <div className="col-3 align-self-center text-center">
                            <div className="icon icon-shape shadow" style={{backgroundColor: props.link.color}}>
                                <img src={`https://cdn.abyedh.com/Images/Search/WIcons/${props.link.img_url}`} className="img-responsive" width="100%" />
                            </div>
                        </div>
                        <div className="col-9 align-self-center  ">
                            <div className={`${isRTL ? 'text-end' : 'text-start'}  text-secondary   `}><h4><b>  {props.link.ready ? <span className='bi bi-check-circle-fill text-success'></span>: <>{props.link.next ? <span className='bi bi-play-circle-fill text-warning'></span>:''}</>} {t(`mainPageLanding.systemNames.${props.link.tag}`)}   </b></h4></div>
                        </div>
                    </div>
                </div>
            </NavLink>
            </div>
        </>)
    }
    const ContainerLinksCard = (props) =>{
        return(<>
            <div className={`${isRTL ? 'text-end' : 'text-start'} text-info mb-3`}  dir={isRTL ? 'rtl' : 'ltr'}><h5><b><span className="fa fa-shopping-cart"></span>  {t(`mainPageLanding.categoriesName.${props.data.tagNameItem}`)}  </b></h5></div>
            <div className="row">
                <div className={`col-12  col-lg-3 align-self-center ${props.data.genre === 'LI' ? 'order-sm-1 order-lg-2': ''}`}>
                    <img src={`https://cdn.abyedh.com/Images/img_ads/${props.data.adsUrl}`} className="img-responsive" width="80%" />
                </div>
                <div className="col-12 col-lg-9 align-self-center">
                    <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                        {props.data.Links.map( (linksData) => <LinkCard key={linksData.id} link={linksData}  />)}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </>)
    }
    return ( <>
        <TopNavBar />
        <div ref={topRef} />
        <br />
        <br />
        <br />
        <br />
        <TopCard />
        <br />
        <br />
        {/* <pre>{JSON.stringify(PrintFunction(), null, 4)}</pre> */}

        <div className='container'>
            <AdsCard />
            <br />
            <br />
            <br />
            {GConf.tabContainer.map( (tabData) => <ContainerLinksCard key={tabData.id} data={tabData}  />)}
        </div>
        <br />
        <br />
        <br />
        <BottomCard />
    </> );
}

export default MainPage;