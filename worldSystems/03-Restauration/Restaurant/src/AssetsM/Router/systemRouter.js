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
//import RequestReservationInfo from "../../Dashboard/Requests/reservationInfo";
import ComptesCommandes from '../../Dashboard/Requests/comptes';
import CalendarCommandes from '../../Dashboard/Requests/calendar';

//Commandes
import ReservationPage from '../../Dashboard/Reservation/requestPage';
import RequestReservationInfo from "../../Dashboard/Reservation/reservationInfo";
import ComptesReservation from '../../Dashboard/Reservation/comptes';
import CalendarReservation from '../../Dashboard/Reservation/calendar';


//Menu
import MenuPage from '../../Dashboard/Menu/menuPage';
import AddPlatMenu from '../../Dashboard/Menu/addPlat';
import PlatInfo from "../../Dashboard/Menu/PlatInfo";
import FamillesPlats from "../../Dashboard/Menu/famille";
// import BonSortie from '../../Dashboard/Menu/bonSortie';
// import BonsEntre from '../../Dashboard/Menu/bonEntre';

//Stock
import StockPage from '../../Dashboard/Stock/stockPage';
import ArticleInfo from "../../Dashboard/Stock/articleInfo";

//Facture
import FacturePage from "../../Dashboard/Factures/facturePage";
import AjouterFacture from "../../Dashboard/Factures/ajoutreFacture";
import FactureInfo from "../../Dashboard/Factures/infoFacture";
import EditFacture from "../../Dashboard/Factures/editFacture";
import ResumerFactures from '../../Dashboard/Factures/resumerFactures';

//Camion 
import CaissePage from '../../Dashboard/Caisse/caissePage'
import AjouterCamion from "../../Dashboard/Caisse/ajouterCaisse";
import CamionInfo from '../../Dashboard/Caisse/caisseInfo'
import CaisseBons from '../../Dashboard/Caisse/caisseBons';

//Table 
import TabblePage from '../../Dashboard/Table/tablePage'

//Client
import ClientPage from '../../Dashboard/Client/clientPage';
import AjouterClient from "../../Dashboard/Client/ajouterClient";
import ClientInfo from '../../Dashboard/Client/clientInfo'
import ClientRegions from '../../Dashboard/Client/clientFidelite';

 
 

///* Notification */
// import NotificationPage from '../../Dashboard/Notifications/notificationPage';
// import UpdatePage from '../../Dashboard/Upload/uploadPage';
// import CataloguePage from '../../Dashboard/Tools/cataloguePage';
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


 
import { NavLink } from 'react-router-dom';
import LeftSideCard from '../../Dashboard/leftSide';
import TeamAvance from '../../Dashboard/Team/teamAvance';
// import DataBaseBU from '../../Dashboard/Tools/dateBaseBU';
// import TicketDePrixPage from '../../Dashboard/Tools/ticketPage';
// import BugdetPage from '../../Dashboard/Tools/budgetCard';
// import DateProchPage from '../../Dashboard/Tools/dateProche';
// import RapportPage from '../../Dashboard/Tools/rapportPage';
 
 

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
                <Route path="info/:CID" exact element={<RequestCommandeInfo />} />
                 
            </Route>
            <Route path="rs" exact element={<Outlet />} >
                <Route path="" exact element={<ReservationPage />} />
                <Route path="comptes" exact element={<ComptesCommandes />} />
                <Route path="facturer/:CID" exact element={<FacturerCommande />} />
                <Route path="calendrier" exact element={<CalendarCommandes />} />
                <Route path="info/:CID" exact element={<RequestReservationInfo />} />
            </Route>
            <Route path="mu" exact element={<Outlet />}>
                <Route path="" exact element={<MenuPage />} />
                <Route path="ajouter" exact element={<AddPlatMenu />} />
                <Route path="famille" exact element={<FamillesPlats />} />
                <Route path="info/:code" exact element={<PlatInfo />} />
            </Route>
            <Route path="sk" exact element={<Outlet />}>
                <Route path="" exact element={<StockPage />} />
                <Route path="info/:code" exact element={<ArticleInfo />} />
            </Route>
            <Route path="ft" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:FID" exact element={<EditFacture />} />
                <Route path="info/:FID" exact element={<FactureInfo />} />
            </Route>
            <Route path="ca" exact element={<Outlet />}>
                <Route path="" exact element={<CaissePage />} />
                <Route path="ajouter-c" exact element={<AjouterCamion />} />
                <Route path="bons" exact element={<CaisseBons />} />
                <Route path="info/:CID" exact element={<CamionInfo />} />
            </Route>
            <Route path="tb" exact element={<Outlet />}>
                <Route path="" exact element={<TabblePage />} />
            </Route>
            <Route path="cl" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="fidelite" exact element={<ClientRegions />} />
            </Route>
            <Route path="fs" exact element={<Outlet />} >
                <Route path="" exact element={<FournisseurPage />} />
                <Route path="info/:FSID" exact element={<FournisseurInfo />} />
                <Route path="ajouter" exact element={<AjouterFournisseur />} />
                <Route path="calendrier" exact element={<CalendarFournisseur />} />
                <Route path="recherche" exact element={<RechercheFournisseur />} />
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

            {/*<Route path="ot" exact element={<Outlet />} >
                <Route path="" exact element={<ToolsPage />} />
                <Route path="cg" exact element={<CataloguePage />} />
                <Route path="dbbu" exact element={<DataBaseBU />} />
                <Route path="tickets" exact element={<TicketDePrixPage />} />
                <Route path="bugdet" exact element={<BugdetPage />} />
                <Route path="dates" exact element={<DateProchPage />} />
                <Route path="rapport" exact element={<RapportPage />} />
            </Route>

            <Route path="Profile" exact element={<ProfilePage />} />
            
            <Route path="Parametre" exact element={<SettingPage />} />
            <Route path="Parametre/paymment" exact element={<PaymmentPage />} />
            <Route path="Parametre/confirmation" exact element={<ConfrimationPage />} />
            <Route path="Parametre/p/:genre" exact element={<UpdateSettingPage />} />
            <Route path="ot" exact element={<ToolsPage />} />
            <Route path="ot/cg" exact element={<CataloguePage />} />
            <Route path="ot/dbbu" exact element={<DataBaseBU />} />
            <Route path="nt" exact element={<NotificationPage />} />
            <Route path="doc" exact element={<DocumentationPage />} />
            <Route path="msg" exact element={<MessagesPages />} />
            <Route path="up" exact element={<UpdatePage />} />
            <Route path="Profile" exact element={<ProfilePage />} />*/}


        </Route>
)

export default systemRouter 