import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import GConf from '../../../AssetsM/APPConf';
import { toast } from 'react-toastify';
import { Button, Dropdown, Form, Icon, Input, List, Menu, Modal, Select, Tab, TextArea } from 'semantic-ui-react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { Map } from 'leaflet';


function DocteurSpecific() {
    /*#########################[Const]##################################*/
    const {TAG,CID} = useParams()
    const [loading , setLoading] = useState(false)
    const [requestData, setRequestData] = useState([])
    const [modalOpen , setModalOpen] = useState(false)
    const [positionsMap, setPositionsMap] = useState([])
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon);
    
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

    const OpenModal = (lat,lng) =>{
        setPositionsMap([lat,lng])
        setModalOpen(true)
    }

    return ( <> 

            <div className="table-responsive">
                <table className="table table-striped">
                <tbody>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-person me-2'></span> Nom  </td>
                                    <td>{loading ? requestData.Name : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-calendar me-2'></span> Jour Voulu </td>
                                    <td>{loading ? <>{new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} | {requestData.Wanted_Time}</> : ''}</td>
                                </tr>
                                <tr >
                                    <td className='text-secondary'><span className='bi bi-person me-2'></span> Genre </td>
                                    <td>{loading ? requestData.Genre : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-map me-2'></span> De </td>
                                    <td>{loading ? <>{JSON.parse(requestData.De).Gouv} , {JSON.parse(requestData.De).Deleg}  <Button size='mini' icon onClick={() => OpenModal(JSON.parse(requestData.De).Lat, JSON.parse(requestData.De).Lng)} className='rounded-circle border bg-white ms-2 text-danger' > <Icon name='map marker alternate' /> </Button></> : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-map me-2'></span> Vers </td>
                                    <td>{loading ? <>{JSON.parse(requestData.Vers).Gouv} , {JSON.parse(requestData.Vers).Deleg}  <Button size='mini' icon onClick={() => OpenModal(JSON.parse(requestData.Vers).Lat, JSON.parse(requestData.Vers).Lng)} className='rounded-circle border bg-white ms-2 text-danger' > <Icon name='map marker alternate' /> </Button></> : ''}</td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-star me-2'></span> Articles</td>
                                    <td>
                                        <ul>
                                            {loading ? 
                                            <>
                                            {JSON.parse(requestData.Articles).map((data,index) => <li key={index}>{data.Name}</li>)}
                                            </> 
                                            : ''}
                                        </ul>
                                        
                                    </td>
                                </tr>
                                <tr>
                                    <td className='text-secondary'><span className='bi bi-chat-dots-fill me-2'></span> Commentaire</td>
                                    <td>{loading ? requestData.Comment : ''}</td>
                                </tr>
                            </tbody>

                </table>
            </div>
            <Modal
            onClose={() => setModalOpen(false)}
            onOpen={() => setModalOpen(true)}
            open={modalOpen}
                
        >
        <Modal.Content >
                <MapContainer  center={positionsMap} zoom={15} scrollWheelZoom={false} className="map-height cursor-map-crosshair border-div"  >
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={positionsMap}>
                        <Popup>
                            
                        </Popup>
                    </Marker>
                </MapContainer>
 
        </Modal.Content>
        </Modal>

    </> );
}

export default DocteurSpecific;