import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
 
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
 

const EditArticle = ({abonnemmentData, setAbonnemmentData, OnKeyPressFunc,  forfaitListe, membreListe, EditAbonnemtInfo, loaderState,updateQte}) =>{
    const SaisonChoise = [
        {id:1, value :'Code', text:'Code'},
        {id:2, value :'Conduit', text:'Conduit'},
        {id:3, value :'Code et Conduit', text:'Code et Conduit'},
         
    ]
    const serviceOptions = [
        {key:1, value:'A1', text:'صنف أ1'},
        {key:2, value:'A', text:' صنف أ'},
        {key:3, value:'BH', text:' صنف ب + هـ'},
        {key:4, value:'G', text:' صنف ب'},
        {key:5, value:'GH', text:' صنف ج + هـ'},
        {key:6, value:'D', text:'صنف د'},
        {key:7, value:'DH', text:' صنف د + هـ'},
        {key:8, value:'D1', text:' صنف د1'},
        {key:9, value:'K', text:' صنف ح '},
    ]
    return(<>
                    <h5 className='mb-0 text-secondary '> Mmebre  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test) =>
                        <option key={test.CD_ID} value={test.CD_ID}>{test.CD_Name} : {test.CD_Phone}</option>
                        )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={abonnemmentData.Condidat_ID}   onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Condidat_ID: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                    <h5 className='mb-0 mt-2 text-secondary '>Forfait  </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={forfaitListe}
                        placeholder={'Forfait'}
                        className='mb-1 shadow-sm'
                        onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Forfait_ID: value })}
                        value={abonnemmentData.Forfait_ID}
                    /> 
                    <h5 className='mb-0 mt-4 text-secondary'> <span className='bi bi-person-x-fill'></span> Genre de Permis  </h5>
                    <Select fluid placeholder='Permis' options={serviceOptions} onChange={ (e,data) => setAbonnemmentData({...abonnemmentData, AB_Permis: data.value})} />
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-4 text-secondary '> <span className='bi bi-person-x-fill'></span>  Genre   </h5>
                            <Select placeholder='Genre'  options={SaisonChoise}  className='w-100 shadow-sm rounded mb-3' value={abonnemmentData.AB_Genre} onChange={(e, data) => setAbonnemmentData({...abonnemmentData, AB_Genre: data.value })} />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-4 text-secondary '> <span className='bi bi-person-x-fill'></span>  Depart Le </h5>
                            <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={abonnemmentData.AB_Depart_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Date: e.target.value })}/> 
                        </div>
                    </div>

                    <div className='text-end mb-5 mt-3'>
                        <Button onClick={EditAbonnemtInfo} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
    </>)
}

const ResultatCard = ({ChangeResultatFunc, changerResultData, setChangerResult, loaderState }) =>{
    const SaisonChoise = [
        {id:1, value :'échec', text:'échec'},
        {id:2, value :'succès', text:'succès'},
        {id:3, value :'En Cours', text:'En Cours'},
    ]
    return(<>
                    <h5>Enregistrez le resultat de cette abonnemment  : </h5>
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> Resultat   </h5>
                            <Select placeholder='Resultat'  options={SaisonChoise}  className='w-100 shadow-sm rounded mb-3' value={changerResultData.AB_Resultat} onChange={(e, data) => setChangerResult({...changerResultData, AB_Resultat: data.value })} />
                        </div>
                        
                    </div>
                    <div className='text-end mb-5 mt-3'>
                        <Button onClick={() => ChangeResultatFunc()} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Renouveller <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
    </>)
}

const PaymmentCard = ({paymmentMonth, setPaymmentMonth, SavePymmentFunc, loaderState, abonnemmentData }) =>{
        
    return<>
        <div className='row'>
                <div className='col-6'>
                    <Input icon='edit' placeholder='Tranche '  iconPosition='left'   fluid className='mb-1 shadow-sm' value={paymmentMonth.tranche}   onChange={(e) => setPaymmentMonth({...paymmentMonth, tranche: e.target.value })}/>
                    <Input icon='calendar' type='date'    iconPosition='left'   fluid className='mb-3 shadow-sm' defaultValue={paymmentMonth.paymmentDate}   onChange={(e) => setPaymmentMonth({...paymmentMonth, date: e.target.value })}/>
                    <Button  onClick={() => SavePymmentFunc()}  className='text-end rounded-pill bg-system-btn '  positive>  <Icon name='save outline' /> Payee Une Tranche <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    
                </div>
                <div className='col-6'>
                    <h5>Liste des Tranches </h5>
                    <ul></ul>  
                    {JSON.parse(abonnemmentData.AB_Paymment).map((data,index) => <li key={index}>{data.paymmentDate} : {data.tranche} (<Icon onClick={() => alert('Delete')} className='text-danger' name='trash' />)</li>)}
                </div>
        </div> 
    </>
}
function FactureInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {FID} = useParams();
    const [abonnemmentData, setAbonnemmentData] = useState({});
    const [changerResultData, setChangerResult] = useState({AB_Depart_Date: new Date().toISOString().split('T')[0]});
    const [seanceListe, setSeanceListe] = useState([])
    const [forfaitListe ,setForfaliListe] = useState([])
    const [membreListe ,setMmebreListe] = useState([])
    const [loading , setLoading] = useState(false)
    const [paymmentMonth , setPaymmentMonth] = useState({tranche: '' , paymmentDate: new Date().toISOString().split('T')[0]})
    const [loaderState, setLS] = useState(false)
    const MoinsListe = [
        {id:1, value :1, text: 'Janvier'},
        {id:2, value :2, text: 'Fevrier'},
        {id:3, value :3, text: 'Mars'},
        {id:4, value :4, text: 'Avril'},
        {id:5, value :5, text: 'May'},
        {id:6, value :6, text: 'Juin'},
        {id:7, value :7, text: 'Juillet'},
        {id:8, value :8, text: 'Out'},
        {id:9, value :9, text: 'Septembre'},
        {id:10, value :10, text: 'Octobre'},
        {id:11, value :11 ,text: 'Novembre'},
        {id:12, value :12,text: 'Decembre'},
    ]
    const panes = [
        {
            menuItem: { key: 'Seances', icon: 'calendar alternate', content: 'Seances' }, 
            render: () =><><Tab.Pane attached={false}><Calendar /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'Payee', icon: 'money', content: 'Paymment' }, 
            render: () => <><Tab.Pane attached={false}><PaymmentCard paymmentMonth={paymmentMonth} setPaymmentMonth={setPaymmentMonth} SavePymmentFunc={SavePymmentFunc} loaderState={loaderState} abonnemmentData={abonnemmentData} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'renouveler', icon: 'tasks', content: 'Resultat ' }, 
            render: () => <><Tab.Pane attached={false}><ResultatCard OnKeyPressFunc={OnKeyPressFunc}  changerResultData={changerResultData} setChangerResult={setChangerResult} ChangeResultatFunc={ChangeResultatFunc} loaderState={loaderState}   /></Tab.Pane><br /></>,
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
    
             axios.post(`${GConf.ApiLink}/condidat`, {
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
        axios.post(`${GConf.ApiLink}/abonnement/modifier`, {
            PID :GConf.PID,
            abonnemmentData :abonnemmentData,
            AB_ID : FID
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Abonnemment Modifier !", GConf.TostSuucessGonf)
                setLS(false)
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
    const ChangeResultatFunc = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/abonnement/resultat`, {
            PID : GConf.PID,
            AB_ID : FID,
            changerResultData : changerResultData

        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Resultat Modifieé !", GConf.TostSuucessGonf)
                setLS(false)
 
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
    const CheckPaymmentOfMonth = (value) =>{
        if (loading) {
            let searchForMonth = JSON.parse(abonnemmentData.AB_Paymment).find((data) => data.mois == (new Date()).getMonth() + 1)
            if (searchForMonth) { return true } else {  return false }
        } else {
            return false
        }
        
    }
    const SavePymmentFunc = () =>{
        let arrayToAdd = { id:paymmentMonth.length   , paymmentDate :paymmentMonth.paymmentDate , tranche:  paymmentMonth.tranche}
        let toAdd = JSON.parse(abonnemmentData.AB_Paymment) 
        toAdd.push(arrayToAdd)
   
        setAbonnemmentData({...abonnemmentData, AB_Paymment: JSON.stringify(toAdd) }) 
        axios.post(`${GConf.ApiLink}/abonnement/payee`, {
            PID :GConf.PID,
            editPaymment  : {FID : FID, toEdit: toAdd},
        }).then(function (response) {
 
            if(response.data.affectedRows) {
                toast.success("Paymment Ajouter!", GConf.TostSuucessGonf)
                setLS(false)
                 
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
                            <img src={`https://cdn.abyedh.tn/images/system/garderie/abonnemment.png`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mb-0 mt-1'><span className="bi bi-bookmark-star-fill"></span> {loading ? props.data.CD_Name : SKLT.BarreSkl } </h4> 
                            <h4 className='mb-0 mt-1'><span className="bi bi-bookmark-star-fill"></span> {loading ? props.data.F_Name : SKLT.BarreSkl } </h4> 
                            {/* <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.AB_Permis } </>: SKLT.BarreSkl} </h6> */}
                            <h6 className="text-secondary">  {loading ? <StatePermisCard status={props.data.AB_Permis} />: SKLT.BarreSkl} </h6>
                            
                            <Divider horizontal className='text-secondary mt-4'>Periode</Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                           <h3> {new Date(props.data.AB_Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </h3>
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Depart</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                             <h5> {props.data.AB_Genre} </h5> 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Genre</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>seances</Divider>
                            <div className='row text-center'>
                                <div className='col-6  align-self-center border-end'>
                                        <h2 className='mb-0'>{loading ? seanceListe.length : ''}</h2>
                                        <small className='text-secondary'>Deja</small>
                                </div>
                                <div className='col-6 align-self-center'>
                                        <h2 className='mb-0'>{loading ? props.data.NB_Seance - seanceListe.length : ''}</h2>
                                        <small className='text-secondary'>reste</small>
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
 
    
    const StatePermisCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'A1': return <StateCard color='info' text='صنف أ1' />;  
            case 'A': return <StateCard color='info' text='صنف أ' />;  
            case 'BH': return <StateCard color='info' text=' صنف ب + هـ' />;  
            case 'G': return <StateCard color='info' text=' صنف ب' />;  
            case 'GH': return <StateCard color='info' text=' صنف ج + هـ' />;  
            case 'D': return <StateCard color='info' text='صنف د' />;  
            case 'DH': return <StateCard color='info' text=' صنف د + هـ' />;  
            case 'D1': return <StateCard color='info' text=' صنف د1' />;  
            case 'K': return <StateCard color='info' text=' صنف ح ' />;  
            
            default:  return <StateCard color='warninf' text='Indefinie' />;    
          }
        }, [status])
        return (
            <div className="container">
              {statusCard()}
            </div>
          );
      };

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.abonnemmentInfo} />
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