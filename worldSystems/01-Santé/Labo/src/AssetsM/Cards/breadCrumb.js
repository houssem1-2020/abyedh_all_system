import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';

function BreadCrumb(props) {
        const { t, i18n } = useTranslation();
        return (<>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    {
                        props.links.map((data) => (<React.Fragment key={data.id}>
                            {data.linkable ? 
                                <li  className="breadcrumb-item" ><NavLink exact="true" to={data.link}> {t(`BreadCrumb.${props.bcTag}.${data.id}`)}  </NavLink></li>
                            : 
                                <li className="breadcrumb-item active"  aria-current="page"> {t(`BreadCrumb.${props.bcTag}.${data.id}`)} </li>
                            }
                        </React.Fragment>))
                    }
                    
                    
                </ol>
            </nav>
        </>);
    }

 
export default BreadCrumb;