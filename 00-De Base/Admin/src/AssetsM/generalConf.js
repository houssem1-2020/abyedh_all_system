import AbyedhADIL from './ADIL'
import TunMap from './tunMap'

const GetPID = () =>{
    const pidIsSet = localStorage.getItem('ADMIN_ID');
    return pidIsSet
}
const GConf = {

    // main variables
    PID: GetPID(),
    ADIL:AbyedhADIL,
    abyedhMap : TunMap,
    ApiLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/admin', //https://api.system.abyedh.tn/apiSystemAbyedh/ 
    ApiInputLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/admindir', //https://api.system.abyedh.tn/apiSystemAbyedh/ 
    ApiCamionLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/admin', //https://api.system.abyedh.tn/apiSystemAbyedh/ 
    DefaultTva: 0,
    themeColor : '#e31945',
    themeColorLigth : '#b8cbd4',
    TostErrorGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        // className:'toast-bg-card text-danger font-bold'
    },
    TostSuucessGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        //className:'toast-bg-card text-success font-bold'
    },
    TostInternetGonf : {
        position: "bottom-center",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    },
    LeafleftIcon : {
        iconUrl: require("leaflet/dist/images/position.gif"),
        iconRetinaUrl: require("leaflet/dist/images/position.gif"),
        iconSize: [10,10],
        shadowSize: [0,0],
        shadowUrl: '',
        shadowSize:   [0,0],
        iconAnchor:   [0,0],
        shadowAnchor: [0,0],
        popupAnchor:  [0,0]
    },
    LeafleftIconP : {
        iconUrl: require("leaflet/dist/images/position-personal.gif"),
        iconRetinaUrl: require("leaflet/dist/images/position-personal.gif"),
        iconSize: [10,10],
        shadowSize: [0,0],
        shadowUrl: '',
        shadowSize:   [0,0],
        iconAnchor:   [0,0],
        shadowAnchor: [0,0],
        popupAnchor:  [0,0]
    },

    

    //NavBar Items
    NavsData : [
            {id:1, name:"Acceuil", icon:"house", link:"ma"},
            {id:2, name:"Communications", icon:"calendar2-check", link:"rq"},
            {id:4, name:"Annuaire", icon:"search-heart", link:"an"},
            {id:3, name:"System", icon:"pc-display", link:"sy"},
            {id:5, name:"User", icon:"person-lines-fill", link:"us"},
            {id:6, name:"Clients", icon:"people", link:"cl"},
            {id:7, name:"Equipe", icon:"person-bounding-box", link:"tm"},
            // {id:8, name:"Outils", icon:"tools", link:"ot"},
            // {id:9, name:"Stat", icon:"bar-chart-line-fill", link:"st"},
            {id:10, name:"Finance", icon:"cash-coin", link:"fi"},
    ],

    //main stat card
    LinkCard: [
        { id: 1, col: 3 , tag:"System", dataTag:'articlesNum',  icon: 'pc-display', link:'sk/ajouter', smallT: 'System', desc: 'Activeé system' , stat:'22452'},
        { id: 6, col: 3 , tag:"camion", dataTag:'RequestSystem', icon: 'box-arrow-left', link:'cl/demande', smallT: 'Inscription', desc: ' N. Demande' , stat:'22'},
        { id: 2, col: 3 , tag:"Recherche", dataTag:'totalAnnuaire', icon: 'search-heart', link:'ft/ajouter', smallT: 'Recherche', desc: 'N. Record' , stat:'22452'},
        { id: 3, col: 3 , tag:"client", dataTag:'clientsNum', icon: 'person-lines-fill', link:'cl/ajouter', smallT: 'Utilisateur', desc: 'N. Utilisateur' , stat:'1235'},
        { id: 4, col: 3 , tag:"camion", dataTag:'camionsNum', icon: 'people', link:'cm/ajouter-f', smallT: 'Client', desc: 'Ajouter Client' , stat:'22'},
        { id: 5, col: 3 , tag:"camion", dataTag:'equipeNum', icon: 'person-bounding-box', link:'cm/ajouter-f', smallT: 'Equipe', desc: 'N. Membre' , stat:'22'},
        { id: 6, col: 3 , tag:"camion", dataTag:'totalRequest', icon: 'calendar2-check', link:'cm/ajouter-f', smallT: 'Communication', desc: 'Aceeptez C.' , stat:'22'},
        { id: 6, col: 3 , tag:"camion", dataTag:'evaluation', icon: 'cash-coin', link:'cm/ajouter-f', smallT: 'Evaluation', desc: 'Evaluation' , stat:'22'},
        
    ],

    //main chart card
    ChartCard: [
        {id:1, genre: 'b', col:5, text: 'Recette des Camions '},
        {id:2, genre: 'l', col:7, text: 'Evolution de Recette '},
    ],

    //braedCrumb
    BreadCrumb:{
        stockAddArticle: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Ajouter Article', linkable:false}
        ],
        stockFamille: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Familles', linkable:false}
        ],
        stockBE: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Bon d\'entre', linkable:false}
        ],
        stockBS: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Bon de sortie', linkable:false}
        ],
        stockInfo: [
            {id:1, name:'Stock', linkable:true, link:"/S/sk"},
            {id:2, name:'Information', linkable:false}
        ],
        factureAjouter:[
            {id:1, name:'Factures', linkable:true, link:"/S/ft"},
            {id:2, name:'Ajouter Facture', linkable:false}
        ],
        factureInfo:[
            {id:1, name:'Factures', linkable:true, link:"/S/ft"},
            {id:2, name:'Info', linkable:false}
        ],
        factureEdit:[
            {id:1, name:'Factures', linkable:true, link:"/S/ft"},
            {id:2, name:'Modification', linkable:false}
        ],
        factureResumer:[
            {id:1, name:'Factures', linkable:true, link:"/S/ft"},
            {id:2, name:'Resumer', linkable:false}
        ],
        CamionAdd: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Ajouter Camion', linkable:false}
        ],
        CamionAddFond: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Ajouter Fond', linkable:false}
        ],
        CamionFondInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Info', linkable:true, link:"/S/cm"},
            {id:3, name:'Fond', linkable:true, link:"/S/cm"},
            {id:4, name:'Voir', linkable:false}
        ],
        CamionEditFond: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Info', linkable:true, link:"/S/cm"},
            {id:3, name:'Fond', linkable:true, link:"/S/cm"},
            {id:4, name:'Modifier', linkable:false}
        ],
        CamionInv: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Inventaire Camion', linkable:false}
        ],
        CamionInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Info', linkable:false}
        ],
        CamionArticleInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Info', linkable:true, link:".."},
            {id:3, name:'Article', linkable:false}
        ],
        CamionFactureInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/cm"},
            {id:2, name:'Info', linkable:true, link:".."},
            {id:3, name:'Factures', linkable:true, link:".."},
            {id:4, name:'Voir', linkable:false}
        ],
        ClientAdd: [
            {id:1, name:'Client', linkable:true, link:"/S/cl"},
            {id:2, name:'Ajouter Client', linkable:false}
        ],
        ClientInfo: [
            {id:1, name:'Client', linkable:true, link:"/S/cl"},
            {id:2, name:'Info', linkable:false}
        ],
        ClientMap: [
            {id:1, name:'Client', linkable:true, link:"/S/cl"},
            {id:2, name:'Map', linkable:false}
        ],
        ClientRegion: [
            {id:1, name:'Client', linkable:true, link:"/S/cl"},
            {id:2, name:'Regions', linkable:false}
        ],
        RequestInfo: [
            {id:1, name:'Commandes', linkable:true, link:"/S/rq"},
            {id:2, name:'Info', linkable:false}
        ],
        RequestCalendar: [
            {id:1, name:'Commandes', linkable:true, link:"/S/rq"},
            {id:2, name:'Calendrier', linkable:false}
        ],
        RequestCompte: [
            {id:1, name:'Commandes', linkable:true, link:"/S/rq"},
            {id:2, name:'Comptes', linkable:false}
        ],
        RequestReg: [
            {id:1, name:'Commandes', linkable:true, link:"/S/rq"},
            {id:2, name:'Regrouppemment', linkable:false}
        ],
        FournisseurAdd: [
            {id:1, name:'Fournisseur', linkable:true, link:"/S/fs"},
            {id:2, name:'Regrouppemment', linkable:false}
        ],
        FournisseurCalendar: [
            {id:1, name:'Fournisseur', linkable:true, link:"/S/fs"},
            {id:2, name:'Regrouppemment', linkable:false}
        ],
        FournisseurSearch: [
            {id:1, name:'Fournisseur', linkable:true, link:"/S/fs"},
            {id:2, name:'Regrouppemment', linkable:false}
        ],
        FournisseurInfo: [
            {id:1, name:'Fournisseur', linkable:true, link:"/S/fs"},
            {id:2, name:'Regrouppemment', linkable:false}
        ],
        TeamAdd: [
            {id:1, name:'Equipe', linkable:true, link:"/S/tm"},
            {id:2, name:'Ajouter', linkable:false}
        ],
        TeamInfo: [
            {id:1, name:'Equipe', linkable:true, link:"/S/tm"},
            {id:2, name:'Info', linkable:false}
        ],
        TeamPoste: [
            {id:1, name:'Equipe', linkable:true, link:"/S/tm"},
            {id:2, name:'Postes', linkable:false}
        ],
        TeamDemande: [
            {id:1, name:'Equipe', linkable:true, link:"/S/tm"},
            {id:2, name:'Demmande emlpoi', linkable:false}
        ],


    },

    //SubNavs
    SubNavs: {
        request: [
            {id:1,  icon: 'check-circle', text: 'Accepté', link: 'g/accepte', dropD: false},
            {id:2,  icon: 'x-circle', text: 'Refusé', link: 'g/refusee', dropD: false},
            {id:3, icon: 'exclamation-circle', text: 'En Attent', link: 'g/en-attent', dropD: false },
        ],
        camion: [
            {id:1,  icon: 'plus-circle', text: 'Ajouter Membre', link: 'ajouter-c', dropD: false},
            // {id:2,  icon: 'truck', text: 'Ajouter Fonds', link: 'ajouter-f', dropD: false},
            // {id:3,  icon: 'sliders', text: 'Inventaire', link: 'inventaire', dropD: false},
        ],
        Stock: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux article', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille', link: 'famille', dropD: false },
            {id:3, icon: 'box-arrow-in-up', text: 'Bond entre', link: 'be', dropD: false },
            {id:4, icon: 'box-arrow-up', text: 'Bond Sortie', link: 'bs', dropD: false },
        ],
        facture: [
            {id:1,  icon: 'receipt', text: 'Ajouter', link: 'ajouter', dropD: false},
            {id:2,  icon: 'receipt', text: 'Modifier', link: 'ajouter', dropD: false},
            {id:3,  icon: 'file-earmark-medical-fill', text: 'Image', link: 'resumer', dropD: false},
            {id:4,  icon: 'file-earmark-medical-fill', text: 'Position', link: 'resumer', dropD: false},
            {id:5,  icon: 'file-earmark-medical-fill', text: 'Activer', link: 'resumer', dropD: false},
        ],
        client: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Client', link: 'ajouter', dropD: false},
            // {id:2,  icon: 'map-fill', text: 'Régions', link: 'regions', dropD: false},
            {id:2 ,  icon: 'map-fill', text: 'Demande', link: 'demande', dropD: false},
            {id:3 ,  icon: 'bar-chart-line-fill', text: 'Statistique', link: 'map', dropD: false},
        ],
        Commande: [
            {id:1,  icon: 'person-plus-fill', text: 'Comptes', link: 'comptes', dropD: false},
            {id:2,  icon: 'calendar-fill', text: 'Calendrier', link: 'calendrier', dropD: false},
        ],
        Fournisseur: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Fornisseur', link: 'ajouter', dropD: false},
            {id:2,  icon: 'calendar-week-fill', text: 'Calendrier', link: 'calendrier', dropD: false},
            {id:3,  icon: 'search-heart', text: 'Recherche', link: 'recherche', dropD: false},
        ],
        Equipe: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Membre', link: 'ajouter', dropD: false},
            {id:2,  icon: 'stars', text: 'Postes', link: 'postes', dropD: false},
            // {id:3,  icon: 'folder2-open', text: 'Demandes', link: 'demmande', dropD: false},
        ],
    },
    
    //TableHead
    TableHead:{
        facture:['ID','Nom','Cree','Volume','Size','Voir'],
        request:['*','ID','Nom', 'Cree','Volume','Size','Voir'],
        stock:['*','Nom', 'TAG', 'color','link','X','Voir'],
        camion:['*','Camion','Matricule', 'Chauffeur','Fond','Recette','X','Voir'],
        camionStock:['Code', 'Nom', 'Genre','Stock','Prix','Voir'],
        camionFacture:['ID','Client','Jour','Totale','Voir'],
        camionFond:['ID','Date','Totale', 'SDF','SCF','Voir'],
        client:['*','Nom','UID', 'PID','Tel', 'Location','Adresse','Voir'],
        clientCommande:['ID', 'Passé le','Volu le','Totale','Etat','Voir'],
        clientFacture:['ID','Client','Jour','Totale','Voir'],
        clientFactureC:['ID','Client','Jour','Totale','Voir'],
        team:['*','Nom','Tel', 'CIN','Commencé', 'Post','Voir'],
        fournisseur:['*','MF','Nom','Tel', 'Adresse','Genre', 'Jour','Voir']

    },

    //setting
    Setting: [
        { id: '01', title: "Activation", image: "01", description: "Etat de cabinet, camera, laboratoire ...", link:"activation"},
        { id: '02', title: "Profile", image: "02", description: "moupouhpouhpouhpouhpuohpouhp...", link:"p/1",
          items:[
                {id: 1, genre:'C', title:"Ouverture & Fermeture", icon:"bell-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
                {id: 2, genre:'C', title:"Permission des Commentaires", icon:"chat-left-quote-fill", text:"Permettre à des visiteurs de votre profil de poster des commentaires.", state:true},
                {id: 3, genre:'C', title:"Reception des Messages", icon:"envelope-paper-heart-fill", text:"Autorisée les nouveaux messages pour les non-clients ", state:true},
            ]
        },
        { id: '03', title: "Commandes", image: "04", description: "Etat de cabinet, camera, laboratoire ...", link:"p/3",
            items:[
                {id: 1, genre:'C', title:"Reception des commandes", icon:"calendar4-week", text:"Accepter ou Reffuseé des Commandes", state:'checked'},
                {id: 2, genre:'I', title:"Nombre maximale des commandes", icon:"123", text:"Nombre Maximales des commandes par jour ", state:true},
                {id: 3, genre:'C', title:"Auto-facturation des  commandes", icon:"receipt-cutoff", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '04', title: "Stock", image: "03", description: "Etat de cabinet, camera, laboratoire ...", link:"p/2",
            items:[
                {id: 1, genre:'C', title:"Ajouter des nouveaux articles ", icon:"upc-scan", text:"Autoriseé l'ajout des nouveaux articles", state:'checked'},
                {id: 2, genre:'C', title:"Autoriseé Bon d'entre ", icon:"box-arrow-in-down", text:"Autoriseé l'enregistremment des bons d'entreés", state:true},
                {id: 3, genre:'C', title:"Autoriseé Bon de sortie", icon:"box-arrow-up", text:"Autoriseé l'enregistremment des bons de sortie", state:true},
            ]
        },
        { id: '05', title: "Factures", image: "05", description: "Etat de cabinet, camera, laboratoire ...", link:"p/4",
            items:[
                {id: 1, genre:'I', title:" Nombre des Factures", icon:"receipt", text:"Nombre Maximale des factures par jour ", state:'checked'},
                {id: 2, genre:'C', title:" Client Passager", icon:"person-heart", text:"Autoriseé les factures pour client : Passager", state:true},
                {id: 3, genre:'C', title:" Gratuité", icon:"gift", text:"Autoriseé la gratuité pour les articles ", state:true},
            ]
        },
        { id: '06', title: "Camions", image: "06", description: "Etat de cabinet, camera, laboratoire ...", link:"p/5",
            items:[
                {id: 1, genre:'C', title:" Ajouter nouveaux camions", icon:"truck", text:"Autoriseé l'ajout des nouveaux camions", state:'checked'},
                {id: 2, genre:'C', title:" Ajouter fond aux camions", icon:"basket2", text:"Autoriseé l'ajout des fond aux camions ", state:true},
                {id: 3, genre:'C', title:" Faire Inventaire ", icon:"arrow-repeat", text:"Autoriseé l'inventaire aux camions", state:true},
                {id: 4, genre:'C', title:" Controle des camions", icon:"toggles2", text:"Autoriseé le controle (modifier , supprimer stock , ..) des camions", state:true},
            ]
        },
        { id: '07', title: "Clients", image: "06", description: "Etat de cabinet, camera, laboratoire ...", link:"p/5",
            items:[
                {id: 1, genre:'C', title:" Ajouter Clients Par Camions ", icon:"person-heart", text:"Autoriseé L'ajout d'un client par comptes camions", state:'checked'},
                {id: 2, genre:'C', title:" Ajouter Regions Par Camion ", icon:"map-fill", text:"Autoriseé L'ajout des regiuons par comptes camions", state:true},
                {id: 3, genre:'C', title:" Fixer Posistion Clients Par Camions", icon:"geo-alt-fill", text:"Autoriseé le modification du position clients par comptes camions", state:true},
            ]
        },
        { id: '08', title: "Equipe", image: "06", description: "Etat de cabinet, camera, laboratoire ...", link:"p/5",
            items:[
                {id: 1, genre:'C', title:" Recéptions des exigence d'emploi", icon:"file-earmark-person", text:"Recevoire des demmandes de travaille", state:'checked'},
                {id: 4, genre:'I', title:" Nombre maximale des missions", icon:"check2-square", text:"Npmbre maximale des mission pour membre par jour ", state:true},
            ]
        },
    ]

}
 
export default GConf 