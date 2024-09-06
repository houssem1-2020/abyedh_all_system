import React from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet} from "react-router-dom";

//System Commande
// import CommandeTemp from '../../InterFaces/RouterPrinting/System/commande/commandes';

// //System Stock
// import ResumerArticle from '../../InterFaces/RouterPrinting/System/stock/stockResumerArticle';
// import VenteArticle from '../../InterFaces/RouterPrinting/System/stock/stockVenteArticle';
// import BonEntreSortie from '../../InterFaces/RouterPrinting/System/stock/stockBonES'

// //System Facture
import FactureTemp from '../../InterFaces/RouterPrinting/System/facture/facture';
// import FactureOfflineTemp from '../../InterFaces/RouterPrinting/System/facture/factureOffline'
// import BonsLivTemp from '../../InterFaces/RouterPrinting/System/facture/factureBonLS';
// import ResumerFacture from '../../InterFaces/RouterPrinting/System/facture/factureComptable'

// //System Camion
// import CamionVente from '../../InterFaces/RouterPrinting/System/camion/camionVente';
// import CamionFacture from '../../InterFaces/RouterPrinting/System/camion/camionFacture';
// import CamionFond from '../../InterFaces/RouterPrinting/System/camion/camionFond';
// import CamionStock from '../../InterFaces/RouterPrinting/System/camion/camionStock';
// import CamionStockArticle from '../../InterFaces/RouterPrinting/System/camion/camionStockArticle';
// import CamionFondTemp from '../../InterFaces/RouterPrinting/System/camion/camionFondTemp';
// import CamionFactureTemp from '../../InterFaces/RouterPrinting/System/camion/camionFacture';
// import CamionRecetteList from '../../InterFaces/RouterPrinting/System/camion/camionRecetteList';
// import CamionVenteArticles from '../../InterFaces/RouterPrinting/System/camion/camionVenteArticles';
// import CamionBonsLivTemp from '../../InterFaces/RouterPrinting/System/camion/camionFondBonsLS';

// //System Tools
// import RecetteDepo from '../../InterFaces/RouterPrinting/System/tools/toolsRecette';
// import PrintPrix from '../../InterFaces/RouterPrinting/System/tools/toolsPrintPrix';
// import PrintStock from '../../InterFaces/RouterPrinting/System/tools/toolsPrintStock';

// Caisse 
import FactureCaisse from '../../InterFaces/RouterPrinting/Caisse/factureCaisse';
import OpenCaisse from '../../InterFaces/RouterPrinting/Caisse/openCaisse';
import RecetteCamionTemp from '../../InterFaces/RouterPrinting/Caisse/recetteCaisse';

// import CamionInventaireTemp from '../../InterFaces/RouterPrinting/System/camion/camionInventaireTemp';
// import Catalogueprint from '../../InterFaces/RouterPrinting/System/tools/catalogueprint';
// import CommandeGroupBLS from '../../InterFaces/RouterPrinting/System/commande/camionBLS';
// import CommandeGroupFacture from '../../InterFaces/RouterPrinting/System/commande/camionFacture';
// import CommandeGroupResumer from '../../InterFaces/RouterPrinting/System/commande/camionResumer';

//Camion Stock
//Camion Vente
//Camion Recette

import ProfilePID from '../../Dashboard/Used/Profile/profilePID';



const PrintingRouter = () => (
        <Route path="Pr">
            {/* <Route path="commande/:cid" element={<CommandeTemp />} /> */}

            {/* <Route path="Stock">
                <Route path="resumer/:code/:s/:e" element={<ResumerArticle />} />
                <Route path="vente/:code/:s/:e" element={<VenteArticle />} />
                <Route path="bonE/:bonId" element={<BonEntreSortie genre='Entre' />} />
                <Route path="BonS/:bonId" element={<BonEntreSortie genre='Sortie' />} />
            </Route> */}

            <Route path="Facture">
                <Route path="info/:fid/:client" element={<FactureTemp />} />
                {/* <Route path="offline/info/:fid" element={<FactureOfflineTemp />} />
                <Route path="bonL/:fid" element={<BonsLivTemp genre='Livraison' />} />
                <Route path="bonS/:fid" element={<BonsLivTemp genre='Sortie'/>} />
                <Route path="resumer/:s/:e" element={<ResumerFacture />} /> */}
            </Route>
            
            <Route path="Camion">
                {/* <Route path="Fonds/fondTemp/:fid" element={<CamionFondTemp />} />
                <Route path="Fonds/FondbonL/:fid/:chauff/:de/:vers" element={<CamionBonsLivTemp genre='Livraison'/>} />
                <Route path="Fonds/FondbonS/:fid/:chauff/:de/:vers" element={<CamionBonsLivTemp genre='Sortie'/>} />
                <Route path="Inventaire/:fid" element={<CamionInventaireTemp  />} />
                <Route path="info/factureTemp/:fid" element={<CamionFactureTemp />} /> */}

                {/* Control
                <Route path="info/stock/:cid" element={<CamionStock />} />
                <Route path="info/stock-z/:cid" element={<CamionStock zero />} />
                <Route path="info/stock/article/:cid/:aid" element={<CamionStockArticle />} />
                <Route path="info/vente/factures/:cid/:d" element={<CamionVente />} />
                <Route path="info/vente/articles/:cid/:d" element={<CamionVenteArticles />} />
                <Route path="info/vente/recette/:cid/:s/:e" element={<CamionRecetteList />} />
                <Route path="info/fond/:cid/:s/:e" element={<CamionFond />} /> */}

                {/* Commandes 
                <Route path="commandes/BL/:CID/:jour" exact element={<CommandeGroupBLS  genre='Livraison' />} />
                <Route path="commandes/BS/:CID/:jour" exact element={<CommandeGroupBLS  genre='Sortie' />} />
                <Route path="commandes/Facture/:CID/:jour" exact element={<CommandeGroupFacture />} />
                <Route path="commandes/Resumer/:CID/:jour" exact element={<CommandeGroupResumer />} />*/}

            </Route>

            {/* <Route path="Tools">
                <Route path="recette/:s/:e" element={<RecetteDepo />} />
                <Route path="print/prix/:g" element={<PrintPrix />} />
                <Route path="print/stock/:g" element={<PrintStock />} />
                <Route path="catalogue/:tagNum" element={<Catalogueprint />} />
            </Route>
            
            <Route path="CamSys">
                <Route path="facture/:fid" element={<FactureCamion />} />
                <Route path="stock" element={<PrintStock />} />
                <Route path="stock/article" element={<PrintStock />} />
                <Route path="recette" element={<RecetteCamionTemp />} />
            </Route> */}
            <Route path="ProfilePrint/pid" exact element={<ProfilePID />} />
            <Route path="caisse">
                <Route path="facture/:fid" element={<FactureCaisse />} />
                <Route path="open" element={<OpenCaisse />} />
                <Route path="recette" element={<RecetteCamionTemp />} />
            </Route>
        </Route> 
)

export default PrintingRouter 