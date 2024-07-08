import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';

function DocteurSpecific() {
	const [userCountry, setUserCountry] = useState('');
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
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


  const SelectCountryOLd = (selectedCountry) =>{
    localStorage.setItem('country',selectedCountry);
    //navigate(`/`)
    //window.location.reload()
  }
  const SelectCountry = (lan, country) => {
    i18n.changeLanguage(lan)
    localStorage.setItem('country', country);
    //navigate(`/`)
    window.location.href = '/';

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
            <div className='card card-body shadow-sm mb-3 border-div' onClick={() => SelectCountry(userCountry)}>
                Select A Country {userCountry}
            </div>
            {/* <div>
                <Button onClick={() => i18n.changeLanguage('en')}>English</Button>
                <Button onClick={() => i18n.changeLanguage('ar')} >arab</Button>
                <Button onClick={() => i18n.changeLanguage('fr')} >Français</Button>
            </div> */}

            {/* Africa */}
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-europe-africa" style={{color: '#275e40'}}></span> Africa</h2>
        <div className="row mb-4">
            <div className="col-4 col-lg-2 mb-3 text-center">
                <div  onClick={() => SelectCountry('ar_TN','TN')}>
                <img src="https://flagpedia.net/data/flags/w580/tn.webp" className="img-responsive rounded-circle" width="70px" height="70px" />
                <div className="text-center mt-2">تونس</div>
                </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => SelectCountry('ar_MA','MA')}>
              <img src="https://flagpedia.net/data/flags/w580/ma.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">المغرب</div>
              </div>
          </div>
          <div className="col-4 col-lg-2 mb-3 text-center">
            <div   onClick={() => SelectCountry('ar_EG','EG')}>
            <img src="https://flagpedia.net/data/flags/w580/eg.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
            <div className="text-center mt-2">مصر</div>
            </div>
        </div>
        </div>
        
        {/* Europe */} 
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-asia-australia" style={{color: '#0a8a44'}}></span> Europe</h2>
        <div className="row mb-4">
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => SelectCountry('fr_FR','FR')}>
              <img src="https://flagpedia.net/data/flags/w580/fr.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">France</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => SelectCountry('it_IT','IT')}>
              <img src="https://flagpedia.net/data/flags/w580/it.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">Italia</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => SelectCountry('de_DE','DE')}>
              <img src="https://flagpedia.net/data/flags/w580/de.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">Deutschland</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => SelectCountry('en_GB','GB')}>
              <img src="https://flagpedia.net/data/flags/w580/gb.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">U K</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => SelectCountry('ru','RU')}>
              <img src="https://flagpedia.net/data/flags/w580/ru.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">россия</div>
              </div>
            </div>
        </div>

        {/* America */}
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-americas" style={{color: '#158a4a'}}></span> America</h2>
        <div className="row mb-4">
          <div className="col-4 col-lg-2 mb-3 text-center">
            <div   onClick={() => SelectCountry('en_CA','CA')}>
            <img src="https://flagpedia.net/data/flags/w580/ca.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
            <div className="text-center mt-2">Canada</div>
            </div>
          </div>
          <div className="col-4 col-lg-2 mb-3 text-center">
              <div    onClick={() => SelectCountry('en_US','US')}>
              <img src="https://flagpedia.net/data/flags/w580/us.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">United State</div>
              </div>
          </div>
        </div>

        {/* Asie */}
        <h2 className="text-secondary ms-4"><span className="bi bi-globe-central-south-asia" style={{color: '#6a8a15'}}></span> Asie</h2>
        <div className="row mb-4">    
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => SelectCountry('ar_SA','SA')}>
              <img src="https://flagpedia.net/data/flags/w580/sa.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">السعودية</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => SelectCountry('ar_QA','QA')}>
              <img src="https://flagpedia.net/data/flags/w580/qa.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">قطر</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => SelectCountry('ar_AE','AE')}>
              <img src="https://flagpedia.net/data/flags/w580/ae.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">الإمارات المتحدة العربية</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
                <div   onClick={() => SelectCountry('ja','JP')}>
                <img src="https://flagpedia.net/data/flags/w580/jp.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
                <div className="text-center mt-2">日本</div>
                </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div  onClick={() => SelectCountry('hi','IN')} >
              <img src="https://flagpedia.net/data/flags/w580/in.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">भारत</div>
              </div>
            </div>
            <div className="col-4 col-lg-2 mb-3 text-center">
              <div   onClick={() => SelectCountry('zh_CN','CN')}>
              <img src="https://flagpedia.net/data/flags/w580/cn.webp" className="img-responsive rounded-circle border" width="70px" height="70px" />
              <div className="text-center mt-2">中国</div>
              </div>
            </div>
        </div>

             
  </div>
  </>)
}

export default DocteurSpecific;