import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Tab } from 'semantic-ui-react'
import GConf from '../../../AssetsM/generalConf';
import { Form, TextArea, Input , Button, Icon, Loader, Select} from 'semantic-ui-react'
import axios, { Axios } from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const EnterCard = ({articleNow, setArticleNow, disabledSaveBtn, commandeData, AddArticleToList}) =>{
    const [modalOpen, setModalOpen] = useState(false)
    const [searchForArticle, setSearchForArticle] = useState('')
    const [rendredMedicammentListe, setRendredMedicammentListe] = useState([])
    const SearchForArticleFunc = () => {
        if (!searchForArticle || searchForArticle == '') {  toast.error("أدخل إسم السائل    !", GConf.TostErrorGonf) } 
        else {
            // axios.post(`${GConf.ApiLink}/Action/pharmacie-shop/medicamment`, {
            //     searchForArticle : searchForArticle,
            // }).then(function (response) {
            //     console.log(response.data)
            //     setRendredMedicammentListe(response.data)
            // }).catch((error) => {
            //     if(error.request) {
            //       toast.error(<><div><h5>   </h5> حاول مرة أخري  </div></>, GConf.TostInternetGonf)   
                  
            //     }
            // });
        }
    }
    return (<>
        <div className='card-body mt-2'>
            <div className='row mb-3'>
                <div className='col-8 align-self-center text-secondary'><h5>عدد السوائل المسجلة   : {commandeData.articles ? commandeData.articles.length : 0}  </h5></div>
                <div className='col-4 align-self-center text-start'><Button onClick={() => setModalOpen(true)} size='small' icon className='rounded-circle'> <Icon name='plus' /> </Button></div>
            </div>
            <Input icon='pin'   placeholder='إسم السائل' value={articleNow.Name}  onChange={ (e) => setArticleNow({...articleNow, Name: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
            <Input icon='dropbox'     value={articleNow.Qte}   onChange={ (e) => setArticleNow({...articleNow, Qte: e.target.value })} size="small" iconPosition='left' placeholder='  الكمية باللتر أو بالدينار مع التوضيح'  fluid className='mb-1' />
            <br />
            <Button disabled={disabledSaveBtn}  fluid className='rounded-pill' size='small' color='blue' onClick={AddArticleToList}>  <Icon name='edit outline' className='ms-2' /> أضف </Button>
                <Modal
                    onClose={() => setModalOpen(false)}
                    onOpen={() => setModalOpen(true)}
                    open={modalOpen}
                     
                >
                <Modal.Header className='text-end'>
                     <span className='font-droid'> إختر منتج </span>
                     
                </Modal.Header>
                <Modal.Content >
                    <div className='row' dir='ltr'>
                        <div className='col-2'><Button   icon className='rounded-pill' size='small'  onClick={() => SearchForArticleFunc()}>  <Icon name='edit outline' className='ms-2' /> </Button></div>
                        <div className='col-10'><Input icon='pin' size='small'  placeholder='إسم المنتج' value={searchForArticle}  onChange={ (e) => setSearchForArticle(e.target.value )}  iconPosition='left'   fluid className='mb-1' /></div>
                    </div> 
                    {rendredMedicammentListe.length == 0 ?
                    <h1 className='text-center'><span className='bi bi-card-checklist bi-lg  '></span></h1>
                    :
                    <>
                     {rendredMedicammentListe.map((data,index) => <div key={index} className='card p-2 mb-2 ' onClick={() => setArticleNow({...articleNow, Name: data.Nom })}><div className='row'><span className='col-1 bi bi-capsule-pill d-inline'></span> <span className='col-11'>{data.Nom} : {data.Dosage} - {data.Presentation} </span></div></div>)}
                    </>
                    }
                    
                </Modal.Content>
                </Modal>
        </div>
    </>)
}
const ConfirmCard = ({commandeData, setCommandeD, disabledSaveBtn, SaveCMDFunc , tag, loaderState}) =>{
    return (<>
    <div className='card-body mt-2'>
        <div className='row mb-2'>
            <div className='col-12 mb-3' >
                <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> ماهو نوع سيارتك </h5>
                <Input icon='pin'   placeholder=' نوع السيارة' value={commandeData.Car_Genre}  onChange={ (e) => setCommandeD({...commandeData, Car_Genre: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                 
            </div>
            <div className='col-12'>
                <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> وقت الحضور</h5>
                <Input icon='calendar alternate' type='date' size="small" iconPosition='left'   fluid className='mb-1' value={commandeData.Wanted_Day} onChange={(e) => setCommandeD({...commandeData, Wanted_Day: e.target.value })}/>
                <Input className='mb-3' type='time' fluid value={commandeData.Wanted_Time}  defaultValue={new Date().toLocaleTimeString('fr-FR')} onChange={(e) => setCommandeD({...commandeData, Wanted_Time: e.target.value })}  />
            </div>
            <div className='col-12'>
                <Button  className='rounded-pill text-white' style={{backgroundColor: GConf.ADIL[tag].themeColor}} disabled={disabledSaveBtn} fluid onClick={SaveCMDFunc}><Icon name='save' className='ms-2' /> تسجيل <Loader inverted active={loaderState} inline size='tiny' className='ms-2'/></Button>
            </div>
        </div>
    </div>
    </>)
}
const CommandeCard = ({commandeData, setCommandeD, SaveCMDFunc , disabledSaveBtn, tag, loaderState}) =>{
    /* Const */
    const [articleNow, setArticleNow] = useState({PK: 1 , Name:'', Qte: ''})
    const PannierPannes = [
        {
          menuItem: { key: 'enter',   content:  <span> <span className='bi bi-1-circle  bi-sm me-2 ms-2 ' style={{color :GConf.ADIL[tag].themeColor}}></span>   </span> , dir:'rtl'},
          render: () => <EnterCard articleNow={articleNow} setArticleNow={setArticleNow} disabledSaveBtn={disabledSaveBtn} AddArticleToList={AddArticleToList} commandeData={commandeData} />,
        },
        {
            menuItem: { key: 'article',   content:  <span > <span className='bi bi-2-circle bi-sm  me-2 ms-2' style={{color :GConf.ADIL[tag].themeColor}}></span>   </span> , dir:'rtl' },
            render: () => <ArticleListCard />,
        },
        {
            menuItem: { key: 'check',   content:  <span >  <span className='bi bi-3-circle bi-sm  me-2 ms-2' style={{color :GConf.ADIL[tag].themeColor}}></span>  </span> , dir:'rtl' },
            render: () => <ConfirmCard  commandeData={commandeData} setCommandeD={setCommandeD} SaveCMDFunc={SaveCMDFunc} disabledSaveBtn={disabledSaveBtn} tag={tag} loaderState={loaderState}/>,
        },
    ]
    const Livraisonoptions = [
        { key: '1', value: 'INTIGO', text: 'INTIGO ', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/intigo-1-300x145-1.png', avatar: true } },
        { key: '2', value: 'Yassir', text: 'Yassir ', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/yassir.png', avatar: true } },
        { key: '3', value: 'Farm Trust', text: 'Farm Trust ', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/farmtrust.png', avatar: true } },
        { key: '4', value: 'Founashop', text: 'Founashop', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/founa-shop.png', avatar: true } },
        { key: '5', value: 'Joy s', text: 'Joy’s', image: { src: 'https://foodealz.com/wp-content/uploads/2020/04/28070452_400909117034010_1865031699315847664_o-300x300-1.jpg', avatar: true } },
      ]
    /* Function  */
    const AddArticleToList = () =>{
        if (articleNow.Name == '') { toast.error("أدخل إسم المنتج    !", GConf.TostErrorGonf) } 
        else if (articleNow.Qte == '') { toast.error("أدخل الكمية      !", GConf.TostErrorGonf) } 
        else {
            console.log(articleNow)
            commandeData.articles.push(articleNow)
            setArticleNow({PK: commandeData.articles.length + 1 , Name:'', Qte: ''})
        }
        
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= commandeData.articles.findIndex((article) => article.A_Code == value);
        commandeData.articles.splice(searchObject, 1);
        let resteArticles = commandeData.articles;
        setCommandeD({...commandeData, articles: resteArticles})
    }

    /* Card */
    const ArticleListCard = () =>{
        const ListCard = (props) =>{
            return(<>   
                        <div className='card shadow-sm p-2   border-div ps-4 mb-2'>
                            <div className='row'>
                            <div className='col-4 align-self-center pe-3'><b>{props.dataA.Qte} </b>  </div>
                                <div className='col-6 col-lg-9 text-end  align-self-center'>
                                     {props.dataA.Name} 
                                </div>
                                
                                <div className='col-2 align-self-center'><Button icon="trash alternate" className='rounded-circle p-2 text-danger bg-white ' disabled={disabledSaveBtn} onClick={() => DeleteFromUpdateList(props.dataA.A_Code)}></Button></div>
                            </div>
                        </div>
                    </>)
        }
        return (<>
        <div className='card-body mt-2'>
            {commandeData.articles.length != 0 ? 
             <>{commandeData.articles.map( (val, index) => <ListCard key={index} dataA={val}/>)}</>
             :
             <div className='text-center'>
                <span className='bi bi-list-columns-reverse bi-lg'></span>
            </div>
             
            }
        </div>
        </>)
    }
    
    
        
    return(<>
        <Tab menu={{secondary: true, color: 'grey' , widths: PannierPannes.length , pointing: true, selected: { backgroundColor: GConf.ADIL[tag].themeColor },  dir:'rtl', style:{justifyContent: 'right',} }} panes={PannierPannes} /> 
    </>)
}

const RendyVousCard = ({rendyVousD, setRdvData, RendyVousFunc, disabledSaveBtn, tag, loaderState }) =>{
    const serviceOptions = [
        {key:1, value:'غسيل  باليد', text:'غسيل  باليد'},
        {key:2, value:' غسيل أوتوماتيكي', text:' غسيل أوتوماتيكي'},
        {key:3, value:'غسيل  بالرذاذ', text:'غسيل  بالرذاذ'},
        {key:4, value:'غسيل  بالبخار', text:'غسيل  بالبخار'},
        {key:5, value:'غسيل  جاف', text:'غسيل  جاف'},
        {key:6, value:'غسيل إحترافي  تلميع وتشميع', text:'غسيل إحترافي  تلميع وتشميع'},
        {key:7, value:'غير محدد', text:'غير محدد'},
    ]
    const stateOptions = [
        {key:1, value:'متسخة قليلا', text:'متسخة قليلا'},
        {key:2, value:'متسخة', text:'متسخة'},
        {key:3, value:'متسخة كثيرا', text:'متسخة كثيرا'},
    ]
    return(<>
            <div className='p-2'>
                    <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> ماهو نوع سيارتك </h5>
                    <Input icon='pin'   placeholder=' نوع السيارة' value={rendyVousD.Car_Genre}  onChange={ (e) => setRdvData({...rendyVousD, Car_Genre: e.target.value })} size="small" iconPosition='left'   fluid className='mb-1' />
                    
                    <h5 className='mb-2 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> الوقت المطلوب </h5>
                    <small> متي تريد الحضور ؟</small>
                    <div className='row mb-0'>
                        <div className='col-6'><Input className='mb-2' type='date' fluid alue={rendyVousD.Wanted_Day}  defaultValue={new Date().toISOString().split('T')[0]} onChange={(e) => setRdvData({...rendyVousD, Wanted_Day: e.target.value })}  /></div> 
                        <div className='col-6'><Input className='mb-2' type='time' fluid alue={rendyVousD.Wanted_Time	}  defaultValue={new Date().toLocaleTimeString('fr-FR')} onChange={(e) => setRdvData({...rendyVousD, Wanted_Time	: e.target.value })}  /></div> 
                    </div>

                    <h5 className='mb-0 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>نوع الغسيل   </h5>
                    <small>  كيف تريد أن تغسل سيارتك </small> 
                    <Select fluid placeholder='حالة السيارة ' options={serviceOptions} onChange={ (e,data) => setRdvData({...rendyVousD, Wash_Genre:data.value})} />
 

                    <h5 className='mb-0 ' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span> حالة السيارة  </h5>
                    <small>  هل سيارتك متسخة كثيرا </small> 
                    <Select fluid placeholder='حالة السيارة ' options={stateOptions} onChange={ (e,data) => setRdvData({...rendyVousD, Car_State:data.value})} />
 
                    
                    <h5 className='mb-0 mt-3' style={{color: GConf.ADIL[tag].themeColor}}> <span className='bi bi-person-x-fill'></span>  ملاحضات   </h5>        
                    <Form className='mb-3'>
                        <TextArea placeholder='ملاحضات' className='font-droid'  rows={2} value={rendyVousD.Comment} onChange={ (e,value) => setRdvData({...rendyVousD, Comment:e.target.value})} />
                    </Form>

                    <div className='text-end'>
                        <Button className='rounded-pill' onClick={RendyVousFunc} disabled={disabledSaveBtn} size='small' icon style={{backgroundColor:GConf.ADIL[tag].themeColor, color:'white'}} > <Icon name='save' />  تسجيل موعد  <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
        
        </div> 
    </>)
}
function CarQiosqieSpecific(props) {
    /* ############### Const #################*/
    const [commandeData, setCommandeD] = useState({Wanted_Day: new Date().toISOString().split('T')[0] , articles:[]})
    const [rendyVousD, setRdvData] = useState([])
    const [loaderState, setLS] = useState(false)
    const [disabledSaveBtn, setDisabledBtn] = useState(false)

    const panes = [
        {
          menuItem: { key: 'save', icon: 'checkmark box', content:  <span className='me-2'> وقود </span> , dir:'rtl'},
          render: () => <Tab.Pane className='border-div shadow-sm' attached={false} dir='rtl'> <CommandeCard commandeData={commandeData} setCommandeD={setCommandeD} SaveCMDFunc={SaveCMDFunc} disabledSaveBtn={disabledSaveBtn} tag={props.TAG} loaderState={loaderState} /></Tab.Pane>,
        },
        {
            menuItem: { key: 'edit', icon: 'calendar alternate', content:  <span className='me-2'> غسيل </span> , dir:'rtl' },
            render: () => <Tab.Pane className='border-div shadow-sm' attached={false} dir='rtl'><RendyVousCard rendyVousD={rendyVousD} setRdvData={setRdvData} RendyVousFunc={RendyVousFunc} disabledSaveBtn={disabledSaveBtn} tag={props.TAG} loaderState={loaderState} /></Tab.Pane>,
        },
    ]

    

    /* ############### UseEffect #################*/
    useEffect(() => {
            // axios.post(`${GConf.ApiLink}/camions`, {PID :props.PID})
            // .then(function (response) {
            //     //let ClientLN = []
            //     //response.data.map( (dta) => {ClientLN.push({value : dta.Cam_ID, text : <>{dta.Cam_Name} : {dta.Matricule} - {dta.Chauffeur}</>, key: dta.PK})})
            //     //setCamionList(ClientLN)
            // })
    }, [])

    /* ############### Functions #################*/
    const SaveCMDFunc = () =>{
        if (commandeData.articles.length == 0 ) {toast.error("أدخل  منتجات   !", GConf.TostErrorGonf)}
        else if (!commandeData.Car_Genre  ) {toast.error("أدخل  نوع السيارة   !", GConf.TostErrorGonf)}
        else if (!commandeData.Wanted_Time  ) {toast.error("أدخل  الوقت   !", GConf.TostErrorGonf)}
        else if (!commandeData.Wanted_Day  ) {toast.error("أدخل  اليوم   !", GConf.TostErrorGonf)}
        else{
            console.log(commandeData)
            setLS(true)
            axios.post(`${GConf.ApiLink}/Action/qiosque-request`, {
                UID : props.UID,
                PID : props.PID ,
                TAG : props.TAG ,
                commandeD : commandeData,
            }).then(function (response) {
                toast.success(<><div><h5>تم التسجيل بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
                setDisabledBtn(true)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de connecter aux systeme </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 
    }
    const RendyVousFunc = () =>{
        if (!rendyVousD.Car_Genre) {toast.error("أدخل التشخيص !", GConf.TostErrorGonf)}
        else if (!rendyVousD.Wash_Genre) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else if (!rendyVousD.Wanted_Day) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else if (!rendyVousD.Wanted_Time) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else if (!rendyVousD.Car_State) {toast.error("ادخل الموعد  !", GConf.TostErrorGonf)}
        else{
            setLS(true)
            console.log(rendyVousD)
            axios.post(`${GConf.ApiLink}/Action/qiosque-lavage`, {
                UID : props.UID,
                PID : props.PID ,
                TAG : props.TAG ,
                rendyVousData : rendyVousD,
            }).then(function (response) {
                toast.success(<><div><h5>تم تسجيل الموعد بنجاح </h5>  </div></>, GConf.TostInternetGonf)
                setLS(false)
                setDisabledBtn(true)
            }).catch((error) => {
                if(error.request) {
                  toast.error(<><div><h5> لم يتم تسجيل الموعد</h5> حاول مرة أخري  </div></>, GConf.TostInternetGonf)   
                  setLS(false)
                }
            });
        } 
    }
    
    /* ############### Card #################*/
     
    return ( <>
    <div className='m-0'>
        <Tab menu={{secondary: true , selected: { backgroundColor: 'purple' },  dir:'rtl', style:{justifyContent: 'right',} }} className='yes-menu-tabs' panes={panes} />
    </div>
        
    </> );
}

export default CarQiosqieSpecific;