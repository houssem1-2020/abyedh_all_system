import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../../../../AssetsM/generalConf';
import { ToWords } from 'to-words';

function RapportTmps() {
      
  /*#########################[Const]##################################*/
    const {RPID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])
    const [client, setClient] = useState('Passager')
    const [loading , setLoading] = useState(false)
    const [stockState , setStockState] = useState(false)
    const [toUpdatedList, setTUpList] = useState([])
     
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/rapport/info`, {
            PID : GConf.PID,
            RPID: RPID
          })
          .then(function (response) {
                setFactData(response.data)
                setLoading(true) 
          }).catch((error) => {
            if(error.request) {
              setFactData([])
            }
          });
    }, [])


 

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
                <h2 className='text-center'>RAPPORT  </h2> 
                <div className='row'>
                    <div className='col-6'>
                        <div className='text-secondary'><b>RAPPORT ID : </b> {RPID}</div>
                        <div className='text-secondary'><b>TITRE : </b> {factureData.RA_Titre}</div>
                        <div className='text-secondary'><b>SUJET: {factureData.RA_Sujet} </b> 
                    </div>
                    </div>
                    <div className='col-6'>
                        <div className='text-danger'><b>DATE : </b> {new Date(factureData.RA_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </div>
                        <div className='text-secondary'><b>GENRE: </b> {factureData.RA_Genre} </div>
 
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
                <div dangerouslySetInnerHTML={{ __html: factureData.RA_Content }}></div>
                <br />
           <br />
            
           </div>
    </> );
}

export default RapportTmps;