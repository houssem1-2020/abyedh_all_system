import React, { useEffect, useState } from 'react';
import InputLinks from '../Assets/linksData'
import BackCard from '../Assets/backCard'
import { Fade } from 'react-reveal';
import { Button,  Divider,  Dropdown, Icon, Input, Label, Loader, Form, Select, Tab, TextArea } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import GConf from '../../../AssetsM/generalConf';
import axios from 'axios';
import FrameForPrint from '../../../Dashboard/Assets/frameForPrint';
import usePrintFunction from '../../../Dashboard/Assets/Hooks/printFunction';
import RoutingMachine from "../../../AssetsM/RoutingMachine";
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';

const HoraireCard = ({alwaysState, setAlwaysState, timming, setPauseDay , SetTimmingData, saveBtnState}) =>{
    const DayHoraire = (props) =>{
        return(<>
                <div className='row mb-4' >
                    <div  className='col-6  align-self-center mb-2 text-center'>
                        <b>{props.data.day}</b>
                    </div>
                    <div  className='col-6  align-self-center mb-2 text-center'>
                        <div className="form-check form-switch ms-5">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setPauseDay(props.data.day,props.data.dayOff)}   />
                        </div>
                    </div>
                    <div  className='col-12 col-lg-5'>
                        <div className='row'>
                            <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.matin.start} onChange={(e) => SetTimmingData(props.data.day,'matin','start',e.target.value)} /></div>
                            <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.matin.end} onChange={(e) => SetTimmingData(props.data.day,'matin','end',e.target.value)}/></div>
                        </div>
                    </div>
                    <div  className='col-12 col-lg-5'>
                        <div className='row'>
                            <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.soir.start} onChange={(e) => SetTimmingData(props.data.day,'soir','start',e.target.value)}/></div>
                            <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.soir.end} onChange={(e) => SetTimmingData(props.data.day,'soir','end',e.target.value)} /></div>
                        </div>
                    </div>
                    <div  className='col-12 col-lg-1 align-self-center d-none'>
                        <div className="form-check form-switch">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setPauseDay(props.data.day,props.data.dayOff)}   />
                        </div>
                    </div>
                </div>
        </>)
    }

    return(<>
        <div className='card card-body shadow-sm  border-div'>
            <div className=''>
                <div className='row'>
                    <div className='col-8 col-lg-11 align-self-center'> 
                        <h5 className='mb-0'> Toujour Ouvert </h5>  
                    </div>
                    <div className='col-4 col-lg-1 align-self-center'> 
                        <div className="form-check form-switch">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!alwaysState)}  checked={alwaysState} />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='row text-danger mb-2'>
                    <div  className='col-6'> <b>De</b> </div>
                    <div  className='col-6'> <b>Jusqu'a</b> </div>
                </div>
                {
                    timming.map( (data,index) => <DayHoraire key={index} data={data} />)
                }
            </div>
        </div>
    </>)
}

const GeneralData = ({entreData, setEntreData, Offline, SaveEntree, loaderState, setSetectedTag, options, gettedPID, saveBtnState}) =>{
    return(<>
        <div className='card card-body border-div shadow-sm mb-3'>
            <h3> PID: {gettedPID ? gettedPID : 0}</h3>
            <h5 className='mb-0'>Selectionez TAG </h5> 
            <Dropdown
                search
                fluid
                selection
                wrapSelection={false}
                options={options}
                placeholder='Selectionez UN Tableaux'
                onChange={(e, { value }) => setSetectedTag(value)}
            />
            <br />
            <div className='mb-4'>
                <h5 className='mb-0'> Nom  </h5>
                <Input fluid icon='users' iconPosition='left'  placeholder='Nom' value={entreData.Name} onChange={(e) => setEntreData({...entreData, Name: e.target.value })}   />
            </div>
            <div className='mb-4'>
                <h5 className='mb-0'> Telephone  </h5>
                <Input fluid icon='phone' iconPosition='left'   placeholder='Tel' value={entreData.Phone} onChange={(e) => setEntreData({...entreData, Phone: e.target.value })}  />
            </div>
            <div className='mb-4'>
                <div className='mb-2 text-secondary'>Gouv :  {Offline.localData[0] ? Offline.localData[0].gouv : ''}</div>
                <div className='mb-2 text-secondary'>Deleg :  {Offline.localData[0] ? Offline.localData[0].deleg : ''}</div>
            </div>
            <div className='mb-4'>
                <h5 className='mb-0'> Adressse</h5>
                <Form>
                    <TextArea placeholder='Adresse'  value={entreData.Adress} onChange={(e) => setEntreData({...entreData, Adress: e.target.value })} />
                </Form>

                <div className='card-body'>
                    <Button disabled={saveBtnState} onClick={() => SaveEntree()} fluid className='rounded-pill bg-system-btn ' positive>  <Icon name='map pin' /> Enregistreé  <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
                </div>
            </div>        
        </div>
    </>)
}

function NouveauxInput() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    let Offline = JSON.parse(localStorage.getItem(`Admin_Dir_Offline`));
    const [selectedTag, setSetectedTag] = useState();  
    const [entreData, setEntreData] = useState({Name :'', Phone:'', Adress :'' , Gouv: Offline.localData[0] ? Offline.localData[0].gouv : '' , Deleg: Offline.localData[0] ? Offline.localData[0].deleg : ''})
    const [gettedPID, setPID] = useState()
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)

    const [position, setPosition] = useState([36.17720,9.12337])
    const [myPosition, setMyPosition] = useState([36.17720,9.12337]) 
    
    const [uploadImage, setUploadImages] = useState()
    const [displayedImage, setDisplayedImage] = useState()
    
    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}}])
    
    const options = [
        { key: 1, text: 'docteur', value: 'docteur'},
        { key: 2, text: 'pharma', value: 'pharmacie'},
        { key: 3, text: 'clinique', value: 'clinique'},
        { key: 4, text: 'labo', value: 'labo'},
        { key: 5, text: 'centremedi', value: 'centreMD'},
        { key: 6, text: 'admin_s_hospital', value: 'admin_s_hospital'},
        { key: 7, text: 'admin_s_csb', value: 'admin_s_csb'},
        { key: 8, text: 'nurs', value: 'garderie' },
        { key: 9, text: 'ecole', value: 'ecole' },
        { key: 10, text: 'lycee', value: 'lycee' },
        { key: 11, text: 'universite', value: 'universite' },
        { key: 12, text: 'eduser', value : 'impremerie' },
        { key: 13, text: 'librairie',value : 'librairie' },
        { key: 14, text: 'admin_e_centre', value: 'admin_e_centre' },
        { key: 15, text: 'admin_e_biblio', value: 'admin_e_biblio' },
        { key: 16, text: 'transp',  value: 'transporteur' },
        { key: 17, text: 'autoecole', value: 'autoecole' },
        { key: 18, text: 'cafe', value: 'cafe' },
        { key: 19, text: 'restaurant', value: 'restaurant' },
        { key: 20, text: 'shop', value: 'ptvente_shop' },
        { key: 21, text: 'ptvente_bread', value: 'ptvente_boulengerie' },
        { key: 22, text: 'ptvente_viande', value: 'ptvente_viande' },
        { key: 23, text: 'ptvente_fruit', value: 'ptvente_fruit' },
        { key: 24, text: 'ptvente_patesserie', value: 'ptvente_patesserie' },
        { key: 25, text: 'ptvente_small_shop', value: 'ptvente_small_shop' },
        { key: 26, text: 'house_electro', value: 'house_electro' },
        { key: 27, text: 'home', value: 'house_meuble' },
        { key: 28, text: 'car', value: 'car_location' },
        { key: 29, text: 'car_parking', value: 'car_parking' },
        { key: 30, text: 'samsar', value: 'samsar' },
        { key: 31, text: 'chantier_contracteur', value: 'chantier_contrateur' },
        { key: 32, text: 'chantier_architecture', value: 'chantier_architecture' },
        { key: 33, text: 'handmade', value: 'chantier_quincaillerie' },
        { key: 34, text: 'handmade_forgeron', value: 'handmade_forgeron' },
        { key: 35, text: 'handmade_menuisier', value: 'handmade_menuisier' },
        { key: 36, text: 'handmade_peinture', value: 'handmade_peinture' },
        { key: 37, text: 'handmade_electricien', value: 'handmade_electricien' },
        { key: 38, text: 'coiffure', value: 'coiffure' },
        { key: 39, text: 'boutique', value: 'boutique' },
        { key: 40, text: 'wedding_salon_marriage', value: 'wedding_salon_marriage' },
        { key: 41, text: 'wedding_orchestre', value: 'wedding_orchestre' },
        { key: 42, text: 'wedding_chef', value: 'wedding_chef' },
        { key: 43, text: 'wedding_photographe', value: 'wedding_photographe' },
        { key: 44, text: 'wedding_fourniture_marriage', value: 'wedding_fourniture_marriage' },
        { key: 45, text: 'wedding', value: 'wedding_bijoux' },
        { key: 46, text: 'gym',  value: 'gym' },
        { key: 47, text: 'piscine',  value: 'pyscine' },
        { key: 48, text: 'stade',  value: 'stade' },
        { key: 49, text: 'art_cinema',  value: 'art_cinema' },
        { key: 50, text: 'art_theatre', value: 'art_theatre' },
        { key: 51, text: 'art_musee',  value: 'art_musee' },
        { key: 52, text: 'admin_c_mj',  value: 'admin_c_mj' },
        { key: 53, text: 'admin_c_mc', value: 'admin_c_mc' },
        { key: 54, text: 'avocat',  value: 'avocat' },
        { key: 55, text: 'storage', value: 'storage' },
        { key: 56, text: 'comptable',  value: 'comptable' },
        { key: 57, text: 'socite', value: 'socite' },
        { key: 58, text: 'admin_f_poste', value: 'admin_f_poste' },
        { key: 59, text: 'Hotels',  value: 'hotels' },
        { key: 60, text: 'travel', value: 'vg_agence' },
        { key: 61, text: 'admin_a_mu',  value: 'admin_a_mu' },
        { key: 62, text: 'admin_a_police', value: 'admin_a_police' },
        { key: 63, text: 'admin_a_ar',  value: 'admin_a_ar' },
        { key: 64, text: 'admin_a_court',  value: 'admin_a_court' },


    ]

    const panes = [
        {
            menuItem: { key: 'start', icon: 'add circle', content: 'Info ' }, 
            render: () => <GeneralData entreData={entreData} setEntreData={setEntreData} Offline={Offline} SaveEntree={SaveEntree} loaderState={loaderState} setSetectedTag={setSetectedTag} options={options} gettedPID={gettedPID} saveBtnState={saveBtnState} />,
        },
        {
            menuItem: { key: 'stfffart', icon: 'map marker alternate', content: 'Position ' },
            render: () =>  <PositionCard />,
        },
        {
            menuItem: { key: 'client', icon: 'image', content: 'Images' }, 
            render: () => <ImageCard />,
        }, 
        {
            menuItem: { key: 'fdff', icon: 'time', content: 'Horaire' }, 
            render: () =><HoraireCard  alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} saveBtnState={saveBtnState} />,
        },        
    ]
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    const icon = L.icon(GConf.LeafleftIconP);

    /*#########################[Use Effect]##################################*/
    useEffect(() => {
        //get position 
        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
                else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
                else{
                    setMyPosition([position.coords.latitude, position.coords.longitude])
                    console.log({lat:position.coords.latitude, lng:position.coords.longitude})
                }
            },
            function(error) {
                toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
            }
        );
    }, [])

    /*#########################[Functions]##################################*/
 
    const SaveEntree = () =>{
            if (!entreData.Name) {toast.error("Nom est Invalide !", GConf.TostErrorGonf)}
            else if (!entreData.Gouv ) {toast.error("Gouv est Invalide !", GConf.TostErrorGonf)}
            else if (!entreData.Deleg) {toast.error("Deleg est Invalide !", GConf.TostErrorGonf)}
            else if (!entreData.Adress ) {toast.error("Adresse list est Invalide !", GConf.TostErrorGonf)}
            else {
                setLS(true)
                axios.post(`${GConf.ApiInputLink}/nouveaux/ajouter`, {
                    tag: selectedTag,
                    entreData: entreData,
                })
                .then(function (response) {
                    if(response.status = 200) {
                        setSaveBtnState(true)
                        setPID(response.data.PID)
                        toast.success("Facture Enregistreé !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else{
                        toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> La facture sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)   
                      Offline.ajoutee.push(entreData)
                      localStorage.setItem(`Admin_Dir_Offline`,  JSON.stringify(Offline));
                      setLS(false)
                    }
                });

            }       
    }
    const EditPosition = () =>{
        if (!gettedPID) {toast.error("PID est Invalide !", GConf.TostErrorGonf)}
        else if (!myPosition[0]) {toast.error("Lng est Invalide !", GConf.TostErrorGonf)}
        else if (!myPosition[1] ) {toast.error("Lat est Invalide !", GConf.TostErrorGonf)}
        else {
            setLS(true)
            axios.post(`${GConf.ApiInputLink}/nouveaux/position`, {
                PID: gettedPID,
                position: {Lat :myPosition[0], Lng: myPosition[1]} ,
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Position Enregistrer !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La commande sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)   
                }
            });

        }       
    }
    const UploadImageFunc = (e) => {
        setDisplayedImage(URL.createObjectURL(e.target.files[0]))
        setUploadImages(e.target.files[0])
    }
    const UpdateImageFunc = (genre) =>{
        if (!uploadImage) {toast.error("Image est Invalide !", GConf.TostErrorGonf) } 
        else {
            const formData = new FormData();
            formData.append("Images", uploadImage);
            formData.append("PID", gettedPID);
            formData.append("Genre", genre);
            setLS(true)
            axios({
                method: 'post',
                url: `${GConf.ApiInputLink}/nouveaux/image`,
                data: formData ,
            }).then(function (response) {
                toast.success("Image Enregistreé !", GConf.TostSuucessGonf)
                setLS(false)
            }).catch((error) => {
                toast.error(<><div><h5>Probleme de Connextion</h5> La commande sera enregisstrer sur votre appareil  </div></>, GConf.TostInternetGonf)
            });  
        } 
    } 
    const setPauseDay = (day,state) =>{
        const targetIndex = timming.findIndex(element => element.day === day)
        let copyOfHoraire = timming
        copyOfHoraire[targetIndex].dayOff = !state
        setTimming(copyOfHoraire)
    }
    const SetTimmingData = (day,time,genre,value) => {
        const targetIndex = timming.findIndex(element => element.day === day)
        let copyOfHoraire = timming

        if (time == 'matin') {
            if (genre == 'start') {
                copyOfHoraire[targetIndex].matin.start = value
                setTimming(copyOfHoraire)
            } else {
                copyOfHoraire[targetIndex].matin.end = value
                setTimming(copyOfHoraire)
            }
        } else {
            if (genre == 'start') {
                copyOfHoraire[targetIndex].soir.start = value
                setTimming(copyOfHoraire)
            } else {
                copyOfHoraire[targetIndex].soir.end = value
                setTimming(copyOfHoraire)
            }
        }

    }

    /*#########################[Component]##################################*/ 
    const PositionCard = () =>{
        return(<>
           <div className='card card-body shadow-sm mb-2 border-div'>
                <div className='card-body'>
                    <Button disabled={!saveBtnState} onClick={() => EditPosition()} fluid className='rounded-pill bg-system-btn ' positive>  <Icon name='map pin' /> Modifier Position <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/> </Button>
                </div>
                <MapContainer center={myPosition} zoom={9} scrollWheelZoom={false} className="map-height">
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <RoutingMachine mypos={myPosition} clientpos={position} /> 
                </MapContainer>
           </div> 
        </>)
    }

    const ImageCard = () =>{
        const UploadImageCard = () =>{
            return(<>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-2 align-self-center text-center'>
                                <label onChange={UploadImageFunc} htmlFor="formId" className='text-info' role="button">
                                    <Input type='file' hidden name="imagez" id="formId"  />
                                    <span className='bi bi-cloud-upload-fill bi-md'> </span> 
                                </label>
                                
                        </div>
                        <div className='col-10'>
                            <div className=' text-center p-4  '>
                                {displayedImage ? <img src={displayedImage} width='110px' height='110px'  /> : 'PaS d\'image'}
                            </div>
                        </div>
                        
                    </div>
                </div>
            </>)
        }
        return(<>
                <UploadImageCard title='Image de Profile' tag='profile' /> 
                <br />
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <h6>En tant que Image de profile</h6>
                    <Button disabled={!saveBtnState} className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFunc('Profile')} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <h6>En tant que Image 1</h6>
                    <Button disabled={!saveBtnState} className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFunc('Image1')} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <h6>En tant que Image 2</h6>
                    <Button disabled={!saveBtnState} className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFunc('Image2')} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <h6>En tant que Image 3</h6>
                    <Button disabled={!saveBtnState} className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFunc('Image3')} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <h6>En tant que Image 4</h6>
                    <Button disabled={!saveBtnState} className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFunc('Image4')} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <h6>En tant que Image 4</h6>
                    <Button disabled={!saveBtnState} className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFunc('Image5')} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>  
        </>)
    }

    return (  <>
        <BackCard data={InputLinks.backCard.nv}/>
        <br />
        <div className='container-fluid'>
            <Tab menu={{  secondary: true, style: {overflowX : 'auto', overflowY : 'hidden', paddingBottom:'5px' }  }} panes={panes} />
            <br />
        </div>

    </>);
}


export default NouveauxInput;