import React from 'react'
import { BrowserRouter as Router,Routes,Route, Outlet, Navigate} from "react-router-dom";

//logIn & Landing 
import LoginPage from '../../InterFaces/RouterThree/LoginPage'
import ThreeLandingPage from '../../InterFaces/RouterThree/ThreeLandingPage'


// //ajouter commande
// import NouveauxCommande from "../../InterFaces/RouterThree/NCommande/nouveauxCommande";

// //mes commandes
// import CommandePage from '../../InterFaces/RouterThree/MCommandes/commandePage';
// import CommandeEdit from '../../InterFaces/RouterThree/MCommandes/commandeEdit';
// import CommandeInfo from "../../InterFaces/RouterThree/MCommandes/commandesInfo"

// // Catalogue 
// import FamilleList from "../../InterFaces/RouterThree/Catalogue/FamilleList";
// import Famille from '../../InterFaces/RouterThree/Catalogue/Famille';
// import ArticleInfo from '../../InterFaces/RouterThree/Catalogue/ArticleInfo';
// import ArticleList from '../../InterFaces/RouterThree/Catalogue/ArticleList';
// import ArticlePhoto from '../../InterFaces/RouterThree/Catalogue/ArticlePhoto';

// //clients
// import ClientsPage from "../../InterFaces/RouterThree/Clients/clientData";
// import ClientPointage from '../../InterFaces/RouterThree/Clients/clientPointage';
// import ClientMap from '../../InterFaces/RouterThree/Clients/clientMap';
// import ClientList from '../../InterFaces/RouterThree/Clients/clientList';
// import AddClient from '../../InterFaces/RouterThree/Clients/addClient';

// //uploade
// import UploadeCommandePage from '../../InterFaces/RouterThree/Upload/updatePage';
// import RecettePage from '../../InterFaces/RouterThree/Recette/recettePage';
// import StatPage from '../../InterFaces/RouterThree/Statistic/statPage';

// import ClientData from '../../InterFaces/RouterThree/Clients/clientData';



const RedirectingPage = () => {
    const OneIsLogged = localStorage.getItem(`Restaurant_Reservation_LocalD`);
    return (<>
        {
            OneIsLogged ? <Navigate to='/R/L'  /> : <Navigate to='/R/logIn'  />
        } 
</>);}

const routerThree = () => (
    <Route path="R" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<LoginPage />} />
             <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<ThreeLandingPage />} />
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

export default routerThree 