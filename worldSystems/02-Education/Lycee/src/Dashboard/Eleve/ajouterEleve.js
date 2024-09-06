import React, { useState } from 'react';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Select, TextArea } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useEffect } from 'react';


function AjouterClient() {
    /*################[Variable]###############*/
    const Today = new Date()
    const [eleveData, setEleveData] = useState({EL_Naissance: Today.toISOString().split('T')[0] })

    const [eleveListe, setEleveListe] = useState([]); 
    const [classListe, setClasseList] = useState([]); 
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [delegList ,setDelegList] = useState([]) 
    const [classeNow, setClasseNow] = useState([])

    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const clientSexe = [
        { key: 1 , value: 'male', text: 'Male' },
        { key: 2 , value: 'female', text: 'Female' },
    ]
    const patrantCivileEtat = [
        { key: 1 , value: 'male', text: 'Le père est mort' },
        { key: 2 , value: 'female', text: 'La mére est mort' },
        { key: 3 , value: 'female', text: 'Vivent Ensemble' },
        { key: 4 , value: 'female', text: 'Divorcé' },
        { key: 5 , value: 'female', text: 'Autre' },
    ]
    const etatSanitaire = [
        {value : 'En Bonne État', text : 'En Bonne État', key: 1},
        {value : 'Malade', text : 'Malade ', key: 2},
        {value : 'En Réanimation', text : 'En Réanimation', key: 3},
        {value : 'En Soins Palliatifs', text : 'En Soins Palliatifs', key: 4},
        {value : 'En Quarantaine', text : 'En Quarantaine', key: 5},
        {value : 'En Observation',text : 'En Observation', key: 6},
    ]

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/eleves`,{
            PID: GConf.PID
        })
        .then(function (response) {
            setEleveListe(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
              setEleveListe(Offline.client)
            }
        });

        axios.post(`${GConf.ApiLink}/classes`,{
            PID: GConf.PID
        })
        .then(function (response) {
            setClasseList(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
              setEleveListe(Offline.client)
            }
          });
    }, [])

    /*################[Function]###############*/    
    const GetDelegList = (value) =>{
        setEleveData({...eleveData, Gouv: value })
        let found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList([])
        setDelegList(found)
    }
    const SaveClient = (event) => {
        if (!eleveData.EL_Name) {toast.error("Nom et prenon  Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Naissance) {toast.error("Date de naissance Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Genre) {toast.error("Sexe est  Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Classe) {toast.error("Classes est  Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.Deleg) {toast.error("Delegation Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Etat_Sanitaire) {toast.error("Etat sanitaire  Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Pere_Nom) {toast.error("Nom du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Pere_Metier) {toast.error("Metier du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Pere_Phone) {toast.error("Phone du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Mere_Nom) {toast.error("Nom du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Mere_Metier) {toast.error("Metier du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Mere_Phone) {toast.error("Phone du parant est Invalide !", GConf.TostErrorGonf)}
        else if (!eleveData.EL_Parant_Etat_Civle) {toast.error("Etat civile des parant  est Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/ajouter`, {
                PID : GConf.PID,
                eleveData : eleveData,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    setSaveBtnState(true)
                    toast.success("Eleve Ajouter !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                    }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Le client sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                  Offline.clientToSave.push(eleveData)
                  localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                  setLS(false)
                  setSaveBtnState(true)
                }
              });
                    
        }
                
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const SelectClasseFunction = (value) => {
        if (value) {
            setEleveData({...eleveData, EL_Classe: value })
            let filtedClient = classListe.find((data) => data.CL_ID == value)
            setClasseNow(filtedClient)
        }
        
    }


    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.ClientAdd} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-person '></span> Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Name} onChange={(e) => setEleveData({...eleveData, EL_Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-calendar '></span> Naissance:</h5>
                            <Input icon='birthday cake' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={eleveData.EL_Naissance} onChange={(e) => setEleveData({...eleveData, 	EL_Naissance: e.target.value })}/> 
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-gender-male '></span>  Sexe:</h5>
                            <Select placeholder='Choisir Sexe' options={clientSexe}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setEleveData({...eleveData, EL_Genre: data.value })} />  
                        </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-box '></span> Classe:</h5>
                            <datalist id="eleveListe">
                                {classListe.map((test) =>
                                <option key={test.CL_ID} value={test.CL_ID}>{test.CL_Name} : {test.CL_Niveaux}</option>
                                )}
                            </datalist>
                            <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="eleveListe" placeholder={eleveData.Membre_ID}   onBlur={ (e) => SelectClasseFunction(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                            <div className='card-body border-div mb-4 mt-4 mb-3 bg-gray'>
                                <div className='row '>
                                    <div className='col-6 text-secondary'><span className='bi bi-boxes '></span>  Classe : {classeNow.CL_Name  ? classeNow.CL_Name  : ''}</div>
                                    <div className=' col-6 text-secondary'><span className='bi bi-view-list '></span> Niveaux : {classeNow.CL_Niveaux  ? classeNow.CL_Niveaux  : ''}</div>
                                </div>
                                </div>
                        </div>
 
                    
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-map '></span> Geolocation</h5>
                            <div className='row'>
                                    <div className='col-12 col-lg-6'><Select placeholder='Selectionnez Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={eleveData.gouv} onChange={(e, { value }) => GetDelegList(value)} /></div>
                                    <div className='col-12 col-lg-6'><Select placeholder='Selectionnez Delegation ' fluid value={eleveData.Deleg} options={delegList} onChange={(e, { value }) => setEleveData({...eleveData, Deleg: value })} /></div>
                            </div>
                        </div>
 
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-geo-alt '></span>  Adresse:</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Adresse' className='w-100 shadow-sm rounded mb-3' value={eleveData.EL_Adress} onChange={(e) => setEleveData({...eleveData, EL_Adress: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-heart-pulse '></span>  Etat Sanitaire :</h5>
                            <Select placeholder='Etat Sanitaire' options={etatSanitaire}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setEleveData({...eleveData, EL_Etat_Sanitaire: data.value })} />  
                        </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={SaveClient} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>


                    <div className='col-lg-5 '>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-person '></span>  Nom Du Pére :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Du Pére' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Pere_Nom} onChange={(e) => setEleveData({...eleveData, EL_Pere_Nom: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-star '></span>  Metier Du Pére:</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Metier Du Pére' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Pere_Metier} onChange={(e) => setEleveData({...eleveData, EL_Pere_Metier: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-phone '></span> Telephone Du Pére:</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone Du Pére ' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Pere_Phone} onChange={(e) => setEleveData({...eleveData, EL_Pere_Phone: e.target.value })} />
                        </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-person '></span>  Nom Du Mére :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Du Mére' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Mere_Nom} onChange={(e) => setEleveData({...eleveData, EL_Mere_Nom: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-star '></span>  Metier Du Mére:</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Metier Du Mére' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Mere_Metier} onChange={(e) => setEleveData({...eleveData, EL_Mere_Metier: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-phone '></span> Telephone Du Mére:</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone Du Mére ' className='w-100 border-0 shadow-sm rounded mb-1' value={eleveData.EL_Mere_Phone} onChange={(e) => setEleveData({...eleveData, EL_Mere_Phone: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1 text-secondary'><span className='bi bi-people '></span>  Etat civile des parant :</h5>
                            <Select placeholder='Etat civile' options={patrantCivileEtat}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setEleveData({...eleveData, EL_Parant_Etat_Civle: data.value })} />  
                        </div>

                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterClient;