import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Bounce } from 'react-reveal';
import { Button, Icon, Input, Loader } from 'semantic-ui-react';
import useGetCamion from '../../AssetsM/Hooks/fetchCamion';
import { toast } from 'react-toastify';
import axios from 'axios';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';

function AjouterCamion() {
    /*#########################[Const]##################################*/
    const [caisseD, setCaisseD] = useState([])
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));

    /*#########################[Function]##################################*/
    const SaveCamion = () => {
        if (!caisseD.CA_Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!caisseD.Caisse_Fond) {toast.error("Marque Invalide !", GConf.TostErrorGonf)}
        else if (!caisseD.Identifiant) {toast.error("Identifiant Invalide !", GConf.TostErrorGonf)}
        else if (!caisseD.Password) {toast.error("Mot De Passe Invalide !", GConf.TostErrorGonf)}
        else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/caisses/ajouter`, {
                    PID : GConf.PID,
                    caisseD : caisseD,
                }).then(function (response) {
                    console.log(response.data)
                    if(response.data.affectedRows) {
                        setSaveBtnState('disabled')
                        toast.success("Camion Ajouteé !", GConf.TostSuucessGonf)
                        setLS(false)
                        //SaveNotification('camionAjouter',GConf.PID, caisseD)
                    }
                    else {
                            toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                            setLS(false)
                        }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> Le Camion sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                      Offline.camionToSave.push(caisseD)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)

                    }
                });
                    
            }        
    }
    const GenrateKey = () =>{
        let ID = Math.random().toString(36).slice(2, 8);
        let PWD =  Math.floor(Math.random() * 1000000);
        setCaisseD({...caisseD, Identifiant: ID , Password:PWD})
    }


    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionAdd} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom:</h5>
                            <Input icon='desktop' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCaisseD({...caisseD, CA_Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Fond:</h5>
                            <Input icon='dollar sign' iconPosition='left' placeholder='Fond' className='w-100 border-0 shadow-sm rounded mb-1' onChange={(e) => setCaisseD({...caisseD, Caisse_Fond: e.target.value })}/>
                        </div>
                        <div className='row mb-3'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Identifiant:</h5>
                                    <Input icon='linkify' iconPosition='left' placeholder='identifiant'  className='w-100 border-0 shadow-sm rounded mb-3' value={caisseD.Identifiant} onChange={(e) => setCaisseD({...caisseD, Identifiant: e.target.value })} />
                                </div>
                                <div className='col-9 col-lg-5'>
                                    <h5 className='mb-1'>Mot De Pass: </h5>
                                    <Input icon='eye' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' value={caisseD.Password} onChange={(e) => setCaisseD({...caisseD, Password: e.target.value })}/>
                                </div>
                                <div className='col-3 col-lg-1 align-self-center'>
                                   <Button onClick={GenrateKey} className="rounded-pill " icon='random'></Button>
                                </div>
                        </div> 
                        <div className='text-end mb-5'>
                            <Button  onClick={SaveCamion}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`} positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>
                    <div className='col-lg-4 d-none d-lg-block align-self-center'>
                        <div className='text-center'>
                                <img src='https://assets.ansl.tn/Images/usful/camion-add.svg' width='80%'  height='200px' /> 
                        </div> 
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterCamion;