import React, { useEffect, useState } from 'react';
// import { _ } from "gridjs-react";
import { NavLink, useParams } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import { toast } from 'react-toastify';
import { Button, Icon, Menu, Modal, ModalHeader, Placeholder} from 'semantic-ui-react';
import { Pagination,Autoplay,Navigation } from "swiper";
import { Swiper, SwiperSlide, } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import Ripples from 'react-ripples'
import { useNavigate} from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import WorldMap from '../../AssetsM/wordMap';

function SearchLandingPage() {
    /*#########################[Const]##################################*/
    let {tag} = useParams()
    const [isSelected, setisSelected] = useState(0);
    const [delegList ,setDelegList] = useState([])
    const [gouvList ,setGouvListe] = useState([])
    const [firstLetters, setFirstLetters] = useState([]);
    const [firstLettersDeleg, setFirstLettersDeleg] = useState([]);
    const [open, setOpen] = useState(false)
    const [openD, setOpenD] = useState(false)
    const [gouv ,setGouv] = useState('')
    const [deleg ,setDeleg] = useState('')
    const [selectedLetter ,setSelectedLetter] = useState(0)
    const navigate = useNavigate();
    const [suggestionListe , setSuggestionListe] = useState([])
    const [pageLoading, setPageLoading] = useState(true)
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    /* ############### UseEffect #################*/
    useEffect(() => {
        window.scrollTo(0, 0);
        
        axios.post(`${GConf.ApiLink}/Search/suggestion`, {
            tag: tag,
            UID: GConf.UserData.Logged ? GConf.UserData.UData.UID : false,
        })
        .then(function (response) {
            setSuggestionListe(response.data)
            setPageLoading(false)
        })

        setGouvListe(WorldMap.states.filter(state => state.country === GConf.Country))

        function getFirstLetters(data) {
            const uniqueLetters = data
              .filter(item => item.country === GConf.Country) // Filter data based on country === 'AF'
              .reduce((letters, item) => {
                const firstLetter = item.name.charAt(0);
                if (!letters.some(obj => obj.letter === firstLetter)) {
                  letters.push({ letter: firstLetter });
                }
                return letters;
              }, []);
            return uniqueLetters;
        }
        setFirstLetters(getFirstLetters(WorldMap.states));
    }, [])

    /* ############### Functions #################*/
    function getFirstLettersDeleg(data, selectedGouv) {
        const uniqueLetters = data
          .filter(item => item.Gouv === selectedGouv) // Filter data based on country === 'AF'
          .reduce((letters, item) => {
            const firstLetter = item.name.charAt(0);
            if (!letters.some(obj => obj.letter === firstLetter)) {
              letters.push({ letter: firstLetter });
            }
            return letters;
          }, []);
        return uniqueLetters;
    }
    
    const GetDelegList = (value) =>{
        setGouv(value)
        const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
        setDelegList(found)
        setFirstLettersDeleg(getFirstLettersDeleg(WorldMap[GConf.Country], value));
        console.log(getFirstLettersDeleg(WorldMap[GConf.Country], value));
        setOpen(false)

      }
      const GetSelectedGouvList = (letter, value) =>{
        setSelectedLetter(value)
        setGouvListe(WorldMap.states.filter(state => state.country === GConf.Country && state.name.startsWith(letter)));

      }
      const GetSelectedDelegList = (letter, value) =>{
        setSelectedLetter(value)
        setDelegList(WorldMap[GConf.Country].filter(element => element.Gouv === gouv && element.name.startsWith(letter)))
      }
      const RenderAsHtml = (text) => {
        return (
          <span
            dangerouslySetInnerHTML={{__html: text}}
          />
        );
      }

      const GoToResult = () =>{
        if (!gouv) { toast.error("قم بتحديد الولاية", GConf.TostErrorGonf)} 
        else if (!deleg) { toast.error("قم بتحديد المنطقة ", GConf.TostErrorGonf)}
        else {
            //setLoadingTo(95)
            navigate(`/S/R/${tag}/${GConf.ADIL[tag].subCateg[isSelected].value}/${gouv}/${deleg}`)
        }
           
      }
    /* ############### Card #################*/
    const TopNavBar = () =>{
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3">
                    <img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.tn/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />
                </NavLink>
            </>)
        }
        return(<>
                <nav className="p-2 fixed-top navshad" style={{backgroundColor:GConf.ADIL[tag].themeColor}}>
                    <div className='row'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                <img  className="border-div-s d-none d-lg-inline" src="https://cdn.abyedh.tn/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px', borderRadius: '10px 20px 10px 50px'}} />
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
    const AdsLanding = (props) =>{
        return(<>
            <div className={`${props.displylg ? 'd-none d-lg-block' : 'd-lg-none'}`}>
                <br />
                <div className='card-body rounded-0 ' style={{height:'170px',  marginTop:'40px', paddingTop:'50px'}}>
                    <div className='row'>
                        <div className='col-12 col-lg-8 align-self-center text-center ' dir='rtl'>
                                {/* <Typed    
                                    strings={GConf.ADIL[tag].adsText[0]}
                                    typeSpeed={3}
                                    backSpeed={4}
                                    backDelay={4000}
                                    loop
                                    showCursor={false} 
                                    className="font-droid d-none"  
                                /> */}
                                <Swiper
                                    spaceBetween={30}
                                    centeredSlides={true}
                                    autoplay={{
                                    delay: 6000,
                                    disableOnInteraction: false,
                                    }}
                                    
                                    navigation={false}
                                    modules={[Autoplay, Pagination, Navigation]}
                                    className="mySwiper pb-5 mb-1"
                                >
                                    <SwiperSlide><h4 className='text-secondary'>{RenderAsHtml(GConf.ADIL[tag].adsText[0][0])}</h4></SwiperSlide>
                                    <SwiperSlide><h4 className='text-secondary'>{RenderAsHtml(GConf.ADIL[tag].adsText[0][1])}</h4></SwiperSlide>
                                </Swiper>
                                
                        </div> 
                        <div className='col-4 col-lg-4   text-center d-none d-lg-block '>
                            {GConf.ADIL[tag].systemActive ? <SystemLinkCardLG /> : <></> }
                        </div>
                    </div> 
                </div>
                <br />
            </div>

            
        </>)
    }
 
    const ButtomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card footer-abyedh' style={{backgroundColor:GConf.ADIL[tag].themeColor}}>
                <div className={`${isRTL ? 'text-end' : 'text-start'} text-white ${isRTL ? 'me-5' : 'ms-5'}`}>
                    <b>{t('landingPage.bottomAbyedhText')}</b>
                </div>
            </div>
        </>)
    }
    const ItmesList = ({ option, selected, onChange }) => {
        return (
                <Ripples className='shadow-sm  m-1 border-div d-block'>
                <div className={`card p-2 ps-3 border-div ${selected ? 'border-selected' : ''}`}  selected={selected} onClick={onChange} style={{cursor:'pointer'}}>
                    <div className='row '>
                        <div className='col-4  text-center m-0 p-0'><img src={`https://cdn.abyedh.tn/images/Search/Land_icons/${option.imgSrc}.gif`} className='img-responsive' width='40px' height='40px' alt='*' /></div>
                        <div className={`col-8  ${isRTL ? 'text-end' : 'text-start'}  m-0 p-0  align-self-center`}><b>{t(`landingPage.itemsToSelect.${tag}.${option.imgSrc}`)} </b></div> {/* ${option.value} */}
                    </div>
                </div>
                </Ripples>
        );
    }
    
    const GouvListeToSelet = () =>{ 
        return(<>
            <div className='row'>
                {gouvList.map((data, index) => <div key={index} className='col-12'>
                    <div  className={`card p-2  mb-2 border-0 ${data.value === gouv ? 'bg-dark text-white' : 'text-secondary'}`} onClick={() => GetDelegList(data.name)}>
                        <div className='row'>
                            <div className='col-1'><span className='bi bi-pin-map-fill'></span></div> 
                            <div className='col-11 align-self-center'> <b>{data.name}</b></div> 
                        </div>
                    
                    </div>
                </div> )}
            </div>
            
        </>)
    }
    const DelegListeToSelet = () =>{
        return(<>
            {delegList.map((data, index) => <div key={index} className={`card p-2 border-0 mb-2  ${data.value === deleg ? 'bg-dark text-white' : 'text-secondary'}`} onClick={() => { setDeleg(data.name); setOpenD(false) }}><b>{data.name}</b></div> )}
        </>)
    }
    const SelectGouvCard = () =>{
        const SelectGouv = () =>{
           return(<>
                <div className='card p-3 shadow-sm mb-2 rounded-pill' onClick={() => setOpen(true)}>
                    <h4 className={`me-2 ${isRTL ? 'text-end' : 'text-start'}  text-secondary`} style={{color:GConf.ADIL[tag].themeColor}} dir={isRTL ? 'rtl' : 'ltr'} > <span className={`bi bi-map ${isRTL ? 'ms-3' : 'me-3'} `} ></span> {gouv ? gouv : t('landingPage.selectGouvText')}  </h4> 
                </div>
           </>) 
        }
        const SelectDeleg = () =>{
            return(<>
                 <div className='card p-3 shadow-sm mb-2 rounded-pill' onClick={() => setOpenD(true)}>
                     <h4 className={`me-2 ${isRTL ? 'text-end' : 'text-start'}  text-secondary`} style={{color:GConf.ADIL[tag].themeColor}} dir={isRTL ? 'rtl' : 'ltr'}> <span className={`bi bi-geo-alt-fill ${isRTL ? 'ms-3' : 'me-3'} `}></span>  {deleg ? deleg : t('landingPage.selectDelegText')}  </h4> 
                 </div>
            </>) 
         }
        const FastSearch = (props) =>{
            return(<>
                 
                <NavLink exact='true' to={`/S/R/${tag}/${GConf.ADIL[tag].subCateg[isSelected].value}/${props.gouv}/${props.deleg}`} >
                            <div className='card p-3 mb-2 shadow-sm rounded-pill text-center'>
                               <div className='row' style={{color:GConf.ADIL[tag].themeColor}}>
                                    <div className='col-2 align-text-center align-self-center'><img  className="rounded-circle " src={`https://cdn.abyedh.tn/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'20px', height:'20px'}} /></div>
                                    <div className={`col-9 align-text-center text-truncate ${isRTL ? 'rtl' : 'ltr'}`}   style={{maxWidth:'280px'}} dir={!isRTL ? 'rtl' : 'ltr'}> <b><span>{t('landingPage.fastSearchText')}</span>  <span>{props.gouv}</span> , <span>{props.deleg}</span>   </b>    </div>
                                    <div className='col-1 align-text-center align-self-center'><b> <span className='bi bi-arrow-right-short'></span> </b></div>
                               </div>
                            </div>
                </NavLink>
                
            </>)
        }
        return(<>
                <div className="card card-body shadow-sm mb-4   border-div" >
                     
                    
                    {/* <h5 className='text-end text-secondary'> {GConf.UserData.Logged ?  'أو' : ''}  حدد الموقع  </h5>  */}
                    <br />
                    <div className='row'>
                        <div className='col-12 col-lg-4 align-self-center '>
                            {GConf.UserData.Logged ?  <FastSearch gouv={GConf.UserData.UData.BirthGouv} deleg={GConf.UserData.UData.BirthDeleg} /> : ''}
                        </div>
                        <div className='col-12 col-lg-3 align-self-center order-4 order-lg-2'>
                            <h5 className='text-end text-secondary m-1 mb-3 d-lg-none'> </h5>
                            <Button fluid size='large' onClick={() => GoToResult()} className='rounded-pill  mb-2 p-3 text-white' style={{backgroundColor:GConf.ADIL[tag].themeColor}}  dir={isRTL ? 'rtl' : 'ltr'} > <Icon name='search' className='ms-2' />  {t('landingPage.rechercheBtnText')}  </Button>
                        </div>
                        <div className='col-12 col-lg-2 align-self-center order-lg-4'>
                            <h5 className={`text-secondary m-1 mb-3 d-lg-none ${isRTL ? 'text-end' : 'text-start'}`}>  {GConf.UserData.Logged ?  t('landingPage.pleaseSelectGouvText')  : t('landingPage.pleaseSelectGouvTextSecondary')}  </h5>
                            <SelectGouv />
                        </div>
                        <div className={`col-12 col-lg-3 align-self-center order-lg-3 ${gouv ? '' : 'd-none'}`}>
                            <h5 className='text-end text-secondary m-1'>   </h5>
                            <SelectDeleg />
                        </div>
                    </div>
                    
                    
                    {/* <Select placeholder='إختر ولاية' className='mb-2 shadow-sm' options={GConf.abyedhMap.Gouv} value={gouv} onChange={(e, { value }) => GetDelegList(value)} /> */}
                    {/* <Select placeholder='إختر منطقة' className='shadow-sm' value={deleg} options={delegList} onChange={(e, { value }) => setDeleg(value)} /> */}
                     
                    
                    {/* <NavLink exact='true' to={`/S/R/${tag}/${GConf.ADIL[tag].subCateg[isSelected].value}/${gouv}/${deleg}`} > */}
                            
                    {/* </NavLink> */}
                </div></>)
    }
    const SystemLinkCard = () =>{
        return(<>
            <div className='card p-2 shadow-sm mb-2 border-div d-md-none'>
                <h5 className={` ${isRTL ? 'text-end' : 'text-start'} text-secondary mb-1 mt-2`}  dir={isRTL ? 'rtl' : 'ltr'}>{t('landingPage.titleSystemAds1')} {t(`landingPage.systemOwnersNames.${tag}`)}  {t('landingPage.titleSystemAds2')}</h5>
                {/* <a href={`/S/I/add/${tag}`} className=' text-secondary ' ></a> */}
                <div className='row mt-0 pt-0 '>
                    <div className='col-3 align-self-center text-center'>
                        <img src={`https://cdn.abyedh.tn/images/ads/${tag}.svg`} className=' mt-3 img-responsive mb-1 ms-2' width='100%'  height='auto' alt='abyedh.tn' />
                    </div>
                    <div className='col-9 align-self-center text-center'>
                        <p> {t('landingPage.textSystemAds1')}  {t(`landingPage.systemNames.${tag}`)} {t('landingPage.textSystemAds2')}   </p>
                        {/* <p >   <b style={{color:GConf.ADIL[tag].themeColor}}>{GConf.ADIL[tag].systemName}</b> يعُاوْنِكْ  بَاشْ تَعَرِّفْ بنَفْسِكْ و تَعَرِّفْ بخَدِمْتِكْ  </p> */}
                        {/* {localStorage.getItem('AddToDirectory') ? <Button className='rounded-pill text-secondary' style={{backgroundColor:'white'}} size='tiny' onClick={() => navigate(`/S/I/user/${tag}`)}> متابعة عملية التسجيل </Button>  : <></>}  */}
                    </div>
                </div>
                <div className='mt-3'>
                    <div className='row'>
                        <div className='col-6 align-self-center text-start'><Button className='rounded-pill mb-2' style={{backgroundColor:'#f0f0f0', color : GConf.ADIL[tag].themeColor}} size='tiny' onClick={() => navigate(`/S/I/add/${tag}`)}> {t('landingPage.SubscribeBtnText')} </Button></div>
                        <div className='col-6 align-self-center text-end'><Button className='rounded-pill text-white mb-2' style={{backgroundColor:GConf.ADIL[tag].themeColor}} size='tiny' onClick={() => navigate(`/App/L/${tag}`)}> {t('landingPage.goToSystemBtnText')} </Button></div>
                    </div>
                </div>
                 
                
            </div> 
        </>)
    }
    const AdminSoon = () =>{
        return(<>
            <div className='card p-2 shadow-sm mb-2 border-div d-md-none'>
                <h5 className='text-end text-secondary mb-1 mt-2' dir='rtl'> مِنَصّةْ الِإدَارَة الرَقْمِيَّة </h5>
                {/* <a href={`/S/I/add/${tag}`} className=' text-secondary ' ></a> */}
                <div className='row mt-0 pt-0 '>
                    <div className='col-3 align-self-center text-center'>
                        <img src={`https://cdn.abyedh.tn/images/ads/${tag}.svg`} className=' mt-3 img-responsive mb-1 ms-2' width='100%'  height='auto' alt='abyedh.tn' />
                    </div>
                    <div className='col-9 align-self-center text-end'>
                        <p className='mb-0'>   مِنَصّةْ الإِدَارَة الرَقْمِيَّة تَهْدِفُ لتبسيط العمليات الإدارية     </p>
                        <p className='mt-0'>    سَتَكُونْ مُتَوَفِّرَة قَرِيبًأ   </p>
                        
                    </div>
                </div>

                 
                
            </div> 
        </>)
    }
    const SystemLinkCardLG = () =>{
        return(<>
            <div className='card p-3 shadow-sm  border-div btn-cursor' onClick={() => navigate(`/S/I/add/${tag}`)}>
                <p className='text-end'>   <b style={{color:GConf.ADIL[tag].themeColor}}>{GConf.ADIL[tag].systemName}</b>  يعُاوْنِكْ  بَاشْ تَعَرِّفْ بنَفْسِكْ و تَعَرِّفْ بخَدِمْتِكْ </p> 
            </div> 
        </>)
    }
    const FvaoriteOrSuggestionCard = () =>{
        const SekeltonCard = () =>{
            const PlaceHolderCard = () =>{
                return(<>
                <Placeholder className='mb-0 border-div' style={{ height: 70, width: '100%' }}>
                    <Placeholder.Image />
                </Placeholder>
                </>)
            }
            return(<>
                <div className='row'>
                    <div className='col-8'><PlaceHolderCard /></div>
                    <div className='col-4'><PlaceHolderCard /></div>
                </div>
            </>)
        }

        const ItemCard = (props) =>{
            return(<>
            <NavLink exact='true' to={`/S/P/${tag}/${props.data.PID}`}>
                <div className='card p-2 shadow-sm mb-2 border-div'>
                    <div className='row '>
                        <div className='col-2 align-self-center'><img src={`https://cdn.abyedh.tn/Images/Search/CIcons/${tag}.gif`} className='img-responsive ' width='50px'  height='50px' />   </div>
                        <div className='col align-self-center '>
                            <h5 className='mb-0   text-truncate' style={{maxWidth: '115px'}}><b className='mt-0 mb-0 text-secondary'>{props.data.Name} </b></h5>
                            <div className='mt-0 mb-0 text-secondary   text-truncate' style={{maxWidth: '115px'}}> {props.data.UID ? <span> المفظلة <span className='bi bi-star-fill text-warning'> </span></span>   : `${props.data.Gouv}, ${props.data.Deleg}`} </div>
                        </div>
                    </div>
                </div>
            </NavLink>
            </>)
        }
        return(<>
            {pageLoading ? <SekeltonCard />
            :
            
            <Swiper
                slidesPerView= {1.8}
                centeredSlides = {false}
                spaceBetween={10}
                loop={true}
                pagination={false}
                modules={[Pagination]}
                className="mySwiper pb-2 mb-0 "
            >
                {suggestionListe.map( (carouselData,index)=> 
                    <SwiperSlide key={index}> <ItemCard  key={index} data={carouselData} index={index} /></SwiperSlide> 
                 )}
            </Swiper>
            }
        </>)
    }
    /*const BigScreenItemCard = () =>{
        return(     
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Pagination]}
                        className="mySwiper pb-4 mb-1"
                    >
                        {
                            GConf.ADIL[tag].subCatagLarge.map((slides, index) => (
                                <SwiperSlide key={index}>
                                    <div className='row card-body '>
                                        {slides.map((option,index) => (
                                            <div className='col-3 p-0' key={index}>
                                                <ItmesList
                                                    key={option.id -1}
                                                    option={option}
                                                    selected={isSelected === option.id -1 }
                                                    onChange={() => setisSelected(option.id -1 )}
                                                />
                                            </div>
                                        ))}     
                                    </div>
                                </SwiperSlide>
                            ))
                        }
                        
                    </Swiper>)
    }
    const SmallScreenItemCard = () =>{
        return( 
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper pb-4 mb-1"
                >
                    {
                        GConf.ADIL[tag].subCatagSmall.map((slides, index) => (
                            <SwiperSlide key={index}>
                                <div className='row card-body '>
                                    {slides.map((option,index) => (
                                        <div className='col-6 p-0' key={index}>
                                            <ItmesList
                                                key={option.id -1}
                                                option={option}
                                                selected={isSelected === option.id -1 }
                                                onChange={() => setisSelected(option.id -1 )}
                                            />
                                        </div>
                                    ))}     
                                </div>
                            </SwiperSlide>
                        ))
                    }
                    
                </Swiper>
                )
    }*/
    
    return ( <>
            <Helmet>
                <title>{GConf.ADIL[tag].ItemNameSEO}</title>
                <meta name="description" content={GConf.SeoTags[tag].tags} />
            </Helmet>
            <TopNavBar /> 
            {/* <LoadingBar color={GConf.themeColor} progress={loadingTo}  
                //onLoaderFinished={() => setProgress(0)} 
            /> */}
            {/* <AdsLanding  /> */}
            <div className='d-lg-none'>
                <br />
                <br />
                <br />
                <br />
            </div>
            
            <div className='container '>
                <AdsLanding displylg />
                <div className='row'> 
                    <div className='col-12 col-lg-12 align-self-center  ' dir={isRTL ? 'rtl' : 'ltr'}>
                        <div className='row mb-2'>
                            <div className='col-4 col-lg-4  d-none d-lg-block '>
                                <img src={`https://cdn.abyedh.tn/images/ads/${tag}.svg`} className='img-responsive  ' width='60%' height='auto' alt='abyedh.tn'  />
                            </div>
                            <div className='col-12 col-lg-8 align-self-center text-center'>
                                <h5 className={` mb-2 me-3 ${isRTL ? 'text-end' : 'text-start'}  text-secondary`}>{t(`landingPage.selectText.${tag}`)}</h5>
                                <div className='d-none d-lg-flex '>
                                        <Swiper
                                            spaceBetween={30}
                                            pagination={{
                                                dynamicBullets: true,
                                            }}
                                            modules={[Pagination]}
                                            className="mySwiper pb-4 mb-1"
                                        >
                                            {
                                                GConf.ADIL[tag].subCatagLarge.map((slides, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className='row card-body justify-content-center'>
                                                            {slides.map((option,index) => (
                                                                <div className='col-3 p-0' key={index}>
                                                                    <ItmesList
                                                                        key={option.id -1}
                                                                        option={option}
                                                                        selected={isSelected === option.id -1 }
                                                                        onChange={() => setisSelected(option.id -1 )}
                                                                    />
                                                                </div>
                                                            ))}     
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                            
                                        </Swiper>
                                </div>
                                <div className='d-lg-none '>
                                        <Swiper
                                            spaceBetween={30}
                                            pagination={{
                                                dynamicBullets: true,
                                            }}
                                            modules={[Pagination]}
                                            className="mySwiper pb-4 mb-1"
                                        >
                                            {
                                                GConf.ADIL[tag].subCatagSmall.map((slides, index) => (
                                                    <SwiperSlide key={index}>
                                                        <div className='row card-body '>
                                                            {slides.map((option,index) => (
                                                                <div className='col-6 p-0' key={index}>
                                                                    <ItmesList
                                                                        key={option.id -1}
                                                                        option={option}
                                                                        selected={isSelected === option.id -1 }
                                                                        onChange={() => setisSelected(option.id -1 )}
                                                                    />
                                                                </div>
                                                            ))}     
                                                        </div>
                                                    </SwiperSlide>
                                                ))
                                            }
                                            
                                        </Swiper>
                                </div> 
                            </div> 
                        </div>
                    </div> 
                    <div className='col-12 col-lg-12 align-self-center'>
                        <div className='d-none d-lg-block lol-hhh'>
                            <br />
                            <br />
                            <br />
                        </div>
                        <SelectGouvCard />
                    </div>
                </div> 
                <br />
                
                {GConf.ADIL[tag].systemActive ? <SystemLinkCard /> : <AdminSoon /> }
               
                <br />
                <h5 className={` ${isRTL ? 'text-end' : 'text-start'} me-3 mt-0 mb-2`} style={{color : GConf.ADIL[tag].themeColor}} dir={isRTL ? 'rtl' : 'ltr'}> <span className='bi bi-star-half'></span>  {t('landingPage.suggestionAndFavText')} </h5> 
                <FvaoriteOrSuggestionCard />
            </div> 
            
            <br />
            <ButtomCard />
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                //dimmer= 'blurring' 
                className='fullscreen-modal-gouv m-0 p-0'
                >
                <br /> <br /> <br /> <br />  
                <ModalHeader>
                    <div className='row mb-0 '>
                        <div className='col-11 text-start border-end'>
                        <div className="mt-1 p-1 mb-1"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                        <Menu secondary >
                            {firstLetters.map((data,index) => <Menu.Item key={index} active={selectedLetter == index} className='rounded-pill' onClick={ () => GetSelectedGouvList(data.letter , index)}> <span className='text-secondary' > <b> {data.letter} </b> </span> </Menu.Item> )}
                        </Menu>
                    </div>
                        </div>
                        <div className='col-1 align-self-center text-end'><Button  className='rounded-circle bg-white   text-danger' size='tiny' icon onClick={() => setOpen(false)}><Icon name='remove' /></Button></div>
                    </div>                     
                    
                </ModalHeader>
                <Modal.Content scrolling><GouvListeToSelet /></Modal.Content>
            </Modal>
            <Modal
                onClose={() => setOpenD(false)}
                onOpen={() => setOpenD(true)}
                open={openD}
                //dimmer= 'blurring'
                className='fullscreen-modal-gouv m-0 p-0'  
                >
                <br /> <br /> <br /> <br />  
                <ModalHeader>
                    <div className='row mb-0 '>
                        <div className='col-11 text-start border-end'>
                        <div className="mt-1 p-1 mb-1"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                        <Menu secondary >
                            {firstLettersDeleg.map((data,index) => <Menu.Item key={index} active={selectedLetter == index} className='rounded-pill' onClick={ () => GetSelectedDelegList(data.letter , index)}> <span className='text-dark' > <b> {data.letter} </b> </span> </Menu.Item> )}
                        </Menu>
                    </div>
                        </div>
                        <div className='col-1 align-self-center text-end'><Button  className='rounded-circle bg-white   text-danger' size='tiny' icon onClick={() => setOpenD(false)}><Icon name='remove' /></Button></div>
                    </div>
                </ModalHeader>
                <Modal.Content  scrolling> <DelegListeToSelet /> </Modal.Content>
            </Modal>
        </> );
}

export default SearchLandingPage;