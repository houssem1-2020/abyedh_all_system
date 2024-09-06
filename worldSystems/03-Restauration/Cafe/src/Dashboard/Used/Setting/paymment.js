import React, { useState } from 'react';
import {Button, Icon, Input, Loader} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GConf from '../../../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';

function PaymmentPage() {
    /* CONST  */
    const { t, i18n } = useTranslation();
    const [paymmentD, setPaymmentD] = useState({});
    const [loaderState, setLS] = useState(false)
    const [saveBtnState, setSaveBtnState] = useState(false)

    /* FUNCTION  */
    const SavePaymmentFunction = () =>{
        if (!paymmentD.Name) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Montant ) {toast.error("Montant Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Secret_Code) {toast.error("Secret_Code Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Location) {toast.error("Location Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.CodeP) {toast.error("CodeP Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.SharedApi}/parametre/paymment`, {
                PID : GConf.PID,
                Genre : GConf.systemTag,
                paymmentD : paymmentD,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Paymment Enregistreé !", GConf.TostSuucessGonf)
                    setLS(false)
                    setSaveBtnState(true)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5>  </div></>, GConf.TostInternetGonf)   
                   
                }
              });
            
        }
    }
    return (  <>
        <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
                <Link exaxt='true' to='/S/Parametre'><Button className='rounded-circle' icon='arrow left' /></Link>
                <br />
                <br />
                <div className='row'>
                    <div className='col-12 col-lg-9'>
                        <h4>
                            {t('communUsed.paymmentPage.textOne')}  ( <img src='https://moneygram.tn/images/logo.png' width={'90px'} height={'20px'} /> )  
                             {t('communUsed.paymmentPage.textTwo')}  Mr. KHELIFI HOUSSEM EDDINE <br />                            
                            {t('communUsed.paymmentPage.textThree')} : +216 96787676 <br />
                        </h4>
                    </div>
                    <div className='col-12 col-lg-3'>
                        <small>{t('communUsed.paymmentPage.montantAnnuel')} </small>
                        <h1 className='display-4 text-warning mt-0'>{t('communUsed.paymmentPage.montant')} {t('communUsed.paymmentPage.currency')} </h1>
                        
                    </div>
                </div> 
                
                <h5 className='text-danger'> {t('communUsed.paymmentPage.afterFinishAlert')}</h5>
                
                <h5 className='mb-1'> {t('communUsed.paymmentPage.nomText')}</h5>
                <Input icon='user' iconPosition='left'   placeholder={t('communUsed.paymmentPage.nomPlchText')}  className='w-100 border-0 shadow-sm rounded mb-3'   value={paymmentD.Name} onChange={(e) => setPaymmentD({...paymmentD, Name: e.target.value })} />

                <h5 className='mb-1 mt-1'> {t('communUsed.paymmentPage.montantText')} </h5>
                <Input icon='money bill alternate outline' iconPosition='left'   placeholder={t('communUsed.paymmentPage.montantPlchText')} className='w-100 border-0 shadow-sm rounded mb-3'   value={paymmentD.Montant} onChange={(e) => setPaymmentD({...paymmentD, Montant: e.target.value })} />

                <h5 className='mb-1 mt-1'> {t('communUsed.paymmentPage.codeText')} </h5>
                <Input icon='qrcode' iconPosition='left' type='number' placeholder={t('communUsed.paymmentPage.codePlchText')}  className='w-100 border-0 shadow-sm rounded mb-3'  value={paymmentD.Secret_Code} onChange={(e) => setPaymmentD({...paymmentD, Secret_Code: e.target.value })} />

                <h5 className='mb-1 mt-1'> {t('communUsed.paymmentPage.phoneText')} </h5>
                <Input icon='phone' iconPosition='left'   placeholder={t('communUsed.paymmentPage.phonePlchText')} className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.Phone} onChange={(e) => setPaymmentD({...paymmentD, Phone: e.target.value })} />

                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <h5 className='mb-1 mt-1'> {t('communUsed.paymmentPage.posteText')} </h5>
                        <Input icon='home' iconPosition='left'   placeholder={t('communUsed.paymmentPage.postePlchText')} className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.Location} onChange={(e) => setPaymmentD({...paymmentD, Location: e.target.value })} />
                    </div>
                    <div className='col-12 col-lg-4'>
                        <h5 className='mb-1 mt-1'>{t('communUsed.paymmentPage.postalCodeText')} </h5>
                        <Input icon='envelope' iconPosition='left'   placeholder={t('communUsed.paymmentPage.postalCodePlchText')} className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.CodeP} onChange={(e) => setPaymmentD({...paymmentD, CodeP: e.target.value })} />
                    </div>
                </div>
                
                
                <div className='text-end mb-5 mt-4'>
                    <Button onClick={SavePaymmentFunction}  className={`text-end rounded-pill bg-system-btn  `}  disabled={saveBtnState} positive>  <Icon name='save outline' /> {t('communUsed.paymmentPage.saveBtn')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
            </div>
        </div>

   
    </>);
}

export default PaymmentPage;