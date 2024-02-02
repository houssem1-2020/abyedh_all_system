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

//Voiture
import VoiturePage from '../../Dashboard/Voitures/classePage';
import AddPlatVoiture from '../../Dashboard/Voitures/addClasse';
import PlatInfo from "../../Dashboard/Voitures/classeInfo";
import FamillesPlats from "../../Dashboard/Voitures/niveaux";
import AjouterExamain from '../../Dashboard/Voitures/ajouterExamain';
import CalendarExamain from '../../Dashboard/Voitures/calendarExamain';
import AjouterEmploi from '../../Dashboard/Voitures/ajouterEmploi';
import EditEmploi from '../../Dashboard/Voitures/editEmploi';


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
import SeancePage from '../../Dashboard/Seances/seancePage'
import AddSeancePafe from "../../Dashboard/Seances/ajoutreSeance";
import SeanceInfoPage from '../../Dashboard/Seances/infoSeance'
import SeanceEditPage from '../../Dashboard/Seances/editSeance'
import ResumerSeancePage from '../../Dashboard/Seances/resumerSeance';
 
//Client
import ClientPage from '../../Dashboard/Condidat/patientPage';
import AjouterClient from "../../Dashboard/Condidat/ajouterPatient";
import ClientInfo from '../../Dashboard/Condidat/patientInfo'
import ClientRegions from '../../Dashboard/Condidat/patientFidelite';

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
                <Route path="rs/info/:CID" exact element={<RequestReservationInfo />} />
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

            <Route path="sa" exact element={<Outlet />}>
                <Route path="" exact element={<SeancePage />} />
                <Route path="ajouter" exact element={<AddSeancePafe />} />
                <Route path="resumer" exact element={<ResumerSeancePage />} />
                <Route path="info/:SID" exact element={<SeanceInfoPage />} />
                <Route path="modifier/:SID" exact element={<SeanceEditPage />} />
            </Route>

            <Route path="cd" exact element={<Outlet />} >
            <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="classemment" exact element={<ClientRegions />} />
            </Route>
        
            <Route path="vo" exact element={<Outlet />}>
                <Route path="" exact element={<VoiturePage />} />
                <Route path="ajouter" exact element={<AddPlatVoiture />} />
                <Route path="niveaux" exact element={<FamillesPlats />} />
                <Route path="info/:code" exact element={<PlatInfo />} />
                <Route path="emploi" exact element={<AjouterEmploi />} />
                <Route path="emploi/edit/:EID" exact element={<EditEmploi />} />
                <Route path="examain" exact element={<AjouterExamain />} />
                <Route path="examain/edit/:EID" exact element={<CalendarExamain />} />
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