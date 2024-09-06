import React, { useEffect, useState } from "react";
import GConf from "../../AssetsM/generalConf";
import TunMap from "../../AssetsM/tunMap";
import BreadCrumb from "../../AssetsM/Cards/breadCrumb";
import {
  Button,
  Divider,
  Icon,
  Input,
  Statistic,
  Form,
  Loader,
  Select,
  TextArea,
  Dropdown,
} from "semantic-ui-react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tab } from "semantic-ui-react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { _ } from "gridjs-react";
import SKLT from "../../AssetsM/Cards/usedSlk";
import TableGrid from "../../AssetsM/Cards/tableGrid";
import { toast } from "react-toastify";
import useSaveNotification from "../../AssetsM/Hooks/saveNotifFunction";
import { useNavigate } from "react-router-dom";
import WorldMap from '../../AssetsM/wordMap';

const EditClientCard = ({
  clientD,
  setClientD,
  OnKeyPressFunc,
  EditClient,
  delegList,
  GetDelegList,
  loaderState,
  grouListe,
  gouvList
}) => {
  return (
    <>
      <div className="p-1">
        <div className="p-1 mb-2">
          <h5 className="mb-1">CIN:</h5>
          <Input
            icon="key"
            iconPosition="left"
            onKeyPress={(event) => OnKeyPressFunc(event)}
            placeholder="Matricule Fiscale"
            className="w-100 border-0 shadow-sm rounded mb-1"
            value={clientD.CIN}
            onChange={(e) => setClientD({ ...clientD, CIN: e.target.value })}
          />
        </div>
        <div className="p-1  mb-2">
          <h5 className="mb-1">Nom Et Prenon :</h5>
          <Input
            icon="user"
            iconPosition="left"
            onKeyPress={(event) => OnKeyPressFunc(event)}
            placeholder="Nom Et Prenon "
            className="w-100 border-0 shadow-sm rounded mb-1"
            value={clientD.ME_Name}
            onChange={(e) =>
              setClientD({ ...clientD, ME_Name: e.target.value })
            }
          />
        </div>
        <div className="p-1 mb-2">
          <h5 className="mb-1">Telephone :</h5>
          <Input
            icon="phone"
            iconPosition="left"
            onKeyPress={(event) => OnKeyPressFunc(event)}
            placeholder="Telephone "
            className="w-100 border-0 shadow-sm rounded mb-1"
            value={clientD.Phone}
            onChange={(e) => setClientD({ ...clientD, Phone: e.target.value })}
          />
        </div>
        <div className="p-1 mb-2">
          <h5 className="mb-1">
            Geolocation : {clientD.Gouv} , ({clientD.Deleg}){" "}
          </h5>
          <Select
            placeholder="Selectionnez Gouvernorat"
            fluid
            className="mb-2"
            options={gouvList}
            value={clientD.Gouv}
            onChange={(e, { value }) => GetDelegList(value)}
          />
          <Select
            placeholder="Selectionnez Delegation "
            fluid
            value={clientD.Deleg}
            options={delegList}
            onChange={(e, { value }) =>
              setClientD({ ...clientD, Deleg: value })
            }
          />
        </div>
        <h5 className='mb-0 mt-2 text-secondary '>Groupe  </h5>
        <Dropdown
                search
                fluid
                selection
                wrapSelection={false}
                options={grouListe}
                placeholder={'Groupe'}
                className='mb-1 shadow-sm'
                onChange={(e, { value }) => setClientD({...clientD, Group_ID: value })}
                value={clientD.Group_ID}
            /> 
        <div className="p-1 mb-2">
          <h5 className="mb-1"> Adresse:</h5>
          <Form>
            <TextArea
              rows="3"
              onKeyPress={(event) => OnKeyPressFunc(event)}
              placeholder="designer votre article"
              className="w-100 shadow-sm rounded mb-3"
              value={clientD.Adress}
              onChange={(e) =>
                setClientD({ ...clientD, Adress: e.target.value })
              }
            />
          </Form>
        </div>
        <div className="text-end mb-5">
          <Button
            onClick={EditClient}
            className="text-end rounded-pill bg-system-btn "
            positive
          >
            {" "}
            <Icon name="save outline" /> Modifier{" "}
            <Loader
              inverted
              active={loaderState}
              inline
              size="tiny"
              className="ms-2 text-danger"
            />{" "}
          </Button>
        </div>
      </div>
    </>
  );
};
const FindInDirectory = ({
  inAbyedhSearch,
  saveBtnRUIState,
  clientD,
  setInAbyedhSearchUID,
  FindInDirectoryFunc,
  loaderState,
  OnKeyPressFunc,
  dataInAbyedh,
  RelateToUID,
}) => {
  return (
    <>
      {clientD.Releted_UID ? (
        <div className="row card-body">
          <div className="col-9">
            <h5 className="text-danger text-left">
              <b>Ce Client est Verifier : </b>
            </h5>
            <h1 className="display-4">{clientD.Releted_UID}</h1>
          </div>
          <div className="col-lg-3 d-none d-lg-block align-self-center">
            <div className="text-center">
              <img
                src="https://assets.ansl.tn/Images/usful/clientVerifier.svg"
                width="100%"
                height="100px"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col-6">
            <div className="card card-body border">
              <h5>Recherche Dans La Base Abyedh </h5>
              <Input
                className="mb-4"
                placeholder="UID"
                onKeyPress={(event) => OnKeyPressFunc(event)}
                value={inAbyedhSearch}
                onChange={(e) => setInAbyedhSearchUID(e.target.value)}
              />
              <div className="text-end">
                <Button
                  disabled={clientD.Releted_UID}
                  className="bg-system-btn rounded-pill"
                  fluid
                  onClick={() => FindInDirectoryFunc()}
                >
                  {" "}
                  <Icon name="search" /> Recherche{" "}
                  <Loader
                    inverted
                    active={loaderState}
                    inline
                    size="tiny"
                    className="ms-2"
                  />
                </Button>
              </div>
            </div>
          </div>
          <div className="col-6">
            <h5 className="text-secondary mt-1 mb-0">
              Nom: {dataInAbyedh.Name}
            </h5>
            <h5 className="text-secondary mt-1 mb-0">
              Phone: {dataInAbyedh.PhoneNum}
            </h5>
            <h5 className="text-secondary mt-1 mb-0">
              Gouv: {dataInAbyedh.BirthGouv}
            </h5>
            <h5 className="text-secondary mt-1 mb-0">
              Deleg: {dataInAbyedh.BirthDeleg}
            </h5>
            <h5 className="text-secondary mt-1 mb-0">
              {" "}
              Photo: {dataInAbyedh.Name}
            </h5>
          </div>
          <div className="col-12 text-end">
            <Button
              disabled={saveBtnRUIState}
              className="bg-success text-white rounded-pill"
              onClick={() => RelateToUID()}
            >
              {" "}
              <Icon name="check" /> Verifieé{" "}
              <Loader
                inverted
                active={loaderState}
                inline
                size="tiny"
                className="ms-2"
              />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

function ClientInfo() {
  /* ############################### Const ################################*/
  const { CLID } = useParams();
  const [clientD, setClientD] = useState([]);
  const [position, setPosition] = useState([36.1772, 9.12337]);

  const [reservationListe, setReservation] = useState([]);
  const [commande, setCommande] = useState([]);
  const [factures, setFactures] = useState([]);
  const [grouListe, setGroupListe] = useState([]);
  const [inAbyedhSearch, setInAbyedhSearchUID] = useState();
  const [dataInAbyedh, setDataInAbyedh] = useState([]);
  const [saveBtnRUIState, setSaveBtnRUIState] = useState(true);
  const [gouvList ,setGouvListe] = useState([])
  const [loading, setLoading] = useState(false);
  const [loaderState, setLS] = useState(false);
  const [delegList, setDelegList] = useState([]);

  const navigate = useNavigate();

  const panes = [
    {
      menuItem: { key: "home", icon: "home", content: "Abonn." },
      render: () => (
        <>
          <TableGrid
            tableData={factures}
            columns={["ID", "Forfait", "Saisson", "Depart", "Temps", "Voir"]}
          />
          <br />
        </>
      ),
    },
    {
      menuItem: {
        key: "commande",
        icon: "calendar alternate",
        content: "Seances",
      },
      render: () => (
        <TableGrid
          tableData={commande}
          columns={["ID", "Forfait", "Jour", "Temps", "Etat", "Voir"]}
        />
      ),
    },
    {
      menuItem: {
        key: "Reservation",
        icon: "calendar alternate",
        content: "Souscription",
      },
      render: () => (
        <TableGrid
          tableData={reservationListe}
          columns={["ID", "Client", "Jour", "Temps", "Totale", "Voir"]}
        />
      ),
    },
    {
      menuItem: { key: "edit", icon: "edit", content: "Modifier" },
      render: () => (
        <>
          <Tab.Pane className="border-div" attached={false}>
            <EditClientCard
            gouvList= {gouvList}
              grouListe={grouListe}
              OnKeyPressFunc={OnKeyPressFunc}
              clientD={clientD}
              setClientD={setClientD}
              EditClient={EditClient}
              delegList={delegList}
              GetDelegList={GetDelegList}
              loaderState={loaderState}
            />
          </Tab.Pane>
          <br />
        </>
      ),
    },
    {
      menuItem: { key: "verif", icon: "edit", content: "Verif." },
      render: () => (
        <>
          <Tab.Pane className="border-div" attached={false}>
            <FindInDirectory
              clientD={clientD}
              RelateToUID={RelateToUID}
              saveBtnRUIState={saveBtnRUIState}
              inAbyedhSearch={inAbyedhSearch}
              setInAbyedhSearchUID={setInAbyedhSearchUID}
              FindInDirectoryFunc={FindInDirectoryFunc}
              loaderState={loaderState}
              OnKeyPressFunc={OnKeyPressFunc}
              dataInAbyedh={dataInAbyedh}
            />
          </Tab.Pane>
          <br />
        </>
      ),
    },
    {
      menuItem: {
        key: "delete",
        icon: "trash alternate",
        content: "Supp",
      },
      render: () => (
        <>
          <Tab.Pane className="border-div" attached={false}>
            <DeleteClient />
          </Tab.Pane>
          <br />
        </>
      ),
    },
  ];
  L.Icon.Default.mergeOptions(GConf.LeafleftIcon);
  const SaveNotification = (genre, tag, table) => {
    useSaveNotification(genre, tag, table);
  };

  /* ############################### UseEffect ################################*/
  useEffect(() => {
    //client Info
    axios
      .post(`${GConf.ApiLink}/membres/info`, {
        PID: GConf.PID,
        membreId: CLID,
      })
      .then(function (response) {
        if (!response.data.Data.PK) {
          toast.error("Client Introuvable !", GConf.TostSuucessGonf);
          setTimeout(() => {
            window.location.href = "/S/mb";
          }, 2000);
        } else {
          console.log(response.data);
          setClientD(response.data.Data);

          let factureTable = [];
          response.data.Abonnement.map((getData, index) =>
            factureTable.push([
              getData.AB_ID,
              getData.F_Name,
              getData.AB_Saisson,
              new Date(getData.AB_Depart_Date)
                .toLocaleDateString("fr-FR")
                .split("/")
                .reverse()
                .join("-"),
              getData.AB_Depart_Time,
              _(
                <Button
                  className="rounded-pill bg-system-btn"
                  size="mini"
                  onClick={(e) =>
                    NavigateFunction(`/S/ab/info/${getData.AB_ID}`)
                  }
                >
                  <span className="d-none d-lg-inline"> Info </span>
                  <Icon name="angle right" />
                </Button>
              ),
            ])
          );
          setFactures(factureTable);

          let commandeTable = [];
          response.data.Seances.map((getData, index) =>
            commandeTable.push([
              getData.SE_ID,
              getData.F_Name,
              new Date(getData.SE_Date)
                .toLocaleDateString("fr-FR")
                .split("/")
                .reverse()
                .join("-"),
              getData.SE_Time,
              _(<StateSeanceCard status={getData.SE_State} />),
              _(
                <Button
                  className="rounded-pill bg-system-btn"
                  size="mini"
                  onClick={(e) =>
                    NavigateFunction(`/S/sa/info/${getData.SE_ID}`)
                  }
                >
                  <span className="d-none d-lg-inline"> Info </span>
                  <Icon name="angle right" />
                </Button>
              ),
            ])
          );
          setCommande(commandeTable);

          let reservationTable = [];
          response.data.Souscription.map((getData, index) =>
            reservationTable.push([
              getData.R_ID,
              response.data.Data.ME_Name,
              new Date(getData.R_Date)
                .toLocaleDateString("fr-FR")
                .split("/")
                .reverse()
                .join("-"),
              getData.Table_Num,
              _(<StateCard status={getData.State} />),
              _(
                <Button
                  className="rounded-pill bg-system-btn"
                  size="mini"
                  onClick={(e) =>
                    NavigateFunction(`/S/rq/cm/info/${getData.R_ID}`)
                  }
                >
                  <span className="d-none d-lg-inline"> Info </span>
                  <Icon name="angle right" />
                </Button>
              ),
            ])
          );
          setReservation(reservationTable);

          setLoading(true);
        }
      })
      .catch((error) => {
        if (error.request) {
          toast.error(
            <>
              <div>
                <h5>Probleme de Connextion</h5> Impossible de charger les info
                du client{" "}
              </div>
            </>,
            GConf.TostInternetGonf
          );
          setClientD([]);
          setPosition([0, 0]);
          setLoading(true);
        }
      });

      axios.post(`${GConf.ApiLink}/groupe`,{
          PID: GConf.PID
      })
      .then(function (response) {
          let forfaitToListe = [] 
          response.data.map((data,index) => forfaitToListe.push({
              key: index ,
              text: data.GP_Name,
              value: data.GP_ID
          }))
          setGroupListe(forfaitToListe)
      }).catch((error) => {
          if(error.request) {
          toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des client sur votre ordinateur  </div></>, GConf.TostInternetGonf)   
            
          }
      });

      BuildGouvList(WorldMap.states.filter(state => state.country === GConf.Country))
  }, []);

  /* ############################### Functions ################################*/
  const NavigateFunction = (link) => {
    navigate(link);
  };

  
  const BuildGouvList = (listeValue) => {
      let toAddVlaue = [];
      listeValue.map((data,index) => toAddVlaue.push({id:index, text:data.name, value:data.name}))
      setGouvListe(toAddVlaue)
  }
  const GetDelegList = (value) =>{
      setClientD({...clientD, Gouv: value })
      const found = WorldMap[GConf.Country].filter(element => element.Gouv === value)
      let toAddVlaue = [];
      found.map((data,index) => toAddVlaue.push({id:index, text:data.name, value:data.name}))
      setDelegList(toAddVlaue)
  }

  const EditClient = () => {
    if (!clientD.CIN) {
      toast.error("Matricule Invalide !", GConf.TostErrorGonf);
    } else if (!clientD.ME_Name) {
      toast.error("Nom Invalide !", GConf.TostErrorGonf);
    } else if (!clientD.Phone) {
      toast.error("Phone Invalide !", GConf.TostErrorGonf);
    } else if (!clientD.Gouv) {
      toast.error("Gouvernorat Invalide !", GConf.TostErrorGonf);
    } else if (!clientD.Adress) {
      toast.error("Adresee Invalide !", GConf.TostErrorGonf);
    } else {
      setLS(true);
      axios
        .post(`${GConf.ApiLink}/membres/modifier`, {
          PID: GConf.PID,
          clientD: clientD,
        })
        .then(function (response) {
          if (response.data.affectedRows) {
            toast.success("Client Modifier !", GConf.TostSuucessGonf);
            //SaveNotification('clientEdit',GConf.PID, clientD)
            setLS(false);
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
                  <h5>Probleme de Connextion</h5> Impossible de modifier le
                  client{" "}
                </div>
              </>,
              GConf.TostInternetGonf
            );
            setLS(false);
          }
        });
    }
  };
  const DeleteClientFunc = () => {
    setLS(true);
    axios
      .post(`${GConf.ApiLink}/membres/supprimer`, {
        PID: GConf.PID,
        clientId: CLID,
      })
      .then(function (response) {
        if (response.data.affectedRows) {
          toast.success("Client Supprimer !", GConf.TostSuucessGonf);
          setLS(false);
          setTimeout(() => {
            window.location.href = "/S/cl";
          }, 500);
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
                <h5>Probleme de Connextion</h5> Impossible de supprimer le
                client{" "}
              </div>
            </>,
            GConf.TostInternetGonf
          );
          setLS(false);
        }
      });
  };
  const FindInDirectoryFunc = () => {
    if (!inAbyedhSearch) {
      toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf);
    } else {
      setLS(true);
      axios
        .post(`${GConf.ApiLink}/membres/checkAbyedhDb`, {
          UID: inAbyedhSearch,
        })
        .then(function (response) {
          if (response.data.length != 0) {
            toast.success("Client Existe !", GConf.TostSuucessGonf);
            setLS(false);
            setSaveBtnRUIState(false);
            setDataInAbyedh(response.data);
          } else {
            toast.error("Pas De Clients ", GConf.TostSuucessGonf);
            setLS(false);
          }
        })
        .catch((error) => {
          if (error.request) {
            toast.error(
              <>
                <div>
                  <h5>Probleme de Connextion</h5>{" "}
                </div>
              </>,
              GConf.TostInternetGonf
            );
            setLS(false);
          }
        });
    }
  };
  const RelateToUID = () => {
    if (!inAbyedhSearch) {
      toast.error("Entrer Un Code A Barre  !", GConf.TostErrorGonf);
    } else {
      setLS(true);
      axios
        .post(`${GConf.ApiLink}/membres/verification`, {
          PID: GConf.PID,
          UID: inAbyedhSearch,
          ME_ID: CLID,
        })
        .then(function (response) {
          if (response.data.affectedRows) {
            toast.success("Client Verifieé !", GConf.TostSuucessGonf);
            setLS(false);
            setSaveBtnRUIState(true);
            setClientD({ ...clientD, Releted_UID: inAbyedhSearch });
          } else {
            toast.error("Pas De Clients ", GConf.TostSuucessGonf);
            setLS(false);
          }
        })
        .catch((error) => {
          if (error.request) {
            toast.error(
              <>
                <div>
                  <h5>Probleme de Connextion</h5>{" "}
                </div>
              </>,
              GConf.TostInternetGonf
            );
            setLS(false);
          }
        });
    }
  };
  const OnKeyPressFunc = (e) => {
    if (
      !(
        (e.charCode >= 65 && e.charCode <= 90) ||
        (e.charCode >= 97 && e.charCode <= 122) ||
        (e.charCode >= 48 && e.charCode <= 57) ||
        e.charCode == 42 ||
        e.charCode == 32 ||
        e.charCode == 47
      )
    ) {
      e.preventDefault();
    }
  };
  /* ############################### Card ################################*/
  const ClientCard = () => {
    return (
      <>
        <div className="sticky-top" style={{ top: "70px" }}>
          <div className="card card-body shadow-sm mb-2 border-div">
            <div className="upper">
              <div className="mcbg main-big-card"></div>
            </div>
            <div className="img-card-container text-center">
              <div className="card-container">
                <img
                  src="https://cdn.abyedh.com/images/system/gym/membre.jpg"
                  className="rounded-circle"
                  width="80"
                />
              </div>
            </div>
            <div className="mt-5 text-center">
              <h4 className="mt-2">
                {loading ? clientD.ME_Name : SKLT.BarreSkl}{" "}
              </h4>
              <h6 className="text-secondary">
                {" "}
                {loading ? (
                  <>
                    <span className="bi bi-geo-alt-fill"></span>{" "}
                    {clientD.Adress}{" "}
                  </>
                ) : (
                  SKLT.BarreSkl
                )}{" "}
              </h6>
              <h6 className="text-secondary">
                {" "}
                {loading ? (
                  <>
                    <span className="bi bi-geo-fill"></span> {clientD.Gouv} , (
                    {clientD.Deleg})
                  </>
                ) : (
                  SKLT.BarreSkl
                )}{" "}
              </h6>
              <Divider horizontal className="text-secondary mt-4">
                Groupe
              </Divider>
              <div className="row text-center">
                <div className="col-12">
                  {loading ? (
                    <Statistic color="red" size="tiny">
                      <Statistic.Value>
                      {clientD.GP_Name}
                      </Statistic.Value>
                    </Statistic>
                  ) : (
                    SKLT.BarreSkl
                  )}
                </div>
              </div>
              <Divider horizontal className="text-secondary mt-4">
                Telephone
              </Divider>
              <div className="row text-center">
                <div className="col-12 mb-3">
                  {loading ? (
                    <Statistic color="green" size="tiny">
                      <Statistic.Value>{clientD.Phone}</Statistic.Value>
                    </Statistic>
                  ) : (
                    SKLT.BarreSkl
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
  const PositionCard = () => {
    return (
      <>
        <div className="p-1">
          <h5>Location</h5>
          <MapContainer
            center={position}
            zoom={9}
            scrollWheelZoom={false}
            className="map-height"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup></Popup>
            </Marker>
          </MapContainer>
        </div>
      </>
    );
  };
  const DeleteClient = () => {
    return (
      <>
        <h3 className="text-secondary">
          Voulez-Vous Vraimment Supprimer Ce Membre ?
        </h3>
        <div className="row">
          <div className="col-9">
            <h5 className="text-danger text-left">
              <b>Lorsque Vous Supprimer Un Membre : </b>
            </h5>
            <ul className="text-info text-left">
              <li>le Membre ne sera pas visible dans la branche 'Membres'</li>
              <li>
                Tous les Abonnement et les seances relier a ce Membre peut
                s'endomager{" "}
              </li>
              <li>
                vous ne pouver pas passer ni abonnemment ni seance avec ce
                Membres autremment{" "}
              </li>
            </ul>
          </div>
          <div className="col-lg-3 d-none d-lg-block align-self-center">
            <div className="text-center">
              <img
                src="https://assets.ansl.tn/Images/usful/delete.svg"
                width="80%"
                height="80px"
              />
            </div>
          </div>
        </div>
        <div className="text-end">
          <button
            type="submit"
            name="add"
            className="btn btn-danger rounded-pill"
            onClick={DeleteClientFunc}
          >
            <span className="bi bi-check"></span> Oui, Supprimer{" "}
            <Loader
              inverted
              active={loaderState}
              inline
              size="tiny"
              className="ms-2 text-danger"
            />{" "}
          </button>
        </div>
      </>
    );
  };
  const StateCard = ({ status }) => {
    const StateCard = (props) => {
      return <span className={`badge bg-${props.color}`}> {props.text} </span>;
    };
    const statusCard = React.useCallback(() => {
      switch (status) {
        case "W":
          return <StateCard color="warning" text="En Attent" />;
        case "S":
          return <StateCard color="info" text="Vu" />;
        case "A":
          return <StateCard color="success" text="Acepteé" />;
        case "R":
          return <StateCard color="danger" text="Refuseé" />;
        default:
          return <StateCard color="secondary" text="Indefinie" />;
      }
    }, [status]);

    return <div className="container">{statusCard()}</div>;
  };
  const StateSeanceCard = ({ status }) => {
    const StateCard = (props) => {
      return <span className={`badge bg-${props.color}`}> {props.text} </span>;
    };
    const statusCard = React.useCallback(() => {
      switch (status) {
        case "C":
          return <StateCard color="warning" text="En Cours" />;
        case "A":
          return <StateCard color="danger" text="Annuleé" />;
        case "T":
          return <StateCard color="success" text="Termineé" />;
        default:
          return <StateCard color="secondary" text="Indefinie" />;
      }
    }, [status]);

    return <div className="container">{statusCard()}</div>;
  };
  return (
    <>
      <BreadCrumb links={GConf.BreadCrumb.ClientInfo} />
      <br />
      <div className="row">
        <div className="col-12 col-lg-4">
          <ClientCard />
        </div>
        <div className="col-12 col-lg-8 ">
          <Tab
            menu={{ secondary: true, pointing: true, className: "wrapped" }}
            panes={panes}
          />
        </div>
      </div>
    </>
  );
}

export default ClientInfo;
