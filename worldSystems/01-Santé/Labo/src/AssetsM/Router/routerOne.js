import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'
import UploadeCamionPage from '../../InterFaces/RouterOne/Upload/updatePage';
// import GConf from '../generalConf';


// //Stock
import Stock from "../../InterFaces/RouterOne/Stock/stockPage";


// //Client

import ReglemmentClient from '../../InterFaces/RouterOne/Clients/reglemmentClient';
import ClientList from '../../InterFaces/RouterOne/Clients/clientList'; 

// //Recette
import Recette from "../../InterFaces/RouterOne/Recette/recette";
import OneGConf from '../../InterFaces/RouterOne/Assets/OneGConf';
import ArticleInfo from '../../InterFaces/RouterOne/Stock/ArticleInfo';




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
                    <Route path="rdv" exact element={<Stock />} ></Route> 
                    <Route path="rdv/info/:CID" exact element={<ArticleInfo />} ></Route> 
                    <Route path="cld" exact element={<Recette />} > </Route>
                    <Route path="cl" exact element={<ClientList />} ></Route>
                    
                    <Route path="up" exact element={<UploadeCamionPage />} />
            </Route> 
    </Route>
)

export default routerOne 