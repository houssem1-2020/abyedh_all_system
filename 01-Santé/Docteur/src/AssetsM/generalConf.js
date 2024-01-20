
const GetPID = () =>{
    const pidIsSet = localStorage.getItem('PID');
    return pidIsSet
}

const GetSettingValue = () =>{
    const defaultSetting = {
        Stock :[true,false,20],
        Factures :[true,false,20],
    };
    return defaultSetting
}

const GConf = {

    // main variables
    PID: GetPID(),
    ApiLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/docteur', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRouterOneLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/docteur-rdv', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRouterTwoLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/docteur-serveur', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRouterThreeLink : 'https://api.system.abyedh.tn/apiSystemAbyedh/docteur-chef', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    DefaultTva: 0,
    themeColor : '#085947',
    themeColorLigth : '#b8cbd4',
    settingValue : GetSettingValue(),
    offline_default_table : {commande: [], stock: [], famille: [],   facture: [], camion:[], client:[],   articleToSave:[] , factureToSave:[],  camionToSave:[], fondCamionToSave:[], clientToSave:[]},
    Offline : JSON.parse(localStorage.getItem("Offline")),
    systemTag:'docteur',

    //toast
    TostErrorGonf : {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
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
    TostCaisseGonf : {
        position: "top-center",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark"
    },
    TostExpired : {
        position: "top-right",
        //autoClose: 15000,
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick : () => window.location.href = "/S/Parametre/paymment",
        theme: "light"
    },
    TostEmptyListe : {
        position: "bottom-center",
        autoClose: 6000,
        //autoClose: false,
        hideProgressBar: true,
        closeOnClick: true,
        closeButton: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        //theme: "colored"
        style: { background: '#35ac67'},
    },
    

    //leafLeft
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

    //Subsystems
    SubSystemLink : [
        {id: 1, title:'Rendy-Vous', text:'Interface Pour Gerer Les Rendy-Vous', icon:'pc-display-horizontal', link:'/R'},
        {id: 3, title:'Calendrier', text:'Interface Pour La Calendrier', icon:'pc-display', link:'/C'},
    ],

    //NavBar Items
    NavsData : [
            {id:1, name:"Acceuil", icon:"house", link:"ma"},
            {id:2, name:"Rendy-Vous", icon:"calendar2-check", link:"rq"},
            {id:3, name:"Seances", icon:"upc-scan", link:"sa"},
            {id:4, name:"Patient", icon:"receipt-cutoff", link:"pt"},
            {id:5, name:"Ordonance", icon:"pc-display-horizontal", link:"or"},
            {id:6, name:"Rapport", icon:"pc-display-horizontal", link:"rp"},
            {id:8, name:"Equipe", icon:"person-bounding-box", link:"tm"},
            //{id:9, name:"Outils", icon:"tools", link:"ot"},
    ],

    //main stat card
    LinkCard: [
        { id: 1, col: 2 , tag:"rapport", dataTag:'rapportNum',  icon: 'file-earmark-bar-graph', link:'rp/ajouter', smallT: 'Rapport', desc: 'Nouveaux', isFloat : false , stat:'22452'},
        { id: 2, col: 2 , tag:"seance", dataTag:'seanceNum', icon: 'stopwatch', link:'sa/ajouter', smallT: 'Seance', desc: 'Nouveaux', isFloat : false , stat:'22452'},
        { id: 3, col: 2 , tag:"patient", dataTag:'patientNum', icon: 'person', link:'pt/ajouter', smallT: 'Patient', desc: 'Ajouter', isFloat : false , stat:'1235'},
        { id: 4, col: 2 , tag:"caisse", dataTag:'ordonanceNum', icon: 'receipt-cutoff', link:'or/ajouter-c', smallT: 'Ordonance', desc: 'Nouveaux', isFloat : false , stat:'22'},
        { id: 4, col: 2 , tag:"Equipe", dataTag:'equipeNum', icon: 'microsoft-teams', link:'tm/presence', smallT: 'Equipe', desc: 'Presence', isFloat : false , stat:'22'},
    ],

    //main chart card
    ChartCard: [
        {id:1, genre: 'b', col:5, text: 'Recette des Camions '},
        {id:2, genre: 'l', col:7, text: 'Evolution de Recette '},
    ],

    //braedCrumb
    BreadCrumb:{
        menuAddPlat: [
            {id:1, name:'Menu', linkable:true, link:"/S/eq"},
            {id:2, name:'Ajouter Plat', linkable:false}
        ],
        menuFamille: [
            {id:1, name:'Menu', linkable:true, link:"/S/eq"},
            {id:2, name:'Familles', linkable:false}
        ],
        platInfo: [
            {id:1, name:'Menu', linkable:true, link:"/S/eq"},
            {id:2, name:'Information', linkable:false}
        ],

        forfraitInfo: [
            {id:1, name:'Tarif', linkable:true, link:"/S/of"},
            {id:2, name:'Information', linkable:false}
        ],

        stockAddArticle: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Ajouter Article', linkable:false}
        ],
        stockFamille: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Familles', linkable:false}
        ],

        stockBE: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Bon d\'entre', linkable:false}
        ],
        stockBS: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Bon de sortie', linkable:false}
        ],
        stockInfo: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Information', linkable:false}
        ],
        factureAjouter:[
            {id:1, name:'Seance', linkable:true, link:"/S/sa"},
            {id:2, name:'Ajouter Seance', linkable:false}
        ],
        factureInfo:[
            {id:1, name:'Seance', linkable:true, link:"/S/ab"},
            {id:2, name:'Info', linkable:false}
        ],
        factureEdit:[
            {id:1, name:'Rapport', linkable:true, link:"/S/rp"},
            {id:2, name:'Modification', linkable:false}
        ],
        factureResumer:[
            {id:1, name:'Seance', linkable:true, link:"/S/sa"},
            {id:2, name:'Resumer', linkable:false}
        ],
        CamionAdd: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Ajouter Camion', linkable:false}
        ],
        CamionAddFond: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Ajouter Fond', linkable:false}
        ],
        CamionFondInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Info', linkable:true, link:"/S/sa"},
            {id:3, name:'Fond', linkable:true, link:"/S/sa"},
            {id:4, name:'Voir', linkable:false}
        ],
        CamionEditFond: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Info', linkable:true, link:"/S/sa"},
            {id:3, name:'Fond', linkable:true, link:"/S/sa"},
            {id:4, name:'Modifier', linkable:false}
        ],
        CamionInv: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Inventaire Camion', linkable:false}
        ],
        CamionInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Info', linkable:false}
        ],
        CamionArticleInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Info', linkable:true, link:".."},
            {id:3, name:'Article', linkable:false}
        ],
        CamionFactureInfo: [
            {id:1, name:'Camion', linkable:true, link:"/S/sa"},
            {id:2, name:'Info', linkable:true, link:".."},
            {id:3, name:'Seance', linkable:true, link:".."},
            {id:4, name:'Voir', linkable:false}
        ],
        ClientAdd: [
            {id:1, name:'Patient', linkable:true, link:"/S/pt"},
            {id:2, name:'Ajouter Patient', linkable:false}
        ],
        ClientInfo: [
            {id:1, name:'Client', linkable:true, link:"/S/mb"},
            {id:2, name:'Info', linkable:false}
        ],
        ClientMap: [
            {id:1, name:'Client', linkable:true, link:"/S/mb"},
            {id:2, name:'Map', linkable:false}
        ],
        ClientRegion: [
            {id:1, name:'Client', linkable:true, link:"/S/mb"},
            {id:2, name:'Regions', linkable:false}
        ],
        RequestInfo: [
            {id:1, name:'Rendy Vous', linkable:true, link:"/S/rq"},
            {id:2, name:'Info', linkable:false}
        ],
        RequestCalendar: [
            {id:1, name:'Rendy-Vous', linkable:true, link:"/S/rq"},
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
            {id:1, name:'Fournisseur', linkable:true, link:"/S/sk"},
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
            {id:1,  icon: 'plus-circle', text: 'Ajouter Ordonance', link: 'ajouter-c', dropD: false},
            // {id:2,  icon: 'ticket-detailed-fill', text: 'Bons', link: 'bons', dropD: false},
            // {id:3,  icon: 'sliders', text: 'Inventaire', link: 'inventaire', dropD: false},
        ],
        Menu: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux Rapport', link: 'ajouter', dropD: false},
            // {id:2, icon: 'tags', text: 'Genres des Rapport', link: 'famille', dropD: false },
            // {id:3, icon: 'box-arrow-in-up', text: 'Bond entre', link: 'be', dropD: false },
            // {id:4, icon: 'box-arrow-up', text: 'Bond Sortie', link: 'bs', dropD: false },
        ],
        Stock: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux Ordonance', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille des Plats', link: 'famille', dropD: false },
            {id:3, icon: 'box-arrow-in-up', text: 'Bond entre', link: 'be', dropD: false },
            {id:4, icon: 'box-arrow-up', text: 'Bond Sortie', link: 'bs', dropD: false },
        ],
        facture: [
            {id:1,  icon: 'receipt', text: 'Nouveaux Seance', link: 'ajouter', dropD: false},
            {id:2,  icon: 'file-earmark-medical-fill', text: 'Resumer', link: 'resumer', dropD: false},
        ],
        client: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Patient', link: 'ajouter', dropD: false},
            // {id:2,  icon: 'map-fill', text: 'Regrouppemment', link: 'classemment', dropD: false},
            //{id:2,  icon: 'balloon-heart', text: 'Fidelité', link: 'fidelite', dropD: false},
            // {id:3 ,  icon: 'bar-chart-line-fill', text: 'Statistique', link: 'statistics', dropD: false},
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
            {id:2,  icon: 'stars', text: 'Poste', link: 'postes', dropD: false},
            {id:3,  icon: 'cash-stack', text: 'Avance', link: 'avances', dropD: false},
            {id:4,  icon: 'calendar2-week', text: 'Presence', link: 'presence', dropD: false},
        ],
    },
    
    //TableHead
    TableHead:{
        seance:['*','ID','Patient','Maldaie','Degreé','Jour','Temps','Analyse','Ordonance','Voir'],
        seance:['*','ID','Patient','Maldaie','Degreé','Jour','Temps','Analyse','Ordonance','Voir'],
        facture:['*','ID','Caisse','Client','Jour','Temps','Totale','Etat','Voir'],
        ordonance:['*','ID','Patient','Date','Temps','Seance ?','Etat','Voir'],
        seances:['*','ID','Caisse','Client','Jour','Temps','Etat','Voir'],
        request:['*','ID','Client', 'Date','Table','Etat','X','Voir'],
        reservation:['*','ID','Patient', 'Passé le','Volu le','Temps','Etat','Enreg.?','Voir'],
        menu:['*','Code', 'Nom', 'Genre','Cout','P.vente','X','Voir'],
        stock:['*','Code', 'Nom', 'Genre','Tarif','Voir'],
        camion:['*','Camion','Matricule', 'Chauffeur','Fond','Recette','X','Voir'],
        camionStock:['Code', 'Nom', 'Genre','Stock','Prix','Voir'],
        camionFacture:['ID','Client','Jour','Totale','Voir'],
        camionFond:['ID','Date','Totale', 'SDF','SCF','Voir'],
        client:['*','Nom','Naissance', 'Tel', 'Location','Adresse','Voir'],
        clientCommande:['ID', 'Passé le','Volu le','Totale','Etat','Voir'],
        clientFacture:['ID','Client','Jour','Totale','Voir'],
        clientFactureC:['ID','Client','Jour','Totale','Voir'],
        team:['*','Nom','Tel', 'CIN','Commencé', 'Post','Voir'],
        medicammentPage:['*','Code','Genre','Nom', 'Dosage','Forme', 'Presentation','Classe','Voir'],
        fournisseur:['*','MF','Nom','Tel', 'Adresse','Genre', 'Jour','Voir']

    },

    //setting
    Setting: [
        // { id: '01', title: "Activation", image: "01", description: "Etat de cabinet, camera, laboratoire ...", link:"activation"},
        // { id: '2', title: "Profile", image: "02", description: "moupouhpouhpouhpouhpuohpouhp...", link:"p/Profile",
        //   items:[
        //         {id: 1, genre:'C', title:"Ouverture & Fermeture", icon:"bell-fill", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:'checked'},
        //         {id: 2, genre:'C', title:"Permission des Commentaires", icon:"chat-left-quote-fill", text:"Permettre à des visiteurs de votre profil de poster des commentaires.", state:true},
        //         {id: 3, genre:'C', title:"Reception des Messages", icon:"envelope-paper-heart-fill", text:"Autorisée les nouveaux messages pour les non-clients ", state:true},
        //         {id: 4, genre:'C', title:"Visiblité dans l'annuaire", icon:"journal-bookmark-fill", text:"Autorisée la visibilité sur l'annuaire par tous les visiteurs ", state:true},
        //     ]
        // },
        { id: '3', title: "Commandes", text: "Rendy-Vous", image: "04", description: "Commandes , Nombre Maximele , Auto-Facturation ", link:"p/Commandes",
            items:[
                {id: 1, genre:'C', title:"Reception des commandes", icon:"calendar4-week", text:"Accepter ou Reffuseé des Commandes", state:'checked'},
                {id: 2, genre:'I', title:"Nombre maximale des commandes", icon:"123", text:"Nombre Maximales des commandes par jour ", state:true},
                {id: 3, genre:'C', title:"Auto-facturation des  commandes", icon:"receipt-cutoff", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '4', title: "Menu", text: "Seances",  image: "16", description: "Plats, Familles , Articels", link:"p/Menu",
            items:[
                {id: 1, genre:'C', title:"Ajouter des nouveaux Plats ", icon:"upc-scan", text:"Autoriseé l'ajout des nouveaux articles", state:'checked'},
                {id: 2, genre:'C', title:"Autoriseé Nouveaux Famille ", icon:"box-arrow-in-down", text:"Autoriseé l'enregistremment des bons d'entreés", state:true},
                {id: 3, genre:'C', title:"Autoriseé Nouveaux Articles", icon:"box-arrow-up", text:"Autoriseé l'enregistremment des bons de sortie", state:true},
            ]
        },
        { id: '4', title: "Stock", text: "Ordonance", image: "07", description: "Articles , Modifier , Bon Entre/Sortie", link:"p/Stock",
            items:[
                {id: 1, genre:'C', title:"Ajouter des nouveaux articles ", icon:"upc-scan", text:"Autoriseé l'ajout des nouveaux articles", state:'checked'},
                {id: 2, genre:'C', title:"Autoriseé Bon d'entre ", icon:"box-arrow-in-down", text:"Autoriseé l'enregistremment des bons d'entreés", state:true},
                {id: 3, genre:'C', title:"Autoriseé Bon de sortie", icon:"box-arrow-up", text:"Autoriseé l'enregistremment des bons de sortie", state:true},
            ]
        },
        { id: '5', title: "Factures", text: "Rapport", image: "08", description: "Modification , Suppresssion , Credit", link:"p/Factures",
            items:[
                {id: 1, genre:'I', title:" Nombre des Factures", icon:"receipt", text:"Nombre Maximale des factures par jour ", state:'checked'},
                {id: 2, genre:'C', title:" Client Passager", icon:"person-heart", text:"Autoriseé les factures pour client : Passager", state:true},
                {id: 3, genre:'C', title:" Gratuité", icon:"gift", text:"Autoriseé la gratuité pour les articles ", state:true},
            ]
        },
        // { id: '6', title: "Caisses", image: "13", description: "Depenses , Auto-Syncronisation , Credit ", link:"p/Caisses",
        //     items:[
        //         {id: 1, genre:'C', title:" Ajouter nouveaux caisses", icon:"truck", text:"Autoriseé l'ajout des nouveaux caisses", state:'checked'},
        //         {id: 2, genre:'C', title:" Ajouter fond aux caisses", icon:"basket2", text:"Autoriseé l'ajout des fond aux caisses ", state:true},
        //         {id: 3, genre:'C', title:" Faire Inventaire ", icon:"arrow-repeat", text:"Autoriseé l'inventaire aux caisses", state:true},
        //         {id: 4, genre:'C', title:" Controle des caisses", icon:"toggles2", text:"Autoriseé le controle (modifier , supprimer stock , ..) des caisses", state:true},
        //     ]
        // },
        { id: '7', title: "Clients", text: "Patient", image: "10", description: "Nouveaux , Modifier , Fidelité", link:"p/Clients",
            items:[
                {id: 1, genre:'C', title:" Ajouter Clients Par caisses ", icon:"person-heart", text:"Autoriseé L'ajout d'un client par comptes caisses", state:'checked'},
                {id: 2, genre:'C', title:" Ajouter Regions Par Camion ", icon:"map-fill", text:"Autoriseé L'ajout des regiuons par comptes caisses", state:true},
                {id: 3, genre:'C', title:" Fixer Posistion Clients Par caisses", icon:"geo-alt-fill", text:"Autoriseé le modification du position clients par comptes caisses", state:true},
            ]
        },
        // { id: '8', title: "Fournisseur", image: "12", description: "Etat de cabinet, camera, laboratoire ...", link:"p/Fournisseur",
        //     items:[
        //         {id: 1, genre:'C', title:" Ajouter Fournisseur ", icon:"person-heart", text:"Autoriseé L'ajout d'un client par comptes caisses", state:'checked'},
        //         {id: 2, genre:'C', title:" Ajouter Regions Par Camion ", icon:"map-fill", text:"Autoriseé L'ajout des regiuons par comptes caisses", state:true},
        //         {id: 3, genre:'C', title:" Fixer Posistion Clients Par caisses", icon:"geo-alt-fill", text:"Autoriseé le modification du position clients par comptes caisses", state:true},
        //     ]
        // },
        { id: '9', title: "Equipe", text: "Equipe", image: "11", description: "Nouveaux , Presence , Avance , ", link:"p/Equipe",
            items:[
                {id: 1, genre:'C', title:" Recéptions des exigence d'emploi", icon:"file-earmark-person", text:"Recevoire des demmandes de travaille", state:'checked'},
                {id: 4, genre:'I', title:" Nombre maximale des missions", icon:"check2-square", text:"Npmbre maximale des mission pour membre par jour ", state:true},
            ]
        },
    ]

}
 
export default GConf 