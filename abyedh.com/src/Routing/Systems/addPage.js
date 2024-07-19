import React, { useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import dirItem from '../../AssetsM/Item'
import axios from 'axios';
import { useEffect } from 'react';
import { Input, Select , Checkbox,  Button, Icon, Divider, Form, TextArea, Loader, Modal, Dropdown} from 'semantic-ui-react';
import { toast } from 'react-toastify';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents  } from 'react-leaflet';
import { useNavigate} from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import ReactGA from 'react-ga';
import WorldMap from '../../AssetsM/wordMap';
ReactGA.initialize('G-JHPD6D9RGH');


const MapEventsHandler = ({ onLocationSelected }) => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        onLocationSelected({ lat, lng });
      },
    });
  
    return null;
};

const GeneralUserData = ({userData, setUserData, UDL, GouvChanged, targetSystem}) =>{
    return(<>
    <div className='  card-body    border-div mb-3'>
        <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-person-rolodex'></span>  معلومات عن صاحب {targetSystem.businesName} </h5>    
            <div className='row'>
                <div className='col-12 col-lg-6 d-none d-lg-flex align-self-center'><img src='https://cdn.abyedh.com/images/Errors/error-log-in.png' className='img-responsive ' width='100%' height='auto'/></div>
                <div className='col-12 col-lg-6 '>
                    <div className='mb-2'>
                        <small>الاسم و اللقب</small>
                        <Input fluid icon='users' className='w-100 text-end' placeholder='الإسم و اللقب'  value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value })}   />
                    </div>
                    <div className='mb-2'>
                        <small> الهاتف</small>
                        <Input fluid icon='phone volume' className='w-100 ' placeholder='الهاتف' value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value })}  />
                    </div>
                    <div className='mb-2'>
                        <small>  تاريخ الولادة</small>
                        <Input type="date" fluid className='w-100 '  value={userData.birthday} onChange={(e) => setUserData({...userData, birthday: e.target.value })}  />
                    </div>
                    <div className='mb-2'>
                        <small> الجنس </small>
                        <Select placeholder='إختر جنس' fluid className='mb-2' options={[{id:"1", text:"ذكر", value:"Male"},{id:"2", text:"أنثي", value:"Femele"}]} value={userData.Sex} onChange={(e) => setUserData({...userData, Sex: e.target.value })} />
                    </div>
                    {/* <div className='mb-2'>
                        <small>  مكان الولادة </small>
                        <Select placeholder='إختر ولاية' fluid className='mb-2' options={GConf.TunMap} value={userData.gouv} onChange={(e, { value }) => GouvChanged('user', value)} />
                        <Select placeholder='إختر منطقة' fluid options={UDL} value={userData.deleg} onChange={(e, data) => setUserData({...userData, deleg: data.value })} />
                    </div> */}
                </div>
                
            </div>
    </div>
    </>)
}
const GeneralProfileData = ({inscData, setInscData, PDL, tag, GConf, GouvChanged, gouvList ,setGouvListe, targetSystem, OnKeyPressFunc}) =>{
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    //const [gouvList ,setGouvListe] = useState([])

    const GenerateGenreListe = () =>  {
       return GConf.ADIL[tag].subCateg.map(item => ({
            key: item.id.toString(),
            value: t(`landingPage.itemsToSelect.${tag}.${item.imgSrc}`),
            text: t(`landingPage.itemsToSelect.${tag}.${item.imgSrc}`),
            image: { src: `https://cdn.abyedh.com/images/Search/Land_icons/${item.imgSrc}.gif`, avatar: true }
        }));
    }
    useEffect(() => {
        GGLFunction()
    }, [])

    const GGLFunction = ()=> {
        let lastList = []
        WorldMap.states.filter(state => state.country === GConf.Country).map((data,index) => {
            lastList.push({id:index, value:data.name , text:data.name})
        })
        setGouvListe(lastList)
    }

    return(<>
        {/* <div className='card card-body shadow-sm border-div mb-3'> */}
                <h5 className={`${isRTL ? 'text-end' : 'text-start'} text-secondary `} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-house-heart-fill'></span>  { t('subscribeToSystems.infoGeneraleText', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}   </h5>
                <div className='row'>
                    <div className='col-12 col-lg-6 '> 
                        <div className='mb-2'>
                            <small> { t('subscribeToSystems.infoGeneraleData.nomEtPrenon', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}   </small>
                            <Input onKeyPress={event => OnKeyPressFunc(event)} fluid icon='users' className='w-100 text-end font-droid' placeholder={t(`landingPage.systemOwnersNames.${tag}`)} value={inscData.name} onChange={(e) => setInscData({...inscData, name: e.target.value })}   />
                        </div>
                        <small> { t('subscribeToSystems.infoGeneraleData.genreText', {  one: t(`landingPage.systemOwnersNames.${tag}`) })} </small>
                        <Dropdown
                            search
                            selection
                            fluid
                            wrapSelection={false}
                            options={GenerateGenreListe()}
                            placeholder={ t('subscribeToSystems.infoGeneraleData.genreTextPlaceholder', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}
                            className='mb-1'
                            onChange={(e, { value }) => setInscData({...inscData, Genre: value })}
                            value={setInscData.Genre}
                        />
                        <div className='mb-2'>
                            <small> {t('subscribeToSystems.infoGeneraleData.PhoneText', {  one: t(`landingPage.systemOwnersNames.${tag}`) })} </small>
                            <Input onKeyPress={event => OnKeyPressFunc(event)} fluid icon='phone' className='w-100 '  placeholder={t('subscribeToSystems.infoGeneraleData.PhoneTextPlaceholder', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}   value={inscData.phone} onChange={(e) => setInscData({...inscData, phone: e.target.value })}  />
                        </div>
                        <div className='mb-2'>
                            <small> {t('subscribeToSystems.infoGeneraleData.positionGeoText', {  one: t(`landingPage.systemOwnersNames.${tag}`) })} </small>
                            <Select placeholder={t('subscribeToSystems.infoGeneraleData.GouvDelegText')} fluid className='mb-2' options={gouvList} value={inscData.gouv} onChange={(e, { value }) => GouvChanged('profile', value)} />
                            <Dropdown
                                fluid
                                search
                                selection
                                placeholder = {t('subscribeToSystems.infoGeneraleData.GouvDelegTextPlaceholder')}
                                options={PDL}
                                value={inscData.deleg} 
                                onChange={(e, data) => setInscData({...inscData, deleg: data.value })}
                            />
                            {/* <Select placeholder={t('subscribeToSystems.infoGeneraleData.GouvDelegTextPlaceholder')} fluid options={PDL} value={inscData.deleg} onChange={(e, data) => setInscData({...inscData, deleg: data.value })} /> */}
                        </div>
                        <div className='mb-2'>
                            <small>  {t('subscribeToSystems.infoGeneraleData.AdesssText', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}</small>
                            <Form>
                                <TextArea onKeyPress={event => OnKeyPressFunc(event)} className='font-droid' placeholder={t('subscribeToSystems.infoGeneraleData.AdesssText', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}  value={inscData.adresse} onChange={(e) => setInscData({...inscData, adresse: e.target.value })} />
                            </Form>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6 d-none d-lg-flex align-self-center'><img src={`https://cdn.abyedh.com/Images/ads/${tag}.svg`} className='img-responsive ' width='100%' height='200px'/></div>
                </div>
                
        {/* </div> */}
    </>)
}
const Horaire = ({alwaysState, setAlwaysState, timming, setTimming, setPauseDay , SetTimmingData,UpdateTimmingData, setSelectedUpdateDay, selectedUpdateDay}) =>{
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    let [addInput, setAddInput] = useState(false)
    let [dateDataToChange, setDateDataToChange] = useState({pauseDay: false, matinStart:'08:00', matinFinsh:'12:00', soirStart:'14:00', soirFinsh:'18:00'})
    const weekDays = [
        { key: 'af', value: 'Lun', text: t('subscribeToSystems.HoraireData.weekDayes.lundi') },
        { key: 'ax', value: 'Mar', text: t('subscribeToSystems.HoraireData.weekDayes.mardi') },
        { key: 'al', value: 'Mer', text: t('subscribeToSystems.HoraireData.weekDayes.mercredi')},
        { key: 'dz', value: 'Jeu', text: t('subscribeToSystems.HoraireData.weekDayes.jeudi') },
        { key: 'as', value: 'Vend', text: t('subscribeToSystems.HoraireData.weekDayes.vendredi') },
        { key: 'ad', value: 'Sam', text: t('subscribeToSystems.HoraireData.weekDayes.samedi') },
        { key: 'ao', value: 'Dim', text: t('subscribeToSystems.HoraireData.weekDayes.dimanche') },
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
                        <b>{weekDays.find(day => day.value === props.data.day)?.text }</b>
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
        <div className=' '>
            <h5 className={`${isRTL ? 'text-end' : 'text-start'} text-secondary`} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-calendar-week-fill'></span>  {t('subscribeToSystems.HoraireText')} </h5>
            <div className='row'>
                <div className='col-12 col-lg-7'>
                    <div className=' '>
                        <div className='row'>
                            <div className='col-10 col-lg-9 align-self-center'> 
                                <h5 className='mb-0 text-success'> {t('subscribeToSystems.HoraireData.alwaysOpenOne')} </h5>  
                                <small> {t('subscribeToSystems.HoraireData.alwaysOpenTwo')} </small>
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
                                        <div  className='col-4 col-lg-4'> <b>{t('subscribeToSystems.HoraireData.dayText')}</b> </div>
                                        <div  className='col-4 col-lg-4'> <small>{t('subscribeToSystems.HoraireData.matinText')}</small> </div>
                                        <div  className='col-4 col-lg-4'> <small>{t('subscribeToSystems.HoraireData.soirText')}</small> </div>
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
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    return(<>
        <br />
        <div className='  mb-3'>
                <div className='row'>
                        <div className={`col-6 align-self-center ${isRTL ? 'text-end' : 'text-start'}`}><h5 className='  text-secondary ' dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt-fill'></span>  {t('subscribeToSystems.PositionGpsText')}</h5></div>
                        <div className={`col-6 align-self-center ${isRTL ? 'text-start' : 'text-end'}`}><Button icon='map pin' className='rounded-circle' onClick={() => GetMyLocation()}></Button></div>
                </div> 
                
                <small className='mb-3' dir={isRTL ? 'rtl' : 'ltr'}> {t('subscribeToSystems.PositionGpsClickHereText')} </small>
                <MapContainer center={[position.Lat,position.Lng]} zoom={5} scrollWheelZoom={false} className="map-height  border-div">
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

function ProfileAction() {

    /* ############### Const #################*/
    let {tag,PID} = useParams()
    let UID = localStorage.getItem('UID')
    let [clientActivated, setClientActivated] = useState(false)
    
    let {system} = tag
    const Today = new Date()
    const targetSystem = GConf.ADIL[tag]
    let [okayForCondition , setOkayForCondition] = useState(false)
    let [test , setTest] = useState(10)

    let [userData, setUserData] = useState({name :'', phone:'', birthday:Today.toISOString().split('T')[0] , gouv:'',deleg:''})
    let [inscData, setInscData] = useState({name :'', phone:'', adresse:'' , gouv:'', deleg:'', Country: GConf.Country})

    
    let [UDL ,setUDL] = useState([])
    let [PDL ,setPDL] = useState([])

    let [selectedUpdateDay , setSelectedUpdateDay] = useState('Lun')
    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}}])
    
    let [loaderState, setLS] = useState(false)
    let [saveBtnState, setSaveBtnState] = useState(false)
    
    let [gouvList ,setGouvListe] = useState([])
    const defPosition = WorldMap.worldCountries.filter(state => state.value === GConf.Country)
    let [position, setPosition] = useState({Lat: defPosition[0].lat, Lng: defPosition[0].lng})
    let [openModal,setOpenMoadal] = useState(false)

    const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /* ############### UseEffect #################*/
        useEffect(() => {
            window.scrollTo(0, 0);
            if (GConf.UserData.Logged) {
                setUserData({name :GConf.UserData.UData.Name , phone:GConf.UserData.UData.PhoneNum , Sex :GConf.UserData.UData.Sex , birthday: GConf.UserData.UData.BirthDay , gouv: GConf.UserData.UData.BirthGouv ,deleg: GConf.UserData.UData.BirthDeleg}) 
            }
            const defPosition = WorldMap.worldCountries.filter(state => state.value === GConf.Country)
             
            setPosition({Lat: defPosition[0].lat, Lng: defPosition[0].lng})
            // axios.post(`${GConf.ApiLink}/systems/fromfcb`,{
            //     PID :GConf.PID,
            //     isFromFcb: localStorage.getItem('userEnter') ? localStorage.getItem('userEnter')  : Math.floor(Math.random() * (999999 - 111111 + 1)) + 111111,
            //     Genre: tag
            // })
            // .then(function (response) {
            //     //if (!localStorage.getItem('userEnter')) { localStorage.setItem('userEnter', response.data.Req_ID); }
            // }).catch((error) => {
            // if(error.request) {
            //      console.log('error-52478')
            // }
            // });

            //ReactGA.pageview(window.location.pathname);
            //if (localStorage.getItem('AddToDirectory')) {window.location.href = "/S/I";}
            //window.scrollTo(0, 0);
            // axios.post(`${GConf.ApiLink}/systems/check`, {
            //     tag: tag,
            //     PID:PID,
            // })
            // .then(function (response) {
            //    if (response.data.Activated == 'true') {
            //     setClientActivated(true)
            //    }
            // })
            }, [])

    /* ############### Functions #################*/
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );
    const OnKeyPressFunc = (e) => {
        const charCode = e.charCode || e.keyCode;
        if (!((charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode === 42 || charCode === 32 || charCode === 47 || (charCode >= 0x0600 && charCode <= 0x06FF))) {
            e.preventDefault();
        }
    }

    const GouvChanged = (genre,value) =>{
        if (genre == 'user') {
            setUserData({...userData, gouv: value })
            //const found = GConf.abyedhMap.Deleg.filter(element => element.key === value)
            const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
            let lastList1 = []
            found.map((data,index) => {
                lastList1.push({id:index, value:data.name , text:data.name})
            })
            setUDL(lastList1)

           
        } else {
            setInscData({...inscData, gouv: value })
            //const found = GConf.abyedhMap.Deleg.filter(element => element.tag === value)
            const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
            let lastList1 = []
            found.map((data,index) => {
                lastList1.push({id:index, value:data.name , text:data.name})
            })
            setPDL(lastList1)
            const gouvCord = WorldMap.states.filter(state => state.country === GConf.Country).filter(element => element.name === value)
             
            setPosition({Lat: gouvCord[0].lat, Lng: gouvCord[0].lng})
        }
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
    const  handleClick = (targetSystem) => {
        ReactGA.event({
          category: targetSystem,
          action: 'SystemGenre',
          label: targetSystem
        });
    }

    const Inscription = () =>{
            
            handleClick(tag)
            if (!userData.name || userData.name == '') {toast.error("أدخل إسم و لقب المستخدم !", GConf.TostErrorGonf)}
            else if (!userData.phone || userData.phone == '' ) {toast.error("أدخل هاتف المستخدم !", GConf.TostErrorGonf)}
            else if (!userData.birthday || userData.birthday == '' ) {toast.error("أدخل تاريخ ميلاد المستخدم !", GConf.TostErrorGonf)}
            //else if (!userData.Sex || userData.Sex == '' ) {toast.error("أدخل جنس المستخدم !", GConf.TostErrorGonf)}
            //else if (!userData.gouv || userData.gouv == '' ) {toast.error("أدخل  ولاية المستخدم !", GConf.TostErrorGonf)}
            //else if (!userData.deleg || userData.deleg == '' ) {toast.error("أدخل  مدينة المستخدم !", GConf.TostErrorGonf)}
            else if (!inscData.name || inscData.name == '' ) {toast.error("أدخل  إسم العمل ", GConf.TostErrorGonf)}
            else if (!inscData.phone || inscData.phone == '' ) {toast.error("أدخل  هاتف العمل ", GConf.TostErrorGonf)}
            else if (!inscData.adresse || inscData.adresse == '' ) {toast.error("أدخل  عنوان العمل ", GConf.TostErrorGonf)}
            else if (!inscData.gouv || inscData.gouv == '' ) {toast.error("أدخل  ولاية العمل ", GConf.TostErrorGonf)}
            else if (!inscData.deleg || inscData.deleg == '' ) {toast.error("أدخل  مدينة العمل ", GConf.TostErrorGonf)}
            else if (!timming) {toast.error("أدخل أوقات العمل  !", GConf.TostErrorGonf)}
            else if (!okayForCondition ) {toast.error("يحب أن توافق علي شروط الأستخدام ", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/systems/save`, {
                    system : tag,
                    userData : userData,
                    UID : GConf.UserData.UData.UID,
                    inscData : inscData,
                    horaireData : timming,
                    alwaysOpen : alwaysState,
                    position : position,
                    addTodirectory : localStorage.getItem('AddToDirectory') ? localStorage.getItem('AddToDirectory')  : false
                }).then(function (response) {
                    if(response.data.PID) {
                        if (!localStorage.getItem('AddToDirectory')) { localStorage.setItem('AddToDirectory', response.data.Req_ID); }
                        localStorage.setItem('removedCard', new Date(new Date().setDate(new Date().getDate() + 5)).toLocaleDateString('fr-FR'));
                        setSaveBtnState(true)
                        setLS(false)
                        //setOpenMoadal(true)
                        localStorage.setItem('PID', response.data.PID);
                        localStorage.setItem('APP_TAG', tag);
                        window.location.href = `/App/Login/${tag}`
                    }
                    else{
                        toast.error('حاول مرة أخري', GConf.TostSuucessGonf)
                        setLS(false)
                    }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>مشكل في الإتصال</h5> لم نتمكن من الوصول لقاعدة البيانات </div></>, GConf.TostInternetGonf)   
                      setLS(false)
                    }
                  });
                
            }
    }
    const MapEventsHandler = ({ onLocationSelected }) => {
        useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            onLocationSelected({ lat, lng });
          },
        });
      
        return null;
    };

    const handleLocationSelected = (location) => {
        setPosition({Lat: location.lat , Lng:location.lng})
    };

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
    function findElementByLink(link) {
        for (const category in dirItem) {
          if (dirItem[category] && dirItem[category].slides) {
            for (const slide of dirItem[category].slides) {
              if (Array.isArray(slide)) {
                for (const subSlide of slide) {
                  if (subSlide.link === link) {
                    return subSlide.name
                  }
                }
              } else if (slide.link === link) {
                return slide.name
              }
            }
          }
        }
        return null;
    }

    /* ############### Card #################*/
    const TopNavBar = () =>{
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to={`/S/I/user/${tag}`} className="navbar-brand border-div m-0 p-0 ms-3">
                    {/* <div  className="d-lg-none d-inline-block text-white p-1"  > <span className='bi bi-arrow-right-short bi-md ' ></span> </div> */}
                    {/* <span className='bi bi-person-circle bi-md text-white'></span> */}
                    {/* <img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} /> */}
                </NavLink>
            </>)
        }
        return(<>
                <nav className="p-2 fixed-top navshad" style={{backgroundColor:GConf.ADIL[tag].themeColor}}>
                    <div className='row'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to={`/S/L/${tag}`} className="m-0 p-0 ms-3">
                                <img  className="border-div-s d-none d-lg-inline" src="https://cdn.abyedh.com/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px',borderRadius: '10px 20px 10px 50px'}} />
                                <div  className="d-lg-none d-inline-block text-white p-1"  > <span className='bi bi-arrow-left-short bi-md ' ></span> </div>
                            </NavLink>
                        </div>
                        <div className='col-6 text-end align-self-center'>
                            {localStorage.getItem('AddToDirectory') ? <UserCard />  : <></>}
                        </div>
                    </div>
                </nav>
            </>)
    }


    const BtnCard = () =>{
        return(<>
            
            <div className='  card-body   mb-3 border-div'>
            <h5 className={` ${isRTL ? 'text-end' : 'text-start'} text-secondary `} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-save'></span> {t('subscribeToSystems.InscriptionLastText')} </h5>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <div className='text-secondary'>
                            <ul>
                                <li>  {t('subscribeToSystems.InscriptionLast.firstCondition')} </li>
                                <li>   {t('subscribeToSystems.InscriptionLast.secondCondition')} </li>
                                <li> <span className='bi bi-exclamation-triangle-fill text-danger'></span> {t('subscribeToSystems.InscriptionLast.thirdCondition')} </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-12 col-lg-4 align-self-center'>
                            <div className='row mb-3'>
                            <div className={`col-8  ${isRTL ? 'order-1 text-end' : '  text-start'}`}> {t('subscribeToSystems.InscriptionLast.okayCondition')} </div>
                            <div className={`col-2  ${isRTL ? 'order-2 text-end' : '  text-start'}`}>
                                    <Checkbox
                                        onChange={(e, data) => setOkayForCondition(data.checked)}
                                        checked={okayForCondition}
                                    />
                                </div>
                               
                            </div>   
                            
                            <Button   disabled={saveBtnState} icon className='rounded-pill  text-white font-droid' onClick={Inscription} fluid style={{backgroundColor:GConf.ADIL[tag].themeColor}}>   <Icon name='world' /> {t('subscribeToSystems.InscriptionLast.InscriptionButtonText')} <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
                </div>
            </div>
        </>)
    }
    const BottomCard = () =>{
        return(<>
            <NavLink exact='true' to={`/S/I/user/${tag}`}  >
                <div className='card card-body border-div shadow-sm bg-white'  >
                    <div className='row ' style={{color:GConf.ADIL[tag].themeColor}}>
                        <div className='col-2  align-self-center text-end'>
                            <span className='bi bi-arrow-right-short bi-md'></span>
                        </div>
                        <div className='col-8 align-self-center  text-center'>
                            <h5>  متابعة عملية التسجيل </h5> 
                        </div>
                        <div className='col-2 align-self-center  text-end'>
                            <span className='bi bi-person-circle bi-md'></span>
                        </div>
                    </div>
                </div>
            </NavLink>
            <br />
            
        </>)
    }

    const UserCard = () =>{
        return(<>
            <NavLink exact='true' to={`/S/I/user/${tag}`}  >
                <div className='card card-body border-div shadow-sm'>
                    <div className='row' dir='rtl'>
                        <div className='col-2 align-self-center text-secondary'><span className='bi bi-arrow-right'></span></div>
                        <div className='col-8 align-self-center text-secondary' dir={isRTL ? 'rtl' : 'ltr'}><b> {t('subscribeToSystems.inscriptionUserWith')}  : {GConf.UserData.UData.Name}</b></div>
                        <div className='col-2'><img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} /></div>
                    </div>
                </div>
            </NavLink>
        </>)
    }
    return ( <>
        <TopNavBar />
        <br />
        <br />
        <br />
        <br />
        <div className='container container-lg font-droid' dir={isRTL ? 'rtl' : 'ltr'}>
            {GConf.UserData.Logged ? 
                <>
                 {/* {localStorage.getItem('AddToDirectory') ? <BottomCard />  : <></>} */}
                 <h3 className='text-center ' style={{color:targetSystem.themeColor}}> { t('subscribeToSystems.mainTitle', {  one: t(`landingPage.systemOwnersNames.${tag}`) })}   </h3>
                 <br /><UserCard /> <br />
                 {/* <h4 className='text-secondary'>1- منصة أبيض هي محرك بحث شامل تنجم تلقي فيه العديد من أصحاب الخدمات و نقاط البيع  و تنجم تتواصل معاهم باش تتمتع بخدماتهم و منتجاتهم  </h4>
                 <h4 className='text-secondary'>2- في المقابل توفر المنصة لأصحاب الخدمات و نقاط البيع هاذم أنظمة لإدارة الأعمال متاعهم و تساعدهم كذلك في التعريف بأنفسهم و بأعمالهم من أجل الوصل أكثر لعملائهم  ...</h4>
                 <h4 className='text-secondary'>3-  كانك من أصحاب الخدمات و نقاط البيع تنجم تسجل معانا و تتحصل علي منصة مجانية تعاونك  تستقبل الطلبات متاعك و تقوم بتنظيمها   ...</h4>
                   */}

                 {/* {GConf.UserData.Logged ? <UserCard />  : <GeneralUserData userData={userData}  setUserData={setUserData} GouvChanged={GouvChanged} UDL={UDL} targetSystem={targetSystem} />} */}
                 
                  
                 <div className='  card-body   border-div mb-3'>
                    <GeneralProfileData OnKeyPressFunc={OnKeyPressFunc} tag={tag} GConf={GConf} inscData={inscData} setInscData={setInscData} PDL={PDL}  targetSystem={targetSystem}  GouvChanged={GouvChanged}  gouvList={gouvList} setGouvListe={setGouvListe}  />
                    <Location position={position} handleLocationSelected={handleLocationSelected} GetMyLocation={GetMyLocation} />
                    <Horaire alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setTimming={setTimming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} setSelectedUpdateDay={setSelectedUpdateDay} selectedUpdateDay={selectedUpdateDay} UpdateTimmingData={UpdateTimmingData} />
                 </div>
                 <BtnCard /> 
                </>
                :    
                <div className='text-center p-2 text-secondary'>
                    <div className='row'>
                        <div className='col-12 col-lg-4 align-self-center text-center'><img src='https://cdn.abyedh.com/Images/required/log-in.png' className='img-responsive mb-4'  width='100%' height='auto' /></div> 
                        <div className='col-12 col-lg-8 align-self-center text-center'>
                            <h3 className='text-danger'> {t('subscribeToSystems.shouldLogInData.shouldText')} </h3> 
                            <h5> { t('subscribeToSystems.shouldLogInData.detailText', {  one: t(`landingPage.systemNames.${tag}`) })} </h5> 
                            <h5  className="btn  w-100 p-3 rounded-pill border shadow-sm text-danger"><NavLink exact='true' to='/Profile/signUp' dir={isRTL ? 'rtl' : 'ltr'}>  <b className='text-danger'> {t('subscribeToSystems.shouldLogInData.clicLink')} </b> <span className='bi bi-arrow-right-circle-fill text-danger ms-3'></span> </NavLink></h5>
                        </div> 
                    </div>      
                </div>
            }
        </div>  
        <Modal
                onClose={() => setOpenMoadal(false)}
                onOpen={() => setOpenMoadal(true)}
                open={openModal}
                dimmer= 'blurring'
                    
                >
                <Modal.Content  >
                        <h1 className='text-center bi bi-clipboard-check-fill bi-lg text-success'></h1>
                        <h4 className='text-center text-success'> {t('subscribeToSystems.successModalData.operationR')} </h4>
                        <h4 className='text-center text-سثؤخىيضقغ'> {t('subscribeToSystems.successModalData.cliquerPourPasser')} </h4>
                        <Button fluid className='rounded-pill' onClick={() => navigate(`/S/I/user/${tag}`)}> {t('subscribeToSystems.successModalData.followPage')} </Button>
                </Modal.Content>
        </Modal>
        <br />
        <br />

    </> );
}

export default ProfileAction;