import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk';
import TableGrid from '../Assets/tableGrid';
import GoBtn from '../Assets/goBtn';
import TableImage from '../Assets/tableImg';
import { Button , Icon} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

function ControlPage() {
  /*#########################[Const]##################################*/
  let [camionList, setCamionList] = useState([ SKLT.TableSlt ]); 
  const navigate = useNavigate();
  let Offline = JSON.parse(localStorage.getItem(`${GConf.SystemTag}_Offline`));

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/camions`, {
        tag: GConf.SystemTag,
      })
      .then(function (response) {
         let testTable = []
          response.data.map( (getData) => testTable.push([
         _(<TableImage image='camion.jpg' />),
         getData.Cam_Name,
         getData.Matricule,
         getData.Chauffeur,
         getData.Fond,
         getData.Recette,
         _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/${getData.Cam_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
        //  _(<GoBtn link={`cm/info/${getData.Cam_ID}`} />)
        ],))
        setCamionList(testTable)
      }).catch((error) => {
        if(error.request) {
          toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
          let testTable = []
          Offline.camion.map( (getData) => testTable.push([
          _(<TableImage image='camion.jpg' />),
          getData.Cam_Name,
          getData.Matricule,
          getData.Chauffeur,
          getData.Fond,
          getData.Recette,
          _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cm/info/${getData.Cam_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
          //  _(<GoBtn link={`cm/info/${getData.Cam_ID}`} />)
          ],))
          setCamionList(testTable)
        }
      });
    }, [])
    
  /*#########################[Function]##################################*/
  const NavigateFunction = (link) => {  navigate(link) }

    return ( <>
          <Fade>
            <SubNav dataForNav={GConf.SubNavs.camion} />
              <br />
              <TableGrid tableData={camionList} columns={GConf.TableHead.camion} />
          </Fade>
    </> );
}

export default ControlPage;