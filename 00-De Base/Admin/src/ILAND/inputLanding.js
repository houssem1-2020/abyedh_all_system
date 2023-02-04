import React, { useEffect, useState} from 'react';
import { Bounce } from 'react-reveal';
import { Button, Statistic } from 'semantic-ui-react';
import GConf from '../AssetsM/generalConf';

import CountUp from 'react-countup';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function InputMainLandingPage() {

        const mainDataList =  [
            {id:1, link:'/Dir', icon:'journal-bookmark-fill', text:'ANNUAURE', desc:''},
            {id:2, link:'/I', icon:'pencil-square', text:'COMMUNICATIONS', desc:''},
            {id:3, link:'/Dir', icon:'people', text:'CLIENTS & USERS', desc:''},
            {id:4, link:'/Subs', icon:'cash-coin', text:'SOUSCRIPTION', desc:''},
            {id:5, link:'/Dir', icon:'tools', text:'TOOLS', desc:''},
            {id:6, link:'/I', icon:'person-square', text:'EQUIPE', desc:''},
        ]
        
        //card
        const MainTopCard = () =>{
            return(<>
                <div className='card p-3 fixed-top border-0 shadow-sm rounded-0'>
                    <div className='row'>
                        <div className='col-12 align-self-center text-center'><h2> <span className="badge bg-warning"> <span className='bi bi-microsoft-teams '></span>  ABYEDH TEAM  </span>  </h2></div>
                    </div>
                </div>
            </>)
        }
        const LinkCard = (props) =>{
            return ( <>
                <div className='card card-body shadow-sm border-div bg-hover-card mb-2 text-center h-100 ' style={{color: GConf.themeColor}}>
                        <NavLink exact='true' to={props.data.link} className="stretched-link"></NavLink>
                    <h1 className={`bi bi-${props.data.icon} bi-lg mb-0`} ></h1> 
                    <h3>{props.data.text}</h3>
                </div> 
            </> );
        }
        return ( <>
                <MainTopCard />
                <br />                
                <br />                
                <br />                   
                <div className='container'>
                    <br /> 
                    <br /> 
                    
                    <div className='row'>
                        <div className='col-6 mb-3'> <LinkCard data={mainDataList[0]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={mainDataList[1]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={mainDataList[2]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={mainDataList[3]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={mainDataList[4]} /> </div>
                        <div className='col-6 mb-3'> <LinkCard data={mainDataList[5]} /> </div>
                    </div> 
                    
                </div>                   
                </> );
}

export default InputMainLandingPage;