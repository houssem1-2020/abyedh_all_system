import React, { useEffect, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button, Dimmer, Form, Icon, Input, Loader, Modal, Pagination, Select, TextArea } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import axios from 'axios';
import {toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
 
 

function ClientRegions() {
    //variables
    const Today = new Date()
    const [dateOne, setDateOne] = useState(Today.toISOString().split('T')[0])
    const [dateTwo, setDateTwo] = useState(Today.toISOString().split('T')[0])
    const [top,SetTop] = useState()
    const [genreFidelite,SetFGenre] = useState()
    const [loading , setLoading] = useState(true)
    const [resultList, setResultList] = useState([]);

    const [displayFamille, setDisplayFamille] = useState([]);
    const [saveBtnState, setSaveBtnState] = useState('')
    const [loaderState, setLS] = useState(false)
    const [activePage , setActivePage] = useState(1)

    const TopG = [
        { key: '1', value: '10', text: '10' },
        { key: '2', value: '20', text: '20' },
        { key: '3', value: '50', text: '20' },
        { key: '4', value: '100', text: '100' },
        { key: '5', value: '200', text: '100' },
    ]
    const ClassmmentG = [
        { key: '1', value: 'Abonnemment', text: 'Nombre de d\'abonnemment ' },
        { key: '2', value: 'Seance', text: 'Nombre de Seances' },
    ]
 
   
    //functions
    const MakeClassment = () => {
        
        if (!top) {toast.error("Top est Invalide !", GConf.TostErrorGonf)}
        else if (!dateOne) {toast.error("Depart est Invamlide !", GConf.TostErrorGonf)}
        else if (!dateTwo) {toast.error("Fin est Invamlide !", GConf.TostErrorGonf)}
        else if (!genreFidelite) {toast.error("Genre est Invamlide !", GConf.TostErrorGonf)}
        else{

            setLS(true)
            //setLoading(true)
            axios.post(`${GConf.ApiLink}/membres/fidelite`, {
                PID : GConf.PID,
                genre : genreFidelite,
                start : dateOne,
                finish : dateTwo,
                Top : top,
            }).then(function (response) {
                setResultList(response.data)
                console.log(response.data)
                toast.success('Classeé', GConf.TostSuucessGonf)
                setLoading(false)
                setLS(false)
                setSaveBtnState(true)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de sauvgarder la regions   </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                  setLoading(false)
                }
              });
        }
    }
    
    const SaveClassment = () =>{
        console.log('classment ')
    }
    const handlePaginationChange = (e,{ activePage }) =>{
        setActivePage(activePage)
        let start = 5 * (activePage - 1)
        let end = 5*  activePage
        setDisplayFamille(resultList.slice(start, end));
    }


    //card
    const RegionCard = (props) =>{
        return(<>
                <div className='card p-2 shadow-sm mb-2'>
                    <div className='row'>
                        <div className='col-9'>
                        <div className="d-flex p-0">
                                <div className="flex-shrink-0 align-self-center">
                                    <h2 className='m-2 ms-3 me-3 system-color'>{props.rang+1}</h2>
                                </div>
                                <div className="flex-grow-1 ms-2">
                                    <h6 className='mb-1'>{props.data.ME_Name}</h6>
                                    <small> {props.data.ME_ID}  </small>
                                </div>
                            </div>
                        </div>
                        <div className='col-3 align-self-center'>
                                    <h3>{props.data.Totale}</h3> 
                        </div> 
                    </div>
                </div>
        </>)
    }


    return ( <> 
            <BreadCrumb links={GConf.BreadCrumb.ClientFidelite} />
            <br />
            <div className="row">
                <div className="col-12 col-lg-8">
                    <div className='mb-3 text-end'>
                        <Pagination  onPageChange={handlePaginationChange} defaultActivePage={1} firstItem={null} lastItem={null} totalPages={Math.floor((resultList.length / 5))+1} />
                    </div>
                    {/* {loading ?  
                    <>
                        {resultList.map( (data) => <RegionCard key={data.PK}  data={data} />)}
                    </>
                    : SKLT.CardList } */}
                    {resultList.map( (data,index) => <RegionCard key={index}  data={data} rang={index} />)}
                
                </div>
                <div className="col-12 col-lg-4">
                <Bounce bottom>
                    <div className="card card-body shadow-sm mb-4 sticky-top border-div" style={{top:'70px' , zIndex:'1'}}>
                        <h4>Selectionez Classmment</h4>
                        <h5 className='mb-0 mt-3'>Top  </h5>
                            <Select placeholder='Top' options={TopG}  className='w-100 shadow-sm rounded' onChange={(e, data) => SetTop(data.value)} />
                        <h5 className='mb-0 mt-2'>Date 1  </h5>
                            <Input type='date' icon='calendar alternate' iconPosition='left' value={dateOne} placeholder='Non de la Region' className='w-100 border-0 rounded '  onChange={(e) => setDateOne(e.target.value)}/>
                        <h5 className='mb-0 mt-2'>Date 2  </h5>
                            <Input type='date' icon='calendar alternate' iconPosition='left' value={dateTwo} placeholder='Non de la Region' className='w-100 border-0 rounded '  onChange={(e) => setDateTwo(e.target.value)}/>
                        <h5 className='mb-0 mt-2'>Genre de Fidelité </h5>
                            <Select placeholder='Classment Selon' options={ClassmmentG}  className='w-100 shadow-sm rounded' onChange={(e, data) => SetFGenre(data.value)} />
                        <br />
                        <div className='row'>
                            <div className='col-12 '>
                                <Button fluid className={`bg-system-btn rounded-pill ${saveBtnState}`} onClick={MakeClassment}>   <Icon name='list ol' /> Classer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                            </div>
                            {/* <div className='col-6 '>
                                <Button fluid className={`bg-success text-white rounded-pill ${saveBtnState}`} onClick={SaveClassment}>   <Icon name='save' /> Enregistrer <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
                            </div> */}
                        </div>
                    </div>
                </Bounce>
                </div>
            </div>
 
        </> );

}

export default ClientRegions;