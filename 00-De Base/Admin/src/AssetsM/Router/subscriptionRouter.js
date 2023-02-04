import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

//Main
//Factures
import NouveauxInput from "../../ILAND/Subscription/NouveauxInputs/nouveauxInputs";

//Mes Factures
import EditInput from "../../ILAND/Subscription/EditInput/editPage";

//Recette
import InfoGenerale from "../../ILAND/Subscription/InfoGeneral/infoGeneralePage";
import InputLoginPage from '../../ILAND/Subscription/loginPage'
import InputLandingPage from '../../ILAND/Subscription/SubscriptionLandingPage'
import EditProfile from '../../ILAND/Subscription/EditInput/editProfile';
import EditInfoGenerale from '../../ILAND/Subscription/InfoGeneral/editInfoGenrale';
import UploadeCamionPage from '../../ILAND/Subscription/Upload/updatePage';



const RedirectingPage = () => {
    const CamionIsLogged = localStorage.getItem(`Admin_Subs_LocalD`);
    return (<>
        {
            CamionIsLogged ? <Navigate to='/Subs/L'  /> : <Navigate to='/Subs/logIn'  />
        } 
</>);}

const subscriptionRouter = () => (
    <Route path="Subs" exact element={<Outlet />} >
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

export default subscriptionRouter 