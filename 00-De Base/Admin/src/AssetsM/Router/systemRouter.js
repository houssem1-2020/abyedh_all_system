import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Outlet} from "react-router-dom";
import GConf from '../generalConf';

//navBar
import NavBar from '../../Dashboard/navBar'

//Main
import MainPage from '../../Dashboard/Main/mainPage';

//Commandes
import RequestPage from '../../Dashboard/Communications/requestPage';
import RequestInfo from "../../Dashboard/Communications/requestInfo";
import RegrouperCommandes from '../../Dashboard/Communications/regroupemment';
import ComptesCommandes from '../../Dashboard/Communications/comptes';
import CalendarCommandes from '../../Dashboard/Communications/calendar';

//Stock
import StockPage from '../../Dashboard/System/stockPage';
import AddArticleStock from '../../Dashboard/System/addArticle';
import ArticleInfo from "../../Dashboard/System/articleInfo";
import Familles from "../../Dashboard/System/famille";
import BonSortie from '../../Dashboard/System/bonSortie';
import BonsEntre from '../../Dashboard/System/bonEntre';

//Facture
import FacturePage from "../../Dashboard/Directory/facturePage";
import AjouterFacture from "../../Dashboard/Directory/ajoutreFacture";
import FactureInfo from "../../Dashboard/Directory/infoFacture";
import EditFacture from "../../Dashboard/Directory/editFacture";
import ResumerFactures from '../../Dashboard/Directory/resumerFactures';

//Camion 
import ControlPage from '../../Dashboard/Users/controlPage'
import AjouterCamion from "../../Dashboard/Users/ajouterCamion";
import AjouterFond from "../../Dashboard/Users/ajouterFonds";
import CamionInfo from '../../Dashboard/Users/camionInfo'
import CamionArticleInfo from "../../Dashboard/Users/Info/articleInfo";
import CamionFactureInfo from "../../Dashboard/Users/Info/factureInfo";
import CamionFondInfo from "../../Dashboard/Users/Info/fondInfo";
import InventaireCamion from '../../Dashboard/Users/inventaireCamion';
import EditFond from '../../Dashboard/Users/editFonds';

//Client
import ClientPage from '../../Dashboard/Client/clientPage';
import AjouterClient from "../../Dashboard/Client/ajouterClient";
import ClientInfo from '../../Dashboard/Client/clientInfo'
import ClientRegions from "../../Dashboard/Client/clientRegions";
import ClientMap from "../../Dashboard/Client/clientMap";

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
import FournisseurPage from '../../Dashboard/Finnace/fournisseurPage';
import AjouterFournisseur from '../../Dashboard/Finnace/ajouterFournisseur';
import CalendarFournisseur from '../../Dashboard/Finnace/calendarFournisseur';
import RechercheFournisseur from '../../Dashboard/Finnace/rechercheFournisseur';
import AjouterTeam from '../../Dashboard/Team/ajouterTeam';
import TeamPoste from '../../Dashboard/Team/teamPoste';
import TeamDemande from '../../Dashboard/Team/demandeTeam';
import TeamInfo from '../../Dashboard/Team/teamInfo';
import FournisseurInfo from '../../Dashboard/Finnace/fournisseurInfo';
import SettingPage from '../../Dashboard/Setting/settingPage';
import ConfrimationPage from '../../Dashboard/Setting/confirmation';
import ClientRequest from '../../Dashboard/Client/clientRequest';

import LeftSideCard from '../../Dashboard/leftSide';


const SystemLanding = () => {
    useEffect(() => {
        CheckLogIn()
    },[]);
    const CheckLogIn = () =>{
        const pidIsSet = localStorage.getItem('ADMIN_ID');
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
    </>);
}

const systemRouter = () => (
        <Route path="S" exact element={<SystemLanding />} >
            <Route path="" exact element={<MainPage />} />
            <Route path="ma" exact element={<MainPage />} />
            <Route path="rq" exact element={<Outlet />} >
                <Route path="" exact element={<RequestPage />} />
                <Route path="genre/:genre" exact element={<ComptesCommandes />} />
                <Route path="Regroupemment" exact element={<RegrouperCommandes />} />
                <Route path="calendrier" exact element={<CalendarCommandes />} />
                <Route path="info/:CID" exact element={<RequestInfo />} />
            </Route>
            <Route path="sy" exact element={<Outlet />}>
                <Route path="" exact element={<StockPage />} />
                <Route path="ajouter" exact element={<AddArticleStock />} />
                <Route path="bs" exact element={< BonSortie />} />
                <Route path="be" exact element={<BonsEntre />} />
                <Route path="famille" exact element={<Familles />} />
                <Route path="info/:code" exact element={<ArticleInfo />} />
            </Route>
            <Route path="an" exact element={<Outlet />}>
                <Route path="" exact element={<FacturePage />} />
                <Route path="ajouter" exact element={<AjouterFacture />} />
                <Route path="resumer" exact element={<ResumerFactures />} />
                <Route path="modifier/:FID" exact element={<EditFacture />} />
                <Route path="info/:FID" exact element={<FactureInfo />} />
            </Route>
            <Route path="us" exact element={<Outlet />}>
                <Route path="" exact element={<ControlPage />} />
                <Route path="ajouter-c" exact element={<AjouterCamion />} />
                <Route path="ajouter-f" exact element={<AjouterFond />} />
                <Route path="modifier-f/:FondID" exact element={<EditFond />} />
                <Route path="inventaire" exact element={<InventaireCamion />}/>
                <Route path="info/:UID" exact element={<CamionInfo />} />
                <Route path="info/stock/:CID/:code" exact element={<CamionArticleInfo />} />
                <Route path="info/facture/:CID/:FID" exact element={<CamionFactureInfo />} />
                <Route path="info/fond/:CID/:FondID" exact element={<CamionFondInfo />} />
            </Route>
            <Route path="cl" exact element={<Outlet />} >
                <Route path="" exact element={<ClientPage />} />
                <Route path="ajouter" exact element={<AjouterClient />} />
                <Route path="info/:CLID" exact element={<ClientInfo />} />
                <Route path="map" exact element={<ClientMap />} />
                <Route path="regions" exact element={<ClientRegions />} />
                <Route path="demande" exact element={<ClientRequest />} />
            </Route>
            <Route path="fi" exact element={<Outlet />} >
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
                <Route path="demmande" exact element={<TeamDemande />} />
            </Route>
            <Route path="st" exact element={<Outlet />} >
                <Route path="" exact element={<TeamPage />} />
                <Route path="info/:TID" exact element={<TeamInfo />} />
                <Route path="ajouter" exact element={<AjouterTeam />} />
                <Route path="postes" exact element={<TeamPoste />} />
                <Route path="demmande" exact element={<TeamDemande />} />
            </Route>
            <Route path="Profile" exact element={<ProfilePage />} />
            <Route path="Parametre" exact element={<SettingPage />} />
            <Route path="Parametre/confirmation" exact element={<ConfrimationPage />} />
            <Route path="ot" exact element={<ToolsPage />} />
            <Route path="ot/cg" exact element={<CataloguePage />} />
            <Route path="nt" exact element={<NotificationPage />} />
            <Route path="msg" exact element={<MessagesPages />} />
            <Route path="up" exact element={<UpdatePage />} />
        </Route>
)

export default systemRouter 