import axios from 'axios';
import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import {Grid, _ } from "gridjs-react";
import { Button, Icon, Modal, Placeholder , Form, TextArea} from 'semantic-ui-react';
import { Select } from 'semantic-ui-react'
import { Bounce } from 'react-reveal';
import { NavLink, useParams } from 'react-router-dom';
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { CircularProgressbar,  buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { toast } from 'react-toastify';
import SuivieRequestData from './suivieRequestData'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

const SendBox = ({SendMessage, setMesgC,msgContent}) =>{
    const { t, i18n } = useTranslation();
    return(<>
             <div className='row '>
                <div className='col-10 align-self-center'>
                <Form>
                    <TextArea placeholder={t('appPages.requestInfoPage.sendBox.addResponse')} value={msgContent} className="mb-2 rounded-pill" rows='1' onChange={ (e) => setMesgC(e.target.value)}></TextArea>
                </Form>
                </div>
                <div className='col-2 align-self-center text-end'><Button  icon='send'  className='rounded-circle mb-2' onClick={SendMessage}></Button></div>
            </div>
        </>)
  }

function SuiviePage() {
    /* ###########################[const]############################ */
   let {RID} = useParams()
   let userData = JSON.parse(localStorage.getItem("UID"));
   let [loading, SetLoading] = useState(true)
   let [suivieData, setSuivieData] = useState([])
   const [requestData, setRequestData] = useState([])
    const [messagesListe, setMessageListe] = useState([])
    const [msgContent, setMesgC] = useState('')
   const [openD, setOpenD] = useState(false)
   const [selectedForModal, setSelectedForModal] = useState('docteur_rdv')
   const { t, i18n } = useTranslation();

   /*#########################[UseEffect]###########################*/
   useEffect(() => {
       window.scrollTo(0, 0);
       axios.post(`${GConf.ApiProfileLink}/suivie/select`, {
            UID : userData,
            RID : RID,
         })
         .then(function (response) {
               setSuivieData(response.data)
               SetLoading(false)
         }).catch((error) => {
           if(error.request) {
             toast.error(<><div><h5>مشكل في الإتصال</h5> لم نتمكن من الوصول لقاعدة البيانات </div></>, GConf.TostInternetGonf)   
             SetLoading(false)
             setSuivieData([])
           }
         });

         axios.post(`https://api.abyedh.com/api/systems/app/request/info/messages`, {
            PID : 'GConf.PID',
            CID: RID,
            SystemTag : 'TAG'
          })
          .then(function (response) {
            setMessageListe(response.data) 
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
            }
          });

   }, [])

 

   /* ###########################[Function]############################# */
    const OpenModalFunction = (genre) =>{
        setSelectedForModal(genre)
        setOpenD(true)
    }
   /* ###########################[Card]############################# */
    const SuivieCard = (props) =>{
        const CircularPourcentage = (props) =>{
            return(<>
                <div style={{ width: 40, height: 40 }} >
                    <CircularProgressbar strokeWidth={5}  maxValue={100} minValue={0} value={props.value} text={`${props.value}%`}  styles={ {background:{ fill: 'red'}}} /> 
                </div>
                {/*  */}
            </>)
        }
        const ActionBtns = () =>{
            return(<>
                <div className='p-1 mt-2 mb-0 m-0 '>
                    <Button size='mini'  className='rounded-pill mb-2 '  icon> <Icon name='trash' /> حــذف </Button>
                    <Button size='mini'  className='rounded-pill mb-2' icon> <Icon name='edit' /> تعديــل </Button>
                </div>
            </>)
        }
        const SmallActionBtns = () =>{
            return(<>
                <div className='p-1  mb-0 m-0 mt-5'>
                    <Button size='mini' fluid className='rounded-pill w-action-btn mb-2 '  icon> <Icon name='trash' /> حــذف </Button>
                    <Button size='mini' fluid  className='rounded-pill w-action-btn mb-2' icon> <Icon name='edit' /> تعديــل </Button>
                </div>
            </>)
        }
        const RendredData = () =>{
            return(<>
                <div className='text-end pe-3 card-body'   dir='ltr'>
                    <div dir='rtl'>
                        <div className='text-end mb-3'><b> <span className='bi bi-bookmarks-fill text-danger'></span> التفاصيل : </b></div> 
                        {SuivieRequestData[props.data.Notif_Name].GenTextFunction(props.data.RequestData,props.data.PidData)}
                    </div>
                    <div className="floating-card-suivie" style={{zIndex: 10000}} >
                        <Button size='mini' onClick={() => OpenModalFunction(props.data.Notif_Name)} className='rounded-pill' icon> <Icon name='sort amount down' /> </Button>
                    </div>
                </div>
            </>)
        }
        const SetpsCard = () =>{
            return(<>
                <div className='text-end  '  dir='ltr'>

                        {props.data.NotifList.map((data,index) => 
                            <div className="mb-2" >
                                <small>{new Date(data.Notif_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</small>
                                <h5 className='m-0 p-0 mb-0' dir='rtl'><Icon name='check'  style={{with:20, marginTop:3 , marginLeft:4}} /> {SuivieRequestData[data.Notif_Genre].stepsValues2[data.Notif_Name].text}</h5>  
                                
                            </div>

                        ) }
                        {/* <div className="floating-card-suivie" style={{zIndex: 10000}} >
                            <Button size='mini' onClick={() => OpenModalFunction(props.data.Notif_Name)} className='rounded-pill' icon> <Icon name='sort amount down' /> </Button>
                        </div> */}
                </div>
            </>)
        }
        return(<>
            <div className='card p-2 pb-0 shadow-sm mb-3 border-div'>
                    <div className='row'>
                        <div className='col-10'> 
                            <div className="d-flex align-items-center">
                                <div className="flex-shrink-0">
                                    <img src={`https://cdn.abyedh.com/images/Search/CIcons/${props.data.P_Genre}.gif`} alt="..."  width='50px' height='50px'/>
                                </div>
                                <div className="flex-grow-1 ms-3">
                                    <h4 className='mb-0 text-secondary'><NavLink exact='true' to={`/S/P/${props.data.P_Genre}/${props.data.PID}`}>{props.data.PidData.Name}</NavLink></h4>
                                    <div><small>{new Date(props.data.Notif_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} | {SuivieRequestData[props.data.Notif_Name].title} </small></div>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 align-self-center text-center text-end'> <CircularPourcentage value={SuivieRequestData[props.data.Notif_Name].stepsValues2[props.data.State].value} /> </div>
                    </div>
                <div className='card-body pb-0 d-none d-lg-block'>
                    <div className='row'>
                        <div className='col-6'> <RendredData /> </div>
                        <div className='col-6 align-self-center'> <SetpsCard  /> </div>
                        <div className='col-12 text-end pt-2 navshad-top'><ActionBtns /></div>
                    </div>
                </div>
                <div className='card-body d-lg-none pb-0'>
                    <Swiper
                        spaceBetween={1}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper pb-0 text-center"
                    >
                                
                                {/* <SwiperSlide key={2}> <SetpsCard  /> </SwiperSlide> */}
                                <SwiperSlide key={1}> <RendredData /> </SwiperSlide>
                                
                                {/* <SwiperSlide key={3}> <SmallActionBtns  /> </SwiperSlide> */}
                        
                    </Swiper>
                    
                </div>
            </div>
            <div className='card-body'>
                <SetpsCard  />
            </div>
            
        </>)
    }
    const SekeltonCard = () =>{
        const PlaceHolderCard = () =>{
            return(<>
            <Placeholder className='mb-0 border-div' style={{ height: 120, width: '100%' }}>
                <Placeholder.Image />
            </Placeholder>
            </>)
        }
        return(<>
            <PlaceHolderCard />
            <PlaceHolderCard />
            <PlaceHolderCard />
        </>)
    }
    const EmptyCard = () =>{
        return(<>
            <div className='card-body text-center'>
                <img src='https://cdn.abyedh.com/images/profile/suivie-empty.png' width='80%'  height='290px' />
                <h5>لا توجد نتائج</h5> 
            </div>
        </>)
    }
    const SendMessage = () =>{
  
        if (!msgContent) {toast.error("Message Vide !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiLink}/request/info/messages/ajouter`, { 
                msgC: msgContent,
                PID : suivieData[0].PID,
                RID : RID,
                SystemTag : 'TAG'
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

    return (  <>
        {
            loading ? 
            <SekeltonCard /> 
            :
            <>
                {
                    suivieData.length == 0 ?
                    <EmptyCard />
                    :
                    <>
                       { suivieData.map((data,i) => <SuivieCard  key={i} data={data} />)}
                       <h5 className='text-secondary'> {t('appPages.requestInfoPage.reponseText')}</h5>
                        <ul>
                        {
                            messagesListe.map((data,index) => <li key={index}>{data.Content}</li>)
                        }
                        </ul>
                        <SendBox SendMessage={SendMessage} setMesgC={setMesgC} msgContent={msgContent}/>

                    </>
                }
            </>
        }
        <Modal
                onClose={() => setOpenD(false)}
                onOpen={() => setOpenD(true)}
                open={openD}
                dimmer= 'blurring'
                    
                >
                <Modal.Content  >
                {selectedForModal}
                <VerticalTimeline animate={ false } layout={ '1-column-left' } lineColor={ '#a1a1a1' }>
                        {SuivieRequestData[selectedForModal].stepsValues.map((data,index) => 
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'white', }}
                                contentArrowStyle={{ borderRight: '7px solid  #44494a' , top: 5 }}
                                iconStyle={{ background: data.color, width:25, height:25, marginLeft:7, color: '#fff' }}
                                icon={<Icon name={`${data.icon}`}  style={{with:20, marginTop:3 , marginLeft:4}} />}
                                 
                            > 
                             <div className="text-end  mb-0">{data.text}</div>
 
                            </VerticalTimelineElement>
                        )}
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: 'white',}}
                                contentArrowStyle={{ borderRight: '7px solid  #44494a' , top: 5 }}
                                iconStyle={{ background: 'yellow', width:25, height:25, marginLeft:7, color: '#fff' }}
                                icon={<Icon name='star'  style={{with:20, marginTop:3 , marginLeft:4}} />}
                            >
                                <b className='text-end d-block'>النهاية</b>
                            </VerticalTimelineElement>
                        </VerticalTimeline>
                </Modal.Content>
            </Modal>
    </>);
}


export default SuiviePage;