import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';

function QrCodeModal({ setQRCodeValue, qrCodeValue, GoToQrCodeFunction, }) {
    const navigate = useNavigate();
    const ActionsBtnCard = (props) =>{
        return(<>
            <Button fluid onClick={() => navigate(`/S/P/${qrCodeValue}?action=true`)} className='w-100 bg-white mt-3 border mb-2 '   style={{borderRadius:'18px', width:'auto'}}     > 
                    <Icon name={props.data.icon} className='ms-1' />  {props.data.name}
            </Button>
        </>)
    }
    const [selectedListeTag, setSelectedListeTag] = useState({name:'', icon:''})

    const ShowUpLinks = (value) =>{
        
        const resultArray = value.split('/');
        setSelectedListeTag(GConf.ADIL[resultArray[0]].profileBtns[0])
        //setSelectedListeTag(GConf.ADIL[resultArray[0]].profileBtns.slice(0, GConf.ADIL[resultArray[0]].profileBtns.length - 1))
    }

    return ( <>
        <QrReader
                constraints={{
                    facingMode: 'environment'
                }}
                scanDelay={3000}
                onResult={(result, error) => {
                if (!!result) {
                    ShowUpLinks(result.text)
                    //GoToQrCodeFunction(result.text)
                    setQRCodeValue(result.text)
                }

                if (!!error) {
                    console.info(error);
                }
                }}
                style={{ width: '100%',height: "300px" }}
                className='mb-3'
        />
            
        {qrCodeValue == null ? 
            <div className='col-12 col-lg-6'>  <img src='https://cdn.abyedh.tn/Images/required/preview.gif' width='100%'  height='200px' /> 
                <h3 className='text-center mt-0'>قم بمسح المعرف </h3> 
                </div> 
            : 
            <Button size='big' className='bg-danger text-white mb-3 rounded-pill' disabled={qrCodeValue == null} onClick={() => GoToQrCodeFunction(qrCodeValue)}> زيارة الملف </Button>
        }
        
        <div className='col-12 d-flex' dir='rtl'  >
            {/* { selectedListeTag.map( (data,index) => <ActionsBtnCard key={index} data={data} indexKey={index} /> )  }  */}
            {selectedListeTag.name != '' ? <ActionsBtnCard   data={selectedListeTag}   />    : <></>}                       
        </div>

    </> );
}

export default QrCodeModal;