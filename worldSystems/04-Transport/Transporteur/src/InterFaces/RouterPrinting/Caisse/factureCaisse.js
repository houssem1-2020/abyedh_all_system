import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import GConf from '../../../AssetsM/generalConf';
import { ToWords } from 'to-words';
import OneGConf from '../../RouterOne/Assets/OneGConf';
import QRCode from "react-qr-code";

function StockListe() {
    let [articleList, setArticleList] = useState([]); 
    let {de, vers} = useParams()

      useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            if (!response.data) {
                   
            } else {
                
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
                
                index+1 ,
                getData.OP_ID,
                getData.Name,
                getData.Description,
                getData.Qte,
                JSON.parse(getData.OP_Vers).Gouv,
                JSON.parse(getData.OP_Vers).Deleg,
                new Date(getData.OP_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                
              ],))
               
              setArticleList(articleListContainer) 
                 
                 
            }
          }) 
      }, [])


    return ( <>
           <div className="container mb-4 font-for-print-1">
                <h2 className='text-center mb-1'>Resumer de stock </h2> 
                 <h3 className='text-center mt-1'>de : {de} à {vers} </h3>  
                 {articleList.map((data,index) => <div key={index} >{data[2]}</div>)}
           </div>
    </> );
}

export default StockListe;