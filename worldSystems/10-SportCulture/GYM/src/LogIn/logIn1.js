import React, { useEffect, useState } from "react";
import {
  Button,
  Divider,
  Icon,
  Input,
  Header,
  Grid,
  Segment,
  Loader,
} from "semantic-ui-react";
import GConf from "../AssetsM/generalConf";
import Bounce from "react-reveal/Bounce";
import axios from "axios";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import { useReactPWAInstall } from "react-pwa-install";

function LogIn() {
  /*#########################[Const]##################################*/
  //const navigate = useNavigate();
  const [loginD, setLoginD] = useState([]);
  const [loaderState, setLS] = useState(false);

  // const [deferredPrompt, setDeferredPrompt] = useState(null);

  /*#########################[UseEffect]##################################*/
  useEffect(() => {
    const getPID = GConf.PID;
    if (getPID) {
      window.location.href = "/S/ma";
    }

    // const handleBeforeInstallPrompt = (event) => {
    //     event.preventDefault();
    //     setDeferredPrompt(event);
    //   };

    //   window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    //   return () => {
    //     window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    //   };
  });

  /*#########################[Functions]##################################*/
  const logIn = () => {
    if (!loginD.Log) {
      toast.error("Entrer Un identifiant !", GConf.TostErrorGonf);
    } else if (!loginD.Pwd) {
      toast.error("Entrer Le mot DP  !", GConf.TostErrorGonf);
    } else {
      setLS(true);
      axios
        .post(`${GConf.ApiLink}/LogIn`, {
          LoginData: loginD,
          systemTag: GConf.systemTag,
        })
        .then(function (response) {
          if (response.data[0] == "true") {
            toast.success("Connecteé !", GConf.TostSuucessGonf);
            if (!GConf.Offline) {
              localStorage.setItem(
                `${response.data[1]}_${GConf.systemTag}_Offline`,
                JSON.stringify(GConf.offline_default_table)
              );
            }
            localStorage.setItem("PID", response.data[1]);
            localStorage.setItem(
              `${response.data[1]}_${GConf.systemTag}_LocalD`,
              JSON.stringify(GConf.offline_default_table)
            );

            window.location.href = "/";
          } else {
            toast.error("Erreur esseyez de nouveaux", GConf.TostSuucessGonf);
            setLS(false);
          }
        })
        .catch((error) => {
          if (error.request) {
            toast.error(
              <>
                <div>
                  <h5>Probleme de Connextion</h5> Impossible de connecter aux
                  systeme{" "}
                </div>
              </>,
              GConf.TostInternetGonf
            );
            setLS(false);
          }
        });
    }
  };
  // const handleInstall = () => {
  //     if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult) => {
  //         if (choiceResult.outcome === 'accepted') {
  //         console.log('PWA installed');
  //         } else {
  //         console.log('PWA installation declined');
  //         }
  //         setDeferredPrompt(null);
  //     });
  //     }
  // };

  /*#########################[Card]##################################*/
  const LeftCard = (props) => {
    return (
      <>
        <div
          className="col-12 col-lg-4  text-center d-none d-lg-block fixed-top "
          style={{ backgroundColor: props.color, height: "100vh" }}
        >
          <h1 style={{ marginTop: "30%" }} className="text-white">
            <img
              src="https://cdn.abyedh.com/Images/main-logo.png"
              alt="."
              className="p-0"
              width="120px"
              height="120px"
            />
          </h1>
          <h1 style={{ marginTop: "1%" }} className="text-white">
            <img
              src={`https://cdn.abyedh.com/images/ads/${GConf.systemTag}.svg`}
              alt="."
              className="p-0"
              width="300px"
              height="300px"
            />
          </h1>
        </div>
      </>
    );
  };
  const SubSystemLink = (props) => {
    return (
      <>
        <Segment className="p-3 sub-sys-round w-login-input mb-3">
          <NavLink exact="true" to={props.data.link}>
            <Grid>
              <Grid.Column
                className="align-self-center"
                mobile={12}
                tablet={12}
                computer={13}
              >
                <div
                  className="d-flex align-self-center "
                  style={{ color: GConf.themeColor }}
                >
                  <div className="flex-shrink-0 ps-3 align-self-center">
                    <i className={`bi bi-${props.data.icon} bi-md`}></i>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h5 className="mb-2"> {props.data.title}</h5>
                    <small className="text-secondary">
                      {" "}
                      {props.data.text}{" "}
                    </small>
                  </div>
                </div>
              </Grid.Column>
              <Grid.Column
                className="p-4 text-center align-self-center pe-4"
                mobile={4}
                tablet={4}
                computer={3}
              >
                <i
                  className="bi bi-arrow-right-short bi-md"
                  style={{ color: GConf.themeColor }}
                ></i>
              </Grid.Column>
            </Grid>
          </NavLink>
        </Segment>
      </>
    );
  };

  return (
    <>
      <LeftCard color={GConf.themeColor} />
      <div className="row m-0">
        <div className="col-12 col-md-1 col-lg-5"></div>
        <div className="col-12 col-md-10 col-lg-7">
          <div className="card-body">
            {/*<div className='text-end'>
                    You can Add a modal for this and only  
                    {deferredPrompt && ( <Button onClick={handleInstall} className='shadow-sm rounded-pill'> <Icon name='angle double down' /> Télécharger </Button> )}
                </div>*/}
            <Bounce left>
              <br />
              <h2 className="text-cente">
                <Icon name="linkify" /> Connexion :
              </h2>
              <br />
              <div className="mb-3">
                <Input
                  icon="user"
                  iconPosition="left"
                  placeholder="Identification"
                  className="shadow-sm w-login-input"
                  onChange={(e) =>
                    setLoginD({ ...loginD, Log: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <Input
                  icon="key"
                  iconPosition="left"
                  placeholder="Mot DP"
                  type="password"
                  className="shadow-sm w-login-input"
                  onChange={(e) =>
                    setLoginD({ ...loginD, Pwd: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <Button
                  onClick={logIn}
                  style={{ backgroundColor: GConf.themeColor, color: "white" }}
                  className="shadow-sm w-login-input"
                >
                  <Icon name="sign in" /> Connextion{" "}
                  <Loader
                    inverted
                    active={loaderState}
                    inline
                    size="tiny"
                    className="ms-2 text-danger"
                  />
                </Button>
              </div>
              <br />
              <Divider horizontal className="w-login-input">
                <Header as="h4">
                  <Icon circular inverted name="thumbtack" color="yellow" />
                </Header>
              </Divider>
              {GConf.SubSystemLink.map((data, index) => (
                <SubSystemLink key={index} data={data} />
              ))}
            </Bounce>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogIn;
