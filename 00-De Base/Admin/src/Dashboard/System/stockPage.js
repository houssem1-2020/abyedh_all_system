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
import { Button , Icon, Modal, Tab, Transition} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import ASIL from './systemList'
function StockPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [loadingState, setLoadingState] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState('ptvGros')
    const panes = [
        {
          menuItem: { key: '00',  content: <span style={{color:'#795549'}}><b><span className='bi bi-cart4'></span> 00 </b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(0,12) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '01',  content: <span style={{color:'#009788'}}><b><span className='bi bi-heart-pulse-fill'></span> 01</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre(13,16): []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '02',  content: <span style={{color:'#00bcd5'}}><b><span className='bi bi-mortarboard-fill'></span> 02</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(16,21) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '05',  content: <span style={{color:'#8bc25b'}}><b><span className='bi bi-cup-straw'></span> 03</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(22,24) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '03',  content: <span style={{color:'#f44236'}}><b><span className='bi bi-truck'></span> 04 </b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(25,25) : []} columns={GConf.TableHead.stock} />,
        },

        {
          menuItem: { key: '04',  content: <span style={{color:'#fb1e6b'}}><b><span className='bi bi-balloon-heart-fill'></span> 05</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre(27,30) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '11',  content: <span style={{color:'#795549'}}><b><span className='bi bi-tools'></span> 06 </b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(31,36) : []} columns={GConf.TableHead.stock} />,
        },

        {
          menuItem: { key: '07',  content: <span style={{color:'#607d8b'}}><b><span className='bi bi-bricks'></span> 07</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre(37,38) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '08',  content: <span style={{color:'#ff9700'}}><b><span className='bi bi-car-front-fill'></span> 08</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(39,41) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '09',  content: <span style={{color:'#565d61'}}><b><span className='bi bi-gem'></span> 09</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(42,45) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '06',  content: <span style={{color:'#47cfda'}}><b><span className='bi bi-bicycle'></span> 10 </b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre(46,50) : []} columns={GConf.TableHead.stock} />,
        },
        {
          menuItem: { key: '10',  content: <span style={{color:'#673bb7'}}><b><span className='bi bi-briefcase-fill'></span> 11 </b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre(51,53) : []} columns={GConf.TableHead.stock} />,
        },
        // {
        //   menuItem: { key: 'refuse',  content: <span style={{color:'#009788'}}><b><span className='bi bi-x-square-fill'></span> 12</b></span>, className:'rounded-pill' },
        //   render: () => <TableGrid tableData={FetchByGenre('R')}columns={GConf.TableHead.stock} />,
        // },
      ]

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
                      _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sy/info/${key}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
                    ],)
             });    
            setArticleList(articleListContainer) 
            setLoadingState(true)
    }, [])



    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const FetchByGenre = (startIndex,endIndex) =>{
        //let found = articleList.filter(element => element.Index === genre)
        const filteredData = Object.keys(ASIL).slice(startIndex , endIndex  + 1).reduce((result, key) => {
          result[key] = { ...ASIL[key], originalKey: key };
          return result;
        }, {});
        let commandeContainer = []
        Object.keys(filteredData).forEach(function(key, index) {
                commandeContainer.push([
                    _(<img src={`https://assets.abyedh.tn/img/system/ads/${filteredData[key].adsImageUrl}`} className='img-responsive' width='40px' height='40px'  />),
                    _(<div className='font-droid text-center' style={{color: filteredData[key].colorTheme,}}>{filteredData[key].systemTitle}</div>),
                    key,
                    filteredData[key].colorTheme,
                    _( <a  className='data-link-modal' target='c_blank'  href={filteredData[key].systemUrl} ><b> <span className='bi bi-link-45deg bi-sm'></span> </b></a>),
                    _( <a  className='data-link-modal'  onClick={() => openEditModal(key,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
                    _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sy/info/${filteredData[key].originalKey}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>),
                  ],)
           });    
     return(commandeContainer)
 }
    const openEditModal = (event,selected) =>{
      setSelectedArticle(event)
      setModalS(true)
    }
    
    
    return (<>
              {/* <SubNav dataForNav={GConf.SubNavs.Stock} /> */}
              <br />
              {/* Lazem tet7at linna beach ma tehlekch el dropdowm menu  */}
              <Tab menu={{ secondary: true , style: {overflowX : 'auto', overflowY : 'hidden', paddingBottom:'5px' }}} panes={panes} />
              <Fade> 
                {/* <TableGrid tableData={articleList} columns={GConf.TableHead.stock} /> */}
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