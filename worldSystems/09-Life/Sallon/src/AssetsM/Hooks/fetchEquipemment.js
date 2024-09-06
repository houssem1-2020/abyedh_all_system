import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../../AssetsM/generalConf";

const useGetEquipemment = () => {
    //const
    const [data, setData] = useState([]);
    const [pureData, setPureData] = useState([]);
    const [selectedData, setSelectData] = useState([]);
    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));

    //Use Effects 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/equipemment`, {
            PID: GConf.PID,
        })
        .then(function (response) {
            let TableNow = []
            let SelectTableNow = []
            response.data.map( (dta) => {TableNow.push(dta.INS_Code)})
            response.data.map( (dta) => {SelectTableNow .push({value : dta.INS_Code, text : dta.INS_Name, key: dta.PK})})
            setData(TableNow)
            setSelectData(SelectTableNow)
            setPureData(response.data)
        }).catch((error) => {
            if(error.request) {
                let TableNow = []
                let SelectTableNow = []
                Offline.stock.map( (dta) => {TableNow.push(dta.INS_Code)})
                Offline.stock.map( (dta) => {SelectTableNow .push({value : dta.INS_Code, text : dta.INS_Name, key: dta.PK})})
                setData(TableNow)
                setSelectData(SelectTableNow)
                setPureData(Offline.stock)
            }
          });
    }, [])

  return [data,pureData];
};

export default useGetEquipemment;