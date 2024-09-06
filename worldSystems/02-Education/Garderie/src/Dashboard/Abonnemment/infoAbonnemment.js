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
 

const EditArticle = ({abonnemmentData, setAbonnemmentData, OnKeyPressFunc,  forfaitListe, membreListe, EditAbonnemtInfo, loaderState,updateQte}) =>{
    const [classeNow, setClasseNow] = useState([])
    const SaisonChoise = [
        {id:1, value :'2022/2023', text:'2022/2023'},
        {id:2, value :'2023/2024', text:'2023/2024'},
        {id:3, value :'2024/2025', text:'2024/2025'},
        {id:4, value :'2025/2026', text:'2025/2026'},
        {id:5, value :'2026/2027', text:'2026/2027'},
        {id:6, value :'2027/2028', text:'2027/2028'},
        {id:7, value :'2028/2029', text:'2028/2029'},
        {id:8, value :'2029/2030', text:'2029/2030'},
        {id:9, value :'2030/2031', text:'2030/2031'},
        {id:10, value :'2031/2032', text:'2031/2032'},
        {id:11, value :'2032/2033', text:'2032/2033'},
        {id:12, value :'2033/2034', text:'2033/2035'},
        {id:13, value :'2034/2035', text:'2034/2035'},
    ]

    const SelectClasseFunction = (value) => {
        if (value) {
            setAbonnemmentData({...abonnemmentData, Membre_ID: value })
            let filtedClient = membreListe.find((data) => data.EL_ID == value)
            setClasseNow(filtedClient)
        }
        //onBlur={ (e) => setAbonnemmentData({...abonnemmentData, Eleve_ID: e.target.value })}
    }
    return(<>
                    <h5 className='mb-0 text-secondary '>  <span className='bi bi-person'></span> Eleve  </h5>
                    <datalist id="clientList">
                        {membreListe.map((test,index) =>
                        <option key={index} value={test.EL_ID}>{test.EL_Name} : {test.CL_Niveaux}</option>
                        )}
                    </datalist>
                    <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={abonnemmentData.Membre_ID}   onBlur={ (e) => SelectClasseFunction(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                    
                        <div className='card-body border-div mb-4 mt-4 mb-3 bg-gray'>
                            <div className='row '>
                                <div className='col-6 '> <span className='bi bi-person-fill'></span> Eleve :  {classeNow.EL_Name  ? classeNow.EL_Name  : ''}</div>
                                <div className='col-6 '> <span className='bi bi-box'></span> Classe : {classeNow.CL_Niveaux  ? classeNow.CL_Niveaux  : ''} </div>
                            </div>
                        </div>
                        
                    <h5 className='mb-0 mt-1 text-secondary '> <span className='bi bi-star'></span> Forfait  </h5>
                    <Dropdown
                        search
                        fluid
                        selection
                        wrapSelection={false}
                        options={forfaitListe}
                        placeholder={'Forfait'}
                        className='mb-3 shadow-sm'
                        onChange={(e, { value }) => setAbonnemmentData({...abonnemmentData, Forfait_ID: value })}
                        value={abonnemmentData.Forfait_ID}
                    /> 
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> <span className='bi bi-sun'></span> Saison   </h5>
                            <Select placeholder='Saisson'  options={SaisonChoise}  className='w-100 shadow-sm rounded mb-3' value={abonnemmentData.AB_Saisson} onChange={(e, data) => setAbonnemmentData({...abonnemmentData, AB_Saisson: data.value })} />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '><span className='bi bi-calendar'></span> Depart Le </h5>
                            <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={abonnemmentData.AB_Depart_Date} onChange={(e) => setAbonnemmentData({...abonnemmentData, AB_Depart_Date: e.target.value })}/> 
                        </div>
                    </div>

                    <div className='text-end mb-5 mt-3'>
                        <Button onClick={EditAbonnemtInfo} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
    </>)
}

const RenouvellmentCard = ({RenouvellerAbonnemtFunc, renouvellmmentData, setRnouvellmmentData, loaderState }) =>{
    const SaisonChoise = [
        {id:1, value :'2022/2023', text:'2022/2023'},
        {id:2, value :'2023/2024', text:'2023/2024'},
        {id:3, value :'2024/2025', text:'2024/2025'},
        {id:4, value :'2025/2026', text:'2025/2026'},
        {id:5, value :'2026/2027', text:'2026/2027'},
        {id:6, value :'2027/2028', text:'2027/2028'},
        {id:7, value :'2028/2029', text:'2028/2029'},
        {id:8, value :'2029/2030', text:'2029/2030'},
        {id:9, value :'2030/2031', text:'2030/2031'},
        {id:10, value :'2031/2032', text:'2031/2032'},
        {id:11, value :'2032/2033', text:'2032/2033'},
        {id:12, value :'2033/2034', text:'2033/2034'},
        {id:13, value :'2034/2035', text:'2034/2035'},
    ]
    return(<>
                    <h5>Le Renouvellement Prend les meme donneé de cette abonnemment mais change seulmment la saisson et le jour de départ : </h5>
                    <div className='row'>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '> Saison   </h5>
                            <Select placeholder='Saisson'  options={SaisonChoise}  className='w-100 shadow-sm rounded mb-3' value={renouvellmmentData.AB_Saisson} onChange={(e, data) => setRnouvellmmentData({...renouvellmmentData, AB_Saisson: data.value })} />
                        </div>
                        <div className='col-6'>
                            <h5 className='mb-0 mt-2 text-secondary '>Depart Le </h5>
                            <Input icon='calendar' type='date' placeholder='Camion'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={new Date(renouvellmmentData.AB_Depart_Date).toISOString().split('T')[0]} onChange={(e) => setRnouvellmmentData({...renouvellmmentData, AB_Depart_Date: e.target.value })}/> 
                        </div>
                    </div>
                    <div className='text-end mb-5 mt-3'>
                        <Button onClick={RenouvellerAbonnemtFunc} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Renouveller <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
    </>)
}

const PaymmentCard = ({paymmentMonth, FID, setPaymmentMonth, SavePymmentFunc, loaderState, abonnemmentData, setAbonnemmentData }) =>{
    const DeleteTrancheFunc = (itemToRemove) => {
        let paymmentList = JSON.parse(abonnemmentData.AB_Paymment).filter(item => 
            item.paymmentDate !== itemToRemove.paymmentDate || 
            item.tranche !== itemToRemove.tranche
          );
          console.log(paymmentList)
          axios.post(`${GConf.ApiLink}/abonnement/payee`, {
            PID :GConf.PID,
            editPaymment  : {FID : FID, toEdit: paymmentList},
        }).then(function (response) {
 
            if(response.data.affectedRows) {
                setAbonnemmentData({...abonnemmentData, AB_Paymment: JSON.stringify(paymmentList) })
                toast.success("Paymment Annuleé!", GConf.TostSuucessGonf)
                 
                 
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                 
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le Plat  </div></>, GConf.TostInternetGonf)   
              
            }
          });

          
    }  
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
                    {JSON.parse(abonnemmentData.AB_Paymment).map((data,index) => <li key={index}>{data.paymmentDate} : {data.tranche} (<Icon onClick={() => DeleteTrancheFunc(data)} className='text-danger' name='trash' />)</li>)}
                </div>
        </div> 
    </>
}

function FactureInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {FID} = useParams();
    const [abonnemmentData, setAbonnemmentData] = useState({});
    const [renouvellmmentData, setRnouvellmmentData] = useState({AB_Depart_Date: new Date().toISOString().split('T')[0]});
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
            render: () => <><Tab.Pane attached={false}><PaymmentCard FID={FID} paymmentMonth={paymmentMonth} setPaymmentMonth={setPaymmentMonth} setAbonnemmentData={setAbonnemmentData} SavePymmentFunc={SavePymmentFunc} loaderState={loaderState} abonnemmentData={abonnemmentData} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'renouveler', icon: 'tasks', content: 'Renouvellement' }, 
            render: () => <><Tab.Pane attached={false}><RenouvellmentCard OnKeyPressFunc={OnKeyPressFunc}  renouvellmmentData={renouvellmmentData} setRnouvellmmentData={setRnouvellmmentData} RenouvellerAbonnemtFunc={RenouvellerAbonnemtFunc} loaderState={loaderState}   /></Tab.Pane><br /></>,
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
    
             axios.post(`${GConf.ApiLink}/eleves`, {
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
    const RenouvellerAbonnemtFunc = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/abonnement/renouveller`, {
            PID :GConf.PID,
            abonnemmentData :abonnemmentData,
            renouvellmmentData : renouvellmmentData
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Abonnemment Renouveller !", GConf.TostSuucessGonf)
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
                            <img src={`https://cdn.abyedh.com/images/system/garderie/abonnemment.png`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mb-0 mt-1'><span className="bi bi-bookmark-star-fill"></span> {loading ? props.data.EL_Name : SKLT.BarreSkl } </h4> 
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
                                        <Statistic.Label>Depart</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                             <h3> {props.data.AB_Seasson} </h3> 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Saisson</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>seances</Divider>
                            <div className='row text-center'>
                                <div className='col-6  align-self-center border-end'>
                                        <h2 className='mb-0'>{loading ? props.data.NB_Seance : ''}</h2>
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
 
    const PaymmentCardOld = () =>{
        
        return<>
            <div className='row'>
                    <div className='col-6'>
                        {CheckPaymmentOfMonth() ? 
                            <>
                                <h3 className='text-center mt-4 text-info'>Ce Mois Est Payee</h3>
                            </> 
                            : 
                            <>
                                <Select placeholder='Choisir Uu Poste'  options={MoinsListe}  className='w-100 shadow-sm rounded mb-3' value={paymmentMonth} onChange={(e, data) => setPaymmentMonth(data.value)} />
                                <Button  onClick={SavePymmentFunc}  className='text-end rounded-pill bg-system-btn ' disabled={CheckPaymmentOfMonth()} positive>  <Icon name='save outline' /> Payee Le Mois Sélectionner <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                            </>
                        }

                        
                    </div>
                    <div className='col-6'>
                        <h5>Liste des mois Pyeé</h5>
                        <ul></ul>  
                        {JSON.parse(abonnemmentData.AB_Paymment).map((data,index) => <li key={index}>{data.moisNom} : {data.payee} </li>)}
                    </div>
            </div> 
        </>
    }

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