import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import OneGConf from '../../InterFaces/RouterOne/Assets/OneGConf';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'
 

import NouveauxSeance from '../../InterFaces/RouterOne/Seances/nouveauxSeance';
import SeancesListe from '../../InterFaces/RouterOne/Seances/SeancesListe'; 
import SeanceIndo from '../../InterFaces/RouterOne/Seances/seanceInfo';
import EditSeance from '../../InterFaces/RouterOne/Seances/editSeance';

import TrajetPage from '../../InterFaces/RouterOne/Trajets/trajetPage';
import CalendrierPage from '../../InterFaces/RouterOne/Calendrier/calendarPage';



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
    <Route path="M" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<LoginPage />} />
             <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<OneLandingPage />} />

                    <Route path="ns" exact element={<NouveauxSeance  />} />

                    <Route path="ms" exact element={<Outlet />} >
                        <Route path="" exact element={<SeancesListe />} />
                        <Route path="info/:SID" exact element={<SeanceIndo />} />
                        <Route path="edit/:SID" exact element={<EditSeance />} />
                    </Route>

                    <Route path="tr" exact element={<TrajetPage />} />
                    
                    <Route path="cl" exact element={<CalendrierPage />} />
                    
                    <Route path="up" exact element={<UpdatePage />} />
                    <Route path="st" exact element={<SettingPage />} />
            </Route> 
    </Route>
)

export default routerOne 