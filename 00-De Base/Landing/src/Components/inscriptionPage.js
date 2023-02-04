import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { Select,Input ,  Button, Icon, Divider, Form, TextArea, Loader} from 'semantic-ui-react'
import GConf from '../Assets/generalConf';
import NavBar from './navBar';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { toast } from 'react-toastify';
import axios from 'axios';
// import LocationPicker from "react-leaflet-location-picker";

const GeneralUserData = ({userData, setUserData, UDL, GouvChanged}) =>{
    return(<>
    <div className='card card-body shadow-sm border-div mb-3'>
        <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-person-rolodex'></span>  معلومات عن صاحب النظام </h5>    
            <div className='row'>
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
                <div className='col-12 col-lg-6 d-none d-lg-flex align-self-center'><img src='https://cdn.abyedh.tn/images/Errors/error-log-in.png' className='img-responsive ' width='100%' height='auto'/></div>
            </div>
    </div>
    </>)
}
const GeneralProfileData = ({inscData, setInscData, PDL, GouvChanged, targetSystem}) =>{
    return(<>
        <div className='card card-body shadow-sm border-div mb-3'>
                <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-house-heart-fill'></span>  معلومات عامة </h5>
                <div className='row'>
                    <div className='col-12 col-lg-6 '> 
                        <div className='mb-2'>
                            <small> إسم المهنة </small>
                            <Input fluid icon='users' className='w-100 text-end font-droid' placeholder=' إسم المؤسسة' value={inscData.name} onChange={(e) => setInscData({...inscData, name: e.target.value })}   />
                        </div>
                        <div className='mb-2'>
                            <small> هاتف العمل </small>
                            <Input fluid icon='phone' className='w-100 '  placeholder=' رقم هاتف العمل ' value={inscData.phone} onChange={(e) => setInscData({...inscData, phone: e.target.value })}  />
                        </div>
                        <div className='mb-2'>
                            <small>  الموقع الجغرافي</small>
                            <Select placeholder='إختر ولاية' fluid className='mb-2' options={GConf.TunMap} value={inscData.gouv} onChange={(e, { value }) => GouvChanged('profile', value)} />
                        <Select placeholder='إختر منطقة' fluid options={PDL} value={inscData.deleg} onChange={(e, data) => setInscData({...inscData, deleg: data.value })} />
                        </div>
                        <div className='mb-2'>
                            <small>  العنوان</small>
                            <Form>
                                <TextArea placeholder='العنوان'  value={inscData.adresse} onChange={(e) => setInscData({...inscData, adresse: e.target.value })} />
                            </Form>
                        </div>
                    </div>
                    <div className='col-12 col-lg-6 d-none d-lg-flex align-self-center'><img src={`https://assets.abyedh.tn/img/system/ads/${targetSystem.adsImageUrl}`} className='img-responsive ' width='100%' height='200px'/></div>
                </div>
                
        </div>
    </>)
}
const Horaire = ({alwaysState, setAlwaysState, timming, setPauseDay , SetTimmingData}) =>{
    const ArabificationDate = (dateName) =>{
        switch (dateName) {
            case 'Lun' : return 'إثنين'
            break;
            case 'Mar' : return 'ثلاثاء'
            break;
            case 'Mer' : return 'إربعاء'
            break;
            case 'Jeu' : return 'خميس'
            break;
            case 'Vend' : return 'جمعة'
            break;
            case 'Sam' : return 'سبت'
            break;
            case 'Dim' : return 'أحد'
            break;

            default:
                break;
        }
    }
    const DayHoraire = (props) =>{
        return(<>
                <div className='row' >
                    <div  className='col-12 col-lg-1 align-self-center'>
                        <b>{ArabificationDate(props.data.day)}</b>
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
                    <div  className='col-12 col-lg-1 align-self-center'>
                        <div className="form-check form-switch">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setPauseDay(props.data.day,props.data.dayOff)}   />
                        </div>
                    </div>
                </div>
        </>)
    }

    return(<>
        <div className='card card-body shadow-sm mb-3 border-div'>
            <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-calendar-week-fill'></span>   أوقات العمل  </h5>
            <div className='card-body '>
                <div className='row'>
                    <div className='col-8 col-lg-11 align-self-center'> 
                        <h5 className='mb-0'>مفتوح دائما</h5>  
                        <small>عند تفعيل هذه الخاصية ستضهر في حالة مفتوح دائما </small>
                    </div>
                    <div className='col-4 col-lg-1 align-self-center'> 
                        <div className="form-check form-switch">
                            <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!alwaysState)}  checked={alwaysState} />
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='row text-danger mb-2'>
                    <div  className='col-3 col-lg-1'> <b>اليوم</b> </div>
                    <div  className='col-3 col-lg-5'> <small>صباح</small> </div>
                    <div  className='col-3 col-lg-5'> <small>مساء</small> </div>
                    <div  className='col-3 col-lg-1'> <small>راحة</small> </div>
                </div>
                
                {
                    timming.map( (data,index) => <DayHoraire key={index} data={data} />)
                }
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

    let [userData, setUserData] = useState({name :'', phone:'', birthday:Today.toISOString().split('T')[0] , gouv:'',deleg:''})
    let [inscData, setInscData] = useState({name :'', phone:'', adresse:'' , gouv:'', deleg:''})

    
    let [UDL ,setUDL] = useState([])
    let [PDL ,setPDL] = useState([])

    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"16:00"}}])
    
    let [loaderState, setLS] = useState(false)
    let [saveBtnState, setSaveBtnState] = useState(false)

    
    /* ############### UseEffect #################*/
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" })
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
    const setPauseDay = (day,state) =>{
        const targetIndex = timming.findIndex(element => element.day === day)
        let copyOfHoraire = timming
        copyOfHoraire[targetIndex].dayOff = !state
        setTimming(copyOfHoraire)
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
            else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/signup`, {
                    system : system,
                    userData : userData,
                    inscData : inscData,
                    horaireData : timming,
                    alwaysOpen : alwaysState,
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
    /* ############### Card #################*/
    
    const Location = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-3'>
                <h5 className='text-end text-secondary ' dir='rtl'> <span className='bi bi-geo-alt-fill'></span>   الموقع الجغرافي </h5>
                    {/* <MapContainer center={[36.83040,10.13280]} zoom={15} scrollWheelZoom={false} className="map-height">
                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[36.83040,10.13280]}>
                            <Popup>
                                
                            </Popup>
                        </Marker>
                    </MapContainer> */}
                    {/* <LocationPicker    /> */}
            </div>
        </>)
    }

    const BtnCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-3'>
                    <div className='row'>
                        <div className='col-12 col-lg-4'>
                                <Button size='mini' disabled={saveBtnState} icon className='rounded-pill  text-white font-droid' onClick={Inscription} fluid style={{backgroundColor: targetSystem.colorTheme}}>   <Icon name='world' /> تسجيل <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                        <div className='col-12 col-lg-8'></div>
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
                        <h3 className='text-center text-danger mb-5'> الإشتراك في {targetSystem.systemTitle} </h3>
                        <h5 className='text-info'>
                            عملية إمتلاك {targetSystem.systemTitle} تمر بمرحلتين 
                            <ul>
                                <li>1- إمتلاك حساب في منصة أبيض </li>
                                <li>2- إمتلاك حساب في  {targetSystem.systemTitle} </li>
                            </ul>
                        </h5>
                        <br />
                        <h6 className='text-secondary'> 1- إمتلاك حساب في منصة أبيض  </h6> 
                        <GeneralUserData userData={userData}  setUserData={setUserData} GouvChanged={GouvChanged} UDL={UDL} />
                        <br />
                        <h6 className='text-secondary'> 2- إمتلاك حساب في  {targetSystem.systemTitle} </h6> 
                        <GeneralProfileData inscData={inscData} setInscData={setInscData} PDL={PDL}  targetSystem={targetSystem}  GouvChanged={GouvChanged}   />
                        {/* <Location /> */}
                        <Horaire alwaysState={alwaysState} setAlwaysState={setAlwaysState} timming={timming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} />
                        <BtnCard /> 
                </div>
            </div>
        </div>
        <BottomCard /> 
    </>);
}

export default Inscription;