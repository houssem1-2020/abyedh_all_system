import React  , { useEffect, useState } from 'react';
import axios from 'axios';
import GConf from '../../AssetsM/generalConf';
import date from 'date-and-time';
import fr from 'date-and-time/locale/fr';
import { Bounce, Slide } from 'react-reveal';
import { Area, AreaChart, Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { NavLink } from 'react-router-dom';
import CountUp from 'react-countup';
import { toast } from 'react-toastify';
import { Tab } from 'semantic-ui-react';


function MainPage() {
    /*#########################[Const]##################################*/
    const localsystemTag = localStorage.getItem(`${GConf.PID}_Secure_key`);
    const [statistique, setStat] = useState([]); 
    const [PieData, setPieData]= useState([])
    const [genreD, setGenreD]= useState([])
    const [commandeD, setCommandeD]= useState([])
    const [dataBar, setDataBar]= useState([])
    const [depoTR, setDepoRT]= useState([])
    const now = new Date();
    date.locale(fr)
    const panes = [
            {
            menuItem: 'Communications',
            render: () => <ChartsContainer chart={<PieChartCard data={commandeD}/>} col='4' title='Distrubition des Communications' />,
            },
            {
            menuItem: 'Users',
            render: () => <ChartsContainer chart={<PieChartCard data={genreD}/>} col='4' title='Distrubition des Users' />,
            },
            {
            menuItem: 'Clients',
            render: () => <ChartsContainer chart={<PieChartCard data={PieData}/>} col='4' title='Distrubition des Clients' />,
            },
    ]

   /*#########################[UseEffect]##################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/ma/stat`, {
            PID : GConf.PID,
          })
          .then(function (response) {
            setStat(response.data)
           
            
            let clientDis = []
            response.data.clientDistro.map((datacld) => clientDis.push({ name: datacld.Gouv, value: datacld.Totale }))
            setPieData(clientDis)

            let genreDist = []
            response.data.genreDistro.map((datacld) => genreDist.push({ name: datacld.Genre, value: datacld.Totale }))
            setGenreD(genreDist)

            let commandeDist = []
            response.data.commandeDistro.map((datacld) => commandeDist.push({ name: datacld.State, value: datacld.Totale }))
            setCommandeD(commandeDist)
            
            let camionRT = []
            response.data.camionStat.map((data) => camionRT.push({ name: capitalizeFirstLetter(data.Chauffeur), value: data.Recette }))
            setDataBar(camionRT)

            let DepoRT = []
            response.data.RecetteDepo.map((data) => DepoRT.push({ name: data.Cre_Date.split('T')[0],  value: data.Totale.toFixed(3) }))
            setDepoRT(DepoRT)
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
                
                <div className={`col-6 col-md-${props.data.col} mb-3`}>
                    <div className="card card-body bg-hover-card shadow-sm pb-2 border-div">
                        <NavLink exact="true" to={`../${props.data.link}`}   className="stretched-link" />
                        <div className="row">
                            <div className="col-4 align-self-center p-2">
                            <span className={`bi bi-${props.data.icon} bi-lg`} style={{color:GConf.themeColor}}></span>
                            </div>
                            <div className='col-8 align-self-center text-end p-2'>
                                <div className="text-center">
                                <h3 ><CountUp end={statistique[props.data.dataTag]} duration={1} /></h3>
                                    <small>{props.data.smallT}</small>
                                </div>
                            </div>
                        <div className='col-12 border-top pt-1 '>
                            <div className="row p-2" style={{color:GConf.themeColor}}>
                                <div className="col-10 align-self-center">{props.data.desc}</div>
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
           <ResponsiveContainer width="100%" height={220} >
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
        <ResponsiveContainer  height={150} >
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
    
    return (<>
        <br />
        <TopCardTime />
        <Slide  bottom > 
            <LinksCrads /> 
            <div className='row p-0'>
                <div className='col-12 col-lg-6 mb-4 d-none'><ChartsContainer chart={<BarCht />} col='5' title='Distrubition des Commun. J' /> </div>
                <div className='col-12 col-lg-6 mb-4 d-none'> <ChartsContainer chart={<BarCht />} col='5' title='Distrubition des Commun. M' /></div>
                <div className='col-12 col-lg-8 mb-4 '> 
                        <h5 className='mt-3 mb-4'>Evolution des Client & Users</h5> 
                        <ChartsContainer chart={<LineChts  data={depoTR}/>} col='7' title='' />
                </div>
                <div className='col-12 col-lg-4 mb-4'> <Tab menu={{ secondary: true }} panes={panes} /></div>
            </div>
            <div className="row justify-content-center mb-4 d-none">
                <ChartsContainer chart={<BarCht />} col='5' title='Recette des Camions' />
                <ChartsContainer chart={<LineChts  data={depoTR}/>} col='7' title='Evolution de Recette Depo' />
                <ChartsContainer chart={<PieChartCard data={PieData}/>} col='4' title='Distrubition des client' />
                <ChartsContainer chart={<PieChartCard data={genreD}/>} col='4' title='Distrubition des articless' />
                <ChartsContainer chart={<PieChartCard data={commandeD}/>} col='4' title='Distrubition des commandes' />
            </div>    
        </Slide >    
    </>);
}

export default MainPage;