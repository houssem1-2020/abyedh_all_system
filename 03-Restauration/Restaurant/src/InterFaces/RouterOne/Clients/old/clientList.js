import React, {useEffect,useState}  from 'react';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import BackCard from '../Assets/Cards/backCard';
import GConf from '../../../AssetsM/generalConf';
import { _ } from "gridjs-react";
import axios from 'axios';
import TableImage from '../../../AssetsM/Cards/tableImg';
import GoBtn from '../../../AssetsM/Cards/goBtn';
import SKLT from '../../../AssetsM/Cards/usedSlk';

function ClientList() {
    /*################[Variable]###############*/
    const  [clientList, setClientList] = useState([SKLT.STableSlt]); 

    /*################[UseEffect]###############*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/client`,{
            PID: GConf.forPID.PID,
        })
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
        <BackCard data={GConf.backCard.clList}/>
        <br />
        <div className='container'>
             <TableGrid tableData={clientList} columns={['*','Client','Mat.','Adresse','Voir']} />
        </div>
        </> );
}

export default ClientList