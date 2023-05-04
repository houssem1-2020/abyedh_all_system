import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider, Statistic } from 'semantic-ui-react';
import GConf from '../../AssetsM/generalConf';
import SKLT from '../../AssetsM/Cards/usedSlk';
import BackCard from '../Assets/backCard';
import InputLinks from '../Assets/linksData';

function ArticleInfo() {
    let {AID} = useParams()
    const [articleD, setArticleD] = useState({});
    const [loading , setLoading] = useState(false)

    //useEffect
    useEffect(() => {
        axios.post(`${GConf.ApiLink}/stock/article`, {
            tag: GConf.SystemTag,
            code: AID, 
          })
          .then(function (response) {
                setArticleD(response.data[0])
                setLoading(true)
          })
    }, [])

    //card
    const ArticleCard = (props) =>{
        return (<>

           
                <div className='card card-body shadow-sm mb-2 border-div'>
                    <div className="mt-5 text-center">
                            <h1 className='mt-2'>{loading ? props.data.Name : SKLT.BarreSkl } </h1> 
                            <h6 className="text-secondary">  {loading ? <><span className="bi bi-bookmark-star-fill"></span> { props.data.Genre } </>: SKLT.BarreSkl} </h6>
                            <h6 className="text-secondary"> {loading ? <><span className="bi bi-house-heart-fill"></span> { props.data.Socite } </>: SKLT.BarreSkl } </h6>
                            <div className='text-start'>
                                <small>{loading ? props.data.Details : SKLT.BarreSkl } </small> 
                            </div>
                            <Divider horizontal className='text-secondary mt-4'>Prix & STOCK </Divider>
                            <div className='row text-center'>
                                <div className='col-6'>
                                    <Statistic color='green' size='tiny'>
                                    {loading ?  
                                        <Statistic.Value>
                                            {props.data.Quantite}  
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }  
                                        <Statistic.Label>Stock</Statistic.Label>
                                    </Statistic>
                                </div>
                                <div className='col-6'>
                                    <Statistic color='red' size='tiny'>
                                        {loading ?  
                                        <Statistic.Value>
                                            {props.data.Prix_vente.toFixed(3)} 
                                        </Statistic.Value>
                                        : SKLT.ProfileSkl }
                                        <Statistic.Label>Vente</Statistic.Label>
                                    </Statistic>
                                </div>
                            </div>
                    </div>
                </div>

        </>);
    }
    const ImgCard = (props) =>{
        return (<>
                <div className='card card-body shadow-sm mb-2 border-div'>
                   <div className='text-center'>
                        <img src={`https://assets.ansl.tn/Images/Articles/${props.Photo}`} className="img-responsive" width="80%" />
                    </div> 
                </div>
        </>);
    }

    return ( <>
        <BackCard data={InputLinks.backCard.cgInfo}/>
        <br />
         <div className='container-fluid'>
            <ImgCard Photo={articleD.Photo_Path} />
            <ArticleCard data={articleD}/>
         </div>
        </> );
}

export default ArticleInfo