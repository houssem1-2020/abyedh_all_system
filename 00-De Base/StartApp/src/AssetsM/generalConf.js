
const GetPID = () =>{
    const pidIsSet = localStorage.getItem('PID');
    return pidIsSet
}

const GetSystemTag = () =>{
    const systemTag = localStorage.getItem('APP_TAG');
    return systemTag
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
    ApiLink : 'http://localhost:3010/app', //https://api.system.abyedh.tn/apiSystemAbyedh/System 
    ApiRequestLink : 'https://api.system.abyedh.tn/apiSystemAbyedh', //https://api.system.abyedh.tn/apiSystemAbyedh/System 

    DefaultTva: 0,
    themeColor : '#545657',
    themeColorLigth : '#b8cbd4',
    settingValue : GetSettingValue(),
    offline_default_table : {commande: [], stock: [], famille: [],   facture: [], camion:[], client:[],   articleToSave:[] , factureToSave:[],  camionToSave:[], fondCamionToSave:[], clientToSave:[]},
    Offline : JSON.parse(localStorage.getItem("Offline")),
    systemTag: GetSystemTag(),

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

    //braedCrumb
    BreadCrumb:{
        menuAddPlat: [
            {id:1, name:'Menu', linkable:true, link:"/S/mu"},
            {id:2, name:'Ajouter Plat', linkable:false}
        ],
        menuFamille: [
            {id:1, name:'Menu', linkable:true, link:"/S/mu"},
            {id:2, name:'Familles', linkable:false}
        ],
        platInfo: [
            {id:1, name:'Menu', linkable:true, link:"/S/mu"},
            {id:2, name:'Information', linkable:false}
        ],

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
            {id:1,  icon: 'plus-circle', text: 'Ajouter Caisse', link: 'ajouter-c', dropD: false},
            // {id:2,  icon: 'ticket-detailed-fill', text: 'Bons', link: 'bons', dropD: false},
            // {id:3,  icon: 'sliders', text: 'Inventaire', link: 'inventaire', dropD: false},
        ],
        Menu: [
            {id:1,  icon: 'bookmark-plus', text: 'Nouveaux Plat', link: 'ajouter', dropD: false},
            {id:2, icon: 'tags', text: 'Famille des Plats', link: 'famille', dropD: false },
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
            // {id:1,  icon: 'receipt', text: 'Nouveaux Facture', link: 'ajouter', dropD: false},
            {id:1,  icon: 'file-earmark-medical-fill', text: 'Resumer', link: 'resumer', dropD: false},
        ],
        client: [
            {id:1,  icon: 'person-plus-fill', text: 'Nouveaux Client', link: 'ajouter', dropD: false},
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
        docteurRDV:['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'],
        docteur_rdv:['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'],

        facture:['*','ID','Caisse','Client','Jour','Temps','Totale','Etat','X','Voir'],
        request:['*','ID','Client', 'Date','Table','Etat','X','Voir'],
        reservation:['*','ID','Client', 'Passé le','Volu le','Etat','X','Voir'],
        menu:['*','Code', 'Nom', 'Genre','Cout','P.vente','X','Voir'],
        stock:['*','Code', 'Nom', 'Genre','Stock','P.achat','Voir'],
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
        { id: '3', title: "Commandes", image: "04", description: "Commandes , Nombre Maximele , Auto-Facturation ", link:"p/Commandes",
            items:[
                {id: 1, genre:'C', title:"Reception des commandes", icon:"calendar4-week", text:"Accepter ou Reffuseé des Commandes", state:'checked'},
                {id: 2, genre:'I', title:"Nombre maximale des commandes", icon:"123", text:"Nombre Maximales des commandes par jour ", state:true},
                {id: 3, genre:'C', title:"Auto-facturation des  commandes", icon:"receipt-cutoff", text:"Changer l'etat de disponiobilité , Ouvert/Fermé , Cela va changer votre etat sur l'annuaire", state:true},
            ]
        },
        { id: '4', title: "Menu", image: "14", description: "Plats, Familles , Articels", link:"p/Menu",
            items:[
                {id: 1, genre:'C', title:"Ajouter des nouveaux Plats ", icon:"upc-scan", text:"Autoriseé l'ajout des nouveaux articles", state:'checked'},
                {id: 2, genre:'C', title:"Autoriseé Nouveaux Famille ", icon:"box-arrow-in-down", text:"Autoriseé l'enregistremment des bons d'entreés", state:true},
                {id: 3, genre:'C', title:"Autoriseé Nouveaux Articles", icon:"box-arrow-up", text:"Autoriseé l'enregistremment des bons de sortie", state:true},
            ]
        },
        { id: '4', title: "Stock", image: "07", description: "Articles , Modifier , Bon Entre/Sortie", link:"p/Stock",
            items:[
                {id: 1, genre:'C', title:"Ajouter des nouveaux articles ", icon:"upc-scan", text:"Autoriseé l'ajout des nouveaux articles", state:'checked'},
                {id: 2, genre:'C', title:"Autoriseé Bon d'entre ", icon:"box-arrow-in-down", text:"Autoriseé l'enregistremment des bons d'entreés", state:true},
                {id: 3, genre:'C', title:"Autoriseé Bon de sortie", icon:"box-arrow-up", text:"Autoriseé l'enregistremment des bons de sortie", state:true},
            ]
        },
        { id: '5', title: "Factures", image: "08", description: "Modification , Suppresssion , Credit", link:"p/Factures",
            items:[
                {id: 1, genre:'I', title:" Nombre des Factures", icon:"receipt", text:"Nombre Maximale des factures par jour ", state:'checked'},
                {id: 2, genre:'C', title:" Client Passager", icon:"person-heart", text:"Autoriseé les factures pour client : Passager", state:true},
                {id: 3, genre:'C', title:" Gratuité", icon:"gift", text:"Autoriseé la gratuité pour les articles ", state:true},
            ]
        },
        { id: '6', title: "Caisses", image: "13", description: "Depenses , Auto-Syncronisation , Credit ", link:"p/Caisses",
            items:[
                {id: 1, genre:'C', title:" Ajouter nouveaux caisses", icon:"truck", text:"Autoriseé l'ajout des nouveaux caisses", state:'checked'},
                {id: 2, genre:'C', title:" Ajouter fond aux caisses", icon:"basket2", text:"Autoriseé l'ajout des fond aux caisses ", state:true},
                {id: 3, genre:'C', title:" Faire Inventaire ", icon:"arrow-repeat", text:"Autoriseé l'inventaire aux caisses", state:true},
                {id: 4, genre:'C', title:" Controle des caisses", icon:"toggles2", text:"Autoriseé le controle (modifier , supprimer stock , ..) des caisses", state:true},
            ]
        },
        { id: '7', title: "Clients", image: "10", description: "Nouveaux , Modifier , Fidelité", link:"p/Clients",
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
        { id: '9', title: "Equipe", image: "11", description: "Nouveaux , Presence , Avance , ", link:"p/Equipe",
            items:[
                {id: 1, genre:'C', title:" Recéptions des exigence d'emploi", icon:"file-earmark-person", text:"Recevoire des demmandes de travaille", state:'checked'},
                {id: 4, genre:'I', title:" Nombre maximale des missions", icon:"check2-square", text:"Npmbre maximale des mission pour membre par jour ", state:true},
            ]
        },
    ],
    landing:{
        ptvGros:{
            colorTheme:'#6f858f',
            adsImageUrl:'storage.svg',
            systemTitle:'نظام إداراة نقاط البيع بالجملة ',
            businesName:'الشركة ',
            systemUrl:'https://ptvgros.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم .  كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير.  بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار)  التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/librairie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'كتبية', value: 'dentiste', imgSrc: 'biblio' },
                { id: 2, name: 'أدوات مذرسية', value: 'dentiste', imgSrc: 'biblio' },    
            ],
            tableItemList : {
                librairie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                librairie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        magazin:{
            colorTheme:'#5e7968',
            adsImageUrl:'ptvente_shop.svg',
            systemTitle:'نظام إداراة نقاط  بيع التجزئة ',
            businesName:'المغازة ',
            systemUrl:'https://magazin.system.abyedh.tn',
            adsText:'نظام إداراة المغازاة و نقاط البيع يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/magazin_commande'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'magazin', value: 'dentiste', imgSrc: 'bread' },
                { id: 2, name: 'superette', value: 'dentiste', imgSrc: 'bread' },
                { id: 3, name: 'عطار ', value: 'dentiste', imgSrc: 'bread' },    
            ],
            tableItemList : {
                magazin_commande : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                magazin_commande : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            imageCarousel:[
               {id:1, title:'إدارة العامة', color:'#4287f5', icon:'link-45deg', link:'magazin/magazin1.PNG'},
               {id:2, title:'سهل', color:'#5dd492', icon:'emoji-smile', link:'magazin/magazin2.PNG'},
               {id:3, title:'معين', color:'#8923e8', icon:'arrows-move', link:'magazin/magazin3.PNG'},
               {id:4, title:'متطور', color:'#5d6360', icon:'arrow-repeat', link:'magazin/magazin4.PNG'},
               {id:5, title:' مدعوم', color:'#e6327a', icon:'info-circle-fill', link:'magazin/magazin5.PNG'},
       
           ],
            yyyyyyyyyy : []
        },
        fruiterie:{
            colorTheme:'#5e7968',
            adsImageUrl:'ptvente_shop.svg',
            systemTitle:'نظام إداراة نقاط  بيع الخضر ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط  بيع الخضر  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/fruiterie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'خُضَرْ', value: 'dentiste', imgSrc: 'fruit' },
                { id: 2, name: 'غِلَالْ', value: 'dentiste', imgSrc: 'fruit' },   
            ],
            tableItemList : {
                fruiterie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                fruiterie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        boucherie:{
            colorTheme:'#5e7968',
            adsImageUrl:'ptvente_shop.svg',
            systemTitle:'نظام إدارة المخابز  ',
            systemUrl:'#',
            adsText:'نظام إداراة المخابز  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/boucheries_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'لُحُومْ حَمْرَاءْ', value: 'dentiste', imgSrc: 'viande' },
                { id: 2, name: 'سَكَالُوبْ', value: 'dentiste', imgSrc: 'viande' },
                { id: 3, name: 'مَزْرَعَة', value: 'dentiste', imgSrc: 'viande' },
                { id: 4, name: 'سَمَـكْ', value: 'dentiste', imgSrc: 'viande' },    
            ],
            tableItemList : {
                boucheries_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                boucheries_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        boulengerie:{
            colorTheme:'#5e7968',
            adsImageUrl:'ptvente_shop.svg',
            systemTitle:'نظام إداراة نقاط  بيع اللحوم ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط بيع اللحوم  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/boulangerie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'طَابُونَة', value: 'dentiste', imgSrc: 'pain' },
                { id: 2, name: 'Baguette', value: 'dentiste', imgSrc: 'pain' },    
            ],
            tableItemList : {
                boulangerie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                boulangerie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        patesserie:{
            colorTheme:'#5e7968',
            adsImageUrl:'ptvente_shop.svg',
            systemTitle:'نظام إداراة نقاط  بيع الحلويات ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط بيع الحلويات  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/patisserie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'Croissant', value: 'dentiste', imgSrc: 'patt' },
                { id: 2, name: 'Gateaux', value: 'dentiste', imgSrc: 'patt' },    
            ],
            tableItemList : {
                patisserie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                patisserie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        epicerie:{
            colorTheme:'#5e7968',
            adsImageUrl:'ptvente_shop.svg',
            systemTitle:'نظام إدارة البقالات ',
            systemUrl:'#',
            adsText:'نظام إداراة البقالات  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/epicerie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'سَجَائِرْ', value: 'dentiste', imgSrc: 'hmas' },
                { id: 2, name: 'بُقُولْ', value: 'dentiste', imgSrc: 'hmas' },    
            ],
            tableItemList : {
                epicerie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                epicerie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        pharmacie:{
            colorTheme:'#6edb8d',
            adsImageUrl:'pharmacie.svg',
            systemTitle:'نظام إداراة الصيدليات ',
            businesName:'الصيدلية ',
            systemUrl:'https://pharmacie.system.abyedh.tn',
            adsText:'نظام إداراة نقاط الصيدليات يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/pharmacie_shop'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/pharmacie_rdv'},
                {id: 3 , colLg:6, colSm:6, itemName:'Traif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                {id:1, name:'ليل', value:'nuit', imgSrc:'nuit'},
                {id:2, name:'نهار', value:'jour', imgSrc:'jour'}   
            ],
            tableItemList : {
                pharmacie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
                pharmacie_rdv :  [{id:1, value: 'RDV_Cause', genre: 'text'}, {id:2, value: 'RDV_Date', genre: 'text'}]
            },
            tableHeader : {
                pharmacie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
                pharmacie_rdv :  ['*', 'Client', 'Passé le','Passé à','Cause','Date','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        librairie:{
            colorTheme:'#4c4a48',
            adsImageUrl:'librairie.svg',
            systemTitle:'نظام إداراة الكتبيات ',
            systemUrl:'#',
            adsText:'نظام إداراة الكتبيات  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/librairie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'كتبية', value: 'dentiste', imgSrc: 'biblio' },
                { id: 2, name: 'أدوات مذرسية', value: 'dentiste', imgSrc: 'biblio' },    
            ],
            tableItemList : {
                librairie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                librairie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        boutique:{
            colorTheme:'#b146c2',
            adsImageUrl:'boutique.svg',
            systemTitle:'نظام إداراة نقاط  بيع الملابس ',
            businesName:'المتجر ',
            systemUrl:'https://boutique.system.abyedh.tn',
            adsText:'نظام إداراة نقاط بيع الملابس  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/librairie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'كتبية', value: 'dentiste', imgSrc: 'biblio' },
                { id: 2, name: 'أدوات مذرسية', value: 'dentiste', imgSrc: 'biblio' },    
            ],
            tableItemList : {
                librairie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                librairie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            imageCarousel:[
               {id:1, title:'إدارة العامة', color:'#4287f5', icon:'link-45deg', link:'boutique/boutique1.PNG'},
               {id:2, title:'سهل', color:'#5dd492', icon:'emoji-smile', link:'boutique/boutique2.PNG'},
               {id:3, title:'معين', color:'#8923e8', icon:'arrows-move', link:'boutique/boutique3.PNG'},
               {id:4, title:'متطور', color:'#5d6360', icon:'arrow-repeat', link:'boutique/boutique4.PNG'},
               {id:5, title:' مدعوم', color:'#e6327a', icon:'info-circle-fill', link:'boutique/boutique5.PNG'},
       
           ],
            yyyyyyyyyy : []
        },
        quincaillerie:{
            colorTheme:'#406163',
            adsImageUrl:'chantier_quincaillerie.svg',
            systemTitle:' Quancaillerie نظام إدارة  ',
            businesName:'المتجر ',
            systemUrl:'https://quincaillerie.system.abyedh.tn',
            adsText:'نظام إداراة Quancaillerie  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/librairie_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'كتبية', value: 'dentiste', imgSrc: 'biblio' },
                { id: 2, name: 'أدوات مذرسية', value: 'dentiste', imgSrc: 'biblio' },    
            ],
            tableItemList : {
                librairie_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                librairie_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        electromenager:{
            colorTheme:'#0078d7',
            adsImageUrl:'house_electro.svg',
            systemTitle:'نظام إداراة نقاط  بيع الالكترونيات ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط بيع الالكترونيات  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/electromenager_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أجهزة كهرومنزلية', value: 'electro', imgSrc: 'electro' },
                { id: 2, name: 'هواتف و حواسيب', value: 'electro', imgSrc: 'electro' },    
            ],
            tableItemList : {
                electromenager_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                electromenager_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        meublerie:{
            colorTheme:'#0078d7',
            adsImageUrl:'house_meuble.svg',
            systemTitle:'نظام إداراة نقاط  بيع الاثاث ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط ابيع الاثاث  يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Commandes' , icon:'cart4', link:'rq/meubles_shop'},
                {id: 3 , colLg:6, colSm:6, itemName:'Articles' , icon:'stars', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أَثَاثْ مَنْزِلِي', value: 'fourniture', imgSrc: 'furniture' },
                { id: 2, name: 'أَثَاثْ مَكْتَبِي', value: 'fourniture', imgSrc: 'furniture' },    
            ],
            tableItemList : {
                meubles_shop : [{id:1, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Livraison_Par', genre: 'text'}], 
            },
            tableHeader : {
                meubles_shop : ['*', 'Client', 'Passé le','Passé à','Totale','Livraison','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        docteur:{
            colorTheme:'#085947',
            adsImageUrl:'docteur.svg',
            systemTitle:' نظام إدارة العيادات الطبية ',
            businesName:'العيادة ',
            systemUrl:'https://docteur.system.abyedh.tn',
            adsText:' نظام إداراة العيادات يقدم لك مجموعة من الأدوات و الحلول الرقمية التي تساعدك علي أداء عملك بالشكل الممتاز , كما أنه يبقيك دائما متصلا مع مرضاك  للإطمئنان علي صحتهم و متابعة تطور حالتهم الصحية , بالإضافة إلي مجموعة من لوحات لاتحكم الموجهة لفريق العمل لتتابع أداء مهامهم بسهولة , فضلا  عن مجموعة متميزة من الأدوات التي تعينك علي تطوير عملك ',
            systemPos : [
                {id: 1 , posName:'إدارة الحصص' , description:'متابعة مرضاك ', icon:'window-dock'},
                {id: 2 , posName:'إدارة الوصفات الطبية' , description:'إنشاء جلسات', icon:'window-dock'},
                {id: 3 , posName:'إدارة المرضي' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Rendy-Vous' , icon:'calendar-week', link:'rq/docteur_rdv'},
                {id: 2 , colLg:6, colSm:6, itemName:'Tarifs' , icon:'cash-coin', link:'Spesific'},
                
            ],
           navItemList : [
            {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
            {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
            {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
            {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
            {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
            {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
            {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                docteur_rdv : [{id:1, value: 'RDV_Date', genre: 'date'}, {id:2, value: 'RDV_Time', genre: 'text'}], 
            },
            tableHeader : {
                docteur_rdv : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        clinique:{
            colorTheme:'#04c6ce',
            adsImageUrl:'clinique.svg',
            systemTitle:' نظام إدارة المصحات ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Reservation' , icon:'calendar-range', link:'rq/clinique_reserver'},
                {id: 3 , colLg:6, colSm:6, itemName:'Traif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'نسائية', value: 'femme', imgSrc: 'female' },
                { id: 2, name: 'عقلية', value: 'mentale', imgSrc: 'mentale' },
                { id: 3, name: ' علاجية', value: 'soint', imgSrc: 'logo' },
                { id: 4, name: ' عامة', value: 'generale', imgSrc: 'generale' },    
            ],
            tableItemList : {
                clinique_reserver : [{id:1, value: 'RES_Cause', genre: 'text'}, {id:2, value: 'RES_From_Date', genre: 'date'}, {id:2, value: 'RES_To_Date', genre: 'date'}], 
            },
            tableHeader : {
                clinique_reserver : ['*', 'Client', 'Passé le','Passé à','Cause ','De','Vers','Etat','Voir'], 
            },
            
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        labo:{
            colorTheme:'#1dd3b0',
            adsImageUrl:'labo.svg',
            systemTitle:' نظام إدارة المخابر ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Rendy Vous' , icon:'check-all', link:'rq/labo_rdv'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'تحليل وراثي خلوي', value: 'ANATOMIE_PATHOLOGIE', imgSrc: 'dna' },
                { id: 2, name: 'تحليل بيولوجي طبي', value: 'ANALYSES DE BIOLOGIE', imgSrc: 'blod' },
                { id: 3, name: ' تشريح وعلم الخلايا', value: 'CYTOGENETIQUE', imgSrc: 'cellule' },    
            ],
            tableItemList : {
                labo_rdv :[{id:1, value: 'RDV_Cause', genre: 'text'}, {id:2, value: 'RDV_Date', genre: 'date'}, {id:2, value: 'RDV_Time', genre: 'text'}], 
            },
            tableHeader : {
                labo_rdv : ['*', 'Client', 'Passé le','Passé à','Cause ','De','Vers','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        centreMD:{
            colorTheme:'#52a3c9',
            adsImageUrl:'centre.svg',
            systemTitle:'  نظام إدارة المراكز الطبية ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Reservation' , icon:'calendar-range', link:'rq/centre_reserver'},
                {id: 3 , colLg:6, colSm:6, itemName:'Traif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أشعة', value: 'radio', imgSrc: 'radio' },
                { id: 2, name: 'غسيل الكلي', value: 'dialyse', imgSrc: 'dialyse' },
                { id: 3, name: ' إستشفائي', value: 'sea', imgSrc: 'sea' },    
            ],
            tableItemList : {
                centre_reserver : [{id:1, value: 'RES_Cause', genre: 'text'}, {id:2, value: 'RES_From_Date', genre: 'date'}, {id:2, value: 'RES_To_Date', genre: 'date'}],  
            },
            tableHeader : {
                centre_reserver : ['*', 'Client', 'Passé le','Passé à','Cause ','De','Vers','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        garderie:{
            colorTheme:'#cf208f',
            adsImageUrl:'garderie.svg',
            systemTitle:'نظام  إدارة رياض الأطفال',
            businesName:'الروضة ',
            systemUrl:'https://garderie.system.abyedh.tn/',
            adsText:'نظام إدارة  رياض الأطفال يمكنك من  متابعة مختلف الانشطة اللي تصير داخل المؤسسة متاعك , و بالتالي مزيد من التحكم و الإدارة الذكية لجعل عملية التعلم أكثر جودة و تطور . كما يوفر مجموعة من الأدوات الرقمية اللي تساعدك في تحسين جودة المادة التعليمة مثل البرنامج البيداغوجي و غيرها  ',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Inscription' , icon:'check-all', link:'rq/garderie_inscription'},
                {id: 3 , colLg:6, colSm:12, itemName:'Souscription' , icon:'calendar-week', link:'rq/garderie_souscription'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'تَحْضِيرِي', value: 'dentiste', imgSrc: 'nursery' },
                { id: 2, name: 'مِحْضَنَة', value: 'dentiste', imgSrc: 'nurserya' },    
            ],
            tableItemList : {
                garderie_inscription : [{id:1, value: 'EL_Name', genre: 'text'}, {id:2, value: 'EL_Naissance', genre: 'date'}, {id:2, value: 'EL_Genre', genre: 'text'}], 
                garderie_souscription :  [{id:1, value: 'Identifiant', genre: 'text'}, {id:2, value: 'Annee_Scolaire', genre: 'text'}]
            },
            tableHeader : {
                garderie_inscription : ['*', 'Client', 'Passé le','Passé à','Nom','Naissance','Genre','Etat','Voir'], 
                garderie_souscription :  ['*', 'Client', 'Passé le','Passé à','Identifiant','Anneé','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            imageCarousel:[
               {id:1, title:'إدارة العامة', color:'#4287f5', icon:'link-45deg', link:'garderie/garderie1.PNG'},
               {id:2, title:'سهل', color:'#5dd492', icon:'emoji-smile', link:'garderie/garderie2.PNG'},
               {id:3, title:'معين', color:'#8923e8', icon:'arrows-move', link:'garderie/garderie3.PNG'},
               {id:4, title:'متطور', color:'#5d6360', icon:'arrow-repeat', link:'garderie/garderie4.PNG'},
               {id:5, title:' مدعوم', color:'#e6327a', icon:'info-circle-fill', link:'garderie/garderie5.PNG'},
       
           ],
            yyyyyyyyyy : []
        },
        autoecole:{
            colorTheme:'#1caaa8',
            adsImageUrl:'autoecole.svg',
            systemTitle:'نظام إدارة  مدرسة تعليم سياقة ',
            businesName:'المدرسة ',
            systemUrl:'https://autoecole.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Inscription' , icon:'check-all', link:'rq/autoecole_inscrie'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'صنف ب', value: 'صنف ب', imgSrc: 'tourism' },
                { id: 2, name: 'كار', value: 'شاحنة', imgSrc: 'car' },
                { id: 3, name: 'تاكسي و  لواج', value: 'ناكسي', imgSrc: 'taxi' },
                { id: 4, name: 'وزن ثقيل', value: 'وزن ثقيل', imgSrc: 'poid' },   
            ],
            tableItemList : {
                autoecole_inscrie : [{id:1, value: 'Renouvellemment', genre: 'text'}, {id:2, value: 'Genre', genre: 'text'}, {id:3, value: 'BirthDay_Check', genre: 'date'}], 
                 
            },
            tableHeader : {
                autoecole_inscrie : ['*', 'Client', 'Passé le','Passé à','Renouv','Genre','Verif','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        ecole:{
            colorTheme:'#4a9998',
            adsImageUrl:'ecole.svg',
            systemTitle:'نظام إداراة المدارس الخاصة ',
            businesName:'المدرسة ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Inscription' , icon:'check-all', link:'rq/garderie_inscription'},
                {id: 3 , colLg:6, colSm:12, itemName:'Souscription' , icon:'calendar-week', link:'rq/garderie_souscription'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'تَحْضِيرِي', value: 'dentiste', imgSrc: 'nursery' },
                { id: 2, name: 'مِحْضَنَة', value: 'dentiste', imgSrc: 'nurserya' },    
            ],
            tableItemList : {
                garderie_inscription : [{id:1, value: 'EL_Name', genre: 'text'}, {id:2, value: 'EL_Naissance', genre: 'date'}, {id:2, value: 'EL_Genre', genre: 'text'}], 
                garderie_souscription :  [{id:1, value: 'Identifiant', genre: 'text'}, {id:2, value: 'Annee_Scolaire', genre: 'text'}]
            },
            tableHeader : {
                garderie_inscription : ['*', 'Client', 'Passé le','Passé à','Nom','Naissance','Genre','Etat','Voir'], 
                garderie_souscription :  ['*', 'Client', 'Passé le','Passé à','Identifiant','Anneé','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        lycee:{
            colorTheme:'#4a9998',
            adsImageUrl:'lycee.svg',
            systemTitle:'نظام إدارة المعاهد الخاصة',
            systemUrl:'https://lycee.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Inscription' , icon:'check-all', link:'rq/garderie_inscription'},
                {id: 3 , colLg:6, colSm:12, itemName:'Souscription' , icon:'calendar-week', link:'rq/garderie_souscription'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'تَحْضِيرِي', value: 'dentiste', imgSrc: 'nursery' },
                { id: 2, name: 'مِحْضَنَة', value: 'dentiste', imgSrc: 'nurserya' },    
            ],
            tableItemList : {
                garderie_inscription : [{id:1, value: 'EL_Name', genre: 'text'}, {id:2, value: 'EL_Naissance', genre: 'date'}, {id:2, value: 'EL_Genre', genre: 'text'}], 
                garderie_souscription :  [{id:1, value: 'Identifiant', genre: 'text'}, {id:2, value: 'Annee_Scolaire', genre: 'text'}]
            },
            tableHeader : {
                garderie_inscription : ['*', 'Client', 'Passé le','Passé à','Nom','Naissance','Genre','Etat','Voir'], 
                garderie_souscription :  ['*', 'Client', 'Passé le','Passé à','Identifiant','Anneé','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        universite:{
            colorTheme:'#4a9998',
            adsImageUrl:'universite.svg',
            systemTitle:'نظام إداراة الجامعات الخاصة ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Inscription' , icon:'check-all', link:'rq/garderie_inscription'},
                {id: 3 , colLg:6, colSm:12, itemName:'Souscription' , icon:'calendar-week', link:'rq/garderie_souscription'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
            navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'تَحْضِيرِي', value: 'dentiste', imgSrc: 'nursery' },
                { id: 2, name: 'مِحْضَنَة', value: 'dentiste', imgSrc: 'nurserya' },    
            ],
            tableItemList : {
                garderie_inscription : [{id:1, value: 'EL_Name', genre: 'text'}, {id:2, value: 'EL_Naissance', genre: 'date'}, {id:2, value: 'EL_Genre', genre: 'text'}], 
                garderie_souscription :  [{id:1, value: 'Identifiant', genre: 'text'}, {id:2, value: 'Annee_Scolaire', genre: 'text'}]
            },
            tableHeader : {
                garderie_inscription : ['*', 'Client', 'Passé le','Passé à','Nom','Naissance','Genre','Etat','Voir'], 
                garderie_souscription :  ['*', 'Client', 'Passé le','Passé à','Identifiant','Anneé','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        restaurant:{
            colorTheme:'#35ac67',
            adsImageUrl:'restaurant.svg',
            systemTitle:'نظام إداراة المطاعم ',
            businesName:'المطعم',
            systemUrl:'https://restaurant.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Menu' , icon:'list-columns-reverse', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                // {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                // {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 4 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 4, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: '5 نجوم', value: 'dentiste', imgSrc: 'kaftaji' },
                { id: 2, name: 'أكلة خفيفة', value: 'dentiste', imgSrc: 'resto1' },
                { id: 3, name: 'ملاوي', value: 'dentiste', imgSrc: 'mlawi' },
                { id: 4, name: ' بتزا', value: 'dentiste', imgSrc: 'pizza' },   
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Wanted_Date', genre: 'date'}, {id:2, value: 'Wanted_Time', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Data3','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        cafe:{
            colorTheme:'#363636',
            adsImageUrl:'cafe.svg',
            systemTitle:'نظام إداراة المقاهي و قاعات الشاي',
            systemUrl:'https://cafe.system.abyedh.tn/Login',
            businesName:'المقهي ',
            adsText:'نكانك صاحب مطعم أبيض يوفرلك نظام إدارة و مراقبة و متابعة للمطعم وإلا العمل متاعك , من خلال بيئة إفتراضية تخليك ديما متصل بالزبائن متاعك لمعرفة ردود أفعالهم علي الخدمات اللي تقدمها ' ,
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Menu' , icon:'list-columns-reverse', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            imageCarousel:[
               {id:1, title:'إدارة العامة', color:'#4287f5', icon:'link-45deg', link:'cafe/cafe1.PNG'},
               {id:2, title:'سهل', color:'#5dd492', icon:'emoji-smile', link:'cafe/cafe2.PNG'},
               {id:3, title:'معين', color:'#8923e8', icon:'arrows-move', link:'cafe/cafe3.PNG'},
               {id:4, title:'متطور', color:'#5d6360', icon:'arrow-repeat', link:'cafe/cafe4.PNG'},
               {id:5, title:' مدعوم', color:'#e6327a', icon:'info-circle-fill', link:'cafe/cafe5.PNG'},
       
           ],
            yyyyyyyyyy : []
        },
        hotel:{
            colorTheme:'#247cc7',
            adsImageUrl:'hotel.svg',
            systemTitle:'نظام إداراة الفنادق و النزل',
            systemUrl:'https://hotel.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        transporteur:{
            colorTheme:'#be6e70',
            adsImageUrl:'transporteur.svg',
            systemTitle:'نظام إداراة شركات نقل البظائع',
            systemUrl:'https://transporteur.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/transporteur_request'},
                {id: 3 , colLg:6, colSm:6, itemName:'Traif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'agence', value: 'dentiste', imgSrc: 'tr-agence' },
                { id: 2, name: 'Transporteur', value: 'dentiste', imgSrc: 'transporteur' },    
            ],
            tableItemList : {
                transporteur_request : [{id:1, value:['De', 'Deleg'], genre: 'PropFunction'},{id:2, value:['Vers', 'Deleg'], genre: 'PropFunction'}, {id:3, value: 'Articles', genre: 'lengthFunc'}],       
            },
            tableHeader : {
                transporteur_request : ['*', 'Client', 'Passé le','Passé à','De','Vers','Colis','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        vg_agence:{
            colorTheme:'#ce8c64',
            adsImageUrl:'vg-agence.svg',
            systemTitle:'نظام إداراة وكالات الأسفار',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        samsar:{
            colorTheme:'#455b7a',
            adsImageUrl:'samsar.svg',
            systemTitle:'نظام إداراة مكتب وسيط عقاري',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        impremerie:{
            colorTheme:'#4c4a48',
            adsImageUrl:'impremerie.svg',
            systemTitle:'نظام إداراة المطابع',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        avocat:{
            colorTheme:'#7a8890',
            adsImageUrl:'avocat.svg',
            systemTitle:'نظام إداراة مكتب محامي',
            businesName:'المكتب',
            systemUrl:'https://avocat.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        comptable:{
            colorTheme:'#a77a51',
            adsImageUrl:'comptable.svg',
            systemTitle:'نظام إداراة مكتب محاسب',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        handmade_menuisier:{
            colorTheme:'#cdb556',
            adsImageUrl:'handmade_menuisier.svg',
            systemTitle:'نظام إداراة ورشة نجارة',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        handmade_forgeron:{
            colorTheme:'#cdb556',
            adsImageUrl:'handmade_forgeron.svg',
            systemTitle:'نظام إداراة ورشة حدادة',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        handmade_cristal:{
            colorTheme:'#cdb556',
            adsImageUrl:'handmade_cristal.svg',
            systemTitle:'نظام إداراة ورشة تركيب بلور',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        handmade_marbre:{
            colorTheme:'#cdb556',
            adsImageUrl:'handmade_marbre.svg',
            systemTitle:'نظام إداراة ورشات الرخام',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        handmade_electricien:{
            colorTheme:'#cdb556',
            adsImageUrl:'handmade_electricien.svg',
            systemTitle:'نظام إداراة شركات الكهرباء',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        handmade_peinture:{
            colorTheme:'#cdb556',
            adsImageUrl:'handmade_peinture.svg',
            systemTitle:'نظام إداراة شركات  الدهان',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        chantier_contracteur:{
            colorTheme:'#406163',
            adsImageUrl:'chantier_contracteur.svg',
            systemTitle:'نظام إداراة شركات المقاولة',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        chantier_architecture:{
            colorTheme:'#406163',
            adsImageUrl:'chantier_architecture.svg',
            systemTitle:'نظام إداراة مكتب مهندس معماري',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        parking:{
            colorTheme:'#2d4664',
            adsImageUrl:'car_parking.svg',
            systemTitle:'Parking نظام إداراة ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-range', link:'rq/parking_reserver'},
                {id: 3 , colLg:6, colSm:12, itemName:'Souscription' , icon:'check2-circle', link:'rq/parking_souscrire'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'مَأْوَي عُمُومِي' , value: 'dentiste', imgSrc: 'parking' },
                { id: 2, name: 'مَأْوَي خَاصْ' , value: 'dentiste', imgSrc: 'parking' },    
            ],
            tableItemList : {
                parking_reserver : [{id:1, value: 'Car_Name', genre: 'text'},{id:1, value: 'Car_Matricule', genre: 'text'}, {id:2, value: 'Depart_Date', genre: 'date'}, {id:2, value: 'Finish_Date', genre: 'date'}], 
                parking_souscrire :  [{id:1, value: 'Car_Name', genre: 'text'},{id:1, value: 'Car_Matricule', genre: 'text'}, {id:2, value: 'Depart_Date', genre: 'date'}, {id:2, value: 'Finish_Date', genre: 'date'}]
            },
            tableHeader : {
                parking_reserver : ['*', 'Client', 'Passé le','Passé à','Voiture','Mtricule','Depart','Termine','Etat','Voir'], 
                parking_souscrire :  ['*', 'Client', 'Passé le','Passé à','Voiture','Mtricule','Depart','Termine','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        qiosque:{
            colorTheme:'#2d4664',
            adsImageUrl:'car_qiosque.svg',
            systemTitle:' Qiosque نظام إداراة',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/qiosque_request'},
                {id: 3 , colLg:6, colSm:12, itemName:'Lavage' , icon:'calendar-week', link:'rq/qiosque_lavage'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'Qiosque', value: 'dentiste', imgSrc: 'qiosque' },
                { id: 2, name: 'غَسِيلْ السَيَّارَاتْ', value: 'dentiste', imgSrc: 'qiosque' },    
            ],
            tableItemList : {
                qiosque_request : [{id:1, value: 'Car_Genre', genre: 'text'}, {id:2, value: 'Articles', genre: 'lengthFunc'}, {id:2, value: 'Wanted_Time', genre: 'text'}], 
                qiosque_lavage :  [{id:1, value: 'Car_Genre', genre: 'text'}, {id:2, value: 'Wash_Genre', genre: 'text'},{id:1, value: 'Wanted_Day', genre: 'date'}, {id:2, value: 'Wanted_Time', genre: 'text'}]
            },
            tableHeader : {
                qiosque_request : ['*', 'Client', 'Passé le','Passé à','Voiture','Totale','Temps','Etat','Voir'], 
                qiosque_lavage :  ['*', 'Client', 'Passé le','Passé à','Voiture','Lavage','Data','Temps','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        location:{
            colorTheme:'#2d4664',
            adsImageUrl:'car_location.svg',
            systemTitle:'نظام إداراة شركات كراء السيارات',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Demandes de Location' , icon:'check2-circle', link:'rq/location_request'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'كِرَاءْ السَيَّارَاتْ', value: 'dentiste', imgSrc: 'car_selling' },
                { id: 2, name: 'كِرَاءْ الشَاحِنَاتْ', value: 'dentiste', imgSrc: 'car_selling' },    
            ],
            tableItemList : {
                location_request : [{id:1, value: 'Cause', genre: 'text'}, {id:2, value: 'Depart_Date', genre: 'date'}, {id:2, value: 'Finish_Date', genre: 'date'}], 
            },
            tableHeader : {
                location_request : ['*', 'Client', 'Passé le','Passé à','Cause','Depart','Finish','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        wedding_photographe:{
            colorTheme:'#c30052',
            adsImageUrl:'wedding_photographe.svg',
            systemTitle:'نظام إداراة إستديو تصوير',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        wedding_salon_marriage:{
            colorTheme:'#c30052',
            adsImageUrl:'wedding_salon_marriage.svg',
            systemTitle:'نظام إداراة قاعة أفراح و مؤتمرات',
            systemUrl:'https://sallon.system.abyedh.tn/',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        wedding_fourniture_marriage:{
            colorTheme:'#c30052',
            adsImageUrl:'wedding_fourniture_marriage.svg',
            systemTitle:'نظام إداراة نقاط  بيع لوازم الأفراح ',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        coiffure:{
            colorTheme:'#0b97bf',
            adsImageUrl:'coiffure.svg',
            systemTitle:'نظام إداراة قاعات الحلاقة',
            businesName:'قاعة الحلاقة',
            systemUrl:'',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:12, colSm:12, itemName:'Reservation' , icon:'check2-circle', link:'rq/coiffure_reserver'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'رجال', value: 'dentiste', imgSrc: 'coiffure-man' },
                { id: 2, name: 'نساء', value: 'dentiste', imgSrc: 'woumen' },    
            ],
            tableItemList : {
                coiffure_reserver : [{id:1, value: 'Services', genre: 'lengthFunc'}, {id:2, value: 'Wanted_Day', genre: 'date'}, {id:2, value: 'Wanted_Time', genre: 'text'}], 
            },
            tableHeader : {
                coiffure_reserver : ['*', 'Client', 'Passé le','Passé à','Services','Jour','Temps','Etat','Voir'], 
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        gym:{
            colorTheme:'#7aadab',
            adsImageUrl:'gym.svg',
            systemTitle:'نظام إداراة قاعات الرياضة',
            businesName:'قاعة الرياضة',
            systemUrl:'https://gym.system.abyedh.tn/',
            adsText:'   نظام إدارة  قاعات الرياضة هو نظام إدارة و  محاسبة و تواصل مع مشتركيك و مراقبة أداءهم و تطور نشاطهم الرياضي من خلال خلق فضاء للتفاعل إفتراضيا مع القاعة لتقييم خدماتها ...',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            imageCarousel:[
               {id:1, title:'إدارة العامة', color:'#4287f5', icon:'link-45deg', link:'gym/gym1.PNG'},
               {id:2, title:'سهل', color:'#5dd492', icon:'emoji-smile', link:'gym/gym2.PNG'},
               {id:3, title:'معين', color:'#8923e8', icon:'arrows-move', link:'gym/gym3.PNG'},
               {id:4, title:'متطور', color:'#5d6360', icon:'arrow-repeat', link:'gym/gym4.PNG'},
               {id:5, title:' مدعوم', color:'#e6327a', icon:'info-circle-fill', link:'gym/gym5.PNG'},
       
           ],
            yyyyyyyyyy : []
        },
        pyscine:{
            colorTheme:'#009fe3',
            adsImageUrl:'pyscine.svg',
            systemTitle:'نظام إداراة المسابح',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        stade:{
            colorTheme:'#587e6d',
            adsImageUrl:'stade.svg',
            systemTitle:'نظام إداراة الملاعب الرياضية',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        art_cinema:{
            colorTheme:'#2c7177',
            adsImageUrl:'art_cinema.svg',
            systemTitle:'نظام إداراة قاعات السنما',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        art_theatre:{
            colorTheme:'#2c7177',
            adsImageUrl:'art_theatre.svg',
            systemTitle:'نظام إداراة قاعات المسرح',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        farm:{
            colorTheme:'#72bcc7',
            adsImageUrl:'champ.svg',
            systemTitle:'نظام إداراة الضيعات الفلاحية',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        },
        socite:{
            colorTheme:'#32a6c9',
            adsImageUrl:'socite.svg',
            systemTitle:'نظام إداراة الشركات القابضة',
            systemUrl:'#',
            adsText:'نظام إداراة نقاط البيع بالجملة يساعدك علي مراقبة و التحكم في مخزون المنتجات (stock) و متابعة فواتيرك و الإتصال بعملاءك و متابعة طلباتهم . كما يقدم لك واجهة رسومية (caisse) لتسجيل المبيعات و طباعة الفواتير. بالإضافة إلي مجموعة من الأدوات الإبداعية (مثل واجهة إستخراج الأسعار) التي تساعدك علي أداء عملك بجودة أفضل',
            systemPos : [
                {id: 1 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 2 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
                {id: 3 , posName:'1xxxxxxxxx1إدارة ال' , description:'', icon:'window-dock'},
            ],
            itemsList : [
                {id: 1 , colLg:6, colSm:12, itemName:'Commandes' , icon:'check-all', link:'rq/restaurant_commande'},
                {id: 3 , colLg:6, colSm:12, itemName:'Reservation' , icon:'calendar-week', link:'rq/restaurant_reservation'},
                {id: 3 , colLg:6, colSm:6, itemName:'Tarif' , icon:'cash-coin', link:'Spesific'},
            ],
           navItemList : [
                {id: 1 , navName:'En Attent' , color:'#ffc20b',  icon:'hourglass-split', navIndex: 0, navIndexName:'W'},
                {id: 2 , navName:'Vu' , color:'#1070fd',  icon:'eye-fill', navIndex: 1, navIndexName:'S'},
                {id: 3 , navName:'Accepteé' , color:'#198754',  icon:'check-square-fill', navIndex: 2, navIndexName:'A'},
                {id: 4 , navName:'Refuseé' , color:'#dc3545',  icon:'x-square-fill', navIndex: 3, navIndexName:'R'},
                {id: 5 , navName:'Retardeé' , color:'#ad059f',  icon:'arrow-clockwise', navIndex: 4, navIndexName:'RD'},
                {id: 6 , navName:'Redirecteé' , color:'#92ab03',  icon:'compass-fill', navIndex: 5, navIndexName:'RT'},
                {id: 7 , navName:'Termineé' , color:'#6c757d',  icon:'slash-square-fill', navIndex: 6, navIndexName:'T'},
            ],
            genreListe : [
                { id: 1, name: 'أسنان', value: 'STOMATOLOGIE', imgSrc: 'STOMATOLOGIE' },
                { id: 2, name: 'أطفال', value: 'PEDIATRIE', imgSrc: 'PEDIATRIE' },
                { id: 3, name: 'المجاري البولية', value: 'UROLOGIE', imgSrc: 'UROLOGIE' },
                { id: 4, name: 'امراض الرئة', value: 'PNEUMOLOGIE', imgSrc: 'PNEUMOLOGIE' },
                { id: 5, name: 'العيون', value: 'OPHTALMOLOGIE', imgSrc: 'OPHTALMOLOGIE' },
                { id: 6, name: 'أذن أنف حنجرة', value: 'ORL', imgSrc: 'ORL' },
                { id: 7, name: 'الأعصاب', value: 'NEUROLOGIE', imgSrc: 'NEUROLOGIE' },
                { id: 8, name: 'الكلي', value: 'NEPHROLOGIE', imgSrc: 'NEPHROLOGIE' },
                { id: 9, name: 'نساء و توليد', value: 'GYNECOLOGIE_OBSTETRIQUE', imgSrc: 'GYNECOLOGIE_OBSTETRIQUE' },
                { id: 10, name: 'الجهاز الهضمي', value: 'GASTROLOGIE', imgSrc: 'GASTROLOGIE' },
                { id: 11, name: 'الغدد', value: 'ENDOCRINOLOGIE', imgSrc: 'ENDOCRINOLOGIE' },
                { id: 12, name: 'البشرة', value: 'DERMATOLOGIE', imgSrc: 'DERMATOLOGIE' },
                { id: 13, name: 'القلب', value: 'CARDIOLOGIE', imgSrc: 'CARDIOLOGIE' },
                { id: 14, name: 'النفس', value: 'PSYCHIATRIE', imgSrc: 'PSYCHIATRIE' },
                { id: 15, name: 'التغذية', value: 'NUTRITION', imgSrc: 'NUTRITION' },    
            ],
            tableItemList : {
                restaurant_commande : [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}], 
                restaurant_reservation :  [{id:1, value: 'Comm_Genre', genre: 'text'}, {id:2, value: 'Table_Num', genre: 'text'}]
            },
            tableHeader : {
                restaurant_commande : ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Voir'], 
                restaurant_reservation :  ['*', 'Client', 'Passé le','Passé à','Data 1','Data 2','Etat','Etat','Voir'],
            },
            xxxxxxxxxx: [],
            yyyyyyyyyy : []
        }

    },

}
 
export default GConf 