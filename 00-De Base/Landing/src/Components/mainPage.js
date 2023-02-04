import React, { useEffect, useRef } from 'react';
import NavBar from './navBar';
import GConf from '../Assets/generalConf';
import { NavLink } from 'react-router-dom';
function MainPage() {
    const topRef = useRef(20)

    //useEffect
    useEffect(() => {
        topRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [])

    const TopCard = () =>{
        return(<>
            <div className="m-5 ">
                <div className='row'>
                    <div className='col-4 d-none d-lg-block'><img src="https://assets.abyedh.tn/img/system/required/log-img-1.gif" alt='.' className='img-responsive' width='100%' height='150px'/></div>
                    <div className='col-12 col-lg-5 algin-self-center text-center'><div><h1 className='text-danger display-3 mt-3'> <b>أنظمة أبيض</b></h1></div></div>
                    <div className='col-3 d-none d-lg-block text-end'><img src="https://assets.abyedh.tn/img/system/required/log-img-2.gif" alt='.' className='img-responsive' width='70%' height='150px'/></div>
                </div>
            </div>
        </>)
    }
    const TopNavBar = () =>{
        let UID = localStorage.getItem('UID')
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3">
                    <img  className="rounded-circle p-0 m-0 me-3" src="https://abyedh.tn/Assets/images/p_pic/15.gif"   alt="Logo" style={{width:'30px', height:'30px'}} />
                </NavLink>
            </>)
        }
        return(<>
                <div className="rounded-0 border-0 p-2 m-0 bg-danger navshad fixed-top" >
                    <div className='row'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                <img  className="border-div" src="https://cdn.abyedh.tn/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px'}} />
                            </NavLink>
                        </div>
                        <div className='col-6 text-end align-self-center'>
                            {/* {UID ? <UserCard />  : ''} */}
                        </div>
                    </div>
                </div>
            </>)
    }
    const BottomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card bg-danger'>
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

    const AdsCard = () =>{
        return(<>
        <div className="text-end jumbtron p-5 border-div" dir="rtl">
            <div className="row">
                <div className="col-12 col-lg-4 align-self-center ">
                <img src="https://assets.abyedh.tn/img/system/required/system-ads.svg" className="img-responsive mb-4"  width='100%' height='150px' />
                </div>
                <div className="col-12 col-lg-8 align-self-center"> 
                    إن رقمنة العمليات اليومية المختلفة في ميادين الأعمال المتنوعة سيساعد في تطويرها و الإرتقاء بجودتها نحو الأفضل مما يساهم في تقليص للمجهود و ربح للوقت و للتكايف, لذلك
                    تهدف منصة أبيض إلي تحسين محيط و بيئة الاعمال في تونس في جميع المجالات من خلال العديد من الأنظمة الإدارية . 
                    <br /><br />
                    <small>توفر منصة أبيض العديد من الأنظمة في مختلف المجالات :</small>
                </div>
            </div>
        </div>
        </>)
    }
    const LinkCard = (props) =>{
        return(<>
        <div className={`col-12 col-lg-${props.link.col} mb-2 p-1 `}>
            <NavLink to={`Landing/${props.link.tag}`}>
            <div className={`card border-div shadow-sm p-3 ${props.link.ready ? 'border-ready':''}`} >
                <div className="row">
                    <div className="col-4 align-self-center text-center">
                        <div className="icon icon-shape shadow" style={{backgroundColor: props.link.color}}>
                            <img src={`https://assets.abyedh.tn/img/system/Search/WIcons/${props.link.img_url}`} className="img-responsive" width="100%" />
                        </div>
                    </div>
                    <div className="col-8 align-self-center">
                        <div className="text-end text-secondary mb-2"><h4><b> {props.link.name} </b></h4></div>
                    </div>
                </div>
            </div>
            </NavLink>
            </div>
        </>)
    }
    const ContainerLinksCard = (props) =>{
        return(<>
            <div className="text-end text-info mb-3" dir="rtl"><h5><b><span className="fa fa-shopping-cart"></span> {props.data.title} :</b></h5></div>
            <div className="row">
                <div className={`col-12 col-lg-3 align-self-center ${props.data.genre === 'LI' ? 'order-2': ''}`}>
                <img src={`https://assets.abyedh.tn/img/system/img_ads/${props.data.adsUrl}`} className="img-responsive" width="80%" />
                </div>
                <div className="col-12 col-lg-9 align-self-center">
                    <div className='row' dir='rtl'>
                        {props.data.Links.map( (linksData) => <LinkCard key={linksData.id} link={linksData}  />)}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
        </>)
    }
    return ( <>
        <TopNavBar />
        <div ref={topRef} />
        <br />
        <br />
        <br />
        <br />
        <TopCard />
        <br />
        <br />
        <div className='container'>
            <AdsCard />
            <br />
            <br />
            <br />
            {GConf.tabContainer.map( (tabData) => <ContainerLinksCard key={tabData.id} data={tabData}  />)}
        </div>
        <br />
        <br />
        <br />
        <BottomCard />
    </> );
}

export default MainPage;