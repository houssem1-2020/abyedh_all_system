const GetForTeamM = () =>{
    const pidIsSet = JSON.parse(localStorage.getItem('Admin_Dir_LocalD'));
    return pidIsSet
}

const InputLinks = {
    forTeamM: GetForTeamM(),
    themeColor: '#2f8d99',
    main : [
        {id:1, link:'nv', icon:'person-plus-fill', text:'AJOUTER', desc:''},
        {id:2, link:'ed', icon:'pencil-square', text:'MODIFIER', desc:''},
        {id:3, link:'im', icon:'image-fill', text:'IMAGES', desc:''},
        {id:4, link:'pos', icon:'pin-map-fill', text:'POSITION', desc:''},
        {id:5, link:'cl', icon:'calendar2-week-fill', text:'CALENDAR', desc:''},
        {id:6, link:'if', icon:'bookmark-star-fill', text:'INFO SPECIALE', desc:''},
    ],
    client : [
        {id:1, link:'ajouter', icon:'person-plus-fill', text:'Ajouter Client', desc:''},
        {id:2, link:'recherche', icon:'search', text:'Recherche', desc:''},
        {id:3, link:'pointage', icon:'geo-alt', text:'Pointage', desc:''},
        {id:4, link:'List', icon:'person-lines-fill', text:'Liste Compléte', desc:''},
    ],
    images : [
        {id:1, link:'add/profile', icon:'person-bounding-box', text:'Profile', desc:''},
        {id:2, link:'add/image1', icon:'house-heart', text:'Image1 ', desc:''},
        {id:3, link:'add/image2', icon:'card-image', text:'Image 2 ', desc:''},
        {id:4, link:'add/image3', icon:'file-earmark-image', text:'Image 3', desc:''},
        {id:5, link:'add/image4', icon:'image-alt', text:'Image 4', desc:''},
        {id:6, link:'add/image5', icon:'images', text:'Image 5', desc:''},
    ],
    recette : [
        {id:1, link:'depenses', icon:'menu-app', text:'Depenses', desc:''},
        {id:2, link:'imprimer', icon:'printer-fill', text:'Imprimer', desc:''},
    ],
    ventes : [
        {id:1, link:'journier', icon:'box2-heart', text:'Vente jounriere', desc:''},
        {id:2, link:'recherche', icon:'calendar2-week', text:'Par Jour', desc:''},
    ],

    //return back card 
    backCard:{
        nv : {id:1, text:'Nouveaux Entreé', link:'/Dir/L'},

        edit : {id:7, text:'Modifier Entreé', link:'/Dir/L'},
        mfEdit : {id:8, text:'Modification', link:'/Dir/L/ed'},
       
        sk : {id:9, text:'Images', link:'/Dir/L'},
        skList : {id:10, text:'Mon Stock', link:'/Dir/L/im'},

        vt : {id:1, text:'Position', link:'/Dir/L'},
        vtRech : {id:1, text:'Recherche', link:'/Dir/L/pos'},
        vtJour : {id:1, text:'Aujourd\'hui', link:'/Dir/L/pos'},

        cl : {id:2, text:'Horaires', link:'/Dir/L'},
        clAdd : {id:3, text:'Ajouter Client', link:'/Dir/L/cl'},
        clPtg : {id:4, text:'Pointage des Clients', link:'/Dir/L/cl'},
        clMap : {id:5, text:'Recherche des Clients', link:'/Dir/L/cl'},
        clList : {id:6, text:'Liste des Clients', link:'/Dir/L/cl'},

        rt : {id:1, text:'Info Generale', link:'/Dir/L'},
        rtDeps : {id:1, text:'Depenses', link:'/Dir/L/if'},
        rtImpr : {id:1, text:'Imprimer', link:'/Dir/L/if'},

        up : {id:1, text:'Mettre a jour ', link:'/Dir/L'},

    }
}
export default InputLinks