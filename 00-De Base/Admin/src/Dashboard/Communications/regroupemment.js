import React from 'react';
import { Button, Icon } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../Assets/breadCrumb';
function RegrouperCommandes() {
    /* card */
    const SelectTargetCommandeCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4'>
                <h5 className='mt-0 mb-1'> Selectionnez Commandes</h5>  
            </div>
        </>)   
    } 
    const SelectCamionCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4'>
                <h5 className='mt-0 mb-1'> Selectionnez Camion</h5>  
            </div>
        </>)   
    } 

    const PrintCard = () =>{
        return(<>
            <div className='card card-body shadow-sm mb-4'>
                <h5 className='mt-0 mb-1'> Imprimer</h5>  
                <Button size='small' className='rounded-pill bg-system-btn mb-2' icon fluid><Icon name='print' /> Imprimer</Button>
                <Button size='small' className='rounded-pill print-btn mb-2' icon fluid><Icon name='print' /> Bl</Button>
                <Button size='small' className='rounded-pill print-btn mb-2' icon fluid><Icon name='print' /> BS</Button>
            </div>
        </>)   
    } 
    return ( <>
        <BreadCrumb links={GConf.BreadCrumb.RequestInfo} />
        <br />
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-lg-5'>
                    <SelectTargetCommandeCard />
                </div>
                <div className='col-12 col-lg-5'>
                    <SelectCamionCard />
                </div>
                <div className='col-12 col-lg-2'>
                    <PrintCard />
                </div>
            </div>
        </div>
    </> );
}

export default RegrouperCommandes;