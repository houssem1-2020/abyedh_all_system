
import StateData from './WorldMap/stateData'
import CitiesData from './WorldMap/stateData'
import ItaliaMap from './WorldMap/Cities/italia'
import FranceMap from './WorldMap/Cities/france'
import TunisiaMpa from './WorldMap/Cities/tunisie'
import MarrocoMpa from './WorldMap/Cities/marroc'
import EgyptMpa from './WorldMap/Cities/egypt'
import GermanyMpa from './WorldMap/Cities/germany'
import UKMpa from './WorldMap/Cities/united_kingdom'
import RussiaMpa from './WorldMap/Cities/russia'
import CanadaMpa from './WorldMap/Cities/canda'
import USAMpa from './WorldMap/Cities/united_states'
import SAMpa from './WorldMap/Cities/saudi_arabia'
import QatarMpa from './WorldMap/Cities/qatar'
import EmaratesMpa from './WorldMap/Cities/emarates'
import JapanMpa from './WorldMap/Cities/japan'
import IndiaMpa from './WorldMap/Cities/india'
import ChinaMpa from './WorldMap/Cities/china'
import WorldMapList from './WorldMap/countryData'

const WorldMap = {
    worldCountries : WorldMapList,
    states : StateData,
    //cities :  CitiesData,
    TN : TunisiaMpa,
    MA : MarrocoMpa,
    EG : EgyptMpa,
    
    IT : ItaliaMap,
    FR : FranceMap,
    DE : GermanyMpa,
    GB : UKMpa,
    RU : RussiaMpa,
    
    CA : CanadaMpa,
    US : USAMpa,
    
    SA : SAMpa,
    QA : QatarMpa,
    AE : EmaratesMpa,
    JP : JapanMpa,
    IN : IndiaMpa,
    CN : ChinaMpa,
     

}
export default WorldMap ;