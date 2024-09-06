//React And GLOBAL CSS
import React, { useEffect, useState } from 'react';
import GConf from './Assets/generalConf';
import LoadingBar from 'react-top-loading-bar'
import { toast, ToastContainer } from 'react-toastify';
import './Assets/i18n';

// /*CSS*/
import 'bootstrap-icons/font/bootstrap-icons.css';
import './theme.css';
import "gridjs/dist/theme/mermaid.css";
import 'react-toastify/dist/ReactToastify.css';

//Router & Routes
import { BrowserRouter as Router,Routes,Route, Outlet} from "react-router-dom";

//Login 
import Inscription from './Components/inscriptionPage';
import MainPage from './Components/mainPage';
import LandingPage from './Components/landingPage';

//Google analytics 
import ReactGA from 'react-ga';
import ReadyPage from './Components/readyPage';
ReactGA.initialize('UA-201064601-1');

function App() {
  //const and variables 
  const [progress, setProgress] = useState(2)

  //useefeects
  useEffect(() => {
    setProgress(100);
  }, []);

  //card
  const NotFound = () =>{
    return (<div className="cpntainer text-danger pt-5 text-center">
            <h1>Page Introuvable 404 </h1>
            <img src='https://system.anaslouma.tn/Assets/images/404.svg' width='200px' className='img-responsive ' />
        </div>);
  }

  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="Inscription/:system" element={<Inscription />} />
          <Route path="Landing/:system" element={<LandingPage />} />
          <Route path="ready" element={<ReadyPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>   
      </Router>
      <LoadingBar color='#f5e618' progress={progress}  
                //onLoaderFinished={() => setProgress(0)} 
      />
      <ToastContainer rtl />
    </>
    
  );
}

export default App;
