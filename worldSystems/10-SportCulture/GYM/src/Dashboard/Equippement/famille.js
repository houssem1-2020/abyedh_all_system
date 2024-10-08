import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button,  Form, Icon, Input, Loader, Modal, Pagination, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import axios from 'axios';
import {toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
import useSaveNotification from '../../AssetsM/Hooks/saveNotifFunction';

const EditModal = ({setModalS,EditFamille,editfamilleD,setEditFamilleD,modalS,OnKeyPressFunc}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={modalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setModalS(false)}
                    onOpen={() => setModalS(true)}
                >
                    <Modal.Header><h4>Modifier Famille</h4></Modal.Header>
                    <Modal.Content>
                            
                            <h5 className='mb-1'>Famille</h5>
                            <Input icon='tags' onKeyPress={event => OnKeyPressFunc(event)} iconPosition='left'  placeholder='Non de la famille' className='w-100 border-0 rounded ' value={editfamilleD.Name} onChange={(e) => setEditFamilleD({...editfamilleD, Name: e.target.value })}/>
                            <h5 className='mb-1'>Description </h5>
                            <Form>
                                <TextArea onKeyPress={event => OnKeyPressFunc(event)} rows="3" placeholder='Designer la famille '  className='w-100' value={editfamilleD.Description} onChange={(e) => setEditFamilleD({...editfamilleD, Description: e.target.value })}/>
                            </Form>
                            <br />
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button  className=' bg-system-btn rounded-pill' onClick={EditFamille}>  <Icon name='save' /> Enregistrer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}
const DeleteModal = ({setDeleteModalS,DeleteFamille,editfamilleD,setEditFamilleD,deletemodalS}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={deletemodalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setDeleteModalS(false)}
                    onOpen={() => setDeleteModalS(true)}
                    
                >
                    <Modal.Header><h4>Supprimer Famille</h4></Modal.Header>
                    <Modal.Content>
                            Voulez-Vous Vraimment Supprimer Cette Famille 
                            <br />
                            <br />
                            <div className='mb-0 p-0'><h5> Famille : {editfamilleD.Name}</h5></div>         
                            <div><h5> Description : {editfamilleD.Description} </h5></div>
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setDeleteModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button negative className='rounded-pill' onClick={DeleteFamille}>  <Icon name='trash' /> Supprimer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}

function FamillesPlats() {
    /*#########################[Const]##################################*/
    const [familleList, setFamillesList] = useState([]);
    const [displayFamille, setDisplayFamille] = useState([]);
    const [saveBtnState, setSaveBtnState] = useState('')
    const [updateFT, setUpdateFT] = useState('')
    const [familleD, setFamilleD] = useState([])
    const [editfamilleD, setEditFamilleD] = useState([])
    const [modalS, setModalS] = useState(false)
    const [modalSS, setModalSS] = useState(false)
    const [deletemodalS, setDeleteModalS] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [loading , setLoading] = useState(false)
    const [activePage , setActivePage] = useState(1)
    
    const SaveNotification = (genre,tag,table) =>{ useSaveNotification(genre,tag,table)}
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const options = [
        {
          key: "1",
          value: "001.png",
          text: "Les bancs de musculation",
          image: {
            src: "https://cdn.abyedh.com/images/system/gym/001.png",
            avatar: true,
          },
        },
        {
          key: "2",
          value: "002.png",
          text: "Les équipements de suspension ",
          image: {
            src: "https://cdn.abyedh.com/images/system/gym/002.png",
            avatar: true,
          },
        },
        {
          key: "3",
          value: "003.jpg",
          text: "Les machines cardiovasculaires",
          image: {
            src: "https://cdn.abyedh.com/images/system/gym/003.jpg",
            avatar: true,
          },
        },
        {
          key: "4",
          value: "004.png",
          text: "Les équipements de cardio-training",
          image: {
            src: "https://cdn.abyedh.com/images/system/gym/004.png",
            avatar: true,
          },
        },
        {
          key: "5",
          value: "005.png",
          text: "Les poids libres",
          image: {
            src: "https://cdn.abyedh.com/images/system/gym/005.png",
            avatar: true,
          },
        },
        {
          key: "6",
          value: "006.jpg",
          text: "Les tapis d exercice",
          image: {
            src: "https://cdn.abyedh.com/images/system/gym/006.jpg",
            avatar: true,
          },
        },
      ];
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/equipemment/famille`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            setFamillesList(response.data)
            setLoading(true)
            setDisplayFamille(response.data.slice(0,5));
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des familles dans votre ordinateur  </div></>, GConf.TostInternetGonf)   
              setFamillesList(Offline.famille)
              setLoading(true)
              setDisplayFamille(Offline.famille.slice(0,5));
            }
          });
    }, [updateFT])
    
    /*#########################[Function]##################################*/
    const SaveFamille = () => {
        if (!familleD.Name) {toast.error("Non de La famille est Invamlide !", GConf.TostErrorGonf)}
        else if (!familleD.Description) {toast.error("Description est Invamlide !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/equipemment/familles/ajouter`, {
                PID : GConf.PID,
                familleD : familleD,
            }).then(function (response) {
                console.log(response.data)
                if(response.data.affectedRows) {
                    setSaveBtnState('disabled')
                    toast.success("Famille Ajouter avec Suucess", GConf.TostSuucessGonf)
                    setFamilleD([])
                    setLS(false)
                    setUpdateFT(Math.random() * 10)
                    //SaveNotification('stockSaveFamille',GConf.PID, familleD)
                }
                else{
                    toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                    setLS(false)
                }
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> La famille  n'a pas ete enregistre </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
              });
        }
    }
    const EditFamille = () => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/equipemment/familles/modifier`, {
            PID : GConf.PID,
            familleD : editfamilleD,
        }).then(function (response) {
            if(response.data.affectedRows) {
                setModalS(false)
                toast.success("Famille Modifier avec Suucess", GConf.TostSuucessGonf)
                setUpdateFT(Math.random() * 10)
                setLS(false)
                SaveNotification('stockEditFamille',GConf.PID, editfamilleD)
            }
            else{
                setModalS(false)
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
            
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Vous Pouvez pas modifier cette famille </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
        

    }
    const DeleteFamille = () =>{

    }
    const checkFamilleExistance = () =>{
        if(familleD.Name){
            if(familleD.Name in familleList) {
                toast.error("Famille Deja Exist", GConf.TostErrorGonf)
                setFamilleD({...familleD, Name: '' })
            } 
        }
    }
    const openEditModal = (event,selected) =>{
        setEditFamilleD({PK: event.PK , Name:event.Genre, Description:event.Description})
        selected ? setModalS(true) : setDeleteModalS(true)
    }
    const handlePaginationChange = (e,{ activePage }) =>{
        setActivePage(activePage)
        let start = 5 * (activePage - 1)
        let end = 5*  activePage
        setDisplayFamille(familleList.slice(start, end));
    }
    const GetPageNumber = (Liste) =>{
        if (Liste % 5 == 0) {
            return(Liste/5)
            
        } else {
            return(Math.floor(Liste/5)+1)
            
        }
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const SelectGenre = (props) =>{
        return(<div className='col-2'>
            <div className={`mb-3 border-div card p-2 h-100 text-center  `} onClick={() => setFamilleD({...familleD, Name: props.data.text , Description: props.data.text })} >
            <img
                src={props.data.image.src}
                width="100px"
                height="100px"
              />
              <h5 className='mt-2 mb-1 text-secondary'>{props.data.text}</h5>
            </div>
        </div>)
    }
   /*#########################[Card]##################################*/
    const FamilleCard = (props) =>{
        return(<>
                <div className='card p-2 shadow-sm mb-2'>
                    <div className='row'>
                        <div className='col-10'>
                        <div className="d-flex p-0">
                                <div className="flex-shrink-0 align-self-center">
                                    <span className='bi bi-tags-fill bi-md system-color'></span>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <h6 className='mb-1'>{props.data.Genre}</h6>
                                    <small> {props.data.Description} </small>
                                </div>
                            </div>
                        </div>
                        <div className='col-2 align-self-center text-end'>
                                <Button  icon='edit outline' size='mini' className='rounded-circle bg-system-btn' onClick={() => openEditModal(props.data,true)}/>
                                <Button  icon='trash alternate' size='mini' className='rounded-circle bg-danger text-white' onClick={() => openEditModal(props.data,false)}/>
                        </div>
                    </div>
                </div>
        </>)
    }
    const EmptyListeCard = () =>{
        return(<>
            <div className='text-center'>
                <span className='bi bi-layout-wtf bi-xlg system-color'></span> 
                <h4>Ajouter des Famille à droite </h4>
            </div>  
        </>)
    }

    return ( <> 
            <BreadCrumb links={GConf.BreadCrumb.menuFamille} />
            <br />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className='mb-3 text-end'>
                        {/* totalPages={Math.floor((familleList.length / 5))+1} */}
                        <Pagination  onPageChange={handlePaginationChange} defaultActivePage={1} firstItem={null} lastItem={null} totalPages={GetPageNumber(familleList.length)} />
                    </div>
                    {loading ?  
                    <>
                        {displayFamille.length == 0 ? 
                        <EmptyListeCard />
                        :
                        <>
                            {displayFamille.map( (data) => <FamilleCard key={data.PK}  data={data} />)}
                        </>
                        }
                    </>
                    : SKLT.CardList }
                
                </div>
                <div className="col-12 col-lg-4">
                <Bounce bottom>
                    <div className="card card-body border-div mb-4 sticky-top" style={{top:'70px' , zIndex:'1'}}>
                        <h4>Ajouter Famille</h4>
                        <div className=' '>
                            <Button  fluid className='rounded-pill mt-2' onClick={() => setModalSS(true)}><Icon name='plus' /></Button>
                        </div>
                        <h5 className='mb-1'>Nom </h5>
                        <Input icon='tags' onKeyPress={event => OnKeyPressFunc(event)} iconPosition='left' value={familleD.Name} placeholder='Non de la famille' className='w-100 border-0 rounded shadow-sm' onBlur={checkFamilleExistance} onChange={(e) => setFamilleD({...familleD, Name: e.target.value })}/>
                        <h5 className='mb-1'>Description </h5>
                        <Form>
                            <TextArea onKeyPress={event => OnKeyPressFunc(event)} rows="3" placeholder='Designer la famille ' value={familleD.Description} className='w-100 shadow-sm' onChange={(e) => setFamilleD({...familleD, Description: e.target.value })}/>
                        </Form>
                        <br />
                        <div className='text-end'>
                            <Button  className={`text-end bg-system-btn rounded-pill ${saveBtnState}`} onClick={SaveFamille}>   <Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                        </div>
                    </div>
                </Bounce>
                </div>
            </div>
            <EditModal OnKeyPressFunc={OnKeyPressFunc} setModalS={setModalS} EditFamille={EditFamille} editfamilleD={editfamilleD}  setEditFamilleD={setEditFamilleD} modalS={modalS} />
            <DeleteModal setDeleteModalS={setDeleteModalS} DeleteFamille={DeleteFamille} editfamilleD={editfamilleD}  setEditFamilleD={setEditFamilleD} deletemodalS={deletemodalS} />
                <Modal  
                    //basic
                    size='large'
                    open={modalSS}
                    closeIcon
                    dimmer= 'blurring'
                    onClose={() => setModalSS(false)}
                    onOpen={() => setModalSS(true)}
                >
                    <Modal.Content>
                        <div className='row'>
                            {
                                options.map((data,index) => <SelectGenre key={index} data={data} />)
                            }
                        </div>
                    </Modal.Content>
                    
                </Modal> 
        </> );

}

export default FamillesPlats;