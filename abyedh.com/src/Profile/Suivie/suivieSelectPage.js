import axios from 'axios';
import React, { Suspense, useEffect, useState } from 'react';
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
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
//ACTION
const DocteurEdit = React.lazy(() => import('./Edit/docteur'));
const InfirmierEdit = React.lazy(() => import('./Edit/infirmier'));
const GarderieEdit = React.lazy(() => import('./Edit/garderie'));
const PharmacieEdit = React.lazy(() => import('./Edit/pharmacie'));
const RestaurantEdit = React.lazy(() => import('./Edit/restaurant'));
const CliniqueEdit = React.lazy(() => import('./Edit/clinique')); 
const AutoEcoleEdit = React.lazy(() => import('./Edit/autoecole'));
const AvocatEdit = React.lazy(() => import('./Edit/avocat'));
const BoutiqueEdit = React.lazy(() => import('./Edit/boutique'));
const CafeEdit = React.lazy(() => import('./Edit/cafe'));
const CentreMdEdit = React.lazy(() => import('./Edit/centreMD'));
const GymEdit = React.lazy(() => import('./Edit/gym'));
const EcoleEdit = React.lazy(() => import('./Edit/ecole'));
const ComptableEdit = React.lazy(() => import('./Edit/comptable'));
const CoiffureEdit = React.lazy(() => import('./Edit/coiffure'));
const HotelsEdit = React.lazy(() => import('./Edit/hotels'));
const LaboEdit = React.lazy(() => import('./Edit/labo'));
const LibrairieEdit = React.lazy(() => import('./Edit/librairie'));
const FormationEdit = React.lazy(() => import('./Edit/formation'));
const LyceeEdit = React.lazy(() => import('./Edit/lycee'));
const StadeEdit = React.lazy(() => import('./Edit/stade'));
const SociteEdit = React.lazy(() => import('./Edit/socite'));
const SmasarEdit = React.lazy(() => import('./Edit/samsar'));
const PyscineEdit = React.lazy(() => import('./Edit/pyscine'));
const UniversiteEdit = React.lazy(() => import('./Edit/universite'));
const TransporteurEdit = React.lazy(() => import('./Edit/transporteur'));
const StorageEdit = React.lazy(() => import('./Edit/storage'));
const VgAgenceEdit = React.lazy(() => import('./Edit/vg_agence'));
const HauseElectroEdit = React.lazy(() => import('./Edit/house_electro'));
const HauseMeubleEdit = React.lazy(() => import('./Edit/house_meuble'));
const PtvMagazinEdit = React.lazy(() => import('./Edit/ptvente_shop'));
const PtvPatesserieEdit = React.lazy(() => import('./Edit/ptvente_patesserie'));
const PtvFuiterieEdit = React.lazy(() => import('./Edit/ptvente_fruit'));
const PtvVBoulengerieEdit = React.lazy(() => import('./Edit/ptvente_boulengerie'));
const PtvEpecerieEdit = React.lazy(() => import('./Edit/ptvente_small_shop'));
const PtvViandeEdit = React.lazy(() => import('./Edit/ptvente_viande'));
const ChantierArchitectureEdit = React.lazy(() => import('./Edit/chantier_architecture'));
const ChantierContracteurEdit = React.lazy(() => import('./Edit/chantier_contrateur'));
const ChantierQuicaillerieEdit = React.lazy(() => import('./Edit/chantier_quincaillerie'));
const HandmadeCristalEdit = React.lazy(() => import('./Edit/handmade_cristal'));
const HandmadeElectricienEdit = React.lazy(() => import('./Edit/handmade_electricien'));
const HandmadeForferonEdit = React.lazy(() => import('./Edit/handmade_forgeron'));
const HandemadeMarbreEdit = React.lazy(() => import('./Edit/handmade_marbre'));
const HandemadeMenuisierEdit = React.lazy(() => import('./Edit/handmade_menuisier'));
const HandemadePeintureEdit = React.lazy(() => import('./Edit/handmade_peinture'));
const HandemadePlombierEdit = React.lazy(() => import('./Edit/handmade_plombier'));
const CarQiosqieEdit = React.lazy(() => import('./Edit/car_qiosque'));
const CarMecanicienEdit = React.lazy(() => import('./Edit/car_mecanicien'));
const CarLocationEdit = React.lazy(() => import('./Edit/car_location'));
const CarParkingEdit = React.lazy(() => import('./Edit/car_parking'));
const ArtCinemaEdit = React.lazy(() => import('./Edit/art_cinema'));
const ArtMuseeEdit = React.lazy(() => import('./Edit/art_musee'));
const ArtTheatreEdit = React.lazy(() => import('./Edit/art_theatre'));
const WeddingOrchestreEdit = React.lazy(() => import('./Edit/wedding_orchestre'));
const WeddingFournitureMarriageEdit = React.lazy(() => import('./Edit/wedding_fourniture_marriage'));
const WeddingPhotographeEdit = React.lazy(() => import('./Edit/wedding_photographe'));
const WeddingBijouxEdit = React.lazy(() => import('./Edit/wedding_bijoux'));
const WeddingChefEdit = React.lazy(() => import('./Edit/wedding_chef'));
const WeddingSallonMariageEdit = React.lazy(() => import('./Edit/wedding_salon_marriage'));
const VeterinaireEdit = React.lazy(() => import('./Edit/veterinaire'));
const FourragerieEdit = React.lazy(() => import('./Edit/fourragerie'));



const ForLazyLoading = () =>{
    return (<>
                       
            <br />
            <div className="loader-container-small">
              <div className="loader-small"></div>
            </div>          
            <br />            
                                       
        </>);
}

const DeleteCard = () => {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    return(<> 
        <div className='p-1'>
            <h5 className={` text-secondary ${isRTL ? 'text-end' : 'text-start'} `} >  هل تريد فعلا ان تقوم بمحو هذا الطلب  </h5>
            <br />
            <Button className='bg-danger text-white rounded-pill' fluid onClick={() => alert('Delated')}>  تأكيد حذف الطلب  </Button> 
        </div>
     </>)
}
const EditCard = ({PID,tag, UID}) => {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const ActionStateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const IndefinieCard = (props) =>{
            return(<>
                <div className='text-center p-2 text-secondary'>
                        <span className='bi bi-file-earmark-lock bi-lg '></span>
                        <h5>صفحة غير متوفرة</h5> 
                </div>
            </>)
        }
        
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'docteur': return  <Suspense fallback={<ForLazyLoading />}><DocteurEdit TAG={tag} PID={PID} UID={UID} /></Suspense>;  
            case 'infirmier': return  <Suspense fallback={<ForLazyLoading />}><InfirmierEdit TAG={tag} PID={PID} UID={UID} /></Suspense>;  
            case 'pharmacie': return <Suspense fallback={<ForLazyLoading />}><PharmacieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'clinique': return <Suspense fallback={<ForLazyLoading />}><CliniqueEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'labo': return <Suspense fallback={<ForLazyLoading />}><LaboEdit TAG={tag} PID={PID} UID={UID} /></Suspense> ;
            case 'centreMD': return <Suspense fallback={<ForLazyLoading />}><CentreMdEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'garderie': return <Suspense fallback={<ForLazyLoading />}><GarderieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'autoecole': return <Suspense fallback={<ForLazyLoading />}><AutoEcoleEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'ecole': return <Suspense fallback={<ForLazyLoading />}><EcoleEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'lycee': return <Suspense fallback={<ForLazyLoading />}><LyceeEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'universite': return <Suspense fallback={<ForLazyLoading />}><UniversiteEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'formation': return <Suspense fallback={<ForLazyLoading />}><FormationEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'librairie': return <Suspense fallback={<ForLazyLoading />}><LibrairieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'transporteur': return <Suspense fallback={<ForLazyLoading />}><TransporteurEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'cafe': return <Suspense fallback={<ForLazyLoading />}><CafeEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'restaurant': return <Suspense fallback={<ForLazyLoading />}><RestaurantEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'magazin': return <Suspense fallback={<ForLazyLoading />}><PtvMagazinEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'boulengerie': return <Suspense fallback={<ForLazyLoading />}><PtvVBoulengerieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'boucherie': return <Suspense fallback={<ForLazyLoading />}><PtvViandeEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'fruiterie': return <Suspense fallback={<ForLazyLoading />}><PtvFuiterieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'patesserie': return <Suspense fallback={<ForLazyLoading />}><PtvPatesserieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'epicerie': return <Suspense fallback={<ForLazyLoading />}><PtvEpecerieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'electromenager': return <Suspense fallback={<ForLazyLoading />}><HauseElectroEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'meublerie': return <Suspense fallback={<ForLazyLoading />}><HauseMeubleEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'location': return <Suspense fallback={<ForLazyLoading />}><CarLocationEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'parking': return <Suspense fallback={<ForLazyLoading />}><CarParkingEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'qiosque': return <Suspense fallback={<ForLazyLoading />}><CarQiosqieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'mecanicien': return <Suspense fallback={<ForLazyLoading />}><CarMecanicienEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'courtier': return <Suspense fallback={<ForLazyLoading />}><SmasarEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'contracteur': return <Suspense fallback={<ForLazyLoading />}><ChantierContracteurEdit TAG={tag} PID={PID} UID={UID} /></Suspense>   ;
            case 'architecture': return <Suspense fallback={<ForLazyLoading />}><ChantierArchitectureEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'quincaillerie': return <Suspense fallback={<ForLazyLoading />}><ChantierQuicaillerieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'forgeron': return <Suspense fallback={<ForLazyLoading />}><HandmadeForferonEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'menuisier': return <Suspense fallback={<ForLazyLoading />}><HandemadeMenuisierEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'peinture': return <Suspense fallback={<ForLazyLoading />}><HandemadePeintureEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'electricien': return <Suspense fallback={<ForLazyLoading />}><HandmadeElectricienEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'plombier': return <Suspense fallback={<ForLazyLoading />}><HandemadePlombierEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'cristalerie': return <Suspense fallback={<ForLazyLoading />}><HandmadeCristalEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'marbrerie': return <Suspense fallback={<ForLazyLoading />}><HandemadeMarbreEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'coiffure': return <Suspense fallback={<ForLazyLoading />}><CoiffureEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'boutique': return <Suspense fallback={<ForLazyLoading />}><BoutiqueEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'salle_marriage': return <Suspense fallback={<ForLazyLoading />}><WeddingSallonMariageEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'orchestre': return <Suspense fallback={<ForLazyLoading />}><WeddingOrchestreEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'chef': return <Suspense fallback={<ForLazyLoading />}><WeddingChefEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'photographe': return <Suspense fallback={<ForLazyLoading />}><WeddingPhotographeEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'fourniture_marriage': return <Suspense fallback={<ForLazyLoading />}><WeddingFournitureMarriageEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'bijouterie': return <Suspense fallback={<ForLazyLoading />}><WeddingBijouxEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'gym': return <Suspense fallback={<ForLazyLoading />}><GymEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'pyscine': return <Suspense fallback={<ForLazyLoading />}><PyscineEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'stade': return <Suspense fallback={<ForLazyLoading />}><StadeEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'cinema': return <Suspense fallback={<ForLazyLoading />}><ArtCinemaEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'theatre': return <Suspense fallback={<ForLazyLoading />}><ArtTheatreEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'musee': return <Suspense fallback={<ForLazyLoading />}><ArtMuseeEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'avocat': return <Suspense fallback={<ForLazyLoading />}><AvocatEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'depot': return <Suspense fallback={<ForLazyLoading />}><StorageEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'comptable': return <Suspense fallback={<ForLazyLoading />}><ComptableEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'socite': return <Suspense fallback={<ForLazyLoading />}><SociteEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'hotels': return <Suspense fallback={<ForLazyLoading />}><HotelsEdit TAG={tag} PID={PID} UID={UID} /></Suspense> ;
            case 'vg_agence': return <Suspense fallback={<ForLazyLoading />}><VgAgenceEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'veterinaire': return <Suspense fallback={<ForLazyLoading />}><VeterinaireEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;
            case 'fourragerie': return <Suspense fallback={<ForLazyLoading />}><FourragerieEdit TAG={tag} PID={PID} UID={UID} /></Suspense>  ;

            default:  return <IndefinieCard />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };

    return(<> <ActionStateCard status={tag} />  </>)
}
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
   const [activeIndex, setActiveIndex] = useState(0)
    

   /*#########################[UseEffect]###########################*/
   useEffect(() => {
       window.scrollTo(0, 0);
       axios.post(`${GConf.ApiProfileLink}/suivie/select`, {
            UID : userData,
            RID : RID,
         })
         .then(function (response) {
               setSuivieData(response.data)
               console.log(response.data)
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
    const OpenBottomSheetFunction = (genre) => {
        setActiveIndex(genre)
        setOpenD(!openD)
    }

   /* ###########################[Card]############################# */
   const StateCard = ({ status }) => {
    const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
    const statusCard = React.useCallback(() => {
      switch(status) {
        case 'W': return <StateCard color='warning' text={t('appPages.requestPage.stateText.W')} />;  
        case 'S': return <StateCard color='info' text={t('appPages.requestPage.stateText.S')} />;  
        case 'A': return <StateCard color='success' text={t('appPages.requestPage.stateText.A')} /> ;
        case 'R': return <StateCard color='danger' text={t('appPages.requestPage.stateText.R')} />;

        case 'RT': return <StateCard color='retarder' text={t('appPages.requestPage.stateText.RT')} />;
        case 'RD': return <StateCard color='rederecter' text={t('appPages.requestPage.stateText.RD')} />;
        case 'LV': return <StateCard color='retarder' text={t('appPages.requestPage.stateText.LV')} />;
        case 'MD': return <StateCard color='redirecter' text={t('appPages.requestPage.stateText.MD')} />;
        case 'PR': return <StateCard color='redirecter' text={t('appPages.requestPage.stateText.PR')} />;
        case 'PI': return <StateCard color='retarder' text={t('appPages.requestPage.stateText.PI')} />;

        case 'T': return <StateCard color='secondary' text={t('appPages.requestPage.stateText.T')} />;
        default:  return <StateCard color='dark' text={t('appPages.requestPage.stateText.default')} />;    
      }
    }, [status]);
  
    return (
      <div className="p-1">
        {statusCard()}
      </div>
    );
    };

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
                    <Button size='mini'  className='rounded-pill mb-2 '  icon onClick={() => OpenBottomSheetFunction('delete')}> <Icon name='trash' /> حــذف </Button>
                    <Button size='mini'  className='rounded-pill mb-2' icon onClick={() => OpenBottomSheetFunction('edit')}> <Icon name='edit' /> تعديــل </Button>
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
                    <div className="floating-card-suivie d-none" style={{zIndex: 10000}} >
                        <Button size='mini' onClick={() => OpenModalFunction(props.data.Notif_Name)} className='rounded-pill' icon> <Icon name='sort amount down' /> </Button>
                    </div>
                    <div className='d-lg-none' >
                        <Button.Group fluid>
                            <Button className='bg-white' icon onClick={() => OpenBottomSheetFunction('delete')} dir='rtl'> <Icon name='trash' className='text-danger'/> حــذف </Button>
                            <Button  className='bg-white' icon onClick={() => OpenBottomSheetFunction('edit')} dir='rtl' > <Icon name='edit outline' className='text-info' /> تعديل </Button>
                        </Button.Group>
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
                        <div className='col-9'> 
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
                        <div className='col-3 align-self-center text-center  '> <StateCard status={props.data.RequestData.State} />  </div>
                        {/* <div className='col-2 align-self-center text-center text-end'> <CircularPourcentage value={SuivieRequestData[props.data.Notif_Name].stepsValues2[props.data.State].value} /> </div> */}
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
        {/* <Modal
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
            </Modal> */}
            <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                <div className='p-1'>
                        { activeIndex =='delete' ?   <DeleteCard /> : <></> }  
                        { activeIndex == 'edit' ?  <EditCard tag={suivieData[0].P_Genre} PID={suivieData} UID={userData} /> : <></> }
                 
                 </div>
            </BottomSheet>
    </>);
}


export default SuiviePage;