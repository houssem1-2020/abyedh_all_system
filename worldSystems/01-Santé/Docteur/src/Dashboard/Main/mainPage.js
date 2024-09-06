import React  , { useEffect, useState } from 'react';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import date from 'date-and-time';
import de from 'date-and-time/locale/de';
import en from 'date-and-time/locale/en';
import fr from 'date-and-time/locale/fr';
import ru from 'date-and-time/locale/ru';
import zh from 'date-and-time/locale/zh-cn';
import hi from 'date-and-time/locale/hi';
import ja from 'date-and-time/locale/ja';
import it from 'date-and-time/locale/it';
import { Bounce, Slide } from 'react-reveal';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NavLink } from 'react-router-dom';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import { Tab } from 'semantic-ui-react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';


function MainPage() {
    /*#########################[Const]##################################*/
    const localsystemTag = localStorage.getItem(`${GConf.PID}_Secure_key`);
    const [statistique, setStat] = useState([]); 
    const [PieData, setPieData]= useState([])
    const [seanceD, setSeanceD]= useState([])
    const [commandeD, setCommandeD]= useState([])
    const [dataBar, setDataBar]= useState([])
    const [depoTR, setDepoRT]= useState([])
    const [articleEvents , setArticleEvents] = useState([])
    const now = new Date();
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    date.locale(i18n.language.split('_')[0]);
    const panes = [
            {
            menuItem: t('menuTabs.mainPage.tabsCard.seance.tabName') ,
            render: () => <ChartsContainer chart={<PieChartCard data={seanceD}/>} col='4' title={t('menuTabs.mainPage.tabsCard.seance.cardTitle')} />,
            },
            {
                menuItem: t('menuTabs.mainPage.tabsCard.rdv.tabName'),
                render: () => <ChartsContainer chart={<PieChartCard data={commandeD}/>} col='4' title={t('menuTabs.mainPage.tabsCard.rdv.cardTitle')} />,
                },
            {
            menuItem: t('menuTabs.mainPage.tabsCard.patient.tabName'),
            render: () => <ChartsContainer chart={<PieChartCard data={PieData}/>} col='4' title={t('menuTabs.mainPage.tabsCard.patient.cardTitle')} />,
            },
    ]

    const FakeData = [
        { name: '1',  value: 10 },
        { name: '2',  value: 20 },
        { name: '3',  value: 30 },
        { name: '4',  value: 10 },
        { name: '5',  value: 50 },
        { name: '6',  value: 180 },
        { name: '7',  value: 102 },
        { name: '8',  value: 54 },
    ]

    
     
   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/ma/stat`, {
            PID : GConf.PID,
          })
          .then(function (response) {

            if(response.data.activationState  && new Date(response.data.activationState.ExpiredThe) < new Date()){
                //LogOut()
                toast.error(<><div className='card-body w-100'>
                            <h3 className='text-danger'>Votre System est Expiré</h3> 
                                vous devez réactiver votre système , Voir <a href='/S/Parametre/paymment'> Paimment </a> pour plus d'info 
                                {/* ou bien contactez l'administration ABYEDH */}
                            </div>
                            </>, GConf.TostExpired)
            }

            setStat(response.data)

            let seanceDist = []
            response.data.seanceDistro.map((datacld) => seanceDist.push({ name: datacld.PA_Name, value: datacld.Totale }))
            setSeanceD(seanceDist)

            let rendyVousDist = []
            response.data.rendyVousDistro.map((datacld) => rendyVousDist.push({ name: datacld.State, value: datacld.Totale }))
            setCommandeD(rendyVousDist)
            
            let patiendDist = []
            response.data.patientDistro.map((datacld) => patiendDist.push({ name: datacld.Gouv, value: datacld.Totale }))
            setPieData(patiendDist)

            let DepoRT = []
            response.data.evolutionSeance.map((data) => DepoRT.push({ name: data.S_Date.split('T')[0],  value: data.Totale.toFixed(3) }))
            setDepoRT(DepoRT)

            let calendarData = []
            response.data.rdvCalendar.map( (getData) => calendarData.push( { title: getData.Name , date: new Date(getData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}))
            setArticleEvents(calendarData)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Les Donnée importeé sont les ancien donneé</div></>, GConf.TostInternetGonf) 
            }
          });
         
    }, [])

    /*###########################[Function]############################ */
    const  capitalizeFirstLetter = (string) =>{
        return string.replace(/ .*/,'');
    }
    
    /*#########################[Card]##################################*/
    const LinkCard =  (props) => {

        return (<>
                
                <div className={`col-12 col-md -${props.data.col} mb-3`}>
                    <div className="card card-body bg-hover-card shadow-sm pb-2 border-div">
                        <NavLink exact="true" to={`../${props.data.link}`}   className="stretched-link" />
                        <div className="row">
                            <div className="col-4 align-self-center p-2">
                            <span className={`bi bi-${props.data.icon} bi-lg`} style={{color:GConf.themeColor}}></span>
                            </div>
                            <div className='col-8 align-self-center text-end p-2'>
                                <div className="text-center">
                                <h3 ><CountUp end={statistique[props.data.dataTag]} duration={3} /></h3>
                                    <small>  {t(`menuTabs.mainPage.LinksCardItems.${props.data.dataTag}.title`)} </small>
                                </div>
                            </div>
                        <div className='col-12 border-top pt-1 '>
                            <div className="row p-2" style={{color:GConf.themeColor}}>
                                <div className="col-10 align-self-center">{t(`menuTabs.mainPage.LinksCardItems.${props.data.dataTag}.desc`)} </div>
                                <div className="col-2 align-self-center"><span className="bi bi-arrow-right-short bi-sm"></span></div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                
        </>);
    }
    const PieChartCard =  (props) =>{
        
        const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
        return (
            <PieChart width={300} height={200} >
              <Pie
                data={props.data}
                cx={150}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {PieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          );
    }
    const LineChts = (props) => {
        return (<>
           <ResponsiveContainer width="100%" height={140} >
                <AreaChart
                    width={200}
                    height={60}
                    data={depoTR}
                    margin={{ top: 20, right: 0, left: 0, bottom: 0, }}
                >
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={GConf.themeColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={GConf.themeColor} stopOpacity={0}/>
                    </linearGradient>
                </defs>
                    <Tooltip />
                        <Area type="monotone" dataKey="value" stroke={GConf.themeColor} strokeWidth={3} fill="url(#colorUv)" />
                        <XAxis hide  dataKey="name" />
                        <YAxis hide domain={[0, (Math.max(...depoTR.map(o => o.value)) + 10)]} />
          </AreaChart>
            </ResponsiveContainer>
        </>)
    }
    const BarCht = (props) => {

        return (<>
        <ResponsiveContainer  height={200} >
            <BarChart
                layout="vertical"
                data={dataBar} 
            >
                <Tooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" fill={GConf.themeColor}  barSize={15}  radius={[0, 10, 10, 0]}/>
                <XAxis type="number" domain={[0, (Math.max(...dataBar.map(o => o.value)) + 10)]} hide  dataKey="value"/>
                <YAxis type="category"   dataKey='name' />
                
            </BarChart>
        </ResponsiveContainer>
        </>)
    }
    const TopCardTime = () =>{
        return(<>
            <div className='card card-body mb-4 rounded-system  main-big-card shaodw-sm'>
                <div className='row'>
                    <div className='col-8'>
                        <h1 className='text-white mb-0'>{date.format(now, 'dddd')}</h1>
                        <h1 className='text-white mt-0'>{date.format(now, ' DD - MMMM - YYYY')}</h1>
                    </div>
                    <div className='col-4 text-end align-self-center'>
                        <h1 style={{color:GConf.themeColor}}>{date.format(now, 'HH:mm')}</h1>
                    </div>
                </div>
            </div>
        </>)
    }
    const LinksCrads = () => {
        return(<>
            <div className="row justify-content-center mb-4">
                {GConf.LinkCard.map((stat,index) =>
                    <LinkCard key={index} data={stat}   />
                )}
            </div>
        </>)
    }
    const ChartsContainer = (props) =>{
        return(<>
                {/* <div className={`col-12 col-lg-${props.col} mb-4`}> */}
                
                    <div className="card p-1  border-div ">
                        <h6 className='card-body'><b>{props.title}</b></h6>
                        {props.chart}
                    </div>
                    
                {/* </div> */}
                </>)
    }

    /*#########################[Functions]##################################*/
    const LogOut = () =>{
        localStorage.clear();
        window.location.href = "/login";
    }
    const PrintFunction = () =>{
        const transformedData = {};
            for (const key in GConf.SubNavs) {
                if (GConf.SubNavs.hasOwnProperty(key)) {
                const breadcrumb = GConf.SubNavs[key];
                transformedData[key] = {};
                breadcrumb.forEach(item => {
                    transformedData[key][item.id] = item.text;
                });
                }
            }
        console.log(transformedData)
    }

    return (<>
        {/* <pre>{JSON.stringify(PrintFunction(), null, 4)}</pre> */}
        <br />
        <TopCardTime />
        {/* <h1>{t('loginPage.inputIdentifiantText')}</h1> */}
        <Slide  bottom > 
            <LinksCrads /> 
            <div className='row p-0'>
                <div className='col-12 col-lg-8 mb-4 '> 
                    <FullCalendar 
                        plugins={[ dayGridPlugin ]}
                        initialView="dayGridMonth"
                        locale={ i18n.language ? i18n.language.split('_')[0] : 'en'} 
                        events={articleEvents}
                        height='500px'
                        //allDaySlot= {false}
                        navLinks={true}
                        //buttonText= {{ today:    'aujourd\'hui', }}
                    />

                </div>
                <div className='col-12 col-lg-4 mb-4'> 

                        <div className="card p-1 border-div mb-2">
                            <h6 className='m-1'><b>{t('menuTabs.mainPage.evolutionCard.title')}</b></h6>
                            <LineChts />
                        </div>
                
                        <Tab menu={{ secondary: true }} panes={panes} />
                </div>
            </div>
  
        </Slide > 
 
    </>);
}

export default MainPage;