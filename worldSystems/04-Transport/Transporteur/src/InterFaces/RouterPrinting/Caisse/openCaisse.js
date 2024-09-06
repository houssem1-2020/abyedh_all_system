import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import OneGConf from '../../RouterOne/Assets/OneGConf';
import { useState } from 'react';
import GConf from '../../../AssetsM/generalConf';
import { useParams } from 'react-router-dom';

function OpenCaisse() {
    const {OPID} = useParams()
    const [articleL, setArticleL] = useState([])
    const [factureData, setFactData] = useState([])

    useEffect(() => {
      axios.post(`${GConf.ApiLink}/operations/info`, {
          PID : GConf.PID,
          OPID: OPID
        })
        .then(function (response) {
          setArticleL(JSON.parse(response.data[0].OP_Articles))
          setFactData(response.data[0])
           
        }) 
  }, [])

    return ( <> 
           <div className='row p-3'>
                 INFO OPERATIONS 
                 <h5 className='mb-1 mt-1'>Objet & Articles</h5>
                <table className="table">
                    <thead>
                        <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nom</th>
                        <th scope="col">Poid</th>
                        <th scope="col">Quantite</th>
                    
                        </tr>
                    </thead>
                    <tbody>
                        
                      {articleL.map( (artData, index) => 
                            <tr key={index +1 }>
                                <th scope="row">{index +1 }</th>
                                <td>{artData.Name}</td>
                                <td>{artData.Description}</td>
                                <td>{artData.Qte }</td>
                                
                            </tr>
                        )}
                                               
                        
                    </tbody>
                </table>
                <br />

           </div> 
     </> );
}

export default OpenCaisse;