import React, { useEffect, useRef, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Select, Divider, Loader, Input, Icon } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import GConf from '../../../AssetsM/APPConf';
import { toast } from 'react-toastify';
import SKLT from '../../../../AssetsM/Cards/usedSlk';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import timeGridPlugin from '@fullcalendar/timegrid';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

const Horaire = ({alwaysState, setAlwaysState, timming, addInput, setAddInput, setTimming, setPauseDay , SetTimmingData,UpdateTimmingData, setSelectedUpdateDay, selectedUpdateDay}) =>{
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

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
                <div className={`row  mb-1 ${props.data.dayOff ? 'text-danger':''}`} dir={isRTL ? 'rtl' : 'ltr'}>
                    <div  className='col-3 col-lg-3 m-0 p-1'>
                        <b>{t(`appPages.horairePage.weekDayes.${props.data.day}`)}</b>
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
    
    return(<>
        <br />
        <div className=' ' dir={isRTL ? 'rtl' : 'ltr'}>
            <h5 className={`${isRTL ? 'text-end' : 'text-start'} text-secondary `} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-calendar-week-fill'></span>  {t('appPages.horairePage.title')}  </h5>
            <div className='row'>
                <div className='col-12 col-lg-12'>
                    <div className=' '>
                        <div className='row'>
                            <div className='col-10 col-lg-9 align-self-center'> 
                                <h5 className='mb-0 text-success'> {t('appPages.horairePage.alwaysOpenOne')} </h5>  
                                <small>  {t('appPages.horairePage.alwaysOpenTwo')}  </small>
                            </div>
                            <div className='col-2 col-lg-3  align-self-center '> 
                                <div className="form-check form-switch">
                                    <input className="form-check-input form-check-input-lg" type="checkbox"  onChange={() => setAlwaysState(!alwaysState)}  checked={alwaysState} />
                                </div>
                            </div>
                        </div>
                        <Divider />
                        <div className='row text-secondary mb-2'>
                            <div  className='col-4 col-lg-4'> <b>{t('appPages.horairePage.seancesText.dayText')}</b> </div>
                            <div  className='col-4 col-lg-4'> <small>{t('appPages.horairePage.seancesText.matinText')}</small> </div>
                            <div  className='col-4 col-lg-4'> <small>{t('appPages.horairePage.seancesText.soirText')}</small> </div>
                        </div>
                        
                        {
                            timming.map( (data,index) => <DayHoraire key={index} data={data} />)
                        }
                        
                    </div>
                </div>
                 
            </div>
            
        </div>
    </>)
}

function MessagesPages() {
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [openD, setOpenD] = useState(false)
     
    /*Horiare */
    const [horaireData, setHoraireData] = useState([])
    //const [alwaysState , setAlwaysState] = useState(false)
    const [delegList ,setDelegList] = useState([])
    let [selectedUpdateDay , setSelectedUpdateDay] = useState('Lun')
    let [alwaysState , setAlwaysState] = useState(false)
    let [timming, setTimming] = useState([{day:"Lun",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mar",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Mer",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Jeu",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Vend",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Sam",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}},{day:"Dim",dayOff:false,matin:{start:"08:00",end:"12:00"},soir:{start:"14:00",end:"18:00"}}])
    let [test , setTest] = useState(10)
    let [addInput, setAddInput] = useState(false)
    let [dateDataToChange, setDateDataToChange] = useState({pauseDay: false, matinStart:'08:00', matinFinsh:'12:00', soirStart:'14:00', soirFinsh:'18:00'})
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /*###############################[UseEffect]################################# */
    useEffect(() => {
        window.scrollTo(0, 0);
  
        axios.post(`${GConf.ApiLink}/profile`, {
            PID: GConf.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) {
             
            if (response.data.horaire[0]) { setAlwaysState(response.data.horaire[0].ALL_Time) } else { }
            if (response.data.horaire[0]) { setHoraireData(JSON.parse(response.data.horaire[0].WorkingTime)) } else { }

             
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              
            }
        });
    }, [])
     
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
    const UpdateTimingFunc = () =>{
        const targetIndex = timming.findIndex(element => element.day === selectedUpdateDay)
        let copyOfHoraire = timming
        copyOfHoraire[targetIndex] = {day: selectedUpdateDay , dayOff: dateDataToChange.pauseDay , matin:{start: dateDataToChange.matinStart ,end: dateDataToChange.matinFinsh},soir:{start: dateDataToChange.soirStart,end: dateDataToChange.soirFinsh}}
        setTimming(copyOfHoraire)
        //SetTimmingData()
        setAddInput(!addInput)
    }
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
    /** */
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

    return (<>
        
            <h5><span className="bi bi-chat-left-text-fill"></span> {t('appPages.horairePage.titleText')}  </h5>
            <br />
            <div className="container"  >
                    <Horaire alwaysState={alwaysState} addInput={addInput} setAddInput={setAddInput} setAlwaysState={setAlwaysState} timming={timming} setTimming={setTimming} setPauseDay={setPauseDay} SetTimmingData={SetTimmingData} setSelectedUpdateDay={setSelectedUpdateDay} selectedUpdateDay={selectedUpdateDay} UpdateTimmingData={UpdateTimmingData} />
            </div>
            <BottomSheet expandOnContentDrag open={addInput}  onDismiss={() => setAddInput(!addInput)}  >                
                    <div className='card-body' dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className='text-start'><span className='bi bi-x-circle-fill  text-danger text-secondary mb-2' onClick={() => setAddInput(!addInput)}></span></div>
                        <h5 className='mt-0'>  {t('appPages.horairePage.modalEditData.dayOffOne')}   {ArabificationDate(selectedUpdateDay)}  {t('appPages.horairePage.modalEditData.dayOffTwo')}  </h5>
                        <Select  fluid options={[ { key: 'af', value: false, text: t('appPages.horairePage.modalEditData.options.no') }, { key: 'ax', value: true, text: t('appPages.horairePage.modalEditData.options.yes') }]} onChange={(e, {value}) => setDateDataToChange({... dateDataToChange, pauseDay : value})} className='mb-3'/>
                        <div className='row mb-3 '>
                            <div className='col-6'><Input  type='time' size='mini'  value={dateDataToChange.matinStart}  fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, matinStart : e.target.value})} /></div>
                            <div className='col-6'><Input  type='time' size="mini"  value={dateDataToChange.matinFinsh} fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, matinFinsh : e.target.value})}/></div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-6'><Input  type='time' size='mini'  value={dateDataToChange.soirStart}   fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, soirStart : e.target.value})} /></div>
                            <div className='col-6'><Input  type='time' size="mini"  value={dateDataToChange.soirFinsh}  fluid className='mb-1 w-100'  onChange={(e) => setDateDataToChange({... dateDataToChange, soirFinsh : e.target.value})}/></div>
                        </div>
                        <Button size='mini'     className='rounded-pill    font-droid' onClick={() => UpdateTimingFunc()} fluid  >   <Icon name='time' /> {t('appPages.horairePage.modalEditData.saveBtn')} {t(`appPages.horairePage.weekDayes.${selectedUpdateDay}`)}   </Button>
                    </div>
            </BottomSheet>
    </>);
}

export default MessagesPages;