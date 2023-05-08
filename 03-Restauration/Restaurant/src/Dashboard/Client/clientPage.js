import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../../AssetsM/Cards/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk'
import TableGrid from '../../AssetsM/Cards/tableGrid';
import TableImage from '../../AssetsM/Cards/tableImg';
import GoBtn from '../../AssetsM/Cards/goBtn';
import { Button , Icon, Label} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

function ClientPage() {
    /*################[Variable]###############*/
    const  [clientList, setClientList] = useState([SKLT.TableSlt]); 
    const navigate = useNavigate();
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
    const colors = [
        'red',
        'orange',
        'yellow',
        'olive',
        'green',
        'teal',
        'blue',
        'violet',
        'purple',
        'pink',
        'brown',
        'grey',
        'black',
    ]

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/client`,{
            PID: GConf.PID
        })
        .then(function (response) {
            console.log(response.data)
            let testTable = []
            response.data.map( (getData) => testTable.push([
            _(<AvatarCard lettre={capitalizeFirstLetter(getData.CL_Name)} />),
            getData.CL_Name,
            getData.CIN,
            getData.Phone,
            _(<>{getData.Gouv} , {getData.Deleg} </>),
            getData.Adress,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cl/info/${getData.CL_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setClientList(testTable)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
              let testTable = []
            Offline.client.map( (getData) => testTable.push([
            _(<AvatarCard lettre={capitalizeFirstLetter(getData.CL_Name)} />),
            getData.CL_Name,
            getData.CIN,
            getData.Phone,
            _(<>{getData.Gouv} , {getData.Deleg} </>),
            getData.Adress,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cl/info/${getData.CL_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setClientList(testTable)
            }
          });
    }, [])
    
    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    const  capitalizeFirstLetter = (string) =>{
        return (string.charAt(0).toUpperCase() + string.slice(1)).charAt(0);
    }
    /*################[Card]###############*/
     const AvatarCard = (props) =>{
            return(<>
                <Label size='massive' circular color={colors[Math.floor(Math.random() * 10)]} key={1}>
                    <h3>{props.lettre}</h3>
                </Label>
                
            </>)
     }
    return (<>
        <Fade>
            <SubNav dataForNav={GConf.SubNavs.client}/>
            <br />
            <TableGrid tableData={clientList} columns={GConf.TableHead.client} />
        </Fade>
    </>);
}

export default ClientPage;