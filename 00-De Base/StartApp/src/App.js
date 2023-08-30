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


//navBar
import NavBar from './Dashboard/navBar'
import LeftSideCard from './Dashboard/leftSide';

//Commandes
import RequestPage from './Dashboard/Requests/requestPage';
import RequestReservationInfo from "./Dashboard/Requests/requestInfo"; 
import CalendarCommandes from './Dashboard/Requests/calendar';
 

import MessagesPages from './Dashboard/Messages/messagesPage'
import ProfilePage from './Dashboard/Profile/profilePage'

//Login  & Auth
import LogIn from './LogIn/logIn';
import AuthPage from './LogIn/authPage';

const SystemLanding = () => {
  useEffect(() => {
      //CheckAuthentification()
      CheckLogIn()
  },[]);

  const CheckAuthentification = () =>{
      const AuthenKey = localStorage.getItem(`${GConf.SystemTag}_AuthKeyISSet`);
      if (!AuthenKey) {
          window.location.href = "/Auth";
      }
  }

  const CheckLogIn = () =>{
      const pidIsSet = localStorage.getItem('PID');
      if (!pidIsSet) {window.location.href = "/login";}
  }

  return (<>
      <NavBar/>
      <br />
      <br />
      <br />
       
      <div className='row pt-4 m-1'>
              <div className='col-12 col-md-12 col-lg-2'><LeftSideCard /></div>
              <div className='col-12 col-md-12 col-lg-10'><Outlet /></div>
      </div>
      {/* <div className="container pt-4">    
          <Outlet />
      </div> */}
  </>);
}


function App() {
  //const and variables 
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
              getPID ? <Navigate to='/S'  /> : <Navigate to='/Login'  />
          } 
      </>);
  }
  const NotFound = () =>{
    return (<div className="container text-danger pt-5 text-center">
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
          <Route path="S" exact element={<SystemLanding />} >
                <Route path="" exact element={<RequestPage />} />
                <Route path="rq" exact element={<Outlet />} >
                    <Route path="" exact element={<RequestPage />} />
                    <Route path="calendrier" exact element={<CalendarCommandes />} />
                    <Route path="info/:TAG/:CID" exact element={<RequestReservationInfo />} />
                </Route>
                <Route path="Profile" exact element={<ProfilePage />} />
                <Route path="Message" exact element={<MessagesPages />} />
          </Route>
         
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
