
const TwoGConf = {
    TwoLocalStorage: JSON.parse(localStorage.getItem('Restaurant_Serveur')), //GetForPID(),
    forPID: JSON.parse(localStorage.getItem('Restaurant_Serveur_LocalD')), //GetForPID(),
    themeMode: localStorage.getItem('Restaurant_Serveur_Theme'),
    twoOffline : JSON.parse(localStorage.getItem(`Restaurant_Serveur_Offline`)),
    
    themeColor: '#2f8d99',
    default_Offline : {stock: [], facture: [],  client:[],  factureToSave:[], clientToSave:[], depensesToSave:[]}, 
    routerName : 'R',
    routerTagName : 'Restaurant_Serveur',


    //main
    main : [
        {id:1, link:'cm', icon:'receipt-cutoff', text:'COMMANDES', desc:''},
        {id:2, link:'mc', icon:'box2-heart-fill', text:'MES COMMANDES', desc:''},
        {id:3, link:'cg', icon:'folder2-open', text:'Mon Stock', desc:''},
        {id:4, link:'cg/familles', icon:'boxes', text:'Familles', desc:''},
        {id:5, link:'cl/ajouter', icon:'person-plus-fill', text:'Ajouter Client', desc:''},
        {id:6, link:'cl/recherche', icon:'search', text:'Recherche', desc:''},
        {id:7, link:'cl/pointage', icon:'geo-alt', text:'Pointage', desc:''},
        {id:8, link:'cl/List', icon:'person-lines-fill', text:'Liste Compléte', desc:''},  
        {id:9, link:'rt', icon:'currency-exchange', text:'Recette', desc:''},  
        {id:10, link:'stat', icon:'bar-chart-line', text:'Statistiques', desc:''},  
    ],

    //return back card 
    backCard:{
        nv : {id:1, text:'Nouveaux Commande', link:'/R/L'},

        cl : {id:2, text:'Client Info', link:'/R/L/cl/List'},
        clAdd : {id:3, text:'Ajouter Client', link:'/R/L'},
        clPtg : {id:4, text:'Pointage des Clients', link:'/R/L'},
        clMap : {id:5, text:'Recherche des Clients', link:'/R/L'},
        clList : {id:6, text:'Liste des Clients', link:'/R/L'},

        mc : {id:7, text:'Mes Commandes', link:'/R/L'},
        mcInfo : {id:8, text:'Commande Info', link:'/R/L'},
        mcInfo : {id:9, text:'Modifier Commande', link:'/R/L'},

        cg : {id:10, text:'Catalogue', link:'/R/L'},
        cgList : {id:11, text:'Liste des Articles', link:'/R/L'},
        cgFamille : {id:12, text:'Liste des Familles', link:'/R/L'},
        cgInfo : {id:13, text:'Info Sur Article', link:'/R/L'},
        cgPhoto: {id:14, text:'Ajoiuter Photo', link:'/R/L'},

        up: {id:15, text:'Mettre A jour', link:'/R/L'},
        rt: {id:15, text:'Resumer', link:'/R/L'},
        stat: {id:15, text:'Statistique', link:'/R/L'},
    }
}
export default TwoGConf