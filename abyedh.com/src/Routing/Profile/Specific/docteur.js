import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Tab } from 'semantic-ui-react'
import GConf from '../../../AssetsM/generalConf';
import { Form, TextArea, Input , Button, Icon, Loader} from 'semantic-ui-react'
import axios from 'axios';
import { toast } from 'react-toastify';
import TableGrid from '../../../AssetsM/tableGrid';
function DocteurSpecific(props) {
    /* ############### Const #################*/
    let {tag} = useParams()
    const [rendyVousD, setRdvData] = useState([])
    const [loaderState, setLS] = useState(false)


    /* ############### UseEffect #################*/
    useEffect(() => {
        console.log(props.PidData)
    })
    /* ############### Functions #################*/
    const saveFunction = () =>{
        if (!rendyVousD.comment) {toast.error("أدخل التشخيص !", GConf.TostErrorGonf)}
        else if (!rendyVousD.date) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            axios.post(`${GConf.ApiLink}/LogIn`, {
                rendyVousData : rendyVousD,
            }).then(function (response) {
                
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 
    }

    /* ############### Card #################*/
    const EmptyCard = (props) => {
        return (
            <>
            
            <h1 className='display-1 text-secondary mb-0' style={{color: GConf.ADIL[tag].themeColor}}><span className={`bi bi-${props.icon} bi-lg`}></span></h1>
             
            </>
        )
    }

    const SalleAttentCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center '>
                <h5 className='text-end mb-0' style={{color: GConf.ADIL[tag].themeColor}}> معدل الانتضار</h5> 
                {props.PidData.SP_Tarif == "" || JSON.parse(props.PidData.SP_Tarif).length == 0 ? 
                    <EmptyCard icon='hourglass-split' /> 
                    :
                    <h2 className='text-secondary' dir='rtl'>1:02 </h2>
                }
            </div>
        </>)
    }
    const RoleTimeEstimateCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center '>
                <h5 className='text-end ' style={{color: GConf.ADIL[tag].themeColor}}>  توقع الوقت المتبقي </h5> 
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-clock-history bi-lg'></span></h1>
            </div>
        </>)
    }
    const TarifCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center  '>
                <h5 className='text-end' style={{color: GConf.ADIL[tag].themeColor}}> التعريفة </h5> 
                {props.PidData.SP_Tarif == "" || JSON.parse(props.PidData.SP_Tarif).length == 0 ? 
                    <EmptyCard icon='cash-coin' /> 
                    :
                    <div className='text-secondary' style={{maxHeight:'300px', overflowX:'auto', overflowX:'hidden'}}  >
                        {JSON.parse(props.PidData.SP_Tarif).map((data,index) => 
                            <div className='text-end  p-2 border-div mb-2' key={index} dir='rtl'>
                                <div className='row'>
                                 
                                    <div className='col-9 align-self-center text-end'><h5 className='mt-0 mb-1'> {index + 1 } - {data.Forfait}</h5> <small className='mb-0'>{data.Description}</small></div> 
                                    
                                    <div className='col-3 align-self-center'>{data.Prix} د.ت</div>
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>)
    }
    const CertificatCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center  '>
                <h5 className='text-end' style={{color: GConf.ADIL[tag].themeColor}}> الشهائد العلمية </h5> 
                 
                {props.PidData.SP_Diplomes == "" || JSON.parse(props.PidData.SP_Diplomes).length == 0 ? 
                    <EmptyCard icon='award-fill' /> 
                    :
                    <div className='text-secondary' style={{maxHeight:'300px', overflowX:'auto', overflowX:'hidden'}}  >
                        {JSON.parse(props.PidData.SP_Diplomes).map((data,index) => 
                            <div className='text-end  p-2 border-div mb-2' key={index} dir='rtl'>
                                <div className='row'>
                                 
                                    <div className='col-12 align-self-center text-end'><h5 className='mt-0 mb-1'>{data.annee} : {data.diplome}</h5> <small className='mb-0'>{data.faculte}</small></div> 
                                    
                                    
                                </div>
                            </div>
                        )}
                    </div>
                }
            </div>
        </>)
    }
    const SimpleCard = () =>{
        return(<>
            <div className='card card-body shadow-sm border-div mb-4 text-center  '>
                <h5 className='text-end' style={{color: GConf.ADIL[tag].themeColor}}> إعلانات </h5> 
                <h1 className='display-1' style={{color: GConf.ADIL[tag].themeColor}}><span className='bi bi-megaphone bi-lg'></span></h1>
            </div>
        </>)
    }
    return ( <>
        <div className='row mt-4' >
            <div className='col-12 col-lg-4'> <SalleAttentCard  /></div>
            <div className='col-12 col-lg-8'> <TarifCard /> <CertificatCard /></div>
            
        </div>
        
    </> );
}

export default DocteurSpecific;