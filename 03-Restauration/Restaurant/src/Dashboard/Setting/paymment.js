import React, { useState } from 'react';
import {Button, Icon, Input, Loader} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import GConf from '../../AssetsM/generalConf';

function PaymmentPage() {
    /* CONST  */
    const [paymmentD, setPaymmentD] = useState({});
    const [loaderState, setLS] = useState(false)
    const [saveBtnState, setSaveBtnState] = useState(false)

    /* FUNCTION  */
    const SavePaymmentFunction = () =>{
        if (!paymmentD.P_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Name || paymmentD.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Cout) {toast.error("Prix Achat Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Prix_vente) {toast.error("Prix Vente Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Prix_promo) {toast.error("Prix Promo Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Repture) {toast.error("Repture Invalide !", GConf.TostErrorGonf)}
        else if (!paymmentD.Description) {toast.error("Description Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/menu/ajouter`, {
                PID : GConf.PID,
                paymmentD : paymmentD,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Article Enregistreé !", GConf.TostSuucessGonf)
                    setLS(false)
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
                            Le paiement se fait par un virement a travers la poste  <img src='https://www.poste.tn/image/gif/logo.gif' width={'20px'} height={'20px'} />  vers le propritaire <br />
                            Mr. khelifi houssem eddine - حسام الدين الخليفي <br />
                            CIN: 09914536 <br />
                            Tel : 96787676 
                        </h4>
                    </div>
                    <div className='col-12 col-lg-3'>
                        <small>Montant d'inscription annuel : </small>
                        <h1 className='display-3 text-warning mt-0'>500 D.T </h1>
                        
                    </div>
                </div> 
                
                <h5 className='text-danger'> Après avoir terminer le virement vous devez entrer les information ici : </h5>
                
                <h5 className='mb-1'> Le non avec lequel envoyer le mondat </h5>
                <Input icon='user' iconPosition='left'   placeholder='nom   ' className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.P_Code} onChange={(e) => setPaymmentD({...paymmentD, P_Code: e.target.value })} />

                <h5 className='mb-1 mt-1'> Code mondat </h5>
                <Input icon='qrcode' iconPosition='left' type='number' placeholder='mondat ' className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.P_Code} onChange={(e) => setPaymmentD({...paymmentD, P_Code: e.target.value })} />

                <h5 className='mb-1 mt-1'> Telephone </h5>
                <Input icon='phone' iconPosition='left'   placeholder='Tel  ' className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.P_Code} onChange={(e) => setPaymmentD({...paymmentD, P_Code: e.target.value })} />

                <h5 className='mb-1 mt-1'> Poste </h5>
                <Input icon='home' iconPosition='left'   placeholder='Poste  ' className='w-100 border-0 shadow-sm rounded mb-3'      value={paymmentD.P_Code} onChange={(e) => setPaymmentD({...paymmentD, P_Code: e.target.value })} />

                <div className='text-end mb-5 mt-4'>
                    <Button onClick={SavePaymmentFunction}  className={`text-end rounded-pill bg-system-btn  `}  disabled={saveBtnState} positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
            </div>
        </div>

   
    </>);
}

export default PaymmentPage;