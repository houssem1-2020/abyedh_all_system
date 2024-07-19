import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useNavigate } from 'react-router-dom';
import { Button, Icon } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function QrCodeModal({ setQRCodeValue, qrCodeValue, GoToQrCodeFunction, }) {
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);

    const navigate = useNavigate();
    const ActionsBtnCard = (props) =>{
        return(<>
            <Button   onClick={() => navigate(`/S/P/${qrCodeValue}?action=true`)} className='bg-white mt-3 border mb-2 '   style={{borderRadius:'18px', width:'auto'}}     > 
                    <Icon name={props.data.icon} className={isRTL ? 'ms-1' : 'me-1'} />  {t(`resultPage.actionTextName.${qrCodeValue.split('/')[0]}.${props.data.link}`)}   
            </Button>
        </>)
    }
    const [selectedListeTag, setSelectedListeTag] = useState({name:'', icon:''})

    const ShowUpLinks = (value) =>{
        
        const resultArray = value.split('/');
        setSelectedListeTag(GConf.ADIL[resultArray[0]].profileBtns.slice(0, GConf.ADIL[resultArray[0]].profileBtns.length - 1))
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
         <div className='card-body'>   
            {qrCodeValue == null ? 
                    <div className='col-12 col-lg-6'>
                        <h3 className='text-center mb-0'>{t('mainPage.qrCodeScanner.scanText')}</h3>   
                        <div className='mt-0 text-center'><img className='mb-0 ' src='https://cdn.abyedh.com/Images/required/qr-code.gif' width='200px'  height='200px' /> </div>
                    </div> 
                : 
                <Button size='big' fluid className='bg-white text-danger mb-3 rounded-pill shadow-sm border' disabled={qrCodeValue == null} onClick={() => GoToQrCodeFunction(qrCodeValue)}>  {t('mainPage.qrCodeScanner.voirProfileText')} <span className='bi bi-chevron-double-right'></span></Button>
            }
        
            <div dir={isRTL ?  'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}>
                {selectedListeTag.name != '' && qrCodeValue ? 
                <>
                    {
                        selectedListeTag.map((data,index) => <ActionsBtnCard key={index}  data={data}   />)
                    }
                </> 
                : <></>}                       
            </div>
        </div>

    </> );
}

export default QrCodeModal;