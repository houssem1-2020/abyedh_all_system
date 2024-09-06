import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../../../../AssetsM/generalConf';
import { ToWords } from 'to-words';

function OrdonanceTmps() {
    let {ORID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])
    const [client, setClient] = useState('Passager')
    const [loading , setLoading] = useState(false)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])

      useEffect(() => {
        axios.post(`${GConf.ApiLink}/ordonance/info`, {
            PID : GConf.PID,
            OR_ID: ORID
          })
          .then(function (response) {
               setArticleL(JSON.parse(response.data[0].OR_Articles))
               setFactData(response.data[0])
               setLoading(true) 
          }).catch((error) => {
            if(error.request) {
               
            }
          });
    }, [])


    //function
    const CalculateTVA =  (value) =>{
        const facteur_p = (100 / (GConf.DefaultTva + 100));
        return (parseFloat(value) * facteur_p).toFixed(3) 
    }


    //card
    const StateSellCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'Valide': return <StateCard color='success' text='Terminer' />;  
            case 'Annulee': return <StateCard color='danger' text='Annuleé' /> ;
            case 'Waitting': return <StateCard color='warning' text='En Attent' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const FactureHeader = () =>{
        return(<>
                <h2 className='text-center'>ORDONANCE </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>ORDONANCE ID : </b> {factureData.OR_ID}</div>
                        <div className='text-secondary'><b>CODE ORDONANCE : </b> {ORID}</div>
                        <div className='text-secondary'><b>PATIENT: {factureData.PA_Name} </b> 
                    </div>
                    </div>
                    <div className='col-6'>
                        <div className='text-danger'><b>Date : </b> {new Date(factureData.OR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </div>
                        <div className='text-secondary'><b>Temps: </b> {factureData.OR_Time} </div>
 
                    </div>
                </div>
        </>)
    }
 
 

    return ( <>
           <div className="container mb-4">
                <h2 className='text-end'><StateSellCard status={factureData.OR_State} /></h2>
                <FactureHeader />
                <br />
                <br />
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Designiation</th>
                        <th scope="col">Dosage</th>
                        <th scope="col">Forme</th>
                        <th scope="col">Presentation</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {loading ?  
                        <>
                        {articleL.map( (artData, index) => 
                            <tr key={index +1 }>
                                <th scope="row">{index +1 }</th>
                                <td>{artData.Nom}</td>
                                <td>{artData.Dosage}</td>
                                <td>{artData.Forme }</td>
                                <td>{artData.Presentation}</td>
                            </tr>
                        )}
                        
                        </>
                        : <>...</> }                        
                        
                    </tbody>
                </table>
                <br />
           <br />
            
           </div>
    </> );
}

export default OrdonanceTmps;