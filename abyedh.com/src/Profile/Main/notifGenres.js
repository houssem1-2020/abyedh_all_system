import DoctorAcceptRdv from './NotifAction/docteur_accepted'
import DoctorReatartedRdv from './NotifAction/docteur_retarted'
import PharmacieAcceptShop from './NotifAction/pharmacie_shop_accepted'
import PharmacieEditedShop from './NotifAction/docteur_retarted'
import PharmacieReatartedRdv from './NotifAction/docteur_retarted'
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';


const  NotifGenres  = {
    promting_pub : {
        icon:'bi-megaphone text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم تسجيل طلب موعد مع الطبيب    بنجاح  و ذلك بتاريخ  </div>  
                </> )
        }
    }, 
    //docteur
    docteur_rdv_saved : {
        icon:'bi-calendar2-plus text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div  >{ t('userProfile.notificationPage.docteur_rdv_saved', {  one: pidData.Name , two: new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-') })}</div>  
                </> )
        }
    },
    docteur_rdv_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    docteur_rdv_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{t('userProfile.notificationPage.docteur_rdv_accepted.one', { pidData: { Name: 'John Doe' }, requestData: { Refuser_Cause: 'Reason for rejection' } })}</div>  
                </> )
        }
    },
    docteur_rdv_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },  
    docteur_rdv_redirected : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.docteur_rdv_redirected', {  one: pidData.Name , two:  JSON.parse(requestData.Redirected_To).Name, three : JSON.parse(requestData.Redirected_To).Phone, four :  JSON.parse(requestData.Redirected_To).Adresse})} </div>  
                </> )
        }
    },
    //infirmier
    infirmier_rdv_saved : {
        icon:'bi-calendar2-plus text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                    <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>  
                </> )
        }
    },
    infirmier_rdv_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    infirmier_rdv_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                    <div>{ t('userProfile.notificationPage.infirmier_rdv_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    infirmier_rdv_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },  
    infirmier_rdv_redirected : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_redirected', {  one: pidData.Name , two: JSON.parse(requestData.Redirected_To).Name, three: JSON.parse(requestData.Redirected_To).Phone, four: JSON.parse(requestData.Redirected_To).Adresse })}</div>  
                </> )
        }
    },
    //pharmacie_shop
    pharmacie_shop_saved: {
        icon:'bi-cart-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.pharmacie_shop_saved', {  one: JSON.parse(requestData.Articles).length , two: pidData.Name })}</div>
                </> )
        }
    }, 
    pharmacie_shop_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    pharmacie_shop_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.pharmacie_shop_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    pharmacie_shop_livred : {
        icon:'bi-truck text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.pharmacie_shop_livred', {  one: pidData.Name , two: JSON.parse(requestData.Livre_At).Date, three: JSON.parse(requestData.Livre_At).Temps })}</div>  
             </> )
        }
    },  
    pharmacie_shop_edited : {
        icon:'bi-pencil-square text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.pharmacie_shop_edited', {  one: pidData.Name })}</div> 
                </> )
        }
    },
    //pharmacie_rdv
    pharmacie_rdv_saved: {
        icon:'bi-calendar-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.pharmacie_rdv_saved', {  one: pidData.Name , two: requestData.RDV_Cause, three: new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div> 
                </> )
        }
    },
    pharmacie_rdv_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    pharmacie_rdv_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.pharmacie_rdv_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    pharmacie_rdv_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
             </> )
        }
    },  
    //clinique
    clinique_reserver_saved: {
        icon:'bi-calendar-week text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                    <div>{ t('userProfile.notificationPage.clinique_reserver_saved', {  one: pidData.Name , two: requestData.RES_Cause, three: new Date(requestData.RES_From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) , four: new Date(requestData.RES_To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    },
    //clinique
    centre_reserver_saved: {
        icon:'bi-calendar-week text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.centre_reserver_saved', {  one: pidData.Name , two: requestData.RES_Cause, three: new Date(requestData.RES_From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) , four: new Date(requestData.RES_To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    },
    //laboratoire 
    labo_rdv_saved : {
        icon:'bi-calendar2-plus text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                    <div>{ t('userProfile.notificationPage.labo_rdv_saved', {  one: pidData.Name , two: requestData.RDV_Cause, three : new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div> 
                </> )
        }
    },
    labo_rdv_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    labo_rdv_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.labo_rdv_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    labo_rdv_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },  
    labo_rdv_pret : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.labo_rdv_pret', {  one: pidData.Name })}</div>
                </> )
        }
    },


    //garderie_inscription 
    garderie_inscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.garderie_inscription_saved', {  one: requestData.EL_Name , two: pidData.Name })}</div>
                </> )
        }
    }, 
    garderie_inscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    garderie_inscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.garderie_inscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>  
                </> )
        }
    },
    //garderie_souscription 
    garderie_souscription_saved : {
        icon:'bi-check-circle text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.garderie_souscription_saved', {  one: requestData.EL_Name , two: pidData.Name, three: new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    }, 
    garderie_souscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    garderie_souscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.garderie_souscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    //ecole_inscription 
    ecole_inscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.ecole_inscription_saved', {  one: requestData.EL_Name , two: pidData.Name })}</div>
                </> )
        }
    }, 
    ecole_inscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    ecole_inscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.ecole_inscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    //ecole_souscription 
    ecole_souscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.ecole_souscription_saved', {  one: requestData.EL_Name , two: pidData.Name, three: new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    }, 
    ecole_souscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    ecole_souscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.ecole_souscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    //lycee_inscription 
    lycee_inscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.lycee_inscription_saved', {  one: pidData.Name })}</div> 
                </> )
        }
    }, 
    lycee_inscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    lycee_inscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.lycee_inscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    //lycee_souscription 
    lycee_souscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.lycee_souscription_saved', {  one: requestData.EL_Name , two: pidData.Name, three : new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    }, 
    lycee_souscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    lycee_souscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.lycee_souscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    //universite_inscription 
    universite_inscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.universite_inscription_saved', {  one: pidData.Name })}</div> 
                </> )
        }
    }, 
    universite_inscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    universite_inscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.universite_inscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    //universite_souscription 
    universite_souscription_saved : {
        icon:'bi-check-circle text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.universite_souscription_saved', {  one: requestData.EL_Name , two: pidData.Name, three : new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )  })}</div> 
                </> )
        }
    }, 
    universite_souscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    universite_souscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.universite_souscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    //formation_inscription 
    formation_inscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.formation_inscription_saved', {  one: pidData.Name })}</div>
                </> )
        }
    }, 
    formation_inscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    formation_inscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.formation_inscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    //formation_souscription 
    formation_souscription_saved : {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.formation_souscription_saved', {  one: requestData.EL_Name , two: pidData.Name, three : new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div> 
                </> )
        }
    }, 
    formation_souscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <PharmacieAcceptShop requestData={requestData} pidData={pidData} />
        }
    }, 
    formation_souscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.formation_souscription_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },


    //transporteur 
    transporteur_request_saved: {
        icon:'bi-clipboard-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.transporteur_request_saved', {  one: JSON.parse(requestData.Articles).length , two: pidData.Name , three: JSON.parse(requestData.De).Gouv , four: JSON.parse(requestData.Vers).Gouv })} </div>  
                </> )
        }
    },
    transporteur_request_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    transporteur_request_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.transporteur_request_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    transporteur_request_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },  
    transporteur_request_livree : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.transporteur_request_livree', {  one: pidData.Name })}</div>
                </> )
        }
    },
    //autoecole 
    autoecole_inscrie_saved : {
        icon:'bi-card-heading text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.autoecole_inscrie_saved', {  one: pidData.Name , two: requestData.Genre })}</div> 
                </> )
        }
    },  
    autoecole_inscrie_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    autoecole_inscrie_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.autoecole_inscrie_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },  
    autoecole_inscrie_redirected : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.autoecole_inscrie_redirected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    //taxi 
    taxi_request_saved : {
        icon:'bi-car-front text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.taxi_request_saved', {  one: pidData.Name })}</div>
                </> )
        }
    },
    taxi_rdv_saved : {
        icon:'bi-calendar2-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.taxi_rdv_saved', {  one: new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) , two: requestData.RDV_Time })}</div>
                </> )
        }
    },
    //location 
    location_request_saved : {
        icon:'bi-clipboard-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.location_request_saved', {  one: pidData.Name , two: new Date(requestData.Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), three : new Date(requestData.Finish_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    },  
    location_request_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    },
    location_request_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.location_request_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    location_request_edited : {
        icon:'bi-pencil-square text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                  <div>{ t('userProfile.notificationPage.location_request_edited', {  one: pidData.Name })}</div>
                </> )
        }
    },
    //parking 
    parking_reserver_saved : {
        icon:'bi-stopwatch text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.parking_reserver_saved', {  one: pidData.Name , two: requestData.Depart_Time, three: requestData.Finish_Time, four : requestData.Car_Matricule, five: requestData.Car_Name })}</div>
                </> )
        }
    },
    parking_souscrire_saved : {
        icon:'bi-card-heading text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.parking_souscrire_saved', {  one: pidData.Name , two: new Date(requestData.Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), three : new Date(requestData.Finish_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), four: requestData.Car_Matricule, five: requestData.Car_Name })}</div> 
                </> )
        }
    },
    //qiosque 
    qiosque_request_saved : {
        icon:'bi-cart-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.qiosque_request_saved', {  one: pidData.Name , two: requestData.Wanted_Time })}</div>
                </> )
        }
    },
    qiosque_lavage_saved : {
        icon:'bi-calendar-event text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.qiosque_lavage_saved', { one: requestData.Wash_Genre,  two: pidData.Name , three: new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), four : requestData.Wanted_Time })}</div>
                </> )
        }
    },


    //coiffure 
    coiffure_reserver_saved : {
        icon:'bi-scissors text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                  <div>{ t('userProfile.notificationPage.coiffure_reserver_saved', {  one: pidData.Name , two: new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), three : requestData.Wanted_Time })}</div> 
                </> )
        }
    },
    coiffure_reserver_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    coiffure_reserver_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.coiffure_reserver_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    coiffure_reserver_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },
    //sallon_marriage 
    salon_marriage_reserver_saved : {
        icon:'bi-calendar2-date text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.salon_marriage_reserver_saved', {  one: pidData.Name , two: requestData.Res_Genre })}</div>
                </> )
        }
    },
    //chef 
    chef_reserver_saved : {
        icon:'bi-calendar2-date text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم  تسجيل    طلب حجز موعد مع الطباخ    {pidData.Name} بنجاح </div>  
                </> )
        }
    },
    //orchestre 
    orchestre_reserver_saved : {
        icon:'bi-calendar2-date text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم  تسجيل    طلب حجز موعد مع الفرقة الموسيقية    {pidData.Name} بنجاح </div>  
                </> )
        }
    },
    //photographe 
    photographe_reserver_saved : {
        icon:'bi-calendar2-date text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم  تسجيل    طلب حجز موعد مع المصور    {pidData.Name} بنجاح </div>  
                </> )
        }
    },
    //fourniture_marriage 
    fourniture_marriage_location_saved : {
        icon:'bi-calendar2-date text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم  تسجيل    طلب كراء مستلزمات أفراح من    {pidData.Name}  بنجاح</div>  
                </> )
        }
    },


    //magazin 
    magazin_commande_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء مواد غذائية  من  متجر   {pidData.Name} </div>  
             </> )
        }

    },
    //boulengerie 
    boulangerie_shop_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء خبز  من  مخبزة   {pidData.Name} </div>  
             </> )
        }

    },
    //boucherie 
    boucheries_shop_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء لحوم  من  مجزرة   {pidData.Name} </div>  
             </> )
        }

    },
    //fruiterie 
    fruiterie_shop_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء خضر وغلال   من  متجر   {pidData.Name} </div>  
             </> )
        }

    },
    //patisserie 
    patisserie_shop_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء مرطبات   من  نقطة بيع المرطبات   {pidData.Name} </div>  
             </> )
        }

    },
    //epicerie 
    epicerie_shop_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء  من  بقالة   {pidData.Name} </div>  
             </> )
        }

    },
    //quicaillerie 
    quincaillerie_shop_saved : {
        icon:'bi-wrench text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء أدوات  من  محل المعدات    {pidData.Name} </div>  
             </> )
        }

    },
    //boutique 
    boutique_shop_saved : {
        icon:'bi-bag-heart text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء ملابس   من  متجر   {pidData.Name} </div>  
             </> )
        }

    },
    //bijouterie 
    bijouterie_shop_saved : {
        icon:'bi-gem text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء مجوهرات  من  متجر   {pidData.Name} </div>  
             </> )
        }

    },
    //librairie 
    librairie_shop_saved: {
        icon:'bi-basket text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم تسجيل طلب  شراء أدوات مدرسية من مكتبة  {pidData.Name} </div>  
                </> )
        }
    },
    //electromenager 
    electromenager_shop_saved: {
        icon:'bi-cart4 text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم تسجيل طلب  شراء آلات كهرومنزلية   من  متجر   {pidData.Name} </div>  
                </> )
        }
    },
    //meuble 
    meubles_shop_saved: {
        icon:'bi-cart4 text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم تسجيل طلب  شراء أثاث   من  متجر   {pidData.Name} </div>  
                </> )
        }
    },
    //depot 
    depot_commande_saved : {
        icon:'bi-cart4 text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب  شراء من  متجر   {pidData.Name} </div>  
             </> )
        }

    },


    //avocat 
    avocat_souscrire_saved : {
        icon:'bi-pencil-square text-info',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب موعد مع المحامي {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
             </> )
        }

    },
    avocat_souscrire_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    avocat_souscrire_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    avocat_souscrire_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },  
    avocat_souscrire_redirected : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم توجيه طلب موعد مع الطبيب {pidData.Name}   إلي الطبيب {JSON.parse(requestData.Redirected_To).Name}  ( الهاتف :  {JSON.parse(requestData.Redirected_To).Phone} , العنوان : {JSON.parse(requestData.Redirected_To).Adresse} ) </div>  
                </> )
        }
    },
    avocat_souscrire_informer : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    //avocat_rdv
    avocat_rdv_saved : {
        icon:'bi-folder-check text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب موعد مع المحامي {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
             </> )
        }

    },
    avocat_rdv_saved_2 : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم تسجيل طلب موعد مع المحامي {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
                </> )
        }
    },


    //gym 
    gym_souscription_saved : {
        icon:'bi-person-vcard text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.gym_souscription_saved', {  one: requestData.Ab_Genre , two: pidData.Name })}</div>
             </> )}

    },
    gym_souscription_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    gym_souscription_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    //pyscine 
    pyscine_reserver_saved : {
        icon:'bi-stopwatch text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الحجز  في المسبح   {pidData.Name} يوم {new Date(requestData.RES_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}   من {requestData.RES_From_Time} إلي {requestData.RES_To_Time} بنجاح  .   </div>  
             </> )}

    },
    pyscine_souscrire_saved : {
        icon:'bi-person-vcard text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الإشتراك  ({requestData.Ab_Genre}) في الملعب الرياضي   {pidData.Name}  بنجاح  .   </div>  
             </> )}

    },
    //stade 
    stade_reserver_saved : {
        icon:'bi-stopwatch text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الحجز  في الملعب الرياضي   {pidData.Name} يوم {new Date(requestData.RES_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}   من {requestData.RES_From_Time} إلي {requestData.RES_To_Time} بنجاح  .   </div>  
             </> )}

    },
    stade_souscrire_saved : {
        icon:'bi-person-vcard text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الإشتراك  ({requestData.Ab_Genre}) في الملعب الرياضي   {pidData.Name}  بنجاح  .    </div>  
             </> )}

    },
    //cinema 
    cinema_reserver_saved : {
        icon:'bi-calendar-week text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب حجز  في قاعة السنما  {pidData.Name} لمشاهدة فلم {requestData.Movie_Name}  بنجاح  .  </div>  
             </> )}

    },
    //theatre 
    theatre_reserver_saved : {
        icon:'bi-calendar-week text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب حجز  في مسرح  {pidData.Name} لمشاهدة مسرحية {requestData.Movie_Name}  بنجاح  .  </div> 
             </> )}

    },
    //avis 
    art_avis_saved : {
        icon:'bi-card-checklist text-success',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الإشتراك  {requestData.Ab_Genre} في قاعة الرياضة   {pidData.Name}  بنجاح  . تم تسجيل الإنطلاق ليوم  {new Date(requestData.Start_At).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}  </div>  
             </> )}

    },
    //musee 
    musee_reserver_saved : {
        icon:'bi-ticket-detailed text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الحجز  في متحف   {pidData.Name} يوم {new Date(requestData.Wanted_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}   من {requestData.Wanted_Time_From} إلي {requestData.Wanted_Time_To} بنجاح  .   </div>  
             </> )}

    },


    //hotels_reserver 
    hotels_reserver_saved : {
        icon:'bi-card-checklist text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                 <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                 <div>تم تسجيل طلب حجز  {requestData.Ab_Genre}  في نزل  {pidData.Name} للفترة بين { new Date(requestData.From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) } و { new Date(requestData.To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} بنجاح  .   </div>  
             </> )}

    },
    hotels_reserver_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    hotels_reserver_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    //hotels_service
    hotels_service_saved : {
        icon:'bi-card-checklist text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.infirmier_rdv_saved', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                <div>تم تسجيل طلب الحجز في نزل  {requestData.Ab_Genre} في قاعة الرياضة   {pidData.Name}  بنجاح  . تم تسجيل الإنطلاق ليوم  {new Date(requestData.Start_At).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}  </div>  
             </> )}

    },
    hotels_service_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    hotels_service_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.hotels_service_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div> 
                </> )
        }
    },
    //agence 
    agence_service_saved : {
        icon:'bi-card-checklist text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                 <div>{ t('userProfile.notificationPage.agence_service_saved', {  one: requestData.Coutry , two: pidData.Name })}</div>
             </> )}

    },
    //restaurant_commande 
    restaurant_commande_saved: {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.restaurant_commande_saved', {  one: pidData.Name , two: requestData.Table_Num == 0 ? '' : `في الطاولة عدد ${requestData.Table_Num}` })}</div> 
                </> )
        }
    }, 
    restaurant_commande_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    },
    restaurant_commande_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.restaurant_commande_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    //restaurant_reservation
    restaurant_reservation_saved: {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.restaurant_reservation_saved', {  one: pidData.Name , two: new Date(requestData.Wanted_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    }, 
    restaurant_reservation_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    },
    restaurant_reservation_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.restaurant_reservation_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    restaurant_reservation_edited : {
        icon:'bi-pencil-square text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.restaurant_reservation_edited', {  one: pidData.Name })}</div> 
                </> )
        }
    },
    //cafe 
    cafe_commande_saved: {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.cafe_commande_saved', {  one: pidData.Name , two: requestData.Table_Num == 0 ? '' : `في الطاولة عدد ${requestData.Table_Num}` })}</div>
                </> )
        }
    }, 
    cafe_reservation_saved: {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.cafe_reservation_saved', {  one: pidData.Name , two: new Date(requestData.Wanted_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    }, 

    //courtier 
    courtier_request_saved : {
        icon:'bi-house-heart text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.courtier_request_saved', {  one: requestData.Req_Genre , two: requestData.Immob_Genre, three: pidData.Name })}</div>
                </> )
        }
    },
    courtier_torent_saved : {
        icon:'bi-house-heart text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.courtier_torent_saved', {  one: requestData.Immob_Genre.Name , two: requestData.Req_Genre, three: pidData.Name})}</div>
                </> )
        }
    },
    //contracteur 
    contracteur_service_saved : {
        icon:'bi-cone-striped text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.contracteur_service_saved', {  two: pidData.Name , one: requestData.Immob_Genre })}</div>  
                </> )
        }
    },
    //architecte 
    architecture_service_saved : {
        icon:'bi-map text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.architecture_service_saved', {  one: requestData.Immob_Genre , two: pidData.Name })}</div>
                </> )
        }
    },

    //comptable 
    comptable_service_saved : {
        icon:'bi-clipboard-data text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.comptable_service_saved', {  one: requestData.Request_Cause , two: new Date(requestData.From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), three: new Date(requestData.To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ), four: pidData.Name})}</div> 
             </> )
        }

    },

    //veterinaire
    veterinaire_rdv_saved : {
        icon:'bi-calendar2-plus text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.veterinaire_rdv_saved', {  one: pidData.Name , two: new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' ) })}</div>
                </> )
        }
    },
    veterinaire_rdv_accepted : {
        icon:'bi-calendar-check text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorAcceptRdv requestData={requestData} pidData={pidData} />
        }
    }, 
    veterinaire_rdv_rejected : {
        icon:'bi-calendar-x text-danger',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.veterinaire_rdv_rejected', {  one: pidData.Name , two: requestData.Refuser_Cause })}</div>
                </> )
        }
    },
    veterinaire_rdv_retarted : {
        icon:'bi-arrow-clockwise text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            return <DoctorReatartedRdv requestData={requestData} pidData={pidData} />
        }
    },  
    veterinaire_rdv_redirected : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>{ t('userProfile.notificationPage.veterinaire_rdv_redirected', {  one: pidData.Name , two: JSON.parse(requestData.Redirected_To).Name, three: JSON.parse(requestData.Redirected_To).Phone , four: JSON.parse(requestData.Redirected_To).Adresse})}</div>
                </> )
        }
    },
    //fourragerie 
    fourragerie_shop_saved : {
        icon:'bi-wrench text-success',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>{ t('userProfile.notificationPage.fourragerie_shop_saved', {  one: pidData.Name })}</div>     
             </> )
        }

    },


}
export default NotifGenres