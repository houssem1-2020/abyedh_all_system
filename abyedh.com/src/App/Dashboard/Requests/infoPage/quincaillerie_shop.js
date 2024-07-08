import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import GConf from '../../../AssetsM/APPConf';
import { toast } from 'react-toastify';
 

function DocteurSpecific() {
    /*#########################[Const]##################################*/
    const {TAG,CID} = useParams()
    const [loading , setLoading] = useState(false)
    const [requestData, setRequestData] = useState([])
 
    /*#########################[useEffect]##################################*/ 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/request/info`, {
            PID : GConf.PID,
            CID: CID,
            SystemTag : TAG
          })
          .then(function (response) {
                 console.log(response.data)
                if (!response.data.PID) {
                    toast.error('Demmande Introuvable !', GConf.TostSuucessGonf)
                    setTimeout(() => {  window.location.href = "/App/S"; }, 2000)
                } else {
                    setRequestData(response.data)
                    setLoading(true)
                    
                }  
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la commande   </div></>, GConf.TostInternetGonf)   
              setRequestData([])
              setLoading(true)
            }
          });
    }, [])

    return ( <> 

            <div className="table-responsive">
                <table className="table table-striped">
                <tbody>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-person me-2'></span> Nom  </td>
                                    <td>{loading ? requestData.Name : ''}</td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-calendar me-2'></span> Date </td>
                                    <td>{loading ? new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) + ' | ' + requestData.R_Time : ''}</td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-clock me-2'></span> Livreé Par </td>
                                    <td>{loading ? requestData.Livraison_Par : ''}</td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-calendar-check me-2'></span> Livre Le</td>
                                    <td>{loading ? new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) + ' | ' +  requestData.Wanted_Time : ''}</td>
                                </tr>
                                <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-star me-2'></span> Articles</td>
                                    <td>{loading ? 
                                        <ul>
                                            {JSON.parse(requestData.Articles).map((data,index) => <li key={index}> {data.Qte} * {data.Name} </li> )}
                                        </ul> : ''}
                                    </td>
                                </tr>
                            </tbody>

                </table>
            </div>
    </> );
}

export default DocteurSpecific;