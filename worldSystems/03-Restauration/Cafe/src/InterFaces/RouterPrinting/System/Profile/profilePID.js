import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import QRCode from "react-qr-code";
import { toast } from 'react-toastify';
import GConf from '../../AssetsM/generalConf';

function ProfilePID() {
    /*###############################[UseEffect]################################# */
    const [profileData, setProfileData] = useState([])

    /*###############################[UseEffect]################################# */
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/profile/print`, {
            PID: GConf.PID,
        })
        .then(function (response) {
            setProfileData(response.data[0])

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5></div></>, GConf.TostInternetGonf) 
              setProfileData([])
            }
        });
    }, [])

    return ( <>
            <div className='card card-body '>
                <h1 className='text-center text-danger'>www.abyedh.com</h1> 
                <h1 className='system-color ms-2 mb-0'><span className='bi bi-person-fill bi-md'></span> {profileData.Name ? profileData.Name : ''}</h1> 
                <h1 className='system-color ms-2 mb-0 mt-0'><span className='bi bi-phone-fill bi-md'></span> {profileData.Phone ? profileData.Phone : ''}</h1> 
                <h1 className='system-color ms-2  mb-0 mt-0'><span className='bi bi-bookmarks-fill bi-md'></span> {profileData.Genre ? profileData.Genre : ''}</h1> 
                <br />
                <br />
                <div className='row'>
                    <div className='col-6 text-center'>
                        <QRCode value={GConf.PID} size={300} />
                        <br />
                        <h2>PID</h2>
                    </div>
                    <div className='col-6 text-center'>
                        <QRCode value={`c=storage&PID=${GConf.PID}`} size={300} />
                        <br />
                        <h2>Profile</h2>
                    </div>
                </div>
                <br />
            </div>
        </> );
}

export default ProfilePID;