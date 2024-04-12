import React, { useEffect} from 'react';
import { Bounce } from 'react-reveal';
import { NavLink } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { Tab } from 'semantic-ui-react'
import GConf from '../AssetsM/generalConf';
import { useTranslation, Trans } from 'react-i18next';
import detectRTL from 'rtl-detect';

function setPageSize() {
    const style = document.createElement('style');
    style.innerHTML = `@page {size: landscape}`;
    style.id = 'page-orientation';
    document.head.appendChild(style);
}

function ToolsLandingPage() {
    /*#########################[Const]###########################*/
    const { t, i18n } = useTranslation();
    const isRTL = detectRTL.isRtlLang(i18n.language);
    const panes = [
        {
            menuItem: { key: 'edfit', icon: 'shield', content:  <span className='me-2'>تطبيقات</span> , dir:'rtl',  className:'rounded-pill border-tabs' },
          render: () => <AppsCard />,
        },
        {
          menuItem: { key: 'edit', icon: 'book', content:  <span className='me-2'>المدونات</span> , dir:'rtl',  className:'rounded-pill border-tabs' },
          render: () => <Encyclipedia />,
        },
        // {
        //     menuItem: { key: 'edith', icon: 'wrench', content:  <span className='me-2'>أدوات</span> , dir:'rtl',  className:'rounded-pill border-tabs' },
        //   render: () => <ToolsCard />,
        // },

      ]

    /*#########################[UseEffect]###########################*/
    useEffect(() => {
        setPageSize();
        window.scrollTo(0, 0);
    }, [])

    /*#########################[Function]###########################*/
    
    /*#########################[Card]###########################*/
    const TopNavBar = () =>{
        const UserCard = () =>{
            return(<>
                <NavLink exact='true' to='/Profile' className="navbar-brand border-div m-0 p-0 ms-3">
                    <img  className="rounded-circle p-0 m-0 me-1" src={`https://cdn.abyedh.tn/images/p_pic/${GConf.UserData.UData.PictureId}.gif`}   alt="Logo" style={{width:'30px', height:'30px'}} />
                </NavLink>
            </>)
        }
        return(<>
                <nav className="p-2 fixed-top navshad" style={{backgroundColor: 'white'}}>
                    <div className='row'>
                        <div className='col-6 text-start align-self-center'>
                            <NavLink exact='true' to='/' className="m-0 p-0 ms-3">
                                <img  className="border-div-s d-none d-lg-inline border bg-danger" src="https://cdn.abyedh.tn/images/logo/mlogo.gif"   alt="Logo" style={{width:'20px', height:'40px', borderRadius: '10px 20px 10px 50px'}} />
                                <div  className="d-lg-none d-inline-block text-secondary p-1"  > <span className='bi bi-arrow-left-short bi-md ' ></span> </div>
                            </NavLink>
                        </div>
                        <div className='col-6 text-end align-self-center'>
                            {GConf.UserData.Logged ? <UserCard />  : <NavLink exact='true' to='/Profile' className="m-0 p-0 me-3 text-white"> تَسْجِيلْ الدٌخٌولْ</NavLink>}
                        </div>
                    </div>
                </nav>
            </>)
    }

    const ButtomCard = () =>{
        return(<>
            <div className='card-body rounded-bottom-card footered-card' style={{backgroundColor:'#46d5e8', bottom:'0px !important', position:'relative'}}>
                <div className='text-end text-white me-5'>
                    <b>منصة أبيض التونسية </b>
                </div>
            </div>
        </>)
    }
    const AdsLanding = () =>{
        return(<>
        <div className='card-body   rounded-0' style={{height:'170px',   marginTop:'70px'}}>
            <div className='row'>
                <div className='col-12 col-lg-8 align-self-center text-center'>
                       <h3 className='' dir={isRTL ? 'rtl' : 'ltr'} style={{color:'#46d5e8'}}>{t('toolsApps.toolsPage.mainTitle')}</h3>
                       <h6 className='text-secondary d-none d-lg-block'>{t('toolsApps.toolsPage.subtitle')}</h6> 
                </div>
                <div className='col-4 align-self-end text-center d-none d-lg-block'>
                    <img src='https://cdn.abyedh.tn/images/Tools/ads.svg' className='img-responsive' width='40%' height='40%'  />
                </div>
                <div className='col-12 align-self-end text-center d-lg-none mt-4'>
                    <img src='https://cdn.abyedh.tn/images/Tools/ads.svg' className='img-responsive' width='40%' height='40%'  />
                </div>
            </div> 
        </div>
        </>)
    }

    const LinkCard = (props) =>{
        return(<>
            <NavLink exact='true' to={`/Tools/${props.link}`} >
                <div className='card p-0 shadow-sm mb-3 text-center border-div  '>
                   <div className='mb-2'><img src={`https://cdn.abyedh.tn/images/Tools/${props.img}`} className='img-responsive ' width='60px' height='60px' /></div>    
                </div>
                <div className='mb-2 text-center text-secondary'><h6><b>{props.name}</b></h6></div> 
            </NavLink> 
        </>)
    }
    const InlineLinkCard = (props) =>{
        return(<>
            <NavLink exact='true' to={`/Tools/${props.link}`} >
                <div className={`card p-0 shadow-sm mb-3 text-center border-div  ${isRTL ? 'ms-3' : 'me-3'}`}>
                   <div className='mb-2'><img src={`https://cdn.abyedh.tn/images/Tools/${props.img}`} className='img-responsive ' width='60px' height='60px' /></div>    
                </div>
                <div className='mb-2 text-center text-secondary'><h6><b>{props.name}</b></h6></div> 
            </NavLink> 
        </>)
    }
    const Encyclipedia = () =>{
        return(<>
            <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Blog' name='الإدارية' img='blog.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Products' name='  المنتجات ' img='products.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name='  القانونية ' img='politics.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Sport' name='الرياضية  ' img='sport.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name=' الإقتصادية ' img='finance.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name=' السياحية ' img='images.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name=' الصحافية ' img='journal.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Art' name=' الثقافية ' img='art.svg' /></div> 
            </div> 
        </>)
    }
    const ToolsCard = () =>{
        return(<>
            <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                <div className='col-4 col-lg-2 mb-3 '><LinkCard link='Data' name=' إحصائيات' img='data.svg' /></div>
                {/* <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name=' يومية ' img='calendar.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name=' المنتدي ' img='forum.svg' /></div> */}
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='News' name=' الإخبار ' img='news.svg' /></div>
            </div> 
        </>)
    }
    const AppsCard = () =>{
        return(<>
            <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Taxi' name='تاكسي' img='taxi.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Louage' name='سيارة اجرة' img='louage.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Public' name=' النقل ' img='public.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='Renting' name=' للكراء' img='rent_house.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='#' name='أدات فلاحية' img='nature.svg' /></div>
                <div className='col-4 col-lg-2 mb-3'><LinkCard link='News' name=' الإخبار ' img='news.svg' /></div>
                {/* <div className='col-4 col-lg-2 mb-3 '><LinkCard link='Data' name=' إحصائيات' img='data.svg' /></div> */}
                {/* <div className='col-4 col-lg-1 mb-3'><LinkCard link='#' name=' إستدعاءات' img='invitation.svg' /></div> */}
                <div className='col-4 col-lg-1 mb-3'><LinkCard link='#' name=' الدور التونسي' img='sport.svg' /></div>
                <div className='col-4 col-lg-1 mb-3'><LinkCard link='#' name='salaire' img='salaire.svg' /></div> 
                <div className='col-4 col-lg-1 mb-3'><LinkCard link='#' name='خدمني' img='jobs.svg' /></div> 
                <div className='col-4 col-lg-1 mb-3'><LinkCard link='#' name='حكايات' img='stories.svg' /></div> 
                <div className='col-4 col-lg-1 mb-3'><LinkCard link='#' name='كمبي' img='camping.svg' /></div> 
                
            </div> 
        </>)
    }

    return ( <>
            <TopNavBar />
            <AdsLanding />
            <br />
            <br />
            <br />
            <br />
            <div className='container'>
                {/* <Tab dir={isRTL ? 'rtl' : 'ltr'} menu={{ secondary: true, style: {overflowX : 'auto', justifyContent: 'right',  overflowY : 'hidden', paddingBottom:'5px'} }} panes={panes} /> */}
                {/* <h5 dir={isRTL ? 'rtl' : 'ltr'}>موسوعات </h5> */}
                <div className="mt-1 p-1 mb-4 d-flex d-none" dir={isRTL ? 'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        <div className='col-4 col-lg-2 mb-3'><InlineLinkCard link='Blog' name='الموسوعة الإدارية' img='blog.svg' /></div>
                        <div className='col-4 col-lg-2 mb-3'><InlineLinkCard link='Products' name='  كاتالوج ' img='products.svg' /></div>
                        <div className='col-4 col-lg-2 mb-3'><InlineLinkCard link='Sport' name='الرياضية  ' img='sport.svg' /></div>
                        <div className='col-4 col-lg-2 mb-3'><InlineLinkCard link='Art' name=' عين علي الثقافة ' img='art.svg' /></div>
                        <div className='col-4 col-lg-2 mb-3'><InlineLinkCard link='Touristique' name=' إكتشف تونس ' img='images.svg' /></div>
                        <div className='col-4 col-lg-2 mb-3'><InlineLinkCard link='Jurdique' name='  القانونية ' img='politics.svg' /></div>
                </div> 
                <h5 dir={isRTL ? 'rtl' : 'ltr'}> {t('toolsApps.toolsPage.transportTitle')}</h5>
                <div className="mt-1 p-1 mb-4 d-flex" dir={isRTL ? 'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='Taxi' name={t('toolsApps.toolsPage.appNames.taxiApp')} img='taxi.svg' /></div>
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='Louage' name={t('toolsApps.toolsPage.appNames.louageApp')} img='louage.svg' /></div>
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='Public' name={t('toolsApps.toolsPage.appNames.transportApp')} img='public.svg' /></div>
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='Automobile' name={t('toolsApps.toolsPage.appNames.automobileApp')} img='automobile.svg' /></div>
                </div> 

                <h5 dir={isRTL ? 'rtl' : 'ltr'}> {t('toolsApps.toolsPage.educationTitle')} </h5>
                <div className="mt-1 p-1 mb-4 d-flex" dir={isRTL ? 'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='Etude' name={t('toolsApps.toolsPage.appNames.etudeApp')} img='etude.svg' /></div>
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='ProgramScolair' name={t('toolsApps.toolsPage.appNames.programAnuueliApp')} img='prog_annu.svg' /></div>
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='LivreScolair' name={t('toolsApps.toolsPage.appNames.livreScolaireApp')} img='livre_scolaire.svg' /></div>
                        <div className='col-5 col-lg-2 mb-3'><InlineLinkCard link='Devoirat' name={t('toolsApps.toolsPage.appNames.examainApp')} img='devoire.svg' /></div>
                </div> 

                {/* <h5 dir={isRTL ? 'rtl' : 'ltr'}> تطبيقات  المجال الصحي  </h5>
                <div className="mt-1 p-1 mb-4 d-flex" dir={isRTL ? 'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        <div className='col-12 col-lg-2 mb-3'><InlineLinkCard link='Products' name='معجم الأدوية' img='medicamment.svg' /></div>
                </div> */}

                <h5 dir={isRTL ? 'rtl' : 'ltr'}> {t('toolsApps.toolsPage.financeTite')} </h5>
                <div className="mt-1 p-1 mb-4 d-flex" dir={isRTL ? 'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        <div className='col-7 col-lg-2 mb-3'><InlineLinkCard link='Jobs' name={t('toolsApps.toolsPage.appNames.findworkApp')} img='jobs.svg' /></div>
                        <div className='col-7 col-lg-2 mb-3'><InlineLinkCard link='Salaire' name={t('toolsApps.toolsPage.appNames.salaireApp')} img='salaire.svg' /></div>
                </div>

                <h5 dir={isRTL ? 'rtl' : 'ltr'}> {t('toolsApps.toolsPage.constructionTitle')} </h5>
                <div className="mt-1 p-1 mb-4 d-flex" dir={isRTL ? 'rtl' : 'ltr'}  style={{width:'100%', overflowX: 'auto', overflowY : 'hidden', whiteSpace:'nowrap'}}> 
                        <div className='col-12 col-lg-2 mb-3'><InlineLinkCard link='Renting' name={t('toolsApps.toolsPage.appNames.locationApp')} img='rent_house.svg' /></div>
                </div>

                <h5 dir={isRTL ? 'rtl' : 'ltr'}> {t('toolsApps.toolsPage.otherTitle')} </h5>
                <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='News' name={t('toolsApps.toolsPage.appNames.newsApp')} img='news.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Forum' name={t('toolsApps.toolsPage.appNames.forumApp')} img='forum.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Data' name={t('toolsApps.toolsPage.appNames.statApp')} img='data.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Blog' name={t('toolsApps.toolsPage.appNames.adminBlogApp')} img='blog.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Products' name={t('toolsApps.toolsPage.appNames.catalogueApp')} img='products.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Sport' name={t('toolsApps.toolsPage.appNames.sportApp')} img='sport.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Art' name={t('toolsApps.toolsPage.appNames.cultureApp')} img='art.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Touristique' name={t('toolsApps.toolsPage.appNames.tourizmeApp')} img='images.svg' /></div>
                        {/* <div className='col-4 col-lg-2 mb-3'><LinkCard link='Calendrier' name=' يومية ' img='calendar.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='AgriTools' name='أدات فلاحية' img='nature.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Camping' name='كمبي' img='camping.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Story' name='حكايات' img='stories.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Invitation' name=' إستدعاءات' img='invitation.svg' /></div> */}
                </div>
                {/* <div className='row' dir={isRTL ? 'rtl' : 'ltr'}>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Taxi' name='تاكسي' img='taxi.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Louage' name='سيارة اجرة' img='louage.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Public' name=' النقل ' img='public.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Renting' name=' للكراء' img='rent_house.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='AgriTools' name='أدات فلاحية' img='nature.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='News' name=' الإخبار ' img='news.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Salaire' name='salaire' img='salaire.svg' /></div> 
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Jobs' name='خدمني' img='jobs.svg' /></div> 
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Story' name='حكايات' img='stories.svg' /></div> 
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Camping' name='كمبي' img='camping.svg' /></div> 
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Blog' name='الإدارية' img='blog.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Products' name='  المنتجات ' img='products.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Jurdique' name='  القانونية ' img='politics.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Sport' name='الرياضية  ' img='sport.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Economique' name=' الإقتصادية ' img='finance.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Touristique' name=' السياحية ' img='images.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Art' name=' الثقافية ' img='art.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='ProgramScolair' name='البرنامج السنوي ' img='prog_annu.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='LivreScolair' name='الكتاب المدرسي ' img='livre_scolaire.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Devoirat' name='إمتحانات ' img='devoire.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Data' name=' إحصائيات' img='data.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Calendrier' name=' يومية ' img='calendar.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Forum' name=' المنتدي ' img='forum.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Invitation' name=' إستدعاءات' img='invitation.svg' /></div>
                    <div className='col-4 col-lg-2 mb-3'><LinkCard link='Automobile' name=' كرهبة' img='automobile.svg' /></div>
                 </div>  */}

            </div>
            <ButtomCard />
        </> );
}

export default ToolsLandingPage;