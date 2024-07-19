import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function DocteurSpecific() {

  /* COnsts */
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
	const [userCountry, setUserCountry] = useState('');
	const [userDefaultCountry, setUserDefaultCountry] = useState({Iso2:'', flag:''});
	const COUNTRIES = {
    CA : {flag:'ca', Lang:'en_CA', ISO : 'CA', name:'Canada'},
    US : {flag:'us', Lang:'en_US', ISO : 'US', name:'United State'},
    FR : {flag:'fr', Lang:'fr_FR', ISO : 'FR', name:'France'},
    IT : {flag:'it', Lang:'it_IT', ISO : 'IT', name:'Italia'},
    DE : {flag:'de', Lang:'de_DE', ISO : 'DE', name:'Deutschland'},
    GB : {flag:'gb', Lang:'en_GB', ISO : 'GB', name:'U K'},
    RU : {flag:'ru', Lang:'ru', ISO : 'RU', name:'россия'},
    TN : {flag:'tn', Lang:'ar_TN', ISO : 'TN', name:'تونس'},
    MA : {flag:'ma', Lang:'ar_MA', ISO : 'MA', name:'المغرب'},
    EG : {flag:'eg', Lang:'ar_EG', ISO : 'EG', name:'مصر'},
    SA : {flag:'sa', Lang:'ar_SA', ISO : 'SA', name:'السعودية'},
    QA : {flag:'qa', Lang:'ar_QA', ISO : 'QA', name:'قطر'},
    AE : {flag:'ae', Lang:'ar_AE', ISO : 'AE', name:'الإمارات المتحدة العربية'},
    JP : {flag:'jp', Lang:'ja', ISO : 'JP', name:'日本'},
    IN : {flag:'in', Lang:'hi', ISO : 'IN', name:'भारत'},
    CN : {flag:'cn', Lang:'zh_CN', ISO : 'CN', name:'中国'},
  }
  

    /* UseEffect */
    useEffect(() => {
      //if (GConf.Country) {navigate(`/`)}  
      // Check if geolocation is available in the browser
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Make an API call to a reverse geocoding service using Axios
          const reverseGeocodingURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=c6fadae8c10c40c599abef5ee21deef3`;

          try {
            // const response = await axios.get(reverseGeocodingURL);
            // const country = response.data.results[0].components.country;
            //setUserCountry(country);
            const response = await axios.get(reverseGeocodingURL);
            const countryObject = response.data.results[0].components;
            const countryCode = countryObject['ISO_3166-1_alpha-2']; // ISO country code
            setUserCountry(countryCode);            
            
          } catch (error) {
            console.error('Error fetching geolocation data:', error);
            setUserCountry('Error');
          }
        }, (error) => {
          console.error('Geolocation error:', error);
          setUserCountry('Error');
        });
      } else {

        setUserCountry('Geolocation not supported in this browser');
      }
    }, []);

   /* Function  */
    const SelectCountryOLd = (selectedCountry) =>{
      localStorage.setItem('country',selectedCountry);
    }
    const UserDefaultCountryFunc =() => {

    }
    const SelectCountry = (lan, country) => {
      i18n.changeLanguage(lan)
      localStorage.setItem('country', country);
      //navigate(`/`)
      window.location.href = '/';

    }


    /* Crads */
    const CountryItem = (props) => {
      return(<>
          <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => SelectCountry(props.data.Lang,props.data.ISO)}>
              <img src={`https://flagpedia.net/data/flags/w580/${props.data.flag}.webp`} className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">{props.data.name}</div>
              </div>
          </div>
      </>)
    }
    const ContryItemsListCard = (props) => {
      return(<>
            {props.data.map((data, index) => <CountryItem key={index} data={COUNTRIES[data]}  />)}
      </>)
    }



	return(<>
        <br />
        <br />
  
      <div className="d-none d-lg-block"><br /><br /></div>
      <div className="container-fluid"> 
          {/* <h1 className="text-center text-secondary display-4 mb-4">Abyedh IS the First Super-app in the Globe </h1>  */}
      </div>
      <div className="container">
          
          <h1 className="text-secondary text-center" id="section2">it's amazing to do all your daily activities with one app !</h1>
          <h3  className="text-info mb-4" >Select Your Countery : </h3>
          { userCountry != '' &&  userCountry in COUNTRIES ? 
            <div className='card card-body shadow-sm mb-3 border-div' onClick={() => SelectCountry(COUNTRIES[userCountry].Lang , userCountry)}>
                <div className='row'>
                    <div className='col-2 align-self-center'><img src={`https://flagpedia.net/data/flags/w580/${COUNTRIES[userCountry].flag}.webp`} className="img-responsive rounded-circle border" width="25px" height="25px" /></div>
                    <div className='col-8 align-self-center text-secondary'> {COUNTRIES[userCountry].name} </div>
                    <div className='col-2 align-self-center'><span className='bi bi-arrow-right'></span></div>
                </div>
            </div>

            :
            <div className='card-body mb-3'></div>
          }
        
       
        {/* America */}
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-americas" style={{color: '#158a4a'}}></span> America</h2>
        <div className="row mb-4">
          <ContryItemsListCard data={['CA', 'US']} />
          <div className="col-4 col-lg-2 mb-3 text-center">
            <div  onClick={() => alert('Not Supported')}>
            <img src="https://flagpedia.net/data/flags/w580/mx.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
            <div className="text-center mt-2"> México  </div>
            </div>
          </div>
        </div>

        {/* Europe */} 
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-asia-australia" style={{color: '#0a8a44'}}></span> Europe</h2>
        <div className="row mb-4">
            <ContryItemsListCard data={['FR', 'IT', 'DE','GB','RU' ]} />
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => alert('Not Supported')}>
              <img src="https://flagpedia.net/data/flags/w580/ch.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">Switzerland</div>
              </div>
            </div>
        </div>

        {/* Africa */}
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-europe-africa" style={{color: '#275e40'}}></span> Africa & Middle East</h2>
        <div className="row mb-4">
            <ContryItemsListCard data={['TN', 'MA', 'EG','SA','QA','AE' ]} />
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => alert('Not Supported')}>
              <img src="https://flagpedia.net/data/flags/w580/lb.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2"> لبنان  </div>
              </div>
            </div>
        </div>

        {/* Asie */}
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-central-south-asia" style={{color: '#6a8a15'}}></span> Asie</h2>
        <div className="row mb-4">    
            <ContryItemsListCard data={['JP', 'IN', 'CN']} />
        </div>

             
  </div>
  </>)
}

export default DocteurSpecific;