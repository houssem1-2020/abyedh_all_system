const mainTag = 'gym'
const spesificTag = 'gym_reception'

const OneGConf = {
    OneLocalStorage: JSON.parse(localStorage.getItem('Restaurant_Caisse')), //GetForPID(),
    forPID: JSON.parse(localStorage.getItem(`${mainTag}_${spesificTag}_forPID`)),  
    themeMode: localStorage.getItem(`${mainTag}_${spesificTag}_Theme`),
    oneOffline : JSON.parse(localStorage.getItem(`${mainTag}_${spesificTag}_offline`)),
    
    themeColor: '#2f8d99',
    default_Offline : {abonnementListe: [], membresListe: [],  seancesListe:[] , seancesToSave:[]}, 
    routerName : 'C',
    routerTagName : `${mainTag}_${spesificTag}`,
    topBarName : 'T_Name',
    
    loginData : {
        tableToLgIn : '06_gym_team',
        Identifiant : 'Identifiant',
        Password : 'Password',
        LogId : 'Now_Login_ID',
        ID_Tag : 'T_ID'
    },

    main : [
        {id:1, link:'ns', icon:'hourglass-split', text:'ENREGISTRER SEANCE', desc:''},
        {id:2, link:'nvmb', icon:'person-check', text:'NOUVEAUX MEMBRE', desc:''},
        {id:3, link:'nvab', icon:'credit-card-fill', text:'NOUVEAUX ABANEMMENT', desc:''},
        {id:4, link:'rnv', icon:'arrow-repeat', text:'RENOUVELLEMENT', desc:''},
    ],

    //return back card 
    backCard:{
        nv : {id:1, text:'Nouveaux Facture', link:'/C/L'},
        pann : {id:1, text:'Nouveaux Facture', link:'/C/L/sk'},

        mf : {id:7, text:'Mes Factures', link:'/C/L/rt'},
        mfInfo : {id:8, text:'Facture Info', link:'/C/L/rt/vente'},
        mfEdit : {id:8, text:'Modifier Facture', link:'/C/L/rt/vente'},
       
        sk : {id:9, text:'Stock', link:'/C/L'},
        skList : {id:10, text:'Mon Stock', link:'/C/L/sk'},
        skInfo : {id:12, text:'Info Sur Article', link:'/C/L/sk'},
        skfamilleList: {id:13, text:'Mon Stock', link:'/C/L/sk/Famille'},
        skFond: {id:13, text:'Fonds', link:'/C/L/sk'},
        skFondD: {id:14, text:'Fonds Info', link:'/C/L/sk'},

        vt : {id:1, text:'Mes Ventes', link:'/C/L'},
        vtRech : {id:1, text:'Recherche', link:'/C/L/vt'},
        vtJour : {id:1, text:'Aujourd\'hui', link:'/C/L/vt'},

        cl : {id:2, text:'Client', link:'/C/L'},
        clAdd : {id:3, text:'Ajouter Client', link:'/C/L/cl'},
        clPtg : {id:4, text:'Pointage des Clients', link:'/C/L/cl'},
        clMap : {id:5, text:'Recherche des Clients', link:'/C/L/cl'},
        clList : {id:6, text:'Liste des Clients', link:'/C/L'},

        rt : {id:1, text:'Recette', link:'/C/L'},
        rtDeps : {id:1, text:'Depenses', link:'/C/L/rt'},
        rtImpr : {id:1, text:'Imprimer', link:'/C/L/rt'},

        up : {id:1, text:'Mettre a jour ', link:'/C/L'},

    },
    offlineData : [
        {genreName : 'abonnementListe', textName:'Liste des Condidat', tableName:'06_gym_abonnement', offLineValue:'abonnementListe'},
        {genreName : 'membresListe', textName:'Liste des Examain',  tableName:'06_gym_membres', offLineValue:'membresListe'},
        {genreName : 'seancesListe', textName:'Liste des Seances',  tableName:'	06_gym_abonnement_seances', offLineValue:'seancesListe'},
    ]
}
export default OneGConf