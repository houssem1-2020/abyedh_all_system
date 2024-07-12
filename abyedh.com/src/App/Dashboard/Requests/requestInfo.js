import React, { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../../AssetsM/APPConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Dropdown, Form, Icon, Input, List, Menu, Modal, Select, Tab, TextArea } from 'semantic-ui-react';
import APPItem from '../../AssetsM/APPITEM';
import APPConf from '../../AssetsM/APPConf';

import Docteur from './infoPage/docteur'; 
import Infirmier from './infoPage/infirmier'; 
import PharmacieRdv from './infoPage/pharmacie_rdv';
import PharmacieShop from './infoPage/pharmacie_shop';
import Clinique from './infoPage/clinique_reserver'; 

import GarderieInscription from './infoPage/garderie_inscription';
import GarderieSouscrie from './infoPage/garderie_souscrire';
import FormationInscription from './infoPage/formation_inscription';
import FormationSouscrie from './infoPage/formation_souscrire';
import RestaurantReservation from './infoPage/restaurant';
import RestaurantCommande from './infoPage/restaurantcommande';
import AutoEcole from './infoPage/autoecole_inscrie';
import Avocat from './infoPage/avocat_rdv';
import Boutique from './infoPage/boutique_shop';
import CafeCommande from './infoPage/cafe_commande';
import CafeReservation from './infoPage/cafe_reservation';
import CentreMd from './infoPage/centre_reserver';
import Gym from './infoPage/sport_salle_souscrire';
import EcoleInscrie from './infoPage/ecole_inscrie';
import EcoleSouscrie from './infoPage/ecole_souscrire';
import Comptable from './infoPage/comptable_service';
import Coiffure from './infoPage/coiffure_reserver';

import HotelsReserver from './infoPage/hotels_reserver';
import HotelsService from './infoPage/hotels_service';
import Labo from './infoPage/labo_rdv';
import Librairie from './infoPage/librairie_shop';
import LyceeInscrie from './infoPage/college_lycee_inscrie';
import LyceeSouscrie from './infoPage/college_lycee_souscrire';
import StadeReserver from './infoPage/stade_reserver';
import StadeSouscrie from './infoPage/stade_souscrire';
import Socite from './infoPage/socite';
import CourtierRequest from './infoPage/courtier_request';
import CourtierTorent from './infoPage/courtier_torent';
import PyscineReserver from './infoPage/pyscine_reserver';
import PyscineSouscrie from './infoPage/pyscine_souscrire';
import UniversiteInscrie from './infoPage/universite_inscrie';
import UniversiteSouscrie from './infoPage/universite_souscrire';
import Transporteur from './infoPage/transporteur_request';
import Depot from './infoPage/depot_commande';
import VgAgence from './infoPage/agence_service';

import Electromenager from './infoPage/electromenager_shop';
import Meublerie from './infoPage/meubles_shop';

import Magazin from './infoPage/magazin_commande';
import Patesserie from './infoPage/patisserie_shop';
import Fruiterie from './infoPage/fruiterie_shop';
import Boulengerie from './infoPage/boulangerie_shop';
import Epecerie from './infoPage/epicerie_shop';
import Boucherie from './infoPage/boucheries_shop';

import Architecture from './infoPage/architecture_service';
import Contracteur from './infoPage/contracteur_service';
import Quicaillerie from './infoPage/quincaillerie_shop';

import Cristalerie from './infoPage/handmade_cristal';
import Electricien from './infoPage/handmade_electricien';
import Forferon from './infoPage/handmade_forgeron';
import Marbrerie from './infoPage/handmade_marbre';
import Menuisier from './infoPage/handmade_menuisier';
import Peinture from './infoPage/handmade_peinture';
 import Plombier from './infoPage/handmade_plombier';

import Qiosqie from './infoPage/qiosque_lavage';
import QiosqieRequest from './infoPage/qiosque_request';
// import Mecanicien from './infoPage/mecanicien';
 import Location from './infoPage/location_request';
 import ParkingReserver from './infoPage/parking_reserver';
 import ParkingSouscrie from './infoPage/parking_souscrire';

import Cinema from './infoPage/cinema_reserver';
import Musee from './infoPage/musee_reserver';
import Theatre from './infoPage/theatre_reserver';

import Orchestre from './infoPage/orchestre_reserver';
import FournitureMarriage from './infoPage/fourniture_marriage_location';
import Photographe from './infoPage/photographe_reserver';
import Bijouterie from './infoPage/bijouterie_shop';
import Chef from './infoPage/chef_reserver';
import SallonMariage from './infoPage/salon_marriage_reserver';
import Veterinaire from './infoPage/veterinaire'; 
import axios from 'axios';
import { toast } from 'react-toastify';
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

function RequestInfo() {
    /*#########################[Const]##################################*/
     
    const {TAG,CID} = useParams()
    const [activeIndex, setActiveIndex] = useState(0)
    const [reqState, setReqState] = useState('')
    const [loading , setLoading] = useState(false)
    const [requestData, setRequestData] = useState([])
    const [messagesListe, setMessageListe] = useState([])
    const [msgContent, setMesgC] = useState('')
    const [updateS, setUpdateS] = useState()
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const panesInfo = [
      {
          menuItem: { key: 'articles', icon: 'file alternate', content: `${ findElementByLink(`rq/${TAG}`) } ` }, 
          render: () => <><h5> {t('appPages.requestInfoPage.tabsCard.one')} { findElementByLink(`rq/${TAG}`) }  <SpecificCard status={TAG} /> </h5> </>,
      },            
      {
          menuItem: { key: 'start', icon: 'user', content: t('appPages.requestInfoPage.tabsCard.two') }, 
          render: () => <UserCard />,
      }
      
  ]
  
  
    /*#########################[useEffect]##################################*/ 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request/info`, {
            PID : GConf.PID,
            CID: CID,
            SystemTag : TAG
          })
          .then(function (response) {
                 
                if (!response.data.PID) {
                    toast.error('Demmande Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/App/S"; }, 2000)
                } else {
                    setRequestData(response.data)
                    setLoading(true)
                    setReqState(response.data.State)  
                    if (response.data.State == 'W') { UpdateRequestState('S',false,false,false,false)} 
                }  
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
              setRequestData([])
              setLoading(true)
            }
          });

          axios.post(`${GConf.ApiLink}/request/info/messages`, {
            PID : GConf.PID,
            CID: CID,
            SystemTag : TAG
          })
          .then(function (response) {
            setMessageListe(response.data) 
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
            }
          });

    }, [])

    /*#########################[Functions]#############################*/
      const OnKeyPressFunc = (e) => {
          if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
              e.preventDefault();
          }   
      }
      function findElementByLink(link) {
          for (const category in APPItem) {
            if (APPItem[category] && APPItem[category].itemsList) {
              for (const slide of APPItem[category].itemsList) {
                if (Array.isArray(slide)) {
                  for (const subSlide of slide) {
                    if (subSlide.link === link) {
                      return subSlide.itemName
                    }
                  }
                } else if (slide.link === link) {
                  return slide.itemName
                }
              }
            }
          }
          return null;
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

      const UpdateRequestState = (stateBtn,dataGenre,selectedData,saveNotif,actionName) =>{
          axios.post(`${GConf.ApiLink}/request/controle`, {
              PID : GConf.PID,
              UID : requestData.UID,
              TAG : APPConf.systemTag,
              RID: CID,
              genreTag : TAG,
              state: stateBtn,
              data: selectedData,
              dataGenre: dataGenre,
              saveNotif : false,
              actionName : `${TAG}_${actionName}`,
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

      const SendMessage = () =>{
        if (!msgContent) {toast.error("Message Vide !", GConf.TostErrorGonf)}
        else{
            axios.post(`${GConf.ApiLink}/request/info/messages/ajouter`, { 
                msgC: msgContent,
                PID : GConf.PID,
                RID : CID,
                SystemTag : TAG
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

    /*#########################[Card]##################################*/
    const IndefinieCard = (props) =>{
        return(<>
            <div className='text-center p-2 text-secondary'>
                    <span className='bi bi-file-earmark-lock bi-lg '></span>
                    <h5>صفحة غير متوفرة</h5> 
            </div>
        </>)
    }

    const SpecificCard = ({ status }) => {
      const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
      const statusCard = React.useCallback(() => {
      switch(status) {
        case 'docteur_rdv': return <Docteur TAG={GConf.systemTag} PID={GConf.systemTag} />;  
        case 'infirmier_rdv': return <Infirmier TAG={GConf.systemTag} PID={GConf.systemTag} />;  
         case 'pharmacie_shop': return <PharmacieShop TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
         case 'pharmacie_rdv': return <PharmacieRdv TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
         case 'clinique_reserver': return <Clinique TAG={GConf.systemTag} PID={GConf.systemTag} /> ;

            case 'labo_rdv': return <Labo TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'centre_reserver': return <CentreMd TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'garderie_inscription': return <GarderieInscription TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'garderie_souscription': return <GarderieSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'formation_inscription': return <FormationInscription TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'formation_souscription': return <FormationSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'autoecole_inscrie': return <AutoEcole TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'ecole_inscription': return <EcoleInscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'ecole_souscription': return <EcoleSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'lycee_inscription': return <LyceeInscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'lycee_souscription': return <LyceeSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'universite_inscription': return <UniversiteInscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'universite_souscription': return <UniversiteSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'librairie_shop': return <Librairie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'transporteur_request': return <Transporteur TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'cafe_commande': return <CafeCommande TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'cafe_reservation': return <CafeReservation TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'restaurant_reservation': return <RestaurantReservation TAG={GConf.systemTag} PID={GConf.systemTag}  /> ;
            case 'restaurant_commande': return <RestaurantCommande TAG={GConf.systemTag} PID={GConf.systemTag}  /> ;
          case 'magazin_commande': return <Magazin TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'boulangerie_shop': return <Boulengerie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'boucheries_shop': return <Boucherie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'fruiterie_shop': return <Fruiterie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'patisserie_shop': return <Patesserie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'epicerie_shop': return <Epecerie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'electromenager_shop': return <Electromenager TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'meubles_shop': return <Meublerie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'location_request': return <Location TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'parking_reserver': return <ParkingReserver TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'parking_souscrire': return <ParkingSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'qiosque_request': return <QiosqieRequest TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'qiosque_lavage': return <Qiosqie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
        //   case 'mecanicien': return <Mecanicien TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'courtier_request': return <CourtierRequest TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'courtier_torent': return <CourtierTorent TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'contracteur_service': return <Contracteur TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'architecture_service': return <Architecture TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'quincaillerie_shop': return <Quicaillerie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'forgeron': return <Forferon TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'menuisier': return <Menuisier TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'peinture': return <Peinture TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'electricien': return <Electricien TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'plombier': return <Plombier TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'cristal': return <Cristalerie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'marbre': return <Marbrerie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'coiffure_reserver': return <Coiffure TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'boutique_shop': return <Boutique TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'salon_marriage_reserver': return <SallonMariage TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'orchestre_reserver': return <Orchestre TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'chef_reserver': return <Chef TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'photographe_reserver': return <Photographe TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'fourniture_marriage_location': return <FournitureMarriage TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'bijouterie_shop': return <Bijouterie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'gym_souscription': return <Gym TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'pyscine_reserver': return <PyscineReserver TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'pyscine_souscrire': return <PyscineSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'stade_reserver': return <StadeReserver TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'stade_souscrire': return <StadeSouscrie TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'cinema_reserver': return <Cinema TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'theatre_reserver': return <Theatre TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'musee_reserver': return <Musee TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'avocat_rdv': return <Avocat TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'depot_commande': return <Depot TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'comptable_service': return <Comptable TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'socite': return <Socite TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'hotels_reserver': return <HotelsReserver TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
            case 'hotels_service': return <HotelsService TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'agence_service': return <VgAgence TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'veterinaire_rdv': return <Veterinaire TAG={GConf.systemTag} PID={GConf.systemTag} />;
          default:  return <IndefinieCard />;    
      }
      }, [status]);
  
      return (
      <div className="">
          {statusCard()}
      </div>
      );
    }
    
    const UserCard = () =>{
      return(<>

                  <h5> {t('appPages.requestInfoPage.userCard.title')} </h5>
                  <div className='row mb-2'>
                      <div className='text-center mb-3'> 
                          <img src={`https://cdn.abyedh.com/images/p_pic/${requestData.PictureId}.gif`} className='rounded-circle' width='60px'/>
                      </div>
                      <div className='col-12 col-lg-6 mb-2'><span className='bi bi-person-fill'></span> {t('appPages.requestInfoPage.userCard.nom')} :  {loading ? requestData.Name : ''}</div> 
                      <div className='col-12 mb-2'><span className='bi bi-calendar-fill'></span> {t('appPages.requestInfoPage.userCard.age')} : {loading ? new Date().getFullYear() -  new Date(requestData.BirthDay).getFullYear()   : ''}</div>
                      <div className='col-12 col-lg-6 mb-2'><span className='bi bi-phone-fill'></span> {t('appPages.requestInfoPage.userCard.Phone')} : {loading ? requestData.PhoneNum : ''}</div> 
                      <div className='col-12 col-lg-6 mb-2'><span className='bi bi-geo-alt-fill'></span> {t('appPages.requestInfoPage.userCard.Gouv')} : {loading ? requestData.BirthGouv : ''} </div> 
                      <div className='col-12 col-lg-6 mb-2'><span className='bi bi-map-fill'></span> {t('appPages.requestInfoPage.userCard.Deleg')} : {loading ? requestData.BirthDeleg : ''}</div> 
                  </div> 
                  <div className='text-end'>
                      <Button  className='rounded-pill text-secondary btn-imprimer' size='mini'     onClick={(e) => alert(t('appPages.requestInfoPage.userCard.cantSave'))}><Icon name='edit outline' />  {t('appPages.requestInfoPage.userCard.saveBtn')} </Button>
                  </div>  
      </>)
    }
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(reqState) {
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
          <div className="container">
            {statusCard()}
          </div>
        );
    };

     
    return ( <> 
        {/* <SpecificCard status={TAG} /> */}

        <BreadCrumb links={[ {id:1, name:'Communication', linkable:true, link:"/App/S"}, {id:2, name:'Info', linkable:false} ]} />
        <br />
        <div className="row">
            <div className="col-12 col-lg-8">
                <div className='row'>
                    <div className='col-5'><h3 className='text-center mb-4'> { findElementByLink(`rq/${TAG}`) } </h3></div>
                    <div className='col-7'><h3 className='text-end'><StateCard status={requestData.State} /></h3></div>
                </div> 
                <div className='card card-body bg-transparent border-div mb-3 mt-2'>
                    <Tab menu={{widths: panesInfo.length , secondary: true, pointing: true  }} panes={panesInfo} />      
                </div>
                <br />
                <div className='d-lg-none' style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                      {APPConf.landing[APPConf.systemTag].navItemList2[TAG].slice(2).map((data,index) =>
                            <Button className='mb-3 rounded-pill'   style={{backgroundColor: data.color}} onClick={ () => UpdateRequestState(data.navIndexName,'false', false,true,'false')}>
                                <span className='text-white'>
                                    <b>
                                    <span className={`bi bi-${data.icon}`}></span> {t(`appPages.requestInfoPage.stateActionText.${data.navIndexName}`)}                                   
                                   </b>
                                </span>
                            </Button>
                        )}
                      <Button disabled={FindBtnState(reqState).seenState} className='rounded-pill mb-3 bg-info text-white'    onClick={ () => UpdateRequestState('W',false,false,false,false)}><Icon name='eye' /> {t(`appPages.requestInfoPage.stateActionText.UNR`)}  </Button>
                </div>

                <div className='card-body '>
                      

                    <h5 className='text-secondary'> {t('appPages.requestInfoPage.reponseText')}</h5>
                    <ul>
                      {
                        messagesListe.map((data,index) => <li key={index}>{data.Content}</li>)
                      }
                    </ul>
                    <SendBox SendMessage={SendMessage} setMesgC={setMesgC} msgContent={msgContent}/>
                </div>
            </div>
            <br />
            <div className="col-12 col-lg-4 d-none d-lg-block">
                    <div className="sticky-top" style={{top:'70px', zIndex:'999'}}>
                      <h5 className='text-secondary'> Action </h5>
                        
                          {APPConf.landing[APPConf.systemTag].navItemList2[TAG].slice(2).map((data,index) =>
                                <Button className='mb-3 rounded-pill'   style={{backgroundColor: data.color}} onClick={ () => UpdateRequestState(data.navIndexName,'false', false,true,'false')}>
                                    <span className='text-white'>
                                        <b>
                                        <span className={`bi bi-${data.icon}`}></span> {data.navName}
                                        </b>
                                    </span>
                                </Button>
                            )}
                          <Button disabled={FindBtnState(reqState).seenState} className='rounded-pill mb-3 bg-info text-white'    onClick={ () => UpdateRequestState('W',false,false,false,false)}><Icon name='eye' /> Marquer non Vu </Button>
                       
                        
                     
                     {/* <CustomTabs  activeIndex={activeIndex} setActiveIndex={setActiveIndex} TAG={TAG}  /> */}
                        {/* <Tab menu={{ secondary: true }} activeIndex={activeIndex} panes={panesRigth}  className='no-menu-tabs mt-2' />  */}
                    </div>
            </div>
        </div>

    </> );
}

export default RequestInfo;