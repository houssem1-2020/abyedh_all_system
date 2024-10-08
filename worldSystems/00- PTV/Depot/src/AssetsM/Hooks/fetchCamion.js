import axios from "axios";
import { useState, useEffect } from "react";
import GConf from "../generalConf";

const useGetCamion = () => {
    const [data, setData] = useState(null);
    const [pureData, setPureData] = useState(null);

    //Use Effects 
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/camions`, {
            PID : GConf.PID,
        })
        .then(function (response) {
            let TableNow = []
            response.data.map( (dta) => {TableNow.push([dta.Cam_ID,dta.Cam_Name])})
            setData(TableNow)
            setPureData(response.data)
        })
    }, [])

  return [data, pureData];
};

export default useGetCamion;