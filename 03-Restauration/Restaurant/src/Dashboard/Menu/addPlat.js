import React, { useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Form, Icon, Input, Loader, Select, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import useGetFamillePlat from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import axios from 'axios';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';

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
    const [familles] = useGetFamillePlat() 
    const [inDirArticle, setInDirA] = useState();  
    const [articles] = useGetArticles()  
    const [articleD, setArticleD] = useState({Groupage:1});
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));

    /*#########################[Functions ]##################################*/
    const SaveArticle = (event) => {
            if (!articleD.P_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Name || articleD.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Genre) {toast.error("Genre Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Cout) {toast.error("Prix Achat Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Prix_vente) {toast.error("Prix Vente Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Prix_promo) {toast.error("Prix Promo Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Repture) {toast.error("Repture Invalide !", GConf.TostErrorGonf)}
            else if (!articleD.Description) {toast.error("Description Invalide !", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/menu/ajouter`, {
                    PID : GConf.PID,
                    articleD : articleD,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        setSaveBtnState('disabled')
                        toast.success("Article Enregistreé !", GConf.TostSuucessGonf)
                        setLS(false)
                        //SaveNotification('stockSaveArticle',GConf.PID, articleD)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> L'article sera enregistrer sue votre ordinateur </div></>, GConf.TostInternetGonf)   
                      Offline.articleToSave.push(articleD)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                  });
                
            }
            
    }  
    const checkArticleExistance = () =>{
        if(articleD.P_Code){
            if(articles.includes(parseInt(articleD.P_Code))) {
                toast.error("Article Exist Deja", GConf.TostErrorGonf)
                setArticleD({...articleD, P_Code: '' })
            } 
        }
    }
    const checkPrixCompatiblite = () =>{
        if(articleD.Cout && articleD.Prix_vente){
            if(parseFloat(articleD.Cout) > parseFloat(articleD.Prix_vente)) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setArticleD({...articleD, Prix_vente: '', Cout: '' })
            } 
        }
        
    }
    const FindInDirectoryFunc = () =>{
        if (!inDirArticle) {toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/stock/checkAbyedhDb`, {
                Code : inDirArticle,
            }).then(function (response) {
                if(response.data.length  != 0) {
                    toast.success("Article Connu !", GConf.TostSuucessGonf)
                    setLS(false)
                    setArticleD({ ...articleD, P_Code: response.data.P_Code,  Name: response.data.Name, Groupage : response.data.Colis, Socite : response.data.Socite})
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
                                    <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={articleD.Name}  onChange={(e) => setArticleD({...articleD, Name: e.target.value })}/>
                                </div>
                    </div> 
                    <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Code  :</h5>
                                    <Input icon='barcode' iconPosition='left' type='number' placeholder='code  ' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} onBlur={checkArticleExistance} value={articleD.P_Code} onChange={(e) => setArticleD({...articleD, P_Code: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Genre: </h5>
                                   <Select placeholder='Selectionner Une Famille' options={familles} className='w-100 shadow-sm rounded mb-3' value={articleD.Genre} onChange={(e, data) => setArticleD({...articleD, Genre: data.value })} />  
                                </div>
                    </div>
                    <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Cout: </h5>
                                    <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' value={articleD.Cout} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Cout: e.target.value })}/> 
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Prix Vente: </h5>
                                    <Input icon='dollar' iconPosition='left' type='number' placeholder='vente' value={articleD.Prix_vente} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_vente: e.target.value })}/>
                                </div>
                                
                    </div> 
                    <div className='row'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Prix Promo: </h5>
                                    <Input icon='dollar' iconPosition='left' type='number' placeholder='promo' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Prix_promo: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Repture du stock: </h5>
                                    <Input icon='angle double down' iconPosition='left' type='number' placeholder='Repture' className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setArticleD({...articleD, Repture: e.target.value })}/>
                                </div>
                    </div>
                    <div className='row'>
                        <h5 className='mb-1'>Description</h5>
                            <Form>
                                <TextArea  rows="3" placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)}  onChange={(e) => setArticleD({...articleD, Description: e.target.value })}/>
                            </Form> 
                        </div>
                        <div className='text-end mb-5'>
                            <Button onClick={SaveArticle}  className={`text-end rounded-pill bg-system-btn ${saveBtnState}`}  positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
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

export default AddPlatMenu;