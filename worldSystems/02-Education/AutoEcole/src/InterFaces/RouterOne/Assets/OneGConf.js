const mainTag = 'autoecole'
const spesificTag = 'autoecole_moniteur'

const OneGConf = {
    OneLocalStorage: JSON.parse(localStorage.getItem('AutoEcole_Moniteur')), //GetForPID(),
    forPID: JSON.parse(localStorage.getItem(`${mainTag}_${spesificTag}_forPID`)),  
    themeMode: localStorage.getItem(`${mainTag}_${spesificTag}_Theme`),
    oneOffline : JSON.parse(localStorage.getItem(`${mainTag}_${spesificTag}_offline`)),
    
    themeColor: '#2f8d99',
    default_Offline : {condidatListe: [], examainListe: [],  seancesListe:[],  seancesToSave: []}, 
    routerName : 'M',
    routerTagName : `${mainTag}_${spesificTag}`,
    topBarName : 'VO_Name',

    loginData : {
        tableToLgIn : '02_autoecole_voitures',
        Identifiant : 'VO_Identifiant',
        Password : 'VO_Pwd',
        LogId : 'Now_Login_ID',
        ID_Tag : 'VO_ID'
    },

    main : [
        {id:1, link:'ns', icon:'hourglass-split', text:'NOUVEAUX SEANCES', desc:''},
        {id:2, link:'ms', icon:'folder2-open', text:'MES SEANCES', desc:''},
        {id:3, link:'tr', icon:'map', text:'TRAJETS', desc:''},
        {id:4, link:'cl', icon:'calendar-week', text:'EXAMAINS', desc:''},  
    ],


    //return back card 
    backCard:{
        cd : {id:1, text:'Calendrier d\'examain', link:'/M/L'},
        tr : {id:9, text:'Trajet', link:'/M/L'},
        ns : {id:1, text:'Nouveaux Seance', link:'/M/L'},
        sa : {id:7, text:'Mes Seances', link:'/M/L'},
        saInfo : {id:8, text:'Info Seance', link:'/M/L'},
        saEdit : {id:8, text:'Modifier Seance', link:'/M/L'},
        st : {id:1, text:'Prametre', link:'/M/L'},
        up : {id:1, text:'Mettre a jour ', link:'/M/L'},

    },

    offlineData : [
        {genreName : 'condidatListe', textName:'Liste des Condidat', tableName:'02_autoecole_condidat', offLineValue:'condidatListe'},
        {genreName : 'examainListe', textName:'Liste des Examain',  tableName:'02_autoecole_examain', offLineValue:'examainListe'},
        {genreName : 'seancesListe', textName:'Liste des Seances',  tableName:'02_autoecole_seances', offLineValue:'seancesListe'},
    ]

}
export default OneGConf