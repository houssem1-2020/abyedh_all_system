import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GConf from '../../../../AssetsM/generalConf';
import { ToWords } from 'to-words';

function ExamainTemp() {
    let {de, vers} = useParams()
    let [articleL, setArticleL] = useState([])
    let [totale, setTotale] = useState(0)
    let [factureData, setFactData] = useState([])
    

    useEffect(() => {
        axios.post(`${GConf.ApiLink}/eleves`, {
            PID: GConf.PID,
            fid: de
          })
          .then(function (response) {
                 
          })


    }, [])

 


 
 

    return ( <>
           <div className="container mb-4">
           Certificat de presence 
                <br />
                <br />
                 {de}
                 {vers}
                <br />
             
           <br />
            
           </div>
    </> );
}

export default ExamainTemp;