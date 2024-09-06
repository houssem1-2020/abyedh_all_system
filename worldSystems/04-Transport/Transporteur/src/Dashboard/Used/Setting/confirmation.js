import React, { useState } from 'react';
import StepWizard from "react-step-wizard";
import {Button, Icon, Loader} from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Bounce } from 'react-reveal';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GConf from '../../../AssetsM/generalConf';
import { toast } from 'react-toastify';
function ConfrimationPage() {
    /*const*/
    const [loaderState , setLS] = useState(false)

    /*useEffect*/
    
    /*function*/
    const saveConformation = () => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/parametre/confirmer`, {
            PID : GConf.PID,
        }).then(function (response) {
            if(response.data.affectedRows) {
                toast.success("CONFIRMEE !", GConf.TostSuucessGonf)
                setLS(false)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        })   
    }

    /*card*/
    const Percentage = (props) =>{
        return(<>
            <div className="progress" style={{height: "2px"}}>
                <div className="progress-bar bg-info" role="progressbar" style={{width: `${props.percentage}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
        </>)
    }
    const BottomNav = (props) =>{
        return(<>
                <div className='row'>
                        <div className='col-6 align-self-center text-start'> <Button onClick={props.previousStep}  className='rounded-pill bg-system-btn' size='tiny' ><Icon name='arrow left' />  </Button> </div>
                        <div className='col-6 align-self-center text-end'> <Button onClick={props.nextStep} className='rounded-pill bg-system-btn' size='tiny' > Suivant  <Icon name='arrow right ' /></Button> </div>
                </div>
            </>)
    }
    const ConfirmerCard = (props) =>{
        return (<>
                 
                <br />
                <div className='card card-body shadow-s mb-4 border-div'>
                    <h3>La confirmation du compte vous permet d'obtenir un badge vert ( <span className='bi bi-patch-check-fill text-success'></span> ) indiquant que vous êtes le propriétaire officiel du compte </h3>
                    
                    <h4 className='text-danger'>La Vérification se fait par toix étapes :  </h4>
                    <ul>
                        <li>Confirmer par copie de la carte CIN </li>
                        <li>Confirmer par copie de patente </li>
                        <li>Confirmer par numero telephonique  </li>
                    </ul>
                    {/* <p>Selectioner Votre Compte Dans L'annaire</p> */}

                    <div className='text-end'>
                        <Button onClick={saveConformation}  className='rounded-pill bg-system-btn' size='tiny' ><Icon name='check circle' /> Confirmer  <Loader inverted active={loaderState}  inline size='tiny' className='ms-2'/></Button>
                    </div>
                </div>     
       </>)
    }
    const One = (props) =>{
        const percentage = ((props.totalSteps - ( props.totalSteps - props.currentStep)) / props.totalSteps ) * 100 
        const Next = props.nextStep 
        const Previous = props.previousStep 
        return (<>
                <Percentage percentage={percentage} />
                <br />
                <div className='card card-body shadow-s mb-4 border-div'>
                    <h3>La confirmation du compte vous permet d'obtenir un badge vert ( <span className='bi bi-patch-check-fill text-success'></span> ) indiquant que vous êtes le propriétaire officiel du compte </h3>
                    
                    <h4 className='text-danger'>Vérification dans l'annuaire :</h4>
                    <p>Selectioner Votre Compte Dans L'annaire</p>

                    <BottomNav nextStep={Next} previousStep={Previous} />
                </div>     
       </>)
    }
    const Two = (props) =>{
        const percentage = ((props.totalSteps - ( props.totalSteps - props.currentStep)) / props.totalSteps ) * 100 
        const Next = props.nextStep 
        const Previous = props.previousStep 
        return (<>
                <Percentage percentage={percentage} />
                <br />
                <div className='card card-body shadow-s mb-4 border-div'>
                        2
                    <BottomNav nextStep={Next} previousStep={Previous} />
                </div>
       </>)
    }
    const Three = (props) =>{
        const percentage = ((props.totalSteps - ( props.totalSteps - props.currentStep)) / props.totalSteps ) * 100 
        const Next = props.nextStep 
        const Previous = props.previousStep 
        return (<>
                <Percentage percentage={percentage} />
                <br />
                <div className='card card-body shadow-s mb-4 border-div'>
                        3
                    <BottomNav nextStep={Next} previousStep={Previous} />
                </div>
       </>)
    }

    return ( <>
    <Bounce right>
        <div className="row justify-content-center">
            <div className="col-12 col-lg-9">
                <Link exaxt='true' to='/S/Parametre'><Button className='rounded-circle' icon='arrow left' /></Link>
                <br />
                <br />
                {/* <StepWizard isHashEnabled>
                        <One />
                        <Two />
                        <Three />
                </StepWizard> */}
                <ConfirmerCard />

            </div>
        </div>
    </Bounce>
    </> );
}

export default ConfrimationPage;