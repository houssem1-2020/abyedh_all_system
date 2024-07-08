import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import QRCode from "react-qr-code";
import { toast } from 'react-toastify';
import GConf from '../../../AssetsM/APPConf';
import dirItem from '../../../../AssetsM/Item'

function setPageSize() {
    const style = document.createElement('style');
    style.innerHTML = `@page {size: landscape}`;
    style.id = 'page-orientation';
    document.head.appendChild(style);
}

function ProfilePID() {
    /*###############################[UseEffect]################################# */
    const [profileData, setProfileData] = useState([])
    const [loading, setLoadingPage] = useState(true)

    /*###############################[UseEffect]################################# */
    useEffect(() => {
        setPageSize();
        axios.post(`${GConf.ApiLink}/profile/print`, {
            PID: GConf.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) {
            console.log(response.data)
            setProfileData(response.data)
            setLoadingPage(false)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5></div></>, GConf.TostInternetGonf) 
              setProfileData([])
            }
        });
    }, [])

    function findElementByLink(link) {
        for (const category in dirItem) {
          if (dirItem[category] && dirItem[category].slides) {
            for (const slide of dirItem[category].slides) {
              if (Array.isArray(slide)) {
                for (const subSlide of slide) {
                  if (subSlide.link === link) {
                    return subSlide.name
                  }
                }
              } else if (slide.link === link) {
                return slide.name
              }
            }
          }
        }
        return null;
    }

    return ( <>
            {loading ? 
            <>Loading Page</>
            :
            <div className='row'> 
                <div className='col-6'>
                    <div className='card card-body border-div border-0'>
                        <div className='row'>
                            <div className='col-2 align-self-center'>
                                <div className='row'>
                                    <div className='col-4'><h5 className='bi bi-arrow-left'></h5></div>
                                    <div className='col-4'><h5 className='bi bi-arrow-right'></h5></div>
                                    <div className='col-4'><h5 className='bi bi-arrow-clockwise'></h5></div>
                                </div>
                            </div>
                            <div className='col-10'>
                                    <h1 className='text-danger border rounded-pill text-start p-1 ps-3'> 
                                    <div className='row'>
                                        <div className='col-11'><span className='bi bi-lock-fill text-success bg-gray rounded-pill me-3 ms-1'></span> https://abyedh.tn/</div>
                                        <div className='col-1 align-self-center text-secondary'><h5 className='bi bi-geo-alt'></h5></div>
                                    </div>
                                        
                                    </h1>
                            </div>
                        </div>
                        
                        <br />
                        <div className='row'>
                            <div className='col-12 text-start'>
                                <h1 className='text-dark ms-2 mb-0 '><span className='bi bi-person bi-md'></span>  {profileData.Name ? profileData.Name : ''} </h1> 
                                {profileData.Phone ? <h1 className='text-dark ms-2 mb-0 mt-0'><span className='bi bi-telephone bi-md'></span> +216  {profileData.Phone ? profileData.Phone : ''}</h1> : <></>}
                                <h4 className='text-dark ms-2  mb-0 mt-0'><span className='bi bi-geo-alt bi-md'></span> {profileData.Adress ? profileData.Adress : ''}</h4> 
                            </div>
                             
                        </div>
                        
                                  
                        <h1 className='text-center' style={{color: GConf.landing[GConf.systemTag].colorTheme}}>{findElementByLink(GConf.systemTag)}</h1>
                        <br />
                        
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <QRCode fgColor={'GConf.landing[GConf.systemTag].colorTheme'} value={`${GConf.systemTag}/${GConf.PID}`} size={350} />
                                <br />
                            </div>
                        </div>
                        <br />
                        <ul>
                            <li>Télecharger L'app  <b>abyedh.tn : PWA</b> ou Naviguer Sur : <b>https://abyedh.tn/</b> </li>
                            <li>Cliquer Sur L'icône : <span className='bi bi-qr-code'></span> </li>
                            <li>Scannez le Code Profile </li>
                        </ul>
                        
                        <br />
                        <br />
                       
                    </div>
                </div>
                <div className='col-6'>
                    <div className=' text-center mt-4 '>
                        <QRCode fgColor={GConf.landing[GConf.systemTag].colorTheme} value={findElementByLink(GConf.systemTag)} size={450} />
                         
                    </div>
                    <br />
                    <br />
                    <div className='card card-body shadow border-div    mt-3 border-1'>
                    <h2 className='mb-3 text-center text-danger'>منصة أبيض : تطبيق واحد تعمل بيه كل شي </h2>
                        <div className='row'>
                                <div className='col-2 align-self-center text-end'><img src="https://cdn.abyedh.com/images/logo/logo-app-store.jpg" className="img-responsive  mb-2" style={{width:'80px'}}  /></div>
                                    <div className='col-8 text-start'> 
                                        <h5 className='mb-1'>abyedh.tn : PWA</h5>
                                        <div className='row mb-2'>
                                            <div className='col-3 align-self-center text-center border-end'>
                                                <div className='small mb-0'>4.2 <span className='bi bi-star-fill'></span></div>
                                                <div className='small mt-0 text-secondary'> 9 reviews</div>
                                            </div>
                                            <div className='col-3 align-self-center text-center border-end'>
                                                <div className='small mb-0'>1K+</div>
                                                <div className='small text-secondary mt-0'> Downloads</div>
                                            </div>
                                            <div className='col-3 align-self-center text-center'>
                                                <div className='small mb-0'><span className='border p-1'>3+</span></div>
                                                <div className='small mt-0 text-secondary'> Rated 3+</div>
                                            </div>
                                        </div>
                                        {/* <img src="https://cdn.abyedh.com/images/required/instal-btn.png" className="img-responsive  mb-2" style={{width:'250px', height:'50px'}}  /> */}
                                        {/* <div  className='border-div shadow-sm btn p-1 text-white print-profile-page bg-success' style={{backgroundColor: '#01875f ', width:'250px'}}> Installer</div> */}
                                    </div>
                                    <div className='col-2 align-self-center text-start'> 
                                        <QRCode   value={`https://play.google.com/store/apps/details?id=tn.abyedh.twa`} size={60} />
                                    </div>
                        </div>
                    </div>

                    
                    
                </div>
            </div>
            
            }
        </> );
}

export default ProfilePID;