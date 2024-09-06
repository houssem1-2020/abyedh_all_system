import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import TunMap from '../../AssetsM/tunMap';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Icon, Input, Statistic, Form, Loader, Select, TextArea } from 'semantic-ui-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { _ } from "gridjs-react";
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { toast } from 'react-toastify';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useTranslation, Trans } from 'react-i18next';

const EditFSCard = ({fournisseurData, setFSData, EditClient,delegList,GetDelegList,loaderState}) =>{
    const { t, i18n } = useTranslation();
    const tableaux = [
        { key: 1 , value: 'af', text: 'A' },
        { key: 2 , value: 'af', text: 'O' },
        { key: 3 , value: 'af', text: 'C' },
        { key: 3 , value: 'af', text: 'B' },
      ]
  
      const gpb = [
          { key: 1 , value: 'af', text: 'Générique' },
          { key: 2 , value: 'af', text: 'Princeps' },
          { key: 3 , value: 'af', text: 'Biosimilaire' },
        ]
  
        const VEIC = [
          { key: 1 , value: 'af', text: 'Vital' },
          { key: 2 , value: 'af', text: 'Essentiel' },
          { key: 3 , value: 'af', text: 'Intermédiaire' },
          { key: 3 , value: 'af', text: 'Confort' },
        ]
        return(<>
            <div className='p-1'>
                            <div className='row'>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Nom:</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Nom}   onChange={(e) => setFSData({...fournisseurData, Nom: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Dosage :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Dosage ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Dosage} onChange={(e) => setFSData({...fournisseurData, Dosage: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Forme :</h5>
                                    <Select placeholder='Choisir Une Region' options={tableaux}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, Forme: data.value })} />
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Presentation:</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Presentation' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Presentation}   onChange={(e) => setFSData({...fournisseurData, Presentation: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>DCI :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='DCI ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.DCI} onChange={(e) => setFSData({...fournisseurData, DCI: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Classe :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Classe ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Classe} onChange={(e) => setFSData({...fournisseurData, Classe: e.target.value })} />
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Sous_Classe:</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Sous_Classe' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Sous_Classe}   onChange={(e) => setFSData({...fournisseurData, Sous_Classe: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Laboratoire :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Laboratoire ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Laboratoire} onChange={(e) => setFSData({...fournisseurData, Laboratoire: e.target.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>AMM :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='AMM ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.AMM} onChange={(e) => setFSData({...fournisseurData, AMM: e.target.value })} />
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Date_AMM:</h5>
                                    <Input icon='medkit' type='date' iconPosition='left'   className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Date_AMM}   onChange={(e) => setFSData({...fournisseurData, Date_AMM: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Conditionnement_primaire :</h5>
                                    <Form>
                                        <TextArea  rows="3" placeholder='Conditionnement_primaire' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Conditionnement_primaire} onChange={(e) => setFSData({...fournisseurData, Conditionnement_primaire: e.target.value })}/>
                                    </Form>
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Specifocation :</h5>
                                    <Form>
                                        <TextArea  rows="3" placeholder='Specifocation' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Specifocation} onChange={(e) => setFSData({...fournisseurData, Specifocation: e.target.value })}/>
                                    </Form>
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Tableau:</h5>
                                    <Select placeholder='Choisir Une Region' options={tableaux}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, Tableau: data.value })} />  
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>Duree_de_conservation :</h5>
                                    <Input icon='medkit' iconPosition='left' placeholder='Duree_de_conservation ' className='w-100 border-0 shadow-sm rounded mb-1' value={fournisseurData.Duree_de_conservation} onChange={(e) => setFSData({...fournisseurData, Duree_de_conservation: e.target.value })} />
                                </div>
                                <div className='col-12   p-1 mb-2'>
                                    <h5 className='mb-1'>Indications :</h5>
                                    <Form>
                                        <TextArea  rows="3" placeholder='Indications' className='w-100 shadow-sm rounded mb-3' value={fournisseurData.Indications} onChange={(e) => setFSData({...fournisseurData, Indications: e.target.value })}/>
                                    </Form>
                                </div>

                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>G_P_B:</h5>
                                    <Select placeholder='Choisir Une Region' options={gpb}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, G_P_B: data.value })} />
                                </div>
                                <div className='col-12 col-lg-6 p-1 mb-2'>
                                    <h5 className='mb-1'>VEIC :</h5>
                                    <Select placeholder='Choisir Une Region' options={VEIC}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => setFSData({...fournisseurData, VEIC: data.value })} />
                                </div>
                            </div>
                        <div className='text-end mb-5'>
                            <Button  onClick={EditClient}  className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
                        </div>
                    </div>
    </>)
}
 

function FournisseurInfo() {
         /* ############################### Const ################################*/
         const { t, i18n } = useTranslation();
         const {MEID} = useParams()
         const [fournisseurData, setFSData] = useState([])
         const [position, setPosition] = useState([36.17720,9.12337])
         const [commande, setCommande] = useState([])
         const [factures, setFactures] = useState([])
         const [factureCamion, setFactureCamion] = useState([])
         const [loading , setLoading] = useState(false)
         const [inDirArticle, setInDirA] = useState();
         const [fromDirectory, setFromDir] = useState([]);
         const [loaderState, setLS] = useState(false)
         const [delegList ,setDelegList] = useState([]) 
         const panes = [
              {
                  menuItem: { key: 'dfgdrZ', icon: 'file text', content: t('menuTabs.ordonancePage.stockCard.infoCard.tabsText.info') }, 
                  render: () =><Tab.Pane className='border-div' attached={false}><MedicammentInfo  /></Tab.Pane> ,
              },
              {
                menuItem: { key: 'edit', icon: 'edit', content: t('menuTabs.ordonancePage.stockCard.infoCard.tabsText.modifier') }, 
                render: () => <><Tab.Pane className='border-div' attached={false}>{ loading && fournisseurData.PID != 'ABYEDH' ?  <EditFSCard fournisseurData={fournisseurData} setFSData={setFSData} EditClient={EditClient} delegList={delegList} GetDelegList={GetDelegList}  loaderState={loaderState}/> : <PublicMedicamment /> }</Tab.Pane><br /></>,
              },
 
             {
                 menuItem: { key: 'delete', icon: 'trash alternate', content: t('menuTabs.ordonancePage.stockCard.infoCard.tabsText.supprimer') }, 
                 render: () => <><Tab.Pane className='border-div' attached={false}>{ loading && fournisseurData.PID != 'ABYEDH' ? <DeleteFS /> : <PublicMedicamment /> }</Tab.Pane><br /></>,
             },
         ]
         L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
         const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
     
          /* ############################### UseEffect ################################*/
         useEffect(() => {
             //client Info
             axios.post(`${GConf.ApiLink}/ordonance/medicamment/select`, {
                 tag: GConf.PID,
                 PK : MEID
             }).then(function (response) {
                    console.log(response.data)
                 if(!response.data.PK) {
                     toast.error('Medicament Introuvable !', GConf.TostSuucessGonf)
                     setTimeout(() => {  window.location.href = "/S/sk"; }, 2000)
                     
                 } else {
                     setFSData(response.data)
                      
                     setLoading(true)
                     
                 }
     
             }).catch((error) => {
                 if(error.request) {
                   toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les info du client  </div></>, GConf.TostInternetGonf)   
                   setFSData([])
                   setPosition([0,0])
                   setLoading(true)
                 }
               });
     
         }, [])
     
     
          /* ############################### Functions ################################*/
            const GetDelegList = (value) =>{
             setFSData({...fournisseurData, Forme: value })
             const found = TunMap.Deleg.filter(element => element.tag === value)
             setDelegList(found)
            }
            const EditClient = () =>{
                if (!fournisseurData.Code_Fiscale) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
                else if (!fournisseurData.Name) {toast.error("Nom Invalide !", GConf.TostErrorGonf)}
                else if (!fournisseurData.Phone) {toast.error("Phone Invalide !", GConf.TostErrorGonf)}
                else if (!fournisseurData.Social_Name) {toast.error("Nom Sociale  Invalide !", GConf.TostErrorGonf)}
                else if (!fournisseurData.Gouv) {toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf)}
                else if (!fournisseurData.Adress) {toast.error("Adresee Invalide !", GConf.TostErrorGonf)}
                else{
                    setLS(true)
                    axios.post(`${GConf.ApiLink}/fournisseur/modifier`, {
                        PID : GConf.PID,
                        fournisseurData : fournisseurData,
                    }).then(function (response) {
                        if(response.data.affectedRows) {
                            toast.success("Client Modifier !", GConf.TostSuucessGonf)
                            SaveNotification('clientEdit',GConf.PID, fournisseurData)
                            setLS(false)
                        }
                        else{
                            toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                            setLS(false)
                                }
                        }).catch((error) => {
                            if(error.request) {
                            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le client  </div></>, GConf.TostInternetGonf) 
                            setLS(false)  
                            }
                        });
                            
                }
            }
            const DeleteFSFunc = () =>{
                    setLS(true)
                    axios.post(`${GConf.ApiLink}/fournisseur/supprimer`, {
                        PID : GConf.PID,
                        clientId : MEID,
                    }).then(function (response) {
                        if(response.data.affectedRows) {
                            toast.success("Client Supprimer !", GConf.TostSuucessGonf)
                            setLS(false)
                            setTimeout(() => {  window.location.href = "/S/fs"; }, 500)
                        }
                        else{
                            toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                            setLS(false)
                                }
                        }).catch((error) => {
                            if(error.request) {
                            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de supprimer le client  </div></>, GConf.TostInternetGonf) 
                            setLS(false)  
                            }
                        });
            }
            const OnKeyPressFunc = (e) => {
                if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
                    e.preventDefault();
                }   
            }
         /* ############################### Card ################################*/
         const FournisseurCard = () =>{
             return (<>
                 <div className="sticky-top" style={{top:'70px'}}>
                     <div className='card card-body shadow-sm mb-2 border-div'>
                         <div className="upper">
                             <div className="mcbg main-big-card"></div>
                         </div>
                         <div className="img-card-container text-center">
                             <div className="card-container bg-white">
                                 <img src="https://cdn.abyedh.com/images/system/docteur/medicaments.png" className="rounded-circle" width="80" />                    
                             </div>
                         </div>
                         <div className="mt-5 text-center">
                                 <h4 className='mt-2'>{loading ? fournisseurData.Nom : SKLT.BarreSkl } </h4> 
                                 <h6 className="text-secondary">  {loading ? <><span className="bi bi-geo-alt-fill"></span> { fournisseurData.Dosage } </>: SKLT.BarreSkl} </h6>
                                 <h6 className="text-secondary"> {loading ? <><span className="bi bi-geo-fill"></span> { fournisseurData.Forme } </>: SKLT.BarreSkl } </h6>
                                 <Divider horizontal className='text-secondary mt-4'>{t('menuTabs.ordonancePage.stockCard.infoCard.cardData.dosage')}</Divider>
                                 <div className='row text-center'>
                                     <div className='col-12'>    
                                         {loading ?  
                                             <h1><span className="badge bg-danger ">{loading ? fournisseurData.Dosage : '' }</span></h1>
                                         : SKLT.BarreSkl }  
                                         
                                     </div>
                                 </div>
                                 <Divider horizontal className='text-secondary mt-4'>{t('menuTabs.ordonancePage.stockCard.infoCard.cardData.presentaion')}</Divider>
                                 <div className='row text-center'>
                                     <div className='col-12 mb-3'> 
                                         {loading ?  
                                             <h2><span className="badge bg-success ">{loading ? fournisseurData.Presentation : '' }</span></h2>
                                         : SKLT.BarreSkl }   
                                     </div>
                                     
                             </div>
                         </div>
                     </div>
                 </div>
             </>);
         }
         const MedicammentInfo = () =>{
            return(<>
                    <h5>Info Generale</h5>
                    <div class="table-responsive">
                        <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Nom</th>
                                <td>{loading ? fournisseurData.Nom : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Dosage</th>
                                <td>{loading ? fournisseurData.Dosage : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Forme</th>
                                <td>{loading ? fournisseurData.Forme : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Presentation</th>
                                <td>{loading ? fournisseurData.Presentation : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">DCI</th>
                                <td>{loading ? fournisseurData.DCI : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Classe</th>
                                <td>{loading ? fournisseurData.Classe : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Sous_Classe</th>
                                <td>{loading ? fournisseurData.Sous_Classe : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Laboratoire</th>
                                <td>{loading ? fournisseurData.Laboratoire : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">AMM</th>
                                <td>{loading ? fournisseurData.AMM : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Date_AMM</th>
                                <td>{loading ? fournisseurData.Date_AMM : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Conditionnement_primaire</th>
                                <td>{loading ? fournisseurData.Conditionnement_primaire : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Specifocation</th>
                                <td>{loading ? fournisseurData.Specifocation : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Specifocation</th>
                                <td>{loading ? fournisseurData.Specifocation : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Duree_de_conservation</th>
                                <td>{loading ? fournisseurData.Duree_de_conservation : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">Indications</th>
                                <td>{loading ? fournisseurData.Indications : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">G_P_B</th>
                                <td>{loading ? fournisseurData.G_P_B : '' }</td>
                            </tr>
                            <tr>
                                <th scope="row">VEIC</th>
                                <td>{loading ? fournisseurData.VEIC : '' }</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
            </>)
         }
         const DeleteFS= () =>{
             return(<><h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Ce Medicamment ?</h3> 
             <div className='row'>
                     <div className='col-9'>
                         <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer Un medicamment : </b></h5>
                         <ul className="text-info text-left">
                         <li>le medicamment  ne sera pas visible dans la branche 'medicamments'</li>
                         <li>Tous les factures relier a ce medicamment peut s'endomager   </li>
                         <li>vous ne pouver pas passer  ordonances   avec ce medicamments autremment   </li>
                         </ul>
                     </div>
                     <div className='col-lg-3 d-none d-lg-block align-self-center'>
                         <div className='text-center'>
                                 <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                         </div> 
                     </div>
                 </div>
             <div className='text-end'>
                 <button type="submit" name="add" className="btn btn-danger rounded-pill"  onClick={DeleteFSFunc}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </button>
             </div></>)
         }
         const PublicMedicamment = () => {
            return(<>
            {t('menuTabs.ordonancePage.stockCard.infoCard.alertTer')} 
            </>)
         }
    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.FournisseurAdd} bcTag='FournisseurAdd' />
            <br />
            <div className="row">
                    <div className="col-12 col-lg-4">
                        <FournisseurCard /> 
                    </div>
                    <div className="col-12 col-lg-8 ">
                        <Tab  menu={{secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>
            </div>
    </> );
}

export default FournisseurInfo;