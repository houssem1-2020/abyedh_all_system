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
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/rapport`, {
          PID : GConf.PID,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
              let articleListContainer = []
              response.data.map( (getData) => articleListContainer.push([
                _(<TableImage image={'rapport.jpg'}   onClick={() => openEditModal(getData,true)}/>),
                getData.RA_ID,
                getData.RA_Titre,
                getData.RA_Genre,
                getData.RA_Sujet,
                new Date(getData.RA_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                getData.RA_Time,
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rp/info/${getData.RA_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
              ],))
              setArticleList(articleListContainer) 
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
            let articleListContainer = []
            Offline.stock.map( (getData) => articleListContainer.push([
                _(<TableImage image={getData.Photo_Path} forStock/>),
                getData.RA_ID,
                _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> {getData.Name} </b></a>),
                getData.Genre,
                getData.Cout.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rp/info/${getData.RA_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
              ],))
              setArticleList(articleListContainer)
            }
        });
    }, [])



    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const openEditModal = (event,selected) =>{
      setSelectedArticle(event)
      setModalS(true)
    }
    
   
    return (<>
              {/* <div className='row'>
                  <div className='col-12 col-lg-8'></div>
                  <div className='col-12 col-lg-4 text-end align-self-center'>
                     <MainSubNavCard text='Stock' link='sk' icon='box-seam-fill' /> 
                  </div>
              </div> */}
              <SubNav dataForNav={GConf.SubNavs.Menu} />
              <br />
              <Fade> 
                <TableGrid tableData={articleList} columns={GConf.TableHead.menu} />
              </Fade> 
              <Transition animation='scale' duration={500}> 
              <Modal
                      size='small'
                      open={modalS}
                      closeIcon
                      onClose={() => setModalS(false)}
                      onOpen={() => setModalS(true)}
                  >
                      <Modal.Header><h4>{selectedArticle.Name}</h4></Modal.Header>
                      <Modal.Content>
                              <div className='row'>
                                  <div className='col-4'> <img src={`https://cdn.abyedh.tn/images/system/Resto/${selectedArticle.Photo_Path}`} className='img-responsive' width='80%' height='200px' /></div>
                                  <div className='col-8 align-self-center'>
                                        <table className='table table-striped'>
                                        <tbody>
                                              <tr>
                                                 <td>Code : </td> 
                                                 <td>{selectedArticle.RA_ID}</td> 
                                              </tr>
                                              <tr>
                                                 <td>Cout : </td> 
                                                 <td>{selectedArticle.Cout ? (selectedArticle.Cout).toFixed(3) : ''}</td> 
                                              </tr>
                                              <tr>
                                                 <td>Vente : </td> 
                                                 <td>{selectedArticle.Prix_vente ? (selectedArticle.Prix_vente).toFixed(3) : ''}</td> 
                                              </tr>
                                              <tr>
                                                 <td>Repture  :</td> 
                                                 <td>{selectedArticle.Repture}</td> 
                                              </tr>
                                              <tr>
                                                 <td>Description</td> 
                                                 <td>{selectedArticle.Description}</td> 
                                              </tr>
                                          </tbody>
                                        </table>
                                  </div>
                              </div>  
                      </Modal.Content>
                      <Modal.Actions>
                                  <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                                  <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/rp/info/${selectedArticle.RA_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                      </Modal.Actions>
              </Modal>  
              </Transition>
        </>);
}

export default MenuPage;