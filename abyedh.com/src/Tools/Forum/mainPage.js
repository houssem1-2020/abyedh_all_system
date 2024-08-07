import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import { Icon, Input } from 'semantic-ui-react'

function BlogPage() {
    /* ###########################[const]############################ */
    const Items = [
        {id:1, size:4 , link:'generale',  icon:'lightbulb-fill',  iconColor:'#423e42', text:'المنتدي العام', smallText:'بطاقة التعريف , مضمو ولادة ...'},
        {id:1, size:4 , link:'sante',  icon:'heart-pulse',  iconColor:'#4287f5', text:'منتدي قطاع الصحة', smallText:'بطاقة علاج , جواز صحي, وصفة طبية , ...'},
        {id:1, size:4 , link:'transport',  icon:'car-front-fill',  iconColor:'#fcba03', text:' منتدي قطاع النقل', smallText:'رخصة سياقة , البطاقة الرمادية ...'},
        {id:1, size:4 , link:'finance',  icon:'currency-dollar',  iconColor:'#0de089', text:'منتدي قطاع المالية', smallText:'البريد , البنوك التونسية ...'},
        {id:1, size:4 , link:'droit',  icon:'bank',  iconColor:'#810de0', text:'منتدي العدل و القضاء ', smallText:'أنواع المحاكم , مجلات قانونية ...'},
        {id:1, size:4 , link:'religious',  icon:'moon-fill',  iconColor:'#e0420d', text:'منتدي الشؤون الدينية', smallText:'التسجيل للحج , رخصة بناء جامع ...'},
        {id:1, size:4 , link:'commerce',  icon:'cart4',  iconColor:'#8a0c79', text:'منتدي الشغل و التجارة', smallText:'كراس الشروط , أنشاء شركة تونسية ...'},
        {id:1, size:4 , link:'education',  icon:'briefcase-fill',  iconColor:'#0d96e0', text:'منتدي قطاع التعليم ', smallText:'النقلة المدرسية , الباكالوريا, المنحة الجامعية ...'},
        {id:1, size:4 , link:'tourisme',  icon:'airplane-fill',  iconColor:'#0de0b9', text:'منتدي السياحة و السفر', smallText:'جواز السفر ,الحصول علي فيزا ...'},
        {id:1, size:4 , link:'sociale',  icon:'people-fill',  iconColor:'#0de089', text:'المنتدي الإجتماعي ', smallText:'المنح الإجتماعية , التأمين ...'},
    ]

    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    /* ###########################[Card]############################# */
    const TopNavBar = () =>{
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3">
                    <img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.com/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />
                </NavLink>
            </>)
        }
        return(<>
                <nav className="p-2 fixed-top navshad" style={{backgroundColor: 'white'}}>
                    <div className='row'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to='/Tools' className="m-0 p-0 ms-3">
                                <img  className="border-div-s d-none d-lg-inline border bg-danger" src="https://cdn.abyedh.com/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px', borderRadius: '10px 20px 10px 50px'}} />
                                <div  className="d-lg-none d-inline-block text-secondary p-1"  > <span className='bi bi-arrow-left-short bi-md ' ></span> </div>
                            </NavLink>
                        </div>
                        <div className='col-6 text-end align-self-center'>
                            {GConf.UserData.Logged ? <UserCard />  : <NavLink exact='true' to='/Profile' className="m-0 p-0 me-3 text-white"> تَسْجِيلْ الدٌخٌولْ</NavLink>}
                        </div>
                    </div>
                </nav>
            </>)
    }

    const AdsLanding = () =>{
        return(<>
        <div className='card-body rounded-0' style={{height:'170px', backgroundColor:'white', marginTop:'55px'}}>
            <div className='row'>
                <div className='col-12 col-lg-8 align-self-center text-center'>
                       <h3  dir='rtl' style={{color:GConf.Tools.Forum.themeColor}}> {GConf.Tools.Forum.textAds} </h3>
                </div>
                <div className='col-4 align-self-end text-center d-none d-lg-block'>
                    <img src='https://cdn.abyedh.com/images/Tools/blog.svg' className='img-responsive' width='40%' height='40%'  />
                </div>
            </div> 
        </div>
        </>)
    }
    const ButtomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card' style={{backgroundColor: '#dc3545'}}>
                <div className='text-end text-white me-5'>
                    <b>منصة أبيض التونسية </b>
                </div>
            </div>
        </>)
    }
    const LinkCard = (props) =>{
        return(<>
            <NavLink exact='true' to={`landing/${props.data.link}`}>
                <div className='card card-body shadow-sm mb-3 border-div'>
                    <div className='row'>
                        <div className='col-3 align-self-center'>
                             <div className="icon-shape text-white rounded-circle elevation" style={{backgroundColor: GConf.Tools.Forum.themeColor, width: `${props.data.size}rem`, height: `${props.data.size}rem`}} >
                                <i className={`bi bi-${props.data.icon} `} style={{fontSize:`${props.data.size / 2 }rem`}}></i>
                            </div>
                        </div>
                        <div className='col-9 align-self-center text-secondary text-end'>
                            <h2 className='mb-0'>{props.data.text}</h2>
                            <small> {props.data.smallText} </small>
                           <br />
                        </div>
                    </div>
                </div> 
            </NavLink>
        </>)
    }
    const SearchBarCard = () =>{
        return(<>
            <div className='mb-4'>
                <Input
                    fluid 
                    size='big'
                    icon={ <Icon name='search' inverted circular link onClick/>}
                    placeholder='بحث'
                    
                />
            </div>
        </>)
    }
    return ( <>
        <TopNavBar />
        <br />
        <AdsLanding /> 
        <br />
        
        <div className='container' dir='rtl'>
            <SearchBarCard />
            <div className='row'>
                <div className='col-12 col-md-6'><LinkCard data={Items[0]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[1]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[2]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[3]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[4]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[5]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[6]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[7]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[8]} /></div>
                <div className='col-12 col-md-6'><LinkCard data={Items[9]} /></div>
            </div>
        </div>
        <ButtomCard /> 
    </> );
}

export default BlogPage;