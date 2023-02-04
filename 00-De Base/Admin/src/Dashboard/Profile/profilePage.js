import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Tab, Divider, Icon, Statistic, Comment, Input, Button, Form, TextArea, Select, Loader, Dropdown, Checkbox} from 'semantic-ui-react';
import QRCode from "react-qr-code";
import { Rating } from 'semantic-ui-react'
import GConf from '../../AssetsM/generalConf';
import axios from 'axios';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/usedSlk';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const EditProfile = ({generalData, setGeneralData, EditPawword}) =>{
    const genreOptions = [
        { key: 1 , value: 'Alimentaire', text: 'Alimentaire' },
        { key: 2 , value: 'cosmetique', text: 'cosmetique' },
        { key: 3 , value: 'habillemment', text: 'habillemment' },
        
      ]
    return ( <>
        <h3>Information Génerale</h3> 
        <h5 className='mb-1'>Nom et Prenon</h5>
        <Input icon='user' iconPosition='left' placeholder='Nom' value={generalData.Name} onChange={(e) => setGeneralData({...generalData, Name: e.target.value })} fluid />
        <h5 className='mb-1'>Telephone</h5>
        <Input icon='phone' iconPosition='left' placeholder='telephone' value={generalData.Phone} onChange={(e) => setGeneralData({...generalData, Phone: e.target.value })} fluid />
        <h5 className='mb-1'>Adresse</h5>
        <Form>
             <TextArea  rows="3" placeholder='Adresse' className='w-100'  value={generalData.Adress} onChange={(e) => setGeneralData({...generalData, Adress: e.target.value })} />
        </Form>
        <h5 className='mb-1'>Genre</h5>
        <Dropdown
            search
            selection
            fluid
            wrapSelection={false}
            options={genreOptions}
            placeholder='Selectionnez Client'
            className='mb-1'
            onChange={(e, { value }) => setGeneralData({...generalData, Genre: value })}
            value={generalData.Genre}
        />
        <br />
        <div className='text-end'>
            <Button  className='rounded-pill bg-system-btn'  ><Icon name='save' /> Modifier <Loader inverted  inline size='tiny' className='ms-2'/></Button>
        </div>

    </> );
}
const EditPassword = ({passwordData, setPasswordData, EditPawword}) =>{
    return(<>
        <h3>Modification de la mot de passe</h3>
        <h5 className='mb-1'>Idenbtifiant</h5>
        <Input icon='user' iconPosition='left' placeholder='Nom' value={passwordData.Identification} onChange={(e) => setPasswordData({...passwordData, Identification: e.target.value })}   fluid />
        <h5 className='mb-1'>Mot de passe</h5>
        <Input icon='eye' iconPosition='left' placeholder='telephone' value={passwordData.PasswordSalt} onChange={(e) => setPasswordData({...passwordData, PasswordSalt: e.target.value })}   fluid />
        <br />
        <div className='text-end'>
            <Button  className='rounded-pill bg-system-btn'  ><Icon name='save' /> Modifier <Loader inverted  inline size='tiny' className='ms-2'/></Button>
        </div>
    </>)
}


function ProfilePage() {
    /*###############################[Const]################################# */
    const [profileData, setProfileData] = useState([])
    const [generalData, setGeneralData] = useState({Name:'',Phone:'', Adress:'',Genre:''})
    const [passwordData, setPasswordData] = useState({Identification:'',PasswordSalt:''})
    const [horaireData, setHoraireData] = useState([])
    const [uploadImageName, setUploadImageName] = useState('')
    const [uploadImage, setUploadImages] = useState()
    const [displayedImage, setDisplayedImage] = useState()
    const [alwaysState , setAlwaysState] = useState(false)
    const [loading , setLoading] = useState(false)
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    const panes = [
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () =><>
                            <Tab.Pane className='border-div' attached={false}><EditProfile generalData={generalData} setGeneralData={setGeneralData} EditPawword={0} /></Tab.Pane>
                            <Tab.Pane className='border-div' attached={false}><EditPassword passwordData={passwordData} setPasswordData={setPasswordData} EditPawword={0} /> </Tab.Pane>
                            <br />
                        </> ,
        },
        {
            menuItem: { key: 'comment', icon: 'time', content: 'Horaire' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><Horaire /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'position', icon: 'map', content: 'Position' },
            render: () => <><Tab.Pane className='border-div' attached={false}><PositionMap  /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'images', icon: 'images', content: 'Images' },
            render: () => <><Tab.Pane className='border-div' attached={false}><Images /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'rate', icon: 'star', content: 'Evaluation' }, 
            render: () => <><RatingProfile /><CommentsProfile /></>,
        }, 
        {
            menuItem: { key: 'print', icon: 'print', content: 'Imprimer' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><PrintProfile /></Tab.Pane><br /></>,
        },
    ]

    /*###############################[UseEffect]################################# */
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/profile`, {
            PID: GConf.PID,
        })
        .then(function (response) {
            setProfileData(response.data)
            setLoading(true)

            setPasswordData(response.data.password[0])
            setGeneralData(response.data.general[0])
            setAlwaysState(response.data.horaire[0].ALL_Time)
            setHoraireData(JSON.parse(response.data.horaire[0].WorkingTime))

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              setProfileData([])
              setLoading(true)
            }
        });
    }, [])

    /*###############################[Function]################################# */
    const CalculateRating = (table) =>{
        let tot = 0;
        table.map( data => {
            tot = tot + data.Rating
        })

        return parseFloat(tot / table.length).toFixed(1)
    }
    const CalculateLikes = (table) =>{
        const WantedValue =  table.length ;
        if ( WantedValue / 1000 > 1 && WantedValue / 1000000 < 1) { return parseFloat(WantedValue / 1000 ).toFixed(1) + 'K' }
        else  if (WantedValue / 1000000 > 1) { return parseFloat(WantedValue / 1000000 ).toFixed(1) +'M' }
        else{ return parseInt(WantedValue)  }
    }
    const CalculateReview = (table, value ) =>{
        let filteredArray = table.filter(obj => parseInt(obj.Rating) == value );

        return(parseInt((filteredArray.length / table.length) * 100 ) )
    }

    const UpdateImageFunc = () =>{
        if (!uploadImage) { } 
        else if (!uploadImageName) { }
        else {
            const formData = new FormData();
            formData.append("ProfileImage", uploadImage);
            formData.append("Tag", uploadImageName);
            formData.append("PID", GConf.PID);
            axios({
                method: 'post',
                url: `${GConf.ApiLink}/profile/images/ajouter`,
                data: formData ,
            }).then(function (response) {
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
            });  
        } 
    }
    const UploadImageFunc = (e) => {
        setDisplayedImage(URL.createObjectURL(e.target.files[0]))
        setUploadImages(e.target.files[0])
    }

    /*###############################[Card]################################# */
    const ProfileCard = () =>{
        return(<>
            <div className="card card-body shadow-sm mb-4 sticky-top border-div" style={{top:'70px'}}>
	            <div className="text-center ">
	            	<img className="rounded-circle mb-3" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAG-zR4fktMGe70XSdw0fLPORYCa86gESZKg&usqp=CAUf" width="90px" height="90px"/>
	            
	            	 <h6>{loading ? profileData.general[0].Name : SKLT.BarreSkl } </h6>
	            	 <div><small className="text-secondary">Point de Vente En gros ({loading ? profileData.general[0].Genre : SKLT.BarreSkl })</small></div>
	            	<div><small className="text-secondary"><span className="bi bi-geo-alt"></span> {loading ? <> {profileData.general[0].Adress} , {profileData.general[0].Gouv} </> : SKLT.BarreSkl } </small></div>
	            	<div><small className="text-secondary"><span className="bi bi-telephone"></span> +216{loading ? profileData.general[0].Phone : SKLT.BarreSkl } </small></div> 
					<Divider /> 
					<div className='row mt-2'>
						<div className='col-6'>
						    <Statistic color='red' size='small'>
								<Statistic.Value>
                                {loading ? CalculateRating(profileData.review) : SKLT.BarreSkl }
								</Statistic.Value>
								<Statistic.Label>Avis</Statistic.Label>
							</Statistic>
						</div>
						<div className='col-6'>
							<Statistic color='red' size='small'>
								<Statistic.Value>
                                 {loading ? CalculateLikes(profileData.likes) : SKLT.BarreSkl }
								</Statistic.Value>
								<Statistic.Label>J'aimes</Statistic.Label>
							</Statistic>
						</div>
					</div>
					<Divider />
					<div className='row'>
						<div className='col-3'>
							<Icon circular inverted color='red'  name='youtube' />youtube
						</div>
						<div className='col-3'>
							<Icon circular inverted color='blue'  name='facebook square' /> facebook
						</div>
						<div className='col-3'>
							<Icon circular inverted color='pink'  name='instagram' /> instagram
						</div>
						<div className='col-3'>
							<Icon circular inverted color='yellow'  name='snapchat ghost' /> snapchat
						</div>
					</div>
					<br />
					<br />
					<div className='d-grid gap-2'>
						<button className='btn btn-danger btn btn-lg bnt-block rounded-pill text-white'>
							<span className='bi bi-person-circle me-3'></span>    
							 Profile 
						</button>
					</div>
	            </div>
            </div>
        </>)
    }
    const PrintProfile = () =>{ 
        return(<>
            <div className="d-flex">
                <div className="flex-shrink-0">
                <QRCode value="619458758757" size={130} />
                </div>
                <div className="flex-grow-1 ms-3">
                        <h1> 1111111111</h1>
                        Cet identifiant vous distinguera des autres inscrits sur la plateforme. Cela peut aussi être un court moyen de faire de la publicité pour vous
                </div>
            </div>
            <Divider />
            <div className="d-flex">
                <div className="flex-shrink-0">
                <QRCode value="c=docteur&PID=619458758757" size={130} />
                </div>
                <div className="flex-grow-1 ms-3">
                    Imprimez ce lien qui peut être accroché à la porte de votre magasin afin que vos clients puissent vous joindre facilement, et il peut également être partagé directement sur les réseaux sociaux
                    <div className='mt-2'>
                        <Button size='mini' positive> <Icon name='print' />Imprimer</Button>
                        <Button size='mini' primary>  <Icon name='facebook f' /> Partager </Button>
                    </div>
                </div>
            </div>
        </>)
    }
    const LikesProfile = () =>{    
        return(<>
        <div className='card card-body shaows-sm mb-2'>
            <h5>J'aimes</h5>
            { loading ?
            
                profileData.likes.map( (data,index) => <span key={index}>{data.Name}</span>)

             : 'fa'
            }
        </div>
       
        </>)
    }
    const PositionMap = () =>{    
        return(<>
            <div className='p-1'>
                    <h5>Location</h5>
                    <MapContainer center={[generalData.Lng,generalData.Lat]} zoom={15} scrollWheelZoom={false} className="map-height">
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[generalData.Lng,generalData.Lat]}>
                            <Popup>
                                
                            </Popup>
                        </Marker>
                    </MapContainer> 
            </div>
       
        </>)
    }
    const Images = () =>{   
        const imagesGenres = [
            { key: 1 , value: 'Photo de profile', text: 'Photo de profile' },
            { key: 2 , value: 'Image 1', text: 'Image 1' },
            { key: 3 , value: 'Image 2', text: 'Image 2' },
            { key: 4 , value: 'Image 3', text: 'Image 3' },
            { key: 5 , value: 'Image 4', text: 'Image 4' },
            { key: 6 , value: 'Image 5', text: 'Image 5' },
            
        ]

        const ImageCard = (props) =>{
            return(<>
                <div className='card p-1 mb-2 rounded'>
                    <div className='row'>
                        <div className='col-3'>
                            <img className='rounded' src={window.location.origin +  `${GConf.AssetsLink}/${props.data.ImageLink}`}  alt={props.data.Descreption} width='100%' height='80px' />
                        </div>
                        <div className='col-4'>
                            {props.data.ImageTag}
                        </div>
                        <div className='col-5'></div>
                    </div>
                </div>
            </>)
        }
        const UploadImage = () =>{
            return(<>
                <div className='card p-2 mb-2 rounded'>
                {/* <form encType="multipart/form-data"> */}
                    <div className='row'>
                        <div className='col-1 align-self-center text-end'>
                            <label onChange={UploadImageFunc} htmlFor="formId" className='text-info ' role="button">
                               <Input type='file' hidden name="imagez" id="formId"  />
                                <span className='bi bi-cloud-upload-fill bi-md'></span>
                            </label>
                        </div>
                        <div className='col-3'>
                            {displayedImage ? <img src={displayedImage} width='100%' height='50px'  /> : ''}
                        </div>
                        <div className='col-5 align-self-center text-end'>
                        <Dropdown
                            search
                            selection
                            fluid
                            size='mini'
                            wrapSelection={false}
                            options={imagesGenres}
                            placeholder='Selectionnez'
                            className='mb-1 rounded-pill'
                            onChange={(e, { value }) => setUploadImageName(value)}
                            value={uploadImageName}
                        />
                        </div>
                        <div className='col-3 align-self-center text-end'>
                            <Button  className='rounded-pill bg-system-btn' size='tiny' onClick={UpdateImageFunc} ><Icon name='save' /> Modifier <Loader inverted  inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                {/* </form> */}
                </div>
            </>)
        }
        return(<>
        <div className='p-2 mb-2'>   
            {profileData.images.map( (data,index) => <ImageCard key={index} data={data} />)}
            <br />
            <UploadImage />
        </div>
       
        </>)
    }
    const RatingProfile = () =>{
        const RatingBar = (props) => {
            return (<>
                <div className="row">
                    <div className="col-2"><h3>{props.name}</h3></div>
                    <div className="col-8 align-self-center">
                        <div className="progress" style={{height: "5px"}}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${props.value}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div> 
                    </div>
                    <div className="col-2"><h6>{props.value} %</h6></div>
                </div>
            </>)
        }
        return (<>
            <div className='card card-body shaows-sm mb-2 text-center'>
                <h5 className='text-start'>Avis</h5>
                <div className='row'>
                    <div className='col-4 align-self-center'>
                        <h1 className='text-warning'>{loading ? <> {CalculateRating(profileData.review)}</>: 0 }</h1>
                        <Rating className='d-inline' maxRating={5} defaultRating={loading ? CalculateRating(profileData.review) : 0 } icon='star' disabled size='massive' />
                        <h6 className="pt-2">{loading ? profileData.review.length : 0 } </h6>
                    </div>
                    <div className='col-8'>
                        <RatingBar name={1} value={loading ? CalculateReview(profileData.review, 1) : 0 } />
                        <RatingBar name={2} value={loading ? CalculateReview(profileData.review, 2) : 0 } />
                        <RatingBar name={3} value={loading ? CalculateReview(profileData.review, 3) : 0 } />
                        <RatingBar name={4} value={loading ? CalculateReview(profileData.review, 4) : 0 } />
                        <RatingBar name={5} value={loading ? CalculateReview(profileData.review, 5) : 0 } />
                    </div>
                </div>                
            </div>
        </>)
    }
    const CommentsProfile = () =>{

        const CommentsCard = (props) => {
            return (<>
                    <div className="d-flex mb-4">
                        <div className="flex-shrink-0">
                            <img src={`https://abyedh.tn/Assets/images/p_pic/${props.data.PictureId}.gif`} className='rounded-circle' width='40px' alt="..." />
                        </div>
                        <div className="flex-grow-1 ms-3 w-100">
                            <div className='text-left mb-0'><span> {props.data.Name} </span>  <span> <small className='text-secondary'> {new Date (props.data.R_Date).toLocaleDateString()}</small> </span> </div>
                            <div className='text-left mb-0'><small className='text-secondary'> {new Date (props.data.R_Date).toLocaleDateString()}</small></div>
                            <div><small>{props.data.Comment} </small></div>
                        </div>
                    </div>
            </>)
        }

        return(<>
        
                <div className='row '>
                    <div className='col-9 pe-1'>
                        <div className='card card-body shaows-sm mb-2'>
                        <h5>Commentaires</h5> 
                        <div style={{height:'200px', overflowX:'auto', overflowX:'hidden'}}>
                            { loading ?
                                <Comment.Group>
                                { profileData.review.map( (data,index) =>  <CommentsCard key={index} data={data} /> )}
                                </Comment.Group>
                                : 'fa'
                            }    
                        </div>  
                        </div>
                    </div>
                    <div className='col-3 ps-1'>
                        <div className='card card-body shaows-sm mb-2'>
                            <h5>J'aimes</h5>
                            <div style={{height:'200px', overflowX:'auto', overflowX:'hidden'}}>
                                    { loading ?
                                    
                                        profileData.likes.map( (data,index) => <a href='https://www.abyedh.tn' key={index}>{data.Name}</a>)

                                    : 'fa'
                                    }
                            </div>
                        </div>
                    </div>
                </div>
        </>)
    }
    const Horaire = () =>{
        const DayHoraire = (props) =>{
            return(<>
                    <div className='row'>
                        <div  className='col-1 align-self-center'>
                            <b>{props.data.day}</b>
                        </div>
                        <div  className='col-5'>
                            <div className='row'>
                                <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={JSON.parse(props.data.dayOff)}  fluid className='mb-1' value={props.data.matin.start}/></div>
                                <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={JSON.parse(props.data.dayOff)}  fluid className='mb-1' value={props.data.matin.end}/></div>
                            </div>
                        </div>
                        <div  className='col-5'>
                            <div className='row'>
                                <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={JSON.parse(props.data.dayOff)}  fluid className='mb-1' value={props.data.soir.start}/></div>
                                <div className='col-6'><Input icon='calendar alternate' type='time' size="mini" iconPosition='left' disabled={JSON.parse(props.data.dayOff)}  fluid className='mb-1' value={props.data.soir.end}/></div>
                            </div>
                        </div>
                        <div  className='col-1 align-self-center'>
                            <div className="form-check form-switch">
                                <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!props.data.dayOff)}  checked={JSON.parse(props.data.dayOff)} />
                            </div>
                        </div>
                    </div>
            </>)
        }
        return(<>
            <div className='card-body '>
                <div className='row'>
                    <div className='col-12 col-lg-11 align-self-center'> 
                        <h5 className='mb-0'>Toujour Overt</h5>  
                        <small>Coucher pour apraitre que vous étes toujour ouvert </small>
                    </div>
                    <div className='col-12 col-lg-1 align-self-center'> 
                        <div className="form-check form-switch">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!alwaysState)}  checked={alwaysState} />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='row text-danger mb-2'>
                    <div  className='col-1'> <b>Jour</b> </div>
                    <div  className='col-5'> <small>Matin</small> </div>
                    <div  className='col-5'> <small>Soir</small> </div>
                    <div  className='col-1'> <small>Repos</small> </div>
                </div>
                
                {
                    horaireData.map( (data,index) => <DayHoraire key={index} data={data}/>)
                }
                {/* <DayHoraire />
                <DayHoraire />
                <DayHoraire />
                <DayHoraire />
                <DayHoraire />
                <DayHoraire /> */}
            </div>

        </>)
    }
    return (<>
        <Bounce bottom>
            <h5><span className="bi bi-person-circle"></span> Profile</h5>
            <br /><br />
            <div className="row">
                    <div className="col-12 col-lg-4">
                        <ProfileCard /> 
                        <p>{uploadImageName}</p>
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>
        </div>
        </Bounce>
    </>);
}

export default ProfilePage;