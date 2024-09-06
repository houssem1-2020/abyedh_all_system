import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';

function DataBaseBU() {

    /* ############################### UseEffect ################################*/
    const navigate = useNavigate();
    let [fileSize , setFileSize] = useState(0)

    let [stockLink , setStockLink] = useState('')
    let [stockLinkBtn , setStockLinkBtn] = useState(true)

    let [factureLink , setFactureLink] = useState('')
    let [factureLinkBtn , setFactureLinkBtn] = useState(true)

    let [commandeLink , setCommandeLink] = useState('')
    let [commandeLinkBtn , setCommandeLinkBtn] = useState(true)

    let [clientLink , setClientLink] = useState('')
    let [clientLinkBtn , setClientLinkBtn] = useState(true)

    let [stockCamionLink , setStockCamionLink] = useState('')
    let [stockCamionLinkBtn , setStockCamionLinkBtn] = useState(true)

    let exportedTable = [
        { name: '05_restaurant_caisses', where: `PID = ${GConf.PID}`, toExport : true },
        { name: '05_restaurant_factures', where: `PID = ${GConf.PID}`, toExport : true },
        { name: '05_restaurant_menu', where: `PID = ${GConf.PID}`, toExport : true},
        { name: '05_restaurant_menu_genre', where: `PID = ${GConf.PID}`, toExport : true},
        { name: '05_restaurant_clients', where: `PID = ${GConf.PID}`, toExport : true},
        { name: '05_restaurant_setting', where: `PID = ${GConf.PID}`, toExport : true},
        { name: '05_restaurant_tables', where: `PID = ${GConf.PID}`, toExport : true},
        { name: '05_restaurant_team', where: `PID = ${GConf.PID}`, toExport : true},
    ]

    /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/tools/export/calcsize`, {
            PID: GConf.PID,
        })
        .then(function (response) {
            setFileSize(response.data.totSize)
        })
    }, [])

    /* ############################### Function ################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const UpdateTableStet = (tableSelected,state) =>{
        exportedTable.find(table => table.name === tableSelected).toExport = state;
        console.log(exportedTable)
    }
    const ExportFlies = (table,file) => {
        axios.post(`${GConf.ApiLink}/tools/export/done`, {
            PID: GConf.PID,
            fileName: `restaurant_${GConf.PID}`,
            exportedTable : exportedTable.filter(table => table.toExport)
            //exportedTable : exportedTable
        })
        .then(function (response) {

            switch (file) {
                case 'Stock':
                    setStockLink(response.data.file)
                    setStockLinkBtn(false)
                    break;
                case 'Factures':
                    setFactureLink(response.data.file)
                    setFactureLinkBtn(false)
                    break;
                case 'Commande':
                    setCommandeLink(response.data.file)
                    setCommandeLinkBtn(false)
                    break;
                case 'Client':
                    setClientLink(response.data.file)
                    setClientLinkBtn(false)
                    break;
                case 'StockCamion':
                    setStockCamionLink(response.data.file)
                    setStockCamionLinkBtn(false)
                    break;

                default:
                    break;
            }
            toast.success("Fichier est Prest !", GConf.TostSuucessGonf)
        })
    }

    const ClearDirectory = () => {
        axios.post(`${GConf.ApiLink}/tools/export/clear`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            console.log(response.data)
            toast.success("Server est Netoyer  !", GConf.TostSuucessGonf)
        })
    }

    /* ############################### Card ################################*/
    const StockCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>Sauvegarder Vos Donneé Sur Votre Ordonateur  </h5> 
               
               <Checkbox className='mb-2' label='Sauvgarder le menu' defaultChecked  onChange={(event, data) =>  UpdateTableStet('05_restaurant_menu',data.checked)}/>
               <Checkbox className='mb-2' label='Sauvgarder les genres menu' defaultChecked  onChange={(event, data) =>  UpdateTableStet('05_restaurant_menu_genre',data.checked)}/>
               <Checkbox className='mb-2' label='Sauvgarder les factures ' defaultChecked onChange={(event, data) =>  UpdateTableStet('05_restaurant_factures',data.checked)} />
               <Checkbox className='mb-2' label='Sauvgarder les caisses ' defaultChecked onChange={(event, data) =>  UpdateTableStet('05_restaurant_caisses',data.checked)} />
               <Checkbox className='mb-2' label='Sauvgarder les clients ' defaultChecked onChange={(event, data) =>  UpdateTableStet('05_restaurant_clients',data.checked)} />
               <Checkbox className='mb-2' label='Sauvgarder l"equipe ' defaultChecked onChange={(event, data) =>  UpdateTableStet('05_restaurant_team',data.checked)} />
               <Checkbox className='mb-2' label='Sauvgarder les Tables ' defaultChecked onChange={(event, data) =>  UpdateTableStet('05_restaurant_tables',data.checked)} />
               <Checkbox className='mb-2' label='Sauvgarder les Paramétres ' defaultChecked onChange={(event, data) =>  UpdateTableStet('05_restaurant_setting',data.checked)} />
               
               <div className='text-end'>
                    <Button className='bg-info rounded-pill' onClick={() => ExportFlies( `${GConf.SystemTag}_article`,'Stock') }> <span className='bi bi-folder-symlink-fill'></span> Export</Button>
                    
                    <a href={`${GConf.ApiLink}/tools/export/download/${stockLink}` } style={{pointerEvents: stockLinkBtn ? 'none' :  ''}} target='c_blank'>
                        <Button className='bg-warning rounded-pill' disabled={stockLinkBtn}> <span className='bi bi-printer-fill'></span>  Telecharger Copie </Button>
                    </a> 
               </div>
            </div>
        </>)
    }
    const FacturesCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>Sauvegarder les Factures </h5> 
               <p>
               </p> 
               <div className='text-end'>
                    <Button className='bg-info rounded-pill' onClick={() => ExportFlies( 'factures','Factures') }> <span className='bi bi-folder-symlink-fill'></span> Export</Button>
                    
                    <a href={`${GConf.ApiLink}/tools/export/download/${factureLink}` } style={{pointerEvents: factureLinkBtn ? 'none' :  ''}} target='c_blank'>
                        <Button className='bg-warning rounded-pill' disabled={factureLinkBtn}> <span className='bi bi-printer-fill'></span>  Telecharger Copie </Button>
                    </a> 
               </div>
            </div>
        </>)
    }
    const ClientCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>Sauvegarder les Client </h5> 
               <p>
               </p> 
               <div className='text-end'>
                    <Button className='bg-info rounded-pill' onClick={() => ExportFlies( `system_clients`,'Client') }> <span className='bi bi-folder-symlink-fill'></span> Export</Button>
                    
                    <a href={`${GConf.ApiLink}/tools/export/download/${clientLink}` } style={{pointerEvents: clientLinkBtn ? 'none' :  ''}} target='c_blank'>
                        <Button className='bg-warning rounded-pill' disabled={clientLinkBtn}> <span className='bi bi-printer-fill'></span>  Telecharger Copie </Button>
                    </a> 
               </div>
            </div>
        </>)
    }
    const CamionStockCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>Sauvegarder Le Stock Camion </h5> 
               <p>
               </p> 
               <div className='text-end'>
                    <Button className='bg-info rounded-pill' onClick={() => ExportFlies( `${GConf.SystemTag}_camion_stock`,'StockCamion') }> <span className='bi bi-folder-symlink-fill'></span> Export</Button>
                    
                    <a href={`${GConf.ApiLink}/tools/export/download/${stockCamionLink}` } style={{pointerEvents: stockCamionLinkBtn ? 'none' :  ''}} target='c_blank'>
                        <Button className='bg-warning rounded-pill' disabled={stockCamionLinkBtn}> <span className='bi bi-printer-fill'></span>  Telecharger Copie </Button>
                    </a> 
               </div>
            </div>
        </>)
    }
    const CommandeCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>Sauvegarder les Commandes </h5> 
               <p>
               </p> 
               <div className='text-end'>
                    <Button className='bg-info rounded-pill' onClick={() => ExportFlies( `system_commande`,'Commande') }> <span className='bi bi-folder-symlink-fill'></span> Export</Button>
                    
                    <a href={`${GConf.ApiLink}/tools/export/download/${commandeLink}` } style={{pointerEvents: commandeLinkBtn ? 'none' :  ''}} target='c_blank'>
                        <Button className='bg-warning rounded-pill' disabled={commandeLinkBtn}> <span className='bi bi-printer-fill'></span>  Telecharger Copie </Button>
                    </a> 
               </div>
            </div>
        </>)
    }
    const ClearDirectoryCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>Nettoyage des ficher indeésirable sur le serveur </h5>  
               <div className='row'>
                    <div className='col-8 align-self-center'>
                        Totale des volume des ficher est : {fileSize / 1000000} MB
                    </div>
                    <div className='col-4 text-end align-self-center'>
                        <Button className='bg-danger text-white' onClick={() => ClearDirectory() }> nettoyer le serveur  </Button>
                    </div>
               </div>
            </div>
        </>)
    }
    return ( <>
    
        <br />
        <br />
        <div className='container'>
            
            <br />
            <div className='row'>
                    <div className='col-8'>
                        <StockCard />
                        <ClearDirectoryCard /> 
                    </div>
                    <div className='col-4 align-self-center d-none d-md-block'>
                            <img src='https://cdn.abyedh.com/images/system/server_back_up.png' width='80%' />
                    </div>
                    {/* <div className='col-6'><CommandeCard /></div>
                    <div className='col-6'><FacturesCard /></div>
                    <div className='col-6'><ClientCard /></div>
                    <div className='col-6'><CamionStockCard /></div> */}
            </div>
        </div>  
    </> );
}

export default DataBaseBU;