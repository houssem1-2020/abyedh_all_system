import React , { useEffect, useState } from 'react';
import BackCard from '../Assets/Cards/backCard'
import {Grid, _ } from "gridjs-react";
import { Button, Icon } from 'semantic-ui-react';
import TableGrid from '../../../AssetsM/Cards/tableGrid';
import axios from 'axios';
import GConf from '../../../AssetsM/generalConf';
import OneGConf from './../../../InterFaces/RouterOne/Assets/OneGConf';
import { toast } from 'react-toastify';
import { useNavigate} from 'react-router-dom';
import SKLT from '../../../AssetsM/Cards/usedSlk';

function StockList() {
  /*#########################[Const]##################################*/
  let camData = JSON.parse(localStorage.getItem(`Camion_LocalD`));
  const camId = camData.Cam_ID; 
    let [tableData, setTableData] = useState([SKLT.STableSlt]); 
    let Offline = JSON.parse(localStorage.getItem("Offline"));
    const navigate = useNavigate();

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/stock`, {
        PID: OneGConf.forPID.PID,
      })
      .then(function (response) {
        setTableData(response.data)
      }).catch((error) => {
        if(error.request) {
          toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment du ancien stock  </div></>, GConf.TostInternetGonf)   
        setTableData(Offline.stock)
        }
    });
  }, [])

  /*#########################[Functions]##################################*/
  const NavigateFunction = (link) => {  navigate(link) }

  /*################[UseEffect]###############*/
  const ArticleCard = (props) =>{
    return(<>
        <div className='col-6'>
            <div className='card card-body shadow-sm mb-3 border-div'>
                <div className='row'>
                    <div className='col-1 align-self-center'>
                        <img className='rounded-circle' width="40px" height="40px" src={`https://assets.ansl.tn/Images/Articles/${props.data.Photo_Path}`} alt="user-img" />
                    </div>
                    <div className='col-9 align-self-center'>{props.data.Name}</div>
                    <div className='col-2 align-self-center'></div>
                </div> 
                
            </div>
        </div>
    </>)
}

  return ( <>
        <BackCard data={OneGConf.backCard.skfamilleList}/>
       
        <br />
        <div className='container'>
            {/* <TableGrid tableData={tableData} columns={['*','Code','Name','Genre','Prix','Qte','Voir']} /> */}
            <div className='row'>
                {tableData.map( (data,index) => <ArticleCard key={index} data={data} />)}
            </div>
        </div>
  </> );
}

export default StockList;