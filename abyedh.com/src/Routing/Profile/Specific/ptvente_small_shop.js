 import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from 'semantic-ui-react'
import GConf from '../../../AssetsM/generalConf';
import { Form, TextArea, Input , Button, Icon, Loader} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import TableGrid from '../../../AssetsM/tableGrid';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function PtvEpecerieSpecific() {
    /* ############### Const #################*/
    let {tag} = useParams()
    const [rendyVousD, setRdvData] = useState([])
    const [loaderState, setLS] = useState(false)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /* ############### UseEffect #################*/

    /* ############### Functions #################*/
    const saveFunction = () =>{
        if (!rendyVousD.comment) {toast.error("أدخل التشخيص !", GConf.TostErrorGonf)}
        else if (!rendyVousD.date) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/LogIn`, {
                rendyVousData : rendyVousD,
            }).then(function (response) {

            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)
                  setLS(false)
                }
            });
        }
    }

    /* ############### Card #################*/
    const SalleAttentCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center '>
                <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>  {t(`profilePage.SpesificData.${tag}.team`)} </h5>
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-people bi-lg'></span></h1>
            </div>
        </>)
    }
    const Statistics = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center '>
                <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}> {t(`profilePage.SpesificData.${tag}.restingTime`)} </h5>
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-file-break bi-lg'></span></h1>
            </div>
        </>)
    }
    const CalendarCalssCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center  '>
                <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>  {t(`profilePage.SpesificData.${tag}.search`)} </h5>
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-search bi-lg'></span></h1>
            </div>
        </>)
    }
    const CalendarExamCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center  '>
                <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}> {t(`profilePage.SpesificData.${tag}.promo`)} </h5>
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-megaphone bi-lg'></span></h1>
            </div>
        </>)
    }
    const SimpleCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center  '>
                <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}> {t(`profilePage.SpesificData.${tag}.famille`)} </h5>
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-bookmarks-fill bi-lg'></span></h1>
            </div>
        </>)
    }
    return ( <>
        <div className='row mt-4' >
            <div className='col-12 col-lg-4'> <SalleAttentCard  />  <SimpleCard /> </div>
            <div className='col-12 col-lg-8'> <CalendarCalssCard /> <CalendarExamCard /> </div>
        </div>

    </> );
}

export default PtvEpecerieSpecific;
