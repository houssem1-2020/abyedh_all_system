import axios from 'axios';
import { _ } from 'gridjs-react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Modal } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import TableGrid from '../../AssetsM/Cards/tableGrid';

const AddCard = ({teamListe, avanceData , setAvanceData , Ajouter }) =>{
    return<>
    <div className="sticky-top" style={{top:'70px'}}>
        <div className='card card-body shadow-sm border-div mb-2'>
            <h5>Selectioner Membre</h5> 
            <datalist id="teamListe">
                {teamListe.map((team,index) =>
                <option key={index} value={team.T_ID}>{team.T_Name} - {team.Poste}</option>
                )}
            </datalist>
            <Input icon='users' placeholder='Enter Membre' list="teamListe"  onChange={ (e) => setAvanceData({...avanceData, Team_ID:e.target.value})} size="small" iconPosition='left' value={avanceData.Team_ID}  fluid className='mb-1 shadow-sm' /> 
            
            <h5>Montant </h5> 
            <Input icon='asl' type='number' autoFocus={true}    onChange={ (e) => setAvanceData({...avanceData, Valeur:e.target.value})} size="small" iconPosition='left' placeholder='Valeur'  fluid className='mb-1 shadow-sm' />
            <br />
            <Button disabled={false}  className='rounded-pill bg-system-btn' onClick={Ajouter}>  <Icon name='edit outline' /> Ajouter</Button>
        </div>
    </div>
    </>
}
const DeleteModal = ({setDeleteModalS,DeleteAvance,editAvanceD,deletemodalS}) =>{
    return(<>
            <Modal
                    size='mini'
                    open={deletemodalS}
                    dimmer = 'blurring'
                    closeIcon
                    onClose={() => setDeleteModalS(false)}
                    onOpen={() => setDeleteModalS(true)}
                    
                >
                    <Modal.Header><h4>Supprimer Avance</h4></Modal.Header>
                    <Modal.Content>
                            Voulez-Vous Vraimment Supprimer Cette Avance 
                            <br />
                            <br />
                            <div className='mb-0 p-0'><h5> Valeur : {editAvanceD.Valeur}</h5></div>         
                            <div><h5> Membre : {editAvanceD.T_Name} </h5></div>
                    </Modal.Content>
                    <Modal.Actions>
                                {/* <Button className='rounded-pill' negative onClick={ () => setDeleteModalS(false)}> <span className='bi bi-x' ></span> </Button> */}
                                <Button negative className='rounded-pill' onClick={DeleteAvance}>  <Icon name='trash' /> Supprimer </Button>
                    </Modal.Actions>
            </Modal>
    </>)
}

function TeamAvance() {
    /*#########################[Const]##################################*/
    let  [avanceListe, setAvanceListe] = useState([]); 
    let  [teamListe, setTeamList] = useState([]); 
    let  [avanceData, setAvanceData] = useState({Team_ID:'', Valeur:''}); 
    const [deletemodalS, setDeleteModalS] = useState(false)
    const [editAvanceD, setEditAvanceD] = useState([])

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/team/anavce`, {
            PID :  GConf.PID ,
          })
          .then(function (response) {
            let testTable = []
            response.data.map( (getData, index) => testTable.push([
           (index+1),
            getData.T_Name,
            parseFloat(getData.Valeur).toFixed(3),
            new Date(getData.AV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            _(<Button className='rounded-pill bg-danger text-white ' size='mini' onClick={() => openEditModal(getData,false)}> X </Button>)
            ],))
            setAvanceListe(testTable)
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
            }
        });

        axios.post(`${GConf.ApiLink}/team`, {
            PID: GConf.PID,
           }).then(function (response) {
            setTeamList(response.data)
           }).catch((error) => {
                if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
                }
        });

    }, [])

    /*#########################[Functions]##################################*/
    const  Ajouter = () =>{
        if (!avanceData.Team_ID) { toast.error("Memebre Invalide !", GConf.TostErrorGonf) } 
        else if (!avanceData.Valeur) { toast.error("Valeur Invalide !", GConf.TostErrorGonf) } 
        else {
            console.log('uyg')
            axios.post(`${GConf.ApiLink}/team/anavce/ajoute`, {
                PID :  GConf.PID ,
                avanceD : avanceData
              })
              .then(function (response) {
                toast.success("Avance Ajouter  !", GConf.TostSuucessGonf)   
                 
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
                }
              });
        }
    }
    const DeleteAvance = () =>{

    }
    const openEditModal = (event,selected) =>{
        setEditAvanceD({PK: event.PK , Valeur:parseFloat(event.Valeur).toFixed(3), T_Name:event.T_Name})
        setDeleteModalS(true)
    }

    /*#########################[Card]##################################*/
    

    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.TeamPoste} />
            <br />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-lg-4'><AddCard teamListe={teamListe} avanceData={avanceData} setAvanceData={setAvanceData} Ajouter={Ajouter} /></div>
                    <div className='col-12 col-lg-8'><TableGrid tableData={avanceListe} columns={['*','Nom','Jour', 'Valeur','X']} /></div>
                </div>
            </div>
            <DeleteModal setDeleteModalS={setDeleteModalS} DeleteAvance={DeleteAvance} editAvanceD={editAvanceD}  setEditAvanceD={setEditAvanceD} deletemodalS={deletemodalS} />
    </> );
}

export default TeamAvance;