import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import OneGConf from '../../InterFaces/RouterOne/Assets/OneGConf';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'
 
import NouveauxSeance from '../../InterFaces/RouterOne/Seances/nouveauxSeance';

import NouveauxMembre from '../../InterFaces/RouterOne/Membres/ajouterMmebre';
import NouveauxAbonnemment from '../../InterFaces/RouterOne/Abonemment/nouveauxAbonnemment';
import Renouvelemment from '../../InterFaces/RouterOne/Abonemment/renouvelemment'; 


import SettingPage from '../../InterFaces/RouterOne/Used/settingPage';
import UpdatePage from '../../InterFaces/RouterOne/Used/updatePage';


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

                    <Route path="ns" exact element={<NouveauxSeance  />} />
                    <Route path="nvmb" exact element={<NouveauxMembre />} />
                    <Route path="rnv" exact element={<Renouvelemment  />} />
                    <Route path="nvab" exact element={<NouveauxAbonnemment />} />

                    <Route path="up" exact element={<UpdatePage />} />
                    <Route path="st" exact element={<SettingPage />} />
            </Route> 
    </Route>
)

export default routerOne 