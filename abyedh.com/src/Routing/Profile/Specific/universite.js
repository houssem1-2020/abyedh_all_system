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

function UniversiteSpecific() {
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
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>  {t(`profilePage.SpesificData.${tag}.Tarifs`)} </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-cash-coin bi-lg'></span></h1>
          </div>
      </>)
  }
  const RoleTimeEstimateCard = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>  {t(`profilePage.SpesificData.${tag}.team`)}   </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-people-fill bi-lg'></span></h1>
          </div>
      </>)
  }
  const TarifCard = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center  '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}> {t(`profilePage.SpesificData.${tag}.stucture`)}ة </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-diagram-3-fill bi-lg'></span></h1>
          </div>
      </>)
  }
  const CertificatCard = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center  '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>   {t(`profilePage.SpesificData.${tag}.model`)} </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-columns-gap bi-lg'></span></h1>
          </div>
      </>)
  }
  const SimpleCard = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center  '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>   {t(`profilePage.SpesificData.${tag}.emploi`)} </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-calendar2-week bi-lg'></span></h1>
          </div>
      </>)
  }
  const SimpleCard2 = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center  '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>  {t(`profilePage.SpesificData.${tag}.exCalendar`)} </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-file-earmark-binary bi-lg'></span></h1>
          </div>
      </>)
  }
  const SimpleCard3 = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center  '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>   {t(`profilePage.SpesificData.${tag}.pubs`)}</h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-megaphone bi-lg'></span></h1>
          </div>
      </>)
  }
  const SimpleCard4 = () =>{
      return(<>
          <div className='card card-body shadow-sm border-div mb-4 text-center  '>
              <h5 className={`${isRTL ? 'text-end' :'text-start' }`} style={{color: GConf.ADIL[tag].themeColor}}>  جدول الأوقات </h5>
              <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-table bi-lg'></span></h1>
          </div>
      </>)
  }

  return ( <>
      <div className='row mt-4' >
          <div className='col-12 col-lg-4'> <SalleAttentCard  /> <RoleTimeEstimateCard /> <SimpleCard3 /> <SimpleCard4 /></div>
          <div className='col-12 col-lg-8'> <TarifCard /> <CertificatCard /> <SimpleCard /> <SimpleCard2 /> </div>

      </div>

  </> );
}
export default UniversiteSpecific;
