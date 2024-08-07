import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import { Icon, Input } from 'semantic-ui-react'

function BlogPage() {
    /* ###########################[const]############################ */
    const Items = [
        {id:1, size:3 , link:'Tunis',  icon:'heart-pulse',  iconColor:'#4287f5', text:'تونس', smallText:'بطاقة علاج , جواز صحي, وصفة طبية , ...'},
        {id:1, size:3 , link:'Sfax',  icon:'car-front-fill',  iconColor:'#fcba03', text:'صفاقص', smallText:'رخصة سياقة , البطاقة الرمادية ...'},
        {id:1, size:3 , link:'Nabeul',  icon:'currency-dollar',  iconColor:'#0de089', text:'نابل', smallText:'البريد , البنوك التونسية ...'},
        {id:1, size:3 , link:'Sousse',  icon:'bank',  iconColor:'#810de0', text:'سوسة', smallText:'أنواع المحاكم , مجلات قانونية ...'},
        {id:1, size:3 , link:'Ben Arous',  icon:'moon-fill',  iconColor:'#e0420d', text:'بن عروس', smallText:'التسجيل للحج , رخصة بناء جامع ...'},
        {id:1, size:3 , link:'Ariana',  icon:'cart4',  iconColor:'#8a0c79', text:'أريانة', smallText:'كراس الشروط , أنشاء شركة تونسية ...'},
        {id:1, size:3 , link:'Kairouan',  icon:'briefcase-fill',  iconColor:'#0d96e0', text:'القيروان ', smallText:'النقلة المدرسية , الباكالوريا, المنحة الجامعية ...'},
        {id:1, size:3 , link:'Bizerte',  icon:'airplane-fill',  iconColor:'#0de0b9', text:'بنزرت', smallText:'جواز السفر ,الحصول علي فيزا ...'},
        {id:1, size:3 , link:'Monastir',  icon:'lightbulb-fill',  iconColor:'#423e42', text:'المنستير', smallText:'بطاقة التعريف , مضمو ولادة ...'},
        {id:1, size:3 , link:'Medenine',  icon:'people-fill',  iconColor:'#0de089', text:'مدنين', smallText:'المنح الإجتماعية , التأمين ...'},
        {id:1, size:3 , link:'Kasserine',  icon:'heart-pulse',  iconColor:'#4287f5', text:'القصرين', smallText:'بطاقة علاج , جواز صحي, وصفة طبية , ...'},
        {id:1, size:3 , link:'Sidi Bouzid',  icon:'car-front-fill',  iconColor:'#fcba03', text:'سيدي بوزيد', smallText:'رخصة سياقة , البطاقة الرمادية ...'},
        {id:1, size:3 , link:'Mahdia',  icon:'currency-dollar',  iconColor:'#0de089', text:'المهدية', smallText:'البريد , البنوك التونسية ...'},
        {id:1, size:3 , link:'Jendouba',  icon:'bank',  iconColor:'#810de0', text:'جندوبة', smallText:'أنواع المحاكم , مجلات قانونية ...'},
        {id:1, size:3 , link:'Manouba',  icon:'moon-fill',  iconColor:'#e0420d', text:'منوبة', smallText:'التسجيل للحج , رخصة بناء جامع ...'},
        {id:1, size:3 , link:'Gabes',  icon:'cart4',  iconColor:'#8a0c79', text:'قابس', smallText:'كراس الشروط , أنشاء شركة تونسية ...'},
        {id:1, size:3 , link:'Gafsa',  icon:'briefcase-fill',  iconColor:'#0d96e0', text:'قفصة ', smallText:'النقلة المدرسية , الباكالوريا, المنحة الجامعية ...'},
        {id:1, size:3 , link:'Beja',  icon:'airplane-fill',  iconColor:'#0de0b9', text:'باجة', smallText:'جواز السفر ,الحصول علي فيزا ...'},
        {id:1, size:3 , link:'Kef',  icon:'lightbulb-fill',  iconColor:'#423e42', text:'الكاف', smallText:'بطاقة التعريف , مضمو ولادة ...'},
        {id:1, size:3 , link:'Siliana',  icon:'people-fill',  iconColor:'#0de089', text:'سليانة', smallText:'المنح الإجتماعية , التأمين ...'},
        {id:1, size:3 , link:'Zaghouan',  icon:'briefcase-fill',  iconColor:'#0d96e0', text:'زغوان', smallText:'النقلة المدرسية , الباكالوريا, المنحة الجامعية ...'},
        {id:1, size:3 , link:'Kebili',  icon:'airplane-fill',  iconColor:'#0de0b9', text:'قبلي', smallText:'جواز السفر ,الحصول علي فيزا ...'},
        {id:1, size:3 , link:'Tataouine',  icon:'lightbulb-fill',  iconColor:'#423e42', text:'تطاوين', smallText:'بطاقة التعريف , مضمو ولادة ...'},
        {id:1, size:3 , link:'Tozeur',  icon:'people-fill',  iconColor:'#0de089', text:'توزر', smallText:'المنح الإجتماعية , التأمين ...'},
    ]

    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    /* ###########################[Card]############################# */
    const  capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1)).charAt(0);
    }
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
                       <h3  dir='rtl' style={{color: GConf.Tools.Salaire.themeColor}}> {GConf.Tools.Salaire.textAds} </h3>
                </div>
                <div className='col-4 align-self-end text-center d-none d-lg-block'>
                    <img src='https://cdn.abyedh.com/images/Tools/Salaire.svg' className='img-responsive' width='40%' height='40%'  />
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
            <NavLink exact='true' to={`landing/${props.link}`}>
                <div className='card card-body shadow-sm mb-3 border-div'>
                    <div className='row'>
                        <div className={`${props.full ? 'col-5' : 'col-12' }  align-self-center text-center`}>
                            <div className="icon-shape text-white rounded-circle elevation mb-3" style={{backgroundColor: GConf.Tools.Salaire.themeColor, width: `4 rem`, height: `4 rem`}} >
                                <i className={`bi bi-${props.icon} `} style={{fontSize:'2rem'}}></i>
                            </div>
                        </div>
                        <div className={`${props.full ? 'col-7' : 'col-12' } align-self-center  text-center text-secondary`}>
                            <h3 className='mb-0'>{props.text}</h3>
                            
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
                <div className='col-6 col-md-4'><LinkCard icon='heart-pulse' text='القطاع الصحي' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='briefcase-fill' text='القطاع التعليمي' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='car-front-fill' text='قطاع النقل' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='airplane-fill' text='القطاع السياحي' /></div>
                <div className='col-12 col-md-4'><LinkCard icon='film' full text='القطاع الثقافي' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='bank' text='القطاع القانوني' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='film' text='القطاع الفني' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='upc-scan' text='القطاع الصناعي' /></div>
                <div className='col-6 col-md-4'><LinkCard icon='cart4' text='القطاع المالي' /></div>
                
            </div>
        </div>
        <ButtomCard /> 
    </> );
}

export default BlogPage;