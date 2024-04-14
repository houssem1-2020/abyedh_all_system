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
                   {/* <div dir='ltr'> {t('userProfile.notificationPage.docteur_rdv_saved.one')} {pidData.Name}  {t('userProfile.notificationPage.docteur_rdv_saved.two')} {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>   */}
                   {/* <div>تم تسجيل طلب موعد مع الطبيب {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>   */}
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
                   {/* <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>   */}
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
                   {/* <div>تم توجيه طلب موعد مع الطبيب {pidData.Name}   إلي الطبيب {JSON.parse(requestData.Redirected_To).Name}  ( الهاتف :  {JSON.parse(requestData.Redirected_To).Phone} , العنوان : {JSON.parse(requestData.Redirected_To).Adresse} ) </div>   */}
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
                   <div>تم تسجيل طلب موعد مع الطبيب {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم توجيه طلب موعد مع الطبيب {pidData.Name}   إلي الطبيب {JSON.parse(requestData.Redirected_To).Name}  ( الهاتف :  {JSON.parse(requestData.Redirected_To).Phone} , العنوان : {JSON.parse(requestData.Redirected_To).Adresse} ) </div>  
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
                   <div>تم تسجيل طلب شراء أدوية ({JSON.parse(requestData.Articles).length} منتجات) من صيدلية  {pidData.Name} </div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    pharmacie_shop_livred : {
        icon:'bi-truck text-info',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                <div>تم إرسال الطلب من صيدلية  {pidData.Name} <br /> <small> سيضلك الطلب يوم {JSON.parse(requestData.Livre_At).Date} مع الساعة {JSON.parse(requestData.Livre_At).Temps}</small></div>  
             </> )
        }
    },  
    pharmacie_shop_edited : {
        icon:'bi-pencil-square text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم  تعديل طلب الشراء من الصيدلة  {pidData.Name}    </div>  
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
                   <div>تم تسجيل طلب موعد مع صيدلية {pidData.Name}   من أجل : {requestData.RDV_Cause} بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                    <div>تم تسجيل طلب حجز في مصحة {pidData.Name}   من أجل : {requestData.RES_Cause} بنجاح  و ذلك بين {new Date(requestData.RES_From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} و {new Date(requestData.RES_To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم تسجيل طلب حجز في مركز {pidData.Name}   من أجل : {requestData.RES_Cause}  و ذلك بين {new Date(requestData.RES_From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} و {new Date(requestData.RES_To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                    <div>تم تسجيل طلب موعد مع مخبر {pidData.Name}   من أجل : {requestData.RDV_Cause} بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div> نتيجة التحليل في مخبر  {pidData.Name} جاهزة :   </div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في روضة :   {pidData.Name}  بنجاح  </div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في روضة  {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في روضة :   {pidData.Name}  بنجاح  </div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في المدرسة الخاصة  {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل طلب الترسيم في مركز التكوين الخاص  {pidData.Name}  بنجاح  </div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في روضة  {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل طلب الترسيم في مركز الجامعة الخاصة  {pidData.Name}  بنجاح  </div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في روضة  {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل طلب الترسيم في مركز التكوين الخاص  {pidData.Name}  بنجاح  </div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل صغيرك {requestData.EL_Name} في روضة  {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.R_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب   طلب شراء الأدوية من صيدلية      {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   {/* <div>تم تسجيل طلب نقل البضائع ({JSON.parse(requestData.Articles).length} منتجات ) مع وكالة النقل  {pidData.Name}  من : {JSON.parse(requestData.De).Gouv} إلي : {JSON.parse(requestData.Vers).Gouv} </div>   */}
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div> نتيجة التحليل في مخبر  {pidData.Name} جاهزة :   </div>  
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
                   <div>تم السجيل في مدرسة تعليم السياقة   :  {pidData.Name} للحصول علي رخصة قيادة من صنف {requestData.Genre}  </div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },  
    autoecole_inscrie_redirected : {
        icon:'bi-arrow-90deg-right text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم توجيه طلب موعد مع الطبيب {pidData.Name}   إلي الطبيب {JSON.parse(requestData.Redirected_To).Name}  ( الهاتف :  {JSON.parse(requestData.Redirected_To).Phone} , العنوان : {JSON.parse(requestData.Redirected_To).Adresse} ) </div>  
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
                   <div>تم تسجيل طلب تاكسي   </div>  
                </> )
        }
    },
    taxi_rdv_saved : {
        icon:'bi-calendar2-check text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم تسجيل طلب موعد مع تاكسي يوم {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} علي الساعة {requestData.RDV_Time}    </div>  
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
                   <div>تم طلب  كراء وسيلة نقل  من وكالة كراء السيارات  {pidData.Name}  من {new Date(requestData.Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} إلي  {new Date(requestData.Finish_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} </div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    location_request_edited : {
        icon:'bi-pencil-square text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم  تعديل طلب الشراء من الصيدلة  {pidData.Name}    </div>  
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
                   <div>تم  تسجيل  حجز في موقف :  {pidData.Name} من {requestData.Depart_Time} إلي {requestData.Finish_Time} للشاحنة  ({requestData.Car_Matricule}) : {requestData.Car_Name} </div>  
                </> )
        }
    },
    parking_souscrire_saved : {
        icon:'bi-card-heading text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم  تسجيل  الأشتراك في موقف :  {pidData.Name} من {new Date(requestData.Depart_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} إلي {new Date(requestData.Finish_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}  للشاحنة  ({requestData.Car_Matricule}) : {requestData.Car_Name}</div>  
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
                   <div>تم  تسجيل طلب شراء وقود  من محطة       :  {pidData.Name}  . تم تسجيل موعد الحضور مع الساعة : {requestData.Wanted_Time} </div>  
                </> )
        }
    },
    qiosque_lavage_saved : {
        icon:'bi-calendar-event text-success',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم  تسجيل طلب موعد {requestData.Wash_Genre} من  {pidData.Name} يوم {new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} علي الساعة {requestData.Wanted_Time}</div>  
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
                   <div>تم  تسجيل    طلب حجز في قاعة الحلاقة   {pidData.Name} يوم {new Date(requestData.Wanted_Day).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} علي الساعة {requestData.Wanted_Time}</div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم  تسجيل    طلب حجز في قاعة الأفراح   {pidData.Name} بسبب  {requestData.Res_Genre} بنجاح </div>  
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
                {/* <div>تم تسجيل طلب الإشتراك  ({requestData.Ab_Genre}) في قاعة الرياضة   {pidData.Name}  بنجاح  .   </div>   */}
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
                <div>تم تسجيل طلب الحجز  في المسبح   {pidData.Name} يوم {new Date(requestData.RES_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}   من {requestData.RES_From_Time} إلي {requestData.RES_To_Time} بنجاح  .   </div>  
             </> )}

    },
    pyscine_souscrire_saved : {
        icon:'bi-person-vcard text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
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
                <div>تم تسجيل طلب الحجز  في الملعب الرياضي   {pidData.Name} يوم {new Date(requestData.RES_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}   من {requestData.RES_From_Time} إلي {requestData.RES_To_Time} بنجاح  .   </div>  
             </> )}

    },
    stade_souscrire_saved : {
        icon:'bi-person-vcard text-warning',
        titleIcon:'receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                 <div>تم تسجيل طلب سفر إلي   {requestData.Coutry} مع وكالة الاسفار   {pidData.Name}  بنجاح  .  </div>  
             </> )}

    },
    //restaurant_commande 
    restaurant_commande_saved: {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div> تم تسجيل طلب طبق من مطعم {pidData.Name}   {requestData.Table_Num == 0 ? '' : `في الطاولة عدد ${requestData.Table_Num}`}    بنجاح </div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم تسجيل طلب  الحجز في مطعم    {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.Wanted_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
                </> )
        }
    },
    restaurant_reservation_edited : {
        icon:'bi-pencil-square text-secondary',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم  تعديل طلب الشراء من الصيدلة  {pidData.Name}    </div>  
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
                   <div> تم تسجيل طلب مشروب من مقهي {pidData.Name}   {requestData.Table_Num == 0 ? '' : `في الطاولة عدد ${requestData.Table_Num}`}    بنجاح </div>  
                </> )
        }
    }, 
    cafe_reservation_saved: {
        icon:'bi-check-circle text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم تسجيل طلب  الحجز في مقهي    {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.Wanted_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم تسجيل طلب {requestData.Req_Genre} {requestData.Immob_Genre} من الوسيط     {pidData.Name}  </div>  
                </> )
        }
    },
    courtier_torent_saved : {
        icon:'bi-house-heart text-warning',
        titleIcon:'bi-receipt-cutoff',
        GenTextFunction : function(requestData,pidData){
            const { t, i18n } = useTranslation();
            return (<>
                   <div>تم تسجيل    {requestData.Immob_Genre} {requestData.Req_Genre} مع الوسيط     {pidData.Name}  </div>  
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
                   <div>تم تسجيل طلب بناء     {requestData.Immob_Genre}  من المقاول     {pidData.Name} بنجاح </div>  
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
                   <div>تم تسجيل طلب تصميم     {requestData.Immob_Genre}  من المهندس المعماري     {pidData.Name} بنجاح </div>  
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
                <div>تم تسجيل طلب {requestData.Request_Cause}   للفترة ما بين  {new Date(requestData.From_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} و {new Date(requestData.To_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )} من المحاسب  {pidData.Name} بنجاح</div>  
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
                   <div>تم تسجيل طلب موعد مع البيطري {pidData.Name}  بنجاح  و ذلك بتاريخ {new Date(requestData.RDV_Date).toLocaleDateString('fr-FR').split( '/' ).reverse( ).join( '-' )}</div>  
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
                   <div>تم رفض طلب الموعد مع الطبيب {pidData.Name} <br /> <small>"{requestData.Refuser_Cause}"</small></div>  
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
                   <div>تم توجيه طلب موعد مع الطبيب {pidData.Name}   إلي الطبيب {JSON.parse(requestData.Redirected_To).Name}  ( الهاتف :  {JSON.parse(requestData.Redirected_To).Phone} , العنوان : {JSON.parse(requestData.Redirected_To).Adresse} ) </div>  
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
                <div>تم تسجيل طلب  شراء أدوات  من  محل   {pidData.Name} </div>  
             </> )
        }

    },


}
export default NotifGenres