import React , { useEffect, useState } from 'react';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';
import { _ } from "gridjs-react";
import { Button, Dropdown, Icon, Input, Loader } from 'semantic-ui-react';
import TableGrid from '../../../Dashboard/Assets/tableGrid';
import axios from 'axios';
import GConf from '../../../AssetsM/generalConf';
import { toast } from 'react-toastify';
import SKLT from '../../../AssetsM/usedSlk';
import { useNavigate} from 'react-router-dom';

function InfoGenerale() {
    /*#########################[Const]##################################*/
    const navigate = useNavigate();
    let Offline = JSON.parse(localStorage.getItem(`Admin_Dir_Offline`));
    let [toShowFixList, setToShowFixedList] = useState([]);   
    let [selectedTable, setSetectedTable] = useState();  
    const options = [
      { key: 1, text: 'docteur', value: 'docteur'},
      { key: 2, text: 'pharma', value: 'pharmacie'},
      { key: 3, text: 'clinique', value: 'clinique'},
      { key: 4, text: 'labo', value: 'labo'},
      { key: 5, text: 'centremedi', value: 'centreMD'},
      { key: 6, text: 'admin_s_hospital', value: 'admin_s_hospital'},
      { key: 7, text: 'admin_s_csb', value: 'admin_s_csb'},
      { key: 8, text: 'nurs', value: 'garderie' },
      { key: 9, text: 'ecole', value: 'ecole' },
      { key: 10, text: 'lycee', value: 'lycee' },
      { key: 11, text: 'universite', value: 'universite' },
      { key: 12, text: 'eduser', value : 'impremerie' },
      { key: 13, text: 'librairie',value : 'librairie' },
      { key: 14, text: 'admin_e_centre', value: 'admin_e_centre' },
      { key: 15, text: 'admin_e_biblio', value: 'admin_e_biblio' },
      { key: 16, text: 'transp',  value: 'transporteur' },
      { key: 17, text: 'autoecole', value: 'autoecole' },
      { key: 18, text: 'cafe', value: 'cafe' },
      { key: 19, text: 'restaurant', value: 'restaurant' },
      { key: 20, text: 'shop', value: 'ptvente_shop' },
      { key: 21, text: 'ptvente_bread', value: 'ptvente_boulengerie' },
      { key: 22, text: 'ptvente_viande', value: 'ptvente_viande' },
      { key: 23, text: 'ptvente_fruit', value: 'ptvente_fruit' },
      { key: 24, text: 'ptvente_patesserie', value: 'ptvente_patesserie' },
      { key: 25, text: 'ptvente_small_shop', value: 'ptvente_small_shop' },
      { key: 26, text: 'house_electro', value: 'house_electro' },
      { key: 27, text: 'home', value: 'house_meuble' },
      { key: 28, text: 'car', value: 'car_location' },
      { key: 29, text: 'car_parking', value: 'car_parking' },
      { key: 30, text: 'samsar', value: 'samsar' },
      { key: 31, text: 'chantier_contracteur', value: 'chantier_contrateur' },
      { key: 32, text: 'chantier_architecture', value: 'chantier_architecture' },
      { key: 33, text: 'handmade', value: 'chantier_quincaillerie' },
      { key: 34, text: 'handmade_forgeron', value: 'handmade_forgeron' },
      { key: 35, text: 'handmade_menuisier', value: 'handmade_menuisier' },
      { key: 36, text: 'handmade_peinture', value: 'handmade_peinture' },
      { key: 37, text: 'handmade_electricien', value: 'handmade_electricien' },
      { key: 38, text: 'coiffure', value: 'coiffure' },
      { key: 39, text: 'boutique', value: 'boutique' },
      { key: 40, text: 'wedding_salon_marriage', value: 'wedding_salon_marriage' },
      { key: 41, text: 'wedding_orchestre', value: 'wedding_orchestre' },
      { key: 42, text: 'wedding_chef', value: 'wedding_chef' },
      { key: 43, text: 'wedding_photographe', value: 'wedding_photographe' },
      { key: 44, text: 'wedding_fourniture_marriage', value: 'wedding_fourniture_marriage' },
      { key: 45, text: 'wedding', value: 'wedding_bijoux' },
      { key: 46, text: 'gym',  value: 'gym' },
      { key: 47, text: 'piscine',  value: 'pyscine' },
      { key: 48, text: 'stade',  value: 'stade' },
      { key: 49, text: 'art_cinema',  value: 'art_cinema' },
      { key: 50, text: 'art_theatre', value: 'art_theatre' },
      { key: 51, text: 'art_musee',  value: 'art_musee' },
      { key: 52, text: 'admin_c_mj',  value: 'admin_c_mj' },
      { key: 53, text: 'admin_c_mc', value: 'admin_c_mc' },
      { key: 54, text: 'avocat',  value: 'avocat' },
      { key: 55, text: 'storage', value: 'storage' },
      { key: 56, text: 'comptable',  value: 'comptable' },
      { key: 57, text: 'socite', value: 'socite' },
      { key: 58, text: 'admin_f_poste', value: 'admin_f_poste' },
      { key: 59, text: 'Hotels',  value: 'hotels' },
      { key: 60, text: 'travel', value: 'vg_agence' },
      { key: 61, text: 'admin_a_mu',  value: 'admin_a_mu' },
      { key: 62, text: 'admin_a_police', value: 'admin_a_police' },
      { key: 63, text: 'admin_a_ar',  value: 'admin_a_ar' },
      { key: 64, text: 'admin_a_court',  value: 'admin_a_court' },


  ] 
    /*#########################[Function]##################################*/
    const SearchInDirectory = () =>{
       if (!selectedTable) {toast.error("Selectionne un tableaux !", GConf.TostErrorGonf)}
       else {
        axios.post(`https://api.abyedh.tn/apiAbyedh/Search/search`, {
          tag: selectedTable ,
          genre:'genre',
          gouv: Offline.localData[0].gouv,
          deleg : Offline.localData[0].deleg
        }).then(function (response) {
          let testTable = []
            response.data.map( (getData) => testTable.push([          
            getData.PID,
            getData.Name,
            getData.Deleg,
            getData.Adress,
            _(<Button className='rounded-pill bg-system-btn' size='mini' onClick={ (e) => NavigateFunction(`/Dir/L/if/edit/${selectedTable}/${getData.PID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button>)
            ],))
            setToShowFixedList(testTable)
        }).catch((error) => {
          if(error.request) {
            toast.error(<><div><h5>مشل في الإتصال </h5> </div></>, GConf.TostInternetGonf) 
            setToShowFixedList([])
            }
        });
      }
    }

    const NavigateFunction = (link) => {  navigate(link) }

    /*#########################[Card]##################################*/
    return ( <>
        <BackCard data={InputLinks.backCard.edit}/>
        <br />
        
        <div className='container-fluid'>
          <div className='card card-body shadow-sm mb-3'>
                  <div className='mb-2 text-secondary'>Gouv :  {Offline.localData[0].gouv}</div>
                  <div className='mb-2 text-secondary'>Deleg :  {Offline.localData[0].deleg}</div>
                  <Dropdown
                    search
                    fluid
                    selection
                    wrapSelection={false}
                    options={options}
                    placeholder='Selectionez UN Tableaux'
                    onChange={(e, { value }) => setSetectedTable(value)}
                  />
                  <br />
                 <Button size='small'  fluid className=' rounded-pill bg-system-btn' icon onClick={(e) => SearchInDirectory()}>  <Icon name='search' /> Recherche </Button> 
          </div>
     
           <TableGrid tableData={toShowFixList} columns={['PID','Nom','Deleg','Adresse','Voir']} />
        </div>
        </> );
}


export default InfoGenerale;