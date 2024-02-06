import React from 'react';
function TableImage(props) {
     
    return (<> <img className='rounded-circle' 
                    width="40px" 
                    height="40px" 
                    src={props.forStock ? `https://cdn.abyedh.tn/images/system/transporteur/${props.image}` : `https://cdn.abyedh.tn/images/system/transporteur/${props.image}`} alt="user-img" 
                /> </>);
}

export default TableImage