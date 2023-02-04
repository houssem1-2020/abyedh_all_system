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
import { Button , Icon} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';


function FacturePage() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    const [facturesList, setFactureList] = useState([SKLT.TableSlt]); 
    let Offline = JSON.parse(localStorage.getItem(`${GConf.SystemTag}_Offline`));
    

    /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/facture`, {
            tag: GConf.SystemTag,
        })
        .then(function (response) {
            let factureListContainer = []
            response.data.map( (getData) => factureListContainer.push([
            _(<TableImage image='facture.jpg' />),
            getData.F_ID,
            getData.C_Name,
            //new Date(getData.Cre_Date).toLocaleDateString('fr-FR'),
            new Date(getData.Cre_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
            //new Date(getData.Cre_Date).toISOString().split('T')[0],
            //getData.Cre_Date,
            getData.Tota,
            _(<SDF state={getData.SDF} />),
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ft/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setFactureList(factureListContainer)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
              let factureListContainer = []
                 Offline.facture.map( (getData) => factureListContainer.push([
                _(<TableImage image='facture.jpg' />),
                getData.F_ID,
                getData.C_Name,
                new Date(getData.Cre_Date).toLocaleDateString('fr-FR'),
                getData.Tota,
                _(<SDF state={getData.SDF} />),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/ft/info/${getData.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
                ],))
                setFactureList(factureListContainer)
            }
          });
    }, [])
    
    

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }

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
            <TableGrid tableData={facturesList} columns={GConf.TableHead.facture} />
        </Fade>
    </>);
}

export default FacturePage;