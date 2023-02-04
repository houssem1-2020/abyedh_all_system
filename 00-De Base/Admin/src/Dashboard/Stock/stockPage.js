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
import { Button , Icon} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';

function StockPage() {

    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let [articleList, setArticleList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.SystemTag}_Offline`));

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
      axios.post(`${GConf.ApiLink}/stock`, {
          tag: GConf.SystemTag,
        })
        .then(function (response) {
          console.log(response)
          if (!response.data) {
                toast.error('Probleme de Connextion', GConf.TostSuucessGonf)
          } else {
              let articleListContainer = []
              response.data.map( (getData) => articleListContainer.push([
                _(<TableImage image={getData.Photo_Path} forStock/>),
                getData.A_Code,
                getData.Name,
                getData.Genre,
                getData.Quantite,
                getData.Prix_achat.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sk/info/${getData.A_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
              ],))
              setArticleList(articleListContainer) 
          }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des article dans votre ordinateur </div></>, GConf.TostInternetGonf) 
            let articleListContainer = []
            Offline.stock.map( (getData) => articleListContainer.push([
                _(<TableImage image={getData.Photo_Path} forStock/>),
                getData.A_Code,
                getData.Name,
                getData.Genre,
                getData.Quantite,
                getData.Prix_achat.toFixed(3),
                getData.Prix_vente.toFixed(3),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/sk/info/${getData.A_Code}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
              ],))
              setArticleList(articleListContainer)
            }
        });
    }, [])

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    return (<>
              <SubNav dataForNav={GConf.SubNavs.Stock} />
              <br />
              {/* Lazem tet7at linna beach ma tehlekch el dropdowm menu  */}
              <Fade> 
                <TableGrid tableData={articleList} columns={GConf.TableHead.stock} />
              </Fade>    
        </>);
}

export default StockPage;