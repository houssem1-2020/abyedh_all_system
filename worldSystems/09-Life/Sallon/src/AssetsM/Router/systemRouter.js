import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Outlet} from "react-router-dom";
import GConf from '../generalConf';

//navBar
import NavBar from '../../Dashboard/navBar'

//Main
import MainPage from '../../Dashboard/Main/mainPage';

//Commandes
import RequestPage from '../../Dashboard/Requests/requestPage';
import RequestCommandeInfo from "../../Dashboard/Requests/requestInfo";
import RequestReservationInfo from "../../Dashboard/Requests/reservationInfo";
import ComptesCommandes from '../../Dashboard/Requests/comptes';
import CalendarCommandes from '../../Dashboard/Requests/calendar';

//Menu
import MenuPage from '../../Dashboard/Equippement/equipemmentPage';
import AddPlatMenu from '../../Dashboard/Equippement/addEquipemment';
import PlatInfo from "../../Dashboard/Equippement/equipemmentInfo";
import FamillesPlats from "../../Dashboard/Equippement/famille";
// import BonSortie from '../../Dashboard/Menu/bonSortie';
// import BonsEntre from '../../Dashboard/Menu/bonEntre';

//Stock
import StockPage from '../../Dashboard/Offres/forfaitPage';
import ArticleInfo from "../../Dashboard/Offres/forfaitInfo";

//Facture
import FacturePage from "../../Dashboard/Abonnemment/abonnemmentPage";
import AjouterFacture from "../../Dashboard/Abonnemment/ajoutreAbonnement";
import FactureInfo from "../../Dashboard/Abonnemment/infoAbonnemment";
import EditFacture from "../../Dashboard/Abonnemment/editAbonnemment";
import ResumerFactures from '../../Dashboard/Abonnemment/resumerAbonnemment';

//Camion 
import CaissePage from '../../Dashboard/Seances/seancePage'
import AjouterCamion from "../../Dashboard/Seances/ajouterSeance";
import CamionInfo from '../../Dashboard/Seances/seanceInfo'
import CaisseBons from '../../Dashboard/Seances/seanceBons';

//Table 
import TabblePage from '../../Dashboard/Groups/groupPage'

//Client
import ClientPage from '../../Dashboard/Membre/MembrePage';
import AjouterClient from "../../Dashboard/Membre/ajouterMembre";
import ClientInfo from '../../Dashboard/Membre/MembreInfo'
import ClientRegions from '../../Dashboard/Membre/MembreFidelite';

 
 
 
 
import TeamPage from '../../Dashboard/Team/teamPage';
import FournisseurPage from '../../Dashboard/Fournisseur/fournisseurPage';
import AjouterFournisseur from '../../Dashboard/Fournisseur/ajouterFournisseur';
import CalendarFournisseur from '../../Dashboard/Fournisseur/calendarFournisseur';
import RechercheFournisseur from '../../Dashboard/Fournisseur/rechercheFournisseur';
import AjouterTeam from '../../Dashboard/Team/ajouterTeam';
import TeamPoste from '../../Dashboard/Team/teamPoste';
import TeamDemande from '../../Dashboard/Team/demandeTeam';
import TeamInfo from '../../Dashboard/Team/teamInfo';
import FournisseurInfo from '../../Dashboard/Fournisseur/fournisseurInfo';
 
import FacturerCommande from '../../Dashboard/Requests/facturerCommande';

 
 
import LeftSideCard from '../../Dashboard/leftSide';
import TeamAvance from '../../Dashboard/Team/teamAvance';
 
 

/* USED  */
import ProfilePage from '../../Dashboard/Used/Profile/profilePage'
import SettingPage from '../../Dashboard/Used/Setting/settingPage';
import ConfrimationPage from '../../Dashboard/Used/Setting/confirmation';
import UpdateSettingPage from '../../Dashboard/Used/Setting/updateSettingPage';
import PaymmentPage from '../../Dashboard/Used/Setting/paymment';
import ForumPage from '../../Dashboard/Used/Forum/notificationPage';
import DocumentationPage from '../../Dashboard/Used/Documentation/documentationPage';
import MessagesPages from '../../Dashboard/Used/Messages/messagesPage'
import SyncroniserPage from '../../Dashboard/Used/Upload/uploadPage';
import SauvgarderPage from '../../Dashboard/Used/Sauvgarder/dateBaseBU'

const SystemLanding = () => {
    useEffect(() => {
        //CheckAuthentification()
        CheckLogIn()
    },[]);

    const CheckAuthentification = () =>{
        const AuthenKey = localStorage.getItem(`${GConf.SystemTag}_AuthKeyISSet`);
        if (!AuthenKey) {
            window.location.href = "/Auth";
        }
    }

    const CheckLogIn = () =>{
        const pidIsSet = localStorage.getItem('PID');
        if (!pidIsSet) {window.location.href = "/login";}
    }

    return (<>
        <NavBar/>
        <br />
        <br />
        <br />
         
        <div className='row pt-4 m-1'>
                <div className='col-12 col-md-12 col-lg-2'><LeftSideCard /></div>
                <div className='col-12 col-md-12 col-lg-10'><Outlet /></div>
        </div>
        {/* <div className="container pt-4">    
            <Outlet />
        </div> */}
    </>);
}

const systemRouter = () => (
        <Route path="S" exact element={<SystemLanding />} >
            <Route path="" exact element={<MainPage />} />
            <Route path="ma" exact element={<MainPage />} />
            <Route path="rq" exact element={<Outlet />} >
                <Route path="" exact element={<RequestPage />} />
                <Route path="comptes" exact element={<ComptesCommandes />} />
                <Route path="facturer/:CID" exact element={<FacturerCommande />} />
                <Route path="calendrier" exact element={<CalendarCommandes />} />
                <Route path="cm/info/:CID" exact element={<RequestCommandeInfo />} />
                <Route path="rs/info/:CID" exact element={<RequestReservationInfo />} />
            </Route>
            <Route path="cd" exact element={<Outlet />}>
                <Route path="" exact element={<MenuPage />} />
                <Route path="ajouter" exact element={<AddPlatMenu />} />
                <Route path="famille" exact element={<FamillesPlats />} />
                <Route path="info/:code" exact element={<PlatInfo />} />
            </Route>

            <Route path="ct" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:FID" exact element={<EditFacture />} />
                <Route path="info/:FID" exact element={<FactureInfo />} />
            </Route>
            
            <Route path="cl" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="fidelite" exact element={<ClientRegions />} />
            </Route>

            <Route path="tm" exact element={<Outlet />} >
                <Route path="" exact element={<TeamPage />} />
                <Route path="info/:TID" exact element={<TeamInfo />} />
                <Route path="ajouter" exact element={<AjouterTeam />} />
                <Route path="postes" exact element={<TeamPoste />} />
                <Route path="avances" exact element={<TeamAvance />} />
                <Route path="presence" exact element={<TeamDemande />} />
            </Route>
            <Route path="Profile" exact element={<ProfilePage />} />
            <Route path="Parametre" exact element={<SettingPage />} />
            <Route path="Parametre/paymment" exact element={<PaymmentPage />} />
            <Route path="Parametre/confirmation" exact element={<ConfrimationPage />} />
            <Route path="Parametre/p/:genre" exact element={<UpdateSettingPage />} />
            <Route path="forum" exact element={<ForumPage />} />
            <Route path="doc" exact element={<DocumentationPage />} />
            <Route path="messages" exact element={<MessagesPages />} />
            <Route path="syncroniser" exact element={<SyncroniserPage />} />
            <Route path="sauvgarder" exact element={<SauvgarderPage />} />
        </Route>
)

export default systemRouter 