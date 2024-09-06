import React from 'react';
import { NavLink } from 'react-router-dom';
import GConf from '../../../../AssetsM/generalConf'
import OneGConf from '../OneGConf';
import { useTranslation, Trans } from 'react-i18next';

function LinkCard(props) {
    const { t, i18n } = useTranslation();
    return ( <>
        <div className={`card card-body shadow-sm border-div mb-2 text-center h-100  ${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-1 text-light' : 'bg-hover-card' }`} style={{color: GConf.themeColor}}>
                <NavLink exact='true' to={props.data.link} className="stretched-link"></NavLink>
            <h1 className={`bi bi-${props.data.icon} bi-lg mb-0`} ></h1> 
            <h3>{t(`alternativeS.rdvPortail.mainPage.${props.data.link}`)} </h3>
        </div> 
    </> );
}

export default LinkCard;