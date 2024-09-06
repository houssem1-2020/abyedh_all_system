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

const EditCamionCard = ({seanceD, setSeanceD, OnKeyPressFunc, SelectForfaitFunc, EditCamion, selectedForfait, setSelectedForfait, abonnementListe, loaderState}) =>{
    return(<>

<           div className='p-1  mb-2'>
                <h5 className='mb-0 text-secondary '> Mmebre  </h5>
                    <datalist id="clientList">
                        {abonnementListe.map((test) =>
                        <option key={test.AB_ID}  value={test.AB_ID}>{test.ME_Name} : {test.F_Name}</option>
                        )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={seanceD.Membre_ID}   onBlur={ (e) => SelectForfaitFunc(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                </div> 
                <div className='card card-body shadow-sm rounded'>
                    <div><b>Nom  </b> : {selectedForfait ?  selectedForfait.ME_Name : '...'} </div>
                    <div><b>Forfait </b> : {selectedForfait ?  selectedForfait.F_Name : '...'} </div>
                    <div><b>Etat </b> : {selectedForfait ?  selectedForfait.State : '...'} </div>
                </div>

                <div className='row'>
                    <div className='col-6'>
                        <h5 className='mb-0 mt-2 text-secondary '>Depart  </h5>
                        <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={new Date(seanceD.SE_Date).toISOString().split('T')[0]} onChange={(e) => setSeanceD({...seanceD, SE_Date: e.target.value })}/> 
                    </div>
                    <div className='col-6'>
                        <h5 className='mb-0 mt-2 text-secondary '>Terminer   </h5>
                        <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1 shadow-sm'  value={seanceD.SE_Time}  onChange={(e) => setSeanceD({...seanceD, SE_Time : e.target.value })}/>
                    </div>
            </div>  
            <br />
            <div className='text-end mb-2'>
                <Button  onClick={EditCamion}  className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
            </div>

    </>)
}

function CamionInfo() {
    /* ############################### Const ################################*/
    //const Today = new Date().toISOString().split('T')[0]
    const Today = new Date()
    const {CID} = useParams()
    const [seanceD, setSeanceD] = useState({SE_Date: '2023-05-06'}); 
    const [abonnementListe ,setAbonnementListe] = useState([])
    const [selectedForfait, setSelectedForfait] = useState()
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    
    const panes = [
        {
            menuItem: { key: 'editClient', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane className='border-div' attached={false}><EditCamionCard OnKeyPressFunc={OnKeyPressFunc} seanceD={seanceD}  setSeanceD={setSeanceD} selectedForfait={selectedForfait} setSelectedForfait={setSelectedForfait} abonnementListe={abonnementListe} EditCamion={EditCamion} SelectForfaitFunc={SelectForfaitFunc} loaderState={loaderState} /></Tab.Pane><br /></>,
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

        axios.post(`${GConf.ApiLink}/abonnement`, {
            PID : GConf.PID,
        })
        .then(function (response) {
            setAbonnementListe(response.data)
             
        }).catch((error) => {
            setAbonnementListe([])
        });

    }, [])


    /* ############################### Function ################################*/ 
    const GenrateKey = () =>{
        let ID = Math.random().toString(36).slice(2, 8);
        let PWD =  Math.floor(Math.random() * 1000000);
        setSeanceD({...seanceD, Identifiant: ID , Password:PWD})
    }
    const EditCamion = () =>{
        if (!seanceD.Abonnement_ID) {toast.error("Matricule Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.Membre_ID) {toast.error("Fond Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.SE_Date) {toast.error("Identifiant Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.SE_Time) {toast.error("Mot De Passe Invalide !", GConf.TostErrorGonf)}
        else{
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/modifier`, {
                    PID : GConf.PID,
                    seanceData : seanceD,
                    SE_ID : CID,
                }).then(function (response) {
                    console.log(response.data)
                    if(response.data.affectedRows) {
                        toast.success("Seance Modifier !", GConf.TostSuucessGonf)
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
    const SelectForfaitFunc = (abID) =>{
        let selectedAB =  abonnementListe.find(abonmt => abonmt.AB_ID == abID)
        if (selectedAB) {
            setSelectedForfait(selectedAB)
            setSeanceD({...seanceD, Abonnement_ID : selectedAB.AB_ID , Membre_ID : selectedAB.ME_ID })
        } else {
            toast.error('Abonnement Introuvable ', GConf.TostSuucessGonf)
        }
    }
    const DeleteSeanceFunc = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/seances/supprimer`, {
            PID : GConf.PID,
            SE_ID : CID,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Seance Supprimer !", GConf.TostSuucessGonf)
                setLS(false)
                setTimeout(() => {  window.location.href = "/S/sa"; }, 500)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
                    }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de supprimer le client  </div></>, GConf.TostInternetGonf) 
                  setLS(false)  
                }
            });
}
    /* ############################### Card ################################*/
 
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'C': return <StateCard color='warning' text='En Cours' />;  
            case 'P': return <StateCard color='secondary' text='Pas Encore' /> ;
            case 'T': return <StateCard color='success' text='Termineé' /> ;
            case 'PA': return <StateCard color='info' text='Aujourd hui' /> ;
            default:  return <StateCard color='primary' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };

    const FindSeanceState = (date,time) => {
      var currentTime = new Date('2000-01-01T' + time + 'Z');
      currentTime.setTime(currentTime.getTime() + (2 * 60 * 60 * 1000));

      if (Today.toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) < new Date(date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )) { return <StateCard status={'P'} />} 
      else if (Today.toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) > new Date(date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )) { return <StateCard status={'T'} />}
      else {
        if ( new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) > time ) { return <StateCard status={'PA'} /> } 
        else if (new Date().toLocaleTimeString([],{ hourCycle: 'h23'}) > currentTime.toTimeString().slice(0, 8)) { return <StateCard status={'T'} />}
        else { return <StateCard status={'C'} /> }
      }
    }

    const SeanceCard = (props) =>{
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container">
                            <img src="https://cdn.abyedh.com/images/system/gym/seance.jpg" className="rounded-circle" width="80" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mb-2 '>{loading ? props.dataC.ME_Name : SKLT.BarreSkl } </h4> 
                            <h4 className='mb-2 mt-0'>{loading ? props.dataC.F_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary mt-0"> {loading ? <><span className="bi bi-calendar-check-fill"></span> { new Date(props.dataC.SE_Date).toISOString().split('T')[0] } </>: SKLT.BarreSkl } </h6>
                            <h6 className="text-secondary mt-0"> {loading ? <><span className="bi bi-alarm-fill"></span> { props.dataC.SE_Time } </>: SKLT.BarreSkl } </h6>
                            <Divider horizontal className='text-secondary mt-4'>Etat</Divider>
                            <div className='row text-center'>
                                <div className='col-12'>    
                                    {loading ?  
                                        <Statistic color='red' size='tiny'>
                                            <Statistic.Value>
                                                {FindSeanceState(props.dataC.SE_Date,props.dataC.SE_Time)}
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
        <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Cette Seance ?</h3> 
            <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer La  Seance : </b></h5>
            <ul className="text-info text-left">
            <li>La Seance ne sera pas visible dans la branche 'Seance'</li>
            <li>Tous les Seances avec son code  vont se supprimeé </li>
            <li>La Seance ne Soit visible pas dans les Abonnemment  </li>
            </ul>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill"  onClick={DeleteSeanceFunc}><span className="bi bi-check"></span> Oui, Supprimer</button>
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