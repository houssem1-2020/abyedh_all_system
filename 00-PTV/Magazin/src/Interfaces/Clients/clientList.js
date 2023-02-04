import React, {useEffect,useState}  from 'react';
import TableGrid from '../../Dashboard/Assets/tableGrid';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import GConf from '../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import TableImage from '../../Dashboard/Assets/tableImg';
import GoBtn from '../../Dashboard/Assets/goBtn';
import SKLT from '../../AssetsM/usedSlk';

function ClientList() {
    /*################[Variable]###############*/
    const  [clientList, setClientList] = useState([SKLT.STableSlt]); 

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.get(`${GConf.ApiLink}/client`)
        .then(function (response) {
            let testTable = []
            response.data.map( (getData) => testTable.push([
            _(<TableImage image='fourniss.png' />),
            getData.Name,
            getData.Code_Fiscale,
            getData.Phone,
            getData.Gouv,
            getData.Adress,
            _(<GoBtn link={`cl/info/${getData.C_ID}`} />)
            ],))
            setClientList(testTable)
        })
    }, [])
    return ( <>
        <BackCard data={InputLinks.backCard.clList}/>
        <br />
        <div className='container-fluid'>
             <TableGrid tableData={clientList} columns={['*','Client','Mat.','Adresse','Voir']} />
        </div>
        </> );
}

export default ClientList