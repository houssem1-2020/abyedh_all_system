import React, {useEffect,useState}  from 'react';
import GConf from '../../../AssetsM/APPConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import SubNav from '../../../AssetsM/Cards/subNav';
import GoBtn from '../../../AssetsM/Cards/goBtn';
import TableImage from '../../../AssetsM/Cards/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Tab, Statistic, Input, Placeholder} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import ADIL from '../../../AssetsM/APPITEM';
import CountUp from 'react-countup';
import APPConf from '../../../AssetsM/APPConf';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'


function DocteurSpecific() {
     /*#########################[Const]##################################*/
     const [loading, setLoading] = useState(true)

     const [addTarifActive, setAddTarifActive] = useState(false)
     const [addAssurance, setAddAssurance] = useState(false)
     const [addDiplome, setAddDiplome] = useState(false)

     const [addTarifWas, setAddTarifWas] = useState(false)
     const [addAssuranceWas, setAddAssuranceWas] = useState(false)
     const [addDiplomeWas, setAddDiplomeWas] = useState(false)

     const [returnedProfileData, setReturnedProfileData] = useState({SP_Tarif:[], SP_Assurance:[], SP_Diplomes:[]})
     const [loaderState, setLS] = useState(false)
   

   /*#########################[UseEfeect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/spesific`, {
           PID : GConf.PID,
           SystemTag : GConf.systemTag
        })
        .then(function (response) {

          setReturnedProfileData(response.data) 
          setLoading(false)

        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, GConf.TostInternetGonf)   
            setReturnedProfileData([])
          }
        });
    }, [])
    
   /*#########################[Function]##################################*/
    const DeleteFromTarifList = (targetIndex, targetGenre) =>{
      let emptyArray = JSON.parse(returnedProfileData[targetGenre])
      emptyArray.splice(targetIndex, 1);
      setReturnedProfileData({...returnedProfileData, [targetGenre] :JSON.stringify(emptyArray) })
      switch (targetGenre) {
        case 'SP_Tarif':
          setAddTarifWas(true)
          break;
        case 'value':
          setAddAssuranceWas(true)
          break;
        case 'SP_Diplomes':
          setAddDiplomeWas(true)
            break;
        default:
          break;
      }

    }
    const UpdateFunction = (targetGenre) =>{
      // if (commandeData.articles.length == 0 ) {toast.error("أدخل  منتجات   !", GConf.TostErrorGonf)}
      // else if (!commandeData.Wanted_Day  ) {toast.error("أدخل  اليوم   !", GConf.TostErrorGonf)}
      // else if (!commandeData.Wanted_Time  ) {toast.error("أدخل  اليوم   !", GConf.TostErrorGonf)}
      // else if (!commandeData.Livraison_Par  ) {toast.error("أدخل  اليوم   !", GConf.TostErrorGonf)}
      // else{
           
          setLS(true)
          axios.post(`${GConf.ApiLink}/spesific/update`, {
            PID : GConf.PID,
            SystemTag : GConf.systemTag,
            toUpdateData : {Genre : targetGenre, Value: returnedProfileData[targetGenre]}
          }).then(function (response) {
              toast.success(<><div><h5>تم التسجيل بنجاح </h5>  </div></>, GConf.TostInternetGonf)
              setLS(false)
               
          }).catch((error) => {
              if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                setLS(false)
              }
          });
      // } 
  }

    /*#########################[Card]##################################*/
    const SekeltonCard = () =>{
        const PlaceHolderCard = () =>{
            return(<>
            <Placeholder className='mb-0 border-div' style={{ height: 30, width: '100%' }}>
                <Placeholder.Image />
            </Placeholder>
            </>)
        }
        return(<>
            <PlaceHolderCard />
            <PlaceHolderCard />
            <PlaceHolderCard />
        </>)
    }

    const ListeVide = (props) =>{
      return(<>
        <div className='text-center pt-4 text-secondary' onClick={() =>setAddTarifActive(!addTarifActive)}>
          <span className={`bi bi-${props.icon} bi-lg`}></span>
          <h5 className='mt-2'>Cliquer Sur + pour ajouter </h5>
        </div>

      </>)
    }

    const AddTarifCard = (props) =>{
        const [dataNow, setDataNow] = useState({PK: 1 , Name:'', Qte: ''}) 

        const AddArticleToList = () =>{
          if (!dataNow.Forfait) { toast.error("أدخل  إسم العرض   !", GConf.TostErrorGonf) } 
          else if (!dataNow.Prix) { toast.error("أدخل السعر  !", GConf.TostErrorGonf) } 
          else if (!dataNow.Description) { toast.error("أدخل الوصف  !", GConf.TostErrorGonf) } 
          else {
              if (returnedProfileData.SP_Tarif == '') {
                  let emptyArray = []
                  emptyArray.push(dataNow)
                  setReturnedProfileData({...returnedProfileData, SP_Tarif:JSON.stringify(emptyArray) })
                  setAddTarifWas(true)
              } else {    
                  let emptyArray = JSON.parse(returnedProfileData.SP_Tarif)
                  emptyArray.push(dataNow)
                  setReturnedProfileData({...returnedProfileData, SP_Tarif: JSON.stringify(emptyArray) })
                  setAddTarifWas(true)
              }
          }
          
        }


        return(<>
        
         <div className='card-body  mb-4 text-end' >
            <input placeholder='Nom du Forfait'   className='text-start form-control mb-1 rounded' onChange={ (e) => setDataNow({...dataNow, Forfait: e.target.value })} />
            <input type='number' placeholder='Prix en D.T'   className='text-start form-control mb-1 rounded' onChange={ (e) => setDataNow({...dataNow, Prix: e.target.value })} />
            <input placeholder='Description'   className='text-start form-control mb-1 rounded' onChange={ (e) => setDataNow({...dataNow, Description: e.target.value })} />
            <br />
            <Button  className='rounded-pill  '   size='small' basic={addTarifWas ? false : true}  color={addTarifWas ? 'blue' : undefined}  onClick={() => AddArticleToList()}>  <Icon name='plus' className='ms-2' /> Ajouter </Button>
            
        </div>
        </>)
    }
    const TarifListeCard = (props) =>{
        return(<>
        {loading ? <SekeltonCard /> : 
          <>
            {returnedProfileData.SP_Tarif == '' || (JSON.parse(returnedProfileData.SP_Tarif).length == 0 && !addTarifWas) ? <ListeVide icon='cash-coin' />
            :
            <>
              <div style={{maxHeight:'300px', overflowX:'auto', overflowX:'hidden'}}  >
              {JSON.parse(returnedProfileData.SP_Tarif).map((data,index) => 
                <div className='  p-2 border-div mb-2' key={index}>
                    <div className='row'>
                        <div className='col-7 align-self-center'><h5 className='mt-0 mb-1'> {index + 1 } - {data.Forfait}</h5> <small className='mb-0'>{data.Description}</small></div> 
                        <div className='col-3 align-self-center'>{data.Prix} D.T</div> 
                        <div className='col-2 align-self-center'><Button icon="trash alternate" className='rounded-circle p-2 text-danger bg-white ' onClick={() => DeleteFromTarifList(index, 'SP_Tarif')}></Button></div> 
                    </div>
                </div>
              )}
              </div>
              <br />
              <div className='text-end d-none'>
                  <Button   className='rounded-pill ' size='tiny' disabled={addTarifWas ? false : true} color={addTarifWas ? 'blue' : undefined}  onClick={() => UpdateFunction('SP_Tarif')}>  <Icon name='check' className='ms-2' /> Modifier </Button>
              </div>
            </>
            } 
          </>}
        </>)
    }

    const AddAssurance = (props) =>{
        const [dataNow, setDataNow] = useState({PK: 1 , Name:'', Qte: ''}) 

        const AddArticleToList = () =>{
          if (dataNow.Forfait == '') { toast.error("أدخل  إسم العرض   !", GConf.TostErrorGonf) } 
          else if (dataNow.Prix == '') { toast.error("أدخل السعر  !", GConf.TostErrorGonf) } 
          else if (dataNow.Description == '') { toast.error("أدخل الوصف  !", GConf.TostErrorGonf) } 
          else {
              if (returnedProfileData.SP_Assurance == '') {
                  let emptyArray = []
                  emptyArray.push(dataNow)
                  setReturnedProfileData({...returnedProfileData, SP_Assurance:JSON.stringify(emptyArray) })
              } else {    
                  let emptyArray = JSON.parse(returnedProfileData.SP_Assurance)
                  emptyArray.push(dataNow)
                  setReturnedProfileData({...returnedProfileData, SP_Assurance: JSON.stringify(emptyArray) })
              }
          }
          
        }


        return(<>
        <div className='card-body  mb-4'>
            <Input icon='pin'   placeholder='Nom du Forfait' value={dataNow.Forfait}  onChange={ (e) => setDataNow({...dataNow, Forfait: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
            <Input icon='dropbox' type='number'  placeholder='Prix'  value={dataNow.Prix}   onChange={ (e) => setDataNow({...dataNow, Prix: e.target.value })} size="small" iconPosition='left'    fluid className='mb-1' />
            <Input icon='comment alternate' placeholder='Description' value={dataNow.Description}   onChange={ (e) => setDataNow({...dataNow, Description: e.target.value })} size="small" iconPosition='left'  fluid className='mb-1' />
            
            <br />
            <Button    fluid className='rounded-pill' size='small' color='blue' onClick={() => AddArticleToList()}>  <Icon name='plus' className='ms-2' /> Ajouter </Button>
            
        </div>
        </>)
    }
    const AssuranceListeCard = (props) =>{
          return(<>
            {returnedProfileData.SP_Assurance == '' ? 
            <ListeVide icon='heart-pulse' /> 
            :
            <>
              <div style={{maxHeight:'300px', overflowX:'auto', overflowX:'hidden'}}  >
                {JSON.parse(returnedProfileData.SP_Assurance).map((data,index) => 
                  <div className='card p-2 border-div mb-2' key={index}>
                      <div className='row'>
                          <div className='col-7 align-self-center'><h5 className='mt-0 mb-1'>{data.Forfait}</h5> <small className='mb-0'>{data.Description}</small></div> 
                          <div className='col-3 align-self-center'>{data.Prix}</div> 
                          <div className='col-2 align-self-center'><Button icon="trash alternate" className='rounded-circle p-2 text-danger bg-white ' onClick={() => DeleteFromTarifList(index, 'SP_Assurance')}></Button></div> 
                      </div>
                  </div>
                )}
              </div>
              <br />
              <Button    fluid className='rounded-pill' size='tiny' color='blue' onClick={() => UpdateFunction('SP_Assurance')}>  <Icon name='plus' className='ms-2' /> Modifier </Button>
            </> 
            } 
        </>)
    }

    const AddDiplome = (props) =>{
        const [dataNow, setDataNow] = useState({PK: 1 , diplome:'', annee: '', faculte: ''}) 

        const AddArticleToList = () =>{
          if (dataNow.diplome == '') { toast.error("أدخل  إسم الشهادة   !", GConf.TostErrorGonf) } 
          else if (dataNow.annee == '') { toast.error("أدخل سنة التخرج  !", GConf.TostErrorGonf) } 
          else if (dataNow.faculte == '') { toast.error("أدخل اسم المؤسسة المانحة  !", GConf.TostErrorGonf) } 
          else {
              if (returnedProfileData.SP_Diplomes == '') {
                  let emptyArray = []
                  emptyArray.push(dataNow)
                  setReturnedProfileData({...returnedProfileData, SP_Diplomes:JSON.stringify(emptyArray) })
                  setAddDiplomeWas(true)
              } else {    
                  let emptyArray = JSON.parse(returnedProfileData.SP_Diplomes)
                  emptyArray.push(dataNow)
                  setReturnedProfileData({...returnedProfileData, SP_Diplomes: JSON.stringify(emptyArray) })
                  setAddDiplomeWas(true)
              }
          }
          
        }


        return(<>
            <div className='card-body  mb-4 text-end'>
                <input placeholder='Diplome'   className='text-start form-control mb-1 rounded' onChange={ (e) => setDataNow({...dataNow, diplome: e.target.value })} />
                <input type='date' placeholder='Anneé' defaultValue={new Date().toISOString().split('T')[0]}  className='text-start form-control mb-1 rounded' onChange={ (e) => setDataNow({...dataNow, annee: e.target.value })} />
                <input placeholder='Etablissment'   className='text-start form-control mb-1 rounded' onChange={ (e) => setDataNow({...dataNow, faculte: e.target.value })} />
                
                <br />
                <Button   className='rounded-pill' size='small' basic={addDiplomeWas ? false : true}  color={addDiplomeWas ? 'blue' : undefined} onClick={() => AddArticleToList()}>  <Icon name='plus' className='ms-2' /> Ajouter </Button>
                
            </div>
        </>)
    }
    const DiplomeListeCard = (props) =>{
        return(<>
        {loading ? <SekeltonCard /> : 
          <>
          {returnedProfileData.SP_Diplomes == '' || (JSON.parse(returnedProfileData.SP_Diplomes).addDiplomeWas == 0 && !addTarifWas) ?  <ListeVide icon='credit-card-2-front' /> 
          :
          <>
            <div style={{maxHeight:'300px', overflowX:'auto', overflowX:'hidden'}}  >
            {JSON.parse(returnedProfileData.SP_Diplomes).map((data,index) => 
              <div className='  p-2 border-div mb-2' key={index}>
                  <div className='row'>
                      <div className='col-10 align-self-center'><h5 className='mt-0 mb-1'>{data.annee} : {data.diplome}</h5> <small className='mb-0'>{data.faculte}</small></div> 
                      <div className='col-2 align-self-center'><Button icon="trash alternate" className='rounded-circle p-2 text-danger bg-white ' onClick={() => DeleteFromTarifList(index, 'SP_Diplomes')}></Button></div> 
                  </div>
              </div>
            )}
            </div>
            <br />
            <div className='text-end '>
                <Button   className='rounded-pill' size='tiny'   disabled ={addDiplomeWas ? false : true}  color={addDiplomeWas ? 'blue' : undefined} onClick={() => UpdateFunction('SP_Diplomes')}>  <Icon name='plus' className='ms-2' /> Modifier </Button>
            </div>
            
          </> 
          } 
        </>}
      </>)
    }

    return (<>
            
          
          <div className='row mb-3'>
              <div className='col-10 align-self-center'><h4 style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}> <span className='bi bi-cash-coin'></span> Liste des Tarif : </h4></div>
              <div className='col-2 align-self-center'><Button   className='rounded-circle' icon onClick={() =>setAddTarifActive(!addTarifActive)}> <Icon name={addTarifActive ? 'list ol' : 'plus'} /> </Button></div>
          </div>
            <TarifListeCard />
          {/* { addTarifActive ?  <AddTarifCard  /> : <TarifListeCard /> } */}
          {/* <br />
          <br />
          <br />
          <div className='row mb-3'>
              <div className='col-10 align-self-center'><h4 style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}> <span className='bi bi-heart-pulse'></span> Departemment d'assurance  : </h4></div>
              <div className='col-2 align-self-center'><Button   className='rounded-circle' icon onClick={() => setAddAssurance(!addAssurance)}> <Icon name={addAssurance ? 'list ol' : 'plus'} /> </Button></div>
          </div>
          { addAssurance ?  <AddAssurance /> : <AssuranceListeCard /> } */}

          <br />
          <br />
          <br />
          {/* <div className='row mb-3'>
              <div className='col-10 align-self-center'><h4 style={{color : APPConf.landing[APPConf.systemTag].colorTheme}}> <span className='bi bi-credit-card-2-front'></span>  Diplomes  : </h4></div>
              <div className='col-2 align-self-center'><Button   className='rounded-circle' icon onClick={() => setAddDiplome(!addDiplome)}> <Icon name={addDiplome ? 'list ol' : 'plus'} /> </Button></div>
          </div>
          { addDiplome ?  <AddDiplome /> :  <DiplomeListeCard /> }
          <br />
          <br /> */}
        
            <BottomSheet expandOnContentDrag open={addTarifActive}  onDismiss={() => setAddTarifActive(!addTarifActive)}  >
                <div className='card-bosy'>
                    <AddTarifCard  />
                </div>
            </BottomSheet>
    </>);
}

export default DocteurSpecific;