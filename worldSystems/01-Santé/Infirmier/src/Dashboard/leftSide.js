import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';



function LeftSideCard() {
    const location = useLocation();

    const LogOut = () =>{
        //localStorage.clear();
        localStorage.removeItem(`PID`);
        window.location.href = "/login";
    }

 

    return (  <>
            <div className='col-12 col-lg-2  text-center d-none d-lg-block fixed-top border-end bg-white' style={{backgroundColor: 'transparent', height:'100vh', zIndex: 999, top:'60px' }}>
                <h1 className='text-white mt-0'><img src={`https://cdn.abyedh.tn/images/ads/${GConf.systemTag}.svg`} alt="." className="p-0" width="120px" height="120px"/></h1>
                <div className='parent-div '>
                    <div className='child-div bg-white fixed-bottom'>
                        <div className="list-group list-group-flush text-start ps-1">
                            <NavLink to='Profile' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-person me-2" style={{color: GConf.themeColor}}></i> Profile</NavLink>
                            <NavLink to='Parametre' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-sliders me-2" style={{color: GConf.themeColor}}></i> Paramétre</NavLink>
                            <NavLink to='forum' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-chat-square-dots me-2" style={{color: GConf.themeColor}}></i> Forum</NavLink>
                            <NavLink to='messages' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-envelope-heart me-2" style={{color: GConf.themeColor}}></i> Messages</NavLink>
                            <NavLink to='sauvgarder' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-cloud-download me-2" style={{color: GConf.themeColor}}></i> Sauvegarder</NavLink>
                            <NavLink to='syncroniser' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-arrow-repeat me-2" style={{color: GConf.themeColor}}></i> Syncronisation</NavLink>
                            <NavLink to='doc' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-journal-text me-2" style={{color: GConf.themeColor}}></i> Documentation</NavLink>
                            <NavLink onClick={LogOut} exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list list-group-item list-group-item-action" : "ps-1 pe-1 abyedh-list list-group-item list-group-item-action"}><i className="bi bi-box-arrow-left me-2" style={{color: GConf.themeColor}}></i> Déconnextion</NavLink>
                        </div>
                    </div>
                </div> 
            </div>
        </>
        );
}

export default LeftSideCard;