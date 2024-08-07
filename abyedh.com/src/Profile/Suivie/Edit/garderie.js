import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from 'semantic-ui-react'
import GConf from '../../../AssetsM/generalConf';
import { Form, TextArea, Input , Button, Icon, Loader, Select} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

const InscrieCard = ({inscrieD, setInscrieD, SaveInscrie , disabledSaveBtn, tag, loaderState}) =>{
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

    const genres = [
        { key: 1 , value: t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.itemList.one') , text: t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.itemList.one') },
        { key: 2 , value: t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.itemList.two') , text: t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.itemList.two') },
    ]
    return(<>
            <h5 className='mb-0 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.name')} </h5>
            <small>اسم و لقب صغيرك</small>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.nameDesc')} value={inscrieD.EL_Name} onChange={(e) => setInscrieD({...inscrieD, EL_Name: e.target.value })} />

            <h5 className='mb-1' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-calendar2'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.birthDay')}   </h5>
            <Input className='mb-3' type='date' fluid  defaultValue={new Date().toISOString().split('T')[0]} value={inscrieD.EL_Naissance} onChange={(e) => setInscrieD({...inscrieD, EL_Naissance: e.target.value })} />

            <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>   {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.sexGenre')}  </h5>
            <Select className='mb-3'  fluid options={genres} onChange={(e, { value }) => setInscrieD({...inscrieD, EL_Genre: value })} />

           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>    {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.gouv')}     </h5>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.gouvDesc')} value={inscrieD.Gouv} onChange={(e) => setInscrieD({...inscrieD, Gouv: e.target.value })} />

           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.deleg')} </h5>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.delegDesc')} value={inscrieD.Deleg} onChange={(e) => setInscrieD({...inscrieD, Deleg: e.target.value })} />

           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.adresse')} </h5>
            <Form>
                <TextArea  rows="3"   placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.adresse')} className='w-100 shadow-sm rounded mb-3' value={inscrieD.EL_Adress} onChange={(e) => setInscrieD({...inscrieD, EL_Adress: e.target.value })}/>
            </Form>

           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.fadherName')} </h5>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.fadherName')} value={inscrieD.EL_Pere_Nom} onChange={(e) => setInscrieD({...inscrieD, EL_Pere_Nom: e.target.value })} />
           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.fadherPhone')} </h5>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.fadherPhone')} value={inscrieD.EL_Pere_Phone} onChange={(e) => setInscrieD({...inscrieD, EL_Pere_Phone: e.target.value })} />

           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.motherName')} </h5>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.motherName')} value={inscrieD.EL_Mere_Nom} onChange={(e) => setInscrieD({...inscrieD, EL_Mere_Nom: e.target.value })} />
           <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.motherPhone')} </h5>
            <Input className='mb-3' fluid icon='user' placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.motherPhone')} value={inscrieD.EL_Mere_Phone	} onChange={(e) => setInscrieD({...inscrieD, EL_Mere_Phone	: e.target.value })} />

            <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.comments')} </h5>
            <Form>
                <TextArea  rows="3"   placeholder={t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.comments')} className='w-100 shadow-sm rounded mb-3' value={inscrieD.Comment} onChange={(e) => setInscrieD({...inscrieD, Comment: e.target.value })}/>
            </Form>

            <div className='text-end'>
                <Button className='rounded-pill' disabled={disabledSaveBtn} onClick={SaveInscrie} size='small' icon style={{backgroundColor:GConf.ADIL[tag].themeColor, color:'white'}} > <Icon name='save' />  {t('profilePage.ActionTabData.ActionListeData.garderie.InscrieCard.saveBtn')}   <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
            </div>
    </>)
 }
 const SouscrieCard = ({souscrieD, setSouscrieD, SaveSouscrie, disabledSaveBtn, tag, loaderState }) =>{
   const { t, i18n } = useTranslation();
   const isRTL = detectRTL.isRtlLang(i18n.language);
    return(<>
            <div><small>
              {t('profilePage.ActionTabData.ActionListeData.garderie.souscrirCard.smallText')}
            </small></div>
            <h5 className='mb-0 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.souscrirCard.idName')}  </h5>
            <small> {t('profilePage.ActionTabData.ActionListeData.garderie.souscrirCard.idDesc')} </small>
            <Input className='mb-3' fluid icon='user' placeholder='' />

            <h5 className='mb-0 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-calendar2'></span>  {t('profilePage.ActionTabData.ActionListeData.garderie.souscrirCard.saisson')}   </h5>
            <small>{t('profilePage.ActionTabData.ActionListeData.garderie.souscrirCard.saissonDesc')} </small>
            <Input className='mb-3' type='date' fluid  defaultValue={new Date().toISOString().split('T')[0]} />
            <div className='text-end'>
                <Button className='rounded-pill' disabled={disabledSaveBtn} onClick={SaveSouscrie} size='small' icon style={{backgroundColor:GConf.ADIL[tag].themeColor, color:'white'}} > <Icon name='save' />   {t('profilePage.ActionTabData.ActionListeData.garderie.souscrirCard.saveBtn')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
            </div>
    </>)
 }

function GarderieActions(props) {
    /* ############### Const #################*/
    const [inscrieD, setInscrieD] = useState([])
    const [souscrieD, setSouscrieD] = useState([])
    const [loaderState, setLS] = useState(false)
    const [disabledSaveBtn, setDisabledBtn] = useState(false)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const panes = [
        {
          menuItem: { key: 'save', icon: 'edit outline', content:  <span className='me-2'>  تسجيل  </span> , dir:'rtl'},
          render: () => <Tab.Pane className='border-div shadow-sm' attached={false} dir={isRTL ? 'rtl' : 'ltr'}> <InscrieCard inscrieD={inscrieD} setInscrieD={setInscrieD} SaveInscrie={SaveInscrie} disabledSaveBtn={disabledSaveBtn} tag={props.TAG} loaderState={loaderState} /></Tab.Pane>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content:  <span className='me-2'>  ترسيم  </span> , dir:'rtl' },
            render: () => <Tab.Pane className='border-div shadow-sm' attached={false} dir={isRTL ? 'rtl' : 'ltr'}><SouscrieCard souscrieD={souscrieD} setSouscrieD={setSouscrieD} SaveSouscrie={SaveSouscrie} disabledSaveBtn={disabledSaveBtn} tag={props.TAG} loaderState={loaderState} /></Tab.Pane>,
        },
    ]

    /* ############### UseEffect #################*/

    /* ############### Functions #################*/
    const SaveInscrie = () =>{
        if (!inscrieD.EL_Name) {toast.error("أدخل الاسم و اللقب  !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Naissance) {toast.error("ادخل تاريخ الميلاد  !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Genre) {toast.error("ادخل الحنس   !", GConf.TostErrorGonf)}
        else if (!inscrieD.Gouv) {toast.error("ادخل الولاية   !", GConf.TostErrorGonf)}
        else if (!inscrieD.Deleg) {toast.error("ادخل المعتمدية   !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Adress) {toast.error("ادخل الغعنوان   !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Pere_Nom) {toast.error("ادخل اسم الاب   !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Pere_Phone) {toast.error("ادخل هاتف الاب   !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Mere_Nom) {toast.error("ادخل اسم الام    !", GConf.TostErrorGonf)}
        else if (!inscrieD.EL_Mere_Phone) {toast.error("ادخل هاتف الام    !", GConf.TostErrorGonf)}
        else if (!inscrieD.Comment) {toast.error("ادخل تعليق إضافي    !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/Action/garderie-inscrie`, {
                UID : props.UID,
                PID : props.PID ,
                TAG : props.TAG ,
                inscrieData : inscrieD,
            }).then(function (response) {
                toast.success(<><div><h5>تم التسجيل بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
                setDisabledBtn(true)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)
                  setLS(false)
                }
            });
        }
    }
    const SaveSouscrie = () =>{
        if (!souscrieD.comment) {toast.error("أدخل التشخيص !", GConf.TostErrorGonf)}
        else if (!souscrieD.date) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/Action/garderie-souscrie`, {
                UID : props.UID,
                PID : props.PID ,
                TAG : props.TAG ,
                souscrieData : souscrieD,
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

    return ( <>
    <div className='m-0' dir={isRTL ? 'rtl' : 'ltr'}>
        <Tab menu={{secondary: true , selected: { backgroundColor: 'purple' },  dir : 'ltr' , style:{justifyContent: 'right',} }} className='yes-menu-tabs' panes={panes} />
    </div>

    </> );
}

export default GarderieActions;
