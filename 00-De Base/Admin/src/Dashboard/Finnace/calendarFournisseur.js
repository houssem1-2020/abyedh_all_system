import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';

function CalendarFournisseur() {
    /*#########################[Const]##################################*/
    let  [clientList, setClientList] = useState([]); 

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/fournisseur`, {
            tag: GConf.SystemTag,
          })
          .then(function (response) {
            console.log(response.data)
             
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
            }
          });
    }, [])

    /*#########################[Functions]##################################*/
    const  Ajouter = () =>{
        if (5 == 5) { toast.error("Code à barre Invalide !", GConf.TostErrorGonf) } 
        else {
            console.log('uyg')
            axios.post(`${GConf.ApiLink}/fournisseur`, {
                tag: GConf.SystemTag,
              })
              .then(function (response) {
                console.log(response.data)
                 
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
                }
              });
        }
    }
    /*#########################[Card]##################################*/

    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.FournisseurAdd} />
            <br />
            <div className='container'>
                Calendrier
            </div>
    </> );
}

export default CalendarFournisseur;