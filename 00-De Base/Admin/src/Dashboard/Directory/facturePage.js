import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import TableImage from '../Assets/tableImg';
import GoBtn from '../Assets/goBtn';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Tab} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';


function FacturePage() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();

    const [annuaireListe, setAnnuaireListe] = useState([]); 
    const [loadingState, setLoadingState] = useState(false)

    const [facturesList, setFactureList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const [modalS, setModalS] = useState(false)
    const [selectedArticle, setSelectedArticle] = useState([])
    const panes = [
        {
          menuItem: { key: '01',  content: <span style={{color:'#009788'}}><b><span className='bi bi-heart-pulse-fill'></span> 01</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre('01'): []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '02',  content: <span style={{color:'#00bcd5'}}><b><span className='bi bi-mortarboard-fill'></span> 02</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('02') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '03',  content: <span style={{color:'#f44236'}}><b><span className='bi bi-truck'></span> 03</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('03') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '04',  content: <span style={{color:'#fb1e6b'}}><b><span className='bi bi-balloon-heart-fill'></span> 04</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre('04') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '05',  content: <span style={{color:'#8bc25b'}}><b><span className='bi bi-cup-straw'></span> 05</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('05') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '06',  content: <span style={{color:'#47cfda'}}><b><span className='bi bi-bicycle'></span> 06</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('06') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '07',  content: <span style={{color:'#607d8b'}}><b><span className='bi bi-airplane-engines-fill'></span> 07</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre('07') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '08',  content: <span style={{color:'#ff9700'}}><b><span className='bi bi-cash-coin'></span> 08</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('08') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '09',  content: <span style={{color:'#565d61'}}><b><span className='bi bi-bricks'></span> 09</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('09') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '10',  content: <span style={{color:'#673bb7'}}><b><span className='bi bi-briefcase-fill'></span> 10</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={loadingState? FetchByGenre('10') : []} columns={GConf.TableHead.facture} />,
        },
        {
          menuItem: { key: '11',  content: <span style={{color:'#795549'}}><b><span className='bi bi-tree-fill'></span> 11</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={loadingState? FetchByGenre('11') : []} columns={GConf.TableHead.facture} />,
        },
        {
            menuItem: { key: '12',  content: <span style={{color:'#0275c5'}}><b><span className='bi bi-arrows-fullscreen'></span> 12</b></span> , className:'rounded-pill' },
            render: () => <TableGrid tableData={loadingState? FetchByGenre('00') : []} columns={GConf.TableHead.facture} />,
          },
      ]
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/annuaire`, {
            PID : GConf.PID,
        })
        .then(function (response) {
            setAnnuaireListe(response.data)
            setLoadingState(true)
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<img src={`https://cdn.abyedh.tn/images/required/no-result.gif`} className='img-responsive' width='40px' height='40px'  />),
            (getData.TABLE_NAME).split( '_' )[0],
            getData.TABLE_NAME,
            new Date(getData.CREATE_TIME).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            getData.TABLE_ROWS,
            _(<SDF state={getData.SDF} />),
            _( <a  className='data-link-modal'  onClick={() => openEditModal(getData,true)} ><b> <span className='bi bi-arrows-fullscreen'></span> </b></a>),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ft/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
              let factureListContainer = []
              setFactureList(factureListContainer)
            }
          });
    }, [])
    
    

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const FetchByGenre = (genre) =>{
        let found = annuaireListe.filter(element => (element.TABLE_NAME).split( '_' )[0] === genre)
        let commandeContainer = []
           found.map( (commandeDate) => commandeContainer.push([          
            (commandeDate.TABLE_NAME).split( '_' )[0],
            commandeDate.TABLE_NAME,
            new Date(commandeDate.CREATE_TIME).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            commandeDate.TABLE_ROWS,
            commandeDate.DATA_LENGTH,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/an/info/${commandeDate.TABLE_NAME}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
         ],))
     return(commandeContainer)
 }

    const openEditModal = (event,selected) =>{
        setSelectedArticle(event)
        setModalS(true)
    }

    /*#########################[Card]##################################*/
    const SDF = (props)=>{
      return(<>
         <div className='text-center'><span className={`bi bi-${props.state == "true" ? 'check-circle-fill text-success': 'x-circle-fill text-danger'}`}></span> </div>
      </>)
    }
    
    return (<>
        <Fade>
            <SubNav dataForNav={GConf.SubNavs.facture}/>
            <br />
            {/* <TableGrid tableData={facturesList} columns={GConf.TableHead.facture} /> */}
            <Tab menu={{ secondary: true , style: {overflowX : 'auto', overflowY : 'hidden', paddingBottom:'5px' }}} panes={panes} />
        </Fade>
        <Modal
                size='small'
                open={modalS}
                closeIcon
                onClose={() => setModalS(false)}
                onOpen={() => setModalS(true)}
            >
                <Modal.Header><h4>{selectedArticle.Name}</h4></Modal.Header>
                <Modal.Content scrolling>

                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                <th scope="col">No</th>
                                <th scope="col">Designiation</th>
                                <th scope="col">Qté</th>
                                <th scope="col">PUHT</th>
                                <th scope="col">PUTTC</th>
                                <th scope="col">Prix Net</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                selectedArticle.Articles ? 
                                <>
                                {
                                    JSON.parse(selectedArticle.Articles).map( (data,index) => 
                                        <tr key={index +1 }>
                                            <th scope="row">{index +1 }</th>
                                            <td>{data.Name}</td>
                                            <td>{data.Qte}</td>
                                            <td>{GConf.DefaultTva} %</td>
                                            <td>{data.Prix ? data.Prix.toFixed(3) : ''}</td>
                                            <td>{data.PU}</td>
                                        </tr>
                                    )
                                }
                                </>
                                :
                                <>
                                </>
                            }
                            </tbody>
                        </table> 
                </Modal.Content>
                <Modal.Actions>
                            <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                            <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/ft/info/${selectedArticle.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>
                </Modal.Actions>
        </Modal>
    </>);
}

export default FacturePage;