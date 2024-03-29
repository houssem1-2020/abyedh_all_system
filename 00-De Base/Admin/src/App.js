//React And GLOBAL CSS
import React, { useEffect, useState } from 'react';
import GConf from './AssetsM/generalConf';
import LoadingBar from 'react-top-loading-bar'
import { toast, ToastContainer } from 'react-toastify';

// /*CSS*/
import 'bootstrap-icons/font/bootstrap-icons.css';
import './theme.css';
import "gridjs/dist/theme/mermaid.css";
import 'react-toastify/dist/ReactToastify.css';

//Router & Routes
import { BrowserRouter as Router,Routes,Route, Outlet} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import systemRouter from './AssetsM/Router/systemRouter';
import directoryRouter from './AssetsM/Router/directoryRouter';
import subscriptionRouter from './AssetsM/Router/subscriptionRouter';
import commandeRouter from './AssetsM/Router/commandeRouter';
import PrintingRouter from './AssetsM/Router/printRouter';

//Login  & Auth
import LogIn from './LogIn/logIn';
import AuthPage from './LogIn/authPage';
import InputMainLandingPage from './ILAND/inputLanding';


function App() {
  //const and variables 
  const SystemRouter = systemRouter();
  const DirectoryRouter = directoryRouter();
  const SubscriptionRouter = subscriptionRouter();
  const CommandeRouter = commandeRouter()
  const PrintRouter = PrintingRouter()
  const [progress, setProgress] = useState(2)

  //useefeects
  useEffect(() => {
    setProgress(100);
  }, []);

  //card
  const RedirectingPage = () => {
      const pidIsSet = localStorage.getItem('PID');
      return (<>
          {
              pidIsSet ? <Navigate to='/S/ma'  /> : <Navigate to='/Login'  />
          } 
      </>);
  }
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
          <Route path="/" element={<RedirectingPage />} />
          <Route path="Login" element={<LogIn />} />
          <Route path="Auth" element={<AuthPage />} />
          <Route path="ILAND" element={<InputMainLandingPage />} />
          {SystemRouter}
          {DirectoryRouter}
          {SubscriptionRouter}
          {CommandeRouter} 
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
