import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';

function FactureCamion() {
    let { fid } = useParams()
    let camData = JSON.parse(localStorage.getItem(`${GConf.SystemTag}_Camion_LocalD`));
    const Cam_ID = camData.Cam_ID;
    let [articleL, setArticleL] = useState([])
    let [factureData, setFactData] = useState([])
    let Offline = JSON.parse(localStorage.getItem(`${GConf.SystemTag}_Camion_Offline`));

    useEffect(() => {
        axios.post(`${GConf.ApiInputLink}/mf/select`, {
            tag: GConf.SystemTag,
            fid: fid,
            camId: Cam_ID
          })
          .then(function (response) {
                setArticleL(JSON.parse(response.data[0].Articles))
                setFactData(response.data[0])
                console.log(response.data)
          }).catch((error) => {
            if(error.request) {
              const FactureTarged = Offline.facture.find((facture) => facture.F_ID == fid);
              if (FactureTarged) {
                setArticleL(JSON.parse(FactureTarged.Articles))
                setFactData(FactureTarged)
              }
            }
          });
    }, [])

    const FactureHeader = () =>{
        return(<>
             <div className='row mb-2 p-1'>
                <div className='col-2 fw-bold'>N</div>
                <div className='col-2 fw-bold'>| Des</div>
                <div className='col-2 fw-bold'>| Qté</div>
                <div className='col-2 fw-bold'>| PU</div>
                <div className='col-2 fw-bold'>| Pt</div>
            </div>
        </>)
    }

    const ArticleListCard = (props) =>{
        return(<>
            <div className='row mb-2'>
                <div className='col-3'>:{props.index + 1  }::</div>
                <div className='col-9'>| {props.data.Name}</div>
                <div className='col-4'>{props.data.Qte} </div>
                <div className='col-4'> *  {props.data.Prix} </div>
                <div className='col-4'> =  {props.data.PU}</div>
            </div>
            ...............................................................................................
        </>)
    }


    return ( <>
           <div className="container mb-4">
                <h2 className='text-center'>Facture Client</h2> 
                <div className='row'>
                    <div className='col-12'>
                        <div className='text-danger'><b>STE ANASLOUMA DISTRUBUTION</b></div>
                        <div className='text-secondary'><b>VILLE: </b> SIDI BOUROUIS</div>
                        <div className='text-secondary'><b>MATRICULE F : </b> 1670146/D</div>
                        <div className='text-secondary'><b>TEL : </b> 97913068</div>
                        <div className='text-secondary'><b>FAX : </b> 78898081</div>
                        ############################################
                    </div>
                    <div className='col-12'>
                        <div className='text-secondary'><b>CODE FACTURE : </b> {fid}</div>
                        <div className='text-secondary'><b>Jour : </b> {new Date(factureData.Cre_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>
                        <div className='text-secondary'><b>CLIENT: </b> {factureData.C_Name}</div>
                        <div className='text-secondary'><b>M.F : </b> {factureData.Code_Fiscale}</div>
                    </div>
                </div>
                <br />
                <br />
                <FactureHeader />
                _____________________________________________________________
                <br />
                {articleL.map( (artData,index) =>  <ArticleListCard key={index} data={artData} index={index} /> )}    
            </div>
            <br />
            <br />
            <br />
            ############################################
            <div>Totale H.T: 0.000</div>
            <div>TVA: 0.000 %</div>
            <div>Timbre: 0.000</div>
            <div><b>Net A Payee TTC: {factureData.Tota}</b></div>
            ############################################
           
    </> );
}

export default FactureCamion;