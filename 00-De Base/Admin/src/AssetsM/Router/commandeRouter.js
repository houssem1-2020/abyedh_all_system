import React from 'react'
import { BrowserRouter as Router,Routes,Route, Outlet, Navigate} from "react-router-dom";

//logIn & Landing 
import InputLoginPage from '../../ILAND/Communication/loginPage'
import InputLandingPage from '../../ILAND/Communication/commandeLanding'


//ajouter commande
import NouveauxCommande from "../../ILAND/Communication/NCommande/nouveauxCommande";

//mes commandes
import CommandePage from '../../ILAND/Communication/MCommandes/commandePage';
import CommandeEdit from '../../ILAND/Communication/MCommandes/commandeEdit';
import CommandeInfo from "../../ILAND/Communication/MCommandes/commandesInfo"

// Catalogue 
import FamilleList from "../../ILAND/Communication/Catalogue/FamilleList";
import Famille from '../../ILAND/Communication/Catalogue/Famille';
import ArticleInfo from '../../ILAND/Communication/Catalogue/ArticleInfo';
import ArticleList from '../../ILAND/Communication/Catalogue/ArticleList';
import ArticlePhoto from '../../ILAND/Communication/Catalogue/ArticlePhoto';

//clients
import ClientsPage from "../../ILAND/Communication/Clients/clientData";
import ClientPointage from '../../ILAND/Communication/Clients/clientPointage';
import ClientMap from '../../ILAND/Communication/Clients/clientMap';
import ClientList from '../../ILAND/Communication/Clients/clientList';
import AddClient from '../../ILAND/Communication/Clients/addClient';

//uploade
import UploadeCommandePage from '../../ILAND/Communication/Upload/updatePage';
import RecettePage from '../../ILAND/Communication/Recette/recettePage';
import StatPage from '../../ILAND/Communication/Statistic/statPage';
import GConf from '../generalConf';
import ClientData from '../../ILAND/Communication/Clients/clientData';



const RedirectingPage = () => {
    const CommandeIsLogged = localStorage.getItem(`Admin_Dir_LocalD`);
    return (<>
        {
            CommandeIsLogged ? <Navigate to='/Dir/L'  /> : <Navigate to='/Dir/logIn'  />
        } 
</>);}

const commandeRouter = () => (
    <Route path="Com" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<InputLoginPage />} />
            <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<InputLandingPage />} />
                    <Route path="cm" exact element={<NouveauxCommande />} />
                    <Route path="mc" exact element={<Outlet />} >
                        <Route path="" exact element={<CommandePage />} />
                        <Route path="modifier/:CID" exact element={<CommandeEdit />} />
                        <Route path="info/:CID" exact element={<CommandeInfo />} />
                    </Route>
                    <Route path="cg" exact element={<Outlet />} >
                        <Route path="" exact element={<ArticleList />} />
                        <Route path="info/:AID" exact element={<ArticleInfo />} />
                        <Route path="familles" exact element={<Famille />} />
                        <Route path="familles/:genre" exact element={<FamilleList />} />
                        <Route path="ajout-ph" exact element={<ArticlePhoto />} />
                    </Route>
                    <Route path="cl" exact element={<Outlet />} >
                        <Route path="" exact element={<ClientsPage />} />
                        <Route path="ajouter" exact element={<AddClient />} />
                        <Route path="recherche" exact element={<ClientMap />} />
                        <Route path="pointage" exact element={<ClientPointage />} />
                        <Route path="List" exact element={<ClientList />} />
                        <Route path="info/:CID" exact element={<ClientData />} />
                    </Route>
                    <Route path="rt" exact element={<RecettePage />} />
                    <Route path="stat" exact element={<StatPage />} />
                    <Route path="up" exact element={<UploadeCommandePage />} />
            </Route>
    </Route>
)

export default commandeRouter 