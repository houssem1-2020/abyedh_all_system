import axios from 'axios';
import NG from '../../Dashboard/Used/Forum/notifGenre';
import GConf from '../generalConf';

const useSaveNotification = (genre,tag,table) => {
    axios.post(`${GConf.ApiLink}/notifications/ajouter`, {
        Tag : tag,
        genre : genre,
        text : NG[genre].GenFunction(table)
    }).then(function (response) {
        console.log('Ajouter')
    })
}
export default useSaveNotification ;