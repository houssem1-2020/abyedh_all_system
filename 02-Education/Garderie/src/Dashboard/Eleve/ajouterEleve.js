import React, { useState } from 'react';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Select, TextArea } from 'semantic-ui-react';
import useGetCamion from '../../AssetsM/Hooks/fetchCamion';
import { toast } from 'react-toastify';
import axios from 'axios';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useEffect } from 'react';

const FindInDirectory = ({inDirArticle, setInDirA,FindInDirectoryFunc, loaderState, OnKeyPressFunc}) =>{
    return(<>
      <div className='card card-body border-div shadow-sm mb-3 mt-4'>
          <h5>Recherche Dans La Base Abyedh </h5>
          <Input className='mb-4' placeholder='UID' onKeyPress={event => OnKeyPressFunc(event)} value={inDirArticle} onChange={(e) => setInDirA(e.target.value)} />
          <div className='text-end'>
              <Button  className='bg-system-btn rounded-pill' fluid onClick={() => FindInDirectoryFunc()}>   <Icon name='search' /> Recherche <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
          </div>
      </div>
    </>)
}


function AjouterClient() {
    /*################[Variable]###############*/
    const Today = new Date()
    const [clientList, setClientList] = useState([]); 
    const [classListe, setClasseList] = useState([]); 
    const [inDirArticle, setInDirA] = useState();
    const [clientD, setClientD] = useState({EL_Naissance: Today.toISOString().split('T')[0] })
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [delegList ,setDelegList] = useState([]) 
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const clientSexe = [
        { key: 1 , value: 'af', text: 'Male' },
        { key: 2 , value: 'af', text: 'Female' },
      ]
    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/eleves`,{
            PID: GConf.PID
        })
        .then(function (response) {
            setClientList(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
              setClientList(Offline.client)
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
              setClientList(Offline.client)
            }
          });
    }, [])

    /*################[Function]###############*/    
    const GetDelegList = (value) =>{
        setClientD({...clientD, Gouv: value })
        let found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList([])
        setDelegList(found)
    }
    const checkClientExistance = () =>{
        if(clientD.CIN){
            const foundClient = clientList.find(element => element.CIN === clientD.CIN)
            if (foundClient) {
                toast.error("Client Exist Deja", GConf.TostErrorGonf)
                setClientD({...clientD, CIN: '' })
            }
            
        }
    }
    const SaveClient = (event) => {
        if (!clientD.CIN) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Deleg) {toast.error("Delegation Invalide !", GConf.TostErrorGonf)}
        else if (!clientD.Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/ajouter`, {
                PID : GConf.PID,
                clientD : clientD,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    setSaveBtnState(true)
                    toast.success("Client Ajouter !", GConf.TostSuucessGonf)
                    SaveNotification('clientAjouter',GConf.PID, clientD)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                    }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Le client sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                  Offline.clientToSave.push(clientD)
                  localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                  setLS(false)
                  setSaveBtnState(true)
                }
              });
                    
        }
                
    }
    const FindInDirectoryFunc = () =>{
        if (!inDirArticle) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/eleve/checkAbyedhDb`, {
                UID : inDirArticle,
            }).then(function (response) {
                if(response.data.length  != 0) {
                    toast.success("Client Existe !", GConf.TostSuucessGonf)
                    setLS(false)
                    setClientD({ ...clientD, Releted_PID: response.data.UID, Gouv: response.data.BirthGouv,   Name: response.data.Name, Phone : response.data.PhoneNum, Adress : response.data.BirthDeleg})
                }
                else{
                    toast.error('Pas De Clients ', GConf.TostSuucessGonf)
                    setLS(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
              });
            
        }
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }



    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.ClientAdd} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-7'>
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Name} onChange={(e) => setClientD({...clientD, Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Naissance:</h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={clientD.EL_Naissance} onChange={(e) => setClientD({...clientD, CIN: e.target.value })}/> 
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Sexe:</h5>
                            <Select placeholder='Choisir Une Region' options={clientSexe}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setClientD({...clientD, Gouv: data.value })} />  
                        </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Classe:</h5>
                            <datalist id="clientList">
                                {classListe.map((test) =>
                                <option key={test.ME_ID} value={test.ME_ID}>{test.ME_Name} : {test.Phone}</option>
                                )}
                            </datalist>
                            <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={clientD.Membre_ID}   onBlur={ (e) => setClientD({...clientD, Membre_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                        </div>
 
                    
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Geolocation</h5>
                            <div className='row'>
                                    <div className='col-12 col-lg-6'><Select placeholder='Selectionnez Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={clientD.gouv} onChange={(e, { value }) => GetDelegList(value)} /></div>
                                    <div className='col-12 col-lg-6'><Select placeholder='Selectionnez Delegation ' fluid value={clientD.Deleg} options={delegList} onChange={(e, { value }) => setClientD({...clientD, Deleg: value })} /></div>
                            </div>
                            
                            
                        </div>
 
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Adresse:</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' value={clientD.Adress} onChange={(e) => setClientD({...clientD, Adress: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={SaveClient} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>


                    <div className='col-lg-5 '>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Nom Du Pére :</h5>
                            <Input icon='home' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Social_Name} onChange={(e) => setClientD({...clientD, Social_Name: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Metier Du Pére:</h5>
                            <Input icon='home' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Social_Name} onChange={(e) => setClientD({...clientD, Social_Name: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Telephone Du Pére:</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Phone} onChange={(e) => setClientD({...clientD, Phone: e.target.value })} />
                        </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Nom Du Mére :</h5>
                            <Input icon='home' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Social_Name} onChange={(e) => setClientD({...clientD, Social_Name: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Metier Du Mére:</h5>
                            <Input icon='home' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Social_Name} onChange={(e) => setClientD({...clientD, Social_Name: e.target.value })}/>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Telephone Du Mére:</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' value={clientD.Phone} onChange={(e) => setClientD({...clientD, Phone: e.target.value })} />
                        </div>
 
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterClient;