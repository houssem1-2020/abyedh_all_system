import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Dropdown, Icon, Input, Loader, Statistic } from 'semantic-ui-react';

import L from 'leaflet';
import { Tab } from 'semantic-ui-react';
import axios from 'axios';
import { _ } from "gridjs-react";
import { useParams } from 'react-router-dom';
import SKLT from '../../AssetsM/Cards/usedSlk';
import { toast } from 'react-toastify';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import { useNavigate} from 'react-router-dom';

const EditCamionCard = ({camionD, setSeanceD, OnKeyPressFunc, EditCamion, GenrateKey, loaderState}) =>{
    return(<>

            <div className='p-1  mb-2'>
            <h5 className='mb-1'>Nom:</h5>
                 <Input icon='truck' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-1' value={camionD.CA_Name} onChange={(e) => setSeanceD({...camionD, CA_Name: e.target.value })} />
            </div>
            <div className='p-1 mb-2'>
                <h5 className='mb-1'> Fond:</h5>
                <Input icon='user' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Chauffeur' className='w-100 border-0 shadow-sm rounded mb-1' value={camionD.Caisse_Fond} onChange={(e) => setSeanceD({...camionD, Caisse_Fond: e.target.value })}/>
            </div>
            <div className='row mb-3'>
                    <div className='col-12 col-lg-6'>
                        <h5 className='mb-1'>Identifiant:</h5>
                        <Input icon='linkify' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='identifiant'  className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Identifiant} onChange={(e) => setSeanceD({...camionD, Identifiant: e.target.value })} />
                    </div>
                    <div className='col-9 col-lg-5'>
                        <h5 className='mb-1'>Mot De Pass: </h5>
                        <Input icon='eye' iconPosition='left' placeholder='Nom' onKeyPress={event => OnKeyPressFunc(event)} className='w-100 border-0 shadow-sm rounded mb-3' value={camionD.Password} onChange={(e) => setSeanceD({...camionD, Password: e.target.value })}/>
                    </div>
                    <div className='col-3 col-lg-1 align-self-center'>
                        <Button onClick={GenrateKey} className="rounded-pill " icon='random'></Button>
                    </div>
            </div> 
            <div className='text-end mb-5'>
                <Button  onClick={EditCamion}  className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
            </div>

    </>)
}

function CamionInfo() {
    /* ############################### Const ################################*/
    const Today = new Date().toISOString().split('T')[0]
    const {CID} = useParams()
    const [seanceD, setSeanceD] = useState([]); 
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    
    const panes = [
        {
            menuItem: { key: 'editClient', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><EditCamionCard OnKeyPressFunc={OnKeyPressFunc} camionD={seanceD}  setSeanceD={setSeanceD} GenrateKey={GenrateKey} EditCamion={EditCamion} loaderState={loaderState} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><DeleteSeance /></Tab.Pane><br /></>,
        },
        
    ]
 

    /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/seances/info`, {
            PID : GConf.PID,
            SID : CID
        })
        .then(function (response) {
             
            if(response.data.length === 0) {
                toast.error('Camion Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sa"; }, 2000)
                
            } else {
                console.log(response.data)
                setLoading(true)
                setSeanceD(response.data[0])                
                
            }

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger les information du camion </div></>, GConf.TostInternetGonf)   
              setLoading(true)
              setSeanceD([])
            }
          });

    }, [])


    /* ############################### Function ################################*/ 
    const GenrateKey = () =>{
        let ID = Math.random().toString(36).slice(2, 8);
        let PWD =  Math.floor(Math.random() * 1000000);
        setSeanceD({...seanceD, Identifiant: ID , Password:PWD})
    }
    const EditCamion = () =>{
        if (!seanceD.CA_Name) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.Caisse_Fond) {toast.error("Fond Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.Identifiant) {toast.error("Identifiant Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.Password) {toast.error("Mot De Passe Invalide !", GConf.TostErrorGonf)}
        else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/modifier`, {
                    PID : GConf.PID,
                    caisseD : seanceD,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        toast.success("Caisse Modifier !", GConf.TostSuucessGonf)
                        setLS(false)
                    }
                    else {
                            toast.error('Erreur Lors de la modification', GConf.TostSuucessGonf)
                            setLS(false)
                        }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5>  </div></>, GConf.TostInternetGonf)   
                    }
                  });
                    
            }
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    /* ############################### Card ################################*/
 
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'C': return <StateCard color='warning' text='En Cours' />;  
            case 'A': return <StateCard color='danger' text='Annuleé' /> ;
            case 'T': return <StateCard color='success' text='Termineé' /> ;
            default:  return <StateCard color='secondary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    const SeanceCard = (props) =>{
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container">
                            <img src="https://cdn.abyedh.tn/images/system/gym/seance.png" className="rounded-circle" width="80" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mb-2 '>{loading ? props.dataC.ME_Name : SKLT.BarreSkl } </h4> 
                            <h4 className='mb-2 mt-0'>{loading ? props.dataC.F_Name : SKLT.BarreSkl } </h4> 
                            {/* <h6 className="text-secondary">  {loading ? <><span className="bi bi-truck"></span> { props.dataC.Cam_ID } </>: SKLT.BarreSkl} </h6> */}
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-person-heart"></span> { props.dataC.C_ID } </>: SKLT.BarreSkl } </h6>
                            <Divider horizontal className='text-secondary mt-4'>Etat</Divider>
                            <div className='row text-center'>
                                <div className='col-12'>    
                                    {loading ?  
                                        <Statistic color='red' size='tiny'>
                                            <Statistic.Value>
                                                <StateCard status={props.dataC.SE_State} />
                                            </Statistic.Value>
                                        </Statistic>
                                    : SKLT.BarreSkl }  
                                    
                                </div>
                            </div>
 
                    </div>
                </div>
            </div>
        </>);
    }
    const DeleteSeance = () =>{
        return(<>
        <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Ce Camion ?</h3> 
            <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer Le Camion : </b></h5>
            <ul className="text-info text-left">
            <li>L'article ne sera pas visible dans la branche 'Stock'</li>
            <li>Tous les article avec son code a barre se suppriment </li>
            <li>L'article Soit visible seulemment dans les facture  </li>
            </ul>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill" ><span className="bi bi-check"></span> Oui, Supprimer</button>
            </div>
        </>)
    }

    return ( <> 
         <BreadCrumb links={GConf.BreadCrumb.CamionInfo} />
         <br />
        <div className="row">
                <div className="col-12 col-lg-4">
                    <SeanceCard  dataC={seanceD}  /> 
                </div>
                <div className="col-12 col-lg-8">
                     <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                </div>
        </div>
     </> );
}

export default CamionInfo;