import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../../AssetsM/generalConf";

const useGetFamillePlat = () => {
  const [data, setData] = useState([]);
  const [pureData, setPureData] = useState([]);
  let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));
  useEffect(() => {
    axios.post(`${GConf.ApiLink}/menu/familleplat`, {
        PID: GConf.PID,
      })
      .then(function (response) {
         let genresedit = []
         response.data.map( (thisData) => genresedit.push(
             {key: thisData.PK , value: thisData.Genre , text: thisData.Genre }
             ))
        setData(genresedit)
        setPureData(response.data)
      }).catch((error) => {
        if(error.request) {
          let genresedit = []
          Offline.famille.map( (thisData) => genresedit.push(
              {key: thisData.PK , value: thisData.Genre , text: thisData.Genre }
              ))
         setData(genresedit)
         setPureData(Offline.famille)
        }
      });
    }, [])

  return [data , pureData];
};

export default useGetFamillePlat;