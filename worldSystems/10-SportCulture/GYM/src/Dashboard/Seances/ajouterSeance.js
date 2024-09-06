import React, { useEffect, useState } from 'react';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import GConf from '../../AssetsM/generalConf';
import { Bounce } from 'react-reveal';
import { Button, Icon, Input, Loader } from 'semantic-ui-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { QrReader } from 'react-qr-reader';

function AjouterCamion() {
    /*#########################[Const]##################################*/
    const Today = new Date()
    const [abonnementListe ,setAbonnementListe] = useState([])
    const [seanceD, setSeanceD] = useState({SE_Date: Today.toISOString().split('T')[0] , SE_Time: new Date().toLocaleTimeString([],{ hourCycle: 'h23'})})
    const [selectedForfait, setSelectedForfait] = useState()
    const [scanResultSeance, setScanResultSeance] = useState(false);

    const [saveBtnState, setSaveBtnState] = useState(false)
    const [loaderState, setLS] = useState(false)
 
    

    let Offline = JSON.parse(localStorage.getItem(`${GConf.PID}_Offline`));

    /* ############################### UseEffect ########################*/
    useEffect(() => {
            axios.post(`${GConf.ApiLink}/abonnement`, {
                PID : GConf.PID,
            })
            .then(function (response) {
                setAbonnementListe(response.data)
                 
            }).catch((error) => {
                setAbonnementListe([])
            });
        }, [])
    /*#########################[Function]##################################*/
    const SaveSeance = () => {
        if (!seanceD.Abonnement_ID) {toast.error("Abonnement Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.Membre_ID) {toast.error("Membre Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.SE_Date) {toast.error("Date Invalide !", GConf.TostErrorGonf)}
        else if (!seanceD.SE_Time) {toast.error("Temps Invalide !", GConf.TostErrorGonf)}
        else{
                console.log(seanceD)
                setLS(true)
                axios.post(`${GConf.ApiLink}/seances/ajouter`, {
                    PID : GConf.PID,
                    seanceD : seanceD,
                }).then(function (response) {
                    if(response.data.affectedRows) {
                        toast.success("Seance Ajouteé !", GConf.TostSuucessGonf)
                        setSaveBtnState(true)
                        setLS(false)
                    }
                    else {
                            toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                            setLS(false)
                        }
                }).catch((error) => {
                    if(error.request) {
                      toast.error(<><div><h5>Probleme de Connextion</h5> Le Camion sera enregistrer sur votre ordinateur   </div></>, GConf.TostInternetGonf)   
                      Offline.camionToSave.push(seanceD)
                      localStorage.setItem(`${GConf.PID}_Offline`,  JSON.stringify(Offline));
                      setLS(false)

                    }
                });
                    
            }        
    }
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
    const SelectForfaitFunc = (abID) =>{
        let selectedAB =  abonnementListe.find(abonmt => abonmt.AB_ID == abID)
        if (selectedAB) {
            setSelectedForfait(selectedAB)
            setSeanceD({...seanceD, Abonnement_ID : selectedAB.AB_ID , Membre_ID : selectedAB.ME_ID })
        } else {
            toast.error('Abonnement Introuvable ', GConf.TostSuucessGonf)
        }
    }

    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.CamionAdd} />
            <br />
            <Bounce left>
                <div className='row'>
                    <div className='col-12 col-lg-8'>
                        <div className='p-1  mb-2'>
                            <h5 className='mb-0 text-secondary '> Mmebre  </h5>
                            <datalist id="clientList">
                                {abonnementListe.map((test) =>
                                <option key={test.AB_ID}  value={test.AB_ID}>{test.ME_Name} : {test.F_Name}</option>
                                )}
                            </datalist>
                            <Input icon='add user' onKeyPress={event => OnKeyPressFunc(event)} list="clientList" placeholder={seanceD.Membre_ID}   onBlur={ (e) => SelectForfaitFunc(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1 shadow-sm' />
                        </div> 
                        <div className='card-body border-div mb-4 mt-1 mb-3 bg-gray'>
                            <div><b> <span className='bi bi-person '></span> Nom  </b> : {selectedForfait ?  selectedForfait.ME_Name : '' } </div>
                            <div><b><span className='bi bi-star '></span> Forfait </b> : {selectedForfait ?  selectedForfait.F_Name : '' } </div>
                            <div><b><span className='bi bi-coin '></span> Etat </b> : {selectedForfait ?  selectedForfait.State : '' } </div>
                        </div>

                        <div className='row'>
                            <div className='col-6'>
                                <h5 className='mb-0 mt-2 text-secondary '> Date  </h5>
                                <Input icon='calendar alternate' type='date' placeholder='date'  iconPosition='left'   fluid className='mb-1 shadow-sm' value={seanceD.SE_Date} onChange={(e) => setSeanceD({...seanceD, SE_Date: e.target.value })}/> 
                            </div>
                            <div className='col-6'>
                                <h5 className='mb-0 mt-2 text-secondary '> Depart   </h5>
                                <Input icon='time' type='time' onKeyPress={event => OnKeyPressFunc(event)}  iconPosition='left' placeholder='Temps'  fluid className='mb-1 shadow-sm'  value={seanceD.SE_Time}  onChange={(e) => setSeanceD({...seanceD, SE_Time : e.target.value })}/>
                            </div>
                        </div> 
                        <div className='text-end mb-5 mt-3'>
                            <Button  onClick={() => SaveSeance()} disabled={saveBtnState}  className='text-end rounded-pill bg-system-btn ' positive>  <Icon name='save outline' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                        </div>
                    </div>
                    <div className='col-lg-4 d-none d-lg-block align-self-center'>
                        {scanResultSeance ? 
                            (
                            <QrReader
                                    constraints={{  facingMode: 'environment' }}
                                    scanDelay={500}
                                    onResult={(result, error) => {
                                    if (!!result) {  SelectForfaitFunc(result.text); setScanResultSeance(false) }
                                    if (!!error) { console.log(error);  }
                                    }}
                                    style={{  width: "150px",height: "150px" }}
                            />
                            ) : (
                                <div className='text-center mt-4'>
                                    <Button onClick={() => setScanResultSeance(true)}>Cliquer Pour Scanner</Button>
                                </div>
                            )}
                    </div>
                </div>
            </Bounce>
    </> );
}

export default AjouterCamion;