import React, { useState } from 'react';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Select, Tab, TextArea } from 'semantic-ui-react';
import useGetCamion from '../../AssetsM/Hooks/fetchCamion';
import { toast } from 'react-toastify';
import axios from 'axios';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useEffect } from 'react';
import { QrReader } from 'react-qr-reader';

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
    const [patientList, setPatientList] = useState([]); 
    const [inDirArticle, setInDirA] = useState();
    const [patientD, setPatientD] = useState({PA_Naissance : new Date().toISOString().split('T')[0]})
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [delegList ,setDelegList] = useState([]) 
    const [scanResultSeance, setScanResultSeance] = useState(false);

    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const clientGenres = [
        { key: 1 , value: 'af', text: 'Alimentaire' },
        { key: 2 , value: 'af', text: 'Cosmetique' },
        { key: 3 , value: 'af', text: 'Medicale' },
    ]
    const panes = [
        {
            menuItem: { key: 'client', icon: 'user', content:  'Entrer' }, 
            render: () =><FindInDirectory inDirArticle={inDirArticle}  setInDirA={setInDirA} FindInDirectoryFunc={FindInDirectoryFunc} loaderState={loaderState} OnKeyPressFunc={OnKeyPressFunc} />,
        },
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Scaneer ' }, 
            render: () => <div className='card card-body border-div shadow-sm mb-1'>
                        {scanResultSeance ? 
                            (
                            <QrReader
                                    constraints={{  facingMode: 'environment' }}
                                    scanDelay={500}
                                    onResult={(result, error) => {
                                    if (!!result) { FindClintByUID(result.text)}
                                    if (!!error) { console.log(error);  }
                                    }}
                                    style={{  width: "150px",height: "150px" }}
                            />
                            ) : (
                                <div className='text-center mt-4'>
                                    <div className='bi bi-qr-code mb-4 bi-lg' style={{color: GConf.themeColor, fontSize:'150px'}}></div>
                                    <Button onClick={() => setScanResultSeance(true)}>Cliquer Pour Scanner</Button>
                                </div>
                            )}

            </div>,
        },
 
        
    ]

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/patient`,{
            PID: GConf.PID
        })
        .then(function (response) {
            setPatientList(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
              setPatientList(Offline.client)
            }
          });
    }, [])

    /*################[Function]###############*/    
    const GetDelegList = (value) =>{
        setPatientD({...patientD, Gouv: value })
        let found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList([])
        setDelegList(found)
    }
    const checkClientExistance = () =>{
        if(patientD.PA_Naissance){
            const foundClient = patientList.find(element => element.PA_Naissance === patientD.PA_Naissance)
            if (foundClient) {
                toast.error("Client Exist Deja", GConf.TostErrorGonf)
                setPatientD({...patientD, PA_Naissance: '' })
            }
            
        }
    }
    const SaveClient = (event) => {
        if (!patientD.PA_Naissance) {toast.error("Date de Naissance Invalide !", GConf.TostErrorGonf)}
        else if (!patientD.Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
        else if (!patientD.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
        else if (!patientD.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
        else if (!patientD.Deleg) {toast.error("Delegation Invalide !", GConf.TostErrorGonf)}
        else if (!patientD.Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/patient/ajouter`, {
                PID : GConf.PID,
                patientD : patientD,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    setSaveBtnState(true)
                    toast.success("Patint Ajouter !", GConf.TostSuucessGonf)
                    SaveNotification('clientAjouter',GConf.PID, patientD)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                    }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Le client sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                  Offline.clientToSave.push(patientD)
                  localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                  setLS(false)
                  setSaveBtnState(true)
                }
              });
                    
        }
                
    }
    const FindClintByUID = (valueUID) =>{
        // console.log(valueUID)
        // setInDirA(valueUID)
        // FindInDirectoryFunc();
        setScanResultSeance(false) 
    }
    const FindInDirectoryFunc = () =>{
        if (!inDirArticle) {toast.error("Entrer UID du Patient !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/patient/checkAbyedhDb`, {
                UID : inDirArticle,
            }).then(function (response) {
                if(response.data.length  != 0) {
                    toast.success("Client Existe !", GConf.TostSuucessGonf)
                    setLS(false)
                    setPatientD({ ...patientD, Releted_PID: response.data.UID, Gouv: response.data.BirthGouv,   Name: response.data.Name, Phone : response.data.PhoneNum, Adress : response.data.BirthDeleg})
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
                    <div className='col-12 col-lg-8'>
                         
                         <div className='p-1  mb-2'>
                            <h5 className='mb-1'>Nom Et Prenon :</h5>
                            <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Et Prenon ' className='w-100 border-0 shadow-sm rounded mb-1' value={patientD.Name} onChange={(e) => setPatientD({...patientD, Name: e.target.value })} />
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Date de Naissance:</h5>
                            <Input icon='key' type='date' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Date de Naissance' className='w-100 border-0 shadow-sm rounded mb-1' value={patientD.PA_Naissance} onBlur={checkClientExistance}   onChange={(e) => setPatientD({...patientD, PA_Naissance: e.target.value })}/>
                         </div>

                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Telephone :</h5>
                            <Input icon='phone' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Telephone ' className='w-100 border-0 shadow-sm rounded mb-1' value={patientD.Phone} onChange={(e) => setPatientD({...patientD, Phone: e.target.value })} />
                        </div>
                        {/* <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Nom Sociale:</h5>
                            <Input icon='home' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom Sociale' className='w-100 border-0 shadow-sm rounded mb-1' value={patientD.Social_Name} onChange={(e) => setPatientD({...patientD, Social_Name: e.target.value })}/>
                        </div> */}
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'>Geolocalisation</h5>
                            <Select placeholder='Selectionnez Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={patientD.gouv} onChange={(e, { value }) => GetDelegList(value)} />
                            <Select placeholder='Selectionnez Delegation ' fluid value={patientD.Deleg} options={delegList} onChange={(e, { value }) => setPatientD({...patientD, Deleg: value })} />
                        </div>
                        {/* <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Map:</h5>
                            <Select placeholder='Choisir Une Region' options={clientMap}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setPatientD({...patientD, Gouv: data.value })} />  
                           
                        </div> */}
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> Adresse:</h5>
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Adresse' className='w-100 shadow-sm rounded mb-3' value={patientD.Adress} onChange={(e) => setPatientD({...patientD, Adress: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={SaveClient} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>
                    <div className='col-lg-4 '>
                        <Tab menu={{  secondary: true  }} panes={panes} />
                        <br />  
                        <br />  
                        <br />  
                        <div className='text-center d-none d-lg-block  align-self-center'>
                                <img src='https://assets.ansl.tn/Images/usful/client-add.svg' width='80%'  height='200px' /> 
                        </div> 
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterClient;