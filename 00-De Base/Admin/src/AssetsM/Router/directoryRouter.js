import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

//Main
//Factures
import NouveauxInput from "../../ILAND/Directory/NouveauxInputs/nouveauxInputs";

//Mes Factures
import EditInput from "../../ILAND/Directory/EditInput/editPage";

//Recette
import InfoGenerale from "../../ILAND/Directory/InfoGeneral/infoGeneralePage";
import InputLoginPage from '../../ILAND/Directory/loginPage'
import InputLandingPage from '../../ILAND/Directory/directoryLandingPage'
import EditProfile from '../../ILAND/Directory/EditInput/editProfile';
import EditInfoGenerale from '../../ILAND/Directory/InfoGeneral/editInfoGenrale';
import UploadeCamionPage from '../../ILAND/Directory/Upload/updatePage';



const RedirectingPage = () => {
    const CamionIsLogged = localStorage.getItem(`Admin_Dir_LocalD`);
    return (<>
        {
            CamionIsLogged ? <Navigate to='/Dir/L'  /> : <Navigate to='/Dir/logIn'  />
        } 
</>);}

const camionRouter = () => (
    <Route path="Dir" exact element={<Outlet />} >
            <Route path="" exact element={<RedirectingPage />} />
            <Route path="logIn" exact element={<InputLoginPage />} />
            <Route path="L" exact element={<Outlet />} >
                    <Route path="" exact element={<InputLandingPage />} />
                    <Route path="nv" exact element={<NouveauxInput />} />
                    <Route path="ed" exact element={<Outlet />} >
                        <Route path="" exact element={<EditInput />} />
                        <Route path="modifier/:genre/:PID" exact element={<EditProfile />} />
                    </Route>
                    <Route path="if" exact element={<Outlet />} >
                        <Route path="" exact element={<InfoGenerale />} />
                        <Route path="edit/:genre/:PID" exact element={<EditInfoGenerale />} />
                    </Route>
                
                    <Route path="up" exact element={<UploadeCamionPage />} />
            </Route>
    </Route>
)

export default camionRouter 