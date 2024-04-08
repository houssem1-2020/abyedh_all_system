import React from 'react';
import PBSD from '../../publicBaseData';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Icon, Select } from 'semantic-ui-react';
import GConf from '../../../../AssetsM/generalConf';

function TrainData() {

    /*####################[CONST]##################### */
    const [targetTrip, setTargetTripData] = useState({Genre : '', depart:'' , Arrivee:''})
    const [departListe, setDepartListe] = useState([])
    const [arriverListe, setArriveListe] = useState([])

    const [arriverListeHidden, setArriveListeHidden] = useState(false)

    const busOption = [
        { key: '1', value: 'grandTunis', text: 'تونس الكبري'  },
        { key: '2', value: 'interGouv', text: 'بين الولايات'},
        { key: '3', value: 'SociteRegionale', text: 'شركات جهوية'},
    ]

    /*##################[UseEffect]################### */
    useEffect(() => {
        console.log('test')
     }, [])
    /*#################[Function]#################### */
    const SetSelctedItem = (value) =>{
        setTargetTripData({...targetTrip, Genre: value })
        
        switch (value) {
            case 'grandTunis':
                setDepartListe(PBSD.stationBusAutre)
                setArriveListe(PBSD.stationBusAutre)
                setArriveListeHidden(false)
                break;
            case 'SociteRegionale':
                setDepartListe(PBSD.busCompany)
                setArriveListeHidden(true)
                break;
            case 'interGouv':
                setDepartListe(GConf.abyedhMap.Gouv)
                setArriveListe(GConf.abyedhMap.Gouv)
                setArriveListeHidden(false)
                break;
            default:
                break;
        }
    }
    const SearchFunction = () =>{
        console.log('hhh')
    }
    /*####################[Crad]###################### */

    return ( <>
        <div className='card card-body border-div shadow-sm mb-4'>
            <h6 className='mb-1 text-end'>    نوع الحافلة  <span className='bi bi-person-x-fill'></span> </h6>
            <Select className='mb-3' fluid options={busOption} onChange={(e, { value }) => SetSelctedItem(value)} />
            
            <h6 className='mb-1 text-end'>    الأنطلاق   <span className='bi bi-person-x-fill'></span> </h6>
            <Select className='mb-3' fluid options={departListe} onChange={(e, { value }) => setTargetTripData({...targetTrip, Depart: value })} />
            
            <div className={arriverListeHidden ? 'd-none' : ''}>
                <h6 className='mb-1 text-end'>    الوصول  <span className='bi bi-person-x-fill'></span> </h6>
                <Select className='mb-3' fluid options={arriverListe} onChange={(e, { value }) => setTargetTripData({...targetTrip, Arrivee : value })} />
            </div>
            

            <div className='text-center mt-4'>
                <Button fluid onClick={ (e) => SearchFunction()} className='rounded-pill' icon> <Icon name='search' /> بحث </Button>    
            </div>
        </div>
    </> );
}

export default TrainData;