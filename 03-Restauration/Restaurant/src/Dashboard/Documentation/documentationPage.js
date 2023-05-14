import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Modal, Tab } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';

function DocumentationPage() {
    /*############################ CONST #############################*/
    const [modalS, setModalS] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const panes = [
        { 
            menuItem: { key: '00', icon: 'calendar alternate', content: 'Commandes'},  
            render: () => <Tab.Pane className='border-div mb-4'><CommandesCard /></Tab.Pane> 
        },
        { 
            menuItem: { key: '01', icon: 'list', content: 'Menu'}, 
            render: () => <Tab.Pane className='border-div mb-4'><MenuCard /></Tab.Pane> },
        { 
            menuItem: { key: '02', icon: 'desktop', content: 'Caisse'}, 
            render: () => <Tab.Pane className='border-div mb-4'><CaisseCard /></Tab.Pane> 
        },
        { 
            menuItem: { key: '03', icon: 'file alternate', content:'Factures'},
            render: () => <Tab.Pane className='border-div mb-4'><FacturesCard /></Tab.Pane> 
        },
        { 
            menuItem: { key: '04', icon: 'user', content: 'Clients'}, 
            render: () => <Tab.Pane className='border-div mb-4'><ClientCard /></Tab.Pane> 
        },
        { 
            menuItem: { key: '05', icon: 'user', content: 'Equipe'},
            render: () => <Tab.Pane className='border-div'><EquipeCard /></Tab.Pane> 
        },
      ]

    /*############################ USEEFFECT #########################*/

    /*############################ FUNCTION ##########################*/

    /*############################ CARD ##############################*/
        const MenuItemCard = (props) =>{
        return(<>
            <div className={`card p-2 rounded-0 mb-1 btn ${ activeIndex == props.activeI ? 'activeDocItem ': '' }`} onClick={ () => setActiveIndex(props.activeI)}>
                <div className='row'>
                    <div className='col-8 text-end align-self-center'><h5>{props.text}</h5></div> 
                    <div className='col-4 system-color'><span className={`bi bi-${props.icon} bi-xsm`}></span></div> 
                </div>
            </div>
        </>)
        }

        const TabCard = (props) =>{
        return(<>
            <span className=' ms-2 me-2 border-bottom border-dark border-2'>{props.text}</span>
        </>)
        }
        const NavCard = (props) =>{
        return(<>
            <span className='ms-2 me-2 abyedh-list-a p-2' > {props.text} <span className={`bi bi-${props.icon}`}></span></span>
        </>)
        }
        const ButtonCard = (props) =>{
        return(<>
                <span size='small' className='rounded-pill btn-imprimer ps-3 pe-3 pt-2 pb-2' fluid  icon > Enregistrer  <Icon name='print' /> </span>
        </>)
        }
        const VideoCard = (props) =>{
        return(<>
            <meta
                http-equiv="Content-Security-Policy"
                content="frame-src https://www.youtube.com;"
            />
            <iframe
                width="95%"
                height="200px"
                src={`https://www.youtube.com/embed/${props.src}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='border-div'
            ></iframe>
        </>)
        }


        const CommandesCard = () =>{
            return(<>
                <div  className='text-secondary' dir='rtl'>
                    <h1 className='text-center mb-4'>  Commandes & Reservation </h1> 
                    <br /> 
                    <div className='row mb-5'>
                        <div className='col-6 align-sel-center'>
                            <h4 className='font-hs-n system-color mb-4'> قبول و تأكيد طلب طبق Commande </h4>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='p0lKNYidrL0' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <div className='col-6 align-sel-center'>
                            <h4 className='font-hs-n system-color mb-4'>   قبول و تأكيد طلب حجز Reservation  </h4>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='p0lKNYidrL0' />
                        </div>
                    </div>
                </div>
            </>)
        }

        const MenuCard = () =>{
        return(<>
            <div  className='text-secondary' dir='rtl'>
                <h1 className='text-center mb-4'>  Menu </h1> 
                <br /> 
                <div className='row mb-5'>
                    <h4 className='font-hs-n system-color mb-5 '>   كيفية إضافة plat جديد   </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='t7paKkttc2g' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>    تعديل معلومات Plat   </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='p90wBw11pmU' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>   تغيير Ingredient   </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='p0lKNYidrL0' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>   تغيير صورة Plat    </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='ied1yPgznPY' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>  إضافة Familles des Plat  </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='qtzoS14Hrco' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>  تغيير  Familles des Plat  </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='9f6ljprzSIk' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>   إضافة   Article aux Stock   </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='Xw_-rJSdvqM' />
                    </div>
                </div>
                <hr />
                <div className='row mb-5 mt-4'>
                    <h4 className='font-hs-n system-color mb-5 '>   تغيير  معلومات  Article   </h4>
                    <div className='col-6 align-sel-center'>
                        <ul>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                            <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                            <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                            <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                        </ul>
                    </div>
                    <div className='col-6'>
                        <VideoCard src='qtzoS14Hrco' />
                    </div>
                </div>
            </div>
        </>)
        }

        const CaisseCard = () =>{
            return(<>
                <div  className='text-secondary' dir='rtl'>
                    <h1 className='text-center mb-4'>  Caisse </h1> 
                    <br /> 
                    <div className='row mb-5'>
                        <h4 className='font-hs-n system-color mb-5 '>   كيفية إضافة Ciasse جديدة   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='LGHOjjXn5jE' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تعديل معلومات Caisse   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    
                </div>
            </>)
        }

        const FacturesCard = () =>{
            return(<>
                <div  className='text-secondary' dir='rtl'>
                    <h1 className='text-center mb-4'> Factures  </h1> 
                    <br /> 
                    <div className='row mb-5'>
                        <h4 className='font-hs-n system-color mb-5 '>   بحث عن و إضهار فاتوة   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='JSfQpl7Nsvw' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تلخيص الفاتورات حسب مدة زمنية   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='EmDcAYqPrbI' />
                        </div>
                    </div>
                    
                </div>
            </>)
        }

        const ClientCard = () =>{
            return(<>
                <div  className='text-secondary' dir='rtl'>
                    <h1 className='text-center mb-4'>  Clients </h1> 
                    <br /> 
                    <div className='row mb-5'>
                        <h4 className='font-hs-n system-color mb-5 '>   كيفية إضافة Client جديد   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='LGHOjjXn5jE' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تعديل معلومات Client   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    حساب الـFidelité   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    
                </div>
            </>)
        }

        const EquipeCard = () =>{
            return(<>
                <div  className='text-secondary' dir='rtl'>
                    <h1 className='text-center mb-4'>  Equipe </h1> 
                    <br /> 
                    <div className='row mb-5'>
                        <h4 className='font-hs-n system-color mb-5 '>   كيفية إضافة عضو جديد   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='LGHOjjXn5jE' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تعديل معلومات عضو   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>   إضافة وضيفة Poste جديدة </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تعديل وضيفة Poste   </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    كيفية عرض و إضافة الغيابات  </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    عرض و إضافة Avances  </h4>
                        <div className='col-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-6'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    
                </div>
            </>)
        }
    return ( <>
        <Link exaxt='true' to='/S/ma'><Button className='rounded-circle' icon='arrow left' /></Link>
        <br />
        <br />
        <div className='row'>
            <div className='col-9'>
                
                <Tab
                    menu={{ secondary: true, pointing: true }}
                    // menuPosition='left'
                    panes={panes}
                    activeIndex={activeIndex}
                    className='no-menu-tabs mt-2'
                />
            </div>
            <div className='col-3'>
                <div className="sticky-top" style={{top:'70px'}}>
                        <MenuItemCard text='Commandes' icon='calendar2-check' activeI={0} />
                        <MenuItemCard text='Menu' icon='receipt-cutoff' activeI={1} />
                        <MenuItemCard text='Caisses' icon='pc-display-horizontal' activeI={2} />
                        <MenuItemCard text='Facture' icon='receipt-cutoff' activeI={3} />
                        <MenuItemCard text='Clients' icon='person' activeI={4} />
                        <MenuItemCard text='Equipe' icon='person-bounding-box' activeI={5} />
                    {/* <Button className={`rounded mb-1 ${ activeIndex == 0 ? 'border-danger border-3 border-start': '' }`} fluid onClick={ () => setActiveIndex(0)}> <span className='bi bi-x' ></span> Fermer</Button>
                    <Button className={`rounded mb-1 ${ activeIndex == 1 ? 'border-danger border-3 border-start': '' }`} fluid onClick={ () => setActiveIndex(1)}> <span className='bi bi-x' ></span> Fermer</Button>
                    <Button className={`rounded mb-1 ${ activeIndex == 2 ? 'border-danger border-3 border-start': '' }`} fluid onClick={ () => setActiveIndex(2)}> <span className='bi bi-x' ></span> Fermer</Button> */}
                </div>
                <div className="floating-card"  onClick={ () => setModalS(true)}>
                    <i className="bi bi-question-lg"></i>
                </div>
            </div>
        </div>        
        <Modal
                size='small'
                open={modalS}
                dimmer= 'blurring'
                closeIcon
                onClose={() => setModalS(false)}
                onOpen={() => setModalS(true)}
            >
                <Modal.Header><h4> </h4></Modal.Header>
                <Modal.Content scrolling>

                        
                </Modal.Content>
                <Modal.Actions>
                            <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                            {/* <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/ft/info/${selectedArticle.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button> */}
                </Modal.Actions>
        </Modal>

    </> );
}

export default DocumentationPage;