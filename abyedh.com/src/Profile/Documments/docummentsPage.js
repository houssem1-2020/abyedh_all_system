import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import {Grid, _ } from "gridjs-react";
import { Button, Icon } from 'semantic-ui-react';
import { Select } from 'semantic-ui-react'
import { Bounce } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';


function DocummentPage() {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    
    const folderGenres = [
        {id:0, name:t('userProfile.docummentPage.itemsList.sante'), link:'sante', icon:'heart-pulse-fill', color:'#3048d1'},
        {id:0, name: t('userProfile.docummentPage.itemsList.education'), link:'education', icon:'mortarboard-fill', color:'#20274f'},
        {id:0, name: t('userProfile.docummentPage.itemsList.transport'), link:'transport', icon:'truck-front-fill', color:'#b5452f'},
        // {id:0, name:'t('userProfile.docummentPage.itemsList.sante'), link:'finance', icon:'currency-exchange', color:'#c9a30a'},
        // {id:0, name:t('userProfile.docummentPage.itemsList.sante'), link:'civile', icon:'building', color:'#137d13'},
        {id:0, name:t('userProfile.docummentPage.itemsList.sport'), link:'sport', icon:'bicycle', color:'#60bdd6'},
        // {id:0, name:t('userProfile.docummentPage.itemsList.sante'), link:'sociale', icon:'people-fill', color:'#e8276e'},
    ]
    const borderedfolderGenres = [
        {id:0, name:t('userProfile.docummentPage.itemsList.docs'), link:'document', icon:'file-earmark-break-fill', color:'##2766ee'},
        {id:0, name:t('userProfile.docummentPage.itemsList.subs'), link:'souscription', icon:'postcard-heart-fill', color:'#e8276e'},
        {id:0, name:t('userProfile.docummentPage.itemsList.factures'), link:'factures', icon:'receipt-cutoff', color:'#4287f5'},
        {id:0, name:t('userProfile.docummentPage.itemsList.recue'), link:'ticket', icon:'ticket-detailed-fill', color:'#4287f5'},
    ]
    const DocummentCard = (props) =>{
        return(<>
            <div className={`col-${props.fullW ? '12' : '6' } col-lg-3`}>
                <NavLink exact='true' to={`landing/${props.data.link}`}>
                    <div className={`card card-body bg-transparent mb-3 border-div shadow-sm document-hover ${props.bordered ? 'border-folder': ''}`}>
                        <div className='row'>
                            <div className='col-4 align-self-center text-center'>
                                    <span className={`bi bi-${props.data.icon} bi-md`} style={{color:props.data.color}}></span>
                            </div>
                            <div className={`col-8 align-self-center  ${isRTL ? 'text-end' : 'text-start'}`} >
                                    {props.data.name}
                            </div>
                        </div>
                    </div>
                </NavLink> 
            </div>
        </>)
    }
    return (  <>
        <Bounce bottom>
            <div className='card p-2  mb-4 border-0'>
                <h4 className={`${isRTL ? 'text-end': 'text-start'} text-secondary p-2`}> <span className='bi bi-folder2-open'></span> {t('userProfile.docummentPage.filesTile')} </h4> 
                <div className='row'>
                    { folderGenres.map((data,index) => <DocummentCard data={data} key={index} fullW />) }
                </div>
                
                <h4 className={`${isRTL ? 'text-end': 'text-start'} text-secondary p-2`}> <span className='bi bi-folder2-open'></span>  {t('userProfile.docummentPage.docummentTile')} </h4> 
                <div className='row'>
                    { borderedfolderGenres.map((data,index) => <DocummentCard data={data} key={index}  />) }
                </div>
            </div>
        </Bounce>
 
    </>);
}


export default DocummentPage;