import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import OneGConf from '../../InterFaces/RouterOne/Assets/OneGConf';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'
import UploadeCamionPage from '../../InterFaces/RouterOne/Upload/updatePage';
 

// //Caisse Simple 
import StockPage from "../../InterFaces/RouterOne/Stock/stockPage";

import CommandesInfo from '../../InterFaces/RouterOne/Commandes/commandeInfo';
import CommandesListe from '../../InterFaces/RouterOne/Commandes/commandeListe'; 

import ClientInfo from '../../InterFaces/RouterOne/Clients/clientInfo';
import ClientList from '../../InterFaces/RouterOne/Clients/clientList'; 

import RetourPage from '../../InterFaces/RouterOne/Retour/retourPage';






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
                    
                    <Route path="cmd" exact element={<Outlet />} >
                        <Route path="" exact element={<CommandesListe />} />
                        <Route path="info/:OPID" exact element={<CommandesInfo />} />
                    </Route>

                    <Route path="sk" exact element={<StockPage />} />

                    <Route path="rt" exact element={<RetourPage />} />

                    <Route path="cl" exact element={<Outlet />} >
                        <Route path="" exact element={<ClientList />} />
                        <Route path="info/:CID" exact element={<ClientInfo />} />
                    </Route>
                    
                    <Route path="up" exact element={<UploadeCamionPage />} />
            </Route> 
    </Route>
)

export default routerOne 