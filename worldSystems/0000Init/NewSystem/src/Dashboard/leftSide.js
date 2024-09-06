import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';


function LeftSideCard() {
    const location = useLocation();
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const LogOut = () =>{
        //localStorage.clear();
        localStorage.removeItem(`PID`);
        window.location.href = "/login";
    }

 

    return (  <>
            <div className='col-12 col-lg-2  text-center d-none d-lg-block fixed-top border-end bg-white' style={{backgroundColor: 'transparent', height:'100vh', zIndex: 2, top:'60px' }}>
                <h1 className='text-white mt-0'><img src={`https://cdn.abyedh.com/images/ads/${GConf.systemTag}.svg`} alt="." className="p-0" width="120px" height="120px"/></h1>
                <div className='parent-div '>
                    <div className='child-div bg-white fixed-bottom'>
                        <div className="list-group list-group-flush text-start ps-1">
                            <NavLink to='Profile' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-person me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.profile`)}  </NavLink>
                            <NavLink to='Parametre' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-sliders me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.parametre`)}</NavLink>
                            <NavLink to='forum' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-chat-square-dots me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.forum`)}</NavLink>
                            <NavLink to='messages' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-envelope-heart me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.message`)}</NavLink>
                            <NavLink to='sauvgarder' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-cloud-download me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.sauvgarder`)}</NavLink>
                            <NavLink to='syncroniser' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-arrow-repeat me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.syncro`)}</NavLink>
                            <NavLink to='doc' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-journal-text me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.documentation`)}</NavLink>
                            <NavLink onClick={LogOut} exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-box-arrow-left me-2" style={{color: GConf.themeColor}}></i> {t(`menusAndTabsName.leftBar.deconextion`)}</NavLink>
                        </div>
                    </div>
                </div> 
            </div>
        </>
        );
}

export default LeftSideCard;