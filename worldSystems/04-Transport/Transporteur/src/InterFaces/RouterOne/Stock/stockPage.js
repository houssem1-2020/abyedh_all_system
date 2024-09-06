import React, {useEffect,useState}  from 'react';
import GConf from '../../../AssetsM/generalConf';
import SubNav from '../../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import TableImage from '../../../AssetsM/Cards/tableImg';
import { toast } from 'react-toastify';
import { Button , Icon, Modal, Transition} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import FrameForPrint from '../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import OneGConf from '../Assets/OneGConf';
import BackCard from '../Assets/Cards/backCard';

function MenuPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
    let [deVers, setDeVers] = useState({de:'', vers:''}); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
 
    
    /*#########################[UseEffect]##################################*/
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/stock`, {
          PID : GConf.PID,
        })
        .then(function (response) {
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
              console.log(response.data)
              const combinedArticles = [];

              // Loop through the results and parse the JSON strings
              response.data.forEach(result => {
                const articles = JSON.parse(result.OP_Articles);
                const opDate = result.OP_Date;
                const opID = result.OP_ID;
                const OP_De = result.OP_De;
                const OP_Vers = result.OP_Vers;
                combinedArticles.push(...articles.map(article => ({ ...article, OP_Date: opDate , OP_ID: opID, OP_De: OP_De, OP_Vers: OP_Vers})));
                //combinedArticles.push(...articles);
              });

              let articleListContainer = []
              combinedArticles.map( (getData, index) => articleListContainer.push([
                _(<TableImage image='stock.JPG' />),
                index+1 ,
                getData.OP_ID,
                getData.Name,
                getData.Description,
                getData.Qte,
                _(<>{JSON.parse(getData.OP_Vers).Gouv}  </>),
                _(<>{JSON.parse(getData.OP_Vers).Deleg} </>),
                new Date(getData.OP_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/op/info/${getData.OP_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
              ],))
              console.log(combinedArticles) 
              setArticleList(articleListContainer) 
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
            let articleListContainer = []
            setArticleList(articleListContainer)
            }
        });
    }, [])

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }  
    const PrintFunction = (frameId) =>{ usePrintFunction(frameId)}
  
    const FirePrintingFunc = (de,vers) => {
      setDeVers({de:de, vers:vers})
      PrintFunction('mainFrame')
    }
    return (<>

        <div className={`${OneGConf.themeMode == 'dark' ? 'bg-dark-theme-2' : '' }`} style={{height: '100vh', overflow: 'scroll'}}>
            <BackCard data={OneGConf.backCard.rt}/>
            <br />
            <div className='container'>
                <div className='card card-body mb-3 mt-2 shadow-sm border-div'>
                        <h5> <span className='bi bi-circle-fill text-danger'></span> Enregistrer Positions</h5> 
                        
                        <div className='row'>
                            <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-success text-white mb-2' onClick={(e) => FirePrintingFunc('04-05-2024','04-09-2024')}>  <Icon name='calendar' /> Imprimer </Button></div>
                            <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-danger text-white mb-2' onClick={(e) => FirePrintingFunc('04-05-2024','04-09-2024')}>  <Icon name='calendar plus outline' /> Imprimer  Semaine </Button></div>
                            <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-secondary text-white mb-2' onClick={(e) => FirePrintingFunc('04-05-2024','04-09-2024')}>  <Icon name='calendar alternate outline' /> Imprimer d'un mois  </Button></div>
                            <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-warning text-white mb-2' onClick={(e) => FirePrintingFunc('04-05-2024','04-09-2024')}>  <Icon name='calendar alternate' /> Imprimer Hier  </Button></div>
                            <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-info text-white' onClick={(e) => FirePrintingFunc('04-05-2024','04-09-2024')}>  <Icon name='calendar outline' /> Imprimer Demain  </Button></div>
                        </div>
                </div> 
                    
                <Fade> 
                    <TableGrid tableData={articleList} columns={['*','No','ID','Nom','Poid','Qte','Vers','à','Date','Voir']} />
                </Fade>
            </div>
        </div>

           
          <FrameForPrint frameId='mainFrame'  src={`/Pr/stock/liste/${deVers.de}/${deVers.vers}`} />
    </>);
}

export default MenuPage;