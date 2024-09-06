import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { Button, Dropdown, Select } from 'semantic-ui-react';
import { Icon } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useTranslation, Trans } from 'react-i18next';

const AddCard = ({teamListe, presenceD , setPresenceData , Ajouter }) =>{
  const { t, i18n } = useTranslation();
  const Genres = [
    {key: 1 , text: t('menuTabs.teamPage.presencePage.presence'), value:'P'},
    {key: 1 , text: t('menuTabs.teamPage.presencePage.absance'), value:'A'},
  ]
  return<>
    <div className="sticky-top" style={{top:'70px'}}>
        <div className='card card-body shadow-sm border-div mb-2'>
            <h5> {t('menuTabs.teamPage.presencePage.selectMembre')}</h5> 
             
            <datalist id="teamListe">
                {teamListe.map((team,index) =>
                <option key={index} value={team.T_ID}>{team.T_Name} - {team.Poste}</option>
                )}
            </datalist>
            <Input icon='users'  placeholder={t('menuTabs.teamPage.presencePage.membrePlch')} list="teamListe"  onChange={ (e) => setPresenceData({...presenceD, Team_ID:e.target.value})} size="small" iconPosition='left' value={presenceD.Team_ID}  fluid className='mb-1 shadow-sm' /> 
            <h5 className='mt-2 mb-1'>{t('menuTabs.teamPage.presencePage.genre')}</h5>
            {/* <Select placeholder='Selectionez Genre' options={Genres} onChange={ (e) => setPresenceData({...presenceD, Genre:e.target.value})} /> */}
            <Dropdown
                fluid
                search
                selection
                wrapSelection={false}
                options={Genres}
                placeholder={presenceD.Genre}
                className='mb-1'
                onChange={(e, { value }) => setPresenceData({...presenceD, Genre: value })}
                value={presenceD.Genre}
            /> 
            
            <h5 className='mt-2 mb-1'> {t('menuTabs.teamPage.presencePage.date')} </h5> 
            <Input icon='asl' type='date'      onChange={ (e) => setPresenceData({...presenceD, PR_Date: e.target.value})} defaultValue={presenceD.PR_Date} size="small" iconPosition='left' placeholder={t('menuTabs.teamPage.presencePage.date')}  fluid className='mb-1 shadow-sm' />
            <br />
            <Button disabled={false}  className='rounded-pill bg-system-btn' onClick={Ajouter}>  <Icon name='edit outline' /> {t('menuTabs.teamPage.presencePage.addBtn')} </Button>
        </div>
    </div>
    </>
}

function TeamDemande() {
    /*#########################[Const]##################################*/
    const { t, i18n } = useTranslation();
    const Today = new Date()
    let  [presenceListe, setPresenceListe] = useState([]); 
    let  [teamListe, setTeamList] = useState([]); 
    let  [presenceD, setPresenceData] = useState({Team_ID:'', PR_Date: Today.toISOString().split('T')[0]}); 
    
    /*#########################[UseEffect]##################################*/
      useEffect(() => {
          axios.post(`${GConf.ApiLink}/team/presence`, {
              PID :  GConf.PID ,
            })
            .then(function (response) {
              console.log(new Date(response.data[0].PR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ))
              //new Date(getData.PR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )
              let calendarData = []
              response.data.map( (getData) => calendarData.push( { title: getData.T_Name , date: new Date(getData.PR_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}))
              setPresenceListe(calendarData)

            }).catch((error) => {
              if(error.request) {
                toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
              }
          });

          axios.post(`${GConf.ApiLink}/team`, {
              PID: GConf.PID,
            }).then(function (response) {
              setTeamList(response.data)
            }).catch((error) => {
                  if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
                  }
          });

      }, [])

    /*#########################[Functions]##################################*/
      const  Ajouter = () =>{
          if (!presenceD.Team_ID) { toast.error("Memebre Invalide !", GConf.TostErrorGonf) } 
          else if (!presenceD.PR_Date) { toast.error("Valeur Invalide !", GConf.TostErrorGonf) } 
          else if (!presenceD.Genre) { toast.error("Genre Invalide !", GConf.TostErrorGonf) } 
          else {
              axios.post(`${GConf.ApiLink}/team/presence/ajoute`, {
                  PID :  GConf.PID ,
                  presenceD : presenceD
                })
                .then(function (response) {
                  toast.success("Avance Ajouter  !", GConf.TostSuucessGonf)   
                  
              }).catch((error) => {
                  if(error.request) {
                    toast.error(<><div><h5>Probleme de Connextion</h5> Chargemment des ancien Camion  </div></>, GConf.TostInternetGonf)   
                  }
                });
          }
      }
      const GenerateDate = function(str, days) {
        var myDate = new Date(str);
        myDate.setDate(myDate.getDate() + parseInt(days));
        return myDate.toISOString().split('T')[0];
      }
    /*#########################[Card]##################################*/
    

    return ( <>
            <BreadCrumb links={GConf.BreadCrumb.TeamDemande} bcTag='TeamDemande' />
            <br />
            <div className='container'>
                <div className='row'>
                    <div className='col-12 col-lg-4'><AddCard teamListe={teamListe} presenceD={presenceD} setPresenceData={setPresenceData} Ajouter={Ajouter} /></div>
                    <div className='col-12 col-lg-8'>
                      <div className='card card-body shadow-sm border-div mb-2'>
                          <FullCalendar 
                              plugins={[ dayGridPlugin ]}
                              initialView="dayGridMonth"
                              locale='fr' 
                              events={presenceListe}
                              height='450px'
                              navLinks ={true}
                          />
                      </div>
                    </div>
                </div>
            </div>
    </> );
}

export default TeamDemande;