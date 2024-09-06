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
import ClassPage from '../../Dashboard/Classes/classePage';
import AjouterClass from '../../Dashboard/Classes/addClasse';
import ClassInfo from "../../Dashboard/Classes/classeInfo";
import ClassNiveaux from "../../Dashboard/Classes/niveaux";
import AjouterExamain from '../../Dashboard/Classes/ajouterExamain';
import CalendarExamain from '../../Dashboard/Classes/calendarExamain';
import AjouterEmploi from '../../Dashboard/Classes/ajouterEmploi';
import EditEmploi from '../../Dashboard/Classes/editEmploi';

//Stock
import OffrePage from '../../Dashboard/Offres/forfaitPage';
import OffreInfo from "../../Dashboard/Offres/forfaitInfo";

//Facture
import AbonnemmentPage from "../../Dashboard/Abonnemment/abonnemmentPage";
import AjouterAbonnemment from "../../Dashboard/Abonnemment/ajoutreAbonnement";
import AbonnemmentInfo from "../../Dashboard/Abonnemment/infoAbonnemment";
 

//Camion 
import SeancePage from '../../Dashboard/Seances/seancePage'
import AjouterSeance from "../../Dashboard/Seances/ajoutreSeance";
import SeanceInfo from '../../Dashboard/Seances/infoSeance'
import EditSeance from '../../Dashboard/Seances/editSeance';
import ResumerSeances from '../../Dashboard/Seances/resumerSeance';
//Examain 
import ExamainPage from '../../Dashboard/Examain/examainPage'
import ExamainInfo from '../../Dashboard/Examain/infoExamain'
import EditExamain from '../../Dashboard/Examain/editExamain'
import ExamainResultat from '../../Dashboard/Examain/resumerSeance';

//Table 
import SallePage from '../../Dashboard/Salles/sallePage'
import SalleInfo from '../../Dashboard/Salles/salleInfo'

//Client
import ElevePage from '../../Dashboard/Eleve/ElevePage';
import AjouterEleve from "../../Dashboard/Eleve/ajouterEleve";
import EleveInfo from '../../Dashboard/Eleve/EleveInfo'
import AddAvertissemment from '../../Dashboard/Eleve/ajouterAvertissemment';
import AvertissemmentInfo from "../../Dashboard/Eleve/avertissemmentInfo";
import EditAvertissemment from '../../Dashboard/Eleve/editAvertissemment'
import AddRetenue from '../../Dashboard/Eleve/ajouterRetenue';
import RetenueInfo from "../../Dashboard/Eleve/retenueInfo";
import EditRetenue from '../../Dashboard/Eleve/editRetenue'
import AddBultain from '../../Dashboard/Eleve/ajouterBultin';
import BultainInfo from "../../Dashboard/Eleve/bultinInfo";
import EditBultain from '../../Dashboard/Eleve/editBultin'

//Outils
//import ToolsPage from '../../Dashboard/Tools/toolsPage';

import TeamPage from '../../Dashboard/Team/teamPage';
import MatierePage from '../../Dashboard/Matiere/matierePage';
import MatiereInfo from '../../Dashboard/Matiere/matiereInfo';
import AjouterTeam from '../../Dashboard/Team/ajouterTeam';
import TeamPoste from '../../Dashboard/Team/teamPoste';
import TeamDemande from '../../Dashboard/Team/demandeTeam';
import TeamInfo from '../../Dashboard/Team/teamInfo';
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
                <Route path="info/:CID" exact element={<RequestCommandeInfo />} />
                <Route path="souscription" exact element={<RequestReservationInfo />} />
            </Route>

            <Route path="el" exact element={<Outlet />} >
                <Route path="" exact element={<ElevePage />} />
                <Route path="ajouter" exact element={<AjouterEleve />} />
                <Route path="info/:CLID" exact element={<EleveInfo />} />

                <Route path="avertissemment" exact element={<AddAvertissemment />} />
                <Route path="avertissemment/info/:CLID" exact element={<AvertissemmentInfo />} />
                <Route path="avertissemment/edit/:CLID" exact element={<EditAvertissemment />} />

                <Route path="retenue" exact element={<AddRetenue />} />
                <Route path="retenue/info/:RTID" exact element={<RetenueInfo />} />
                <Route path="retenue/edit/:RTID" exact element={<EditRetenue />} />
            </Route>

            <Route path="ab" exact element={<Outlet />}>
                <Route path="" exact element={<AbonnemmentPage />} />
                <Route path="ajouter" exact element={<AjouterAbonnemment />} />
                <Route path="info/:FID" exact element={<AbonnemmentInfo />} />
                {/* <Route path="resumer" exact element={<ResumerFactures />} /> */}
                {/* <Route path="modifier/:FID" exact element={<EditFacture />} /> */}
                
            </Route>
            <Route path="of" exact element={<Outlet />}>
                <Route path="" exact element={<OffrePage />} />
                <Route path="info/:code" exact element={<OffreInfo />} />
            </Route>

            <Route path="cl" exact element={<Outlet />}>
                <Route path="" exact element={<ClassPage />} />
                <Route path="ajouter" exact element={<AjouterClass />} />
                <Route path="niveaux" exact element={<ClassNiveaux />} />
                <Route path="info/:CLID" exact element={<ClassInfo />} />
            </Route>
            <Route path="sl" exact element={<Outlet />}>
                <Route path="" exact element={<SallePage />} />
                <Route path="info/:SAID" exact element={<SalleInfo />} />
            </Route>
            <Route path="em" exact element={<Outlet />}>
                <Route path="" exact element={<AjouterEmploi />} />
                <Route path="emploi" exact element={<AjouterEmploi />} />
                <Route path="emploi/edit/:EID" exact element={<EditEmploi />} />
            </Route>

            <Route path="ex" exact element={<Outlet />}>
                <Route path="" exact element={<ExamainPage />} />
                <Route path="ajouter" exact element={<AjouterExamain />} />
                <Route path="info/:EID" exact element={<ExamainInfo />} />
                <Route path="modifier/:EID" exact element={<EditExamain />} />
                
                <Route path="resultat" exact element={<ExamainResultat />} />
                 


                <Route path="bultain" exact element={<AddBultain />} />
                <Route path="bultain/info/:CLID" exact element={<BultainInfo />} />
                <Route path="bultain/edit/:CLID" exact element={<EditBultain />} />

            </Route>
            <Route path="mt" exact element={<Outlet />} >
                <Route path="" exact element={<MatierePage />} />
                <Route path="info/:MTID" exact element={<MatiereInfo />} />
            </Route>

            <Route path="sa" exact element={<Outlet />}>
                <Route path="" exact element={<SeancePage />} />
                <Route path="ajouter" exact element={<AjouterSeance />} />
                <Route path="resumer" exact element={<ResumerSeances />} />
                <Route path="info/:SID" exact element={<SeanceInfo />} />
                <Route path="modifier/:SID" exact element={<EditSeance />} />
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