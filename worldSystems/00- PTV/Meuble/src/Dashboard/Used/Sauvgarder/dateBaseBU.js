import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Checkbox } from 'semantic-ui-react';
import GConf from '../../../AssetsM/generalConf';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

function DataBaseBU() {

    /* ############################### UseEffect ################################*/
    const { t, i18n } = useTranslation();
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
        axios.post(`${GConf.SharedApi}/tools/export/calcsize`, {
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
        axios.post(`${GConf.SharedApi}/tools/export/done`, {
            PID: GConf.PID,
            fileName: `${GConf.systemTag}_${GConf.PID}`,
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
        axios.post(`${GConf.SharedApi}/tools/export/clear`, {
            tag: GConf.systemTag,
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
               <h5>{t('communUsed.savgarderPage.selectItemsCard.title')} </h5> 
               {
                GConf.Sauvgarder.map((data,index) => <Checkbox key={index} className='mb-2' label={t(`communUsed.savgarderPage.selectItemsCard.itemsList.${data.id}`)}  defaultChecked  onChange={(event, data) =>  UpdateTableStet(data.table,data.checked)}/>)
               }
               
               <div className='text-end'>
                    <Button className='bg-info rounded-pill' onClick={() => ExportFlies( `${GConf.SystemTag}_article`,'Stock') }> <span className='bi bi-folder-symlink-fill'></span> {t('communUsed.savgarderPage.selectItemsCard.exportBtn')} </Button>
                    
                    <a href={`${GConf.SharedApi}/tools/export/download/${stockLink}` } style={{pointerEvents: stockLinkBtn ? 'none' :  ''}} target='c_blank'>
                        <Button className='bg-warning rounded-pill' disabled={stockLinkBtn}> <span className='bi bi-printer-fill'></span>  {t('communUsed.savgarderPage.selectItemsCard.saveCopy')} </Button>
                    </a> 
               </div>
            </div>
        </>)
    }
    const ClearDirectoryCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4 border-div'>
               <h5>{t('communUsed.savgarderPage.netoyerCard.title')} </h5>  
               <div className='row'>
                    <div className='col-8 align-self-center'>
                    {t('communUsed.savgarderPage.netoyerCard.notoyerText')} {fileSize / 1000000} MB
                    </div>
                    <div className='col-4 text-end align-self-center'>
                        <Button className='bg-danger text-white' onClick={() => ClearDirectory() }> {t('communUsed.savgarderPage.netoyerCard.netoyerBtn')}   </Button>
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
            </div>
        </div>  
    </> );
}

export default DataBaseBU;