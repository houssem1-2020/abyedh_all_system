import axios from 'axios';
import React, { useEffect, useRef,  useState } from 'react';
import { Bounce } from 'react-reveal';
import { Segment , Icon, Input, Button, Loader,  Form, TextArea,  Dropdown} from 'semantic-ui-react';
import GConf from '../../../AssetsM/generalConf';
import SKLT from '../../../AssetsM/Cards/usedSlk';
import NG from './notifGenre';
import { toast } from 'react-toastify';

const SendBox = ({SendMessage, setMesgC,msgContent}) =>{
    return(<>
             <div className='row '>
                <div className='col-10 col-lg-11 align-self-center'>
                <Form>
                    <TextArea placeholder='Ajouter Notes ici' value={msgContent} className="mb-2 border-div" rows='2' onChange={ (e) => setMesgC(e.target.value)}></TextArea>
                </Form>
                </div>
                <div className='col-2 col-lg-1 align-self-center text-center'><Button  icon='send'  className='rounded-circle mb-2' onClick={SendMessage}></Button></div>
            </div>
        </>)
}

function NotificationPage() {
    /* ###############################  Const ################################*/
    const messagesEndRef = useRef(20)
    const [messagesList, setMessageList] = useState([])
    const [msgContent, setMesgC] = useState('')
    const [updateS, setUpdateS] = useState()
    const [loading , setLoading] = useState(false)

    /* ############################### UseEffect ################################*/
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/documentation/messages`, {
            PID: GConf.PID,
        })
        .then(function (response) {
            setMessageList(response.data)
            setLoading(true)
            
        })
        
    }, [updateS])

    /* ############################### Functions ################################*/
 


    /* ############################### Card ################################*/
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

    return (<>
        <div className='text-center'>
            {loading ?  
            <MessagesDetails />
            : SKLT.CardList }
            <div ref={messagesEndRef} />
            <div className='bg-danger'>
                <div className='fixed-bottom '  style={{ width: '80.53%', marginLeft:'19%'}}>
                    <SendBox SendMessage={SendMessage} setMesgC={setMesgC} msgContent={msgContent}/>
                </div>
            </div>
        </div>
    </>);
}

export default NotificationPage;