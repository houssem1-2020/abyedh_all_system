import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from 'semantic-ui-react'
import GConf from '../../../AssetsM/generalConf';
import { Form, TextArea, Input , Button, Icon, Loader} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
//import { io } from "socket.io-client"
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function DocteurActions(props) {

    /* ############### Const #################*/
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const [rendyVousD, setRdvData] = useState({date:new Date().toISOString().split('T')[0] , time: new Date().toLocaleTimeString('fr-FR')})
    const [loaderState, setLS] = useState(false)
    const [disabledSaveBtn, setDisabledBtn] = useState(false)

    //SOket-io : it works cool in localhost but the problem with domaine name
    // const [notification, setNotification] = useState({message : 'this message', toId: `${props.TAG}-${props.PID}`});
    // const [userId, setUserId] = useState(`USER-${props.UID}`);
    // const socket = io(GConf.SoketLink, { query: { userId: `USER-${props.UID}`, }, });
    // socket.emit('saveRequest', { userId, message: notification });
    //fin socket.io



   /* ############### Functions #################*/
    const saveFunction = () =>{
        if (!rendyVousD.comment) {toast.error( t('profilePage.ActionTabData.ActionListeData.docteur.toest.one') , GConf.TostErrorGonf)}
        else if (!rendyVousD.date) {toast.error(t('profilePage.ActionTabData.ActionListeData.docteur.toest.two') , GConf.TostErrorGonf)}
        else if (!rendyVousD.time) {toast.error(t('profilePage.ActionTabData.ActionListeData.docteur.toest.three') , GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/Action/docteur-rdv`, {
                UID : props.UID,
                PID : props.PID ,
                TAG : props.TAG ,
                rendyVousData : rendyVousD,
            }).then(function (response) {
                toast.success(<><div><h5>  {t('profilePage.ActionTabData.ActionListeData.docteur.toest.four')}  </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
                setDisabledBtn(true)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>  {t('profilePage.ActionTabData.ActionListeData.docteur.toest.five')} </h5> {t('profilePage.ActionTabData.ActionListeData.docteur.toest.one')} </div></>, GConf.TostInternetGonf)
                  setLS(false)
                }
            });
        }
    }


    return ( <>
        <div className='m-0'>
                <div    dir={isRTL ? 'rtl' : 'ltr'}  className='card card-body shadow-sm pt-5 border-div'>
                    <h5 className='mb-0 ' style={{color: GConf.ADIL[props.TAG].themeColor}}> <span className='bi bi-person-x-fill'></span> {t('profilePage.ActionTabData.ActionListeData.docteur.fastDiagnostic')} </h5>
                    <small>  {t('profilePage.ActionTabData.ActionListeData.docteur.goodDiagnostic')}  </small>
                        <Form className='mb-3'>
                            <TextArea   rows={2} value={rendyVousD.comment} onChange={ (e,value) => setRdvData({...rendyVousD, comment:e.target.value})} />
                        </Form>
                    <h5 className='mb-0 ' style={{color: GConf.ADIL[props.TAG].themeColor}}> <span className='bi bi-calendar2'></span>  {t('profilePage.ActionTabData.ActionListeData.docteur.dateWanted')}  </h5>
                    <small>  {t('profilePage.ActionTabData.ActionListeData.docteur.dateDesc')} </small>
                        <Input className='mb-3' type='date' fluid alue={rendyVousD.date}  defaultValue={new Date().toISOString().split('T')[0]} onChange={(e) => setRdvData({...rendyVousD, date: e.target.value })}  />
                        <Input className='mb-3' type='time' fluid alue={rendyVousD.time}  defaultValue={new Date().toLocaleTimeString('fr-FR')} onChange={(e) => setRdvData({...rendyVousD, time: e.target.value })}  />
                    <div className='text-end'>
                        <Button className='rounded-pill' onClick={saveFunction} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor:GConf.ADIL[props.TAG].themeColor, color:'white'}} > <Icon name='save' />  {t('profilePage.ActionTabData.ActionListeData.docteur.saveBtn')}  <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
                </div>
        </div>
    </> );
}

export default DocteurActions;
