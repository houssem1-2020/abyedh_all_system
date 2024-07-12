import React, {useEffect,useState}  from 'react';
import APPConf from '../../AssetsM/APPConf';
import { Icon, Menu } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import { Button , Tab} from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Fade } from 'react-reveal';
import SKLT from '../../AssetsM/Cards/usedSlk';
import { useNavigate} from 'react-router-dom';
import TableGrid from '../../AssetsM/Cards/tableGrid';
import { _ } from 'gridjs-react';
import TableImage from '../../AssetsM/Cards/tableImg';
import axios from 'axios';
import { toast } from 'react-toastify';
import FrameForPrint from '../../../AssetsM/Cards/frameForPrint';
import usePrintFunction from '../../../AssetsM/Hooks/printFunction';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';
 
const CustomTabs = ({activeIndex, setActiveIndex, TAG}) => {
    return(<>

           <div className="mt-1 p-1 mb-4"   style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                <Menu secondary >
                    {APPConf.landing[APPConf.systemTag].navItemList2[TAG].map((data,index) =>
                            <Menu.Item key={index} active={activeIndex == data.navIndex} className='rounded-pill' onClick={ () => setActiveIndex(data.navIndex)}>
                                <span style={{color: data.color}}>
                                    <b>
                                    <span className={`bi bi-${data.icon}`}></span> {data.navName}
                                    </b>
                                </span>
                            </Menu.Item>
                     )}
                </Menu>
          </div>
    </>)
}

function RequestPage() {
    /*#########################[Const]##################################*/
    const {TAG} = useParams()
    const [activeIndex, setActiveIndex] = useState(0)
    const [loading, setLoading] = useState(true)
    let [reservationList, setReservationList] = useState([SKLT.TableSlt]); 
    const navigate = useNavigate();
    const PrintFunction = (frameId) =>{usePrintFunction(frameId)}
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const panesRes = [
        {
          menuItem: { key: 'attent',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][0].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
        {
          menuItem: { key: 'vu',  content: <span className='text-warning'><b><span className='bi bi-hourglass-split'></span> En Attent</b></span> , className:'rounded-pill'},
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][1].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
        {
          menuItem: { key: 'accept',  content: <span className='text-success'><b><span className='bi bi-check-square-fill'></span> Accepteé</b></span> , className:'rounded-pill' },
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][2].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
        {
          menuItem: { key: 'refuse',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][3].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
        {
          menuItem: { key: 'retarder',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Retardeé</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][4].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
        {
          menuItem: { key: 'redireter',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Redirecte</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][5].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
        {
          menuItem: { key: 'terminer',  content: <span className='text-danger'><b><span className='bi bi-x-square-fill'></span> Refuseé</b></span>, className:'rounded-pill' },
          render: () => <TableGrid tableData={FetchByGenreReserv(APPConf.landing[APPConf.systemTag].navItemList2[TAG][6].navIndexName)} columns={APPConf.landing[APPConf.systemTag].tableHeader[TAG]} />,
        },
    ]
 
 
    /*#########################[UseEfeect]##################################*/
    useEffect(() => {
        axios.post(`${APPConf.ApiLink}/request`, {
           PID : APPConf.PID,
           SystemTag : TAG
        })
        .then(function (response) {
            if (!response.data) {
                toast.error('Probleme de Connextion', APPConf.TostSuucessGonf)
            } else {
                setReservationList(response.data)
                setLoading(false)
            }
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>Probleme de Connextion</h5> Impossible de Charger La Liste de  Commandes  </div></>, APPConf.TostInternetGonf)   
            setReservationList([])
          }
        });
    }, [])

    /*#########################[Function]##################################*/
    const NavigateFunction = (link) => {  navigate(link) }
    
    const RenderDateFun = (value) => { return(new Date(value).toLocaleDateString('fr-FR').split('/').reverse().join('-')) }
    const LengthFunction = (value) => {  return JSON.parse(value).length }
    const PropFunction = (value, wantedProp) => {  return JSON.parse(value)[wantedProp] }

    const FetchByGenreReserv = (genre) => {    
        let found = reservationList.filter(element => element.State === genre);
        let commandeContainer = [];
        found.forEach(commandeDate => {
            let elements = [
                _(<TableImage forUser image={commandeDate.PictureId} />),
                commandeDate.Name,
                new Date(commandeDate.R_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-'),
                commandeDate.R_Time,
            ];
            
            APPConf.landing[APPConf.systemTag].tableItemList[TAG].map((data,index) => {
                switch (data.genre) {
                    case 'text':
                        elements.push(commandeDate[data.value])
                        break;
                    case 'date':
                        elements.push(RenderDateFun(commandeDate[data.value]))
                        break;
                    case 'lengthFunc':
                        elements.push(LengthFunction(commandeDate[data.value]))
                        break;
                    case 'PropFunction':
                      elements.push(PropFunction(commandeDate[data.value[0]], data.value[1]))
                      break;
                    default:
                        break;
            }
                
            })

            elements.push(
                _(<StateCard status={commandeDate.State} />),
                _( <Button className='rounded-pill bg-system-btn' size='mini' onClick={e => NavigateFunction(`/App/S/rq/info/${TAG}/${commandeDate.R_ID}`)}  > <span className='d-none d-lg-inline'> Info </span> <Icon name='angle right' /> </Button>)
            );
    
            commandeContainer.push(elements);
        });
    
        return commandeContainer;
    };
    
    const FetchByGenreReserv2 = (genre) =>{  
        let found = reservationList.filter(element => element.State === genre)
        let commandeContainer = []
            found.map( (commandeDate) => commandeContainer.push([          
                _(<TableImage forStock image='docteur/rendyvous.png' />),
                commandeDate.Name,
                new Date(commandeDate.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                
                new Date(commandeDate.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ),
                commandeDate.RDV_Time,
                
                _(CheckIsPatientCard(commandeDate.Releted_UID)),
                
                _(<StateCard status={commandeDate.State} />),
                _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/S/rq/info/docteur/${commandeDate.R_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            return(commandeContainer)
    }

    const onShare = async () => {
      if (navigator.share) {
      try {
          const result = await navigator.share({
          title: 'profileData.general[0].Name ',
          text: '${profileData.general[0].Name} - abyedh.com' ,
          url: `http://abyedh.com/S/P/${localStorage.getItem('APP_TAG')}/${localStorage.getItem('PID')}`,
          });
          console.log('Successfully shared', result);
      } catch (error) {
          console.error('Error sharing:', error);
      }
      } else {
      alert('Sharing is not supported in this browser.');
      }
    };

 
    /*#########################[Card]##################################*/
    const StateCard = ({ status }) => {
            const StateCard = (props) =>{ return <span className={`badge bg-${props.color}`}> {props.text} </span>}
            const statusCard = React.useCallback(() => {
              switch(status) {
                case 'W': return <StateCard color='warning' text={t('appPages.requestPage.stateText.W')} />;  
                case 'S': return <StateCard color='info' text={t('appPages.requestPage.stateText.S')} />;  
                case 'A': return <StateCard color='success' text={t('appPages.requestPage.stateText.A')} /> ;
                case 'R': return <StateCard color='danger' text={t('appPages.requestPage.stateText.R')} />;

                case 'RT': return <StateCard color='retarder' text={t('appPages.requestPage.stateText.RT')} />;
                case 'RD': return <StateCard color='rederecter' text={t('appPages.requestPage.stateText.RD')} />;
                case 'LV': return <StateCard color='retarder' text={t('appPages.requestPage.stateText.LV')} />;
                case 'MD': return <StateCard color='redirecter' text={t('appPages.requestPage.stateText.MD')} />;
                case 'PR': return <StateCard color='redirecter' text={t('appPages.requestPage.stateText.PR')} />;
                case 'PI': return <StateCard color='retarder' text={t('appPages.requestPage.stateText.PI')} />;

                case 'T': return <StateCard color='secondary' text={t('appPages.requestPage.stateText.T')} />;
                default:  return <StateCard color='dark' text={t('appPages.requestPage.stateText.default')} />;    
              }
            }, [status]);
          
            return (
              <div className="p-1">
                {statusCard()}
              </div>
            );
    };
    const CheckIsPatientCard = (relatedId) => {
        if (relatedId == null) {  return <span className='bi bi-x-circle-fill bi-xlsm text-danger'></span> } else {  return <span className='bi bi-check-circle-fill bi-xlsm text-success'></span>  }  
    };
   
    const ShareYourselfCard = () =>{
      return(<>
 
          <div className=' card-body border-div mb-4' >
              <h5 dir={isRTL ? 'rtl' : 'ltr'} className='text-danger'> <span className='bi bi-exclamation-octagon-fill'></span> {t('appPages.requestPage.ShareYourselfCard.titleText')} </h5>
              <div dir={isRTL ? 'rtl' : 'ltr'}>
                1- {t('appPages.requestPage.ShareYourselfCard.textOne')}  <br /> 
                {/* <Button size='mini' className='mt-2 rounded-pill' fluid  primary target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=https://abyedh.tn/S/P/${APPConf.systemTag}/${APPConf.PID}&picture=https://en.wikipedia.org/wiki/QR_code#/media/File:QR_code_for_mobile_English_Wikipedia.svg`} >  <Icon name='facebook f' /> إعلان علي الفايسبوك  </Button> */}
                <Button className='mt-2 rounded-pill' fluid     onClick={() => onShare()}  >  <Icon name='share alternate' />  {t('appPages.requestPage.ShareYourselfCard.btnShare')}</Button>
              </div>
              <div dir={isRTL ? 'rtl' : 'ltr'} className='mt-4'>
                2- {t('appPages.requestPage.ShareYourselfCard.textTwo')}  <br />
                <Button className='mt-2 rounded-pill' fluid positive onClick={(e) => PrintFunction('printPID')}> <Icon name='print'  />  {t('appPages.requestPage.ShareYourselfCard.btnPrint')} </Button>
              </div>
          </div>
        </>)
    }
    
    const RequesInfoCard = (props) => {
      return(<>
         <div className='card card-body sharow-sm mb-3 border-div '>
          <div className='row'>
            <div className='col-2 align-self-center'> <TableImage forUser image={props.data.PictureId} /></div>
            <div className='col-7 align-self-center text-start'>
              <h5 className='text-secondary mb-1'>{props.data.Name}</h5>
              <small>{new Date(props.data.R_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')} | {props.data.R_Time}</small>
            </div>
            <div className='col-3   align-self-center text-start'> <StateCard status={props.data.State} /> </div>
          </div>
          <div className='card-body'> 
            
            { APPConf.landing[APPConf.systemTag].tableItemList[TAG].map((data,index) => {
                switch (data.genre) {
                    case 'text': return <div> {APPConf.landing[APPConf.systemTag].tableHeader[TAG][index+4]} {props.data[data.value]} </div>
                        break;
                    case 'date': return <div> {APPConf.landing[APPConf.systemTag].tableHeader[TAG][index+4]} : { RenderDateFun(props.data[data.value]) } </div>
                        break;
                    case 'lengthFunc': return <div> {APPConf.landing[APPConf.systemTag].tableHeader[TAG][index+4]} : { LengthFunction(props.data[data.value]) } </div>
                        break;
                    case 'PropFunction': return <div> {APPConf.landing[APPConf.systemTag].tableHeader[TAG][index+4]} : { PropFunction(props.data[data.value[0]], data.value[1]) } </div>
                      break;
                    default:
                        break;
            }
                
              })
            }
            </div>
           
           <Button className='rounded-pill text-white' style={{backgroundColor : APPConf.landing[APPConf.systemTag].colorTheme}} size='mini' onClick={e => NavigateFunction(`/App/S/rq/info/${TAG}/${props.data.R_ID}`)}  > <span  > Info </span> <Icon name='angle right' /> </Button>
        </div> 
      </>)
    }
    return (<>

            {
              loading ? <span>...</span>
              :
              <>
                {
                  reservationList.length == 0 ? <ShareYourselfCard />
                  :
                  <>
                    {reservationList.map((data,index) => <RequesInfoCard key={index} data={data}  />)} 
                  </>
                }
              </>
            }

           <FrameForPrint frameId='printPID' src={`/App/Profile/ProfilePrint`} />
    </>);
}

export default RequestPage;