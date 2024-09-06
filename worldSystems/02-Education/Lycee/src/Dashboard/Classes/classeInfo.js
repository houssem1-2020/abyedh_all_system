import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { _ } from "gridjs-react";
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useGetFamillePlat from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
import timeGridPlugin from '@fullcalendar/timegrid';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { useNavigate} from 'react-router-dom';
import TableImage from '../../AssetsM/Cards/tableImg';

const EditArticle = ({classesD, setClassesD, OnKeyPressFunc, checkPrixCompatiblite, niveaux, EditPlatFunction,loaderState,updateQte}) =>{
    return(<>
                <div className='row'>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Nom: </h5>
                                    <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={classesD.CL_Name}  onChange={(e) => setClassesD({...classesD, CL_Name: e.target.value })}/>
                                </div>
                        </div> 
                        <div className='row'>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Niveaux: </h5>
                                   <Select placeholder='Selectionner Une Famille' options={niveaux} className='w-100 shadow-sm rounded mb-3' value={classesD.CL_Niveaux} onChange={(e, data) => setClassesD({...classesD, CL_Niveaux: data.value })} />  
                                </div>
                        </div>

                <div className='text-end mb-5'>
                    <Button onClick={EditPlatFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function PlatInfo() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let Today = new Date().toISOString().split('T')[0]
    let {CLID} = useParams();
    const [articleNow, setArticleNow] = useState([])
    const [eleveListe, setEleveListe] = useState([])
    const [profListe, setProfListe] = useState([])
    const [seanceListe, setSeanceListe] = useState([])
    const [examainListe, setExamainListe] = useState([])
    const [emploiData, setEmploiData] = useState([])
    const [niveaux] = useGetFamillePlat() 
    let [defaultEmploi, setDefaultEmploi] = useState([])
    let [fullMatiereList, setFullMatiereList] = useState([]);
    const[familles] = useGetFamillePlat()
    const [stock] = useGetArticles()
    let [listeToShow, setListeToShow] = useState([])
    const [ingredienListe, setIngredientListe] = useState([])
    const [loading , setLoading] = useState(false)
    const [classesD, setClassesD] = useState({});
    const [loaderState, setLS] = useState(false)
 
    const [updateQte, setUpdateQte] = useState(true)
 
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [autofocusState, setAutoFocus] = useState(false)
 
 

    const options = [
        { key: '1', value: 'plat_pizza.png', text: 'PIZZA', image: { src: 'https://cdn.abyedh.com/images/system/Resto/plat_pizza.png', avatar: true } },
        { key: '2', value: 'plat_mlaoui.png', text: 'MLAOUI', image: { src: 'https://cdn.abyedh.com/images/system/Resto/plat_mlaoui.png', avatar: true } },
        { key: '3', value: 'plat_sandwich.png', text: 'SANDWICH', image: { src: 'https://cdn.abyedh.com/images/system/Resto/plat_sandwich.png', avatar: true } },
        { key: '', value: 'plat_chappati.png', text: 'CHAPPATI', image: { src: 'https://cdn.abyedh.com/images/system/Resto/plat_chappati.png', avatar: true } },
        { key: '', value: 'plat_boisson.png', text: 'BOISSON', image: { src: 'https://cdn.abyedh.com/images/system/Resto/plat_boisson.png', avatar: true } },
      ]

    const panes = [
        {
            menuItem: { key: 'eleve', icon: 'child', content: 'Eleve' }, 
            render: () =><><TableGrid tableData={eleveListe} columns={['ID','Client','Jour','Temps','Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'prof', icon: 'user', content: 'Prof' }, 
            render: () =><><TableGrid tableData={profListe} columns={['ID','Prof','Matiére','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'seances', icon: 'time', content: 'Seances' }, 
            render: () =><><TableGrid tableData={seanceListe} columns={['ID','Client','Jour','Temps','Totale','Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'empmloi', icon: 'table', content: 'Emploi' }, 
            render: () =><><Tab.Pane attached={false}><Calendar /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'resumer', icon: 'tasks', content: 'Examain' }, 
            render: () => <><TableGrid tableData={examainListe} columns={['ID','Matiere','Salle','Jour','De','Vers','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle OnKeyPressFunc={OnKeyPressFunc} classesD={classesD}  setClassesD={setClassesD} checkPrixCompatiblite={checkPrixCompatiblite} niveaux={niveaux} EditPlatFunction={EditPlatFunction} loaderState={loaderState} updateQte={updateQte} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Sup.' }, 
            render: () => <><Tab.Pane attached={false}><DeleteClassesCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/classes/info`, {
            PID: GConf.PID,
            classeID: CLID, 
          })
          .then(function (response) {
            if(response.data.length == 0) {
                toast.error('Article Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/cl"; }, 2000)

            } else {
                console.log(response.data)
                setClassesD(response.data.Data)
                GeneratedTime(JSON.parse(response.data.Data.CL_Emploi))
                GetProfListeFromEmploi(JSON.parse(response.data.Data.CL_Emploi))

                let eleveListeC = []
                response.data.Eleve.map( (getData) => eleveListeC.push([
                    getData.EL_ID,
                    getData.EL_Name,
                    new Date(getData.EL_Naissance).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.EL_Pere_Nom,
                    getData.EL_Mere_Nom,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/el/info/${getData.EL_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
                ],))
                setEleveListe(eleveListeC)

                let seanceListeC = []
                response.data.Seances.map( (getData) => seanceListeC.push([
                    getData.SE_ID,
                    getData.T_Name,
                    getData.Salle_Name,
                    new Date(getData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.SE_Time_Start,
                    getData.SE_Time_Finish,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.SE_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
                ],))
                setSeanceListe(seanceListeC)

                let examainListeC = []
                response.data.Examain.map( (getData) => examainListeC.push([
                    getData.EX_ID,
                    getData.Matiere_Name,
                    getData.Salle_Name,
                    new Date(getData.EX_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    getData.EX_Time_Depart,
                    getData.EX_Time_Finish,
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ex/info/${getData.EX_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
                ],))
                setExamainListe(examainListeC)
                
                setLoading(true)
            }
                
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger l'article  </div></>, GConf.TostInternetGonf)   
              setLoading(true)
              setClassesD([])
            }
          });

    }, [])


    /*#########################[Function]##################################*/
    const EditPlatFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/classes/modifier`, {
            PID :GConf.PID,
            classesD :classesD,
        }).then(function (response) {
             
            if(response.data.affectedRows) {
                toast.success("Classe Modifier !", GConf.TostSuucessGonf)
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
    const DeleteFromUpdateList = (value) =>{
        const searchObject= ingredienListe.findIndex((article) => article.A_Code == value);
        ingredienListe.splice(searchObject, 1);

        let resteArticles = ingredienListe;
        let tot = MakeSum()
        setIngredientListe(resteArticles)

        setClassesD({...classesD, Cout: tot})


    }
    const GetclassesData = (value) =>{
        const searchObject = stock.find((article) => article.A_Code == value);
        if (searchObject) {
            setArticleNow(searchObject);
            setAutoFocus(true)
            
        }else{
            toast.error('Article Indéfine ', GConf.TostSuucessGonf)
        }
    }
    const MakeSum = () => {
        let tot = 0
        ingredienListe.map( (art) => { 
           tot = tot +  (art.Prix * art.Qte)
        })
        return (tot)
    }
    const DeleteArticle = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/classes/supprimer`, {
            tag :GConf.PID,
            code : CLID ,
            pk: classesD.PK
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
    const checkPrixCompatiblite = () =>{
        if(classesD.PrixA && classesD.PrixV){
            if(classesD.PrixA > classesD.PrixV) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setClassesD({...classesD, PrixV: '', PrixA: '' })
            } 
        }  
    }
    const NavigateFunction = (link) => {  navigate(link) }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const findIdByValue = (value) => {
        const jourListe = [
            {id:0, value :'Dim', text:'Dimanche'},
            {id:1, value :'Lun', text:'Lundi'},
            {id:2, value :'Mar', text:'Mardie'},
            {id:3, value :'Mer', text:'Mercredie'},
            {id:4, value :'Jeu', text:'Jeudi'},
            {id:5, value :'Ven', text:'Vendredie'},
            {id:6, value :'Sam', text:'Samedie'},
            
        ]

        const jour = jourListe.find(jour => jour.value === value);
        return jour ? jour.id : null;
    }

    const GeneratedTime = (targetListe) => {
        let curr = new Date()
        let first = curr.getDate() - curr.getDay()
        const TargertDateIs = (dayIndex) => { return new Date(curr.setDate(first + dayIndex)).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}
        const TargertColor = (matiere) => { 
            
            let targetMat = fullMatiereList.find((data) => data.Matiere_ID === matiere)
            if (targetMat) {
                return targetMat.Matiere_Color
            } else{
                return '#7f7f7f'
            }
        }
        let reternedListe = []
        targetListe.map( (getData,index) => (
            getData.seances.map((data) =>  reternedListe.push({ title: `${data.matiereName} (${data.salleName})`,  start: `${TargertDateIs(findIdByValue(getData.day))}T${data.de}` , end: `${TargertDateIs(findIdByValue(getData.day))}T${data.vers}`,  className:'border-0 rounded-0 m-0 p-0', backgroundColor:  TargertColor(data.matiere) })) 
        ))         
        setListeToShow(reternedListe)
         
    }
    const GetProfListeFromEmploi = (targetListe) =>{
        let reternedListe = []
        targetListe.map( (getData,index) => (
            getData.seances.map((data) =>  reternedListe.push([
                    
                    data.proff,
                    data.proffName,
                    data.matiereName,
                     
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/tm/info/${data.proff}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
            ],)) 
        ))        
 
        const uniqueItems = new Set();

        const filteredArray = reternedListe.filter(item => {
            const isDuplicate = uniqueItems.has(item[0]);
            uniqueItems.add(item[0]);
            return !isDuplicate;
        });

        setProfListe(filteredArray)
        console.log(filteredArray)
    }
   /*#########################[Card]##################################*/
    const ClassesCard = (props) =>{
        const ReptureState = () =>{
            return (
            props.data.Repture >= props.data.Quantite ? <span className='bi bi-exclamation-triangle-fill bi-sm text-danger'></span> : <span className='bi bi-box2-heart-fill bi-sm text-success'></span>
            )
        }
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container notification">
                            <img src={`https://cdn.abyedh.com/images/system/garderie/classes.jpg`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.CL_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.CL_Niveaux } </>: SKLT.BarreSkl} </h6>
                            <Divider horizontal className='text-secondary mt-4'>Stat</Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {eleveListe.length} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Eleve</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {profListe.length} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Prof</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            {/* <Divider horizontal className='text-secondary mt-4'>Quantite</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Repture} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                    </Statistic>
                                </div>
                                <div className='col-6  align-self-center border-end'>
                                    <ReptureState />
                                </div>
                                <div className='col-6 align-self-center'>
                                <h6 className='mb-1'> Repture En: {props.data.Repture}</h6> 
                                </div>
                            </div> */}
                    </div>
                </div>
            </div>
        </>);
    }
    const Calendar = () =>{
        return(<>
            <FullCalendar 
                plugins={[ timeGridPlugin ]}
                initialView="timeGridWeek"
                locale='fr' 
                dayHeaderFormat = {{weekday: 'short'}}
                events={listeToShow}
                headerToolbar='false'
                height='490px'
                allDaySlot= {false}
                slotMinTime = '08:00'  
                slotMaxTime = '18:00' 
            />
        </>)
    }
    const DeleteClassesCard = () =>{
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
 
 

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.platInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <ClassesCard data={classesD}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
                {/* <FrameForPrint frameId='printResumer' src={`/Pr/Stock/resumer/${code}/${resDay.start}/${resDay.end}`} /> */}
     </> );
}

export default PlatInfo;