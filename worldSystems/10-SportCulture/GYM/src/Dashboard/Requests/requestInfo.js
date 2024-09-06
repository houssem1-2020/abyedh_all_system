import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bounce, Fade } from 'react-reveal';
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import { Button, Divider, Dropdown, Form, Icon, Input, List, Modal, Placeholder, Select, Tab, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import SKLT from '../../AssetsM/Cards/usedSlk';
import { toast } from 'react-toastify';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import TunMap from '../../AssetsM/tunMap';
import { useTranslation, Trans } from 'react-i18next';

const SendBox = ({SendMessage, setMesgC,msgContent,OnKeyPressFunc}) =>{
    const { t, i18n } = useTranslation();
    return(<>
             <div className='row '>
                <div className='col-11 align-self-center'>
                <Form>
                    <TextArea onKeyPress={event => OnKeyPressFunc(event)} placeholder={t('menuTabs.rdvPage.rdvInfoCardData.sendMessageBox.addResponse')} value={msgContent} className="mb-2 rounded-pill" rows='1' onChange={ (e) => setMesgC(e.target.value)}></TextArea>
                </Form>
                </div>
                <div className='col-1 align-self-center text-end'><Button  icon='send'  className='rounded-circle mb-2' onClick={SendMessage}></Button></div>
            </div>
        </>)
}

function RequestInfo() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    const {CID} = useParams()
    const navigate = useNavigate();
    const [requestData, setRequestData] = useState({State:'ID'})
    const [userData, setUserData] = useState({ CommandeID : CID, totale: 0 , articles:[]})
    const [reqState, setReqState] = useState('')
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [messagesListe, setMessageListe] = useState([])
    const [msgContent, setMesgC] = useState('')
    const [delegList ,setDelegList] = useState([])
    
    const panesList = [
        {
            menuItem: { key: 'articles', icon: 'gift', content:  t('menuTabs.rdvPage.rdvInfoCardData.tabs.one') }, 
            render: () => <RequestData />,
        },            
        {
            menuItem: { key: 'start', icon: 'list', content: t('menuTabs.rdvPage.rdvInfoCardData.tabs.two') }, 
            render: () => <UserInfoCard />,
        }
        
    ]

    /*#########################[useEffect]##################################*/ 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request/info`, {
            PID : GConf.PID,
            CID: CID
          })
          .then(function (response) {
            
                if (!response.data.R_ID) {
                    toast.error('Demmande Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/S/rq"; }, 2000)
                } else {
                    setRequestData(response.data)
                    setReqState(response.data.State)  
                    if (response.data.State == 'W') { UpdateRequestState('S',false,false,false,false)} 
                    setLoading(true)
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

          axios.post(`https://api.abyedh.com/api/systems/app/request/info/messages`, {
            PID : GConf.PID,
            CID: CID,
            SystemTag : GConf.systemTag
          })
          .then(function (response) {
            setMessageListe(response.data) 
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
            }
          });
    }, [])


    /*#########################[Functions]##################################*/
    const UpdateRequestState = (stateBtn,dataGenre,selectedData,saveNotif,actionName) =>{
        axios.post(`${GConf.SharedApi}/request/controle`, {
            PID : GConf.PID,
            UID : requestData.UID,
            TAG : 'gym',
            RID: CID,
            genreTag : 'gym_souscription',
            state: stateBtn,
            data: selectedData,
            dataGenre: dataGenre,
            saveNotif : saveNotif,
            actionName : `gym_${actionName}`,
          })
          .then(function (response) { 
            setReqState(stateBtn)
            if (stateBtn == 'S') { console.log('Vu') } else { toast.success(<><div> C'est Fait   </div></>, GConf.TostInternetGonf)   }
            if(requestData.Notif_TID != '') { SendNotification(stateBtn) }
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier L'etat du commande  </div></>, GConf.TostInternetGonf)   
               
            }
          });
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
    const AddToCalendar = (selected) =>{
       alert('Not Ready ')
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
    const SendMessage = () =>{
        if (!msgContent) {toast.error("Message Vide !", GConf.TostErrorGonf)}
        else{
            axios.post(`https://api.abyedh.com/api/systems/app/request/info/messages/ajouter`, { 
                msgC: msgContent,
                PID : GConf.PID,
                RID : CID,
                SystemTag : GConf.systemTag
            })
            .then(function (response) {
                if(response.data.affectedRows) {
                    //setUpdateS(Math.random() * 10);
                    setMesgC('')
                    toast.success("Envoyer", GConf.TostSuucessGonf)
                  
                    
                }
                else{
                    toast.error('Erreur', GConf.TostSuucessGonf)
                    
                }
            })

        }
    }
    const SendNotification = (stateBtn) =>{
            axios.post(`https://api.abyedh.com/api/application/Search/request/firbase-notif`, {
                token : requestData.Notif_TID,
                message : {
                    title: requestData.R_ID,
                    body: t(`menuTabs.rdvPage.rdvInfoCardData.sendMessageBox.stateActionText.${stateBtn}`) ,
                    url: `https://abyedh.com/Profile/L/sv/${requestData.R_ID}`, 
                    photo: `https://cdn.abyedh.com/Images/Search/CIconsS/${GConf.systemTag}.gif`
                },
            }).then(function (response) {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            });
    }
    const DeleteMessage = (idValue) =>{
        axios.post(`https://api.abyedh.com/api/systems/app/request/info/messages/supprimer`, { 
            PID : GConf.PID,
            RID : CID,
            PK : idValue
        })
        .then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Supprimer", GConf.TostSuucessGonf)    
            }
            else{
                toast.error('Erreur', GConf.TostSuucessGonf)   
            }
        })
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
                            <Button  className={`rounded-pill ${reqState == 'R' ? 'bg-danger text-white' : 'bg-gray text-danger'}`}  fluid onClick={ () => UpdateRequestState('R',false,false,true,false) }><Icon name='trash' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.rejectBtn')} </Button>
                        </div>
                        <div className='col-6 mb-2'>
                            <Button  className={`rounded-pill ${reqState == 'A' ? 'bg-success text-white' : 'bg-gray text-success'}`}  fluid onClick={ () => UpdateRequestState('A',false,false,true,false) }><Icon name='check' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.acceptBtn')} </Button>
                        </div>
                        {/* <div className='col-6 mb-2'>
                            <Button  className={`rounded-pill ${reqState == 'RT' ? 'bg-retarder text-white' : 'bg-gray text-retarder'}`}  fluid onClick={ () => UpdateRequestState('RT',false,false,true,false) }><Icon name='delete calendar' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.retardBtn')} </Button>
                        </div>
                        <div className='col-6 mb-2'>
                            <Button  className={`rounded-pill ${reqState == 'RD' ? 'bg-rederecter text-white' : 'bg-gray text-rederecter'}`} fluid onClick={ () => UpdateRequestState('RD',false,false,true,false) }><Icon name='refresh' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.redirectBtn')} </Button>
                        </div> */}

                        <div className='col-12 mb-2'>
                            <Button as='a' href={`/S/rq/facturer/${CID}`}  animated  className='rounded-pill bg-system-btn'  fluid>
                                <Button.Content visible>  {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.addToCalendae')}  </Button.Content>
                                <Button.Content hidden >
                                    <Icon name='calendar check' />
                                </Button.Content>
                            </Button>
                             
                        </div>

                        <Divider />

                        <div className='col-12 mb-2'>
                            <Button  className={`rounded-pill ${reqState == 'T' ? 'bg-secondary text-white' : 'bg-gray text-secondary'}`}  fluid onClick={ () => UpdateRequestState('T',false,false,true,false)}><Icon name='refresh' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.termineBtn')} </Button>
                        </div>
                        <div className='col-12 mb-2'>
                            <Button  className={`rounded-pill ${reqState == 'S' ? 'bg-info text-white' : 'bg-gray text-info'}`}  fluid onClick={ () => UpdateRequestState('W',false,false,false,false)}><Icon name='eye' /> {t('menuTabs.rdvPage.rdvInfoCardData.controlBtnCard.nonSeenBtn')} </Button>
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
    const RequestData = () =>{
        return(<>
                <div className='card card-body bg-transparent border-div mb-3 mt-2'>
                    <h5> {t('menuTabs.rdvPage.rdvInfoCardData.infoReqCard.title')}  </h5>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-person me-2'></span> Nom  </td>
                                    <td>{loading ? requestData.Name : ''}</td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-person me-2'></span> Age  </td>
                                    <td>{loading ? requestData.User_Age : ''}</td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-person me-2'></span> Abonnemment  </td>
                                    <td>{loading ? requestData.Ab_Genre : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-star me-2'></span> Temps</td>
                                    <td>
                                        <ul>
                                            {loading ? 
                                            <>
                                            {JSON.parse(requestData.Wanted_Times).map((data,index) => <li key={index}>de {data.Wanted_Time_D.slice(0,-3)} à  {data.Wanted_Time_F.slice(0,-3)}</li>)}
                                            </> 
                                            : ''}
                                        </ul>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-chat-dots-fill me-2'></span> Commentaire</td>
                                    <td>{loading ? requestData.Comment : ''}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                     
                </div>
        </>)
    }

    const SimpleLoadinCard = (props) =>{
        return(<>
            <Placeholder fluid className='border-div w-100' style={{ height: 10}}>
                <Placeholder.Image />
            </Placeholder>
        </>)
    }
 
    return ( <> 
        <BreadCrumb links={GConf.BreadCrumb.RequestInfo} bcTag='RequestInfo' />
        <br />
        <div className="row">
            <div className="col-12 col-lg-8">
                <div className='row'>
                    <div className='col-8'><h2 className='text-center mb-4'> {t('menuTabs.rdvPage.rdvInfoCardData.title')} </h2></div>
                    <div className='col-4'><h2 className='text-end'><StateCard status={reqState} /></h2></div>
                </div> 

                <Tab menu={{widths: panesList.length ,   pointing: true  }} panes={panesList} />
                <br />
                
                <br />
                <div className='card card-body mb-4 border-div'>
                        
                        <h5 className='text-secondary'> {t('menuTabs.rdvPage.rdvInfoCardData.sendMessageBox.reponseText')}</h5>
                        <div className='card-body mb-2'>
                           
                            {
                                messagesListe.map((data,index) => <div className='mb-2'><span className={`bi bi-${data.PID == GConf.PID ? 'laptop'  : 'person'} text-gray me-2`}></span> <span   className={`${data.PID == GConf.PID ? 'bg-gray  text-dark '  : 'bg-info'} rounded-pill p-1  ps-2 pe-2`} key={index}>{data.Content} {data.PID == GConf.PID ? <Button size='tiny' icon className='p-0 bg-transparent text-danger' onClick={() => DeleteMessage(data.PK)} > <span className='bi bi-trash'></span></Button> : <></>} </span></div>)
                            }
                            
                        </div>

                    <SendBox SendMessage={SendMessage} setMesgC={setMesgC} msgContent={msgContent} OnKeyPressFunc={OnKeyPressFunc}/>
                </div>
            </div>
            
            <div className="col-12 col-lg-4">
                <Fade bottom>
                    <div className="sticky-top" style={{top:'70px', zIndex:2}}>
                        <BtnsCard />
                    </div>
                </Fade>
            </div>
        </div>
    </> );
}

export default RequestInfo;