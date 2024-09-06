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
import MenuPage from '../../Dashboard/Seance/seancePage';
import AddPlatMenu from '../../Dashboard/Seance/addSeance';
import PlatInfo from "../../Dashboard/Seance/seanceInfo";
import FamillesPlats from "../../Dashboard/Seance/famille";
import EditSeance from "../../Dashboard/Seance/editSeance";


import RapportPage from '../../Dashboard/Rapport/rapportPage';
import AddRapport from '../../Dashboard/Rapport/addRapport';
import EditRapport from '../../Dashboard/Rapport/editRapport';
import RapportInfo from "../../Dashboard/Rapport/rapportInfo";
import RapportFamilles from "../../Dashboard/Rapport/famille";


//Stock
import StockPage from '../../Dashboard/Offres/forfaitPage';
import ArticleInfo from "../../Dashboard/Offres/forfaitInfo";

//Facture
import FacturePage from "../../Dashboard/Sujets/sujetPage";
import AjouterFacture from "../../Dashboard/Sujets/ajoutreSujet";
import FactureInfo from "../../Dashboard/Sujets/infoSujet";
import EditFacture from "../../Dashboard/Sujets/editSujet";
import ResumerFactures from '../../Dashboard/Sujets/resumerSujet';

//Camion 
import CaissePage from '../../Dashboard/Calendrier/calendrierPage'
import AjouterCamion from "../../Dashboard/Calendrier/ajouterCalendrier";
import CamionInfo from '../../Dashboard/Calendrier/calendrierInfo'
import CaisseBons from '../../Dashboard/Calendrier/calendrierEdit';

//Table 
import TabblePage from '../../Dashboard/Groups/groupPage'

//Client
import ClientPage from '../../Dashboard/Client/clientPage';
import AjouterClient from "../../Dashboard/Client/ajouterClient";
import ClientInfo from '../../Dashboard/Client/clientInfo'
import ClientRegions from '../../Dashboard/Client/clientFidelite';



///* Notification */
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
import FacturerCommande from '../../Dashboard/Requests/facturerCommande';


import { NavLink } from 'react-router-dom';
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
                <Route path="info/:CID" exact element={<RequestCommandeInfo />} />
            </Route>
            <Route path="sa" exact element={<Outlet />}>
                <Route path="" exact element={<MenuPage />} />
                <Route path="ajouter" exact element={<AddPlatMenu />} />
                <Route path="famille" exact element={<FamillesPlats />} />
                <Route path="info/:SID" exact element={<PlatInfo />} />
                <Route path="edit/:SID" exact element={<EditSeance />} />
            </Route>
            <Route path="of" exact element={<Outlet />}>
                <Route path="" exact element={<StockPage />} />
                <Route path="info/:code" exact element={<ArticleInfo />} />
            </Route>
            <Route path="sj" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:SID" exact element={<EditFacture />} />
                <Route path="info/:SID" exact element={<FactureInfo />} />
            </Route>
            <Route path="cd" exact element={<Outlet />}>
                <Route path="" exact element={<CaissePage />} />
                <Route path="ajouter-c" exact element={<AjouterCamion />} />
                <Route path="modifier/:ORID" exact element={<CaisseBons />} />
                <Route path="info/:ORID" exact element={<CamionInfo />} />
            </Route>
            <Route path="gp" exact element={<Outlet />}>
                <Route path="" exact element={<TabblePage />} />
            </Route>
            <Route path="cl" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="fidelite" exact element={<ClientRegions />} />
            </Route>
            <Route path="rp" exact element={<Outlet />}>
                <Route path="" exact element={<RapportPage />} />
                <Route path="ajouter" exact element={<AddRapport />} />
                <Route path="modifier/:RPID" exact element={<EditRapport />} />
                <Route path="famille" exact element={<FamillesPlats />} />
                <Route path="info/:RPID" exact element={<RapportInfo />} />
            </Route>
            <Route path="sk" exact element={<Outlet />} >
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
        </Route>
)

export default systemRouter 