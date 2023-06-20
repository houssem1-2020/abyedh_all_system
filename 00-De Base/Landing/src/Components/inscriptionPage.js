import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Select,Input , Checkbox,  Button, Icon, Divider, Form, TextArea, Loader} from 'semantic-ui-react'
import GConf from '../Assets/generalConf';
import NavBar from './navBar';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents  } from 'react-leaflet';
import { toast } from 'react-toastify';
import axios from 'axios';
// import LocationPicker from "react-leaflet-location-picker";
import ReactGA from 'react-ga';

const GeneralUserData = ({userData, setUserData, UDL, GouvChanged, targetSystem}) =>{
    return(<>
    <div className='card card-body shadow-sm border-div mb-3'>
        <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-person-rolodex'></span>  معلومات عن صاحب {targetSystem.businesName} </h5>    
            <div className='row'>
                <div className='col-12 col-lg-6 d-none d-lg-flex align-self-center'><img src='https://cdn.abyedh.tn/images/Errors/error-log-in.png' className='img-responsive ' width='100%' height='auto'/></div>
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
                        <small>  مكان الولادة </small>
                        <Select placeholder='إختر ولاية' fluid className='mb-2' options={GConf.TunMap} value={userData.gouv} onChange={(e, { value }) => GouvChanged('user', value)} />
                        <Select placeholder='إختر منطقة' fluid options={UDL} value={userData.deleg} onChange={(e, data) => setUserData({...userData, deleg: data.value })} />
                    </div>
                </div>
                
            </div>
    </div>
    </>)
}
const GeneralProfileData = ({inscData, setInscData, PDL, GouvChanged, targetSystem}) =>{
    return(<>
        {/* <div className='card card-body shadow-sm border-div mb-3'> */}
                <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-house-heart-fill'></span>  معلومات عامة عن {targetSystem.businesName}  </h5>
                <div className='row'>
                    <div className='col-12 col-lg-6 '> 
                        <div className='mb-2'>
                            <small> إسم {targetSystem.businesName} </small>
                            <Input fluid icon='users' className='w-100 text-end font-droid' placeholder={`${targetSystem.businesName}`} value={inscData.name} onChange={(e) => setInscData({...inscData, name: e.target.value })}   />
                        </div>
                        <div className='mb-2'>
                            <small> رقم الهاتف  </small>
                            <Input fluid icon='phone' className='w-100 '  placeholder={` رقم هاتف ${targetSystem.businesName}`}   value={inscData.phone} onChange={(e) => setInscData({...inscData, phone: e.target.value })}  />
                        </div>
                        <div className='mb-2'>
                            <small>  الموقع الجغرافي</small>
                            <Select placeholder='إختر ولاية' fluid className='mb-2' options={GConf.TunMap} value={inscData.gouv} onChange={(e, { value }) => GouvChanged('profile', value)} />
                        <Select placeholder='إختر منطقة' fluid options={PDL} value={inscData.deleg} onChange={(e, data) => setInscData({...inscData, deleg: data.value })} />
                        </div>
                        <div className='mb-2'>
                            <small>  عنوان {targetSystem.businesName} </small>
                            <Form>
                                <TextArea placeholder='العنوان'  value={inscData.adresse} onChange={(e) => setInscData({...inscData, adresse: e.target.value })} />
                            </Form>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6 d-none d-lg-flex align-self-center'><img src={`https://assets.abyedh.tn/img/system/ads/${targetSystem.adsImageUrl}`} className='img-responsive ' width='100%' height='200px'/></div>
                </div>
                
        {/* </div> */}
    </>)
}
const Horaire = ({alwaysState, setAlwaysState, timming, setPauseDay , SetTimmingData,UpdateTimmingData, setSelectedUpdateDay, selectedUpdateDay}) =>{
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
    const DayHoraireOLD = (props) =>{
        return(<>
                <div className='row mb-1' >
                    <div  className='col-6 col-lg-3 order-1 order-lg-1 align-self-center mb-2'>
                        <b>{ArabificationDate(props.data.day)}</b>
                    </div>
                    <div  className='col-12 col-lg-4 order-2'>
                        <div className='row'>
                            <div className='col-6'><Input  type='time' size='mini'   disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.matin.start} onChange={(e) => SetTimmingData(props.data.day,'matin','start',e.target.value)} /></div>
                            <div className='col-6'><Input  type='time' size="mini"   disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.matin.end} onChange={(e) => SetTimmingData(props.data.day,'matin','end',e.target.value)}/></div>
                        </div>
                    </div>
                    <div  className='col-12 col-lg-4 order-3'>
                        <div className='row'>
                            <div className='col-6'><Input  type='time' size="mini"   disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.soir.start} onChange={(e) => SetTimmingData(props.data.day,'soir','start',e.target.value)}/></div>
                            <div className='col-6'><Input  type='time' size="mini"   disabled={props.data.dayOff}  fluid className='mb-1 w-100' defaultValue={props.data.soir.end} onChange={(e) => SetTimmingData(props.data.day,'soir','end',e.target.value)} /></div>
                        </div>
                    </div>
                    <div  className='col-6 col-lg-1 align-self-center order-1 order-lg-4 mb-2'>
                        <div className="form-check form-switch">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setPauseDay(props.data.day,props.data.dayOff)}   />
                        </div>
                    </div>
                </div>
        </>)
    }
    const DayHoraire = (props) =>{
        return(<>
                <div className={`row mb-1 ${props.data.dayOff ? 'd-none':''}`}>
                    <div  className='col-4 col-lg-4 '>
                        <b>{ArabificationDate(props.data.day)}</b>
                    </div>
                    <div  className='col-4 col-lg-4  '>
                        <small>{props.data.matin.start} -- {props.data.matin.end}</small>
                    </div>
                    <div  className='col-4 col-lg-4  '>
                    <small>{props.data.soir.start} -- {props.data.soir.end}</small>
                    </div>
                </div>
        </>)
    }

    return(<>
        <br />
        <br />
        <br />
        <div className='card-body'>
            <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-calendar-week-fill'></span>   أوقات العمل  </h5>
            <div className='row'>
                <div className='col-12 col-lg-7'>
                    <div className='card-body'>
                        <div className='row'>
                            <div className='col-8 col-lg-9 align-self-center'> 
                                <h5 className='mb-0'>مفتوح دائما</h5>  
                                <small>عند تفعيل هذه الخاصية ستضهر في حالة مفتوح دائما </small>
                            </div>
                            <div className='col-4 col-lg-3  align-self-center '> 
                                <div className="form-check form-switch">
                                    <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!alwaysState)}  checked={alwaysState} />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row text-danger mb-2'>
                            <div  className='col-4 col-lg-4'> <b>اليوم</b> </div>
                            <div  className='col-4 col-lg-4'> <small>صباح</small> </div>
                            <div  className='col-4 col-lg-4'> <small>مساء</small> </div>
                        </div>
                        
                        {
                            timming.map( (data,index) => <DayHoraire key={index} data={data} />)
                        }
                    </div>
                </div>
                <div className='col-12 col-lg-5'>
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

function Inscription() {
    /* #######################[Const]############################### */
    let topRef = useRef(20)
    let {system} = useParams()
    const Today = new Date()
    const targetSystem = GConf.landing[system]
    let [okayForCondition , setOkayForCondition] = useState(false)
    let [test , setTest] = useState(10)

    let [userData, setUserData] = useState({name :'', phone:'', birthday:Today.toISOString().split('T')[0] , gouv:'',deleg:''})
    let [inscData, setInscData] = useState({name :'', phone:'', adresse:'' , gouv:'', deleg:''})

    
    let [UDL ,setUDL] = useState([])
    let [PDL ,setPDL] = useState([])

    let [selectedUpdateDay , setSelectedUpdateDay] = useState('Lun')
    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}}])
    
    let [loaderState, setLS] = useState(false)
    let [saveBtnState, setSaveBtnState] = useState(false)

    let [position, setPosition] = useState({Lat: 36.83040, Lng: 10.13280})

    
    /* ############### UseEffect #################*/
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" })
        ReactGA.pageview(window.location.pathname);
    }, [])

    /* ############### Functions #################*/
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon );

    const GouvChanged = (genre,value) =>{
        if (genre == 'user') {
            setUserData({...userData, gouv: value })
            const found = GConf.TunDeleg2.filter(element => element.key === value)
            setUDL(found)
        } else {
            setInscData({...inscData, gouv: value })
            const found = GConf.TunDeleg2.filter(element => element.key === value)
            setPDL(found)
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
    const Inscription = () =>{
            if (!userData.name || userData.name == '') {toast.error("أدخل إسم و لقب المستخدم !", GConf.TostErrorGonf)}
            else if (!userData.phone || userData.phone == '' ) {toast.error("أدخل هاتف المستخدم !", GConf.TostErrorGonf)}
            else if (!userData.birthday || userData.birthday == '' ) {toast.error("أدخل تاريخ ميلاد المستخدم !", GConf.TostErrorGonf)}
            else if (!userData.gouv || userData.gouv == '' ) {toast.error("أدخل  ولاية المستخدم !", GConf.TostErrorGonf)}
            else if (!userData.deleg || userData.deleg == '' ) {toast.error("أدخل  مدينة المستخدم !", GConf.TostErrorGonf)}
            else if (!inscData.name || inscData.name == '' ) {toast.error("أدخل  إسم العمل ", GConf.TostErrorGonf)}
            else if (!inscData.phone || inscData.phone == '' ) {toast.error("أدخل  هاتف العمل ", GConf.TostErrorGonf)}
            else if (!inscData.adresse || inscData.adresse == '' ) {toast.error("أدخل  عنوان العمل ", GConf.TostErrorGonf)}
            else if (!inscData.gouv || inscData.gouv == '' ) {toast.error("أدخل  ولاية العمل ", GConf.TostErrorGonf)}
            else if (!inscData.deleg || inscData.deleg == '' ) {toast.error("أدخل  مدينة العمل ", GConf.TostErrorGonf)}
            else if (!timming) {toast.error("أدخل أوقات العمل  !", GConf.TostErrorGonf)}
            else if (!okayForCondition ) {toast.error("يحب أن توافق علي شروط الأستخدام ", GConf.TostErrorGonf)}
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/signup`, {
                    system : system,
                    userData : userData,
                    inscData : inscData,
                    horaireData : timming,
                    alwaysOpen : alwaysState,
                    position : position,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        setSaveBtnState(true)
                        toast.success("تم التسجيل !", GConf.TostSuucessGonf)
                        setLS(false)
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
    /* ############### Card #################*/
    
    const Location = () =>{
        return(<>
            <br />
            <br />
            <br />
            <div className='  mb-3'>
                    <div className='row'>
                            <div className='col-6 align-self-center text-end'><h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-geo-alt-fill'></span>   الموقع الجغرافي </h5></div>
                            <div className='col-6 align-self-center text-start'><Button icon='map pin' className='rounded-circle' onClick={() => GetMyLocation()}></Button></div>
                    </div> 
                    
                    <small className='mb-3'> قم بالنقر علي الزر لتحديد مكانك الحاليا إفتراضيا  </small>
                    <MapContainer center={[position.Lat,position.Lng]} zoom={15} scrollWheelZoom={false} className="map-height cursor-map-crosshair border-div">
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapEventsHandler onLocationSelected={handleLocationSelected} />
                        <Marker position={[position.Lat,position.Lng]}>
                            <Popup>
                                
                            </Popup>
                        </Marker>
                    </MapContainer> 
                    {/* <LocationPicker    />*/}
            </div>
        </>)
    }

    const BtnCard = () =>{
        return(<>
            
            <div className='card card-body shadow-sm mb-3 border-div'>
            <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-save'></span>  تسجيل  </h5>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <div className='text-secondary'>
                            <ul>
                                <li> بعد إستكمال التسجيل سنحاول الإتصال بكم في أقرب وقت ممكن من أجل مساعدتكم في عملية تثبيت النظام </li>
                                <li> <span className='bi bi-exclamation-triangle-fill text-danger'></span> أي طلب تسجيل يحتوي علي معلومات خاطئة أو مضللة سيلغي آليا </li>
                            </ul>
                        </div>
                    </div>
                    <div className='col-12 col-lg-4 align-self-center'>
                            <div className='row mb-3'>
                                <div className='col-2 text-end'>
                                    <Checkbox
                                        onChange={(e, data) => setOkayForCondition(data.checked)}
                                        checked={okayForCondition}
                                    />
                                </div>
                                <div className='col-8 text-end'>موافق </div>
                            </div>   
                            
                            <Button size='mini' disabled={saveBtnState} icon className='rounded-pill  text-white font-droid' onClick={Inscription} fluid style={{backgroundColor: targetSystem.colorTheme}}>   <Icon name='world' /> تسجيل <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
                </div>
            </div>
        </>)
    }
    const BottomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card' style={{backgroundColor: targetSystem.colorTheme}}>
                <div className='row'>
                    <div className='col-12 col-lg-4 align-self-center d-none d-lg-block text-end'>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'> +216 96787676  - <span className='bi bi-telephone-outbound-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  abyedh@abyedh.tn -  <span className='bi bi-mailbox2' ></span></NavLink></div>
                        <div className='d-inline mt-2'>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-facebook bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-youtube bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-app-indicator bi-md' ></span></NavLink></div>
                        </div>
                    </div>
                    <div className='col-7 col-lg-4 align-self-center text-end'>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  ماهي  رؤية منصة أبيض  - <span className='bi bi-patch-question-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  كيف استعمل المنصة  -  <span className='bi bi-brush-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'> من نحن ؟  -  <span className='bi bi-people-fill' ></span> </NavLink></div>
                    </div>
                    <div className='col-5 col-lg-4 align-self-center text-center'>
                        <img  className="rounded-pill-abyedh" src="https://cdn.abyedh.tn/images/logo/mlogo.gif" alt="Logo" style={{width:'40px', height:'90px'}} />
                    </div>
                </div>
            </div>
        </>)
    }
    return (<> 
        <NavBar landing color={targetSystem.colorTheme} />
        <div ref={topRef} />
        <br />
        <br />
        <br />
        <br />
        <div className='container font-droid' dir="rtl">
            <div className='row justify-content-center mb-4'>
                <div className='col-12 col-lg-9'>
                        <h2 className='text-center text-danger mb-5 font-hs-d mt-3'> الإشتراك في {targetSystem.systemTitle} </h2>
                        <h4 style={{color : targetSystem.colorTheme}}>
                            عملية إمتلاك {targetSystem.systemTitle} تمر بمرحلتين 
                        </h4>
                        <br />
                        <h6 className='text-secondary font-hs-n me-5 mb-2'> 1- إمتلاك حساب في منصة أبيض  (<a href='https://abyedh.tn/' target='c_blank' >abyedh.tn</a>) </h6> 
                        <small className='text-secondary me-5 mb-4 ' > سيمكنك هذا الحساب من التحكم في {targetSystem.systemTitle} </small> 
                        <br />
                        <GeneralUserData userData={userData}  setUserData={setUserData} GouvChanged={GouvChanged} UDL={UDL} targetSystem={targetSystem} />
                        <br />
                        <h6 className='text-secondary font-hs-n me-5 mb-3 '> 2- إمتلاك حساب في  {targetSystem.systemTitle} </h6> 
                        <div className='card card-body shadow-sm border-div mb-3'>
                            <GeneralProfileData inscData={inscData} setInscData={setInscData} PDL={PDL}  targetSystem={targetSystem}  GouvChanged={GouvChanged}   />
                            <Location />
                            <Horaire alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} setSelectedUpdateDay={setSelectedUpdateDay} selectedUpdateDay={selectedUpdateDay} UpdateTimmingData={UpdateTimmingData} />
                        </div>
                        <BtnCard /> 
                </div>
            </div>
        </div>
        <BottomCard /> 
    </>);
}

export default Inscription;