import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

//main 
import LoginPage from '../../InterFaces/RouterOne/LoginPage'
import OneLandingPage from '../../InterFaces/RouterOne/OneLandingPage'

import OneGConf from '../../InterFaces/RouterOne/Assets/OneGConf';


// //RDV
import RensyVousPage from "../../InterFaces/RouterOne/RendyVous/rendyVousPage";
import RensyVousInfo from '../../InterFaces/RouterOne/RendyVous/rendyVousInfo';

// //Client
import AjoutrerPatient from '../../InterFaces/RouterOne/Patients/ajouterPatient';
import PatientListe from '../../InterFaces/RouterOne/Patients/patientListe'; 

////C
import Calendrier from "../../InterFaces/RouterOne/Calendrier/recette";


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
                    <Route path="rdv" exact element={<RensyVousPage />} ></Route> 
                    <Route path="rdv/info/:CID" exact element={<RensyVousInfo />} ></Route> 
                    <Route path="cld" exact element={<Calendrier />} > </Route>
                    <Route path="cl" exact element={<PatientListe />} ></Route>
                    <Route path="clad" exact element={<AjoutrerPatient />} ></Route>
                    
                    <Route path="up" exact element={<UpdatePage />} />
                    <Route path="st" exact element={<SettingPage />} />
            </Route> 
    </Route>
)

export default routerOne 