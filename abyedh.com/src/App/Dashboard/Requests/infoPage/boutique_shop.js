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
                                    <td className='text-secondary'><span className='bi bi-calendar me-2'></span> Jour Voulu </td>
                                    <td>{loading ? <>{new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} | {requestData.Wanted_Time}</> : ''}</td>
                                </tr>
                                <tr >
                                    <td className='text-secondary'><span className='bi bi-person me-2'></span> Livré Par </td>
                                    <td>{loading ? requestData.Livraison_Par : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-star me-2'></span> Articles</td>
                                    <td>
                                        <ul>
                                            {loading ? 
                                            <>
                                            {JSON.parse(requestData.Articles).map((data,index) => <li key={index}>{data.Name} : <br /> {data.Qte} piéces , Taille : {data.Taille} , coleur : <span style={{color: data.Couleur}} className='bi bi-circle-fill' width='7px' heigth='7px'> </span></li>)}
                                            </> 
                                            : ''}
                                        </ul>
                                        
                                    </td>
                                </tr>
                                {/* <tr>
                                    <td className='col-5 text-secondary'><span className='bi bi-chat-dots-fill me-2'></span> Commentaire</td>
                                    <td>{loading ? requestData.Comment : ''}</td>
                                </tr> */}
                            </tbody>

                </table>
            </div>
    </> );
}

export default DocteurSpecific;