import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Tab, Divider, Icon, Statistic, Comment, Input, Button, Form, TextArea, Select, Loader, Dropdown, Checkbox, Label, Menu} from 'semantic-ui-react';
import QRCode from "react-qr-code";
import { Rating } from 'semantic-ui-react'
import GConf from '../../../AssetsM/APPConf';
import axios from 'axios';
import { toast } from 'react-toastify';
import SKLT from '../../../../AssetsM/Cards/usedSlk';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents  } from 'react-leaflet';
import AvatarGroup from '@atlaskit/avatar-group';
import FrameForPrint from '../../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../../AssetsM/Hooks/printFunction';
import TunMap from '../../../../AssetsM/tunMap';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import ADIL from '../../../AssetsM/APPITEM';
import { NavLink } from 'react-router-dom';
import { FacebookProvider, ShareButton } from 'react-facebook';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'


const EditProfile = ({generalData, setGeneralData, UpdateGeneralDataFunc, delegList,GetDelegList,loaderState}) =>{
    const genreOptions = [
        { key: 1 , value: '5 ETOILE', text: '5 ETOILE' },
        { key: 2 , value: 'MLAWOUI', text: 'MLAWOUI' },
        { key: 3 , value: 'PIZZA', text: 'PIZZA' },
        { key: 4 , value: 'FAST FOOD', text: 'FAST FOOD' },
        
      ]
      const Livraisonoptions = [
        { key: '1', value: 'INTIGO', text: 'INTIGO ', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/intigo-1-300x145-1.png', avatar: true } },
        { key: '2', value: 'Yassir', text: 'Yassir ', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/yassir.png', avatar: true } },
        { key: '3', value: 'Farm Trust', text: 'Farm Trust ', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/farmtrust.png', avatar: true } },
        { key: '4', value: 'Founashop', text: 'Founashop', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/founa-shop.png', avatar: true } },
        { key: '5', value: 'Joy s', text: 'Joy’s', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/28070452_400909117034010_1865031699315847664_o-300x300-1.jpg', avatar: true } },
      ]

      function GenerateGenreListe() {
        return GConf.landing[GConf.systemTag].genreListe.map(item => ({
            key: item.id.toString(),
            value: item.name,
            text: item.name,
            image: { src: `https://cdn.abyedh.com/images/Search/Land_icons/${item.imgSrc}.gif`, avatar: true }
        }));
    }

    return ( <>
        <h3>Information Génerale</h3> 
        {/* <h5 className='mb-1'>Matricule Fiscale</h5> */}
        {/* <Input icon='key' iconPosition='left' placeholder='Mtricule Fiscale' value={generalData.Matricule_F} onChange={(e) => setGeneralData({...generalData, Matricule_F: e.target.value })} fluid /> */}
        
        <h5 className='mb-1'>Nom  </h5>
        <Input icon='user' dir='ltr' className="left aligned" iconPosition='left' placeholder='Nom' value={generalData.Name} onChange={(e) => setGeneralData({...generalData, Name: e.target.value })} fluid />
        
        <h5 className='mb-1'>Telephone</h5>
        <Input icon='phone'  iconPosition='left' placeholder='telephone' value={generalData.Phone} onChange={(e) => setGeneralData({...generalData, Phone: e.target.value })} fluid />
        <h5 className='mb-1'>Geolocation</h5>
        <div className='mb-2'>
            <Select placeholder='Selectionnez Gouvernorat' fluid className='mb-2' options={TunMap.Gouv} value={generalData.Gouv} onChange={(e, { value }) => GetDelegList(value)} />
            <Select placeholder='Selectionnez Delegation ' fluid value={generalData.Deleg} options={delegList} onChange={(e, { value }) => setGeneralData({...generalData, Deleg: value })} />
        </div>
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
            options={GenerateGenreListe()}
            placeholder='Selectionnez Client'
            className='mb-1'
            onChange={(e, { value }) => setGeneralData({...generalData, Genre: value })}
            value={generalData.Genre}
        />
        <br />
        <div className='text-end'>
            <Button  className='rounded-pill bg-system-btn' onClick={() => UpdateGeneralDataFunc()} ><Icon name='save' /> Modifier <Loader active={loaderState} inverted  inline size='tiny' className='ms-2'/></Button>
        </div>

    </> );
}
const EditPassword = ({passwordData, setPasswordData, UpdatePasswordFunc,loaderState}) =>{
    return(<>
        <h3>Modification de la mot de passe</h3>
        <h5 className='mb-1'>Idenbtifiant</h5>
        <Input icon='user' iconPosition='left' placeholder='Nom' value={passwordData.Identification} onChange={(e) => setPasswordData({...passwordData, Identification: e.target.value })}   fluid />
        <h5 className='mb-1'>Mot de passe</h5>
        <Input icon='eye' iconPosition='left' placeholder='telephone' value={passwordData.PasswordSalt} onChange={(e) => setPasswordData({...passwordData, PasswordSalt: e.target.value })}   fluid />
        <br />
        <div className='text-end'>
            <Button  className='rounded-pill bg-system-btn' onClick={() => UpdatePasswordFunc()} ><Icon name='save' /> Modifier <Loader active={loaderState} inverted  inline size='tiny' className='ms-2'/></Button>
        </div>
    </>)
}
const MapEventsHandler = ({ onLocationSelected }) => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelected({ lat, lng });
      },
    });
  
    return null;
}
const Horaire = ({alwaysState, setAlwaysState, timming, setTimming, setPauseDay , SetTimmingData,UpdateTimmingData, setSelectedUpdateDay, selectedUpdateDay}) =>{
    let [addInput, setAddInput] = useState(false)
    let [dateDataToChange, setDateDataToChange] = useState({pauseDay: false, matinStart:'08:00', matinFinsh:'12:00', soirStart:'14:00', soirFinsh:'18:00'})
    const weekDays = [
        { key: 'af', value: 'Lun', text: 'الانثنين' },
        { key: 'ax', value: 'Mar', text: 'الثلاثاء' },
        { key: 'al', value: 'Mer', text: 'الاربعاء' },
        { key: 'dz', value: 'Jeu', text: 'الخميس' },
        { key: 'as', value: 'Vend', text: 'الجمعة' },
        { key: 'ad', value: 'Sam', text: 'السبت' },
        { key: 'ao', value: 'Dim', text: 'الاحد' },
    ]
    const ArabificationDate = (dateName) =>{
        switch (dateName) {
            case 'Lun' : return 'الإثــنين' 
            break;
            case 'Mar' : return 'الثلاثــاء'
            break;
            case 'Mer' : return 'الإربــعاء'
            break;
            case 'Jeu' : return 'الخميس'
            break;
            case 'Vend' : return 'الجـمعة'
            break;
            case 'Sam' : return 'الســبت'
            break;
            case 'Dim' : return 'الأحـــد'
            break;

            default:
                break;
        }
    }
    const DayHoraire = (props) =>{
        return(<>
                <div className={`row  mb-1 ${props.data.dayOff ? 'text-danger':''}`}>
                    <div  className='col-3 col-lg-3 m-0 p-1'>
                        <b>{ArabificationDate(props.data.day)}</b>
                    </div>
                    <div  className='col-4 col-lg-4  m-0 p-1'>
                        <small>{props.data.matin.start} - {props.data.matin.end}</small>
                    </div>
                    <div  className='col-4 col-lg-4  m-0 p-1'>
                        <small>{props.data.soir.start} - {props.data.soir.end}</small>
                    </div>
                    <div className='col-1 m-0 p-1'>
                        <span className='bi bi-pencil-square bi-xsm text-secondary' onClick={() => OpenEditTime(props.data.day)}></span>
                    </div>
                </div>
        </>)
    }
    const OpenEditTime = (value) =>{
        setSelectedUpdateDay(value)
        setAddInput(true)
    }
    const UpdateTimingFunc = () =>{
        const targetIndex = timming.findIndex(element => element.day === selectedUpdateDay)
        let copyOfHoraire = timming
        copyOfHoraire[targetIndex] = {day: selectedUpdateDay , dayOff: dateDataToChange.pauseDay , matin:{start: dateDataToChange.matinStart ,end: dateDataToChange.matinFinsh},soir:{start: dateDataToChange.soirStart,end: dateDataToChange.soirFinsh}}
        setTimming(copyOfHoraire)
        //SetTimmingData()
        setAddInput(!addInput)
    }
    return(<>
        <br />
        <div className=' ' dir='rtl'>
            <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-calendar-week-fill'></span>   أوقات العمل  </h5>
            <div className='row'>
                <div className='col-12 col-lg-12'>
                    <div className=' '>
                        <div className='row'>
                            <div className='col-10 col-lg-9 align-self-center'> 
                                <h5 className='mb-0 text-success'>مفتوح دائما</h5>  
                                <small>عند تفعيل هذه الخاصية ستضهر في حالة مفتوح دائما </small>
                            </div>
                            <div className='col-2 col-lg-3  align-self-center '> 
                                <div className="form-check form-switch">
                                    <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!alwaysState)}  checked={alwaysState} />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        {addInput ? 
                                <div className=' card card-body border-div  '>
                                    <div className='text-start'><span className='bi bi-x-circle-fill  text-danger text-secondary mb-2' onClick={() => setAddInput(!addInput)}></span></div>
                                    <h5 className='mt-0'> هل يوم {ArabificationDate(selectedUpdateDay)} يوم راحة ؟  </h5>
                                    <Select options={[ { key: 'af', value: false, text: 'لا' }, { key: 'ax', value: true, text: 'نعم' }]} onChange={(e, {value}) => setDateDataToChange({... dateDataToChange, pauseDay : value})} className='mb-3'/>
                                    <div className='row mb-3 '>
                                        <div className='col-6'><Input  type='time' size='mini'  value={dateDataToChange.matinStart}  fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, matinStart : e.target.value})} /></div>
                                        <div className='col-6'><Input  type='time' size="mini"  value={dateDataToChange.matinFinsh} fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, matinFinsh : e.target.value})}/></div>
                                    </div>
                                    <div className='row mb-3'>
                                        <div className='col-6'><Input  type='time' size='mini'  value={dateDataToChange.soirStart}   fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, soirStart : e.target.value})} /></div>
                                        <div className='col-6'><Input  type='time' size="mini"  value={dateDataToChange.soirFinsh}  fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, soirFinsh : e.target.value})}/></div>
                                    </div>
                                    <Button size='mini'     className='rounded-pill    font-droid' onClick={() => UpdateTimingFunc()} fluid  >   <Icon name='time' /> تعديل وقت يوم  {ArabificationDate(selectedUpdateDay)}  </Button>
                                </div>

                        :
                                <>
                                    <div className='row text-secondary mb-2'>
                                        <div  className='col-4 col-lg-4'> <b>اليوم</b> </div>
                                        <div  className='col-4 col-lg-4'> <small>صباح</small> </div>
                                        <div  className='col-4 col-lg-4'> <small>مساء</small> </div>
                                    </div>
                                    
                                    {
                                        timming.map( (data,index) => <DayHoraire key={index} data={data} />)
                                    }
                                </>
                        }
                        
                    </div>
                </div>
                <div className='col-12 col-lg-5 d-none'>
                    <div className='card card-body border-div'>
                        <h5>قم باختيار يوم لتعديل الوقت </h5>
                        <Select options={weekDays} onChange={(e, { value }) => setSelectedUpdateDay(value)} className='mb-3'/>
                        <div className='row mb-3 '>
                            <div className='col-6'><Input  type='time' size='mini'  value={timming.find(obj => obj.day === selectedUpdateDay).matin.start}  fluid className='mb-1 w-100'  onChange={(e) => SetTimmingData(selectedUpdateDay,'matin','start',e.target.value)} /></div>
                            <div className='col-6'><Input  type='time' size="mini"  value={timming.find(obj => obj.day === selectedUpdateDay).matin.end} fluid className='mb-1 w-100'  onChange={(e) => SetTimmingData(selectedUpdateDay,'matin','end',e.target.value)}/></div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-6'><Input  type='time' size='mini'  value={timming.find(obj => obj.day === selectedUpdateDay).soir.start}   fluid className='mb-1 w-100'  onChange={(e) => SetTimmingData(selectedUpdateDay,'soir','start',e.target.value)} /></div>
                            <div className='col-6'><Input  type='time' size="mini"  value={timming.find(obj => obj.day === selectedUpdateDay).soir.end}  fluid className='mb-1 w-100'  onChange={(e) => SetTimmingData(selectedUpdateDay,'soir','end',e.target.value)}/></div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-2 text-end'>
                                <div className="form-check form-switch">
                                    <input className="form-check-input form-check-input-lg" type="checkbox" checked={timming.find(obj => obj.day === selectedUpdateDay).dayOff}   onChange={() => setPauseDay(selectedUpdateDay,selectedUpdateDay.dayOff)}   />
                                </div>
                            </div>
                            <div className='col-10'>يوم راحة ؟ </div>
                        </div>
                        
                        <Button size='mini'     className='rounded-pill    font-droid' onClick={() => UpdateTimmingData()} fluid  >   <Icon name='time' /> تعديل  </Button>
                    </div>
                </div>
            </div>
            
        </div>
    </>)
}
const Location = ({position,handleLocationSelected,GetMyLocation}) =>{
    return(<>
        <br />
        <div className='  mb-3' dir='rtl'>
                <div className='row'>
                        <div className='col-6 align-self-center text-end'><h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-geo-alt-fill'></span>   الموقع الجغرافي </h5></div>
                        <div className='col-6 align-self-center text-start'><Button icon='map pin' className='rounded-circle' onClick={() => GetMyLocation()}></Button></div>
                </div> 
                
                <small className='mb-3'> قم بالنقر علي الزر لتحديد مكانك الحاليا إفتراضيا  </small>
                <MapContainer center={[position.Lat,position.Lng]} zoom={6} scrollWheelZoom={false} className="map-height  border-div">
                    <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MapEventsHandler onLocationSelected={handleLocationSelected} />
                    <Marker position={[position.Lat,position.Lng]}>
                        <Popup> </Popup>
                    </Marker>
                </MapContainer> 
                {/* <LocationPicker    />*/}
        </div>
    </>)
}

function ProfilePage() {
    /*###############################[Const]################################# */
    const [profileData, setProfileData] = useState([])
    const [generalData, setGeneralData] = useState({Name:'', Matricule_F:'', Phone:'', Adress:'',Genre:'', Lat: '0.0', Lng:'0.2'})
    const [passwordData, setPasswordData] = useState({Identification:'',PasswordSalt:''})
    
    /*Horiare */
    const [horaireData, setHoraireData] = useState([])
    //const [alwaysState , setAlwaysState] = useState(false)
    const [delegList ,setDelegList] = useState([])
    let [selectedUpdateDay , setSelectedUpdateDay] = useState('Lun')
    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}}])
    let [test , setTest] = useState(10)
    

    /*Images */
    const [imagesListe, setImagesListe] = useState([])
    const [uploadImageName, setUploadImageName] = useState('')
    const [uploadImage, setUploadImages] = useState()
    const [formaDataArr, setFormDataArr] = useState()
    const [displayedImage, setDisplayedImage] = useState()
    const [todisplayedImage, setToDisplayedImage] = useState([])
    
    /*Position */
    const [myPosition, setMyPosition] = useState([36.17720,9.12337])
    let [position, setPosition] = useState({Lat: 36.83040, Lng: 10.13280})

    /* Others */
    const [loading , setLoading] = useState(false)
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [openD, setOpenD] = useState(false)

    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    const panes = [
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () =><><Tab.Pane className='border-div' attached={false}><EditProfile generalData={generalData} setGeneralData={setGeneralData} UpdateGeneralDataFunc={UpdateGeneralDataFunc} delegList={delegList} GetDelegList={GetDelegList} loaderState={loaderState} /></Tab.Pane> <br/></>,
        },
        {
            menuItem: { key: 'mpd', icon: 'eye slash', content: 'MDP' }, 
            render: () =><><Tab.Pane className='border-div' attached={false}><EditPassword passwordData={passwordData} setPasswordData={setPasswordData} UpdatePasswordFunc={UpdatePasswordFunc} loaderState={loaderState} /> </Tab.Pane> <br/></>,
        },

        {
            menuItem: { key: 'comment', icon: 'time', content: 'Horaire' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><Horaire alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setTimming={setTimming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} setSelectedUpdateDay={setSelectedUpdateDay} selectedUpdateDay={selectedUpdateDay} UpdateTimmingData={UpdateTimmingData} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'position', icon: 'map', content: 'Position' },
            render: () => <><Tab.Pane className='border-div' attached={false}><Location position={position} handleLocationSelected={handleLocationSelected} GetMyLocation={GetMyLocation} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'images', icon: 'images', content: 'Images' },
            render: () => <><Tab.Pane className='border-div' attached={false}><ImageCard /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'rate', icon: 'star', content: 'Evaluation' }, 
            render: () => <><Tab.Pane className='border-div p-4' attached={false}><Tab menu={{ secondary: true, className: 'tab-right'}}  panes={RatingPanes} /></Tab.Pane><br /></>,
        }, 
        {
            menuItem: { key: 'print', icon: 'print', content: 'Imprimer' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><PrintProfile /></Tab.Pane><br /></>,
        },
    ]
    const horairePanes = [
        {
          menuItem: { key: 'users', icon: 'edit', content: 'Entrer' }, 
          render: () => <InputHoraireCard />,
        },
        {
          menuItem: { key: 'calendar', icon: 'calendar', content:  'Calendrier', },  
          render: () => <AcutelCalendarCard />,
        },
      ]
    const RatingPanes = [
        {
          menuItem: { key: 'calendar', icon: 'star', content:  'Avis ', },  
          render: () => <RatingProfile />,
        },
        {
            menuItem: { key: 'users', icon: 'comment', content: 'Commentaire ' }, 
            render: () => <CommentsProfile />,
          },
      ] 
    /*###############################[UseEffect]################################# */
    useEffect(() => {
        window.scrollTo(0, 0);
        GetPositionNow();
        axios.post(`${GConf.ApiLink}/profile`, {
            PID: GConf.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) {
            console.log(response.data)
            setGeneralData(response.data.general[0])
            setProfileData(response.data)
            setPasswordData(response.data.password[0]) 
            setImagesListe(response.data.images)

            if (response.data.horaire[0]) { setAlwaysState(response.data.horaire[0].ALL_Time) } else { }
            if (response.data.horaire[0]) { setHoraireData(JSON.parse(response.data.horaire[0].WorkingTime)) } else { } 
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              setProfileData([])
              //setLoading(true)
            }
        });
    }, [])

    /*###############################[Function]################################# */
    const PrintFunction = (frameId) =>{usePrintFunction(frameId)}
    const OpenBottomSheetFunction = (genre) => {
        setActiveIndex(genre)
        setOpenD(!openD)
    }
    const onShare = async () => {
        if (navigator.share) {
          try {
            const result = await navigator.share({
              title: 'Khelifi Houssem Profile',
              text: 'Khelifi houssem Profile sur Abyedh',
              url: 'http://abyedh.com/',
            });
            console.log('Successfully shared', result);
          } catch (error) {
            console.error('Error sharing:', error);
          }
        } else {
          alert('Sharing is not supported in this browser.');
        }
    };

    const LogOut = () =>{
        localStorage.removeItem(`PID`);
        localStorage.removeItem(`APP_TAG`);
        window.location.href = "/";
    }
    
    /*Genrale */
    const GetDelegList = (value) =>{
        setGeneralData({...generalData, Gouv: value })
        const found = TunMap.Deleg.filter(element => element.tag === value)
        setDelegList(found)
    }
    const UpdateGeneralDataFunc = () =>{
        if (!generalData.Name) {toast.error("Matricule est Invalide !", GConf.TostErrorGonf)}
        // else if (!generalData.Name ) {toast.error("Nom de la ste est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Gouv ) {toast.error("Gouv est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Deleg ) {toast.error("Delegation est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Phone ) {toast.error("Phone est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Adress ) {toast.error("Adress est  Invalide !", GConf.TostErrorGonf)}
        else if (!generalData.Genre ) {toast.error("Genre est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/profile/update/general`, {
                PID : GConf.PID,
                profileDataSent : generalData,
                SystemTag : GConf.systemTag
            }).then(function (response) {
                console.log(response.data)
                if(response.data.affectedRows) {
                    toast.success("Profile Modifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })                
        }
    }
    const UpdatePasswordFunc = () =>{
        if (!passwordData.Identification) {toast.error("Identifiant est Invalide !", GConf.TostErrorGonf)}
        else if (!passwordData.PasswordSalt ) {toast.error("Mot de passe est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/profile/update/password`, {
                PID : GConf.PID,
                passwordDataSent : passwordData,
                SystemTag : ADIL[GConf.systemTag].RequestTable
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Mot de Passe Modifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })                
        }
    }



    /* Rating */
    const CalculateRating = (table) =>{
        let tot = 0;
        table.map( data => {
            tot = tot + data.Rating
        })
        if (tot == 0) {
            return tot
        } else {
            return parseFloat(tot / table.length).toFixed(1)
        }
        
        //
    }
    const CalculateLikes = (table) =>{
        const WantedValue =  table.length ;
        if ( (WantedValue / 1000) > 1 && (WantedValue / 1000000) < 1) { return parseFloat(WantedValue / 1000 ).toFixed(1) + 'K' }
        else  if ( (WantedValue / 1000000) > 1) { return parseFloat(WantedValue / 1000000 ).toFixed(1) +'M' }
        else{ return parseInt(WantedValue)  }
    }
    const CalculateReview = (table, value ) =>{
        let filteredArray = table.filter(obj => parseInt(obj.Rating) == value );
        if (filteredArray != 0) {
            return(parseInt((filteredArray.length / table.length) * 100 ) )
        } else {
            return 0
        }
        
    }
    const ReturnAvatarGroupList = (list) =>{
        let FinalList = []

        list.map( (data,index) => FinalList.push({ key: index, name: data.Name , src: `https://cdn.abyedh.com/images/p_pic/${data.PictureId}.gif`},))
        return FinalList
    }

    /*Images */
    const UploadImageFunc = (e) => {
        setDisplayedImage(URL.createObjectURL(e.target.files[0]))
        setUploadImages(e.target.files[0])
    }
    const UpdateImageFunc = (genre) =>{
        if (!uploadImage) {toast.error("Image est Invalide !", GConf.TostErrorGonf) } 
        else {
            const formData = new FormData();
            formData.append("Images", uploadImage);
            formData.append("PID", GConf.PID);
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
    const handleFileSelect = (event)  =>{
        const files = event.target.files;
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            const filename = `restaurant_${GConf.PID}_${i}-`;
            formData.append('Images', files[i], filename);
        }
        formData.append("PID", GConf.PID);
        //setDisplayedImage(URL.createObjectURL(event.target.files[0]))
        const uploadedImages = Array.from(event.target.files);
        setToDisplayedImage(uploadedImages);
        //files.map(() => console.log(files.length))
        
        setFormDataArr(formData);
        //UpdateImageFuncMultiple(formData);
    }
    const UpdateImageFuncMultiple = (formData) =>{
        console.log(todisplayedImage.length)
        if (todisplayedImage.length < 5) {toast.error("Il Faut 5 Images !", GConf.TostErrorGonf) } 
        else if (todisplayedImage.length > 5) {toast.error("cinque Images Seulemment Sont autoriseé !", GConf.TostErrorGonf) } 
        else {
            axios.post(`${GConf.ApiLink}/profile/images/ajouter`, formData)
            .then(response => toast.error("Images Enregistreé !", GConf.TostSuucessGonf))
            .catch(error => console.log(error));
        }
        
    }
    // const UpdateImageFunc = () =>{
    //     if (!uploadImage) { } 
    //     else if (!uploadImageName) { }
    //     else {
    //         const formData = new FormData();
    //         formData.append("ProfileImage", uploadImage);
    //         formData.append("Tag", uploadImageName);
    //         formData.append("PID", GConf.PID);
    //         axios({
    //             method: 'post',
    //             url: `${GConf.ApiLink}/profile/images/ajouter`,
    //             data: formData ,
    //         }).then(function (response) {
    //             console.log(response.data)
    //         }).catch((error) => {
    //             console.log(error)
    //         });  
    //     } 
    // }
    // const UploadImageFunc = (e) => {
    //     setDisplayedImage(URL.createObjectURL(e.target.files[0]))
    //     setUploadImages(e.target.files[0])
    // }
    const RemoveImageFunc = (imgName) => {
        console.log(imgName.slice(0, -4))
        axios.post(`${GConf.ApiLink}/profile/images/deletefile`, {
            fileName : imgName,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Image Supprimeé !", GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        })
    }
    
    /*Position */
    const GetPositionNow = () =>{
        //get position 
        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
                else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
                else{
                    setMyPosition([position.coords.latitude, position.coords.longitude])
                }
            },
            function(error) {
                toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
            }
        );
    }
    const CheckPositions = () =>{
        let LAT = myPosition[0] === parseFloat(generalData.Lat)
        let LNG = myPosition[1] === parseFloat(generalData.Lng)
        return (LAT && LNG)
    }
    const UpdatePositionFunc = () =>{
        if (!passwordData.Identification) {toast.error("Identifiant est Invalide !", GConf.TostErrorGonf)}
        else if (!passwordData.PasswordSalt ) {toast.error("Mot de passe est  Invalide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/profile/update/position`, {
                PID : GConf.PID,
                positionDataSent : myPosition,
                SystemTag : GConf.systemTag
            }).then(function (response) {
                if(response.data.affectedRows) {
                    toast.success("Position Modifieé !", GConf.TostSuucessGonf)
                    setLS(false)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            })                
        }
    }
    const handleLocationSelected = (location) => {
        setPosition({Lat: location.lat , Lng:location.lng})
    }
    const GetMyLocation = () =>{
        navigator.geolocation.getCurrentPosition(
            function(position) {
                if (!position.coords.latitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lat</h5></div></>, GConf.TostInternetGonf)}
                else if (!position.coords.longitude) {toast.error(<><div><h5>ENTRE VOTRE POSITION Lng</h5></div></>, GConf.TostInternetGonf)}
                else{
                    setPosition({Lat:position.coords.latitude, Lng:position.coords.longitude})
                }
            },
            function(error) {
                toast.error(<><div><h5>ENTRE VOTRE POSITION</h5></div></>, GConf.TostInternetGonf)
            }
        );
    }

    /*Horiare */
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
    const UpdateTimmingData = (day,time,genre,value) => {
        //setTimming(...timming)
        setTest(Math.random())
        toast.success("", GConf.TostAddedToTimming)

    }  
    const setPauseDay = (day,state) =>{
        const targetIndex = timming.findIndex(element => element.day === day)
        let copyOfHoraire = timming
        copyOfHoraire[targetIndex].dayOff = !state
        setTimming(copyOfHoraire)
        setTest(Math.random())
    }

    /*###############################[Card]################################# */
    const PrintProfile = () =>{ 
        return(<>
            <div className="row">
                <div className="col-12 col-lg-3 text-center mb-3 ">
                    <QRCode value={GConf.PID} size={130} />
                </div>
                <div className="col-12 col-lg-9" dir='rtl'>

                        <h1> {GConf.PID} </h1>
                        هذا المعرف سوف يميزك عن الآخرين المسجلين على المنصة. يمكن أن تكون هذه أيضًا طريقة قصيرة للإعلان لك
                        <div>
                        <Button size='mini' className='rounded-pill' onClick={() => navigator.clipboard.writeText(localStorage.getItem('PID'))}><Icon name='copy'  />  نسخ  PID</Button>
                        </div>
                        <br /> 
                        اطبع هذا الرابط الذي يمكن تعليقه على باب متجرك حتى يتمكن عملاؤك من الوصول إليك بسهولة، كما يمكن مشاركته مباشرة على وسائل التواصل الاجتماعي
                        <div className='mt-2'>
                            <Button size='mini' positive onClick={(e) => PrintFunction('printPID')}> <Icon name='print'  />  طباعة </Button>
                            <Button size='mini' primary target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://abyedh.tn/S/P/${GConf.systemTag}/${GConf.PID}`} >  <Icon name='facebook f' /> إعلان علي الفايسبوك  </Button>
                        </div>
                        {/* <FacebookProvider appId="1323119021701572">
                            <ShareButton className='btn btn-primary ' href={`https://abyedh.tn/S/P/${GConf.systemTag}/${GConf.PID}`}>
                                Share
                            </ShareButton>
                        </FacebookProvider> */}
                        
                </div>
            </div>
            {/* <Divider /> */}
            <div className="d-flex d-none">
                <div className="flex-shrink-0">
                {/* <QRCode value={`${GConf.systemTag}/${GConf.PID}`} size={130} /> */}
                </div>
                <div className="flex-grow-1 ms-3">
                    Imprimez ce lien qui peut être accroché à la porte de votre magasin afin que vos clients puissent vous joindre facilement, et il peut également être partagé directement sur les réseaux sociaux
                    <div className='mt-2'>
                        <Button size='mini' positive onClick={(e) => PrintFunction('printPID')}> <Icon name='print'  />Imprimer</Button>
                        <Button size='mini' primary target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://abyedh.tn/S/P/${GConf.systemTag}/${GConf.PID}`} >  <Icon name='facebook f' /> Partager </Button>
                    </div>
                </div>
            </div>
        </>)
    }
    const ProfileCard = () =>{
        return(<>
            <div className="card card-body shadow-sm mb-4 sticky-top border-div" style={{top:'70px', zIndex : 1}}>
	            <div className="text-center ">
                    <div className='row'>
                        <div className='col-4 col-lg-12 align-self-center'>
                                <img className="rounded-circle mb-3" src={`https://cdn.abyedh.com/images/ads/${GConf.systemTag}.svg`} width="90px" height="90px"/>
                        </div>
                        <div className='col-8 col-lg-12 align-self-center'>
                            <h6 className='mb-0'>{loading ? profileData.general[0].Name : SKLT.BarreSkl }  ({loading ? profileData.general[0].Genre : SKLT.BarreSkl }) </h6>
                            <div><small className="text-secondary"><span className="bi bi-geo-alt"></span> {loading ? <> {profileData.general[0].Adress} , {profileData.general[0].Gouv} </> : SKLT.BarreSkl } </small></div>
                            <div><small className="text-secondary"><span className="bi bi-telephone"></span> +216 {loading ? profileData.general[0].Phone : SKLT.BarreSkl } </small></div> 
                            <h5 className='mt-1 mb-2'>PID : {localStorage.getItem('PID')} <Button size='mini' icon='copy' className='rounded-circle bg-transparent' onClick={() => navigator.clipboard.writeText(localStorage.getItem('PID'))}></Button> </h5>
                        </div>
                    </div>
	            	 
	            
	            	
					<span className='d-none d-md-block'>
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
    
                        <br />
                        <br />
                    </span>
					<div className='  d-grid gap-2'>
						<NavLink className='btn btn-danger btn btn-lg bnt-block rounded-pill text-white '   to={`/S/P/${GConf.systemTag}/${GConf.PID}`}>
							<span className='bi bi-person-circle me-2'></span>    
							 Voir Profile 
						</NavLink>
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
                    <div className='row mb-3'>
                        <div className='col-8'> 
                        Lorsque vous cliquer ici la position enregistré sera 'Mon position' 
                        </div>
                        <div className='col-4 text-end'> 
                                <Button  className='rounded-pill bg-system-btn' disabled={CheckPositions()} size='mini' onClick={ () => UpdatePositionFunc()} ><Icon name='save' /> Modifier Position <Loader inverted active={loaderState}  inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                    <MapContainer center={[36.071,9.333]} zoom={7} scrollWheelZoom={false} className="map-height">
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[generalData.Lat,generalData.Lng]}>
                            <Popup>Position Enregistrée</Popup>
                        </Marker>
                        <Marker position={[myPosition[0],myPosition[1]]}>
                            <Popup>Mon Position</Popup>
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
                            <label onChange={UploadImageFunc} htmlFor="formId"  className='text-info ' role="button">
                                <Input type='file' hidden name="imagez" id="formId"   />
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
    const ImageCard = () =>{
        const UploadImageCard = () =>{
            return(<>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <div className='row'>
                        <div className='col-6 align-self-center text-center'>
                                <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                    <Input type='file' hidden name="Images" id="formId" multiple />
                                    <span className='bi bi-cloud-upload-fill bi-md'> </span> 
                                </label>
                                
                        </div>
                        <div className='col-6'>
                            <Button   className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFuncMultiple(formaDataArr)} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        
                    </div>
                </div>
            </>)
        }
        const DisplayImageCard = (props) => {
            return(<>
                <div className='card card-body shadow-m mb-2 border-div'>
                    <div className='row'>
                       <div className='col-4'><div className='max-height-image'><img src={`https://cdn.abyedh.com/images/Directory/${props.imageLink}`} className='border border-2 rounded shadow-sm d-block' width='100%' height="auto"  /></div></div> 
                       <div className='col-4'></div> 
                       <div className='col-4'><Button onClick={() => RemoveImageFunc(props.imageLink)}>Delete Btn</Button></div> 
                    </div>
                </div>
            </>)
        }
        const PasDeResultat = () =>{
            return(<>
                <div className='text-center'>
                        <h3>
                            <span className='bi bi-exclamation-triangle-fill text-info bi-md me-3'></span> 
                            Vous n'avait pas d'images
                        </h3>
                        <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                <Input type='file' hidden name="Images" id="formId" multiple />
                                {/* <img src='https://assets.ansl.tn/Images/usful/uploadImage.jpg' width='100%'  height='150px' /> */}
                                <span className='bi bi-cloud-upload ' style={{fontSize : '100px'}}></span>
                                <h3> Cliquer Pour Charger des Imgaes  </h3>
                        </label>
                        
                </div>
            </>)
        }
        return(<>
            {imagesListe.length == 0 ?
                <>
                    {/* <UploadImageCard title='Image de Profile' tag='profile' />  */}
                    <br />
                    <div className='row'>
                            {todisplayedImage.length != '0' ? 
                            <>
                                <Carousel>
                                {todisplayedImage.map((data,index) => 
                                        <div className='col-12 col-lg-4 mb-5' key={index}>
                                            <div className='max-height-image mb-2'>
                                                <img src={URL.createObjectURL(todisplayedImage[index])} className='border border-div d-block' width='100%' height='150px'  />
                                            </div>
                                            <Button fluid onClick={() => {setToDisplayedImage(todisplayedImage.filter((item, tindex) => tindex !== index))}}>Supprimeé</Button>
                                        </div>
                                )}
                                </Carousel>
                                <br />
                                <div className='row'>
                                    <div className='col-6 align-self-center'>
                                        {todisplayedImage.length == '5' ? <></> 
                                        :
                                        <label onChange={handleFileSelect} htmlFor="formId"   className='text-info' role="button">
                                                <Input type='file' hidden name="Images" id="formId" multiple />
                                                <span className='bi bi-cloud-upload ' style={{fontSize : '30px'}}></span>
                                        </label>
                                         }
                                    </div>
                                    <div className='col-6 align-self-center text-end'>
                                            <Button   className='rounded-pill bg-system-btn' size='tiny' onClick={() => UpdateImageFuncMultiple(formaDataArr)} ><Icon name='save' /> Enregistreé <Loader inverted active={loaderState} inline size='tiny' className='text-danger'/></Button>
                                    </div>
                                    
                                </div>
                                
                                
                            </>   
                            : 
                            <PasDeResultat />}
                    </div>
                </>
                :
                <>
                    <Carousel>
                        {imagesListe.map((data,index) => 
                                <div key={index}>
                                    <img src={`https://cdn.abyedh.com/images/Directory/${data.ImageLink}`} />
                                    <p className="legend"><Button onClick={() => RemoveImageFunc(data.ImageLink)}>Supprimer</Button></p>
                                </div>
                        )}
                    </Carousel>
                    {/* {imagesListe.map((data,index) => <DisplayImageCard key={index} imageLink={data.ImageLink} />)} */}
                </>  
            }
                
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
            {/* <div className='card card-body shadow-sm border-div mb-2 text-center'> */}
                <h5 className='text-start'>Avis</h5>
                <div className='row text-center'>
                    <div className='col-12 col-lg-4 align-self-center'>
                        <h1 className='text-warning'>{loading ? <> {CalculateRating(profileData.review)}</>: 0 }</h1>
                        <Rating className='d-inline' maxRating={5} defaultRating={loading ? CalculateRating(profileData.review) : 0 } icon='star' disabled size='massive' />
                        <h6 className="pt-2">{loading ? profileData.review.length : 0 } </h6>
                    </div>
                    <div className='col-12 col-lg-8'>
                        <RatingBar name={1} value={loading ? CalculateReview(profileData.review, 1) : 0 } />
                        <RatingBar name={2} value={loading ? CalculateReview(profileData.review, 2) : 0 } />
                        <RatingBar name={3} value={loading ? CalculateReview(profileData.review, 3) : 0 } />
                        <RatingBar name={4} value={loading ? CalculateReview(profileData.review, 4) : 0 } />
                        <RatingBar name={5} value={loading ? CalculateReview(profileData.review, 5) : 0 } />
                    </div>
                </div> 
                <hr />
                <h5>J'aimes</h5>
                {/* <div style={{height:'200px', overflowX:'auto', overflowX:'hidden'}}> */}
                        {/* <h2 className='text-center'>{profileData.likes ? profileData.likes.length : '...'}</h2>  */}
                        <AvatarGroup className='text-center' size="large" maxCount={12} data={ReturnAvatarGroupList(profileData.likes)}   borderColor="#cfcecc" />
                        {/* { loading ?
                        
                            profileData.likes.map( (data,index) => <a href='https://www.abyedh.tn' key={index}>{data.Name}</a>)

                        : 'fa'
                        } */}
                        
                {/* </div>                */}
            {/* </div> */}
        </>)
    }
    const CommentsProfile = () =>{

        const CommentsCard = (props) => {
            return (<>
                    <div className="d-flex mb-2 border-bottom">
                        <div className="flex-shrink-0">
                            <img src={`https://cdn.abyedh.com/images/p_pic/${props.data.PictureId}.gif`} className='rounded-circle' width='30px' alt="..." />
                        </div>
                        <div className="flex-grow-1 ms-3 w-100">
                            <div className='row  mb-0'>
                               <div className='col-6 text-start'>{props.data.Name}</div>
                               <div className='col-6 text-end'><small className='text-secondary'> {new Date (props.data.R_Date).toLocaleDateString()}</small></div>
                            </div>
                            <div><b>{props.data.Comment} </b></div>
                        </div>
                    </div>
            </>)
        }

        return(<>
        
                <div className='row '>
                    <div className='col-12 pe-1'>
                            <h5>Commentaires</h5> 
                            <div style={{height:'200px', overflowX:'auto', overflowX:'hidden'}}>
                                { loading ?
                                    <Comment.Group>
                                    { profileData.review.map( (data,index) =>  <CommentsCard key={index} data={data} /> )}
                                    </Comment.Group>
                                    : '...'
                                }    
                            </div>  
                    </div>
                </div>
        </>)
    }
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
    const InputHoraireCard = () =>{
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

                <div className='row mb-2 mt-4'>
                        <div className='col-8'> </div>
                        <div className='col-4 text-end'> 
                                <Button  className='rounded-pill bg-system-btn' size='mini' ><Icon name='save' /> Modifier Horaire <Loader inverted  inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
            </div>
            </>)
    }
    const AcutelCalendarCard = () =>{
        return(<>
        <FullCalendar 
            plugins={[ timeGridPlugin ]}
            initialView="timeGridWeek"
            locale='fr' 
            dayHeaderFormat = {{weekday: 'short'}}
            events={[
                { title: 'S1',  start: '2022-08-18T08:00:00' , end: "2022-08-18T12:00:00", display: 'background', backgroundColor:'red'},
                { title: 'S2', start: '2022-08-18T14:00:00', end: "2022-08-18T18:00:00", display: 'background' },
                { title: 'S1',  start: '2022-08-18T08:00:00' , end: "2022-08-18T12:00:00", display: 'background'},
                { title: 'S2',  start: '2022-08-18T14:00:00' , end: "2022-08-18T18:00:00", display: 'background'},
            ]}
            headerToolbar='false'
            height='350px'
            allDaySlot= {false}
        />
        </>)
    }
    // const Horaire = () =>{
    //     return(<>
    //         <Tab menu={{ secondary: true, className: 'tab-right'}} defaultActiveIndex={1} panes={horairePanes} />
    //     </>)
    // }
    return (<>
        {/* <Bounce bottom>
            <h5><span className="bi bi-person-circle"></span> Profile</h5>
            <br /><br /> */}
            <div className="row">
                    <div className="col-12 col-lg-4">
                        <ProfileCard /> 
                         
                    </div>
                    <div className="col-12 col-lg-8">
                        <div className="mt-0 p-1"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                            {/* <Menu secondary >
                                <Menu.Item active={activeIndex == 0} className='rounded-pill p-2 m-1' size='tiny' onClick={ () => setActiveIndex(0)}>
                                <span className='text-secondary'>
                                    <span className='bi bi-person-circle'></span> Modifier
                                </span>
                                </Menu.Item>
                                <Menu.Item active={activeIndex == 1} className='rounded-pill p-2 m-1' onClick={ () => setActiveIndex(1)}>
                                <span className='text-secondary '>
                                    <span className='bi bi-eye-fill'></span> MDP
                                </span>
                                </Menu.Item>
                                <Menu.Item active={activeIndex == 2} className='rounded-pill p-2 m-1' onClick={ () => setActiveIndex(2)}>
                                <span className='text-secondary'>
                                    <span className='bi bi-clock-fill'></span> Horaire
                                </span>
                                </Menu.Item>
                                <Menu.Item active={activeIndex == 3} className='rounded-pill p-2 m-1' onClick={ () => setActiveIndex(3)}>
                                <span className='text-secondary'>
                                    <span className='bi bi-geo-alt-fill'></span> Position
                                </span>
                                </Menu.Item>
                                <Menu.Item active={activeIndex == 4} className='rounded-pill p-2 m-1' onClick={ () => setActiveIndex(4)}>
                                <span className='text-secondary'>
                                    <span className='bi bi-images'></span> Images
                                </span>
                                </Menu.Item>
                                <Menu.Item active={activeIndex == 5} className='rounded-pill p-2 m-1' onClick={ () => setActiveIndex(5)}>
                                <span className='text-secondary'>
                                    <span className='bi bi-star-half'></span> Evaluation
                                </span>
                                </Menu.Item>
                                <Menu.Item active={activeIndex == 6} className='rounded-pill p-2 m-1' onClick={ () => setActiveIndex(6)}>
                                <span className='text-secondary'>
                                    <span className='bi bi-printer-fill'></span> Imprimer
                                </span>
                                </Menu.Item>
                            </Menu> 
                            <Tab activeIndex={activeIndex} menu={{ secondary: true, pointing: true , }} panes={panes} className="no-menu-tabs" />*/}

                            <div className='border' style={{borderRadius : '10px'}}>
                                <div className='p-3 border-bottom' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-person-exclamation bi-sm'></span></div>
                                            <div className='col-9 align-self-center'> Info Generale </div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('general')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                                <div className='p-3 border-bottom' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-shield-lock bi-sm'></span></div>
                                            <div className='col-9 align-self-center'>Mot de Passe </div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('pwd')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                                <div className='p-3 border-bottom d-none' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-clock bi-sm'></span></div>
                                            <div className='col-9 align-self-center'>Horaire </div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('horaire')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                                <div className='p-3 border-bottom' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-geo-alt bi-sm'></span></div>
                                            <div className='col-9 align-self-center'>Positions</div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('position')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                                <div className='p-3 border-bottom d-none' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-images bi-sm'></span></div>
                                            <div className='col-9 align-self-center'>Images</div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('images')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                                <div className='p-3 border-bottom d-none' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-star-half bi-sm'></span></div>
                                            <div className='col-9 align-self-center'>Avis & Rating </div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('avis')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                                <div className='p-3 d-none' >
                                        <div className='row'>
                                            <div className='col-1 align-self-center'><span className='bi bi-share bi-sm'></span></div>
                                            <div className='col-4 align-self-center'> Partager Le Profile </div>
                                            <div className='col-5 align-self-center text-start'>   </div>
                                            <div className='col-2 align-self-center' onClick={() => OpenBottomSheetFunction('share')}> <span className='bi bi-arrow-right'></span> </div>
                                        </div>
                                </div>
                            </div>
                            <br />

                            <div className='card card-body border-div shadow-sm mb-4'> 
                                <h5>Deconnecter de systeme </h5>
                                <Button fluid onClick={() => LogOut()}> Decennexion </Button>
                            </div>
                        </div>
                        
                    </div>
        </div>
        {/* </Bounce> */}
        <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                <div className='card-body'>
                    {/* <SelectedItemToViewCard status={activeIndex} /> */}
                    { activeIndex =='general' ?   <EditProfile generalData={generalData} setGeneralData={setGeneralData} UpdateGeneralDataFunc={UpdateGeneralDataFunc} delegList={delegList} GetDelegList={GetDelegList} loaderState={loaderState} /> : <></> }  
                    { activeIndex == 'pwd' ?  <EditPassword passwordData={passwordData} setPasswordData={setPasswordData} UpdatePasswordFunc={UpdatePasswordFunc} loaderState={loaderState} /> : <></> }
                    { activeIndex == 'horaire' ?  <Horaire alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setTimming={setTimming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} setSelectedUpdateDay={setSelectedUpdateDay} selectedUpdateDay={selectedUpdateDay} UpdateTimmingData={UpdateTimmingData} /> : <></> }
                    { activeIndex == 'position' ?  <Location position={position} handleLocationSelected={handleLocationSelected} GetMyLocation={GetMyLocation} /> : <></> }
                    { activeIndex == 'images' ?  <ImageCard /> : <></> }
                    { activeIndex == 'avis' ?  <Tab menu={{ secondary: true, className: 'tab-right'}}  panes={RatingPanes} />  : <></> }
                    { activeIndex == 'share' ?  <PrintProfile /> : <></> }                    
                 
                 </div>
            </BottomSheet>
        <FrameForPrint frameId='printPID' src={`/App/Profile/ProfilePrint`} />
    </>);
}

export default ProfilePage;