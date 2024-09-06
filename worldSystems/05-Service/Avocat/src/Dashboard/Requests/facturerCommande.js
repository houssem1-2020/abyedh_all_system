import React, { useEffect, useState } from 'react';
import BreadCrumb  from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Button, Dropdown, Form, Icon, Input , Loader, Select, Tab, TextArea} from 'semantic-ui-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import useGetClients from '../../AssetsM/Hooks/fetchClient';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import Ripples from 'react-ripples'
import { useParams } from 'react-router-dom';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TunMap from '../../AssetsM/tunMap';

const MainDataCard = ({abonnemmentData, setAbonnemmentData,forfaitListe, SaveAbonnementFunc, OnKeyPressFunc}) =>{
    return (<>
            <div className='card p-4 shadow-sm mb-2 border-div'>
                <h5 className='mb-0 text-secondary '> Mmebre  </h5>
                <Input icon='calendar alternate'   iconPosition='left'   fluid className='mb-1' value={abonnemmentData.jour} onChange={(e) => setAbonnemmentData({...abonnemmentData, jour: e.target.value })}/>
                 
                <h5 className='mb-0 mt-2 text-secondary '>Forfait  </h5>
                <Dropdown
                    search
                    selection
                    wrapSelection={false}
                    options={forfaitListe}
                    placeholder={abonnemmentData.Fournisseurs}
                    className='mb-1'
                    onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Fournisseurs: value })}
                    value={abonnemmentData.Fournisseurs}
                /> 
                
                <h5 className='mb-0 mt-2 text-secondary '>Depart  </h5>
                <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1' value={abonnemmentData.Fournisseurs} onChange={(e) => setAbonnemmentData({...abonnemmentData, Fournisseurs: e.target.value })}/>
                
                <h5 className='mb-0 mt-2 text-secondary '>Nombre de seance  </h5>
                <Input icon='user outline' onKeyPress={event => OnKeyPressFunc(event)} type='text' placeholder='Chauffeur'  iconPosition='left'   fluid className='mb-1' value={abonnemmentData.Chauffeur} onChange={(e) => setAbonnemmentData({...abonnemmentData, Chauffeur: e.target.value })}/> 
                
                <div className='row'>
                    <div className='col-6'>
                        <h5 className='mb-0 mt-2 text-secondary '>Temps d'entrainemment  </h5>
                        <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1'  value={abonnemmentData.de}  onChange={(e) => setAbonnemmentData({...abonnemmentData, de: e.target.value })}/>
                    </div>
                    <div className='col-6'>
                        <h5 className='mb-0 mt-2 text-secondary '>Temps d'entrainemment  </h5>
                        <Input icon='map marker alternate'  type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='Vers'  fluid className='mb-1' value={abonnemmentData.vers}  onChange={(e) => setAbonnemmentData({...abonnemmentData, vers: e.target.value })}/>
                    </div>
                </div>
                <div className='text-end mt-4'>
                    <Button  className='rounded-pill text-secondary bg-system-btn'       onClick={(e) => SaveAbonnementFunc()}><Icon name='edit outline' /> Enregistrer Client</Button>
                </div>
            </div>
    </>)
}

function FacturerCommande() {
        /*#########################[Const]##################################*/
        const {CID} = useParams()
        const Today = new Date()
        const [commandeData, setCommandeD] = useState([])
        const [articleL, setArticleL] = useState([])
        const [abonnemmentData, setAbonnemmentData] = useState({ CommandeID : CID, totale: 0 , articles:[]})
        const [delegList ,setDelegList] = useState([])

        const [saveBtnState, setSaveBtnState] = useState(false)
        const [updateStockBtnState, setUSBS] = useState(true)
        const [loaderState, setLS] = useState(false)
        const [btnState, setBtnState] = useState(false)
        const [loading , setLoading] = useState(false)

        const panesRigth = [
            {
                menuItem: { key: 'articles', icon: 'gift', content:  'Ajouter ' }, 
                render: () => <MainDataCard abonnemmentData={abonnemmentData} setAbonnemmentData={setAbonnemmentData} SaveAbonnementFunc={SaveAbonnementFunc}  forfaitListe={[]}    OnKeyPressFunc={OnKeyPressFunc} />,
            },            
            {
                menuItem: { key: 'start', icon: 'list', content: 'Info ' }, 
                render: () => <CommandeInfoCard />,
            }
            
        ]
 
    
        /* ############################### UseEffect ########################*/
        useEffect(() => {
            axios.post(`${GConf.ApiLink}/request/info`, {
                PID : GConf.PID,
                CID: CID
              })
              .then(function (response) {
                    console.log(response.data)
                    if (!response.data[0]) {
                        toast.error('Commande Introuvable !', GConf.TostSuucessGonf)
                        setTimeout(() => {  window.location.href = "/S/rq"; }, 2000)
                    } else {
                        setCommandeD(response.data[0])
                        setLoading(true)    
                        if(response.data[0].State != 'W' && response.data[0].State != 'S'){setBtnState(true)}
                        if(response.data[0].State == 'W' ){UpdateState('S') }
                        
                    }  
              }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
                  setLoading(true)
                  setArticleL([])
                  setCommandeD([])
                }
              });
        }, [])
    
        /*#########################[Function]##################################*/
        const SaveClientFunction = () =>{
            console.log(commandeData)
            setLS(true)
            axios.post(`${GConf.ApiLink}/membres/ajouter`, {
                PID : GConf.PID,
                clientD : {CIN: '', Name:commandeData.Name, Phone:commandeData.PhoneNum , Gouv:commandeData.BirthGouv, Deleg:commandeData.BirthDeleg, Adress:'', Releted_UID:commandeData.UID},
            }).then(function (response) {
                if(response.data.affectedRows) {
                    //setSaveBtnState(true)
                    toast.success("Client Ajouter !", GConf.TostSuucessGonf)
                    //SaveNotification('clientAjouter',GConf.PID, clientD)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                    }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Le client sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                }
              });
              
        }
        const SaveAbonnementFunc = () =>{
                if (!abonnemmentData.CommandeID ) {toast.error("Commande ID est Invalide !", GConf.TostErrorGonf)}
                else if (!abonnemmentData.totale) {toast.error("totale est Invalide !", GConf.TostErrorGonf)}
                else if (!abonnemmentData.articles || abonnemmentData.articles.length == 0) {toast.error("article list est Invalide !", GConf.TostErrorGonf)}
                else {
                    console.log(abonnemmentData)
                    setLS(true)
                    axios.post(`${GConf.ApiLink}/commande/facturer`, {
                        PID : GConf.PID,
                        abonnemmentData: abonnemmentData,
                    })
                    .then(function (response) {
                        console.log(response.data)
                        if(response.status = 200) {
                            setSaveBtnState(true)
                            toast.success("Facture Enregistreé !", GConf.TostSuucessGonf)
                            UpdateState('A')
                            setLS(false)
                            setUSBS(false)
                             
                        }
                        else{
                            toast.error('Erreur!  esseyez de nouveaux', GConf.TostSuucessGonf)
                            setLS(false)
                        }
                    }).catch((error) => {
                        if(error.request) {
                          toast.error(<><div><h5>Probleme de Connextion</h5> La Facture sera enregistrer sur votre ordinateur    </div></>, GConf.TostInternetGonf)   
                           
                          setLS(false)
                        }
                      });
    
                }       
        }
        const UpdateState = (stateBtn) =>{
            axios.post(`${GConf.ApiLink}/commande/controle`, {
                PID : GConf.PID,
                RID: CID,
                state: stateBtn
              })
              .then(function (response) {
                //setCommandeD({ ...commandeData, State: stateBtn}) 
                
                if(stateBtn != 'S'){
                    //toast.success("Etat Changeé !", GConf.TostSuucessGonf)
                }            
              }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier L'etat du commande  </div></>, GConf.TostInternetGonf)   
                }
              });
        }
        const OnKeyPressFunc = (e) => {
            if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
                e.preventDefault();
            }   
        }
        const GetDelegList = (value) =>{
            setAbonnemmentData({...abonnemmentData, Gouv: value })
            let found = TunMap.Deleg.filter(element => element.tag === value)
            setDelegList([])
            setDelegList(found)
        }

       /*#########################[Card]##################################*/
        const CommandeInfoCard = () =>{
            return(<>
                <div className='card p-4 shadow-sm mb-2 border-div'>
                    <div class="table-responsive">
                        <table class="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row">Nom</th>
                                <td>{loading ? commandeData.Name : ''}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date</th>
                                <td>{loading ? new Date(commandeData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : ''}</td>
                            </tr>
                            <tr>
                                <th scope="row">Passe Le</th>
                                <td>{loading ? new Date(commandeData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : ''}</td>
                            </tr>
                            <tr>
                                <th scope="row">Commentaire</th>
                                <td>{loading ? commandeData.Comment : ''}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                </div>
                </>)
        }
 
        const UserCard = () =>{
            return(<>
                    <div className='card card-body shadow-sm mb-2 mt-3 border-div'>
                        <h5>Info Client</h5>
                        <div className='row mb-2'>
                            <div className='text-center mb-3'> 
                                <img src={`https://cdn.abyedh.com/images/p_pic/05.gif`} className='rounded-circle' width='60px'/>
                            </div>
                            <div className='col-12 col-lg-6 mb-3'> Nom :  {loading ? commandeData.Name : ''}
                                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={loading ? commandeData.Name : ''} value={abonnemmentData.Name}  onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Name: e.target.value })}  iconPosition='left'   fluid className='mb-1' />
                            </div> 
                            <div className='col-12 col-lg-6 mb-3'> Phone : {loading ? commandeData.PhoneNum : ''}
                                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={loading ? commandeData.PhoneNum : ''} value={abonnemmentData.PhoneNum}   onBlur={ (e) => setAbonnemmentData({...abonnemmentData, PhoneNum: e.target.value })}  iconPosition='left'   fluid className='mb-1' />
                            </div> 
                            <div className='col-12 col-lg-6 mb-3'> Gouv : {loading ? commandeData.BirthGouv : ''} 
                                <Select placeholder=' Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={abonnemmentData.Gouv} onChange={(e, { value }) => GetDelegList(value)} />
                            </div> 
                            <div className='col-12 col-lg-6 mb-3'> Deleg : {loading ? commandeData.BirthGouv : ''}
                                <Select placeholder=' Delegation ' fluid value={abonnemmentData.Deleg} options={delegList} onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Deleg: value })} />
                            </div> 
                            <div className='col-12 mb-3'>
                                Deleg : {loading ? commandeData.BirthGouv : ''}
                                <Form>
                                    <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' value={abonnemmentData.Adress} onChange={(e) => setAbonnemmentData({...abonnemmentData, Adress: e.target.value })}/>
                                </Form> 
                            </div>
                        </div> 
                        <div className='text-end'>
                            <Button  className='rounded-pill text-secondary btn-imprimer' size='mini' disabled={commandeData.Releted_UID}   onClick={(e) => SaveClientFunction()}><Icon name='edit outline' /> Enregistrer Client</Button>
                        </div>  
                    </div>
            </>)
        }
        return (<>
            <BreadCrumb links={GConf.BreadCrumb.factureAjouter} />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <div className="mb-4 sticky-top" style={{top:'70px'}}>
                        <UserCard />
                    </div>
                </div>
                <div className='col-12 col-lg-7'>
                    <Tab menu={{widths: panesRigth.length , secondary: true, pointing: true  }} panes={panesRigth} />
                </div>
            </div>
        </> );
}

export default FacturerCommande;