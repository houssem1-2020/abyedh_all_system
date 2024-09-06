import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";
 
import OrdonanceTemp from '../../InterFaces/RouterPrinting/System/ordonance/ordonanceTemp';
import RapportTemp from '../../InterFaces/RouterPrinting/System/rapport/rapportTemp';
 
import FactureCaisse from '../../InterFaces/RouterPrinting/RDV/factureCaisse';
import OpenCaisse from '../../InterFaces/RouterPrinting/RDV/openCaisse';
import RecetteCamionTemp from '../../InterFaces/RouterPrinting/RDV/recetteCaisse';
 

import ProfilePID from '../../Dashboard/Used/Profile/profilePID';



const PrintingRouter = () => (
        <Route path="Pr">
            <Route path="ordonance">
                <Route path="info/:ORID" element={<OrdonanceTemp />} />
            </Route>
            <Route path="rapport">
                <Route path="info/:RPID" element={<RapportTemp />} />
            </Route>

            <Route path="ProfilePrint/pid" exact element={<ProfilePID />} />
            {/* <Route path="caisse">
                <Route path="facture/:fid" element={<FactureCaisse />} />
                <Route path="open" element={<OpenCaisse />} />
                <Route path="recette" element={<RecetteCamionTemp />} />
            </Route> */}
        </Route> 
)

export default PrintingRouter 