const mainTag = 'docteur'
const spesificTag = 'docteur_rdv'

const OneGConf = {
    OneLocalStorage: JSON.parse(localStorage.getItem('Docteur_rdv')),  
    forPID: JSON.parse(localStorage.getItem(`${mainTag}_${spesificTag}_forPID`)),  
    themeMode: localStorage.getItem(`${mainTag}_${spesificTag}_Theme`),
    oneOffline : JSON.parse(localStorage.getItem(`${mainTag}_${spesificTag}_offline`)),
    
    themeColor: '#2f8d99',
    default_Offline : {patientListe: [], rdvListe: [], rdvToSave:[] }, 
    routerName : 'C',
    routerTagName : `${mainTag}_${spesificTag}`,
    topBarName : 'T_Name',

    loginData : {
        tableToLgIn : '01_docteur_team',
        Identifiant : 'Identifiant',
        Password : 'Password',
        LogId : 'Now_Login_ID',
        ID_Tag : 'T_ID'
    },

    main : [
        {id:1, link:'cl', icon:'person', text:'PATIENT', desc:''},
        {id:4, link:'clad', icon:'person-plus', text:'AJOUTER PATIENT', desc:''},
        {id:2, link:'rdv', icon:'calendar-check', text:'RENDY-VOUS', desc:''},
        {id:3, link:'cld', icon:'calendar-week', text:'CALENDRIER', desc:''}, 
    ],

    //return back card 
    backCard:{
        clad : {id:1, text:'Nouveaux Patient', link:'/C/L'},
        cl : {id:9, text:'Liste Des Patient', link:'/C/L'},
        rdv : {id:9, text:'Rendy Vous', link:'/C/L'},
        rdvInf : {id:9, text:'Info de Rendy-Vous', link:'/C/L'},
        cld : {id:9, text:'Calendrier', link:'/C/L'},
        up : {id:9, text:'Mise à Jour', link:'/C/L'},
        rt : {id:1, text:'Recette', link:'/C/L'},


    },
    offlineData : [
        {genreName : 'patientListe', textName:'Liste des Patient', tableName:'01_docteur_patient', offLineValue:'patientListe'},
        {genreName : 'rdvListe', textName:'Liste des RendyVous',  tableName:'01_docteur_calendar', offLineValue:'rdvListe'},
    ]
     
}
export default OneGConf