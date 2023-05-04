import React, {useEffect,useState}  from 'react';
import GConf from '../../AssetsM/generalConf';
import SubNav from '../Assets/subNav';
import { _ } from "gridjs-react";
import axios from 'axios';
import {Fade } from 'react-reveal';
import SKLT from '../../AssetsM/usedSlk'
import TableGrid from '../Assets/tableGrid';
import TableImage from '../Assets/tableImg';
import GoBtn from '../Assets/goBtn';
import { Button , Icon, Label} from 'semantic-ui-react';
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

function ClientRequest() {
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
           axios.post(`${GConf.ApiLink}/clients/request`,{
               PID: GConf.PID
           })
           .then(function (response) {
               let testTable = []
               response.data.map( (getData) => testTable.push([
                //    _(<img src={`https://cdn.abyedh.tn/Assets/images/p_pic/${getData.PictureId}.gif`} className='img-responsive' width='40px' height='40px'  />),
                _(<AvatarCard lettre={capitalizeFirstLetter(JSON.parse(getData.UserData).name)} />),
                _(JSON.parse(getData.UserData).name),
               getData.Genre,
               _(<a href={`tel:${JSON.parse(getData.UserData).phone}`} target='c_blank' >{JSON.parse(getData.UserData).phone}</a>),
               _(JSON.parse(getData.ProfileData).name),
               _(<a href={`tel:${JSON.parse(getData.ProfileData).phone}`} target='c_blank' >{JSON.parse(getData.ProfileData).phone}</a>),
               _(<>{JSON.parse(getData.ProfileData).gouv} , {JSON.parse(getData.ProfileData).deleg} </>),
               _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/cl/info/${getData.CL_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
               ],))
               setClientList(testTable)
           }).catch((error) => {
               if(error.request) {
                 toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
                 let testTable = []
               Offline.client.map( (getData) => testTable.push([
               _(<AvatarCard lettre={capitalizeFirstLetter(getData.Name)} />),
               getData.Name,
               getData.Code_Fiscale,
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
               <TableGrid tableData={clientList} columns={GConf.TableHead.client} />
           </Fade>
       </>);
   }

export default ClientRequest;