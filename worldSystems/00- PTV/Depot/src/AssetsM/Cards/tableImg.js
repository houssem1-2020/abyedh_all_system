import React from 'react';
function TableImage(props) {
     
    return (<> <img className='rounded-circle' 
                    width="40px" 
                    height="40px" 
                    src={props.forStock ? `https://assets.ansl.tn/Images/Articles/${props.image}` : `https://cdn.abyedh.com/images/system/Magazin/${props.image}`} alt="user-img" 
                /> </>);
}

export default TableImage