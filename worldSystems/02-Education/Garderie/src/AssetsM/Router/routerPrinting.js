import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";

 

// //System Facture
import PresenceTemp from '../../InterFaces/RouterPrinting/System/Eleves/facture';
import BultinTemp from '../../InterFaces/RouterPrinting/System/Eleves/factureBonLS';
import ExamainTemp from '../../InterFaces/RouterPrinting/System/Eleves/factureComptable';
import DossierScolaireTemp from '../../InterFaces/RouterPrinting/System/Eleves/factureOffline';

import ProfilePID from '../../Dashboard/Used/Profile/profilePID';



const PrintingRouter = () => (
        <Route path="Pr">
             

            <Route path="Eleve">
                <Route path="presence/:de/:vers" element={<PresenceTemp />} />
                <Route path="bultin/:de/:vers" element={<BultinTemp />} />
                <Route path="certificat/:de/:vers" element={<ExamainTemp />} />
                <Route path="dossier/:de/:vers" element={<DossierScolaireTemp />} />
            </Route>
            
            <Route path="ProfilePrint/pid" exact element={<ProfilePID />} />
             
        </Route> 
)

export default PrintingRouter 