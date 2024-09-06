import React from 'react';
import { Grid, _ } from "gridjs-react";
//import "gridjs/dist/theme/mermaid.css";
import { frFR } from "gridjs/l10n";
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function TableGrid(props) {
    const { t, i18n } = useTranslation();
 
    const languagesData = {
        'en_US': {
            search: {
                placeholder: '🔍 Search...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: 'Showing',
                of: 'of',
                to: 'to',
                results: 'Results',
            },
            noRecordsFound: '🚩🚩🚩 No Records Found 🚩🚩🚩',
        },
        'fr_FR': {
            search: {
                placeholder: '🔍 Recherche...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: 'Affichage',
                of: 'de',
                to: 'à',
                results: 'Résultats',
            },
            noRecordsFound: '🚩🚩🚩 Pas De Résultat 🚩🚩🚩',
        },
        'it_IT': {
            search: {
                placeholder: '🔍 Ricerca...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: 'Visualizzazione',
                of: 'di',
                to: 'a',
                results: 'Risultati',
            },
            noRecordsFound: '🚩🚩🚩 Nessun Risultato Trovato 🚩🚩🚩',
        },
        'de_DE': {
            search: {
                placeholder: '🔍 Suche...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: 'Anzeige',
                of: 'von',
                to: 'bis',
                results: 'Ergebnisse',
            },
            noRecordsFound: '🚩🚩🚩 Keine Datensätze gefunden 🚩🚩🚩',
        },
        hi: {
            search: {
                placeholder: '🔍 खोज...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: 'दिखा रहा है',
                of: 'का',
                to: 'से',
                results: 'परिणाम',
            },
            noRecordsFound: '🚩🚩🚩 कोई रिकॉर्ड नहीं मिला 🚩🚩🚩',
        },
        ru: {
            search: {
                placeholder: '🔍 Поиск...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: 'Показано',
                of: 'из',
                to: 'до',
                results: 'Результаты',
            },
            noRecordsFound: '🚩🚩🚩 Нет записей 🚩🚩🚩',
        },
        ja: {
            search: {
                placeholder: '🔍 検索...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: '表示',
                of: '/',
                to: 'から',
                results: '結果',
            },
            noRecordsFound: '🚩🚩🚩 該当するレコードがありません 🚩🚩🚩',
        },
        'zh_CN': {
            search: {
                placeholder: '🔍 搜索...',
            },
            pagination: {
                previous: ' ',
                next: ' ',
                limit: 15,
                showing: '显示',
                of: '的',
                to: '至',
                results: '结果',
            },
            noRecordsFound: '🚩🚩🚩 没有找到记录 🚩🚩🚩',
        },
        
    }
    return ( <>
            <Grid   
                data={props.tableData}
                columns={props.columns}
                search = {true}
                page={2}
                resizable = {true}
                sort = {true}                
                pagination= {{
                    enabled: true,
                    limit: 15,
                }}
                language = {languagesData[i18n.language]}
                // language= {{
                //     search : {
                //         placeholder :'🔍 Recherche ...' ,
                //         },
                //     pagination: {
                //             previous: ' ',
                //             next: ' ',
                //             limit: 15,
                //             showing: ' ',
                //             of: 'de',
                //             to: 'à',
                //             results: 'Resultat',
                //     },
                //     noRecordsFound: '🚩🚩🚩  Pas De Résultat  🚩🚩🚩',
                    
                // }}
                className= {{
                    search:'w-100-seach-input shadow-sm',
                    table:'rounded-0 border-2   w-100-seach-input',
                    paginationButtonNext:'bi bi-caret-right-fill text-success',
                    paginationButtonPrev :'bi bi-caret-left-fill text-danger' ,
                    container: `${props.borderless ? 'p-0':'card card-body shadow-sm'} border-div  mb-2`
                }}
                style= {{
                    table: {
                        borderRadius: '0px !important',
                    },
                    th:{
                        padding:'15px', border:'none', borderBottom:'1px solid #7f7f7f'
                    },
                    td:{
                        padding:'7px', paddingLeft:'10px', border:'none', borderBottom:'1px solid #e8e8e8', whiteSpace: 'nowrap',
                    },
                    container:{
                        padding : '18px'
                    },
                    footer:{
                        border:'none'
                    }
                }}     
            />
    </> );
}

export default TableGrid;