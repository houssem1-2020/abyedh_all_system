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
import MenuPage from '../../Dashboard/Rapport/rapportPage';
import AddPlatMenu from '../../Dashboard/Rapport/addRapport';
import PlatInfo from "../../Dashboard/Rapport/rapportInfo";
import FamillesPlats from "../../Dashboard/Rapport/famille";
// import BonSortie from '../../Dashboard/Menu/bonSortie';
// import BonsEntre from '../../Dashboard/Menu/bonEntre';

//Stock
import StockPage from '../../Dashboard/Offres/forfaitPage';
import ArticleInfo from "../../Dashboard/Offres/forfaitInfo";

//Facture
import FacturePage from "../../Dashboard/Seances/seancePage";
import AjouterFacture from "../../Dashboard/Seances/ajoutreSeance";
import FactureInfo from "../../Dashboard/Seances/infoSeance";
import EditFacture from "../../Dashboard/Seances/editSeance";
import ResumerFactures from '../../Dashboard/Seances/resumerSeance';

//Camion 
import CaissePage from '../../Dashboard/Ordonances/ordonancePage'
import AjouterCamion from "../../Dashboard/Ordonances/ajouterOrdonance";
import CamionInfo from '../../Dashboard/Ordonances/ordonanceInfo'
import CaisseBons from '../../Dashboard/Ordonances/ordonanceEdit';

//Table 
import TabblePage from '../../Dashboard/Groups/groupPage'

//Client
import ClientPage from '../../Dashboard/Patient/patientPage';
import AjouterClient from "../../Dashboard/Patient/ajouterPatient";
import ClientInfo from '../../Dashboard/Patient/patientInfo'
import ClientRegions from '../../Dashboard/Patient/patientFidelite';

//Outils
import ToolsPage from '../../Dashboard/Tools/toolsPage';

///* Messages */
import MessagesPages from '../../Dashboard/Messages/messagesPage'
import ProfilePage from '../../Dashboard/Profile/profilePage'

///* Notification */
import NotificationPage from '../../Dashboard/Notifications/notificationPage';
import UpdatePage from '../../Dashboard/Upload/uploadPage';
import CataloguePage from '../../Dashboard/Tools/cataloguePage';
import TeamPage from '../../Dashboard/Team/teamPage';
import FournisseurPage from '../../Dashboard/Stock/StockPage';
import AjouterFournisseur from '../../Dashboard/Stock/ajouterStock';
import CalendarFournisseur from '../../Dashboard/Stock/calendarStock';
import RechercheFournisseur from '../../Dashboard/Stock/rechercheFournisseur';
import AjouterTeam from '../../Dashboard/Team/ajouterTeam';
import TeamPoste from '../../Dashboard/Team/teamPoste';
import TeamDemande from '../../Dashboard/Team/demandeTeam';
import TeamInfo from '../../Dashboard/Team/teamInfo';
import FournisseurInfo from '../../Dashboard/Stock/medicammentInfo';
import SettingPage from '../../Dashboard/Setting/settingPage';
import ConfrimationPage from '../../Dashboard/Setting/confirmation';
import FacturerCommande from '../../Dashboard/Requests/facturerCommande';


import UpdateSettingPage from '../../Dashboard/Setting/updateSettingPage';
import { NavLink } from 'react-router-dom';
import LeftSideCard from '../../Dashboard/leftSide';
import TeamAvance from '../../Dashboard/Team/teamAvance';
import DataBaseBU from '../../Dashboard/Tools/dateBaseBU';
import TicketDePrixPage from '../../Dashboard/Tools/ticketPage';
import BugdetPage from '../../Dashboard/Tools/budgetCard';
import DateProchPage from '../../Dashboard/Tools/dateProche';
import RapportPage from '../../Dashboard/Tools/rapportPage';
import PaymmentPage from '../../Dashboard/Setting/paymment';
import DocumentationPage from '../../Dashboard/Documentation/documentationPage';


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
                <Route path="rs/info/:CID" exact element={<RequestCommandeInfo />} />
            </Route>
            <Route path="rp" exact element={<Outlet />}>
                <Route path="" exact element={<MenuPage />} />
                <Route path="ajouter" exact element={<AddPlatMenu />} />
                <Route path="famille" exact element={<FamillesPlats />} />
                <Route path="info/:RPID" exact element={<PlatInfo />} />
            </Route>
            <Route path="of" exact element={<Outlet />}>
                <Route path="" exact element={<StockPage />} />
                <Route path="info/:code" exact element={<ArticleInfo />} />
            </Route>
            <Route path="sa" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:FID" exact element={<EditFacture />} />
                <Route path="info/:FID" exact element={<FactureInfo />} />
            </Route>
            <Route path="or" exact element={<Outlet />}>
                <Route path="" exact element={<CaissePage />} />
                <Route path="ajouter-c" exact element={<AjouterCamion />} />
                <Route path="modifier/:ORID" exact element={<CaisseBons />} />
                <Route path="info/:ORID" exact element={<CamionInfo />} />
            </Route>
            <Route path="gp" exact element={<Outlet />}>
                <Route path="" exact element={<TabblePage />} />
            </Route>
            <Route path="pt" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="fidelite" exact element={<ClientRegions />} />
            </Route>
            <Route path="sk" exact element={<Outlet />} >
                <Route path="" exact element={<FournisseurPage />} />
                <Route path="info/:MEID" exact element={<FournisseurInfo />} />
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
            <Route path="ot" exact element={<Outlet />} >
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
        </Route>
)

export default systemRouter 