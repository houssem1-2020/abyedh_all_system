import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
import { Link } from 'react-router-dom';

function ReadyPage() {

    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    
    const ready = [
        {id:1, tag:'docteur',  img_url: 'docteur.gif', color:'#085947', system_Link:'https://doctor.system.abyedh.com'},
        {id:1, tag:'autoecole',  img_url: 'autoecole.gif', color:'#1caaa8', system_Link:'https://driving-school.system.abyedh.com'},
        {id:1, tag:'gym',  img_url: 'gym.gif', color:'#7aadab', system_Link:'https://gym.system.abyedh.com/'},
        {id:1, tag:'restaurant',  img_url: 'restaurant.gif', color:'#35ac67', system_Link:'https://restaurant.system.abyedh.com'},
        {id:1, tag:'garderie',  img_url: 'garderie.gif', color:'#cf208f', system_Link:'https://daycare.system.abyedh.com'},
        {id:1, tag:'magazin',  img_url: 'magazin.gif', color:'#5e7968', system_Link:'https://shop.system.abyedh.com'},
        {id:1, tag:'transporteur',  img_url: 'transporteur.gif', color:'#be6e70', system_Link:'https://transporter.system.abyedh.com'},
        {id:1, tag:'avocat',  img_url: 'avocat.gif', color:'#7a8890', system_Link:'https://lawyer.system.abyedh.com'},
        {id:1, tag:'depot',  img_url: 'storage.gif', color:'#6f858f', system_Link:'https://depot.system.abyedh.com'},
        {id:1, tag:'hotels',  img_url: 'hotel.gif', color:'#247cc7', system_Link:'https://hotel.system.abyedh.com'},
        {id:1, tag:'location',  img_url: 'car.gif', color:'#2d4664', system_Link:'https://car-renting.system.abyedh.com/'},
        {id:1, tag:'labo',  img_url: 'labo.gif', color:'#1dd3b0', system_Link:'http://laboratory.system.abyedh.com/'},
    ]

    const secondary = [
        {id:1, tag:'quincaillerie',  img_url: 'handmade.gif', color:'#406163', system_Link:'https://hardware.system.abyedh.com'},
        {id:1, tag:'pharmacie',  img_url: 'pharmacie.gif', color:'#6edb8d', system_Link:'https://pharmacy.system.abyedh.com'},
        {id:1, tag:'boutique',  img_url: 'boutique.gif', color:'#b146c2', system_Link:'https://boutique.system.abyedh.com'},
        {id:1, tag:'meublerie',  img_url: 'house.gif', color:'#0078d7', system_Link:'https://furniture.system.abyedh.com'},
        {id:1, tag:'electromenager',  img_url: 'house_electro.gif', color:'#03a3a1', system_Link:'https://appliances.system.abyedh.com'},
        {id:1, tag:'lycee',  img_url: 'lycee.gif', color:'#913461', system_Link:'https://school.system.abyedh.com/'},
        {id:1, tag:'cafe',  img_url: 'cafe.gif', color:'#363636', system_Link:'https://cafe.system.abyedh.com'},
        
        {id:1, tag:'salle_marriage',  img_url: 'wedding_salon_marriage.gif', color:'#c30052', system_Link:'https://banquet-hall.system.abyedh.com'},
        {id:1, tag:'coiffure',  img_url: 'coiffure.gif', color:'#0b97bf', system_Link:'https://furniture.system.abyedh.com'},
    ]

    const LinkCard = (props) =>{
        return(<>
        <div className={`col-12 col-lg-4 mb-2 p-1 `}>
            <a href={`${props.data.system_Link}`} target="c_blank" >
                <div className={`card border-div shadow-sm p-3 ${props.data.ready ? 'border-ready-s':''} ${props.data.next ? 'border-next-s':''}`} >
                    <div className="row">
                        <div className="col-3 align-self-center text-center">
                            <div className="icon icon-shape shadow" style={{backgroundColor: props.data.color}}>
                                <img src={`https://cdn.abyedh.com/Images/Search/WIcons/${props.data.img_url}`} className="img-responsive" width="100%" />
                            </div>
                        </div>
                        <div className="col-9 align-self-center  ">
                            <div className={`${isRTL ? 'text-end' : 'text-start'}  text-secondary   `}><h4><b>  {props.data.ready ? <span className='bi bi-check-circle-fill text-success'></span>: <>{props.data.next ? <span className='bi bi-play-circle-fill text-warning'></span>:''}</>} {t(`mainPageLanding.systemNames.${props.data.tag}`)}   </b></h4></div>
                        </div>
                    </div>
                </div>
            </a>
            </div>
        </>)
    }

    return ( <>
    <div className='container pt-4'>
            <h5 dir='rtl'> المرحلة الاولي </h5>
            <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                {ready.map( (data,index) => <LinkCard key={index} data={data}  />)}
            </div>
            <br />
            <br />
            <h5 dir='rtl'> المرحلة الثانية </h5>
            <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                {secondary.map( (data,index) => <LinkCard key={index} data={data}  />)}
            </div>
    </div>
    </> );
}

export default ReadyPage;