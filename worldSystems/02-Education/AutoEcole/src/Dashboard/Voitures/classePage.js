import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import TableImage from '../../AssetsM/Cards/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Transition} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function MenuPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [classesListe, setClassesListe] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/voitures`, {
          PID : GConf.PID,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
              let classesListeContainer = []
              response.data.map( (getData) => classesListeContainer.push([
                _(<TableImage image={'voitures.png'} forStock onClick={() => openEditModal(getData,true)}/>),
                getData.VO_ID,
                getData.VO_Name,
                getData.VO_Matricule,
                getData.VO_Genre,
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/vo/info/${getData.VO_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
              ],))
              setClassesListe(classesListeContainer) 
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
             
            }
        });
    }, [])



    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const openEditModal = (event,selected) =>{
      setSelectedArticle(event)
      setModalS(true)
    }
    
    const MainSubNavCard = (props) =>{
      return(<>
        <NavLink exact='true' target='c_blank' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
          <h4 style={{color : GConf.themeColor}}> <spn className={`bi bi-${props.icon} me-1 `}></spn>{props.text}</h4>
        </NavLink>
      </>) 
  }

    return (<>
              <div className='row'>
                  <div className='col-12 col-lg-8'><SubNav dataForNav={GConf.SubNavs.Menu} /></div>
                  <div className='col-12 col-lg-4 text-end align-self-center'>
                      <MainSubNavCard text='Interface Conduit' link='../M' icon='window-dock' />  
                  </div>
              </div>
              
              <br />
              <Fade> 
                <TableGrid tableData={classesListe} columns={GConf.TableHead.classes} />
              </Fade> 
 
        </>);
}

export default MenuPage;