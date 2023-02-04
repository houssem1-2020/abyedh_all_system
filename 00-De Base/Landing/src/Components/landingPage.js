import React, { useEffect, useRef } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import NavBar from './navBar';
import GConf from '../Assets/generalConf';
import { Grid, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Button, Icon } from 'semantic-ui-react'

function LandingPage() {
    const topRef = useRef(20)
    let {system} = useParams()
    const targetSystem = GConf.landing[system];
    const Pros = [
        {id:1, title:'متصل', color:'#4287f5', icon:'link-45deg', text:'يبقيك النظام في حالة إتصال دائم مع عملائك من خلال دليل شامل و تفاعلي يخول لهم التواصل معك بطريقة ذكية كما يبقيك متصل بكامل فريق العمل من خلال لوحات تحكم خاصة بهم لمتباعة أعمالهم و مراقبة مهامهم'},
        {id:2, title:'سهل', color:'#5dd492', icon:'emoji-smile', text:'يهدف النظام أن يكون بسيطا ولكن فعال في نفس الوقت و ذلك من خلال تنضيمة و تبويبه بطريقة بسيطة في نسخته الحالية'},
        {id:3, title:'معين', color:'#8923e8', icon:'arrows-move', text:'لا يكتفي النظام بمدك بأدوات الإدارة فقط بل يسعي ليكون عونا لك في أداء عملك من خلال إدوات إضافية تساعدك و تحسن من معرفتك بعملك مثلا كقاموس الأدوية و موسوعة الأمراض و مجسم ثلاثي الأبعاد لجسم الإنسان و غيرها ...'},
        {id:4, title:'متطور', color:'#5d6360', icon:'arrow-repeat', text:'نظام أبيض هو نظام سحابي و ليس نظام مثبت علي الحاسوب الشخصي لذلك يعمل فريق عمل أبيض المبدع علي تطويره و جعله مناسبا و مريحا و سهل الإستخدام ليكون مختلفا عن الأنظمة الكلاسكية "الجامدة"'},
        {id:5, title:' مدعوم', color:'#e6327a', icon:'info-circle-fill', text:'يأتي النظام مدعوما بدليل إستعمال شامل و إجابة دقيقة لكل الأسئلة التي يمكن أن تراودك عند بداية إستعمالك للنظام . لن تحتاج أن تتصل بخبير ليعلمك إستخدام النظام حيث يوجد شرح مفصل لكل وضائفه'},
        {id:6, title:'ذكي', color:'#d16200', icon:'lightbulb', text:'يقوم النضام بتجهيز خوارزمية لأتمتة العمليات الروتينية و المتكررة ما يعطي النضام صفة الذكاء و أتخاذ قرارات روتينية بنائا علي سلوك المستخدم'},

    ]
    //useEffect
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])
    
    //card 
    const TopAdsCard = ()=>{
        return(<>
                <div className="container" >
                    <div className='row'>
                        <div className='col-12 col-lg-8 align-self-center '>
                        <h2 className="text-secondary text-end animated faster slideInUp">{targetSystem.systemTitle} </h2>
                            <h6 className="text-secondary text-right mb-5" dir="rtl">
                                {targetSystem.adsText}
                            </h6>
                            <div className="row" dir="rtl">
                                <div className="col-6 text-start  align-self-center mr-1 order-2 order-lg-1 mb-4">
                                    <NavLink to={targetSystem.systemUrl == '#' ? '#' : `/Inscription/${system}`} className="btn btn-md btn-primary rounded-pill  float-right " > <span className="bi bi-at"></span> إشترك الأن <span className="bi bi-arrow-left-short"></span></NavLink>
                                </div>
                                <div className="col-6 text-end">
                                    <a href={targetSystem.systemUrl} className="btn btn-md btn-danger float-right rounded-pill" >  <span className="bi bi-arrow-right-short"></span>  الدخول للنظام  <span className="bi bi-pc-display-horizontal"></span> </a>
                                </div>
                            </div>
                        </div>
                        <div className='col-12 col-lg-4 order-1 order-lg-2'>
                            <img src={`https://cdn.abyedh.tn/images/ads/${targetSystem.adsImageUrl}`} className="img-responsive mt-5" width='100%' height='100%' />
                        </div>
                    </div>

                </div>

                </>)
    }
    const ImgCarouselCard = ()=>{
        return(<>
        
                </>)
    }
    const TrySystemCard = ()=>{
        return(<>
        <div className="container" >
            <div className="text-end text-secondary mb-3 d-lg-none"><h4><b>نسخة مجانية لتجرب النظام</b></h4></div>
            <div className="row">
                <div className="col-lg-6 col-12 align-self-center">
                    <img src="https://assets.abyedh.tn/img/system/System/landing-page/blogging.svg" className="img-responsive mb-4" width='80%' height='80%' />
                </div>
                <div className="col-lg-6 col-12  align-self-center">
                <div className="text-end text-secondary mb-3 d-none d-lg-block"><h4><b>نسخة مجانية لتجرب النظام</b></h4></div>
                <h6 className="text-secondary text-end mb-4">
                    توفر منصة أبيض لجميع أنضمتها نسخ <span className="text-danger">تجريبية إفتراضية</span> لتساعد الراغبين في استخدام النظام 
                    علي إشكتشاف مختلف جوانبة دون الحاجة للتسجيل 
                    <br />
                    هذه النسخة تمكنك من محاكاة فورية للنضام المستهدف لتتيح لك تجربة مستخدم مماثلة للنسخة المدفوعة 
                    
                </h6>
                
                </div>
            </div>
        </div>
        
                </>)
    }

    const ProsCard = (props)=>{
        const PCard = (props) =>{
            return(<>
                    <div className='row p-0 mb-4' style={{cursor: 'pointer'}}>
                        <div className='col-12 col-lg-6 p-0 order-2 order-lg-1 align-self-center' >
                            <div className="text-end me-4" dir="rtl" style={{color: props.data.color}}>
                                <h3 className="font-weight-bold">       
                                    {props.data.title}
                                </h3>
                                <h5 className="small">
                                    {props.data.text}
                                </h5>
                            </div> 
                        </div>
                        <div className='col-12 col-lg-6 p-0 align-self-center text-center order-1 order-lg-2 '>
                            {/* <div className="icon-small icon-small-shape text-white rounded-circle shadow m-3" style={{backgroundColor: props.data.color}}>
                                <i className={`bi bi-${props.data.icon}`}></i>
                            </div> */}
                            <div>
                                 <img src={`https://cdn.abyedh.tn/Images/system_landing/boutique${props.index +1 }.png`} className='img-responsive border-div shadow-lg' width='70%' height='200px' />
                            </div>
                        </div>
                    </div> 
                </>)
        }
        return(<>
                <div className="container" >
                    <div className="card p-3 shadow-sm  border border-div 0 ">
                        <h5 className="text-end text-secondary mb-4 p-3" dir="rtl"><b> يتمتع بعدة مزايا   </b></h5>
                        <br />
                        <div  dir="rtl">
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
                        <div className="card p-3 pt-5 h-100 shadow rounded text-center">
                            <h5 className="card-title text-white"><b><span className="badge bg-success p-2">{props.data.tag}</span></b></h5>
                            <div className="text-blod" dir='rtl'><b style={{color:"#7f23db"}} className='h1'>{props.data.price}</b> د <small className="small text-secondary">/ سنة كاملة</small></div>
                            <div className="p-2 h-100">
                                <ul dir="rtl" className="text-end" style={{listStyleType:"none"}}>
                                    {props.data.pos.map((data,index) => <li key={index}><span className={`bi bi-${data.checked ? 'check-lg bi-sm text-success' : 'x-lg bi-sm text-danger'}`}></span> {data.text}</li>)}
                                </ul>
                            </div>
                            <div className='mt-2 d-grid gap-2' >
                                <NavLink exact='true' to={targetSystem.systemUrl == '#' ? '#' : `/Inscription/${system}`} className='d-grid gap-2' >
                                    <Button animated className='bg-danger font-droid text-white p-3 rounded-pill' disabled={!props.data.ready}>
                                        <Button.Content visible>إشترك الأن</Button.Content>
                                        <Button.Content hidden> <Icon name='arrow right' /> </Button.Content>
                                    </Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </>)
        }
        return(<>
                <div className='container'>
                    <h5 className="text-right text-danger mb-4" dir="rtl"><b> إشترك الأن وأحصل علي 14 يوم مجانية </b></h5>
                        <div className='row d-none d-lg-flex' dir='rtl'>
                            {targetSystem.prices.map( (data,index) => <SpecificCard key={index} data={data} /> )}
                        </div>
                        <div className='d-lg-none ' dir='rtl'>
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
    const BottomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card ' style={{backgroundColor: targetSystem.colorTheme}}>
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
        <ImgCarouselCard />
        <br />
        <br /> 
        <br />
        <TrySystemCard />
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