import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { _ } from "gridjs-react";
import L from 'leaflet';
import { NavLink, useParams } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import { toast } from 'react-toastify';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './resultCard.css'
import { Dropdown, Input , Icon ,Divider, Header, Placeholder, Modal, Button, Dimmer, Loader, Rating} from 'semantic-ui-react';
import SKLT from '../../AssetsM/usedSlk';
import { Helmet } from 'react-helmet';
import WorldMap from '../../AssetsM/wordMap';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { useNavigate} from 'react-router-dom';

const ScrollDelegCard = ({localiteList, tag, setFilterLoading}) =>{
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    return(<>
        <div className="mt-0 p-1" dir={isRTL ? 'rtl' : 'ltr'} style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
            <div className="d-flex"  >
                {localiteList.map((data,index) =>  <div key={index} className='border rounded-pill shadow-sm mb-1 p-2 text-white text-end ms-2 btn-cursor' style={{backgroundColor:GConf.ADIL[tag].themeColor}} onClick={() => setFilterLoading(data.text)}> <b className='ms-1 me-1'> {data.text} </b></div>)} 
            </div>
        </div>
    </>)
}

function ResultPage() {
    /*#########################[Const]##################################*/
    let {tag,genre,gouv,deleg} = useParams()
    let [openMapModal,setOpenMM] = useState(false)
    let [loading,setLoading] = useState(true)
    let [filterLoader,setFilterLoader] = useState(false)
    let [resultList,setResultList] = useState([])
    let [localiteList,setLocaliteL] = useState([])
    L.Icon.Default.mergeOptions(GConf.LeafleftIcon);
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const navigate = useNavigate();

    /* ############### UseEffect #################*/
    useEffect(() => {
       // GetLocaliteList()
        window.scrollTo(0, 0);
        axios.post(`${GConf.ApiLink}/search`, {
            tag: tag,
            genre:genre,
            gouv:gouv,
            deleg :deleg
          })
          .then(function (response) {
            setResultList(response.data)
            setLoading(false)
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>مشل في الإتصال </h5> </div></>, GConf.TostInternetGonf) 
              setResultList([])
              setLoading(false)
              }
          });
      }, [])

    /* ############### Functions #################*/
        const ConverColorToHsl = (color) =>{
            //"hsl(166, 87%, 24%, 0.4)"
        // Convert hex to RGB first
            let r = 0, g = 0, b = 0;
            if (color.length == 4) {
                r = "0x" + color[1] + color[1];
                g = "0x" + color[2] + color[2];
                b = "0x" + color[3] + color[3];
            } else if (color.length == 7) {
                r = "0x" + color[1] + color[2];
                g = "0x" + color[3] + color[4];
                b = "0x" + color[5] + color[6];
            }
            // Then to HSL
            r /= 255;
            g /= 255;
            b /= 255;
            let cmin = Math.min(r,g,b),
                cmax = Math.max(r,g,b),
                delta = cmax - cmin,
                h = 0,
                s = 0,
                l = 0;

            if (delta == 0)
                h = 0;
            else if (cmax == r)
                h = ((g - b) / delta) % 6;
            else if (cmax == g)
                h = (b - r) / delta + 2;
            else
                h = (r - g) / delta + 4;

            h = Math.round(h * 60);

            if (h < 0)
                h += 360;

            l = (cmax + cmin) / 2;
            s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
            s = +(s * 100).toFixed(1);
            l = +(l * 100).toFixed(1);

            return "hsl(" + h + "," + s + "%," + l + "% " + ", 0.6 )";

        }

        const GetLocaliteList = () =>{
            const found = GConf.abyedhMap.DelegData.filter(element => element.Name === deleg)
            const foundLocalite = GConf.abyedhMap.Localite.filter(element => element.Code === found[0].PostalCode)
            let rendredTable = []
            foundLocalite.map((data,index) => {
                let arrayToAdd = {id: index + 1 , text: data.Localite, value: data.Localite}
                rendredTable.push(arrayToAdd)
            })
            //setLocaliteL(rendredTable)        
        }

        const setFilterLoading = () =>{
            setFilterLoader(true)
            setTimeout(() => {
                setFilterLoader(false)
            }, 2000);

        }
    /* ############### Card #################*/
    const TopNavBar = () =>{
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3">
                    <img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />
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
                            {GConf.UserData.Logged ? <UserCard />  : <NavLink exact='true' to='/Profile' className="m-0 p-0 me-3 text-white"> تَسْجِيلْ الدٌخٌولْ</NavLink>}
                        </div>
                    </div>
                </nav>
            </>)
    }
    const ButtomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card footer-abyedh' style={{backgroundColor:GConf.ADIL[tag].themeColor}}>
                <div className={`${isRTL ? 'text-end' : 'text-start'} text-white ${isRTL ? 'me-5' : 'ms-5'}`}>
                    <b>{t('resultPage.bottomAbyedhText')}</b>
                </div>
            </div>
        </>)
    }
    const ResultMap = ()=> {
        let selectedGouv =  WorldMap[GConf.Country].filter(gouvr => gouvr.name == deleg)
        let position = [0,0]
        if (selectedGouv[0]) {
            position = [selectedGouv[0].lat, selectedGouv[0].lng]
        }  
        
        return (<>
        <div className='card p-2 border-0 '>
            <MapContainer className='border-div' center={position} zoom={13} scrollWheelZoom={true} style={{height:'530px'}} >
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    {/* <Popup> {selectedGouv[0].lan} </Popup> */}
                </Marker>
            </MapContainer>  
            </div>
        </>);

    }
    const ActionsBtnCard = (props) =>{
        return(<>
                <Button className='bg-white  border p-2 ps-3 pe-3 mb-2 ' dir={isRTL ? 'rtl' : 'ltr'}  style={{borderRadius:'18px', width:'auto', color: GConf.ADIL[tag].themeColor}}   onClick={() => navigate(`/S/P/${tag}/${props.PID}/?action=true`)}  > 
                            <Icon name={props.data.icon} className={isRTL ? 'ms-1' : 'me-1'} /> {t(`resultPage.actionTextName.${tag}.${props.data.link}`)}  
                </Button>
            </>)
    }

    const ResultCardOld = (props) => {
        const HalfStarRating = ({ rating }) => {
            const wholeStars = Math.floor(rating);
            const hasHalfStar = rating - wholeStars !== 0;

            return (
                <span className="five-star-rating">
                {[...Array(wholeStars)].map((_, index) => (
                    <Icon key={index} name="star" size='small' color="yellow" />
                ))}
                {hasHalfStar && (
                    <Icon name="star half" size='small' color="yellow" />
                )}
                {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                    <Icon key={index} size='small' name="star outline" color="grey" />
                ))}
                </span>
            );
        };

        return (<>
                <div className='col-12 col-lg-4 mb-3'>
                    <div className='card shadow-sm h-100 border-div' style={{position:'relative'}}>
                        <NavLink exact='true' to={`/S/P/${tag}/${props.data.PID}`} className='stretched-link'></NavLink>
                        {/* <div className="card-header  " style={{marginBottom:'50px', height:'90px',  borderRadius:'0', background: `linear-gradient(to bottom, ${ConverColorToHsl(GConf.ADIL[tag].themeColor)},  #ffffff` , border: '0px solid' ,}}>  */}
                        <div className="card-header  " style={{marginBottom:'50px', height:'90px',  borderRadius:'0', backgroundImage: `url(https://cdn.abyedh.com/images/ads/${tag}.svg)` , backgroundSize: 'auto', backgroundPosition: 'center' , border: '0px solid' ,}}> 
                            <div style={{ content: '',  background: 'rgba(255, 255, 255, 0.6)',  position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', }}></div>
                            
                            <span
                                style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                }}
                                className="card-img bg-white shadow border-0"
                            >
                                <img src={`https://cdn.abyedh.com/Images/Search/CIcons/${tag}.gif`} className='img-responsive rounded-circle bg-white p-3' width='100px'  height='100px' />
                            </span>
                            
                        </div>
                        <div className='floating-card-result-card'>
                            <span className=" m-2 text-dark"> {Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)} <HalfStarRating rating={Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)} icon='star' disabled size='small' />  </span>
                            <span className=" m-2 text-dark">| <span className='bi bi-hand-thumbs-up-fill'></span> {props.data.Likes_Num} </span>
                            <span className=" m-2 text-dark">| <span className='bi bi-eye-fill'></span> {props.data.Views_Num >= 1000 ? (parseInt(props.data.Views_Num.toString().substring(0, 4)) / 1000).toFixed(1) + 'K' :  props.data.Views_Num}</span>
                        </div>
                        
                        <div className='text-center '> <h5 style={{ color: GConf.ADIL[tag].themeColor}}>{props.data.Name} { (props.data.Activated == 'true' ||  props.data.Activated == 'autoSaved') ?  <span className='bi bi-patch-check-fill  ' style={{color: '#1d9bf0'}}></span> : ''}</h5></div>
                        <div className='card-body text-secondary ' >
                            <div className='text-end  pb-2' dir='ltr'>
                            {props.data.Genre != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-bookmark-heart-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Genre}</div> </> : <></> }
                            {props.data.Gouv != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Gouv}</div> </> : <></> }
                            {props.data.Deleg != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Deleg}</div> </> : <></> }
                            {props.data.Adress != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-pin-map-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Adress}</div> </> : <></> }
                            </div>
                            {/* <div className='d-flex '>
                                <span className='ms-2 bi bi-award-fill bi-sm'></span>
                                <span className='ms-2 bi bi-wifi bi-sm'></span>
                                <span className='ms-2 bi bi-hourglass-split bi-sm'></span>
                                <span className='ms-2 bi bi-x-diamond-fill bi-sm'></span>
                            </div> */}
                        </div>
                        
                        <div className='col-12 d-flex pt-0  p-2' dir={isRTL ? 'rtl' : 'rtl'}  >
                            { GConf.ADIL[tag].systemActive ?  GConf.ADIL[tag].profileBtns.map( (data,index) => <ActionsBtnCard key={index} data={data} indexKey={index} /> ).slice(0, GConf.ADIL[tag].profileBtns.length - 1) : <></> }                        
                        </div>
                        {/* <div className="mt-0 p-1" dir={isRTL ? 'rtl' : 'ltr'} style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                            <div className="d-flex"  >
                                    { GConf.ADIL[tag].systemActive ?  GConf.ADIL[tag].profileBtns.map( (data,index) => <ActionsBtnCard key={index} data={data} indexKey={index} /> ) : <></> }
                            </div>
                        </div> */}
                    </div>
                    
                </div>
                </>);
    }
    const ResultCard = (props) => {
        const HalfStarRating = ({ rating }) => {
            const wholeStars = Math.floor(rating);
            const hasHalfStar = rating - wholeStars !== 0;

            return (
                <span className="five-star-rating">
                {[...Array(wholeStars)].map((_, index) => (
                    <Icon key={index} name="star" size='small' color="yellow" />
                ))}
                {hasHalfStar && (
                    <Icon name="star half" size='small' color="yellow" />
                )}
                {[...Array(5 - Math.ceil(rating))].map((_, index) => (
                    <Icon key={index} size='small' name="star outline" color="grey" />
                ))}
                </span>
            );
        };

        return (<>
                <div className='col-12 col-lg-4 mb-3 '>
                    <div className='card shadow-sm h-100 border-div d-none' style={{position:'relative'}}>
                        <NavLink exact='true' to={`/S/P/${tag}/${props.data.PID}`} className='stretched-link'></NavLink>
                        {/* <div className="card-header  " style={{marginBottom:'50px', height:'90px',  borderRadius:'0', background: `linear-gradient(to bottom, ${ConverColorToHsl(GConf.ADIL[tag].themeColor)},  #ffffff` , border: '0px solid' ,}}>  */}
                        <div className="card-header  " style={{marginBottom:'50px', height:'90px',  borderRadius:'0', backgroundImage: `url(https://cdn.abyedh.com/images/ads/${tag}.svg)` , backgroundSize: 'auto', backgroundPosition: 'center' , border: '0px solid' ,}}> 
                            <div style={{ content: '',  background: 'rgba(255, 255, 255, 0.6)',  position: 'absolute', top: 0, left: 0, width: '100%', height: '100px', }}></div>
                            
                            <span
                                style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                }}
                                className="card-img bg-white shadow border-0"
                            >
                                <img src={`https://cdn.abyedh.com/Images/Search/CIcons/${tag}.gif`} className='img-responsive rounded-circle bg-white p-3' width='100px'  height='100px' />
                            </span>
                            
                        </div>
                        <div className='floating-card-result-card'>
                            <span className=" m-2 text-dark"> {Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)} <HalfStarRating rating={Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)} icon='star' disabled size='small' />  </span>
                            <span className=" m-2 text-dark">| <span className='bi bi-hand-thumbs-up-fill'></span> {props.data.Likes_Num} </span>
                            <span className=" m-2 text-dark">| <span className='bi bi-eye-fill'></span> {props.data.Views_Num >= 1000 ? (parseInt(props.data.Views_Num.toString().substring(0, 4)) / 1000).toFixed(1) + 'K' :  props.data.Views_Num}</span>
                        </div>
                        
                        <div className='text-center '> <h5 style={{ color: GConf.ADIL[tag].themeColor}}>{props.data.Name} { (props.data.Activated == 'true' ||  props.data.Activated == 'autoSaved') ?  <span className='bi bi-patch-check-fill  ' style={{color: '#1d9bf0'}}></span> : ''}</h5></div>
                        <div className='card-body text-secondary ' >
                            <div className='text-end  pb-2' dir='ltr'>
                                {props.data.Genre != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-bookmark-heart-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Genre}</div> </> : <></> }
                                {props.data.Gouv != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Gouv}</div> </> : <></> }
                                {props.data.Deleg != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Deleg}</div> </> : <></> }
                                {props.data.Adress != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-pin-map-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Adress}</div> </> : <></> }
                            </div>
                            {/* <div className='d-flex '>
                                <span className='ms-2 bi bi-award-fill bi-sm'></span>
                                <span className='ms-2 bi bi-wifi bi-sm'></span>
                                <span className='ms-2 bi bi-hourglass-split bi-sm'></span>
                                <span className='ms-2 bi bi-x-diamond-fill bi-sm'></span>
                            </div> */}
                        </div>
                        
                        <div className='col-12 d-flex pt-0  p-2' dir={isRTL ? 'rtl' : 'rtl'}  >
                            { GConf.ADIL[tag].systemActive ?  GConf.ADIL[tag].profileBtns.map( (data,index) => <ActionsBtnCard key={index} data={data} indexKey={index} /> ).slice(0, GConf.ADIL[tag].profileBtns.length - 1) : <></> }                        
                        </div>
                        {/* <div className="mt-0 p-1" dir={isRTL ? 'rtl' : 'ltr'} style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                            <div className="d-flex"  >
                                    { GConf.ADIL[tag].systemActive ?  GConf.ADIL[tag].profileBtns.map( (data,index) => <ActionsBtnCard key={index} data={data} indexKey={index} /> ) : <></> }
                            </div>
                        </div> */}
                    </div>
                    <div className='card shadow-sm h-100   border-div'>
                        <div className='row m-2' dir={isRTL ? 'rtl' : 'ltr'}> 
                            <div className='col-4 align-self-center' onClick={() => navigate(`/S/P/${tag}/${props.data.PID}`)}>
                                    <div><img src={`https://cdn.abyedh.com/Images/Search/CIcons/${tag}.gif`} className='img-responsive rounded-circle bg-white  ' width='80px'  height='80px' /></div>
                                    <HalfStarRating size='small' rating={Math.min(Math.max(parseFloat(`${Math.abs(props.data.PID)}`[0] + '.' + `${Math.abs(props.data.PID)}`.slice(-1)), 1), 5)} icon='star' disabled   />
                                    <div>
                                        <span className="text-dark">  <span className='bi bi-hand-thumbs-up-fill'></span> {props.data.Likes_Num} </span>
                                        <span className="text-dark">| <span className='bi bi-eye-fill'></span> {props.data.Views_Num >= 1000 ? (parseInt(props.data.Views_Num.toString().substring(0, 4)) / 1000).toFixed(1) + 'K' :  props.data.Views_Num}</span>
                                    </div>
                            </div>
                            <div className='col-8 align-self-center'>
                                <div className='text-end ms-2 me-2 text-truncate' onClick={() => navigate(`/S/P/${tag}/${props.data.PID}`)}> <h4 style={{ color: GConf.ADIL[tag].themeColor, maxWidth:'90%'}}>{props.data.Name} { (props.data.Activated == 'true' ||  props.data.Activated == 'autoSaved') ?  <span className='bi bi-patch-check-fill  ' style={{color: '#1d9bf0'}}></span> : ''}</h4></div>
                                <div className='text-start  pb-2'  >
                                    {props.data.Genre != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-bookmark-heart-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Genre}</div> </> : <></> }
                                    {props.data.Gouv != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Gouv}</div> </> : <></> }
                                    {props.data.Deleg != '' ?  <><div className={`${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-geo-alt' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Deleg}</div> </> : <></> }
                                    {props.data.Adress != '' ?  <><div className={`text-truncate ${isRTL ? 'text-end' : 'text-start'}`} style={{marginRight:'20px', maxWidth:'280px'}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-pin-map-fill' style={{color: GConf.ADIL[tag].themeColor}}></span> : {props.data.Adress}</div> </> : <></> }
                                </div>
                                <div className='  d-flex pt-0  p-2'  dir={isRTL ? 'rtl' : 'rtl'} style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}} >
                                    { GConf.ADIL[tag].systemActive ?  GConf.ADIL[tag].profileBtns.map( (data,index) => <ActionsBtnCard key={index} PID ={props.data.PID} data={data} indexKey={index} /> ).slice(0, GConf.ADIL[tag].profileBtns.length - 1) : <></> }                        
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
                </>);
    }
    const FilterCard = () =>{
        return(<>
        <div className='card-body rounded-0' style={{height:'80px', marginBottom:'35px',   paddingTop:'30px' }}>
            <div className='row'>
                <div className='col-lg-3 align-self-center d-none d-lg-block '>
                    <Dropdown
                        search
                        selection
                        fluid
                        wrapSelection={false}
                        options={localiteList}
                        placeholder='عمادة '
                        className='mb-2  shadow-sm'
                    />
                </div>
                <div className='col-lg-3 align-self-center d-none d-lg-block'>
                    <Dropdown
                        search
                        selection
                        fluid
                        wrapSelection={false}
                        options={[{id:1, text:'الأحسن تقييم', value:'1'},{id:1, text:'الأقرب جغرافيا', value:'2'},{id:1, text:'السعر الأفضل', value:'3'}]}
                        placeholder='بحث حسب  '
                        className='mb-2  shadow-sm'
                    />
                </div>
                <div className='col-2 align-self-center d-md-none' >
                    
                    <Modal
                        onClose={() => setOpenMM(false)}
                        onOpen={() => setOpenMM(true)}
                        open={openMapModal}
                        dimmer= 'blurring'
                        trigger={<Button className='mb-2 me-1'  ><Icon name='map' /></Button>}
                        >
                        <Modal.Content >
                            <ResultMap />
                        </Modal.Content>
                         
                    </Modal>
                </div>
                <div className='col-lg-6 col-10 align-self-center ' >
                    <Input icon='search' placeholder={t('mainPage.mainsearchInput')} fluid className='mb-2 text-end rounded-pill-input ' style={{borderRadius: '100px', textAlign:'right'}}/>
                    {/* <Input  placeholder='بحث' fluid className='mb-2'><input style={{borderRadius: '100px', textAlign:'right'}} /> <Icon disabled name='search' /></Input> */}
                </div>
            </div>
        </div>
        </>)
    }
    const PlacHolderCard = () =>{
        const ProfilePlacholder = () => {
                return(<>
                    <div className='card p-3 shadow-sm border-div'>
                        <div className='text-center'>
                            <Placeholder className='rounded-circle mb-4' style={{ height: 80, width: 80 }}>
                                <Placeholder.Image />
                            </Placeholder>
                        </div> 
                        <Placeholder style={{ width: '100%' }}>
                            <Placeholder.Line  />
                            <Placeholder.Line  />
                            <Placeholder.Line  />
                            <Placeholder.Line  />
                            <Placeholder.Line  />
                        </Placeholder>
                    </div>
                </>)
            }
        return(<>
                <div className='row '>
                    <div className='col-12 col-lg-4 mb-3'> <ProfilePlacholder /></div>
                    <div className='col-12 col-lg-4 mb-3'> <ProfilePlacholder /></div>
                    <div className='col-12 col-lg-4 mb-3'> <ProfilePlacholder /></div>
                    <div className='col-12 col-lg-4 mb-3'> <ProfilePlacholder /></div>
                </div>
        </>)
    }
    const ResultEmpty = () =>{
        return(<>
            <div className='card-body mb-4 ' dir={isRTL ? 'rtl' : 'ltr'}>
                <div className='text-center'>
                    <img src='https://cdn.abyedh.com/Images/Errors/error-page.png' className='img-gray d-lg-none' width='100%'  height='300px' />
                    <img src='https://cdn.abyedh.com/Images/Errors/error-page.png' className='img-gray d-none d-lg-inline' width='60%'  height='300px' />
                </div>
                <h3>{t('resultPage.pasDeResultat.desoleText')}</h3> 
                <ul >
                    <li>{t('resultPage.pasDeResultat.reasonOne')}</li>
                    <li> {t('resultPage.pasDeResultat.reasonTwo')}</li>
                </ul> 
                <h5> {t('resultPage.pasDeResultat.searchNext')}</h5>
            </div>
        </>)
    }

    return ( <>
            <Helmet>
                <title dir={isRTL ? 'rtl' : 'ltr'}>{tag} à  {gouv} </title>
                <meta name="description" content={GConf.SeoTags[tag].tags} />
            </Helmet>
            <TopNavBar />  
            <br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 col-lg-4 d-none d-lg-block'>
                        <div className="sticky-top" style={{top:'70px', zIndex:'-10'}}>
                             <ResultMap />
                        </div>
                    </div>
                    <div className='col-12 col-lg-8'>
                            <Dimmer active={filterLoader} inverted>
                                <Loader inverted>تحيين من قاعدة البيانات</Loader>
                            </Dimmer>
                            <div className="sticky-top bg-white mb-4 " style={{top:'50px', zIndex:'+50'}}>
                                <FilterCard />
                            </div>
                            
                            <ScrollDelegCard tag={tag} localiteList={localiteList} setFilterLoading={setFilterLoading} />
                            {loading ?  <PlacHolderCard />
                            :
                            <>
                                {
                                    resultList.length == 0 ? <ResultEmpty /> 
                                    :
                                    <div className='row'>
                                        {
                                            resultList.map( (data,index) =>  <ResultCard randomRate={((Math.random() * (5 - 2)) + 2).toFixed(1)} key={index} data={data} />  )
                                        }
                                    </div>
                                }
                                
                            </>
                            
                            } 
                        
                    </div>
                </div>
            </div>

            <br />
            <br />
            <ButtomCard />
        </> );
}

export default ResultPage;