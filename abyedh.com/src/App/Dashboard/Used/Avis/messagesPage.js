import React, { useEffect, useRef, useState } from 'react';
import { Bounce } from 'react-reveal';
import { Button,  Tab, Comment, Loader, Input, Icon } from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import axios from 'axios';
import GConf from '../../../AssetsM/APPConf';
import { toast } from 'react-toastify';
import SKLT from '../../../../AssetsM/Cards/usedSlk';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { BottomSheet } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import { Rating } from 'semantic-ui-react'
import AvatarGroup from '@atlaskit/avatar-group';

function MessagesPages() {
    const [loading , setLoading] = useState(false)
    const [loaderState, setLS] = useState(false)
    const [openD, setOpenD] = useState(false)
    
    const [profileData, setProfileData] = useState([])

    const RatingPanes = [
        {
          menuItem: { key: 'calendar', icon: 'star', content:  'Avis ', },  
          render: () => <RatingProfile />,
        },
        {
            menuItem: { key: 'users', icon: 'comment', content: 'Commentaire ' }, 
            render: () => <CommentsProfile />,
          },
      ] 
     
    /*###############################[UseEffect]################################# */
    useEffect(() => {
        window.scrollTo(0, 0);
  
        axios.post(`${GConf.ApiLink}/profile`, {
            PID: GConf.PID,
            SystemTag : GConf.systemTag
        })
        .then(function (response) {
             
            setProfileData(response.data)

             
            setLoading(true)

        }).catch((error) => {
            if(error.request) {
              toast.error(<><div><h5>Probleme de Connextion</h5> Esseyeé de connecter plus tard</div></>, GConf.TostInternetGonf) 
              
            }
        });
    }, [])
     
    /* Rating */
    const CalculateRating = (table) =>{
        let tot = 0;
        table.map( data => {
            tot = tot + data.Rating
        })
        if (tot == 0) {
            return tot
        } else {
            return parseFloat(tot / table.length).toFixed(1)
        }
        
        //
    }
    const CalculateLikes = (table) =>{
        const WantedValue =  table.length ;
        if ( (WantedValue / 1000) > 1 && (WantedValue / 1000000) < 1) { return parseFloat(WantedValue / 1000 ).toFixed(1) + 'K' }
        else  if ( (WantedValue / 1000000) > 1) { return parseFloat(WantedValue / 1000000 ).toFixed(1) +'M' }
        else{ return parseInt(WantedValue)  }
    }
    const CalculateReview = (table, value ) =>{
        let filteredArray = table.filter(obj => parseInt(obj.Rating) == value );
        if (filteredArray != 0) {
            return(parseInt((filteredArray.length / table.length) * 100 ) )
        } else {
            return 0
        }
        
    }
    const ReturnAvatarGroupList = (list) =>{
        let FinalList = []

        list.map( (data,index) => FinalList.push({ key: index, name: data.Name , src: `https://cdn.abyedh.com/images/p_pic/${data.PictureId}.gif`},))
        return FinalList
    }


    /* */

    const RatingProfile = () =>{
        const RatingBar = (props) => {
            return (<>
                <div className="row">
                    <div className="col-2"><h3>{props.name}</h3></div>
                    <div className="col-8 align-self-center">
                        <div className="progress" style={{height: "5px"}}>
                            <div className="progress-bar bg-warning" role="progressbar" style={{width: `${props.value}%`}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                        </div> 
                    </div>
                    <div className="col-2"><h6>{props.value} %</h6></div>
                </div>
            </>)
        }
        return (<>
            {/* <div className='card card-body shadow-sm border-div mb-2 text-center'> */}
                <h5 className='text-start'>Avis</h5>
                <div className='row text-center'>
                    <div className='col-12 col-lg-4 align-self-center'>
                        <h1 className='text-warning'>{loading ? <> {CalculateRating(profileData.review)}</>: 0 }</h1>
                        <Rating className='d-inline' maxRating={5} defaultRating={loading ? CalculateRating(profileData.review) : 0 } icon='star' disabled size='massive' />
                        <h6 className="pt-2">{loading ? profileData.review.length : 0 } </h6>
                    </div>
                    <div className='col-12 col-lg-8'>
                        <RatingBar name={1} value={loading ? CalculateReview(profileData.review, 1) : 0 } />
                        <RatingBar name={2} value={loading ? CalculateReview(profileData.review, 2) : 0 } />
                        <RatingBar name={3} value={loading ? CalculateReview(profileData.review, 3) : 0 } />
                        <RatingBar name={4} value={loading ? CalculateReview(profileData.review, 4) : 0 } />
                        <RatingBar name={5} value={loading ? CalculateReview(profileData.review, 5) : 0 } />
                    </div>
                </div> 
                <hr />
                <h5>J'aimes</h5>
                {/* <div style={{height:'200px', overflowX:'auto', overflowX:'hidden'}}> */}
                        {/* <h2 className='text-center'>{profileData.likes ? profileData.likes.length : '...'}</h2>  */}
                        <AvatarGroup className='text-center' size="large" maxCount={12} data={ReturnAvatarGroupList(profileData.likes)}   borderColor="#cfcecc" />
                        {/* { loading ?
                        
                            profileData.likes.map( (data,index) => <a href='https://www.abyedh.tn' key={index}>{data.Name}</a>)

                        : 'fa'
                        } */}
                        
                {/* </div>                */}
            {/* </div> */}
        </>)
    }
    const CommentsProfile = () =>{

        const CommentsCard = (props) => {
            return (<>
                    <div className="d-flex mb-2 border-bottom">
                        <div className="flex-shrink-0">
                            <img src={`https://cdn.abyedh.com/images/p_pic/${props.data.PictureId}.gif`} className='rounded-circle' width='30px' alt="..." />
                        </div>
                        <div className="flex-grow-1 ms-3 w-100">
                            <div className='row  mb-0'>
                               <div className='col-6 text-start'>{props.data.Name}</div>
                               <div className='col-6 text-end'><small className='text-secondary'> {new Date (props.data.R_Date).toLocaleDateString()}</small></div>
                            </div>
                            <div><b>{props.data.Comment} </b></div>
                        </div>
                    </div>
            </>)
        }

        return(<>
        
                <div className='row '>
                    <div className='col-12 pe-1'>
                            <h5>Commentaires</h5> 
                            <div style={{height:'200px', overflowX:'auto', overflowX:'hidden'}}>
                                { loading ?
                                    <Comment.Group>
                                    { profileData.review.map( (data,index) =>  <CommentsCard key={index} data={data} /> )}
                                    </Comment.Group>
                                    : '...'
                                }    
                            </div>  
                    </div>
                </div>
        </>)
    }

    return (<>
        
            <h5><span className="bi bi-chat-left-text-fill"></span> Review  </h5>
            <br />
            <div className="container">
                { !loading ? <>...</> : <Tab menu={{ secondary: true, className: 'tab-right'}}  panes={RatingPanes} /> }
            </div>
            <BottomSheet expandOnContentDrag open={openD}  onDismiss={() => setOpenD(!openD)}  >
                <div className='card-body'>
                                        
                 
                 </div>
            </BottomSheet>
    </>);
}

export default MessagesPages;