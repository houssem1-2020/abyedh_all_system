import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
 

const EditArticle = ({forfaitD, setFordaitD, checkPrixCompatiblite, familles, EditArticleFunction,loaderState,updateQte}) =>{
    return(<>

                <h5 className='mb-1'>Code à barre:</h5>
                <Input icon='barcode' disabled iconPosition='left' type='number' placeholder='code a barre' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={forfaitD.A_Code} onChange={(e) => setFordaitD({...forfaitD, A_Code: e.target.value })} />
                <h5 className='mb-1 mt-0'>Nom: </h5>
                <Input icon='star' iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={forfaitD.Name} onChange={(e) => setFordaitD({...forfaitD, Name: e.target.value })}/>
                
                <div className='row'>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Genre: </h5>
                                <Input icon='dollar' iconPosition='left'   placeholder='genre' defaultValue={forfaitD.Genre}   className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setFordaitD({...forfaitD, Genre: e.target.value })}/> </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Prix Acaht: </h5>
                                <Input icon='dollar' iconPosition='left' type='number' placeholder='achat' defaultValue={forfaitD.Prix_achat} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setFordaitD({...forfaitD, Prix_achat: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-4'>
                                <h5 className='mb-1'>Quantité: </h5>
                                <Input icon='dropbox' iconPosition='left' type='number' disabled={true} placeholder='quantité' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={forfaitD.Quantite} onChange={(e) => setFordaitD({...forfaitD, Quantite: e.target.value })}/> 
                            </div>
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-12'>
                                <h5 className='mb-1'>Repture du stock: </h5>
                                <Input icon='angle double down' iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={forfaitD.Repture} onChange={(e) => setFordaitD({...forfaitD, Repture: e.target.value })}/>
                            </div>
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditArticleFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function ArticleInfo() {
    /*#########################[Const]##################################*/
    let {code} = useParams();

    
    const [forfaitD, setFordaitD] = useState({});
    const [forfaitListe , setForfaitListe] = useState([])

    const [loaderState, setLS] = useState(false)
    const [loading , setLoading] = useState(false)

    const panes = [
        {
            menuItem: { key: 'resumer', icon: 'file excel', content: 'Abonneé' }, 
            render: () => <><Tab.Pane attached={false}><StockESCard /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle forfaitD={forfaitD}  setFordaitD={setFordaitD}   EditArticleFunction={EditArticleFunction} loaderState={loaderState}   /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteForfaitCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/forfait/select`, {
            PID: GConf.PID,
            code: code, 
          })
          .then(function (response) {
            if(!response.data[0]) {
                toast.error('Forfait Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/of"; }, 2000)
                
            } else {
                setFordaitD(response.data[0])
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


    /*#########################[Function]##################################*/
    const EditArticleFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/forfait/modifier`, {
            PID :GConf.PID,
            articleND :forfaitD,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Article Modifier !", GConf.TostSuucessGonf)
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
            code : code ,
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
                            <img src={`https://cdn.abyedh.tn/images/system/gym/tarifs.png`} className="rounded-circle" width="70px" height="70px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.F_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.NB_Seance } seances </>: SKLT.BarreSkl} </h6>
                            <Divider horizontal className='text-secondary mt-4'>Prix</Divider>
                                <Statistic color='red' size='tiny' className='mb-0'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {parseFloat(props.data.Tarif).toFixed(3)} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>TARIF</Statistic.Label>
                                </Statistic>

                    </div>
                </div>
            </div>
        </>);
    }
    const DeleteForfaitCard = () =>{
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
    const StockESCard = () =>{
        return(<>
                <h5>Liste des forfait dans abonnemment  </h5>
                 
        </>)
    }


    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.stockInfo} />
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

export default ArticleInfo;