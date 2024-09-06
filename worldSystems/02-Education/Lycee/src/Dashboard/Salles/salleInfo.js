import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
import { _ } from 'gridjs-react';
import TableImage from '../../AssetsM/Cards/tableImg';
import TableGrid from '../../AssetsM/Cards/tableGrid';
 

const EditArticle = ({forfaitD, setFordaitD, OnKeyPressFunc,  EditArticleFunction,loaderState }) =>{
    return(<>

                <h5 className='mb-1 mt-0'>Nom: </h5>
                <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={forfaitD.F_Name}  onChange={(e) => setFordaitD({...forfaitD, F_Name: e.target.value })}/>
                
                <h5 className='mb-1 mt-0'>Tarif: </h5>
                <Input icon='dollar' iconPosition='left' placeholder='Tarif' className='w-100 border-0 shadow-sm rounded mb-3' onKeyPress={event => OnKeyPressFunc(event)} value={forfaitD.Tarif}  onChange={(e) => setFordaitD({...forfaitD, Tarif: e.target.value })}/>

                <div className='row'>
                    <div className='col-12'>
                        <h5 className='mb-1'>Nombre de Seance: </h5>
                        <Input icon='tag' iconPosition='left' type='number' placeholder='Nombre de Seance' value={forfaitD.NB_Seance}   className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setFordaitD({...forfaitD, NB_Seance: e.target.value })}/> 
                    </div>
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditArticleFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function SalleInfo() {
    /*#########################[Const]##################################*/
    let {SAID} = useParams();
    const navigate = useNavigate();
    
    const [forfaitD, setFordaitD] = useState({});
    const [forfaitListe , setForfaitListe] = useState([])

    const [loaderState, setLS] = useState(false)
    const [loading , setLoading] = useState(false)

    const panes = [
        {
            menuItem: { key: 'resumer', icon: 'file excel', content: 'Abonneé' }, 
            render: () => <> <TableGrid tableData={forfaitListe} columns={['ID','Mmebre','Depart','Saisson','Seances','Etat','Voir']} /> <br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle forfaitD={forfaitD}  setFordaitD={setFordaitD} OnKeyPressFunc={OnKeyPressFunc}  EditArticleFunction={EditArticleFunction} loaderState={loaderState}   /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteForfaitCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/salles/select`, {
            PID: GConf.PID,
            SAID: SAID, 
          })
          .then(function (response) {
            console.log(response.data)
            if(!response.data.Data.Salle_ID) {
                toast.error('Forfait Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sl"; }, 2000)
                
            } else {
                setFordaitD(response.data.Data)
                let abonemmentContainer = []
               response.data.Seances.map( (getData) => abonemmentContainer.push([
                 
                getData.CL_Name,
                getData.T_Name,
                getData.Matiere_Name,
                
                new Date(getData.SE_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                getData.SE_Time_Start,
                getData.SE_Time_Finish,
                 
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sa/info/${getData.SE_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
               ],))
               setForfaitListe(abonemmentContainer)

                setLoading(true)
            }
                
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger l'article  </div></>, GConf.TostInternetGonf)   
              setLoading(true)
              setFordaitD([])
            }
          });

    }, [])
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
              e.preventDefault();
        }   
     }

    /*#########################[Function]##################################*/
    const EditArticleFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/forfait/modifier`, {
            PID :GConf.PID,
            F_ID :SAID,
            forfaitData :forfaitD,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Forfait Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                 
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier l'article  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const DeleteArticle = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/forfait/supprimer`, {
            tag :GConf.PID,
            code : SAID ,
            pk: forfaitD.PK
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
    const NavigateFunction = (link) => {  navigate(link) }
    const CheckPaymmentOfMonth = (value) =>{
        let searchForMonth = JSON.parse(value).find((data) => data.mois == (new Date()).getMonth() + 1)
        if (searchForMonth) {
            return 'Payee'
        } else {
            return 'NonPayee'
        }
    }
   /*#########################[Card]##################################*/
    const ForfaitCard = (props) =>{
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
                        <div className="card-container notification bg-white">
                            <img src={`https://cdn.abyedh.com/images/system/garderie/salle.jpg`} className="rounded-circle" width="70px" height="70px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h1 className='mt-2 mb-0'>{loading ? props.data.Salle_Name : SKLT.BarreSkl } </h1> 
                            <h5 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> Numero:  { props.data.Salle_Num }   </>: SKLT.BarreSkl} </h5>
                            <Divider horizontal className='text-secondary mt-4'>Genre  </Divider>
                                <Statistic color='red' size='tiny' className='mb-0'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {props.data.Salle_Genre} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                         
                                </Statistic>

                    </div>
                </div>
            </div>
        </>);
    }
    const DeleteForfaitCard = () =>{
        return(<>
            <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Cett Forfait ?</h3> 
            <div className='row'>
                <div className='col-9'>
                    <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer L'Forfait : </b></h5>
                    <ul className="text-info text-left">
                    <li>L'Forfait ne sera pas visible dans la branche 'Stock'</li>
                    <li>Tous les Forfait avec cette ID vont se supprimé </li>
                    <li>L'Forfait Soit visible seulemment dans les Abonnement  </li>
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
    const StateCard = ({ status }) => {
        const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
        const statusCard = React.useCallback(() => {
          switch(status) {
            case 'Payee': return <StateCard color='success' text='Payeé' />;  
            case 'NonPayee': return <StateCard color='danger' text='Non Payeé' /> ;
            case 'EnAttent': return <StateCard color='secondary' text='En Court' /> ;
            default:  return <StateCard color='warninf' text='Indefinie' />;    
          }
        }, [status]);
      
        return (
          <div className="container">
            {statusCard()}
          </div>
        );
    };
    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.forfraitInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <ForfaitCard data={forfaitD}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
     </> );
}

export default SalleInfo;