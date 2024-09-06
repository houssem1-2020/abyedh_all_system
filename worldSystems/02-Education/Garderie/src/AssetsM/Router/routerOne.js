import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'
import UploadeCamionPage from '../../InterFaces/RouterOne/Upload/updatePage';



import NouveauxSeance from '../../InterFaces/RouterOne/Seances/nouveauxSeance';
import AppealPage from '../../InterFaces/RouterOne/Seances/appealPage';

import JournaleListe from '../../InterFaces/RouterOne/Journale/journaleListe'; 
import JournaleInfo from '../../InterFaces/RouterOne/Journale/journalInfo';
import EditJournale from '../../InterFaces/RouterOne/Journale/editJournale';

import EmlpoiPage from '../../InterFaces/RouterOne/emploi/emploiPage';
import ExamainPage from '../../InterFaces/RouterOne/Examain/examainPage';


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

                    <Route path="ns" exact element={<NouveauxSeance  />} />
                    
                    <Route path="ap" exact element={<AppealPage />} />

                    <Route path="jr" exact element={<Outlet />} >
                        <Route path="" exact element={<JournaleListe />} />
                        <Route path="info/:SID" exact element={<JournaleInfo />} />
                        <Route path="edit/:SID" exact element={<EditJournale />} />
                    </Route>

                    <Route path="mp" exact element={<EmlpoiPage />} />
                    
                    <Route path="ex" exact element={<ExamainPage />} />
                    
                    <Route path="up" exact element={<UploadeCamionPage />} />
            </Route> 
    </Route>
)

export default routerOne 