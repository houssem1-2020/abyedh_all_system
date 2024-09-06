import React from 'react';
import { NavLink } from 'react-router-dom';
import { Segment } from 'semantic-ui-react'
import { Button, Icon, Modal, List , Dropdown, DropdownItem } from 'semantic-ui-react'
import GConf from '../Assets/generalConf';
import { useTranslation, Trans } from 'react-i18next';


function NavBar(props) {
    const { t, i18n } = useTranslation();

    const SelectCountry = (lan, country) => {
        i18n.changeLanguage(lan)
        localStorage.setItem('country', country);
        //navigate(`/`)
        //window.location.href = '/';

    }

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
                        <img src="https://cdn.abyedh.com/images/logo/mlogo.gif" alt="." className="p-0 border-div" width="20px" height="32px"/>}
                        
                    </div>
                    <div className="col-5 col-lg-8 align-self-center text-end">
                        <Dropdown floating scrolling className='me-3'  labeled  button direction='left'  icon={<span className='bi bi-translate bi-sm text-white'></span>}>
                            <Dropdown.Menu >
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('en_US','US')}>  <img src="https://flagcdn.com/us.svg" className="img-responsive   border" width="10px" height="25px" /> English  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('ar_TN','TN')}>  <img src="https://flagcdn.com/sa.svg" className="img-responsive   border" width="10px" height="25px" /> العربية  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('fr_FR','FR')}>  <img src="https://flagcdn.com/fr.svg" className="img-responsive   border" width="10px" height="25px" /> Français  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('zh_CN','CN')}>  <img src="https://flagcdn.com/cn.svg" className="img-responsive   border" width="10px" height="25px" /> Chineese  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('hi','IN')}>  <img src="https://flagcdn.com/in.svg" className="img-responsive   border" width="10px" height="25px" /> Hindi  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('ru','RU')}>  <img src="https://flagcdn.com/ru.svg" className="img-responsive   border" width="10px" height="25px" /> Russian  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('ja','JP')}>  <img src="https://flagcdn.com/pa.svg" className="img-responsive   border" width="10px" height="25px" /> Japonny  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('de_DE','DE')}>  <img src="https://flagcdn.com/de.svg" className="img-responsive   border" width="10px" height="25px" /> Germany  </Dropdown.Item>
                                <Dropdown.Item className='text-start' onClick={() => SelectCountry('it_IT','IT')}>  <img src="https://flagcdn.com/it.svg" className="img-responsive   border" width="10px" height="25px" /> Italy  </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                       {props.landing ? <NavLinks />: ''}
                    </div>
                </div>
            </Segment>
        </div>
    </>);
}

export default NavBar;
