import React, { useEffect, useState} from 'react';
import { Bounce } from 'react-reveal';
import { Button, Statistic } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';
import LinkCard from './Assets/linksCard'
import InputLinks from './Assets/linksData'
import CountUp from 'react-countup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function InputLandingPage() {
    //const 
    let CmdData = JSON.parse(localStorage.getItem(`${GConf.SystemTag}_Cmd_LocalD`));
    let UID = CmdData.CID;
    let Name = CmdData.Name;

    const [statData, setStatData] = useState([])

    //UseEffects
    useEffect(() => {
        const CommandeIsLogged = localStorage.getItem(`${GConf.SystemTag}_Cmd_LocalD`);
        if (!CommandeIsLogged) {window.location.href = "/C/logIn";}   

        axios.post(`${GConf.ApiCommandeLink}/Landing`, {
            tag: GConf.SystemTag,
            UID: UID,
          })
          .then(function (response) {
            setStatData(response.data[0])
          })
    }, [])

    //functions
    const logOutInput = () =>{    
        localStorage.clear();
        window.location.href = "/C";
    }

    //card
    const MainTopCard = () =>{
        return(<>
            <div className='card p-3 fixed-top border-0 shadow-sm rounded-0'>
                <div className='row'>
                    <div className='col-9 align-self-center'><h2> <span className="badge bg-warning"> <span className='bi bi-person-circle '></span>  {Name}  </span>  </h2></div>
                    <div className='col-1 align-self-center' >
                        <NavLink to='up' exact="true" className={({ isActive }) => isActive ? "ps-1 pe-1 abyedh-list-a-s" : "ps-1 pe-1 abyedh-list"}><i className="bi bi-cloud-arrow-down fa-lg "></i></NavLink>
                    </div>
                    <div className='col-2 align-self-center' ><Button onClick={logOutInput} style={{backgroundColor:GConf.themeColor}} className='rounded-circle text-white' icon='log out' /></div>
                </div>
            </div>
        </>)
    }
    const StatCard = (props) =>{
        return(<>
            <Statistic color={props.color}>
                <Statistic.Value><CountUp end={props.value} /></Statistic.Value>
                <Statistic.Label>{props.title}</Statistic.Label>
            </Statistic>
        </>)
    }
    return ( <>
            <MainTopCard />
            <br />                
            <br />                
            <br />                
            <br />   
            <br />   
            <br />   
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-12 mb-4'>
                        <div className='row'>
                            <div className='col-4 mb-4 text-center border-end'>
                                <StatCard title='Accepteé' value={statData.Accepte} color='teal'/>
                            </div>
                            <div className='col-4 mb-4 text-center border-end'>
                                <StatCard title='En Attent' value={statData.Waiting} color='yellow' />
                            </div>
                            <div className='col-4 mb-4 text-center'>
                                <StatCard title='Refuseé' value={statData.Refuse} color='red' />
                            </div>
                            <div className='col-6 mb-4 text-center border-end d-none'>
                                <StatCard title='Articles' value={statData.articlesNum} color='brown' />
                            </div>
                            <div className='col-6 mb-4 text-center d-none'>
                                <StatCard title='Client' value={statData.clientsNum} color='violet' />
                            </div>
                        </div>
                    </div>
                </div>
                <br /> 
                <br /> 
                
                <h3>Commandes</h3> 
                <div className='row'>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[0]} /> </div>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[1]} /> </div>
                </div> 
                <h3>Stock</h3>
                <div className='row'>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[2]} /> </div>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[3]} /> </div>
                </div> 
                <h3>Clients</h3>
                <div className='row'>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[4]} /> </div>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[5]} /> </div>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[6]} /> </div>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[7]} /> </div>
                </div>
                <h3>Recette</h3>
                <div className='row'>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[8]} /> </div>
                    <div className='col-6 mb-3'> <LinkCard data={InputLinks.main[9]} /> </div>
                </div>
                   
            </div>                   
            </> );
}

export default InputLandingPage;