import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import ADIL from '../../AssetsM/ADIL';

import DocteurSpecific from './mainPage/docteur'; 
// import CliniqueSpecific from './mainPage/clinique'; 
// import PharmacieSpecific from './mainPage/pharmacie';
// import GarderieSpecific from './mainPage/garderie';
import RestaurantSpecific from './mainPage/restaurant';
import { Button } from 'semantic-ui-react';
// import AutoEcoleSpecific from './mainPage/autoecole';
// import AvocatSpecific from './mainPage/avocat';
// import BoutiqueSpecific from './mainPage/boutique';
// import CafeSpecific from './mainPage/cafe';
// import CentreMdSpecific from './mainPage/centreMD';
// import GymSpecific from './mainPage/gym';
// import EcoleSpecific from './mainPage/ecole';
// import ComptableSpecific from './mainPage/comptable';
// import CoiffureSpecific from './mainPage/coiffure';
// import HotelsSpecific from './mainPage/hotels';
// import LaboSpecific from './mainPage/labo';
// import LibrairieSpecific from './mainPage/librairie';
// import LyceeSpecific from './mainPage/lycee';
// import StadeSpecific from './mainPage/stade';
// import SociteSpecific from './mainPage/socite';
// import SmasarSpecific from './mainPage/samsar';
// import PyscineSpecific from './mainPage/pyscine';
// import UniversiteSpecific from './mainPage/universite';
// import TransporteurSpecific from './mainPage/transporteur';
// import StorageSpecific from './mainPage/storage';
// import VgAgenceSpecific from './mainPage/vg_agence';

// import HauseElectroSpecific from './mainPage/house_electro';
// import HauseMeubleSpecific from './mainPage/house_meuble';

// import PtvMagazinSpecific from './mainPage/ptvente_shop';
// import PtvPatesserieSpecific from './mainPage/ptvente_patesserie';
// import PtvFuiterieSpecific from './mainPage/ptvente_fruit';
// import PtvVBoulengerieSpecific from './mainPage/ptvente_boulengerie';
// import PtvEpecerieSpecific from './mainPage/ptvente_small_shop';
// import PtvViandeSpecific from './mainPage/ptvente_viande';

// import ChantierArchitectureSpecific from './mainPage/chantier_architecture';
// import ChantierContracteurSpecific from './mainPage/chantier_contrateur';
// import ChantierQuicaillerieSpecific from './mainPage/chantier_quincaillerie';

// import HandmadeCristalSpecific from './mainPage/handmade_cristal';
// import HandmadeElectricienSpecific from './mainPage/handmade_electricien';
// import HandmadeForferonSpecific from './mainPage/handmade_forgeron';
// import HandemadeMarbreSpecific from './mainPage/handmade_menuisier';
// import HandemadeMenuisierSpecific from './mainPage/handmade_menuisier';
// import HandemadePeintureSpecific from './mainPage/handmade_peinture';
// import HandemadePlombierSpecific from './mainPage/handmade_plombier';

// import CarQiosqieSpecific from './mainPage/car_qiosque';
// import CarMecanicienSpecific from './mainPage/car_mecanicien';
// import CarLocationSpecific from './mainPage/car_location';
// import CarParkingSpecific from './mainPage/car_parking';

// import ArtCinemaSpecific from './mainPage/art_cinema';
// import ArtMuseeSpecific from './mainPage/art_musee';
// import ArtTheatreSpecific from './mainPage/art_theatre';

// import WeddingOrchestreSpecific from './mainPage/wedding_orchestre';
// import WeddingFournitureMarriageSpecific from './mainPage/wedding_fourniture_marriage';
// import WeddingPhotographeSpecific from './mainPage/wedding_photographe';
// import WeddingBijouxSpecific from './mainPage/wedding_bijoux';
// import WeddingChefSpecific from './mainPage/wedding_chef';
// import WeddingSallonMariageSpecific from './mainPage/wedding_salon_marriage';

// import AdminAMosqSpecific from './mainPage/admin_a_mosq';
// import AdminACourtSpecific from './mainPage/admin_a_court';
// import AdminAArSpecific from './mainPage/admin_a_ar';
// import AdminAMuSpecific from './mainPage/admin_a_mu';
// import AdminAPoliceSpecific from './mainPage/admin_a_police';
// import AdminCMcSpecific from './mainPage/admin_c_mc';
// import AdminCmjSpecific from './mainPage/admin_c_mj';
// import AdminEBiblioSpecific from './mainPage/admin_e_biblio';
// import AdminECentreSpecific from './mainPage/admin_e_centre';
// import AdminEEcoleSpecific from './mainPage/admin_e_ecole';
// import AdminELyceeSpecific from './mainPage/admin_e_lycee';
// import AdminESsSpecific from './mainPage/admin_e_ss';
// import AdminEUniversiteSpecific from './mainPage/admin_e_universite';
// import AdminFPosteSpecific from './mainPage/admin_f_poste';
// import AdminFRfSpecific from './mainPage/admin_f_rf';
// import AdminSScbSpecific from './mainPage/admin_s_csb';
// import AdminSHospitalSpecific from './mainPage/admin_s_hospital';



function RequestPage() {
    /*#########################[Const]##################################*/
    /*#########################[UseEfeect]##################################*/
    /*#########################[Function]##################################*/
    const RemoveToday = () =>{
        localStorage.setItem('removedCard', new Date().toLocaleDateString('fr-FR'));
        window.location.reload()
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
          case 'docteur': return <DocteurSpecific TAG={GConf.systemTag} PID={GConf.systemTag} />;  
          // case 'pharmacie': return <PharmacieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'clinique': return <CliniqueSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'labo': return <LaboSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'centreMD': return <CentreMdSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'garderie': return <GarderieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'autoecole': return <AutoEcoleSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ecole': return <EcoleSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'lycee': return <LyceeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'universite': return <UniversiteSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'librairie': return <LibrairieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'transporteur': return <TransporteurSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'cafe': return <CafeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          case 'restaurant': return <RestaurantSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ptvente_shop': return <PtvMagazinSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ptvente_boulengerie': return <PtvVBoulengerieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ptvente_viande': return <PtvViandeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ptvente_fruit': return <PtvFuiterieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ptvente_patesserie': return <PtvPatesserieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'ptvente_small_shop': return <PtvEpecerieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'house_electro': return <HauseElectroSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'house_meuble': return <HauseMeubleSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'car_location': return <CarLocationSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'car_parking': return <CarParkingSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'car_qiosque': return <CarQiosqieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'car_mecanicien': return <CarMecanicienSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'samsar': return <SmasarSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'chantier_contrateur': return <ChantierContracteurSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'chantier_architecture': return <ChantierArchitectureSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'chantier_quincaillerie': return <ChantierQuicaillerieSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_forgeron': return <HandmadeForferonSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_menuisier': return <HandemadeMenuisierSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_peinture': return <HandemadePeintureSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_electricien': return <HandmadeElectricienSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_plombier': return <HandemadePlombierSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_cristal': return <HandmadeCristalSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'handmade_marbre': return <HandemadeMarbreSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'coiffure': return <CoiffureSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'boutique': return <BoutiqueSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'wedding_salon_marriage': return <WeddingSallonMariageSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'wedding_orchestre': return <WeddingOrchestreSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'wedding_chef': return <WeddingChefSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'wedding_photographe': return <WeddingPhotographeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'wedding_fourniture_marriage': return <WeddingFournitureMarriageSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'wedding_bijoux': return <WeddingBijouxSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'gym': return <GymSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'pyscine': return <PyscineSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'stade': return <StadeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'art_cinema': return <ArtCinemaSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'art_theatre': return <ArtTheatreSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'art_musee': return <ArtMuseeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'avocat': return <AvocatSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'storage': return <StorageSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'comptable': return <ComptableSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'socite': return <SociteSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'hotels': return <HotelsSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'vg_agence': return <VgAgenceSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_s_hospital': return <AdminSHospitalSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_s_csb': return <AdminSScbSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_e_centre': return <AdminECentreSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_e_biblio': return <AdminEBiblioSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_e_ecole': return <AdminEEcoleSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_e_lycee': return <AdminELyceeSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_e_universite': return <AdminEUniversiteSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_e_ss': return <AdminESsSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_c_mj': return <AdminCmjSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_c_mc': return <AdminCMcSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_f_poste': return <AdminFPosteSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_f_rf': return <AdminFRfSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_a_mu': return <AdminAMuSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_a_police': return <AdminAPoliceSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_a_ar': return <AdminAArSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_a_court': return <AdminACourtSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          // case 'admin_a_mosq': return <AdminAMosqSpecific TAG={GConf.systemTag} PID={GConf.systemTag} /> ;
          default:  return <IndefinieCard />;    
      }
      }, [status]);
  
      return (
      <div className="">
          {statusCard()}
      </div>
      );
    }

    const AdsCard = (props) =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div pt-2'>
                <div className='text-end m-0 p-0'><b onClick={() => RemoveToday()}>x</b></div>
                <div className='row'>
                    <div className='col-4 align-self-center'><img className="rounded-circle mb-3" src={`https://cdn.abyedh.tn/images/ads/${GConf.systemTag}.svg`} width="90px" height="90px"/></div>
                    <div className='col-8 align-self-center text-secondary' dir='rtl'>
                        نظام إدارة العيادات  يمكنك من : 
                        <ul>
                           <li>إدارة الحصص</li> 
                           <li>إدارة الوصفات الطبية</li> 
                           <li>إدارة المرضي</li> 
                        </ul>
                        <Button fluid className='rounded-pill' size='mini'> نظام إدارة العيادات</Button>
                    </div>
                </div>
            </div>
        </>)
    }
    return (<>
            {ADIL[GConf.systemTag].systemReady && localStorage.getItem('removedCard') != new Date().toLocaleDateString('fr-FR') ? <AdsCard data={GConf.systemTag} /> : ''}
            <SpecificCard status={GConf.systemTag} />
    </>);
}

export default RequestPage;