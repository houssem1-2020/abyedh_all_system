import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Modal, Select, TextArea, TransitionablePortal } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import useGetFamilleEquipmment from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import useGetEquipemment from '../../AssetsM/Hooks/fetchEquipemment';
import axios from 'axios';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { NavLink } from 'react-router-dom';

const FindInDirectory = ({inDirArticle, setInDirA,FindInDirectoryFunc, loaderState, OnKeyPressFunc}) =>{
    return(<>
      <div className='card card-body border-div shadow-sm mb-3 mt-4'>
          <h5>Recherche Dans La Base Abyedh </h5>
          <Input className='mb-4' placeholder='Code A Barre' onKeyPress={event => OnKeyPressFunc(event)} value={inDirArticle} onChange={(e) => setInDirA(e.target.value)} />
          <div className='text-end'>
              <Button  className='bg-system-btn rounded-pill' fluid onClick={() => FindInDirectoryFunc()}>   <Icon name='search' /> Recherche <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
          </div>
      </div>
    </>)
}

function AddEquipemment() {
    /*#########################[Const]##################################*/
    const [familles] = useGetFamilleEquipmment() 
    const [inDirArticle, setInDirA] = useState();  
    const [articles, fullListe] = useGetEquipemment()  
    const [equipemmentD, setEquipemmentD] = useState({Groupage:1});
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        if (familles.length == 0) {
            const timer = setTimeout(() => {
                setModalS(true);
              }, 1900);
              
              return () => clearTimeout(timer);
        }
      }, [familles])


    /*#########################[Functions ]##################################*/
    const SaveEquipemment = (event) => {
            if (!equipemmentD.INS_Code) {toast.error("Code   Invalide !", GConf.TostErrorGonf)}
            else if (!equipemmentD.INS_Name ) {toast.error("Name Invalide !", GConf.TostErrorGonf)}
            else if (!equipemmentD.INS_Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
            else if (!equipemmentD.INS_Qte) {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
            else if (!equipemmentD.Description) {toast.error("Description Invalide !", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/equipemment/ajouter`, {
                    PID : GConf.PID,
                    equipemmentD : equipemmentD,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        setSaveBtnState(true)
                        toast.success("Equipemment Enregistreé !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> L'article sera enregistrer sue votre ordinateur </div></>, GConf.TostInternetGonf)   
                      Offline.articleToSave.push(equipemmentD)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                  });
                
            }
            
    }  
    const checkCodeEquipExistance = () =>{    
        if(equipemmentD.INS_Code){
            if(articles.includes(parseInt(equipemmentD.INS_Code))) {
                toast.error("Article Exist Deja", GConf.TostErrorGonf)
                setEquipemmentD({...equipemmentD, INS_Code: '' })
            } 
        }
    }
    const FindInDirectoryFunc = () =>{
        if (!inDirArticle) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/forfait/checkAbyedhDb`, {
                Code : inDirArticle,
            }).then(function (response) {
                if(response.data.length  != 0) {
                    toast.success("Article Connu !", GConf.TostSuucessGonf)
                    setLS(false)
                    setEquipemmentD({ ...equipemmentD, INS_Code: response.data.INS_Code,  Name: response.data.Name, Groupage : response.data.Colis, Socite : response.data.Socite})
                }
                else{
                    toast.error('Pas De Resultat ', GConf.TostSuucessGonf)
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
    const GenerateRandomCode = () =>{
        let randomNumber;

        do {
            randomNumber = Math.floor(Math.random() * (99999 - 111111 + 1)) + 11111;
        } while (articles.includes(randomNumber));

        setEquipemmentD({...equipemmentD, INS_Code: randomNumber })
    }
    /*  */

    return ( <>

            <BreadCrumb links={GConf.BreadCrumb.addEquipemment} />
            <br />
            <Bounce left>
                <div className='row'>
                       <div className='col-12 col-lg-8'>
                        <div className='row'>
                                <div className='col-12 col-lg-5'>
                                        <h5 className='mb-1'>Code  :  </h5>
                                        <Input icon='barcode' iconPosition='left' type='number' placeholder='code  ' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} onBlur={checkCodeEquipExistance} value={equipemmentD.INS_Code} onChange={(e) => setEquipemmentD({...equipemmentD, INS_Code: e.target.value })} />
                                    </div>
                                    <div className='col-12 col-lg-1 align-self-center'>
                                        <Button  icon className='rounded-circle mt-2' onClick={() => GenerateRandomCode()}><Icon name='add' /></Button>
                                    </div>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Nom: </h5>
                                    <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={equipemmentD.INS_Name}  onChange={(e) => setEquipemmentD({...equipemmentD, INS_Name: e.target.value })}/>
                                </div>
                        </div> 
                        <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Genre: </h5>
                                <Select placeholder='Selectionner Une Famille' options={familles} className='w-100 shadow-sm rounded mb-3' value={equipemmentD.INS_Genre} onChange={(e, data) => setEquipemmentD({...equipemmentD, INS_Genre: data.value })} />  
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Quantite  :</h5>
                                    <Input icon='boxes' iconPosition='left' type='number' placeholder='Quantite' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)}   value={equipemmentD.INS_Qte} onChange={(e) => setEquipemmentD({...equipemmentD, INS_Qte: e.target.value })} />
                                </div>
                        </div>
                        <div className='row'>
                            <h5 className='mb-1'>Description</h5>
                                <Form>
                                    <TextArea  rows="3" placeholder='Description' className='w-100 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)}  onChange={(e) => setEquipemmentD({...equipemmentD, Description: e.target.value })}/>
                                </Form> 
                        </div>
                        <div className='text-end mb-5'>
                            <Button onClick={SaveEquipemment} disabled={saveBtnState} className='text-end rounded-pill bg-system-btn '  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        </div>
                        <div className='col-lg-4 '>
                            <FindInDirectory inDirArticle={inDirArticle}  setInDirA={setInDirA} FindInDirectoryFunc={FindInDirectoryFunc} loaderState={loaderState} OnKeyPressFunc={OnKeyPressFunc} />
                            <br />  
                            <br />  
                            <br />  
                            <div className='text-center d-none d-lg-block  align-self-center'>
                                    <img src='https://assets.ansl.tn/Images/usful/articles-add.svg' width='80%'  height='200px' /> 
                            </div> 
                        </div>
                    </div>
            </Bounce>

            
    </> );
}

export default AddEquipemment;