import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useGetFamillePlat from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
import { useTranslation, Trans } from 'react-i18next';
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import TableImage from '../../AssetsM/Cards/tableImg';
import { _ } from 'gridjs-react';

const EditArticle = ({classesD, setClassesD, OnKeyPressFunc,  EditPlatFunction,loaderState}) =>{
    const { t, i18n } = useTranslation();
    const GenrateKey = () =>{
        let ID = Math.random().toString(36).slice(2, 8);
        let PWD =  Math.floor(Math.random() * 1000000);
        setClassesD({...classesD, CM_Identifiant : ID , CM_Pwd:PWD})
    }
    
    return(<>

                        <div className='row'>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Nom: </h5>
                                    <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={classesD.CM_Name}  onChange={(e) => setClassesD({...classesD, CM_Name: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Matricule: </h5>
                                    <Input icon='key' iconPosition='left' placeholder='Matricule' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={classesD.CM_Matricule}  onChange={(e) => setClassesD({...classesD, CM_Matricule: e.target.value })}/>
                                </div>
                                <div className='col-12 col-lg-12'>
                                    <h5 className='mb-1'>Marque : </h5>
                                    <Input icon='box' iconPosition='left' placeholder='Marque' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={classesD.CM_Genre}  onChange={(e) => setClassesD({...classesD, CM_Genre: e.target.value })}/>
                                </div>
                                 
                        </div>
                        <div className='row mb-3'>
                                <div className='col-12 col-lg-6'>
                                    <h5 className='mb-1'>Identifiant:</h5>
                                    <Input icon='linkify' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='identifiant'  className='w-100 border-0 shadow-sm rounded mb-3' value={classesD.CM_Identifiant	} onChange={(e) => setClassesD({...classesD, CM_Identifiant	: e.target.value })} />
                                </div>
                                <div className='col-9 col-lg-5'>
                                    <h5 className='mb-1'>Mot De Pass: </h5>
                                    <Input icon='eye' iconPosition='left' onKeyPress={event => OnKeyPressFunc(event)} placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' value={classesD.CM_Pwd} onChange={(e) => setClassesD({...classesD, CM_Pwd: e.target.value })}/>
                                </div>
                                <div className='col-3 col-lg-1 align-self-center'>
                                   <Button onClick={GenrateKey} className="rounded-pill " icon='random'></Button>
                                </div>
                        </div>
                        <div className='p-1 mb-2'>
                            <h5 className='mb-1'> {t('menuTabs.teamPage.teamInfoPage.caissePWDData.smartID')} {classesD.Now_Login_ID}</h5>
                        </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditPlatFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function PlatInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {code} = useParams();
 
    const [eleveListe, setEleveListe] = useState([])
    let [articleList, setArticleList] = useState([]);
    const [loading , setLoading] = useState(false)
    const [classesD, setClassesD] = useState({});
    const [loaderState, setLS] = useState(false)
 
 
    const navigate = useNavigate();
 
 

    const panes = [
        {
            menuItem: { key: 'eleve', icon: 'calendar alternate', content: 'Commandes' }, 
            render: () =><><TableGrid tableData={eleveListe} columns={['ID','Client','Jour','Temps','Totale', 'Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'prof', icon: 'star', content: 'Stock' }, 
            render: () =><><TableGrid tableData={articleList} columns={['ID','Client','Jour','Temps','Totale','Date','Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle OnKeyPressFunc={OnKeyPressFunc} classesD={classesD}  setClassesD={setClassesD}    EditPlatFunction={EditPlatFunction} loaderState={loaderState} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteClassesCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camion/info`, {
            PID: GConf.PID,
            classeID: code, 
          })
          .then(function (response) {
            if(response.data.length == 0) {
                toast.error('Article Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/cl"; }, 2000)

            } else {
                
                setClassesD(response.data.Data)
                let factureListContainer = []
                response.data.Commandes.map( (getData) => factureListContainer.push([
                     
                    getData.OP_ID,
                    getData.CL_Name,
                     
                    new Date(getData.OP_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                    _(<>{JSON.parse(getData.OP_De).Gouv} <br /> {JSON.parse(getData.OP_De).Deleg} </>),
                    _(<>{JSON.parse(getData.OP_Vers).Gouv} <br /> {JSON.parse(getData.OP_Vers).Deleg} </>),
                    _(JSON.parse(getData.OP_Articles).length),
                     
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/op/info/${getData.OP_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setEleveListe(factureListContainer)
                    
                const combinedArticles = [];

              // Loop through the results and parse the JSON strings
                response.data.Commandes.forEach(result => {
                const articles = JSON.parse(result.OP_Articles);
                const opDate = result.OP_Date;
                const opID = result.OP_ID;
                const OP_De = result.OP_De;
                const OP_Vers = result.OP_Vers;
                combinedArticles.push(...articles.map(article => ({ ...article, OP_Date: opDate , OP_ID: opID, OP_De: OP_De, OP_Vers: OP_Vers})));
                 
              });

              let articleListContainer = []
              combinedArticles.map( (getData, index) => articleListContainer.push([
                 
                index+1 ,
                getData.OP_ID,
                getData.Name,
                getData.Description,
                getData.Qte,
                _(<>{JSON.parse(getData.OP_Vers).Gouv}  </>),
                new Date(getData.OP_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/op/info/${getData.OP_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
              ],))
              console.log(combinedArticles) 
              setArticleList(articleListContainer) 
                 
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
    const NavigateFunction = (link) => {  navigate(link) }
    const EditPlatFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/camion/modifier`, {
            PID :GConf.PID,
            voitureData :classesD,
            CM_ID :code,
        }).then(function (response) {
             
            if(response.data.affectedRows) {
                toast.success("Voiture Modifier !", GConf.TostSuucessGonf)
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
        axios.post(`${GConf.ApiLink}/camion/supprimer`, {
            tag :GConf.PID,
            code : code ,
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
 
 
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
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
                            <img src={`https://cdn.abyedh.com/images/system/transporteur/camion.jpg`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.CM_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.CM_Matricule } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.CM_Genre } </>: SKLT.BarreSkl} </h6>
                            <Divider horizontal className='text-secondary mt-4'>Matricule</Divider>
                            <div className='row text-center'>
                                <div className='col-12'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {props.data.CM_Matricule} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                         
                                    </Statistic>
                                </div>
                                 
                            </div>
                             
                    </div>
                </div>
            </div>
        </>);
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