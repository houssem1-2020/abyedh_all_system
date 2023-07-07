import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button,  Form, Icon, Input, Loader, Modal, Pagination, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import axios from 'axios';
import {toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
 
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
 
 
function CaisseBons() {
    /*#########################[Const]##################################*/
    const [familleList, setFamillesList] = useState([]);
    const [loading , setLoading] = useState(false)
 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/seances`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            let SeanceL = []
            response.data.map( (Seance) => SeanceL.push( { title: Seance.ME_Name, date:  new Date(Seance.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) ,  url: `/S/sa/info/${Seance.SE_ID}`,  className:'bg-system-btn border-0 text-center'}))
            setFamillesList(SeanceL)
            setLoading(true)
 
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des familles dans votre ordinateur  </div></>, GConf.TostInternetGonf)   
              setFamillesList(Offline.famille)
              setLoading(true)
 
            }
          });
    }, [])
    
    /*#########################[Function]##################################*/
 
   /*#########################[Card]##################################*/
 

    return ( <> 
            <BreadCrumb links={GConf.BreadCrumb.stockFamille} />
            <br />
            <div className="container">
                <FullCalendar 
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    locale='fr' 
                    events={familleList}
                    height='520px'
                    navLinks ={true}
                    className='mb-4'
                    
                />
                <br />
                <br />
            </div>
             
        </> );

}

export default CaisseBons;