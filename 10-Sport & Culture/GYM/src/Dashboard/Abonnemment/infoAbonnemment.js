import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useGetFamillePlat from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
import usePrintFunction from '../../AssetsM/Hooks/printFunction';
import FrameForPrint from '../../AssetsM/Cards/frameForPrint';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';
import ReactImageZoom from 'react-image-zoom';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';

const EditArticle = ({abonnemmentData, setAbonnemmentData, OnKeyPressFunc,  forfaitListe, membreListe, EditAbonnemtInfo, loaderState,updateQte}) =>{
    return(<>
                    <h5 className='mb-0 text-secondary '> Mmebre  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test) =>
                        <option key={test.ME_ID} value={test.ME_ID}>{test.ME_Name} : {test.Phone}</option>
                        )}  
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={abonnemmentData.Membre_ID}   onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Membre_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                
                    
                    <h5 className='mb-0 mt-2 text-secondary '>Forfait  </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={forfaitListe}
                        placeholder={'Forfait'}
                        className='mb-1'
                        onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Forfait_ID: value })}
                        value={abonnemmentData.Forfait_ID}
                    /> 
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Depart  </h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1' value={abonnemmentData.AB_Depart_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Date: e.target.value })}/> 
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Terminer   </h5>
                            <Input icon='truck' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1' value={abonnemmentData.AB_Termine_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Termine_Date: e.target.value })}/> 
                        </div>
                    </div>

                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Temps d'entrainemment  </h5>
                            <Input icon='map marker' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='De'  fluid className='mb-1'  value={abonnemmentData.AB_Depart_Time}  onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Time : e.target.value })}/>
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Temps d'entrainemment  </h5>
                            <Input icon='map marker alternate'  type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='Vers'  fluid className='mb-1' value={abonnemmentData.AB_Termine_Time}  onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Termine_Time: e.target.value })}/>
                        </div>
                    </div>

                    <div className='text-end mb-5 mt-3'>
                        <Button onClick={EditAbonnemtInfo} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
    </>)
}

function FactureInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {FID} = useParams();
    const [abonnemmentData, setAbonnemmentData] = useState({});
    const [seanceListe, setSeanceListe] = useState([])
    const [forfaitListe ,setForfaliListe] = useState([])
    const [membreListe ,setMmebreListe] = useState([])

     
 
 
    const [loading , setLoading] = useState(false)

    const [loaderState, setLS] = useState(false)
 

 
    const panes = [
        {
            menuItem: { key: 'Seances', icon: 'calendar alternate', content: 'Seances' }, 
            render: () =><><Tab.Pane attached={false}><Calendar /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'renouveler', icon: 'tasks', content: 'Renouvellement' }, 
            render: () => <><Tab.Pane attached={false}><RenouvellmentCard /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle OnKeyPressFunc={OnKeyPressFunc} abonnemmentData={abonnemmentData}  setAbonnemmentData={setAbonnemmentData}  forfaitListe={forfaitListe} membreListe={membreListe} EditAbonnemtInfo={EditAbonnemtInfo} loaderState={loaderState}   /></Tab.Pane><br /></>,
        },
 
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteAbonnementCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
            axios.post(`${GConf.ApiLink}/abonnement/select`, {
                PID : GConf.PID,
                fid: FID
            })
            .then(function (response) {
                    if(response.data.Data.length == 0) {
                        toast.error('Abonnement Introuvable !', GConf.TostSuucessGonf)
                        setTimeout(() => {  window.location.href = "/S/ab"; }, 2000)
                        
                    } else {
                        setAbonnemmentData(response.data.Data)
                        let SeanceL = []
                        response.data.Seances.map( (Seance) => SeanceL.push( { title: Seance.SE_Date, date: Seance.SE_Date , className:'bg-warning border-0 w-25 text-center'}))
                        setSeanceListe(SeanceL)
                        setLoading(true)
                    }    
            }).catch((error) => {
                if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger les Info de son source   </div></>, GConf.TostInternetGonf)   
                }
            });

            axios.post(`${GConf.ApiLink}/forfait`, {
                PID : GConf.PID,
             })
             .then(function (response) {
                let forfaitToListe = [] 
                response.data.map((data,index) => forfaitToListe.push({
                    key: index ,
                    text: data.F_Name,
                    value: data.F_ID
                }))
                setForfaliListe(forfaitToListe)
             }).catch((error) => {
                setForfaliListe([])
             });
    
             axios.post(`${GConf.ApiLink}/membres`, {
                PID : GConf.PID,
             })
             .then(function (response) {
                setMmebreListe(response.data)
             }).catch((error) => {
                setMmebreListe([])
             });

    }, [])


    /*#########################[Function]##################################*/
    const EditAbonnemtInfo = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/equipemment/modifier`, {
            PID :GConf.PID,
            articleND :abonnemmentData,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Plat Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                //SaveNotification('stockEditArticle',GConf.PID, abonnemmentData)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le Plat  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const DeleteArticle = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/equipemment/supprimer`, {
            tag :GConf.PID,
            code : FID ,
            pk: abonnemmentData.PK
        }).then(function (response) {
            if (response.data.affectedRows != 0) {
                toast.error('Article Supprimer  !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sk"; }, 500)
                setLS(false)
            } else {
                setLS(false)
            }
            console.log(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de supprimer l'article  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }

   /*#########################[Card]##################################*/
    const AbonnementCard = (props) =>{
        return (<>
            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container notification">
                            <img src={`https://cdn.abyedh.tn/images/system/gym/abonnemment.png`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mb-0 mt-1'><span className="bi bi-bookmark-star-fill"></span> {loading ? props.data.ME_Name : SKLT.BarreSkl } </h4> 
                            <h4 className='mb-0 mt-1'><span className="bi bi-bookmark-star-fill"></span> {loading ? props.data.F_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.Genre } </>: SKLT.BarreSkl} </h6>
                            <Divider horizontal className='text-secondary mt-4'>Periode</Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                           <h3> {new Date(props.data.AB_Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </h3>
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>De</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                             <h3> {new Date(props.data.AB_Termine_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </h3> 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>jusqu'a</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>seances</Divider>
                            <div className='row text-center'>
                                <div className='col-6  align-self-center border-end'>
                                        <h2 className='mb-0'>{props.data.NB_Seance}</h2>
                                        <smal className='text-secondary'>Deja</smal>
                                </div>
                                <div className='col-6 align-self-center'>
                                        <h2 className='mb-0'>{props.data.NB_Seance - seanceListe.length}</h2>
                                        <smal className='text-secondary'>reste</smal>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
    const Calendar = () =>{
        return(<>
        <FullCalendar 
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            locale='fr' 
            events={seanceListe}
            height='420px'
            navLinks ={true}
        />
        </>)
    }
    const DeleteAbonnementCard = () =>{
        return(<>
            <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Cett Article ?</h3> 
            <div className='row'>
                <div className='col-9'>
                    <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer L'Article : </b></h5>
                    <ul className="text-info text-left">
                    <li>L'article ne sera pas visible dans la branche 'Stock'</li>
                    <li>Tous les article avec son code a barre se suppriment </li>
                    <li>L'article Soit visible seulemment dans les facture  </li>
                    </ul>
                </div>
                <div className='col-lg-3 d-none d-lg-block align-self-center'>
                    <div className='text-center'>
                            <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                    </div> 
                </div>
            </div>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill" onClick={DeleteArticle}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></button>
            </div>
        </>)
    }
    const RenouvellmentCard = () =>{
 
        return(<>
                 Renouveller
        </>)
    }
 

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.platInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <AbonnementCard data={abonnemmentData}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
                 
     </> );
}

export default FactureInfo;