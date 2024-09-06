import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Modal, Tab , Segment, Form, TextArea, Accordion, Embed,} from 'semantic-ui-react';
import GConf from '../../../AssetsM/generalConf';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation, Trans } from 'react-i18next';

const SendBox = ({SendMessage, setMesgC,msgContent}) =>{
    const { t, i18n } = useTranslation();
    return(<>
             <div className='row '>
                <div className='col-10 align-self-center'>
                <Form>
                    <TextArea placeholder={t('communUsed.documentPage.savModal.inputPlch')} value={msgContent} className="mb-2 rounded-pill" rows='1' onChange={ (e) => setMesgC(e.target.value)}></TextArea>
                </Form>
                </div>
                <div className='col-2 align-self-center text-end'><Button  icon='send'  className='rounded-circle mb-2' onClick={SendMessage}></Button></div>
            </div>
        </>)
}

function DocumentationPage() {
    /*############################ CONST #############################*/
    const { t, i18n } = useTranslation();
    const messagesEndRef = useRef(20)
    const [messagesList, setMessageList] = useState([])
    const [msgContent, setMesgC] = useState('')
    const [updateS, setUpdateS] = useState()
    const [loading , setLoading] = useState(false)

    const [modalS, setModalS] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const [activeAccoedIndex, setActiveAccordIndex] = useState(50)
    const panes = [
        { 
            menuItem: { key: '00', icon: 'calendar alternate', content: 'Commandes'},  
            render: () => <SouscriptionCard /> 
        },
        { 
            menuItem: { key: '01', icon: 'file alternate', content:'Factures'},
            render: () => <AbonnemmentCard /> 
        },
        { 
            menuItem: { key: '02', icon: 'list', content: 'Menu'}, 
            render: () => <SeanceCard /> 
        },
        { 
            menuItem: { key: '03', icon: 'desktop', content: 'Caisse'}, 
            render: () => <EquipemmentCard /> 
        },
        { 
            menuItem: { key: '04', icon: 'user', content: 'Clients'}, 
            render: () => <MmebreCrad /> 
        },
        { 
            menuItem: { key: '05', icon: 'user', content: 'Equipe'},
            render: () => <EquipeCard /> 
        },
      ]

    /*############################ USEEFFECT #########################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/documentation/messages`, {
            PID: GConf.PID,
        })
        .then(function (response) {
            setMessageList(response.data)
            setLoading(true)
            
        })
        
    }, [updateS])
    /*############################ FUNCTION ##########################*/

    /*############################ CARD ##############################*/
        const MenuItemCard = (props) =>{
        return(<>
            <div className={`card p-2 rounded mb-1 btn ${ activeIndex == props.activeI ? 'activeDocItem ': '' }`} onClick={ () => setActiveIndex(props.activeI)}>
                <div className='row'>
                    <div className='col-4 system-color'><span className={`bi bi-${props.icon} bi-xsm`}></span></div> 
                    <div className='col-8 text-start align-self-center'><h5>{props.text}</h5></div> 

                </div>
            </div>
        </>)
        }
        const TabCard = (props) =>{
        return(<>
            <span className=' ms-1 me-2 border-bottom border-dark border-2'> {props.text} <Icon name={props.icon} className='me-0'  /></span>
        </>)
        }
        const NavCard = (props) =>{
        return(<>
            <span className='ms-2 me-2 abyedh-list-a p-2' > {props.text} <span className={`bi bi-${props.icon}`}></span></span>
        </>)
        }
        const NavTabCard = (props) =>{
            return(<>
                <span className=' bg-gray rounded p-2' > {props.text} <span className={`bi bi-${props.icon}`}></span></span>
            </>)
        }
        const ButtonCard = (props) =>{
            return(<>
                    <span size='small' className='rounded-pill btn-imprimer ps-3 pe-3 pt-2 pb-2 d-inline-block'   > <Icon name={props.icon} className={`${props.reversed ? '': 'd-none'}`} /> {props.text}  <Icon name={props.icon} className={`${props.reversed ? 'd-none': ''}`} /> </span>
            </>)
        }
        const SubMainLinkCard = (props) =>{
            return(<>
                    <span size='small' className='rounded-pill  border  ps-3 pe-3 pt-2 pb-2 d-inline-block shadow-sm' fluid  icon style={{color: GConf.themeColor}}> {props.text} <span className={`bi bi-${props.icon}`} ></span>    </span>
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
        //documentaion
        const SouscriptionCard = () =>{
            return(<>
                <Accordion fluid styled dir='rtl' className='mb-4'>
                    <Accordion.Title
                    active={activeAccoedIndex === 0}
                    index={0}
                    onClick={() => {activeAccoedIndex === 0 ? setActiveAccordIndex(1000): setActiveAccordIndex(0)}}
                    >
                    <h4 className='font-hs-n system-color p-3'> قبول و تأكيد إشتراك  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 0}>
                        <div className='row mb-5'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Souscription' icon='receipt-cutoff' /> </li>
                                    {/* <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavTabCard text='Commande' icon='cart-dash' /> </li> */}
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الطلب المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> ستضهر لك معلومات طلب الإشتراك . إختر Annulee أو S'abonner حسب الحالة التي تريد </span>   </li>
                                    <li className='mb-3'> <span className='font-hs-n '> في حالة S'abonner  قم بادخال معلومات الإشتراك المطلوبة ثم أنقر علي </span>  <ButtonCard text='Enregistrer'   icon='save' />    </li>
                                    
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='H1TdfEuqiQw'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/H1TdfEuqiQw/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    {/* <Accordion.Title
                    active={activeAccoedIndex === 1}
                    index={1}
                    onClick={() => {activeAccoedIndex === 1 ? setActiveAccordIndex(1000): setActiveAccordIndex(1)}}
                    >
                   <h4 className='font-hs-n system-color p-3'> قبول و تأكيد طلب حجز Reservation  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 1}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Commandes' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavTabCard text='Reservation' icon='calendar2-week' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الحجز المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> ستضهر لك معلومات الحجز . إختر Annulee أو Acceptee حسب الحالة التي تريد </span>   </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='Osv0pNfxJ8o'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/Osv0pNfxJ8o/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content> */}
                </Accordion>
                <br /> 

            </>)
        }
        const EquipemmentCard = () =>{
        return(<>
            <Accordion fluid styled dir='rtl' className='mb-4'>
                    <Accordion.Title
                        active={activeAccoedIndex === 0}
                        index={0}
                        onClick={() => {activeAccoedIndex === 0 ? setActiveAccordIndex(1000): setActiveAccordIndex(0)} }
                        >
                        <h4 className='font-hs-n system-color p-3'>كيفية إضافة ألة جديدة   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 0}>
                        <div className='row mb-5'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='t7paKkttc2g'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/t7paKkttc2g/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 1}
                        index={1}
                        onClick={() => {activeAccoedIndex === 1 ? setActiveAccordIndex(1000): setActiveAccordIndex(1)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تعديل معلومات ألة   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 1}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الطبق المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='p90wBw11pmU'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/p90wBw11pmU/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    {/* <Accordion.Title
                        active={activeAccoedIndex === 2}
                        index={2}
                        onClick={() => {activeAccoedIndex === 2 ? setActiveAccordIndex(1000): setActiveAccordIndex(2)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  تغيير Ingredient   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 2}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الطبق المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Ingredient' icon='tasks' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  مكونات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='RhTyaHoxFlM'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/RhTyaHoxFlM/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content> */}

                    <Accordion.Title
                        active={activeAccoedIndex === 3}
                        index={3}
                        onClick={() => {activeAccoedIndex === 3 ? setActiveAccordIndex(1000): setActiveAccordIndex(3)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تغيير صورة ألة  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 3}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الطبق المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Image' icon='image' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  مكونات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='ied1yPgznPY'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/ied1yPgznPY/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 4}
                        index={4}
                        onClick={() => {activeAccoedIndex === 4 ? setActiveAccordIndex(1000): setActiveAccordIndex(4)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  إضافة Familles des equipemment  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 4}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Famille des Plats" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  علي اليمين قم بإدخال جميع بيانات عائلة الأطباق الجديدة </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='qtzoS14Hrco'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/qtzoS14Hrco/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 5}
                        index={5}
                        onClick={() => {activeAccoedIndex === 5 ? setActiveAccordIndex(1000): setActiveAccordIndex(5)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تغيير  Familles des equipemment    <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 5}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Famille des Plats" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> علي يمين العائلة قم بالنقر علي </span> <b className='ms-2 me-2'> <span className='btn rounded-circle ' style={{backgroundColor: GConf.themeColor}}><span className='bi bi-pencil-square text-white'></span></span> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  ستضهر لك نافدة علي الشاشة قم من خلالها بتغيير المعلومات المطلوبة</span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='9f6ljprzSIk'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/9f6ljprzSIk/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    {/* <Accordion.Title
                        active={activeAccoedIndex === 6}
                        index={6}
                        onClick={() => {activeAccoedIndex === 6 ? setActiveAccordIndex(1000): setActiveAccordIndex(6)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  إضافة   Article aux Stock   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 6}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> <SubMainLinkCard text='Stock' icon='box-seam-fill' /> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  علي اليمين قم بإدخال جميع بيانات عائلة الأطباق الجديدة </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='Xw_-rJSdvqM'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/Xw_-rJSdvqM/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content> 

                    <Accordion.Title
                        active={activeAccoedIndex === 7}
                        index={7}
                        onClick={() => {activeAccoedIndex === 7 ? setActiveAccordIndex(1000): setActiveAccordIndex(7)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  تغيير  معلومات  Article   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 7}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> <SubMainLinkCard text='Stock' icon='box-seam-fill' /> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الطبق المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='-k5K305Ny7Q'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/-k5K305Ny7Q/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>*/}
            </Accordion>
        </>)
        }
        const SeanceCard = () =>{
            return(<>
                <Accordion fluid styled dir='rtl' className='mb-4'>
                    <Accordion.Title
                        active={activeAccoedIndex === 0}
                        index={0}
                        onClick={() => {activeAccoedIndex === 0 ? setActiveAccordIndex(1000): setActiveAccordIndex(0)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> كيفية إضافة حصة جديدة  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 0}>
                        <div className='row mb-5'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Caisse' icon='pc-display-horizontal' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Ajouter Caisse" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الـ Caisse </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='LGHOjjXn5jE'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/LGHOjjXn5jE/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 1}
                        index={1}
                        onClick={() => {activeAccoedIndex === 1 ? setActiveAccordIndex(1000): setActiveAccordIndex(1)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  تعديل معلومات حصة   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 1}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Caisse' icon='pc-display-horizontal' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الـCaisse  بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات الـ الـCaisse </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='4Ujx7nQi8XQ'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/4Ujx7nQi8XQ/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 2}
                        index={2}
                        onClick={() => {activeAccoedIndex === 2 ? setActiveAccordIndex(1000): setActiveAccordIndex(2)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  حذف حصة   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 2}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Caisse' icon='pc-display-horizontal' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الـCaisse  بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات الـ الـCaisse </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='4Ujx7nQi8XQ'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/4Ujx7nQi8XQ/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                </Accordion>
            </>)
        }
        const AbonnemmentCard = () =>{
            return(<>
                <Accordion fluid styled dir='rtl' className='mb-4'>
                    <Accordion.Title
                        active={activeAccoedIndex === 0}
                        index={0}
                        onClick={() => {activeAccoedIndex === 0 ? setActiveAccordIndex(1000): setActiveAccordIndex(0)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> إضافة إشتراك جديد <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 0}>
                         
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 1}
                        index={1}
                        onClick={() => {activeAccoedIndex === 1 ? setActiveAccordIndex(1000): setActiveAccordIndex(1)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> بحث عن و إضهار إشتراك  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 1}>
                        <div className='row mb-5'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Abonnemment' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر إشتراك  بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  يمكنك من خلال الواجهة التي ضهرت أن تقوم بمتابعة عدد الحصص المسجلة و الحصص المتبقية  </span>      </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='JSfQpl7Nsvw'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/JSfQpl7Nsvw/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>
                    
                    <Accordion.Title
                        active={activeAccoedIndex === 2}
                        index={2}
                        onClick={() => {activeAccoedIndex === 2 ? setActiveAccordIndex(1000): setActiveAccordIndex(2)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تلخيص الإشتراكات حسب مدة زمنية   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 2}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Facture' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Resumer" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال تاريخ بذأ و نهاية التلخيص  </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Recherche' icon='search' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> للطباعة أنقر علي زر </span>    <ButtonCard text='Imprimer' icon='print' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='EmDcAYqPrbI'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/EmDcAYqPrbI/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 3}
                        index={3}
                        onClick={() => {activeAccoedIndex === 3 ? setActiveAccordIndex(1000): setActiveAccordIndex(3)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> تحيين معلومات إشتراك <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 3}>
                         
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 4}
                        index={4}
                        onClick={() => {activeAccoedIndex === 4 ? setActiveAccordIndex(1000): setActiveAccordIndex(4)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> إضافة إستخلاص لإشتراك <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 4}>
                         
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 5}
                        index={5}
                        onClick={() => {activeAccoedIndex === 5 ? setActiveAccordIndex(1000): setActiveAccordIndex(5)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> تجديد إشتراك <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 5}>
                         
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 6}
                        index={6}
                        onClick={() => {activeAccoedIndex === 6 ? setActiveAccordIndex(1000): setActiveAccordIndex(6)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  إضافة   Offre    <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 6}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> <SubMainLinkCard text='Stock' icon='box-seam-fill' /> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  علي اليمين قم بإدخال جميع بيانات عائلة الأطباق الجديدة </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='Xw_-rJSdvqM'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/Xw_-rJSdvqM/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 7}
                        index={7}
                        onClick={() => {activeAccoedIndex === 7 ? setActiveAccordIndex(1000): setActiveAccordIndex(7)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تغيير  معلومات  Offre   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 7}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> <SubMainLinkCard text='Stock' icon='box-seam-fill' /> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الطبق المستهدف بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='-k5K305Ny7Q'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/-k5K305Ny7Q/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion>
            </>)
        }
        const MmebreCrad = () =>{
            return(<>
                <Accordion fluid styled dir='rtl' className='mb-4'>
                    <Accordion.Title
                        active={activeAccoedIndex === 0}
                        index={0}
                        onClick={() => {activeAccoedIndex === 0 ? setActiveAccordIndex(1000): setActiveAccordIndex(0)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> كيفية إضافة عضو جديد  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 0}>
                        <div className='row mb-5'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Client' icon='person' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Client" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الـ Client </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='IXrPhfhdOSU'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/IXrPhfhdOSU/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 1}
                        index={1}
                        onClick={() => {activeAccoedIndex === 1 ? setActiveAccordIndex(1000): setActiveAccordIndex(1)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  تعديل معلومات عضو  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 1}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Client' icon='person' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر الـClient  بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات الـ الـClient </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='t3adb95a6sI'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/t3adb95a6sI/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 2}
                        index={2}
                        onClick={() => {activeAccoedIndex === 2 ? setActiveAccordIndex(1000): setActiveAccordIndex(2)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  تفعيل عضو    <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 2}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='DtDc665rxDk'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/DtDc665rxDk/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 3}
                        index={3}
                        onClick={() => {activeAccoedIndex === 3 ? setActiveAccordIndex(1000): setActiveAccordIndex(3)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  إضافة مجموعة جديدة  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 3}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Famille des Plats" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  علي اليمين قم بإدخال جميع بيانات عائلة الأطباق الجديدة </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='qtzoS14Hrco'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/qtzoS14Hrco/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 4}
                        index={4}
                        onClick={() => {activeAccoedIndex === 4 ? setActiveAccordIndex(1000): setActiveAccordIndex(4)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تغيير  معلومات مجموعة    <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 4}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Famille des Plats" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> علي يمين العائلة قم بالنقر علي </span> <b className='ms-2 me-2'> <span className='btn rounded-circle ' style={{backgroundColor: GConf.themeColor}}><span className='bi bi-pencil-square text-white'></span></span> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  ستضهر لك نافدة علي الشاشة قم من خلالها بتغيير المعلومات المطلوبة</span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='9f6ljprzSIk'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/9f6ljprzSIk/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                </Accordion>
            </>)
        }
        const EquipeCard = () =>{
            return(<>
                <div  className='text-secondary  d-none' dir='rtl'>
                    <h1 className='text-center mb-4'>  Equipe </h1> 
                    <br /> 
                    <div className='row mb-5'>
                        <h4 className='font-hs-n system-color mb-5 '>   كيفية إضافة عضو جديد   </h4>
                        <div className='col-12 col-lg-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='pc-display-horizontal' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Membre" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات العضو الجديد </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                            </ul>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <VideoCard src='HuJXDL-xYdI' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تعديل معلومات عضو   </h4>
                        <div className='col-12 col-lg-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='pc-display-horizontal' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '>  إختر عضو  بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات العضو </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                            </ul>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <VideoCard src='gy9b8HJC5a8' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>   إضافة وضيفة Poste جديدة </h4>
                        <div className='col-12 col-lg-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Postes" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '>  علي اليمين قم بإدخال جميع بيانات الوضيفة الجديدة </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                            </ul>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <VideoCard src='0UduaGfWYW0' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    تعديل وضيفة Poste   </h4>
                        <div className='col-12 col-lg-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Postes" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> علي يمين العائلة قم بالنقر علي </span> <b className='ms-2 me-2'> <span className='btn rounded-circle ' style={{backgroundColor: GConf.themeColor}}><span className='bi bi-pencil-square text-white'></span></span> </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '>  ستضهر لك نافدة علي الشاشة قم من خلالها بتغيير المعلومات المطلوبة</span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='save' />  </li>
                            </ul>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <VideoCard src='4Ujx7nQi8XQ' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    كيفية عرض و إضافة الغيابات  </h4>
                        <div className='col-12 col-lg-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <VideoCard src='dU8kk6AW164' />
                        </div>
                    </div>
                    <hr />
                    <div className='row mb-5 mt-4'>
                        <h4 className='font-hs-n system-color mb-5 '>    عرض و إضافة Avances  </h4>
                        <div className='col-12 col-lg-6 align-sel-center'>
                            <ul>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                            </ul>
                        </div>
                        <div className='col-12 col-lg-6 align-self-center'>
                            <VideoCard src='FnSLkbfkrzY' />
                        </div>
                    </div>
                </div>
                <Accordion fluid styled dir='rtl' className='mb-4'>
                    <Accordion.Title
                        active={activeAccoedIndex === 0}
                        index={0}
                        onClick={() => {activeAccoedIndex === 0 ? setActiveAccordIndex(1000): setActiveAccordIndex(0)} }
                        >
                        <h4 className='font-hs-n system-color p-3'> كيفية إضافة عضو جديد  <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 0}>
                        <div className='row mb-5'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='pc-display-horizontal' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Membre" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات العضو الجديد </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='HuJXDL-xYdI'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/HuJXDL-xYdI/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 1}
                        index={1}
                        onClick={() => {activeAccoedIndex === 1 ? setActiveAccordIndex(1000): setActiveAccordIndex(1)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تعديل معلومات عضو   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 1}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='pc-display-horizontal' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  إختر عضو  بالنقر علي </span>    <ButtonCard text='Info' reversed  icon='arrow right' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Modifier' icon='edit' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بتعديل  بيانات العضو </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='edit' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='gy9b8HJC5a8'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/gy9b8HJC5a8/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 2}
                        index={2}
                        onClick={() => {activeAccoedIndex === 2 ? setActiveAccordIndex(1000): setActiveAccordIndex(2)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  إضافة وضيفة Poste جديدة    <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 2}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Postes" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  علي اليمين قم بإدخال جميع بيانات الوضيفة الجديدة </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Enregistrer' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='0UduaGfWYW0'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/0UduaGfWYW0/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 3}
                        index={3}
                        onClick={() => {activeAccoedIndex === 3 ? setActiveAccordIndex(1000): setActiveAccordIndex(3)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> تعديل وضيفة Poste <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 3}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Equipe' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Postes" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> علي يمين العائلة قم بالنقر علي </span> <b className='ms-2 me-2'> <span className='btn rounded-circle ' style={{backgroundColor: GConf.themeColor}}><span className='bi bi-pencil-square text-white'></span></span> </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '>  ستضهر لك نافدة علي الشاشة قم من خلالها بتغيير المعلومات المطلوبة</span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Modifier' icon='save' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='4Ujx7nQi8XQ'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/4Ujx7nQi8XQ/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 4}
                        index={4}
                        onClick={() => {activeAccoedIndex === 4 ? setActiveAccordIndex(1000): setActiveAccordIndex(4)}}
                        >
                        <h4 className='font-hs-n system-color p-3'>  كيفية عرض و إضافة الغيابات   <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 4}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='dU8kk6AW164'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/dU8kk6AW164/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>

                    <Accordion.Title
                        active={activeAccoedIndex === 5}
                        index={5}
                        onClick={() => {activeAccoedIndex === 5 ? setActiveAccordIndex(1000): setActiveAccordIndex(5)}}
                        >
                        <h4 className='font-hs-n system-color p-3'> عرض و إضافة Avances    <Icon className='float-start' name='dropdown' /></h4>
                    </Accordion.Title>
                    <Accordion.Content active={activeAccoedIndex === 5}>
                        <div className='row mb-5 mt-4'>
                            <div className='col-12 col-lg-6 align-sel-center'>
                                <ul>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span><NavCard text='Menu' icon='receipt-cutoff' /> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بالنقر علي </span> <b className='ms-2 me-2'> "Nouveaux Plat" </b> </li>
                                    <li className='mb-3'> <span className='font-hs-n '> إختر </span>    <TabCard text='Commandes' />  </li>
                                    <li className='mb-3'> <span className='font-hs-n '> قم بإدخال جميع بيانات الطبق </span>      </li>
                                    <li className='mb-3'> <span className='font-hs-n '> أنقر علي زر </span>    <ButtonCard text='Menu' icon='receipt-cutoff' />  </li>
                                </ul>
                            </div>
                            <div className='col-12 col-lg-6 align-self-center'>
                                <Embed
                                    id='FnSLkbfkrzY'
                                    source='youtube'
                                    className='rounded'
                                    placeholder='https://img.youtube.com/vi/FnSLkbfkrzY/maxresdefault.jpg'
                                />
                            </div>
                        </div>
                    </Accordion.Content>
                </Accordion>
            </>)
        }
        //Messages 
        const SendMessage = () =>{
            if (!msgContent) {toast.error("Message Vide !", GConf.TostErrorGonf)}
            else{
                axios.post(`${GConf.ApiLink}/documentation/ajouter`, {
                    PID: GConf.PID,
                    msgC: msgContent,
                })
                .then(function (response) {
                    if(response.data.affectedRows) {
                        setUpdateS(Math.random() * 10);
                        setMesgC('')
                        toast.success("Envoyer", GConf.TostSuucessGonf)
                    }
                    else{
                        toast.error('Erreur', GConf.TostSuucessGonf)
                    }
                })

            }
        }
        const SentMessage = (props) => {
            return(<>
                    <div className="row">
                        <div className='col-2 align-self-center text-end text-secondary'><small>{props.content.Sent_Time}</small></div>
                        <div className='col-10'>
                            <div className="d-flex ">
                                <div className="flex-grow-1 me-1">
                                <div className='text-end'><small className='text-secondary'>{new Date(props.content.Sent_Date).toLocaleDateString('en-US')}</small></div>
                                    <div className='card p-2 rounded-message-s mb-3 ps-4 pe-2' style={{backgroundColor:'#f0d584'}}  >{props.content.Content}</div>
                                </div>
                                <div className="flex-shrink-0 ">
                                    <img src={`https://cdn.abyedh.com/images/ads/${GConf.systemTag}.svg`} alt="." className="p-0" width="50px" height="50px"/>
                                </div>
                            </div>
                        </div>
                    </div>     
                </>)
        }
        const RecivedMessage = (props) => {
            return(<>
                    <div className="row">
                        <div className='col-10'>
                            <div className="d-flex ">
                                    <div className="flex-shrink-0 ">
                                        <img src={`https://cdn.abyedh.com/Images/logo/main-lago.gif`} alt="." className="p-0 rounded-circle" width="38px" height="38px"/>
                                    </div>
                                    <div className="flex-grow-1 ms-1">
                                        <small className='text-secondary'>{props.content.Sender} ( {new Date(props.content.Sent_Date).toLocaleDateString('en-US')} )</small>
                                        <div className='card p-2 rounded-message-r  mb-3 ps-2 pe-4' style={{backgroundColor:'#8affc9'}}>{props.content.Content}</div>
                                    </div>
                            </div>
                            
                        </div>
                        <div className='col-2 align-self-center text-start text-secondary'><small>{props.content.Sent_Time}</small></div>
                    </div> 
                    
                </>)
        }
        const MessagesDetails = () =>{

            return(
                    messagesList.map( (convMsg,index) => convMsg.Sender == 'SYSTEM' ? <SentMessage key={index} content={convMsg} /> : <RecivedMessage  key={index} content={convMsg} />)
                    )

        }
        return ( <>
            <Link exaxt='true' to='/S/ma'><Button className='rounded-circle' icon='arrow left' /></Link>
            <br />
            <br />
            <div className='row'>
                <div className='col-12 col-lg-3'>
                    <div className="sticky-top" style={{top:'70px'}}>
                        {GConf.Documentation.map((data,index) => <MenuItemCard key={index} text={t(`communUsed.documentPage.itemsList.${data.id}`)} icon={data.icon} activeI={data.activeI} />)}
                    </div>
                    <div className="floating-card" style={{zIndex: 10000}} onClick={ () => setModalS(true)}>
                        <i className="bi bi-question-lg"></i>
                    </div>
                </div>
                <div className='col-12 col-lg-9 mb-5'>
                    
                    <Tab
                        menu={{ secondary: true, pointing: true }}
                        // menuPosition='left'
                        panes={panes}
                        activeIndex={activeIndex}
                        className='no-menu-tabs mt-2'
                    />
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
                    <Modal.Header><h4> {t('communUsed.documentPage.savModal.title')} </h4></Modal.Header>
                    <Modal.Content scrolling>
                        {/* {messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })} */}
                        {/* <div style={{height:'450px', overflowX:'auto', overflowX:'hidden', }}> */}
                        {loading ?  
                        <MessagesDetails />
                        : SKLT.CardList }
                        <div ref={messagesEndRef} />
                        {/* </div>    */}
                        
                    </Modal.Content>
                    <Modal.Actions>
                                <SendBox SendMessage={SendMessage} setMesgC={setMesgC} msgContent={msgContent}/>
                               {/* <Button className='rounded-pill' negative onClick={ () => setModalS(false)}> <span className='bi bi-x' ></span> Fermer</Button>
                                 <Button className='rounded-pill bg-system-btn'   onClick={ (e) => NavigateFunction(`/S/ft/info/${selectedArticle.F_ID}`)}><span className='d-none d-lg-inline'> Info </span><Icon  name='angle right' /></Button> */}
                    </Modal.Actions>
            </Modal>

        </> );
}

export default DocumentationPage;