import React, { useEffect, useState } from 'react';
import BackCard from '../Assets/Cards/backCard';
import OneGConf from '../Assets/OneGConf';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button , Icon} from 'semantic-ui-react';
import GConf from '../../../AssetsM/generalConf';

function TrajetPage() {
    /* ##########################[CONST]######################## */
    const [trajectsListe, setTrajectsLit] = useState([])
     
    const [recording, setRecording] = useState(false);
    const [positions, setPositions] = useState([]);
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );

    /* ##########################[UseEffect]#################### */
    useEffect(() => {
        let savedTrajectFromLS = JSON.parse(localStorage.getItem('autoecole_saved_trajects'))
        if (savedTrajectFromLS) {
            setTrajectsLit(savedTrajectFromLS)
        }
         
    }, [])
    /* ##########################[Functions]##################### */
    const SaveTrajectToLocalStorage = () => {
        
        trajectsListe.push({TrDate:new Date().toISOString().split('T')[0] , TrTime: new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) , Trpositions: positions})
        
        if (positions.length != 0) {
            localStorage.setItem('autoecole_saved_trajects', JSON.stringify(trajectsListe))
        } else {
            alert('Pas de Positions ')
        }
        
    }
    const RemoveSavedTraject = (traject) => {
        let newTrajectsList = trajectsListe.filter(item => 
            item.TrDate !== traject.TrDate || 
            item.TrTime !== traject.TrTime
        );

        setTrajectsLit(newTrajectsList)
        // and now save it to localstorage 

    }

    useEffect(() => {
        let intervalId;

        const fetchPosition = () => {
            navigator.geolocation.getCurrentPosition(
            (pos) => {
                setPositions(prevPositions => [
                ...prevPositions,
                {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude,
                    targetTime: new Date().toISOString() // Save timestamp
                }
                ]);
                
            },
            (err) => console.error(err)
            );
            
        };

        if (recording) {
            intervalId = setInterval(fetchPosition, 2000);
             
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [recording]);

    /* ##########################[Card]########################## */
    const SavedTrajectCard = (props) => {
        return(<>
            <div className='card p-2 mb-2 shadow-sm border-div'>
                <div className='row'>
                    <div className='col  align-self-center'>{props.data.TrDate} <br />  {props.data.TrTime} </div>
                    <div className='col-2 align-self-center'> <b>{props.data.Trpositions.length} </b></div>
                    <div className='col-2 align-self-center'> <Button className='rounded-circle' onClick={() => setPositions(props.data.Trpositions)} icon> <Icon name='eye' /></Button></div>
                    <div className='col-2 align-self-center'> <Button className='rounded-circle' onClick={() => localStorage.setItem('recordedPositions', JSON.stringify(props.data.Trpositions))} icon> <Icon name='upload' /></Button></div>
                    <div className='col-2 align-self-center'> <Button className='rounded-circle' onClick={() => {if (window.confirm('Voulez Vous Supprimer ce trajet ?')) { RemoveSavedTraject(props.data)} }} icon> <Icon name='trash' /></Button></div>
                </div>
            </div>
        </>)
    }
    const MapRcordingButtonCard = () =>{
        return (<>
                    <h5> <span className='bi bi-circle-fill text-danger'></span> Enregistrer Positions</h5> 
                    Nombre de record : {positions.length}
                    <div className='row'>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-success text-white mb-2' onClick={() => setRecording(true)}>  <Icon name='play' /> <small> Commencer </small> </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-danger text-white mb-2' onClick={() => setRecording(false)}>  <Icon name='stop' /> <small> Terminer </small> </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-secondary text-white mb-2' onClick={() =>  SaveTrajectToLocalStorage()}>  <Icon name='save' />  <small> Sauvgarder </small> </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-warning text-white mb-2' onClick={() => {setRecording(false) ; setPositions([])}}>  <Icon name='trash' />  <small> Nettoyer </small> </Button></div>
                        {/* <div className='col-12 col-lg'><Button fluid disabled={recording || !localStorage.getItem('recordedPositions')} className='rounded-pill bg-info text-white' onClick={() => setPositions(JSON.parse(localStorage.getItem('recordedPositions')))}>  <Icon name='save' /> <small>Charger </small>  </Button></div> */}
                     </div> 
        </>)
    }

    return ( 
        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.tr}/>
            <br />
            <div className='container '>
                <div className='row'>
                     <div className='col-12 col-lg-8 align-self-center'>
                            <MapRcordingButtonCard  /> 
                            <br />          
                            <MapContainer center={positions.length == 0 ? [36.17720,9.12337] : [positions[0].latitude, positions[0].longitude]} zoom={15} scrollWheelZoom={false} className="map-height-lg" >
                                <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {positions.map( (cord,i) => <Marker key={i} position={[cord.latitude, cord.longitude]}> <Popup>{cord.targetTime}</Popup></Marker> )}
                            </MapContainer>
                            <br /> 
                            <br />
                     </div>
                     <div className='col-12 col-lg-4 '>
                            {
                                trajectsListe.map((data,index) => <SavedTrajectCard key={index} data={data} />)
                            }
                     </div>
                </div>
            </div>
        </div>   
    );

}

export default TrajetPage;