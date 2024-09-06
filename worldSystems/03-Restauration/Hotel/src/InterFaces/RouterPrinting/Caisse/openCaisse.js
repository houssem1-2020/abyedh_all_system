import axios from "axios";
import React from "react";
import { useEffect } from "react";
import OneGConf from "../../RouterOne/Assets/OneGConf";
import { useState } from "react";
import GConf from "../../../AssetsM/generalConf";

function OpenCaisse() {
  const [profileData, setProfileData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post(`${GConf.ApiRouterOneLink}/nv/openCaisse`, {
        forPID: OneGConf.forPID.PID,
      })
      .then(function (response) {
        setProfileData(response.data[0]);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.request) {
          console.log("stopped");
        }
      });
  }, []);

  return (
    <>
      <div className="row p-3">
        <div className="col-4 text-center">
          <h4 className="text-center">https://www.abyedh.com/</h4>
        </div>
        <div className="col-12">
          <div>
            <span className="bi bi-house"></span> : Restaurant{" "}
            {loading ? "..." : profileData.Name}
          </div>
          <div>
            <span className="bi bi-phone"></span> :{" "}
            {loading ? "" : profileData.Phone}
          </div>
          <div>
            <span className="bi bi-map"></span> :{" "}
            {loading ? "" : profileData.Adress}
          </div>
        </div>
      </div>
    </>
  );
}

export default OpenCaisse;
