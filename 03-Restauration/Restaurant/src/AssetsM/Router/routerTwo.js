import React from 'react'
import { BrowserRouter as Router,Routes,Route, Outlet, Navigate} from "react-router-dom";

//logIn & Landing 
import LoginPage from '../../InterFaces/RouterTwo/LoginPage'
import TwoLandingPage from '../../InterFaces/RouterTwo/TwoLandingPage'


// //ajouter commande
// import NouveauxCommande from "../../InterFaces/RouterTwo/NCommande/nouveauxCommande";

// //mes commandes
// import CommandePage from '../../InterFaces/RouterTwo/MCommandes/commandePage';
// import CommandeEdit from '../../InterFaces/RouterTwo/MCommandes/commandeEdit';
// import CommandeInfo from "../../InterFaces/RouterTwo/MCommandes/commandesInfo"

// // Catalogue 
// import FamilleList from "../../InterFaces/RouterTwo/Catalogue/FamilleList";
// import Famille from '../../InterFaces/RouterTwo/Catalogue/Famille';
// import ArticleInfo from '../../InterFaces/RouterTwo/Catalogue/ArticleInfo';
// import ArticleList from '../../InterFaces/RouterTwo/Catalogue/ArticleList';
// import ArticlePhoto from '../../InterFaces/RouterTwo/Catalogue/ArticlePhoto';

// //clients
// import ClientsPage from "../../InterFaces/RouterTwo/Clients/clientData";
// import ClientPointage from '../../InterFaces/RouterTwo/Clients/clientPointage';
// import ClientMap from '../../InterFaces/RouterTwo/Clients/clientMap';
// import ClientList from '../../InterFaces/RouterTwo/Clients/clientList';
// import AddClient from '../../InterFaces/RouterTwo/Clients/addClient';

// //uploade
// import UploadeCommandePage from '../../InterFaces/RouterTwo/Upload/updatePage';
// import RecettePage from '../../InterFaces/RouterTwo/Recette/recettePage';
// import StatPage from '../../InterFaces/RouterTwo/Statistic/statPage';

// import ClientData from '../../InterFaces/RouterTwo/Clients/clientData';



const RedirectingPage = () => {
    const OneIsLogged = localStorage.getItem(`Restaurant_Reservation_LocalD`);
    return (<>
        {
            OneIsLogged ? <Navigate to='/R/L'  /> : <Navigate to='/R/logIn'  />
        } 
</>);}

const routerTwo = () => (
    <Route path="R" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<LoginPage />} />
             <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<TwoLandingPage />} />
                   {/* <Route path="cm" exact element={<NouveauxCommande />} />
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
                    <Route path="up" exact element={<UploadeCommandePage />} />*/}
            </Route> 
    </Route>
)

export default routerTwo 