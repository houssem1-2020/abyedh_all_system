//React And GLOBAL CSS
import React, { useEffect, useState } from 'react';
import GConf from './AssetsM/generalConf';
import LoadingBar from 'react-top-loading-bar'
import { toast, ToastContainer } from 'react-toastify';

// /*CSS*/
import 'bootstrap-icons/font/bootstrap-icons.css';
import './AssetsM/theme.css';
import "gridjs/dist/theme/mermaid.css";
import 'react-toastify/dist/ReactToastify.css';

//Router & Routes
import { BrowserRouter as Router,Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';

import systemRouter from './AssetsM/Router/systemRouter';
import routerOne from './AssetsM/Router/routerOne';
import routerTwo from './AssetsM/Router/routerTwo';
import routerThree from './AssetsM/Router/routerThree';
import routerPrinting from './AssetsM/Router/routerPrinting';

//Login  & Auth
import LogIn from './LogIn/logIn';
import AuthPage from './LogIn/authPage';


function App() {
  //const and variables 
  const SystemRouter = systemRouter();
  const CaisseRouter = routerOne();
  const ServeurRouter = routerTwo()
  const ChefRouter = routerThree()
  const PrintRouter = routerPrinting()
  const [progress, setProgress] = useState(2)

  //useefeects
  useEffect(() => {
    setProgress(100);
  }, []);

  //card
  const RedirectingPage = () => {
      const getPID = localStorage.getItem('PID');
      return (<>
          {
              getPID ? <Navigate to='/S/ma'  /> : <Navigate to='/Login'  />
          } 
      </>);
  }
  const NotFound = () =>{
    return (<div className="cpntainer text-danger pt-5 text-center">
            <br /> <br /> <br /> <br />
            <img src='https://system.anaslouma.tn/Assets/images/404.svg' width='200px' className='img-responsive ' />
            <h1 style={{color: GConf.themeColor}}>Page Introuvable 404 </h1>
        </div>);
  }

  
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<RedirectingPage />} />
          <Route path="Login" element={<LogIn />} />
          <Route path="Auth" element={<AuthPage />} />
          {SystemRouter}
          {CaisseRouter}
          {ServeurRouter}
          {ChefRouter}
          {PrintRouter}
          <Route path="*" element={<NotFound />} />
        </Routes>   
      </Router>
      <LoadingBar color={GConf.themeColor} progress={progress}  
                //onLoaderFinished={() => setProgress(0)} 
      />
      <ToastContainer />
    </>
    
  );
}

export default App;
