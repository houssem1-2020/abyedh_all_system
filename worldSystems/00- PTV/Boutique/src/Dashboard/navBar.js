import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'
import { Button, Icon, Modal, Dropdown, DropdownItem, List } from 'semantic-ui-react'
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'

function NavBar(props) {

    const { t, i18n } = useTranslation();
    const [activeIndex, setActiveIndex] = useState(0)
    const [openD, setOpenD] = useState(false)

    const MainLink = (props) => {
        return (<>
            <NavLink exact="true" className={({ isActive  }) => isActive ? "p-2 abyedh-list-a pb-main-tab" : "p-2 abyedh-list"} to={props.link}><i className={`icons-a bi bi-${props.icon}`}></i> {props.name}  <span className="d-none d-lg-inline"></span></NavLink>
        </>)
    }

    const LogOut = () =>{
        localStorage.removeItem(`PID`);
        window.location.href = "/login";
    }
    const Refresh = () =>{
        window.location.reload();
    }
    const MainSmallLink = (props) => {
        return (<>
            <div className='p-1 text-center ' >
            <NavLink exact="true" className={({ isActive  }) => isActive ? "p-2 text-system" : "p-2 text-secondary"} to={props.link}>
                <i className={`bi bi-${props.icon}`} style={{fontSize:'25px'}}></i>
                <h5 className='mt-0 mb-0'>{props.name}</h5> 
            </NavLink>
            </div>
            
        </>)
    }
    const SelectCountry = (lan, country) => {
        i18n.changeLanguage(lan)
        localStorage.setItem('country', country);
    }


    const OpenBottomSheetFunction = (genre) => {
        setActiveIndex(genre)
        setOpenD(!openD)
    }
    const MainCardNav = () => {
        return(<>
         <div className='row'>
            {GConf.NavsData.map((links) => 
                <div className="col-4" key={links.id}><MainSmallLink name={t(`menusAndTabsName.topBar.${links.link}`)} link={links.link} icon={links.icon} /></div>
            )}   
        </div>
        </>)
    }
    const SmallCardNav = () => {
        return(<>
            <div className='row'>
                <div className='col-4 col-lg align-self-center text-center '>
                    <NavLink to='Profile' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"} ><i className="bi bi-person bi-md "></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.profile`)}</h6>
                </div>
                <div className='col-4 col-lg align-self-center text-center '>
                    <NavLink to='Parametre' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-sliders bi-md"></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.parametre`)}</h6>
                </div> 
                <div className='col-4 col-lg align-self-center text-center '>
                    <NavLink to='forum' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-chat-square-dots bi-md"></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.forum`)}</h6>
                </div> 
                <div className='col-4 col-lg align-self-center text-center  '>
                    <NavLink to='messages' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-envelope-heart bi-md"></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.message`)}</h6>
                </div>
                <div className='col-4 col-lg align-self-center text-center  '>
                    <NavLink to='sauvgarder' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-cloud-download bi-md"></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.sauvgarder`)}</h6>
                </div>
                <div className='col-4 col-lg align-self-center text-center  '>
                    <NavLink to='syncroniser' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-arrow-repeat bi-md"></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.syncro`)}</h6>
                </div>
                <div className='col-4 col-lg align-self-center text-center border-end '>
                    <NavLink to='doc' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-journal-text bi-md "></i></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.documentation`)}</h6>
                </div> 
                <div className='col-4 col-lg align-self-center text-center'>
                    <NavLink onClick={LogOut} to='#' exact="true" className='ps-1 pe-1'><span className="bi bi-box-arrow-left bi-md"></span></NavLink>
                    <h6>{t(`menusAndTabsName.leftBar.deconextion`)}</h6>
                </div>   
            </div>
        </>)
    }
    const LanguageCard = () => {
        return(<>
        Text
        </>)
    }
    return (<>
        <div className="fixed-top" style={{zIndex: 3}} >
            <div className="rounded-0 p-3 pb-0 bg-white border-bottom blur-bckg-st">
                <div className="row">
                    <div className="col-3 col-md-2 mb-3 align-self-center text-left">
                        <img src="https://cdn.abyedh.com/Images/main-logo.png" alt="." className="p-0" width="40px" height="30px"/>
                    </div>
                    <div className="col-5 col-md-8 pb-3 align-self-center text-left navsha">
                        <div className="text-left d-none d-lg-block"> 
                            {GConf.NavsData.map((links) => 
                                <MainLink key={links.id} name={t(`menusAndTabsName.topBar.${links.link}`)} link={links.link} icon={links.icon} />
                            )}
                        </div>
                        <Button className="d-lg-none rounded-pill bg-system-btn" onClick={() => OpenBottomSheetFunction('main')}> <Icon name='list alternate outline' /> Menu</Button>
                       
                    </div>
                    <div className="col-4 col-md-2 mb-3  align-self-center text-end">
                        <Dropdown floating scrolling className='me-3 d-none d-lg-inline'   labeled  button direction='left'  icon={<span className='bi bi-translate bi-sm text-info'></span>}>
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
                        <NavLink onClick={Refresh} to='#' exact="true" className='ps-1 pe-3 mt-3 d-none d-lg-inline'><span className="bi bi-arrow-clockwise bi-sm text-danger"></span></NavLink>
                        <Button className="d-lg-none rounded-circle bg-system-btn" size='tiny' icon onClick={() => OpenBottomSheetFunction('small')}> <Icon name='expand arrows alternate' /></Button>
                    </div>
                </div>
            </div>
        </div>
        <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
            <div className='card-body'>
                
                { activeIndex =='main' ?   <MainCardNav /> : <></> }  
                { activeIndex == 'small' ?  <SmallCardNav /> : <></> }
                { activeIndex == 'language' ?  <LanguageCard /> : <></> }   
                </div>
        </BottomSheet>
    </>);
}

export default NavBar;
