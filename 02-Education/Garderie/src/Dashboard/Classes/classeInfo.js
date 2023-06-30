import React, { useEffect, useState } from 'react';
import GConf from '../../AssetsM/generalConf';
import BreadCrumb from '../../AssetsM/Cards/breadCrumb'
import { Button, Divider, Form, Icon, Input, Loader, Select, Dropdown, Statistic, Header, TextArea } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import useGetFamillePlat from '../../AssetsM/Hooks/fetchPlatFamille';
import { toast } from 'react-toastify';
import SKLT from '../../AssetsM/Cards/usedSlk';
 
import useGetArticles from '../../AssetsM/Hooks/fetchArticles';
import TableGrid from '../../AssetsM/Cards/tableGrid';

const EditArticle = ({classesD, setClassesD, OnKeyPressFunc, checkPrixCompatiblite, familles, EditPlatFunction,loaderState,updateQte}) =>{
    return(<>

                <div className='row'>
                        <div className='col-12 col-lg-12'>
                            <h5 className='mb-1'>Nom: </h5>
                            <Input icon='star' onKeyPress={event => OnKeyPressFunc(event)} iconPosition='left' placeholder='Nom' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={classesD.Name} onChange={(e) => setClassesD({...classesD, Name: e.target.value })}/>
                        </div>
                        
                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Code  :</h5>
                                <Input icon='barcode'  disabled iconPosition='left' type='number' placeholder='code  ' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={classesD.P_Code} onChange={(e) => setClassesD({...classesD, P_Code: e.target.value })} />
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Genre: </h5>
                               <Select placeholder='Selectionez une Categorie' options={familles} className='w-100 shadow-sm rounded mb-3' defaultValue={classesD.Genre} onChange={(e, data) => setClassesD({...classesD, Genre: data.value })} />  
                            </div>
                </div>
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Cout: </h5>
                                <Input icon='dollar'   iconPosition='left' type='number' placeholder='achat' defaultValue={classesD.Cout} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setClassesD({...classesD, Cout: e.target.value })}/> 
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Prix Vente: </h5>
                                <Input icon='dollar'   iconPosition='left' type='number' placeholder='vente' defaultValue={classesD.Prix_vente} onBlur={checkPrixCompatiblite} className='w-100 border-0 shadow-sm rounded mb-3' onChange={(e) => setClassesD({...classesD, Prix_vente: e.target.value })}/>
                            </div>

                </div> 
                <div className='row'>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Prix Promo: </h5>
                                <Input icon='dollar'   iconPosition='left' type='number' placeholder='promo' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={classesD.Prix_promo}  onChange={(e) => setClassesD({...classesD, Prix_promo: e.target.value })}/>
                            </div>
                            <div className='col-12 col-lg-6'>
                                <h5 className='mb-1'>Repture du stock: </h5>
                                <Input icon='angle double down' onKeyPress={event => OnKeyPressFunc(event)} iconPosition='left' type='number' placeholder='repture' className='w-100 border-0 shadow-sm rounded mb-3' defaultValue={classesD.Repture} onChange={(e) => setClassesD({...classesD, Repture: e.target.value })}/>
                            </div>
                </div>
                <div className='row'>
                    <h5 className='mb-1'>Description</h5>
                    <Form>
                        <TextArea onKeyPress={event => OnKeyPressFunc(event)} rows="3" defaultValue={classesD.Description} className='w-100 shadow-sm rounded mb-3' onChange={(e) => setClassesD({...classesD, Description: e.target.value })}/>
                    </Form> 
                </div>
                <div className='text-end mb-5'>
                    <Button onClick={EditPlatFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                </div>
    </>)
}

function PlatInfo() {
    /*#########################[Const]##################################*/
    let Today = new Date().toISOString().split('T')[0]
    let {code} = useParams();
    const [articleNow, setArticleNow] = useState([])
    const [eleveListe, setEleveListe] = useState([])
    const [profListe, setProfListe] = useState([])
    const [examainListe, setExamainListe] = useState([])
    const [emploiData, setEmploiData] = useState([])

    const[familles] = useGetFamillePlat()
    const [stock] = useGetArticles()
    
    const [ingredienListe, setIngredientListe] = useState([])
    const [loading , setLoading] = useState(false)
    const [classesD, setClassesD] = useState({});
    const [loaderState, setLS] = useState(false)
 
    const [updateQte, setUpdateQte] = useState(true)
 
    const [articleEvents , setArticleEvents] = useState([])
    
 
    const [saveBtnState, setSaveBtnState] = useState(false)
    const [autofocusState, setAutoFocus] = useState(false)
 
 

    const options = [
        { key: '1', value: 'plat_pizza.png', text: 'PIZZA', image: { src: 'https://cdn.abyedh.tn/images/system/Resto/plat_pizza.png', avatar: true } },
        { key: '2', value: 'plat_mlaoui.png', text: 'MLAOUI', image: { src: 'https://cdn.abyedh.tn/images/system/Resto/plat_mlaoui.png', avatar: true } },
        { key: '3', value: 'plat_sandwich.png', text: 'SANDWICH', image: { src: 'https://cdn.abyedh.tn/images/system/Resto/plat_sandwich.png', avatar: true } },
        { key: '', value: 'plat_chappati.png', text: 'CHAPPATI', image: { src: 'https://cdn.abyedh.tn/images/system/Resto/plat_chappati.png', avatar: true } },
        { key: '', value: 'plat_boisson.png', text: 'BOISSON', image: { src: 'https://cdn.abyedh.tn/images/system/Resto/plat_boisson.png', avatar: true } },
      ]

    const panes = [
        {
            menuItem: { key: 'eleve', icon: 'calendar alternate', content: 'Eleve' }, 
            render: () =><><TableGrid tableData={eleveListe} columns={['ID','Client','Jour','Temps','Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'prof', icon: 'calendar alternate', content: 'Professeurs' }, 
            render: () =><><TableGrid tableData={eleveListe} columns={['ID','Client','Jour','Temps','Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'empmloi', icon: 'calendar alternate', content: 'Emploi' }, 
            render: () =><><Tab.Pane attached={false}><Calendar /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'resumer', icon: 'tasks', content: 'Examain' }, 
            render: () => <><TableGrid tableData={eleveListe} columns={['ID','Client','Jour','Temps','Totale','Voir']} /><br /></>,
        },
        {
            menuItem: { key: 'edit', icon: 'edit outline', content: 'Modifier' }, 
            render: () => <><Tab.Pane attached={false}><EditArticle OnKeyPressFunc={OnKeyPressFunc} classesD={classesD}  setClassesD={setClassesD} checkPrixCompatiblite={checkPrixCompatiblite} familles={familles} EditPlatFunction={EditPlatFunction} loaderState={loaderState} updateQte={updateQte} /></Tab.Pane><br /></>,
        },
        {
            menuItem: { key: 'delete', icon: 'trash alternate', content: 'Supprimer' }, 
            render: () => <><Tab.Pane attached={false}><DeleteClassesCard  /></Tab.Pane><br /></>,
        },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/classes/info`, {
            PID: GConf.PID,
            classeID: code, 
          })
          .then(function (response) {
            if(response.data.length == 0) {
                toast.error('Article Introuvable !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/cl"; }, 2000)

            } else {
                console.log(response.data)
                setClassesD(response.data.Data)
                //if(response.data.Data.Ingredient) {setIngredientListe(JSON.parse(response.data.Data.Ingredient))}
                // let inFactureList = []
                // response.data.InFacture.map( (factureList) => inFactureList.push( { title: GetTargetArticleQte(factureList.Articles,'Qte'), date: GenerateDate(factureList.T_Date, 1), className:'bg-primary border-0 w-25 text-center' }))
                // setArticleEvents(inFactureList)
                setLoading(true)
            }
                
          }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de charger l'article  </div></>, GConf.TostInternetGonf)   
              setLoading(true)
              setClassesD([])
            }
          });

    }, [])


    /*#########################[Function]##################################*/
    const EditPlatFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/classes/modifier`, {
            PID :GConf.PID,
            articleND :classesD,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Plat Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                //SaveNotification('stockEditArticle',GConf.PID, classesD)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le Plat  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const DeleteFromUpdateList = (value) =>{
        const searchObject= ingredienListe.findIndex((article) => article.A_Code == value);
        ingredienListe.splice(searchObject, 1);

        let resteArticles = ingredienListe;
        let tot = MakeSum()
        setIngredientListe(resteArticles)

        setClassesD({...classesD, Cout: tot})


    }
    const CalculateNewPrice = () =>{
        const GetRealPrice = (CodeDuArticle) =>{
            const searchObject = stock.find((article) => article.A_Code == CodeDuArticle);
            if (searchObject) {
                return(searchObject.Prix_achat);
                
            }else{
                return(0);
            }
        }
        let tot = 0
        ingredienListe.map( (art) => { 
           tot = tot +  (GetRealPrice(art.A_Code) * art.Qte)
        })
        return (tot)
    }
    const EditIngredientFunction = (event) => {
        setLS(true)
        axios.post(`${GConf.ApiLink}/classes/modifier/ingredient`, {
            PID :GConf.PID,
            CodePlat : code,
            articleListe : ingredienListe,
            Cout : classesD.Cout,
        }).then(function (response) {
            console.log(response.data)
            if(response.data.affectedRows) {
                toast.success("Plat Modifier !", GConf.TostSuucessGonf)
                setLS(false)
                //SaveNotification('stockEditArticle',GConf.PID, classesD)
            }
            else{
                toast.error('Erreur esseyez de nouveaux', GConf.TostSuucessGonf)
                setLS(false)
            }
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de modifier le Plat  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const AddArticleToList = ()=>{
        if (!articleNow.A_Code) {toast.error("Code à barre Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Name || articleNow.Name == '') {toast.error("Name Invalide !", GConf.TostErrorGonf)}
        else if (!articleNow.Qte || articleNow.Qte == '') {toast.error("Quantite Invalide !", GConf.TostErrorGonf)}
        else{
            const searchObject = ingredienListe.find((article) => article.A_Code == articleNow.A_Code);
            if (searchObject) {
                let IndexOfArticle = ingredienListe.findIndex((article) => article.A_Code == articleNow.A_Code)
                ingredienListe[IndexOfArticle].Qte = ingredienListe[IndexOfArticle].Qte + parseFloat(articleNow.Qte)
                ingredienListe[IndexOfArticle].PU = ((ingredienListe[IndexOfArticle].Qte) * ingredienListe[IndexOfArticle].Prix ).toFixed(3)
                let tot = MakeSum()
                setClassesD({...classesD, Cout: tot })
                
                setArticleNow([{}])
                setAutoFocus(false) 
                
                
            } else {
                let prix_u = (articleNow.Prix_vente * articleNow.Qte).toFixed(3)
                let arrayToAdd = {id: ingredienListe.length + 1 , A_Code: articleNow.A_Code, Name: articleNow.Name, Prix: articleNow.Prix_achat, Qte: parseFloat(articleNow.Qte), PU: prix_u}
                ingredienListe.push(arrayToAdd)
                setArticleNow([])
                let tot = MakeSum()
                setClassesD({...classesD, Cout: tot })            
            }
        }
    }
    const GetclassesData = (value) =>{
        const searchObject = stock.find((article) => article.A_Code == value);
        if (searchObject) {
            setArticleNow(searchObject);
            setAutoFocus(true)
            
        }else{
            toast.error('Article Indéfine ', GConf.TostSuucessGonf)
        }
    }
    const MakeSum = () => {
        let tot = 0
        ingredienListe.map( (art) => { 
           tot = tot +  (art.Prix * art.Qte)
        })
        return (tot)
    }
    const DeleteArticle = () =>{
        setLS(true)
        axios.post(`${GConf.ApiLink}/classes/supprimer`, {
            tag :GConf.PID,
            code : code ,
            pk: classesD.PK
        }).then(function (response) {
            if (response.data.affectedRows != 0) {
                toast.error('Article Supprimer  !', GConf.TostSuucessGonf)
                setTimeout(() => {  window.location.href = "/S/sk"; }, 500)
                setLS(false)
            } else {
                setLS(false)
            }
            console.log(response.data)
        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de supprimer l'article  </div></>, GConf.TostInternetGonf)   
              setLS(false)
            }
          });
    }
    const checkPrixCompatiblite = () =>{
        if(classesD.PrixA && classesD.PrixV){
            if(classesD.PrixA > classesD.PrixV) {
                toast.error("Le Prix d'achat > Prix de Vente", GConf.TostErrorGonf)
                setClassesD({...classesD, PrixV: '', PrixA: '' })
            } 
        }  
    }
 
    const OnKeyPressFunc = (e) => {
        if (!((e.charCode >= 65 && e.charCode <= 90) || (e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 48 && e.charCode <= 57) || e.charCode == 42 || e.charCode == 32 || e.charCode == 47 )) {
            e.preventDefault();
        }   
    }
   /*#########################[Card]##################################*/
    const ClassesCard = (props) =>{
        const ReptureState = () =>{
            return (
            props.data.Repture >= props.data.Quantite ? <span className='bi bi-exclamation-triangle-fill bi-sm text-danger'></span> : <span className='bi bi-box2-heart-fill bi-sm text-success'></span>
            )
        }
        return (<>

            <div className="sticky-top" style={{top:'70px'}}>
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="upper">
                        <div className="mcbg main-big-card"></div>
                    </div>
                    <div className="img-card-container text-center">
                        <div className="card-container notification">
                            <img src={`https://cdn.abyedh.tn/images/system/garderie/classes.jpg`} className="rounded-circle bg-white" width="80px" height="80px" />                    
                        </div>
                    </div>
                    <div className="mt-5 text-center">
                            <h4 className='mt-2'>{loading ? props.data.CL_Name : SKLT.BarreSkl } </h4> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.CL_Niveaux } </>: SKLT.BarreSkl} </h6>
                            <Divider horizontal className='text-secondary mt-4'>Stat</Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {eleveListe.length} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Eleve</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {profListe.length} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Prof</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Quantite</Divider>
                            <div className='row text-center'>
                                <div className='col-12 mb-3'>
                                    <Statistic color='green' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Repture} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                    </Statistic>
                                </div>
                                <div className='col-6  align-self-center border-end'>
                                    <ReptureState />
                                </div>
                                <div className='col-6 align-self-center'>
                                <h6 className='mb-1'> Repture En: {props.data.Repture}</h6> 
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
    const Calendar = () =>{
        return(<>
        <FullCalendar 
            plugins={[ dayGridPlugin ]}
            //initialView="dayGridMonth"
            locale='fr' 
            events={articleEvents}
            height='420px'
            navLinks ={true}
        />
        {/* <div className='row mt-2'>
            <div className='col'><span className='bi bi-circle-fill text-success '></span> Par Bon entre</div>
            <div className='col'><span className='bi bi-circle-fill text-warning '></span> Par Bon Sortie</div>
            <div className='col'><span className='bi bi-circle-fill text-primary '></span> Dans Factures</div>
            <div className='col'><span className='bi bi-circle-fill text-danger '></span> Vers Camion</div>
        </div> */}
        </>)
    }
    const DeleteClassesCard = () =>{
        return(<>
            <h3 className="text-secondary">Voulez-Vous Vraimment Supprimer Cett Article ?</h3> 
            <div className='row'>
                <div className='col-9'>
                    <h5 className="text-danger text-left"><b>Lorsque Vous Supprimer L'Article : </b></h5>
                    <ul className="text-info text-left">
                    <li>L'article ne sera pas visible dans la branche 'Stock'</li>
                    <li>Tous les article avec son code a barre se suppriment </li>
                    <li>L'article Soit visible seulemment dans les facture  </li>
                    </ul>
                </div>
                <div className='col-lg-3 d-none d-lg-block align-self-center'>
                    <div className='text-center'>
                            <img src='https://assets.ansl.tn/Images/usful/delete.svg' width='80%'  height='80px' /> 
                    </div> 
                </div>
            </div>
            <div className='text-end'>
                <button type="submit" name="add" className="btn btn-danger rounded-pill" onClick={DeleteArticle}><span className="bi bi-check"></span> Oui, Supprimer <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></button>
            </div>
        </>)
    }
    const IngredientCard = () =>{
        const PriceUpdateCard = () =>{
            return(<>
                <div className='bg-danger text-white card-body mb-1 border-div'>
                    <div className='row'>
                        <div className='col-8'>
                            <span className='bi bi-exclamation-triangle-fill text-warning bi-sm me-2'></span>  
                            Le Cout de plat a éte augmenteé !!
                        </div>
                        <div className='col-4'></div>
                    </div>
                </div> 
            </>)
        }
        return(<>
                <h5 className='mb-1'>Entrez les ingredient de ce plat </h5>
                {classesD.Cout < CalculateNewPrice() ? <PriceUpdateCard /> : '' }
                <div className='row mb-2 '>
                    <div className='col-6 '>
                        <h5>Ajouter article</h5> 
                        <datalist id="articlesList">
                                {stock.map((test) =>
                                <option key={test.key} value={test.A_Code}>{test.Name}</option>
                                )}
                        </datalist>
                        <Input icon='pin' list="articlesList" placeholder='Entre aarticle'  onBlur={ (e) => GetclassesData(e.target.value)} size="small" iconPosition='left'   fluid className='mb-1' /> 
                        <div className='m-2 text-secondary'><b> <span className='bi bi-upc '></span> Code a barre : {articleNow.A_Code} </b></div>
                        <div className='m-2 text-danger'><b><span className='bi bi-star-fill '></span> Nom : {articleNow.Name} </b></div> 
                        <div className='row'>
                            <div className='col-6'>
                            <div className='m-2 mb-4 text-success'><b><span className='bi bi-currency-dollar '></span> Prix : {articleNow.Prix_vente} </b></div> {/* <Input icon='dollar sign' value={articleNow.Prix_vente} size="small" iconPosition='left' placeholder='Prix'  fluid className='mb-1' /> */}
                            </div>
                        </div>
                        <Input icon='dropbox' type='number' value={articleNow.Qte} autoFocus={autofocusState} onChange={ (e) => {articleNow.Qte = e.target.value}} size="small" iconPosition='left' placeholder='Quantite'  fluid className='mb-1' /> 
                        
                        <br />
                        <Button disabled={saveBtnState} className='rounded-pill bg-system-btn' onClick={AddArticleToList}>  <Icon name='edit outline' /> Ajouter</Button>
                
                    </div>
                    <div className='col-6 '>
                            <ul>
                                {ingredienListe.map( (val,index) => <li key={index} >{val.Qte} x {val.Name} = {(val.Prix * val.Qte).toFixed(3)} (<span className='bi bi-trash3-fill bi-xlsm text-danger' onClick={() => DeleteFromUpdateList(val.A_Code)}></span>)</li>)}
                            </ul>
                            <br />
                            <Button onClick={EditIngredientFunction} className='text-end rounded-pill bg-system-btn' positive>  <Icon name='edit' /> Modifier <Loader inverted active={loaderState} inline size='tiny' className='ms-2 text-danger'/></Button>
                    </div>
                </div> 
        </>)
    }
 

    return ( <> 
                <BreadCrumb links={GConf.BreadCrumb.platInfo} />
                <br />
                <div className="row">
                    <div className="col-12 col-lg-4">
                        <ClassesCard data={classesD}/> 
                    </div>
                    <div className="col-12 col-lg-8">
                        <Tab menu={{ secondary: true, pointing: true ,className: "wrapped"}} panes={panes} />
                    </div>  
                </div>
                {/* <FrameForPrint frameId='printResumer' src={`/Pr/Stock/resumer/${code}/${resDay.start}/${resDay.end}`} /> */}
     </> );
}

export default PlatInfo;