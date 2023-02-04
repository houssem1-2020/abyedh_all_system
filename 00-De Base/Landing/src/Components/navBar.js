import React from 'react';
import { NavLink } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'
import { Dropdown } from 'semantic-ui-react'
import { Button, Icon, Modal, List } from 'semantic-ui-react'
import GConf from '../Assets/generalConf';

function NavBar(props) {
    const NavLinks = () =>{
        return(<>
        <span>
            {/* <ul className="nav navbar-nav navbar-right mr-5 d-flex" dir="rtl">
                <li className="mr-4"><a className="text-white" href="#" className="p-2">تقديم </a></li>
                <li className="mr-4"><a className="text-white" href="#try" className="p-2">جرّب </a></li>
                <li className="mr-4"><a className="text-white" href="#pos" className="p-2">المزايا </a></li>
                <li className="mr-4"><a className="text-white" href="#tarif" className="p-2">الاسعار </a></li>
            </ul> */}
        </span>
        </>)
    }
    return (<>
        <div className="fixed-top" >
            <Segment className="rounded-0 shadow border-0" style={{backgroundColor: props.color}}>
                <div className="row">
                    <div className="col-4 col-lg-4 align-self-center text-left">
                        {props.landing ? 
                        <NavLink to='/'><span className='bi bi-arrow-left-short bi-md text-white'></span></NavLink>
                        : 
                        <img src="https://cdn.abyedh.tn/images/logo/mlogo.gif" alt="." className="p-0 border-div" width="20px" height="32px"/>}
                        
                    </div>
                    <div className="col-5 col-lg-8 align-self-center text-end">
                       {props.landing ? <NavLinks />: ''}
                    </div>
                </div>
            </Segment>
        </div>
    </>);
}

export default NavBar;
