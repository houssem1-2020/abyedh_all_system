import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import GConf from '../../AssetsM/generalConf';
import { Icon, Input } from 'semantic-ui-react'

function ArtPage() {
    /* ###########################[const]############################ */
    const Items = [
        {id:1, size:4 , link:'sante',  icon:'person-hearts',  iconColor:'#d469b9', text:'ممثلين', smallText:' لطفي الدزيري, حسن الخلصي, فتحي         , ...'},
        {id:1, size:4 , link:'transport',  icon:'film',  iconColor:'#fcba03', text:'أفلام', smallText:'    صيف حلق الوادي , صراع   ...'},
        {id:1, size:4 , link:'finance',  icon:'file-music',  iconColor:'#0de089', text:'أغاني', smallText:'  ريتك مانعرف وين , صندوق عجب ...'},
        {id:1, size:4 , link:'droit',  icon:'tv',  iconColor:'#810de0', text:' مسلسلات ', smallText:'  قمرة سيدي المحروس , حسابات و عقابات ...'},
        {id:1, size:4 , link:'religious',  icon:'person-heart',  iconColor:'#e0420d', text:'فنانين ', smallText:'  لطفي بوشناق , زياد غرسة ...'},
        {id:1, size:4 , link:'commerce',  icon:'incognito',  iconColor:'#8a0c79', text:' مخرجين', smallText:'   عبد القادر الجربي , صلاح الدين الصيد...'},
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
        <div className='card-body rounded-0' style={{height:'120px', backgroundColor:'white', marginTop:'55px'}}>
            <div className='row'>
                <div className='col-12 col-lg-8 align-self-center text-center'>
                       <h3  dir='rtl' style={{color:GConf.Tools.art.themeColor}}> {GConf.Tools.art.textAds} </h3>
                </div>
                <div className='col-4 align-self-end text-center d-none d-lg-block'>
                    <img src='https://cdn.abyedh.com/images/Tools/art.svg' className='img-responsive' width='40%' height='40%'  />
                </div>
            </div> 
        </div>
        </>)
    }
    const ButtomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card ' style={{backgroundColor:'#dc3545'}}>
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
                        <div className='col-4 align-self-center'>
                             <div className="icon-shape text-white rounded-circle elevation" style={{backgroundColor: GConf.Tools.art.themeColor, width: `${props.data.size}rem`, height: `${props.data.size}rem`}} >
                                <i className={`bi bi-${props.data.icon} `} style={{fontSize:`${props.data.size / 2 }rem`}}></i>
                            </div>
                        </div>
                        <div className='col-8 align-self-center text-secondary text-end'>
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
            </div>
        </div>
        <ButtomCard /> 
    </> );
}

export default ArtPage;