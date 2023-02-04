import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import TableImage from '../Assets/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Transition} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import ASIL from './systemList'
function StockPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState('ptvGros')

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
            let articleListContainer = []
            Object.keys(ASIL).forEach(function(key, index) {
                  articleListContainer.push([
                      _(<img src={`https://assets.abyedh.tn/img/system/ads/${ASIL[key].adsImageUrl}`} className='img-responsive' width='40px' height='40px'  />),
                      _(<div className='font-droid text-center' style={{color: ASIL[key].colorTheme,}}>{ASIL[key].systemTitle}</div>),
                      key,
                      ASIL[key].colorTheme,
                      _( <a  className='data-link-modal' target='c_blank'  href={ASIL[key].systemUrl} ><b> <span className='bi bi-link-45deg bi-sm'></span> </b></a>),
                      _( <a  className='data-link-modal'  onClick={() => openEditModal(key,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                      _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sk/info/${key}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
                    ],)
             });    
            setArticleList(articleListContainer) 
    }, [])



    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const openEditModal = (event,selected) =>{
      setSelectedArticle(event)
      setModalS(true)
    }
    
    
    return (<>
              <SubNav dataForNav={GConf.SubNavs.Stock} />
              <br />
              {/* Lazem tet7at linna beach ma tehlekch el dropdowm menu  */}
              <Fade> 
                <TableGrid tableData={articleList} columns={GConf.TableHead.stock} />
              </Fade> 
              <Transition animation='scale' duration={500}> 
              <Modal
                      size='small'
                      open={modalS}
                      closeIcon
                      onClose={() => setModalS(false)}
                      onOpen={() => setModalS(true)}
                  >
                      <Modal.Header><h4>{selectedArticle}</h4></Modal.Header>
                      <Modal.Content>
                              <div className='text-end' dir='rtl'>
                                 <h5>{ASIL[selectedArticle].adsText}</h5>
                              </div>  
                      </Modal.Content>
                      <Modal.Actions>
                                  <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                                  <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/sk/info/${selectedArticle.A_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                      </Modal.Actions>
              </Modal>  
              </Transition>
        </>);
}

export default StockPage;