import React from 'react';
function TableImage(props) {
     
    return (<> <img className='border-div border p-1 shadow-sm' 
                    width="42px" 
                    height="42px" 
                    src={props.forStock ? `https://cdn.abyedh.com/images/system/transporteur/${props.image}` : `https://cdn.abyedh.com/images/system/transporteur/${props.image}`} alt="user-img" 
                /> </>);
}

export default TableImage