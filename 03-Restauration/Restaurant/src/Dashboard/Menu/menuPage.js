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
import useGetArticles from '../../AssetsM/Hooks/Used/fetchArticles';
import { NavLink } from 'react-router-dom';

function MenuPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    let test = useGetArticles()
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/menu`, {
          PID : GConf.PID,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
              let articleListContainer = []
              response.data.map( (getData) => articleListContainer.push([
                _(<TableImage image={getData.Photo_Path} forStock onClick={() => openEditModal(getData,true)}/>),
                getData.P_Code,
                getData.Name,
                getData.Genre,
                getData.Cout.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/mu/info/${getData.P_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
              ],))
              setArticleList(articleListContainer) 
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
            let articleListContainer = []
            Offline.stock.map( (getData) => articleListContainer.push([
                _(<TableImage image={getData.Photo_Path} forStock/>),
                getData.P_Code,
                _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> {getData.Name} </b></a>),
                getData.Genre,
                getData.Cout.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/mu/info/${getData.P_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
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
    const MainSubNavCard = (props) =>{
       return(<>
          <NavLink exact='true' to={`/S/${props.link}`} className='card card-body mb-1 rounded-pill shadow-sm d-inline-block ' >
            <h4 style={{color : GConf.themeColor}}> <spn className={`bi bi-${props.icon} me-1 `}></spn>{props.text}</h4>
          </NavLink> 
       </>) 
    }
   
    return (<>
              <div className='row'>
                  <div className='col-12 col-lg-8'><SubNav dataForNav={GConf.SubNavs.Menu} /></div>
                  <div className='col-12 col-lg-4 text-end align-self-center'>
                     <MainSubNavCard text='Stock' link='sk' icon='box-seam-fill' /> 
                     {/* <MainSubNavCard text='Fournisseur' link='fs' icon='truck' />  */}
                  </div>
              </div>
              
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
                                                 <td>{selectedArticle.P_Code}</td> 
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
                                  <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/mu/info/${selectedArticle.P_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                      </Modal.Actions>
              </Modal>  
              </Transition>
        </>);
}

export default MenuPage;