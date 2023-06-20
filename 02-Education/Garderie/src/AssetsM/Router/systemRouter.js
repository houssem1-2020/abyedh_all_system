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
import MenuPage from '../../Dashboard/Classes/classePage';
import AddPlatMenu from '../../Dashboard/Classes/addClasse';
import PlatInfo from "../../Dashboard/Classes/classeInfo";
import FamillesPlats from "../../Dashboard/Classes/niveaux";
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
import TabblePage from '../../Dashboard/Salles/sallePage'

//Client
import ClientPage from '../../Dashboard/Eleve/ElevePage';
import AjouterClient from "../../Dashboard/Eleve/ajouterEleve";
import ClientInfo from '../../Dashboard/Eleve/EleveInfo'
import ClientRegions from '../../Dashboard/Eleve/ElevePresence';

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

import BultinPage from '../../Dashboard/Bultin/bultinPage';
import AjouterBultin from '../../Dashboard/Bultin/ajouterBultin';
import CalendarBultin from '../../Dashboard/Bultin/calendarBultin';
import RechercheBultin from '../../Dashboard/Bultin/editBultin';
import BultinInfo from '../../Dashboard/Bultin/bultinInfo';

import MatierePage from '../../Dashboard/Matiere/matierePage';
import AjouterMatiere from '../../Dashboard/Matiere/ajouterMatiere';
import EditMatiere from '../../Dashboard/Matiere/matiereFamille';
import RechercheMatiere from '../../Dashboard/Matiere/editMatiere';
import MatiereInfo from '../../Dashboard/Matiere/matiereInfo';

import ExamainPage from '../../Dashboard/Examain/examainPage';
import AjouterExamain from '../../Dashboard/Examain/ajouterExamain';
import CalendarExamain from '../../Dashboard/Examain/calendarExamain';
import RechercheExamain from '../../Dashboard/Examain/editExamain';
import ExamainInfo from '../../Dashboard/Examain/examainInfo';

import EmploiPage from '../../Dashboard/Emploi/emploiPage';
import AjouterEmploi from '../../Dashboard/Emploi/ajouterEmploi';
import CalendarEmploi from '../../Dashboard/Emploi/calendarEmploi';
import RechercheEmploi from '../../Dashboard/Emploi/editEmploi';
import EmploiInfo from '../../Dashboard/Emploi/emploiInfo';



import AjouterTeam from '../../Dashboard/Team/ajouterTeam';
import TeamPoste from '../../Dashboard/Team/teamPoste';
import TeamDemande from '../../Dashboard/Team/demandeTeam';
import TeamInfo from '../../Dashboard/Team/teamInfo';

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
import ElevePresence from '../../Dashboard/Eleve/presenceEleve';

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

            <Route path="el" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="presence" exact element={<ElevePresence />} />
            </Route>
            <Route path="bu" exact element={<Outlet />} >
                <Route path="" exact element={<BultinPage />} />
                <Route path="info/:FSID" exact element={<BultinInfo />} />
                <Route path="ajouter" exact element={<AjouterBultin />} />
                <Route path="calendrier" exact element={<CalendarBultin />} />
                <Route path="recherche" exact element={<RechercheBultin />} />
            </Route>
            
            <Route path="ab" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:FID" exact element={<EditFacture />} />
                <Route path="info/:FID" exact element={<FactureInfo />} />
            </Route>
            <Route path="of" exact element={<Outlet />}>
                <Route path="" exact element={<StockPage />} />
                <Route path="info/:code" exact element={<ArticleInfo />} />
            </Route>

            <Route path="cl" exact element={<Outlet />}>
                <Route path="" exact element={<MenuPage />} />
                <Route path="ajouter" exact element={<AddPlatMenu />} />
                <Route path="niveaux" exact element={<FamillesPlats />} />
                <Route path="info/:code" exact element={<PlatInfo />} />
            </Route>
            <Route path="sl" exact element={<Outlet />}>
                <Route path="" exact element={<TabblePage />} />
            </Route>
            <Route path="em" exact element={<Outlet />} >
                <Route path="" exact element={<EmploiPage />} />
                <Route path="info/:FSID" exact element={<EmploiInfo />} />
                <Route path="ajouter" exact element={<AjouterEmploi />} />
                <Route path="calendrier" exact element={<CalendarEmploi />} />
                <Route path="recherche" exact element={<RechercheEmploi />} />
            </Route>
            <Route path="ex" exact element={<Outlet />} >
                <Route path="" exact element={<ExamainPage />} />
                <Route path="info/:FSID" exact element={<ExamainInfo />} />
                <Route path="ajouter" exact element={<AjouterExamain />} />
                <Route path="calendrier" exact element={<CalendarExamain />} />
                <Route path="recherche" exact element={<RechercheExamain />} />
            </Route>

            <Route path="sa" exact element={<Outlet />}>
                <Route path="" exact element={<CaissePage />} />
                <Route path="ajouter-c" exact element={<AjouterCamion />} />
                <Route path="bons" exact element={<CaisseBons />} />
                <Route path="info/:CID" exact element={<CamionInfo />} />
            </Route>

            <Route path="tm" exact element={<Outlet />} >
                <Route path="" exact element={<TeamPage />} />
                <Route path="info/:TID" exact element={<TeamInfo />} />
                <Route path="ajouter" exact element={<AjouterTeam />} />
                <Route path="postes" exact element={<TeamPoste />} />
                <Route path="avances" exact element={<TeamAvance />} />
                <Route path="presence" exact element={<TeamDemande />} />
            </Route>
            <Route path="mt" exact element={<Outlet />} >
                <Route path="" exact element={<MatierePage />} />
                <Route path="info/:FSID" exact element={<MatiereInfo />} />
                <Route path="ajouter" exact element={<AjouterMatiere />} />
                <Route path="calendrier" exact element={<EditMatiere />} />
                <Route path="recherche" exact element={<RechercheMatiere />} />
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