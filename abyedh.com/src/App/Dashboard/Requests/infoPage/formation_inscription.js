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
                                    <td className='text-secondary'><span className='bi bi-person me-2'></span> Nom & Prenon </td>
                                    <td>{loading ? requestData.EL_Name : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-calendar me-2'></span>  Naissance </td>
                                    <td>{loading ? new Date(requestData.EL_Naissance).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-person me-2'></span> Genre </td>
                                    <td>{loading ? requestData.EL_Genre : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-map me-2'></span> Adresse </td>
                                    <td>{loading ? requestData.EL_Adress : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-people me-2'></span> Pére  </td>
                                    <td>{loading ? requestData.EL_Pere_Nom : ''} </td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-phone me-2'></span> Telephone  </td>
                                    <td>{loading ? requestData.EL_Pere_Phone : ''} </td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-people me-2'></span> Mére  </td>
                                    <td> {loading ? requestData.EL_Mere_Nom : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-phone me-2'></span> Telephone  </td>
                                    <td> {loading ? requestData.EL_Mere_Phone : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-chat-dots-fill me-2'></span> Commentaire</td>
                                    <td>{loading ? requestData.Comment : ''}</td>
                                </tr>
                            </tbody>

                </table>
            </div>
    </> );
}

export default DocteurSpecific;