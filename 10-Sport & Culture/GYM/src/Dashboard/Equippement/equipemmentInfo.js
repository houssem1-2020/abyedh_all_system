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
 

const EditArticle = ({equipemmetD, setEquipemmentD, OnKeyPressFunc, checkPrixCompatiblite, familles, EditEquipemmentFunc,loaderState,updateQte}) =>{
    return(<>

                <div className='row'>
                        <div className='col-12 col-lg-12'>
                            <h5 className='mb-1'>Nom: </h5>
                            <Input icon='star' onKeyPress={event => OnKeyPressFunc(event)} iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={equipemmetD.Name} onChange={(e) => setEquipemmentD({...equipemmetD, Name: e.target.value })}/>
                        </div>
                        
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Code  :</h5>
                                <Input icon='barcode'  disabled iconPosition='left' type='number' placeholder='code  ' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={equipemmetD.P_Code} onChange={(e) => setEquipemmentD({...equipemmetD, P_Code: e.target.value })} />
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Genre: </h5>
                               <Select placeholder='Selectionez une Categorie' options={familles} className='w-100 shadow-sm rounded mb-3' defaultValue={equipemmetD.Genre} onChange={(e, data) => setEquipemmentD({...equipemmetD, Genre: data.value })} />  
                            </div>
                </div>
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Cout: </h5>
                                <Input icon='dollar'   iconPosition='left' type='number' placeholder='achat' defaultValue={equipemmetD.Cout} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setEquipemmentD({...equipemmetD, Cout: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Prix Vente: </h5>
                                <Input icon='dollar'   iconPosition='left' type='number' placeholder='vente' defaultValue={equipemmetD.Prix_vente} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setEquipemmentD({...equipemmetD, Prix_vente: e.target.value })}/>
                            </div>

                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Prix Promo: </h5>
                                <Input icon='dollar'   iconPosition='left' type='number' placeholder='promo' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={equipemmetD.Prix_promo}  onChange={(e) => setEquipemmentD({...equipemmetD, Prix_promo: e.target.value })}/>
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Repture du stock: </h5>
                                <Input icon='angle double down' onKeyPress={event => OnKeyPressFunc(event)} iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={equipemmetD.Repture} onChange={(e) => setEquipemmentD({...equipemmetD, Repture: e.target.value })}/>
                            </div>
                </div>
                <div className='row'>
                    <h5 className='mb-1'>Description</h5>
                    <Form>
                        <TextArea onKeyPress={event => OnKeyPressFunc(event)} rows="3" defaultValue={equipemmetD.Description} className='w-100 shadow-sm rounded mb-3' onChange={(e) => setEquipemmentD({...equipemmetD, Description: e.target.value })}/>
                    </Form> 
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditEquipemmentFunc} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function PlatInfo() {
    /*#########################[Const]##################################*/
 
    let {code} = useParams();
    const [equipemmetD, setEquipemmentD] = useState({});
    const[familles] = useGetFamillePlat()
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
 
    const [updateQte, setUpdateQte] = useState(true)
    const [articleCalendar , setArticleCalendar] = useState([])
    
    const props = {width: 400, height: 250, zoomWidth: 500, img: equipemmetD ? equipemmetD.Photo_Path : 'tools.jpg'};

    const options = [
        { key: '1', value: '001.png', text: 'Les bancs de musculation', image: { src: 'https://cdn.abyedh.tn/images/system/gym/001.png', avatar: true } },
        { key: '2', value: '002.png', text: 'Les équipements de suspension ', image: { src: 'https://cdn.abyedh.tn/images/system/gym/002.png', avatar: true } },
        { key: '3', value: '003.jpg', text: 'Les machines cardiovasculaires', image: { src: 'https://cdn.abyedh.tn/images/system/gym/003.jpg', avatar: true } },
        { key: '4', value: '004.png', text: 'Les équipements de cardio-training', image: { src: 'https://cdn.abyedh.tn/images/system/gym/004.png', avatar: true } },
        { key: '5', value: '005.png', text: 'Les poids libres', image: { src: 'https://cdn.abyedh.tn/images/system/gym/005.png', avatar: true } },
        { key: '6', value: '006.jpg', text: 'Les tapis d exercice', image: { src: 'https://cdn.abyedh.tn/images/system/gym/006.jpg', avatar: true } },
      ]

    const panes = [
        {
            menuItem: { key: 'suivie', icon: 'calendar alternate', content: 'Emploi' }, 
            render: () =><><Tab.Pane attached={false}><Calendar /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle OnKeyPressFunc={OnKeyPressFunc} equipemmetD={equipemmetD}  setEquipemmentD={setEquipemmentD} checkPrixCompatiblite={checkPrixCompatiblite} familles={familles} EditEquipemmentFunc={EditEquipemmentFunc} loaderState={loaderState} updateQte={updateQte} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'image', icon: 'image', content: 'Image' }, 
            render: () => <><Tab.Pane attached={false}><Images /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteEquipemmentCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/equipemment/info`, {
            PID: GConf.PID,
            Code: code, 
          })
          .then(function (response) {
            console.log(response.data)
            if(response.data.length == 0) {
                toast.error('Article Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/eq"; }, 2000)

            } else {
                setEquipemmentD(response.data[0])
                setLoading(true)
            }
                
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger l'article  </div></>, GConf.TostInternetGonf)   
              setLoading(true)
              setEquipemmentD([])
            }
          });

    }, [])


    /*#########################[Function]##################################*/
    const EditEquipemmentFunc = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/equipemment/modifier`, {
            PID :GConf.PID,
            articleND :equipemmetD,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Plat Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                //SaveNotification('stockEditArticle',GConf.PID, equipemmetD)
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
    const UpdatePhotoFunction = (pathLink) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/equipemment/modifier/image`, {
            PID  :GConf.PID,
            code : code,
            path : equipemmetD.Photo_Path
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("Image Modifier !", GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier l'image  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const DeleteEquipemment = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/equipemment/supprimer`, {
            tag :GConf.PID,
            code : code ,
            pk: equipemmetD.PK
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
        if(equipemmetD.PrixA && equipemmetD.PrixV){
            if(equipemmetD.PrixA > equipemmetD.PrixV) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setEquipemmentD({...equipemmetD, PrixV: '', PrixA: '' })
            } 
        }  
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }

   /*#########################[Card]##################################*/
    const EquipemmentCard = (props) =>{
         
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container notification">
                            <img src={`https://cdn.abyedh.tn/images/system/gym/${equipemmetD.Photo_Path}`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center ">
                            <h4 className='mt-2'>{loading ? props.data.INS_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.INS_Genre } </>: SKLT.BarreSkl} </h6>
                            <Divider horizontal className='text-secondary mt-4'>Qte</Divider>
                            <div className='row text-center '>
                                <div className='col-12'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {props.data.INS_Qte} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Piéce</Statistic.Label>
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
            plugins={[ dayGridPlugin ]}
            initialView="dayGridMonth"
            locale='fr' 
            events={articleCalendar}
            height='420px'
            navLinks ={true}
        />
        {/* <div className='row mt-2'>
            <div className='col'><span className='bi bi-circle-fill text-success '></span> Par Bon entre</div>
            <div className='col'><span className='bi bi-circle-fill text-warning '></span> Par Bon Sortie</div>
            <div className='col'><span className='bi bi-circle-fill text-primary '></span> Dans Factures</div>
            <div className='col'><span className='bi bi-circle-fill text-danger '></span> Vers Camion</div>
        </div> */}
        </>)
    }
    const DeleteEquipemmentCard = () =>{
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
                <button type="submit" name="add" className="btn btn-danger rounded-pill" onClick={DeleteEquipemment}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></button>
            </div>
        </>)
    }
    const Images = () =>{   
 
        return(<>
        <div className='row p-2 mb-2'>   
             <div className='col-8'>
                <Select options={options} fluid placeholder='Choisir Une Image ' onChange={(e, data) => setEquipemmentD({...equipemmetD, Photo_Path: data.value })}  />
             </div>
             <div className='col-4'> 
                    <div className='card card-body  text-center p-4 mb-2 border-3 img-container'>
                        <img src={`https://cdn.abyedh.tn/images/system/gym/${equipemmetD.Photo_Path}`} width='100%' height='150px'  /> 
                    </div>
                    <Button fluid className='rounded-pill' onClick={(e) => UpdatePhotoFunction(props.link)} >Modifier </Button> 
             </div>
        </div>
       
        </>)
    }

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.platInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <EquipemmentCard data={equipemmetD}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
     </> );
}

export default PlatInfo;