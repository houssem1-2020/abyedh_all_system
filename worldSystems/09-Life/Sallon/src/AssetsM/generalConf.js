
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
    ApiLink : 'https://api.abyedh.com/api/systems/hotel', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRouterOneLink : 'https://api.abyedh.com/api/systems/hotel-caisse', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRouterTwoLink : 'https://api.abyedh.com/api/systems/hotel-serveur', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRouterThreeLink : 'https://api.abyedh.com/api/systems/hotel-chef', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    DefaultTva: 0,
    themeColor : '#c30052',
    themeColorLigth : '#b8cbd4',
    settingValue : GetSettingValue(),
    offline_default_table : {commande: [], stock: [], famille: [],   facture: [], camion:[], client:[],   articleToSave:[] , factureToSave:[],  camionToSave:[], fondCamionToSave:[], clientToSave:[]},
    Offline : JSON.parse(localStorage.getItem("Offline")),
    systemTag:'sallon',

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
    TostNotiftGonf : {
        position: "bottom-right",
        autoClose: 6000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick : () => window.location.href = "/S/rq",
        icon: <span className="bi bi-bell-fill bi-sm text-warning"></span>,
        style: {
            backgroundColor: '#333', // Custom background color
            color: '#fff'            // Custom text color
        }
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
        {id: 3, title:'Caisse', text:'Interface Pour La Caisse', icon:'pc-display', link:'/C'},
        // {id: 1, title:'Serveur', text:'Interface Pour Passer Des Commandes', icon:'pencil-square', link:'/R'},
    ],

    //NavBar Items
    NavsData : [
    		{id:1, name:"Acceuil", icon:"house", link:"ma"},
            {id:2, name:"Reservation", icon:"calendar2-check", link:"rq"},
            {id:4, name:"Calendrier", icon:"receipt-cutoff", link:"cd"},
            {id:5, name:"Contrat", icon:"pc-display-horizontal", link:"ct"},
            {id:3, name:"Client", icon:"people", link:"cl"},
            {id:8, name:"Equipe", icon:"person-bounding-box", link:"tm"},
    ],

    //main stat card
    LinkCard: [
        { id: 1, col: 2 , tag:"article", dataTag:'forfaitNum',  icon: 'upc-scan', link:'of', smallT: 'Forfait', desc: 'Nouveaux  ', isFloat : false , stat:'22452'},
        { id: 2, col: 2 , tag:"facture", dataTag:'abonnementNum', icon: 'receipt-cutoff', link:'ab/resumer', smallT: 'Abonnemment', desc: 'Resumer', isFloat : false , stat:'22452'},
        { id: 3, col: 2 , tag:"client", dataTag:'membreNum', icon: 'person', link:'mb/ajouter', smallT: 'Membre', desc: 'Ajouter', isFloat : false , stat:'1235'},
        { id: 4, col: 2 , tag:"caisse", dataTag:'equipemmentNum', icon: 'pc-display-horizontal', link:'eq/ajouter', smallT: 'Equipemment', desc: 'Inventaire', isFloat : false , stat:'22'},
        { id: 4, col: 2 , tag:"Equipe", dataTag:'equipeNum', icon: 'microsoft-teams', link:'tm/presence', smallT: 'Equipe', desc: 'Presence', isFloat : false , stat:'22'},
    ],

    //main chart card
    ChartCard: [
        {id:1, genre: 'b', col:5, text: 'Recette des Camions '},
        {id:2, genre: 'l', col:7, text: 'Evolution de Recette '},
    ],

    //braedCrumb
    BreadCrumb:{
        addEquipemment: [
            {id:1, name:'Equipemment', linkable:true, link:"/S/eq"},
            {id:2, name:'Ajouter', linkable:false}
        ],
        menuAddPlat: [
            {id:1, name:'Abonnemment', linkable:true, link:"/S/eq"},
            {id:2, name:'Ajouter Plat', linkable:false}
        ],
        menuFamille: [
            {id:1, name:'Abonnemment', linkable:true, link:"/S/eq"},
            {id:2, name:'Familles', linkable:false}
        ],
        platInfo: [
            {id:1, name:'Abonnemment', linkable:true, link:"/S/eq"},
            {id:2, name:'Information', linkable:false}
        ],

        stockAddArticle: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Ajouter Article', linkable:false}
        ],
        stockFamille: [
            {id:1, name:'Seance', linkable:true, link:"/S/sa"},
            {id:2, name:'Calendrier', linkable:false}
        ],

        stockBE: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Bon d\'entre', linkable:false}
        ],
        stockBS: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Bon de sortie', linkable:false}
        ],
        forfraitInfo: [
            {id:1, name:'Forfait', linkable:true, link:"/S/of"},
            {id:2, name:'Information', linkable:false}
        ],
        stockInfo: [
            {id:1, name:'Stock', linkable:true, link:"/S/of"},
            {id:2, name:'Information', linkable:false}
        ],
        factureAjouter:[
            {id:1, name:'Factures', linkable:true, link:"/S/ab"},
            {id:2, name:'Ajouter Facture', linkable:false}
        ],
        abonnemmentAjouter:[
            {id:1, name:'Abonnemment', linkable:true, link:"/S/ab"},
            {id:2, name:'Ajouter Abonnemment', linkable:false}
        ],
        abonnemmentInfo:[
            {id:1, name:'Abonnemment', linkable:true, link:"/S/ab"},
            {id:2, name:'Info', linkable:false}
        ],
        factureInfo:[
            {id:1, name:'Factures', linkable:true, link:"/S/ab"},
            {id:2, name:'Info', linkable:false}
        ],
        factureEdit:[
            {id:1, name:'Factures', linkable:true, link:"/S/ab"},
            {id:2, name:'Modification', linkable:false}
        ],
        factureResumer:[
            {id:1, name:'Factures', linkable:true, link:"/S/ab"},
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
            {id:3, name:'Factures', linkable:true, link:".."},
            {id:4, name:'Voir', linkable:false}
        ],
        ClientAdd: [
            {id:1, name:'Membre', linkable:true, link:"/S/mb"},
            {id:2, name:'Ajouter Membre', linkable:false}
        ],
        ClientInfo: [
            {id:1, name:'Membre', linkable:true, link:"/S/mb"},
            {id:2, name:'Info', linkable:false}
        ],
        ClientMap: [
            {id:1, name:'Membre', linkable:true, link:"/S/mb"},
            {id:2, name:'Map', linkable:false}
        ],
        ClientRegion: [
            {id:1, name:'Membre', linkable:true, link:"/S/mb"},
            {id:2, name:'Fidelité', linkable:false}
        ],
        ClientFidelite: [
            {id:1, name:'Membre', linkable:true, link:"/S/mb"},
            {id:2, name:'Fidelité', linkable:false}
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
            {id:1,  icon: 'plus-circle', text: 'Ajouter Seance', link: 'ajouter-c', dropD: false},
            {id:2,  icon: 'ticket-detailed-fill', text: 'Calendrier', link: 'bons', dropD: false},
            // {id:3,  icon: 'sliders', text: 'Inventaire', link: 'inventaire', dropD: false},
        ],
        Menu: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux Equipemment', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille des Equipemment', link: 'famille', dropD: false },
            // {id:3, icon: 'box-arrow-in-up', text: 'Bond entre', link: 'be', dropD: false },
            // {id:4, icon: 'box-arrow-up', text: 'Bond Sortie', link: 'bs', dropD: false },
        ],
        Stock: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux Plat', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille des Plats', link: 'famille', dropD: false },
            {id:3, icon: 'box-arrow-in-up', text: 'Bond entre', link: 'be', dropD: false },
            {id:4, icon: 'box-arrow-up', text: 'Bond Sortie', link: 'bs', dropD: false },
        ],
        facture: [
            {id:1,  icon: 'receipt', text: 'Nouveaux Abonnement', link: 'ajouter', dropD: false},
            {id:2,  icon: 'file-earmark-medical-fill', text: 'Resumer', link: 'resumer', dropD: false},
        ],
        client: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Membre', link: 'ajouter', dropD: false},
            // {id:2,  icon: 'map-fill', text: 'Régions', link: 'regions', dropD: false},
            {id:2,  icon: 'balloon-heart', text: 'Fidelité', link: 'fidelite', dropD: false},
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
        abonnemment:['*','ID','Mmebre','Forfait','Depart','Saisson','Seances','Etat','Voir'],
        seances:['*','ID','Caisse','Client','Jour','Temps','Etat','Voir'],
        request:['*','ID','Client', 'Date','Table','Etat','X','Voir'],
        reservation:['*','ID','Nom', 'Age','Genre','Depart','X','Voir'],
        menu:['*','Code', 'Nom', 'Qte','Genre','Description' ,'Voir'],
        Offre:['*','Code', 'Nom', 'NB Seance','Tarif','Voir'],
        stock:['*','Code', 'Nom', 'Genre','Tarif','Voir'],
        camion:['*','Camion','Matricule', 'Chauffeur','Fond','Recette','X','Voir'],
        camionStock:['Code', 'Nom', 'Genre','Stock','Prix','Voir'],
        camionFacture:['ID','Client','Jour','Totale','Voir'],
        camionFond:['ID','Date','Totale', 'SDF','SCF','Voir'],
        client:['*','Nom','Matricule', 'Tel', 'Location','Adresse','Voir'],
        clientCommande:['ID', 'Passé le','Volu le','Totale','Etat','Voir'],
        clientFacture:['ID','Client','Jour','Totale','Voir'],
        clientFactureC:['ID','Client','Jour','Totale','Voir'],
        team:['*','Nom','Tel', 'CIN','Commencé', 'Post','Voir'],
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
        { id: '3', title: "Souscription", settTag:'Commandes', image: "04", description: "Souscription , Nombre Maximele , Auto-Abonnemment ", link:"p/Commandes",
            items:[
                {id: 1, genre:'C', title:"Reception des Souscription", icon:"calendar4-week", text:"Accepter ou Reffuseé des Souscription", state:'checked'},
                {id: 2, genre:'I', title:"Nombre maximale des Souscription", icon:"123", text:"Nombre Maximales des Souscription par jour ", state:true},
                {id: 3, genre:'C', title:"Auto-facturation des  Souscription", icon:"receipt-cutoff", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '4', title: "Seances", settTag:'Menu', image: "16", description: "Seances, Horaire , Membres", link:"p/Menu",
            items:[
                {id: 1, genre:'C', title:"Ajouter des nouveaux Seances ", icon:"upc-scan", text:"Autoriseé l'ajout des nouveaux articles", state:'checked'},
                {id: 2, genre:'C', title:"Autoriseé Nouveaux Horaire ", icon:"box-arrow-in-down", text:"Autoriseé l'enregistremment des Seances", state:true},
                {id: 3, genre:'C', title:"Autoriseé Nouveaux Seance ", icon:"box-arrow-up", text:"Autoriseé l'enregistremment des Seances", state:true},
            ]
        },
        { id: '5', title: "Equippement", settTag:'Stock', image: "17", description: "Articles , Modifier , Bon Entre/Sortie", link:"p/Stock",
            items:[
                {id: 1, genre:'I', title:" Nombre des Equippement", icon:"receipt", text:"Nombre Maximale des Equippement par jour ", state:'checked'},
                {id: 2, genre:'C', title:" Client Passager", icon:"person-heart", text:"Autoriseé les Equippement pour client : Passager", state:true},
                {id: 3, genre:'C', title:" Gratuité", icon:"gift", text:"Autoriseé la gratuité pour les articles ", state:true},
            ]
        },
        { id: '6', title: "Abonnemment", settTag:'Factures', image: "08", description: "Modification , Suppresssion , Credit", link:"p/Factures",
            items:[
                {id: 1, genre:'I', title:" Nombre des Abonnemment", icon:"receipt", text:"Nombre Maximale des Abonnemment par jour ", state:'checked'},
                {id: 2, genre:'C', title:" Client Passager", icon:"person-heart", text:"Autoriseé les Abonnemment pour client : Passager", state:true},
                {id: 3, genre:'C', title:" Gratuité", icon:"gift", text:"Autoriseé la gratuité pour les Abonnemment ", state:true},
            ]
        },
        // { id: '6', title: "Caisses", settTag:'Commandes', image: "13", description: "Depenses , Auto-Syncronisation , Credit ", link:"p/Caisses",
        //     items:[
        //         {id: 1, genre:'C', title:" Ajouter nouveaux caisses", icon:"truck", text:"Autoriseé l'ajout des nouveaux caisses", state:'checked'},
        //         {id: 2, genre:'C', title:" Ajouter fond aux caisses", icon:"basket2", text:"Autoriseé l'ajout des fond aux caisses ", state:true},
        //         {id: 3, genre:'C', title:" Faire Inventaire ", icon:"arrow-repeat", text:"Autoriseé l'inventaire aux caisses", state:true},
        //         {id: 4, genre:'C', title:" Controle des caisses", icon:"toggles2", text:"Autoriseé le controle (modifier , supprimer stock , ..) des caisses", state:true},
        //     ]
        // },
        { id: '7', title: "Membres", settTag:'Clients', image: "10", description: "Nouveaux , Modifier , Fidelité", link:"p/Clients",
            items:[
                {id: 1, genre:'C', title:" Ajouter Membres Par caisses ", icon:"person-heart", text:"Autoriseé L'ajout d'un client par comptes caisses", state:'checked'},
                {id: 2, genre:'C', title:" Ajouter Regions Par Camion ", icon:"map-fill", text:"Autoriseé L'ajout des regiuons par comptes caisses", state:true},
                {id: 3, genre:'C', title:" Fixer Posistion Membres Par caisses", icon:"geo-alt-fill", text:"Autoriseé le modification du position Membres par comptes caisses", state:true},
            ]
        },
        // { id: '8', title: "Fournisseur", settTag:'Commandes', image: "12", description: "Etat de cabinet, camera, laboratoire ...", link:"p/Fournisseur",
        //     items:[
        //         {id: 1, genre:'C', title:" Ajouter Fournisseur ", icon:"person-heart", text:"Autoriseé L'ajout d'un client par comptes caisses", state:'checked'},
        //         {id: 2, genre:'C', title:" Ajouter Regions Par Camion ", icon:"map-fill", text:"Autoriseé L'ajout des regiuons par comptes caisses", state:true},
        //         {id: 3, genre:'C', title:" Fixer Posistion Clients Par caisses", icon:"geo-alt-fill", text:"Autoriseé le modification du position clients par comptes caisses", state:true},
        //     ]
        // },
        { id: '9', title: "Equipe", settTag:'Equipe', image: "11", description: "Nouveaux , Presence , Avance , ", link:"p/Equipe",
            items:[
                {id: 1, genre:'C', title:" Recéptions des exigence d'emploi", icon:"file-earmark-person", text:"Recevoire des demmandes de travaille", state:'checked'},
                {id: 4, genre:'I', title:" Nombre maximale des missions", icon:"check2-square", text:"Npmbre maximale des mission pour membre par jour ", state:true},
            ]
        },
    ],
    Documentation : [
        {id:1, text:'Rendy-Vous', icon:'calendar2-check', activeI: 0},
        {id:2, text:'Seances', icon:'pc-display-horizontal', activeI: 1},
        {id:3, text:'Rapport', icon:'receipt-cutoff', activeI: 2},
        {id:4, text:'Ordonances', icon:'truck', activeI: 3},
        {id:5, text:'Patient', icon:'person', activeI: 4},
        {id:6, text:'Equipe', icon:'person-bounding-box', activeI: 5},
    ],
    Sauvgarder : [
        {id:1, label:'Sauvgarder les Rendy-Vous', table:'05_restaurant_menu'},
        {id:2, label:'Sauvgarder les Offres', table:'05_restaurantmenu_genre'},
        {id:3, label:'Sauvgarder les Seances', table:'05_restaurant_factures'},
        {id:4, label:'Sauvgarder les Rapports', table:'05_restaurant_caisses'},
        {id:5, label:'Sauvgarder les Patients', table:'05_restaurant_clients'},
        {id:6, label:`Sauvgarder l'equipe`, table:'05_restaurant_team'},
        {id:7, label:'Sauvgarder les Ordonances', table:'05_restaurant_tables'},
    ],
    offline_default_table : {commande: [], stock: [], famille: [],   facture: [], camion:[], client:[],   articleToSave:[] , factureToSave:[],  camionToSave:[], fondCamionToSave:[], clientToSave:[]},
    Syncroniser : [
        {id:1, text:'Rendy-Vous', whtTag:'dezmandes'},
        {id:2, text:'Seances', whtTag:'stock'},
        {id:3, text:'Rapport', whtTag:'facture'},
        {id:4, text:'Patient', whtTag:'camion'},
        {id:5, text:'Equipes', whtTag:'client'},
        {id:6, text:'Ordonances', whtTag:'famille'},
    ],
    ProfileGenre:[
        { id: 1, name: 'agence', value: 'dentiste', imgSrc: 'tr-agence' },
        { id: 2, name: 'Transporteur', value: 'dentiste', imgSrc: 'transporteur' },
    ]

}
 
export default GConf 