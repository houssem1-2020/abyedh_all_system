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
                combinedArticles.push(...articles.map(article => ({ ...article, OP_Date: opDate , OP_ID: opID})));
                //combinedArticles.push(...articles);
              });

              let articleListContainer = []
              combinedArticles.map( (getData, index) => articleListContainer.push([
                index+1 ,
                getData.OP_ID,
                getData.Name,
                getData.Description,
                getData.Qte,
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
    return (<>
              <div className='card card-body mb-3 mt-2 shadow-sm border-div'>
                    <h5> <span className='bi bi-circle-fill text-danger'></span> Enregistrer Positions</h5> 
                     
                    <div className='row'>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-success text-white mb-2' onClick={() => alert(true)}>  <Icon name='calendar' /> Imprimer </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-danger text-white mb-2' onClick={() => alert(false)}>  <Icon name='calendar plus outline' /> Imprimer  Semaine </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-secondary text-white mb-2' onClick={() => alert('r')}>  <Icon name='calendar alternate outline' /> Imprimer d'un mois  </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-warning text-white mb-2' onClick={() => alert('recordedPositions')}>  <Icon name='calendar alternate' /> Imprimer Hier  </Button></div>
                        <div className='col-12 col-lg'><Button fluid  className='rounded-pill bg-info text-white' onClick={() => alert( 'recordedPositions')}>  <Icon name='calendar outline' /> Imprimer Demain  </Button></div>
                     </div>
              </div> 
               
              <Fade> 
                <TableGrid tableData={articleList} columns={['No','ID','Nom','Poid','Qte','Date','Voir']} />
              </Fade> 
        </>);
}

export default MenuPage;