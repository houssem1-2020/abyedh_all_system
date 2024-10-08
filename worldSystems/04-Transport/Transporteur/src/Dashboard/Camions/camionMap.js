 import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { Select } from 'semantic-ui-react';
 
import { toast } from 'react-toastify';

 function CamionMap() {

    /* ############################### Const ################################*/
    const [centerPosition, setCenterPosition] = useState([36.17720,9.12337])
    const [clientsPositions, setClientsPositions] = useState([])
    //const [clientMap] = useGetClientMap() 

    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );

     /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion`,{
            PID : GConf.PID,
        })
        .then(function (response) {
            setClientsPositions(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger la map </div></>, GConf.TostInternetGonf)   
            }
          });
    }, [])

    /* ############################### Function ################################*/
    const GetSelectedClients = (value)=>{
        axios.post(`${GConf.ApiLink}/client/position`,{
            gouv : value
        })
        .then(function (response) {
            setClientsPositions(response.data)
            console.log(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger les position client  </div></>, GConf.TostInternetGonf)   
            }
          });
    }

    return ( <>
    <BreadCrumb links={GConf.BreadCrumb.menuAddPlat} />
    <br />
    <div className='row'>
        <div className='col-12 col-lg-10'>
            <MapContainer center={centerPosition} zoom={8} scrollWheelZoom={false} className="map-height-lg border-div" >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* {clientsPositions.map( (cord) => <Marker key={cord.PK} position={[cord.Lat, cord.Lng]}> <Popup>{cord.Name}</Popup></Marker> )} */}
            </MapContainer>
        </div>
        <div className='col-12 col-lg-2'>
                <h5 className='mb-1'>Selectionez Une Region:</h5>
                {/* <Select placeholder='Choisir Une Region' options={clientMap}  className='w-100 shadow-sm rounded mb-3' onChange={(e, data) => GetSelectedClients(data.value)} />   */}
        </div>
    </div>
    <br />
    </> );
 }
 
 export default CamionMap;