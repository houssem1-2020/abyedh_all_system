
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Tab } from 'semantic-ui-react'
import GConf from '../../../AssetsM/generalConf';
import { Form, TextArea, Input , Button, Icon, Loader} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function LaboSpecific(props) {

    /* ############### Const #################*/
    const [rendyVousD, setRdvData] = useState({date:new Date().toISOString().split('T')[0] , time: new Date().toLocaleTimeString('fr-FR')})
    const [loaderState, setLS] = useState(false)
    const [disabledSaveBtn, setDisabledBtn] = useState(false)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const raisonOptions = [
        { key: '1', value: t('profilePage.ActionTabData.ActionListeData.labo.optionList.one'), text: t('profilePage.ActionTabData.ActionListeData.labo.optionList.one')  },
        { key: '2', value: t('profilePage.ActionTabData.ActionListeData.labo.optionList.two'), text: t('profilePage.ActionTabData.ActionListeData.labo.optionList.two') },
        { key: '3', value: t('profilePage.ActionTabData.ActionListeData.labo.optionList.three'), text: t('profilePage.ActionTabData.ActionListeData.labo.optionList.three') },
        { key: '4', value: t('profilePage.ActionTabData.ActionListeData.labo.optionList.four') , text: t('profilePage.ActionTabData.ActionListeData.labo.optionList.four')  },
        { key: '5', value: t('profilePage.ActionTabData.ActionListeData.labo.optionList.five'), text: t('profilePage.ActionTabData.ActionListeData.labo.optionList.five') },
        { key: '6', value: t('profilePage.ActionTabData.ActionListeData.labo.optionList.six') , text: t('profilePage.ActionTabData.ActionListeData.labo.optionList.six') },
      ]

   /* ############### Functions #################*/
    const saveFunction = () =>{
        if (!rendyVousD.RDV_Cause) {toast.error("أدخل التشخيص !", GConf.TostErrorGonf)}
        else if (!rendyVousD.RDV_Date) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else if (!rendyVousD.RDV_Time) {toast.error("ادخل الوقت  !", GConf.TostErrorGonf)}
        else if (!rendyVousD.Comment) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/Action/labo-rdv`, {
                UID : props.UID,
                PID : props.PID ,
                TAG : props.TAG ,
                rendyVousData : rendyVousD,
            }).then(function (response) {
                toast.success(<><div><h5>تم تسجيل الموعد بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
                setDisabledBtn(true)
            }).catch((error) => {
                if(error.request) {
                toast.error(<><div><h5> لم يتم تسجيل الموعد</h5> حاول مرة أخري  </div></>, GConf.TostInternetGonf)
                setLS(false)
                }
            });
        }
    }


    return ( <>
        <div className='m-0'>
                <div   dir='rtl' className='card card-body shadow-sm pt-4 border-div'>
                       <h5 className='mb-1 ' style={{color: GConf.ADIL[props.TAG].themeColor}}> <span className='bi bi-person-x-fill'></span> {t('profilePage.ActionTabData.ActionListeData.labo.rdvCause')}  </h5>
                       <Select options={raisonOptions} fluid placeholder={t('profilePage.ActionTabData.ActionListeData.labo.chooseCause')} className='mb-3' onChange={(e, data) => setRdvData({...rendyVousD, RDV_Cause: data.value })}  />

                        <h5 className='mb-0 mt-0' style={{color: GConf.ADIL[props.TAG].themeColor}}> <span className='bi bi-calendar2'></span>   {t('profilePage.ActionTabData.ActionListeData.labo.rdvDate')}   </h5>

                        <div className='row'>
                            <div className='col-6'><Input className='mb-3' type='date' fluid alue={rendyVousD.RDV_Date}  defaultValue={new Date().toISOString().split('T')[0]} onChange={(e) => setRdvData({...rendyVousD, RDV_Date: e.target.value })}  /></div>
                            <div className='col-6'><Input className='mb-3' type='time' fluid alue={rendyVousD.RDV_Time}  defaultValue={new Date().toLocaleTimeString('fr-FR')} onChange={(e) => setRdvData({...rendyVousD, RDV_Time: e.target.value })}  /></div>
                        </div>


                        <h5 className='mb-0 mt-1' style={{color: GConf.ADIL[props.TAG].themeColor}}> <span className='bi bi-person-x-fill'></span> {t('profilePage.ActionTabData.ActionListeData.labo.comments')}    </h5>

                        <Form className='mb-3'>
                            <TextArea   rows={2} value={rendyVousD.Comment} onChange={ (e,value) => setRdvData({...rendyVousD, Comment:e.target.value})} />
                        </Form>

                    <div className='text-end'>
                        <Button className='rounded-pill' onClick={saveFunction} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor:GConf.ADIL[props.TAG].themeColor, color:'white'}} > <Icon name='save' />  {t('profilePage.ActionTabData.ActionListeData.labo.saveBtn')}  <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
                </div>
        </div>
    </> );
}

export default LaboSpecific;
