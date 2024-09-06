import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, Fade } from 'react-reveal';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Button, Divider, Dropdown, Form, Icon, Input, List, Modal, Placeholder, Select, Tab, TextArea } from 'semantic-ui-react';
import GConf from '../../../AssetsM/generalConf';
import BreadCrumb from '../../../AssetsM/Cards/breadCrumb'
import SKLT from '../../../AssetsM/Cards/usedSlk';
import { toast } from 'react-toastify';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import FrameForPrint from '../../../AssetsM/Cards/frameForPrint';
import TunMap from '../../../AssetsM/tunMap';
import OneGConf from '../Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard';
import { useTranslation, Trans } from 'react-i18next';

const AccepterCard = ({requestData, setRequestData, reqState, FindBtnState, UpdateRequestState, OnKeyPressFunc}) =>{
    return(<>
             
                <h5>Accepter Le RendyVous</h5>

                <div className='card-body'>
                    Lorsque vous accepter la demande l'utilisateur sera notifié..
                    <br />
                    Veuillez verifier les donnees de demande : 
                    <div className='mb-1'> Date : {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div> 
                    <div className='mb-1'> Temps : {requestData.RDV_Time}</div>
                </div>
                 
                <div className=' mb-2'>
                    <Button fluid disabled={FindBtnState(reqState).acceptState} className='rounded-pill bg-success text-white'    onClick={ () => UpdateRequestState('A',false,false,true,'accepted')}><Icon name='check square' /> Accepter </Button>
                </div>
            
    </>)
}
const RefuserCard = ({requestData, setRequestData, reqState, FindBtnState, UpdateRequestState, OnKeyPressFunc}) =>{
    return<>
         
            <h5>Refuser Le RendyVous</h5>

            <div className='card-body'>
                Veuillez entrer la cause de la rejection : 
            </div> 
            <div className='col-12 mb-3'>       
                <Form>
                    <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Cause de Rejection' className='w-100 shadow-sm rounded mb-3' value={requestData.Refuser_Cause} onChange={(e) => setRequestData({...requestData, Refuser_Cause: e.target.value })}/>
                </Form> 
            </div>
            <div className=' mb-2'>
                <Button fluid disabled={FindBtnState(reqState).refuseState} className='rounded-pill bg-danger text-white'    onClick={ () => UpdateRequestState('R','Refuser_Cause',requestData.Refuser_Cause,true,'rejected')}><Icon name='trash alternate' /> Refuser </Button>
            </div>
         

    </>
}
const RetarderCard = ({requestData, setRequestData, reqState, FindBtnState, UpdateRequestState, OnKeyPressFunc}) =>{
    return<>
         
            <div className='card-body'> Retarder Vers  :  
                <h5 className='mb-1 mt-1'>Date   </h5>
                <Input icon='calendar' type='date' defaultValue={new Date().toISOString().split('T')[0]} size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setRequestData({...requestData, Retarder_Vers: { ...requestData.Retarder_Vers, Date : e.target.value  } })}/>

                <h5 className='mb-1 mt-3'>Temps   </h5>
                <Input icon='time' defaultValue={new Date().toLocaleTimeString('fr-FR')} type='time' size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setRequestData({...requestData, Retarder_Vers: { ...requestData.Retarder_Vers, Temps: e.target.value }  })}/>
            </div>
            <div className='text-end mt-3'>
                <Button disabled={FindBtnState(reqState).reterderState} fluid className='rounded-pill text-secondary btn-imprimer'  onClick={(e) => UpdateRequestState('RT','Retarder_Vers',JSON.stringify(requestData.Retarder_Vers),true,'retarted')}><Icon name='time' /> Retarder  </Button>  
            </div>
        
    </>
}
const RedirecterCard = ({requestData, setRequestData, reqState, FindBtnState, UpdateRequestState, OnKeyPressFunc}) =>{
    return(<>
         
            <div className='card-body'> Entrer les info de docteur :  
                <h5 className='mb-1 mt-1'>Nom de Docteur   </h5>
                <Input icon='user' type='text' size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setRequestData({...requestData, Redirected_To: { ...requestData.Redirected_To, Name : e.target.value  } })}/>

                <h5 className='mb-1 mt-1'>Telephone   </h5>
                <Input icon='phone' type='text' size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setRequestData({...requestData, Redirected_To: { ...requestData.Redirected_To, Phone : e.target.value }  })}/>


                <h5 className='mb-1 mt-3'>Adresse   </h5>
                <Input icon='map marker alternate' type='text' size="small" iconPosition='left'   fluid className='mb-1'  onChange={(e) => setRequestData({...requestData, Redirected_To: { ...requestData.Redirected_To, Adresse: e.target.value }  })}/>
            </div>
            <div className='text-end mt-3'>
                <Button disabled={FindBtnState(reqState).redirectState} fluid className='rounded-pill text-secondary btn-imprimer'  onClick={(e) => UpdateRequestState('RD','Redirected_To',JSON.stringify(requestData.Redirected_To),true,'redirected')}><Icon name='edit outline' /> Redirecter </Button>  
            </div>
         
    </>)
}


function RequestInfo() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    const {CID} = useParams()
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState([])
    const [userData, setUserData] = useState({ CommandeID : CID, totale: 0 , articles:[]})
    const [reqState, setReqState] = useState('')
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    
    const [modalS, setModalS] = useState(false)
    const [modalStateValue, setModalStateValue] = useState()
    const [delegList ,setDelegList] = useState([])
    
    /*#########################[useEffect]##################################*/ 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request/info`, {
            PID : GConf.PID,
            CID: CID
          })
          .then(function (response) {
            console.log(response.data)
                if (!response.data.R_ID) {
                    toast.error('Demmande Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/rq"; }, 2000)
                } else {
                    setRequestData(response.data)
                    setLoading(true)
                    setReqState(response.data.State)  
                    if (response.data.State == 'W') { UpdateRequestState('S',false,false,false,false)} 
                }  

                // if (!response.data[0]) {
                //     toast.error('Commande Introuvable !', GConf.TostSuucessGonf)
                //     setTimeout(() => {  window.location.href = "/S/rq"; }, 2000)
                // } else {
                //     setRequestData(response.data[0])
                //     setLoading(true)
                //     setReqState(response.data[0].State)
                //     if(response.data[0].State == 'A'  || response.data[0].State == 'R' || response.data[0].State == 'RD'){setBtnState(true)}
                //     if(response.data[0].State == 'W'){ UpdateState('S') }
                    
                    
                // }  
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
               
              setLoading(true)
            }
          });
    }, [])


    /*#########################[Functions]##################################*/
    const UpdateRequestState = (stateBtn,dataGenre,selectedData,saveNotif,actionName) =>{
        axios.post(`${GConf.ApiLink}/request/controle`, {
            PID : GConf.PID,
            UID : requestData.UID,
            TAG : 'docteur',
            RID: CID,
            genreTag : 'docteur_rdv',
            state: stateBtn,
            data: selectedData,
            dataGenre: dataGenre,
            saveNotif : saveNotif,
            actionName : `docteur_${actionName}`,
          })
          .then(function (response) { 
            setReqState(stateBtn)
            if (stateBtn == 'S') { console.log('Vu') } else { toast.success(<><div> C'est Fait   </div></>, GConf.TostInternetGonf)   }
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier L'etat du commande  </div></>, GConf.TostInternetGonf)   
               
            }
          });
    }
    const FindBtnState = (reqState) =>{
        switch(reqState) {
            case 'W': return {seenState: true, acceptState: false, refuseState: false, reterderState: false, redirectState:false , terminerState:true};  
            case 'S': return {seenState: false, acceptState: false, refuseState: false, reterderState: false, redirectState:false , terminerState:true};    
            case 'A': return {seenState: true, acceptState: true, refuseState: true, reterderState: true, redirectState:true , terminerState:false};  
            case 'R': return {seenState: true, acceptState: true, refuseState: true, reterderState: true, redirectState:true , terminerState:true};  
            case 'RT': return {seenState: true, acceptState: false, refuseState: false, reterderState: false, redirectState:true , terminerState:true};  
            case 'RD': return {seenState: true, acceptState: false, refuseState: false, reterderState: true, redirectState:false , terminerState:false};  
            case 'T': return {seenState: true, acceptState: true, refuseState: true, reterderState: true, redirectState:true , terminerState:true};  
            default:  return {seenState: true, acceptState: true, refuseState: true, reterderState: true, redirectState:true , terminerState:true};      
          }
    }
    const SaveClientFunction = () =>{
        console.log(requestData)
        setLS(true)
        axios.post(`${GConf.ApiLink}/patient/ajouter`, {
            PID : GConf.PID,
            clientD : {CIN: '', Name:requestData.Name, Phone:requestData.PhoneNum , Gouv:requestData.BirthGouv, Deleg:requestData.BirthDeleg, Adress:'', Releted_UID:requestData.UID},
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
    const openEditModal = (selected) =>{
        setModalStateValue(selected) 
        setModalS(true)
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const GetDelegList = (value) =>{
        setUserData({...userData, Gouv: value })
        let found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList([])
        setDelegList(found)
    }
    

    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'W': return <StateCard color='warning' text={t(`menuTabs.rdvPage.tabsTtems.attent`)} />;  
            case 'S': return <StateCard color='info' text={t(`menuTabs.rdvPage.tabsTtems.seen`)} />;  
            case 'A': return <StateCard color='success' text={t(`menuTabs.rdvPage.tabsTtems.accepte`)} /> ;
            case 'R': return <StateCard color='danger' text={t(`menuTabs.rdvPage.tabsTtems.refuse`)} />;
            case 'RT': return <StateCard color='retarder' text={t(`menuTabs.rdvPage.tabsTtems.retarde`)} />;
            case 'RD': return <StateCard color='rederecter' text={t(`menuTabs.rdvPage.tabsTtems.redirecte`)} />;
            case 'T': return <StateCard color='secondary' text={t(`menuTabs.rdvPage.tabsTtems.termine`)} />;
            default:  return <StateCard color='dark' text='Indefinie' />; ;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    }
    const BtnsCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <h5> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.title')} </h5>
                    <div className='row '>
                        <div className='col-6 mb-2'>
                            <Button disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-danger text-white'  fluid onClick={ () => openEditModal('R')}><Icon name='trash' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.rejectBtn')} </Button>
                        </div>
                        <div className='col-6 mb-2'>
                            <Button disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-success text-white'  fluid onClick={ () => openEditModal('A')}><Icon name='check' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.acceptBtn')} </Button>
                        </div>
                        <div className='col-6 mb-2'>
                            <Button disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-retarder text-white'  fluid onClick={ () => openEditModal('RT')}><Icon name='delete calendar' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.retardBtn')} </Button>
                        </div>
                        <div className='col-6 mb-2'>
                            <Button disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-rederecter text-white'  fluid onClick={ () => openEditModal('RD')}><Icon name='refresh' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.redirectBtn')} </Button>
                        </div>

                        <div className='col-12 mb-2'>
                            <Button as='a' onClick={ (e) => navigate(`/S/sa/ajouter?CID=${CID}`)} animated disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible><Icon name='calendar check' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.saveBtn')}  </Button.Content>
                                <Button.Content hidden >
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>
                             
                        </div>

                        <Divider />

                        <div className='col-12 mb-2'>
                            <Button disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-secondary text-white'  fluid onClick={ () => UpdateRequestState('T',false,false,true,'terminer')}><Icon name='refresh' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.termineBtn')} </Button>
                        </div>
                        <div className='col-12 mb-2'>
                            <Button disabled={FindBtnState(reqState).redirectState} className='rounded-pill bg-info text-white'  fluid onClick={ () => UpdateRequestState('W',false,false,false,false)}><Icon name='eye' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.nonSeenBtn')} </Button>
                        </div>
                    </div>
                     
                </div>
        </>)
    }
    const UserInfoCard = () =>{
        return(<>
                <div className='card card-body shadow-sm mb-2 mt-3 border-div'>
                    <div className='row mb-3'>
                        <div className='col-6 text-start'><h5> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.title')} </h5></div>
                        <div className='col-6 text-end'>{requestData.Releted_UID ? <span className='badge bg-success p-2'>{t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.stateItem.dejaEnreg')} </span> : <span className='badge bg-danger badge-lg'>{t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.stateItem.nouveaux')}</span>}</div>
                    </div>
                    <div className='row mb-2'>
                        <div className='col-12 col-lg-6'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.name')}  {loading ? requestData.Name : ''} </div> 
                        <div className='col-12 col-lg-6'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.phone')}  {loading ? requestData.PhoneNum : ''} </div> 
                        <div className='col-12 col-lg-6'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.gouv')}  {loading ? requestData.BirthGouv : ''} </div> 
                        <div className='col-12 col-lg-6'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.delag')}  {loading ? requestData.BirthDeleg : ''} </div> 
                    </div> 
                    {requestData.Releted_UID ? 
                    <div className='row mb-2 mt-4'>
                        <div className='col-4 border-end text-center'> <h2 className='mb-1'>0</h2><small>{t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.statItemNames.rdv')} </small> </div> 
                        <div className='col-4 border-end text-center'> <h2 className='mb-1'>0</h2><small>{t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.statItemNames.seances')}</small> </div> 
                        <div className='col-4 text-center'> <h2 className='mb-1'>0</h2><small>{t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.statItemNames.ordonnace')} </small> </div> 
                    </div> 
                    : 
                    <AddUserCard /> }
                </div>
        </>)
    }
    const AddUserCard = () =>{
        return(<>
                <Divider />
                <h5>{t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.addUserCard.title')}</h5>
                <div className='row mb-2'>
                    <div className='col-6'>
                            <div className='text-center mb-3'> 
                                <img src={`https://cdn.abyedh.com/images/p_pic/${requestData.PictureId}.gif`} className='rounded-circle' width='60px'/>
                            </div>
                            <br />
                            
                            <div className='col-12 mb-3'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.name')}  {loading ? requestData.Name : ''}
                                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={loading ? requestData.Name : ''} value={userData.Name}  onBlur={ (e) => setUserData({...userData, Name: e.target.value })}  iconPosition='left'   fluid className='mb-1' />
                            </div> 
                            <div className='col-12 mb-3'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.phone')} {loading ? requestData.PhoneNum : ''}
                                <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={loading ? requestData.PhoneNum : ''} value={userData.PhoneNum}   onBlur={ (e) => setUserData({...userData, PhoneNum: e.target.value })}  iconPosition='left'   fluid className='mb-1' />
                            </div> 
                    
                    </div>
                    <div className='col-6'>
                        <div className='col-12 mb-3'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.gouv')} {loading ? requestData.BirthGouv : ''} 
                            <Select placeholder=' Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={userData.Gouv} onChange={(e, { value }) => GetDelegList(value)} />
                        </div> 
                        <div className='col-12 mb-3'> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.delag')} {loading ? requestData.BirthGouv : ''}
                            <Select placeholder=' Delegation ' fluid value={userData.Deleg} options={delegList} onChange={(e, { value }) => setUserData({...userData, Deleg: value })} />
                        </div> 
                        <div className='col-12 mb-3'>
                            {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.adress')}   {loading ? requestData.BirthGouv : ''}
                            <Form>
                                <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='designer votre article' className='w-100 shadow-sm rounded mb-3' value={userData.Adress} onChange={(e) => setUserData({...userData, Adress: e.target.value })}/>
                            </Form> 
                        </div>
                    </div> 
                </div> 
                <div className='text-end'>
                    <Button  className='rounded-pill text-secondary btn-imprimer' size='mini' disabled={requestData.Releted_UID}   onClick={(e) => SaveClientFunction()}><Icon name='edit outline' /> {t('menuTabs.rdvPage.rdvInfoCardData.infoUserCard.saveBtn')} </Button>
                </div>  
        </>)
    }
    const StateModalCard = ({ status }) => {
         
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'RT': return <RetarderCard requestData={requestData} setRequestData={setRequestData} reqState={reqState} FindBtnState={FindBtnState} UpdateRequestState={UpdateRequestState} OnKeyPressFunc={OnKeyPressFunc} />;  
            case 'RD': return <RedirecterCard requestData={requestData} setRequestData={setRequestData} reqState={reqState} FindBtnState={FindBtnState} UpdateRequestState={UpdateRequestState} OnKeyPressFunc={OnKeyPressFunc} />;  
            case 'R': return <RefuserCard requestData={requestData} setRequestData={setRequestData} reqState={reqState} FindBtnState={FindBtnState} UpdateRequestState={UpdateRequestState} OnKeyPressFunc={OnKeyPressFunc} />;  
            case 'A': return <AccepterCard requestData={requestData} setRequestData={setRequestData} reqState={reqState} FindBtnState={FindBtnState} UpdateRequestState={UpdateRequestState} OnKeyPressFunc={OnKeyPressFunc} />;  
            default:  return <>Introuvable</>;    
          }
        }, [status]);
      
        return (
          <div >
            {statusCard()}
          </div>
        );
    }

    // const StateModalCard = ({ status }) => {
         
    //     const statusCard = React.useCallback(() => {
    //       switch(status) {
    //         case 'RT': return <RetarderCard />;  
    //         case 'RD': return <RedirecterCard />;  
    //         case 'R': return <DeleteModal />;  
    //         case 'A': return <AcceptModal />;  
    //         default:  return <>Introuvable</>;    
    //       }
    //     }, [status]);
      
    //     return (
    //       <div >
    //         {statusCard()}
    //       </div>
    //     );
    // }
    // const RetarderCard = () =>{
    //     return<>
    //             <h5 className='mb-1 mt-1'>Retarder Vers   </h5>
    //             <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={retarderData.RT_Date} onChange={(e) => setRetarderData({...retarderData, RT_Date: e.target.value })}/>

    //             <h5 className='mb-1 mt-3'>Retarder Vers   </h5>
    //             <Input icon='calendar alternate' type='time' size="small" iconPosition='left'   fluid className='mb-1' value={retarderData.RT_Date} onChange={(e) => setRetarderData({...retarderData, RT_Date: e.target.value })}/>

    //             <div className='text-end mt-3'>
    //                 <Button  className='rounded-pill text-secondary btn-imprimer'  onClick={(e) => UpdateRequestState('RT','Retarder_Vers',JSON.stringify(requestData.Retarder_Vers),true,'retarted')}><Icon name='edit outline' /> Retarder</Button>
    //             </div>

    //     </>
    // }
    const DeleteModal = () =>{
        return<>
                <h4>Voulez Vous annuleé cet Rendy-Vous</h4>
                <div className='col-12 mb-3'>       
                    <Form>
                        <TextArea  rows="3" onKeyPress={event => OnKeyPressFunc(event)} placeholder='Cause de Rejection' className='w-100 shadow-sm rounded mb-3' value={requestData.Refuser_Cause} onChange={(e) => setRequestData({...requestData, Refuser_Cause: e.target.value })}/>
                    </Form> 
                </div>
                
                <div className='text-start mt-3'>
                    <Button  className='rounded-pill text-secondary '  onClick={(e) => UpdateRequestState('R','Refuser_Cause',requestData.Refuser_Cause,true,'rejected')}><Icon name='trash' /> Annuleé</Button>
                </div>
        </>
    }
    const AcceptModal = () =>{
        return<>
                <h4>Voulez Vous Accepter cet Rendy-Vous</h4>
                 
                
                <div className='text-start mt-3'>
                    <Button  className='rounded-pill text-secondary '  onClick={(e) => UpdateRequestState('A',false,false,true,'accepted')}><Icon name='check' /> Appecter</Button>
                </div>
        </>
    }
    // const RedirecterCard = () =>{
    //     return<>
    //             <h5 className='mb-1 mt-1'>Nom de Docteur   </h5>
    //             <Input icon='calendar alternate' type='text' size="small" iconPosition='left'   fluid className='mb-1' value={retarderData.RT_Date} onChange={(e) => setRetarderData({...retarderData, RT_Date: e.target.value })}/>

    //             <h5 className='mb-1 mt-3'>Position   </h5>
    //             <Input icon='calendar alternate' type='text' size="small" iconPosition='left'   fluid className='mb-1' value={retarderData.RT_Date} onChange={(e) => setRetarderData({...retarderData, RT_Date: e.target.value })}/>

    //             <div className='text-end mt-3'>
    //                 <Button  className='rounded-pill text-secondary btn-imprimer'  onClick={(e) =>UpdateRequestState('RD','Redirected_To',JSON.stringify(requestData.Redirected_To),true,'redirected')}><Icon name='edit outline' /> Redirecter </Button>
    //             </div>

    //     </>
    // }

    const SimpleLoadinCard = (props) =>{
        return(<>
            <Placeholder fluid className='border-div w-100' style={{ height: 10}}>
                <Placeholder.Image />
            </Placeholder>
        </>)
    }
 
    return ( <> 
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh'}}>
        <BackCard data={OneGConf.backCard.sk}/>   
        <br />
        <div className='container'>
        <div className="row">
            <div className="col-12 col-lg-8">
                <div className='row'>
                    <div className='col-8'><h2 className='text-center mb-4'>Rendy Vous </h2></div>
                    <div className='col-4'><h2 className='text-end'><StateCard status={reqState} /></h2></div>
                </div> 

                <div className='card card-body bg-transparent border-div mb-3 mt-2'>
                    <h5>Info du rendy Vous</h5>
                    <div className="table-responsive">
                        <table className="table table-striped">
                        <tbody>
                            <tr>
                                <th scope="row"><span className='bi bi-person'></span> Nom Et Prenon </th>
                                <td>{loading ? requestData.Name : <SimpleLoadinCard />}</td>
                            </tr>
                            <tr>
                                <th scope="row"><span className='bi bi-calendar'></span> Date Volu</th>
                                <td>{loading ? new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : ''}</td>
                            </tr>
                            <tr>
                                <th scope="row"><span className='bi bi-clock'></span> Temps Volu</th>
                                <td>{loading ? requestData.RDV_Time : <SimpleLoadinCard />}</td>
                            </tr>
                            <tr>
                                <th scope="row"><span className='bi bi-calendar-check'></span> Passe Le</th>
                                <td>{loading ? new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : <SimpleLoadinCard />}</td>
                            </tr>
                            <tr>
                                <th scope="row"><span className='bi bi-chat-dots-fill'></span> Commentaire</th>
                                <td>{loading ? requestData.Comment : <SimpleLoadinCard />}</td>
                            </tr>
                        </tbody>
                        </table>
                    </div>
                     
                </div>
                <br />
                <UserInfoCard />
                <br />
            </div>
            
            <div className="col-12 col-lg-4">
                <Fade bottom>
                    <div className="sticky-top" style={{top:'70px', zIndex:'999'}}>
                        <BtnsCard />
                    </div>
                </Fade>
            </div>
        </div>
        <Modal
              size='tiny'
              open={modalS}
              closeIcon
              onClose={() => setModalS(false)}
              onOpen={() => setModalS(true)}
          >
               
              <Modal.Content scrolling>
                    <StateModalCard status={modalStateValue} />
                    {/* <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button> */}
              </Modal.Content>
               
        </Modal>
        </div>
        </div>
 
    </> );
}

export default RequestInfo;