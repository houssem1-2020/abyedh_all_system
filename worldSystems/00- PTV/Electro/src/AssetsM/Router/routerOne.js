import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'
import UploadeCamionPage from '../../InterFaces/RouterOne/Upload/updatePage';
// import GConf from '../generalConf';

// //Caisse Simple 
import CaisseSimple from "../../InterFaces/RouterOne/Caisse/caisseSimple";

// //Caisse Rapide  
import CaisseRapide from "../../InterFaces/RouterOne/CaisseRapide/caisseRapide";

// //Stock
import Stock from "../../InterFaces/RouterOne/Stock/stockPage";
import StockList from '../../InterFaces/RouterOne/Stock/stockList';
import ArticleInfo from '../../InterFaces/RouterOne/Stock/ArticleInfo';
import CaissePannier from '../../InterFaces/RouterOne/Stock/caissePannier';
import FamilleList from '../../InterFaces/RouterOne/Stock/FamilleList';

// //Client
import ClientsPage from "../../InterFaces/RouterOne/Clients/client";
import ReglemmentClient from '../../InterFaces/RouterOne/Clients/reglemmentClient';
import ClientList from '../../InterFaces/RouterOne/Clients/clientList'; 

// //Recette
import Recette from "../../InterFaces/RouterOne/Recette/recette";
import DepenseRecette from '../../InterFaces/RouterOne/Recette/ajouterDepense';
import ImprimerRecette from '../../InterFaces/RouterOne/Recette/imprimerRecette';
import MesFactures from '../../InterFaces/RouterOne/Recette/mesFactures';
import FactureInfo from '../../InterFaces/RouterOne/Recette/factureInfo';
import CommandePage from '../../InterFaces/RouterOne/Commandes/commandePage';
import OneGConf from '../../InterFaces/RouterOne/Assets/OneGConf';




const RedirectingPage = () => {
    const OneIsLogged = localStorage.getItem(`${OneGConf.routerTagName}_LocalD`);
    return (<>
        {
            OneIsLogged ? <Navigate to={`/${OneGConf.routerName}/L`} /> : <Navigate to={`/${OneGConf.routerName}/logIn`}  />
        } 
</>);}

const routerOne = () => (
    <Route path="C" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<LoginPage />} />
             <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<OneLandingPage />} />
                    <Route path="nv" exact element={<CaisseSimple />} />
                    {/* <Route path="cr" exact element={<CaisseRapide />} /> */}
                    <Route path="cmd" exact element={<CommandePage />} />
                    {/* <Route path="sk" exact element={<Outlet />} >
                        <Route path="" exact element={<Stock />} />
                        <Route path="Famille" exact element={< FamilleList />} />
                        <Route path="List/:genre" exact element={< StockList />} />
                        <Route path="Info/:code" exact element={<ArticleInfo />} />
                        <Route path="pannier" exact element={<CaissePannier />} />
                    </Route> 
                    <Route path="cm" exact element={<Outlet />} >
                        <Route path="" exact element={<Stock />} />
                        <Route path="Famille" exact element={< FamilleList />} />
                        <Route path="List/:genre" exact element={< StockList />} />
                        <Route path="Info/:code" exact element={<ArticleInfo />} />
                        <Route path="pannier" exact element={<CaissePannier />} />
                    </Route>*/}
                    <Route path="rt" exact element={<Outlet />} >
                        <Route path="" exact element={<Recette />} />
                        {/* <Route path="depenses" exact element={<DepenseRecette />} /> */}
                        <Route path="imprimer" exact element={<ImprimerRecette />} />
                        <Route path="vente" exact element={<MesFactures />} />
                        <Route path="vente/info/:FID" exact element={<FactureInfo />} />
                    </Route>

                    
                    <Route path="cmdv" exact element={<Outlet />} >
                        <Route path="" exact element={<ClientList />} />
                        <Route path="info/:CID" exact element={<ReglemmentClient />} />
                    </Route>
                    
                    <Route path="up" exact element={<UploadeCamionPage />} />
            </Route> 
    </Route>
)

export default routerOne 