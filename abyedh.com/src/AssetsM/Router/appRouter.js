import React , { Suspense, useEffect, useState }from 'react'
import { BrowserRouter as Router, Routes,Route, Outlet, useParams} from "react-router-dom";
import { Navigate } from 'react-router-dom';
import GConf from '../../App/AssetsM/APPConf';

//navBar
import NavBar from '../../App/Dashboard/navBar'
import LeftSideCard from '../../App/Dashboard/leftSide';

 
import ProfilePID from '../../App/Dashboard/Used/Profile/profilePID';

const LogIn = React.lazy(() => import('../../App/LogIn/logIn'));
const AuthPage = React.lazy(() => import('../../App/LogIn/authPage'));

const MainPage = React.lazy(() => import('../../App/Dashboard/Main/mainPage'));
const SpesificPage = React.lazy(() => import('../../App/Dashboard/Spesific/spesificPage'));
const RequestPage = React.lazy(() => import('../../App/Dashboard/Requests/requestPage'));
const RequestInfo = React.lazy(() => import('../../App/Dashboard/Requests/requestInfo'));

const SystemPage = React.lazy(() => import('../../App/Dashboard/System/systemPage'));
const PublicationPage = React.lazy(() => import('../../App/Dashboard/Used/Publication/publicationPage'));
const MessagesPages = React.lazy(() => import('../../App/Dashboard/Used/Messages/messagesPage'));
const ImagesPages = React.lazy(() => import('../../App/Dashboard/Used/Images/messagesPage'));
const SharePages = React.lazy(() => import('../../App/Dashboard/Used/Share/messagesPage'));
const AvisPages = React.lazy(() => import('../../App/Dashboard/Used/Avis/messagesPage'));
const HorairePages = React.lazy(() => import('../../App/Dashboard/Used/Horaire/messagesPage'));
const ProfilePage = React.lazy(() => import('../../App/Dashboard/Used/Profile/profilePage'));

// const ProfilePID = React.lazy(() => import('../../App/Dashboard/Profile/profilePID'));


const ForLazyLoadingLoader = () =>{
    return (<>
            <div className="loader-container">
              <div className="loader-small"></div>
            </div>              
        </>);
  }

const RedirectingPage = () => {
    let {tag} = useParams()
    const getPID = localStorage.getItem('PID');
    return (<>
        {
            getPID ? <Navigate to='/App/S'  /> : <Navigate to={`/App/Login/${tag}`}  />
        } 
    </>);
}

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
    </>);
  }

const UserRouter = () => (
    
    <Route path="App" exact element={<Outlet />} >
            <Route path="L/:tag" element={<RedirectingPage />} />
             <Route path="Login/:tag" element={<Suspense fallback={<ForLazyLoadingLoader />}><LogIn /></Suspense>} />
            <Route path="Auth" element={<Suspense fallback={<ForLazyLoadingLoader />}><AuthPage /></Suspense>} />
            <Route path="S" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><SystemLanding /></Suspense>} >
                    <Route path="" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><MainPage /></Suspense>} />
                    <Route path="System" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><SystemPage /></Suspense>} />
                    <Route path="Spesific" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><SpesificPage /></Suspense>} />
                    
                    <Route path="rq" exact element={<Outlet />} >
                        <Route path=":TAG" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><RequestPage /></Suspense>} />
                        <Route path="info/:TAG/:CID" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><RequestInfo /></Suspense>} />
                    </Route>
                    <Route path="Profile" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><ProfilePage /></Suspense>} />
                    <Route path="Message" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><MessagesPages /></Suspense>} />
                    <Route path="Images" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><ImagesPages /></Suspense>} />
                    <Route path="Horaire" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><HorairePages /></Suspense>} />
                    <Route path="Avis" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><AvisPages /></Suspense>} />
                    <Route path="Publication" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><PublicationPage /></Suspense>} />
                    <Route path="Share" exact element={<Suspense fallback={<ForLazyLoadingLoader />}><SharePages /></Suspense>} />
            </Route>
            <Route path="Profile/ProfilePrint" exact element={<ProfilePID />} /> 
    </Route>
)

export default UserRouter 