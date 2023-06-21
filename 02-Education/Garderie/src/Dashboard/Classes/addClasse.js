import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Modal, Select, TextArea, TransitionablePortal } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import useGetFamillePlat from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
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

function AddPlatMenu() {
    /*#########################[Const]##################################*/
    const [niveaux] = useGetFamillePlat() 
    const [inDirArticle, setInDirA] = useState();  
    const [articles] = useGetArticles()  
    const [classeData, setClasseData] = useState({CL_Seasson: GConf.currentSeasson, });
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        if (niveaux.length == 0) {
            const timer = setTimeout(() => {
                setModalS(true);
              }, 1900);
              
              return () => clearTimeout(timer);
        }
      }, [niveaux])
    /*#########################[Functions ]##################################*/
    const SaveArticle = (event) => {
            if (!classeData.CL_Name) {toast.error("Nom est Invalide !", GConf.TostErrorGonf)}
            else if (!classeData.CL_Niveaux || classeData.Name == '') {toast.error("Niveaux est Invalide !", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/classes/ajouter`, {
                    PID : GConf.PID,
                    classeData : classeData,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        setSaveBtnState(false)
                        toast.success("Classes  Enregistreé !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> L'article sera enregistrer sue votre ordinateur </div></>, GConf.TostInternetGonf)   
                      Offline.articleToSave.push(classeData)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                  });
                
            }
            
    }  
    const checkArticleExistance = () =>{
        if(classeData.CL_ID){
            if(articles.includes(parseInt(classeData.CL_ID))) {
                toast.error("Article Exist Deja", GConf.TostErrorGonf)
                setClasseData({...classeData, CL_ID: '' })
            } 
        }
    }
    const checkPrixCompatiblite = () =>{
        if(classeData.Cout && classeData.Prix_vente){
            if(parseFloat(classeData.Cout) > parseFloat(classeData.Prix_vente)) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setClasseData({...classeData, Prix_vente: '', Cout: '' })
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
                    setClasseData({ ...classeData, CL_ID: response.data.CL_ID,  Name: response.data.Name, Groupage : response.data.Colis, Socite : response.data.Socite})
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
    /*  */

    return ( <>

            <BreadCrumb links={GConf.BreadCrumb.menuAddPlat} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <div className='row'>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Nom: </h5>
                                    <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={classeData.CL_Name}  onChange={(e) => setClasseData({...classeData, CL_Name: e.target.value })}/>
                                </div>
                        </div> 
                        <div className='row'>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Niveaux: </h5>
                                   <Select placeholder='Selectionner Une Famille' options={niveaux} className='w-100 shadow-sm rounded mb-3' value={classeData.CL_Niveaux} onChange={(e, data) => setClasseData({...classeData, CL_Niveaux: data.value })} />  
                                </div>
                        </div>
 
                            <div className='text-end mb-5'>
                                <Button onClick={SaveArticle}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`}  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                            </div>
                        </div>
                        <div className='col-lg-4 '>
 
                            <div className='text-center d-none d-lg-block  align-self-center'>
                                    <img src='https://assets.ansl.tn/Images/usful/articles-add.svg' width='80%'  height='200px' /> 
                            </div> 
                        </div>
                </div>
            </Bounce>
            <TransitionablePortal open={modalS} transition={{animation: 'fly up' , duration: 700 }}>
                <Modal  
                    //basic
                    size='mini'
                    open={modalS}
                    closeIcon
                    dimmer= 'blurring'
                    onClose={() => setModalS(false)}
                    onOpen={() => setModalS(true)}
                >
                    <Modal.Content>
                        <div className='text-center mt-5 mb-5'>
                            <h1 className='text-danger'>Vous n'avez pas aucune famille des plat</h1>
                            <span className='bi bi-layout-wtf bi-xlg system-color'></span> 
                            <NavLink to='/S/mu/famille'><h4>Ajouter des Famille Ici </h4></NavLink>
                        </div>
                    </Modal.Content>
                    
                </Modal> 
            </TransitionablePortal>
            
    </> );
}

export default AddPlatMenu;