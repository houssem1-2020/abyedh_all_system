import React, { useEffect, useRef } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import NavBar from './navBar';
import GConf from '../Assets/generalConf';
import { Grid, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Button, Icon } from 'semantic-ui-react'
import ReactGA from 'react-ga';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function LandingPage() {
    const topRef = useRef(20)
    let {system} = useParams()
    const targetSystem = GConf.landing[system];
    const Pros = [
        {id:1, title:'متصل', tag:'connected', color:'#4287f5', icon:'link-45deg', text:'يبقيك النظام في حالة إتصال دائم مع عملائك من خلال دليل شامل و تفاعلي يخول لهم التواصل معك بطريقة ذكية كما يبقيك متصل بكامل فريق العمل من خلال لوحات تحكم خاصة بهم لمتباعة أعمالهم و مراقبة مهامهم'},
        {id:2, title:'سهل', tag:'easy', color:'#5dd492', icon:'emoji-smile', text:'يهدف النظام أن يكون بسيطا ولكن فعال في نفس الوقت و ذلك من خلال تنضيمة و تبويبه بطريقة بسيطة في نسخته الحالية'},
        {id:3, title:'معين', tag:'helpfull', color:'#8923e8', icon:'arrows-move', text:'لا يكتفي النظام بمدك بأدوات الإدارة فقط بل يسعي ليكون عونا لك في أداء عملك من خلال إدوات إضافية تساعدك و تحسن من معرفتك بعملك مثلا كقاموس الأدوية و موسوعة الأمراض و مجسم ثلاثي الأبعاد لجسم الإنسان و غيرها ...'},
        {id:4, title:'متطور', tag:'progressed', color:'#5d6360', icon:'arrow-repeat', text:'نظام أبيض هو نظام سحابي و ليس نظام مثبت علي الحاسوب الشخصي لذلك يعمل فريق عمل أبيض المبدع علي تطويره و جعله مناسبا و مريحا و سهل الإستخدام ليكون مختلفا عن الأنظمة الكلاسكية "الجامدة"'},
        {id:5, title:' مدعوم', tag:'supported', color:'#e6327a', icon:'info-circle-fill', text:'يأتي النظام مدعوما بدليل إستعمال شامل و إجابة دقيقة لكل الأسئلة التي يمكن أن تراودك عند بداية إستعمالك للنظام . لن تحتاج أن تتصل بخبير ليعلمك إستخدام النظام حيث يوجد شرح مفصل لكل وضائفه'},
        {id:6, title:'ذكي', tag:'smart', color:'#d16200', icon:'lightbulb', text:'يقوم النضام بتجهيز خوارزمية لأتمتة العمليات الروتينية و المتكررة ما يعطي النضام صفة الذكاء و أتخاذ قرارات روتينية بنائا علي سلوك المستخدم'},

    ]
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    //useEffect
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" })
        ReactGA.pageview(window.location.pathname);
    }, [])
    
    // function 
    const  handleClick = (targetSystem) => {
        ReactGA.event({
          category: targetSystem,
          action: 'SystemLink',
          label: targetSystem
        });
      }

    //card 
    const TopAdsCard = ()=>{
            return(<>
                <div className="container" >
                    <div className='row mt-5'>
                        <div className={` ${isRTL ? 'order-lg-2' : ' '} col-12 col-lg-8 align-self-center   `} dir={isRTL ? 'rtl' : 'ltr'}>
                            <h2 className={`${isRTL ? 'text-end' : 'text-start'} text-secondary   animated    display-4 `}  dir={!isRTL ? 'rtl' : 'ltr'}>  {t(`mainPageLanding.systemNames.${system}`)} </h2>
                            <h5 className="text-secondary text-right mb-5 col-12 col-lg-7 " dir={isRTL ? 'rtl' : 'ltr'}>
                                 
                                {t(`systemLandingPage.adsText.${system}`)}
                            </h5>
                            <div className="row" dir={isRTL ? 'rtl' : 'ltr'}>
                                <div className="col-lg-3 col-6 text-start  align-self-center mr-1 order-2 order-lg-1 mb-4">
                                    {/* <NavLink to={targetSystem.systemUrl == '#' ? '#' : `/Inscription/${system}`} className="btn btn-md btn-primary rounded-pill border-0 float-right " style={{backgroundColor: targetSystem.colorTheme}}> <span className="bi bi-at"></span> إشترك الأن <span className="bi bi-arrow-left-short"></span></NavLink> */}
                                    <a href={`https://abyedh.com/S/I/add/${system}`} className="btn btn-md btn-primary rounded-pill border-0 float-right " style={{backgroundColor: targetSystem.colorTheme}}> <span className="bi bi-at"></span>{t(`systemLandingPage.subscribeTo`)} <span className="bi bi-arrow-left-short"></span></a>
                                </div>
                                <div className="col-lg-3 col-6 text-end">
                                    <span onClick={() => handleClick(targetSystem.systemTitle)}>
                                        <a href={targetSystem.systemUrl} target='c_blank' className="btn btn-md btn-danger float-right rounded-pill" >  <span className="bi bi-arrow-right-short"></span> {t(`systemLandingPage.goToSystem`)}  <span className="bi bi-pc-display-horizontal"></span> </a>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={` ${isRTL ? 'order-1' : ' '} col-12 col-lg-4 `}>
                            <img src={`https://cdn.abyedh.com/images/ads/${targetSystem.adsImageUrl}`} className="img-responsive " width='100%' height='100%' />
                        </div>
                    </div>

                </div>

                </>)
    }
    const ImgCarouselCard = (props)=>{
        const PCard = (props) =>{
            return(<>
                    <div className='row p-0 mb-4' style={{cursor: 'pointer'}}>
                        <div className='col-12 col-lg-12 p-0 align-self-center text-center order-2 order-lg-1 '>
                            <div className='mb-3 '>
                                 <img src={`https://cdn.abyedh.com/Images/system_landing/${props.data.link}`} className='img-responsive border-div  shadow-sm border small-img-screen' width='95%'   />
                            </div>
                        </div>
                        {/* <div className='col-12 col-lg-5  p-0 order-1 order-lg-2    d-none d-lg-block' >
                            <div className="text-start ms-4 text-secondary" dir={!isRTL ? 'rtl' : 'ltr'}>
                               
                               
                            </div> 
                        </div> */}
                    </div> 
                </>)
        }
        return(<>
                <br />
                <br />
                <br />
                <br />
                <div className="container-fluid" >
                    <div className="card card-body   border-0 border-div 0 ">
                        <div  dir={isRTL ? 'rtl' : 'ltr'}>
                            <Swiper
                                slidesPerView= {1.3}
                                centeredSlides = { true}
                                spaceBetween={30}
                                loop={true}
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                // className="mySwiper pb-4 mb-1"
                            >
                                {props.data.map( (carouselData,index)=> <SwiperSlide key={index}>
                                    <PCard  key={index} data={carouselData} index={index} /></SwiperSlide>)}
                            </Swiper> 
                        </div>
                    </div>
                    {/* <Carousel>
                        {props.data.map((data,index) => 
                                <div key={index}>
                                    <img src={`https://cdn.abyedh.com/Images/system_landing/${data.link}`} />
                                    <p className="legend" dir={isRTL ? 'rtl' : 'ltr'}>
                                        <i className={`bi bi-${data.icon}`}></i>  {data.title}
                                    </p>
                                </div>
                        )}
                    </Carousel> */}
                </div>
            </>)
    }
    const TrySystemCard = ()=>{
        return(<>
        <div className="container" >
            <div className="text-end text-secondary mb-3 d-lg-none font-hs-n"><h4><b className='font-hs-n '>نسخة مجانية لتجرب النظام</b></h4></div>
            <div className="row">

                <div className="col-lg-6 col-12  align-self-center">
                    <div className="text-end text-secondary mb-3 d-none d-lg-block font-hs-n"><h4><b className='font-hs-n '>نسخة مجانية لتجرب النظام</b></h4></div>
                    <h5 className="text-secondary text-end mb-4 ">
                        توفر منصة أبيض لجميع أنضمتها نسخ <span className="text-danger">تجريبية إفتراضية</span> لتساعد الراغبين في استخدام النظام 
                        علي إشكتشاف مختلف جوانبة دون الحاجة للتسجيل 
                        <br />
                        هذه النسخة تمكنك من محاكاة فورية للنضام المستهدف لتتيح لك تجربة مستخدم مماثلة للنسخة المدفوعة 
                        
                    </h5>
                </div>
                <div className="col-lg-6 col-12 align-self-center text-end">
                    <img src="https://assets.abyedh.com/img/system/System/landing-page/blogging.svg" className="img-responsive mb-4" width='80%' height='80%' />
                </div>
            </div>
        </div>
        
                </>)
    }

    const ProsCard = (props)=>{
        const PCard = (props) =>{
            return(<>
                    <div className='row p-3 mb-4' style={{cursor: 'pointer'}}>
                        <div className='col-12 col-lg-6 p-0 order-2 order-lg-1 align-self-center' >
                            <div className={`${isRTL ? 'text-end' : 'text-start'} me-4"`} dir={isRTL ? 'rtl' : 'ltr'} style={{color: props.data.color}}>
                                <h3 className="font-weight-bold display-5">       
                                     <i className={`bi bi-${props.data.icon}`}></i> {t(`systemLandingPage.prosConsData.${props.data.tag}.smallText`)} 
                                </h3>
                                <h5 className="font-hs-t ">
                                    {/* {props.data.text} */}
                                    {t(`systemLandingPage.prosConsData.${props.data.tag}.largeText`)}
                                </h5>
                            </div> 
                        </div>
                        <div className='col-12 col-lg-6 p-0 align-self-center text-center order-1 order-lg-2 d-none d-lg-block'>
                            {/* <div className="icon-small icon-small-shape text-white rounded-circle shadow m-3" style={{backgroundColor: props.data.color}}>
                                <i className={`bi bi-${props.data.icon}`}></i>
                            </div> */}
                            <div className='mb-3'>
                                 <img src={`https://cdn.abyedh.com/Images/system_landing/landing_img/landing_icon_${props.index}.png`} className='img-responsive  ' width='50%' height='200px' />
                            </div>
                        </div>
                    </div> 
                </>)
        }
        return(<>
                <div className="container" >
                    <div className="card card-body shadow-sm  border border-div 0 ">
                        <h5 className="text-end text-secondary mb-4 p-3 font-hs-n" dir={isRTL ? 'rtl' : 'ltr'}><b> {t('systemLandingPage.prosConsText')}  </b></h5>
                        <br />
                        <div  dir={isRTL ? 'rtl' : 'ltr'}>
                            <Swiper
                                spaceBetween={30}
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper pb-4 mb-1"
                            >
                                {props.table.map( (pos,index)=> <SwiperSlide key={index}><PCard  key={index} data={pos} index={index} /></SwiperSlide>)}
                            </Swiper> 
                        </div>
                    </div>
                </div>
            </>)
    }
    const PriceCard = ()=>{
        const SpecificCard = (props) =>{
            return(<>
                    <div className={`col-lg-4 mb-2 p-3`}>
                        <div className="card p-3 pt-5 h-100 shadow border-div text-center">
                            <h5 className="card-title text-white"><b><span className="badge bg-success p-2">  {t(`systemLandingPage.${props.data.tagName}`)}  </span></b></h5>
                            <div className="text-blod" dir={isRTL ? 'rtl' : 'ltr'}><b style={{color:"#7f23db"}} className='h1'>{props.data.price}</b>  {t(`systemLandingPage.currencyText`)}  <small className="small text-secondary">/ {t(`systemLandingPage.fullYearText`)}  </small></div>
                            <div className="p-2 h-100">
                                <ul dir={isRTL ? 'rtl' : 'ltr'} className={`${isRTL ? 'text-end' : 'text-start'}`} style={{listStyleType:"none"}}>
                                    {props.data.pos.map((data,index) => <li key={index}><span className={`bi bi-${data.checked ? 'check-lg bi-sm text-success' : 'x-lg bi-sm text-danger'}`}></span> {t(`systemLandingPage.prosItemList.${index+1}`)}   </li>)}
                                </ul>
                            </div>
                            <div className='mt-2 d-grid gap-2' >
                                {/* <a exact='true' href={targetSystem.systemUrl == '#' ? '#' : `/Inscription/${system}`} className='d-grid gap-2' style={{pointerEvents : props.data.ready ? '' : 'none'}} > */}
                                <a exact='true' href={`https://abyedh.com/S/I/add/${system}`} className='d-grid gap-2' style={{pointerEvents : props.data.ready ? '' : 'none'}} >
                                    <Button animated className='bg-danger font-droid text-white p-3 rounded-pill' disabled={!props.data.ready}>
                                        <Button.Content visible> {t(`systemLandingPage.subscribeBtn`)} </Button.Content>
                                        <Button.Content hidden> <Icon name='arrow right' /> </Button.Content>
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </>)
        }
        return(<>
                <div className='container'>
                        <h2 className="text-right  mb-4" dir={isRTL ? 'rtl' : 'ltr'} style={{color: targetSystem.colorTheme}}><b>   {t('systemLandingPage.subscribeNow')}  </b></h2>
                        <div className='row d-none d-lg-flex' dir={isRTL ? 'rtl' : 'ltr'}>
                            {targetSystem.prices.map( (data,index) => <SpecificCard key={index} data={data} /> )}
                        </div>
                        <div className='d-lg-none ' dir={isRTL ? 'rtl' : 'ltr'}>
                            <Swiper
                                spaceBetween={30}
                                pagination={{
                                    dynamicBullets: true,
                                }}
                                modules={[Pagination]}
                                className="mySwiper pb-4 mb-1"
                            >
                                {targetSystem.prices.map( (data,index)=> <SwiperSlide key={index}><SpecificCard key={index} data={data}/></SwiperSlide>)}
                            </Swiper>

                        </div>
                </div>
        
                </>)
    }
    const BottomCards = () =>{
        return(<>
            <div className='card-body rounded-bottom-card ' style={{backgroundColor: targetSystem.colorTheme}}>
                <div className='row'>
                    <div className='col-12 col-lg-4 align-self-center d-none d-lg-block text-end'>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'> +216 96787676  - <span className='bi bi-telephone-outbound-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white'>  abyedh@abyedh.com -  <span className='bi bi-mailbox2' ></span></NavLink></div>
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
                        <img  className="rounded-pill-abyedh" src="https://cdn.abyedh.com/images/logo/mlogo.gif" alt="Logo" style={{width:'40px', height:'90px'}} />
                    </div>
                </div>
            </div>
        </>)
    }
    const BottomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card ' style={{backgroundColor: targetSystem.colorTheme}}>
                <div className='row'>
                    <div className={` col-12 col-lg-4 align-self-center d-none d-lg-block  ${isRTL ? 'text-end order-1' : 'text-start order-3'}  `}>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}> +216 96787676  - <span className='bi bi-telephone-outbound-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  khelifihoussem53@gmail.com -  <span className='bi bi-mailbox2' ></span></NavLink></div>
                        <div className='d-inline mt-2'>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-facebook bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-youtube bi-md' ></span></NavLink></div>
                            <div className='d-inline m-2'><NavLink exact='true' to='/#' className='text-white'><span className='bi bi-app-indicator bi-md' ></span></NavLink></div>
                        </div>
                    </div>
                    <div className={` col-7 col-lg-4 align-self-center order-2 ${isRTL ? 'text-end' : 'text-start'}  text-secondary`}>
                        <div className='mb-1'><NavLink exact='true' to='/About' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  {t('bottomCard.footerVision')} - <span className='bi bi-patch-question-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/Country' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}>  {t('bottomCard.footerHow')} -  <span className='bi bi-brush-fill' ></span></NavLink></div>
                        <div className='mb-1'><NavLink exact='true' to='/#' className='text-white' dir={!isRTL ? 'rtl' : 'ltr'}> {t('bottomCard.footerWho')}  -  <span className='bi bi-people-fill' ></span> </NavLink></div>
                    </div>
                    <div className={` col-5 col-lg-4 align-self-center text-center  ${isRTL ? 'order-3' : 'order-1'}  `} >
                        <img  className="rounded-pill-abyedh-s" src="https://cdn.abyedh.com/images/logo/mlogo.gif" alt="Logo" style={{width:'40px', height:'90px', borderRadius: '10px 20px 10px 50px'}} />
                    </div>
                </div>
            </div>
        </>)
    }

    return ( <>
        <NavBar landing color={targetSystem.colorTheme} />
        <div ref={topRef} />
        <br />
        <br />
        <br />
        <br />
        <br />

        <TopAdsCard />
        <br />
        <br />
        <br />
        <br />
        <br />

        {/* {targetSystem.imageCarousel ? <ImgCarouselCard table={Pros} data={targetSystem.imageCarousel} /> : '' } */}
        <br />
        <br /> 
        <br />
        {/*<TrySystemCard /> */}
        <br />
        <br /> 
        <br />
        <ProsCard table={Pros} /> 
        <br />
        <br />
        <br />
        <br />
        <br />

        <PriceCard />
        <br />
        <br />
        <br />
        <BottomCard /> 
    </> );
}

export default LandingPage;