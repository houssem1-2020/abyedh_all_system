import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";

 
import StockListe from '../../InterFaces/RouterPrinting/Caisse/factureCaisse';
import OperationInfo from '../../InterFaces/RouterPrinting/Caisse/openCaisse';
import RecetteCamionTemp from '../../InterFaces/RouterPrinting/Caisse/recetteCaisse';

import ProfilePID from '../../Dashboard/Used/Profile/profilePID';



const PrintingRouter = () => (
        <Route path="Pr">
             <Route path="stock">
                <Route path="liste/:de/:vers" element={<StockListe />} />
             </Route>
             <Route path="operations">
                <Route path="info/:OPID" element={<OperationInfo />} />
             </Route>

            <Route path="ProfilePrint/pid" exact element={<ProfilePID />} />
           
        </Route> 
)

export default PrintingRouter 