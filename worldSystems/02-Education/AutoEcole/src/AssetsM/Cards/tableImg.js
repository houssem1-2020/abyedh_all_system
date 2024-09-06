import React from 'react';
function TableImage(props) {
     
    return (<> <img className='rounded-circle' 
                    width="40px" 
                    height="40px" 
                    src={props.forStock ? `https://cdn.abyedh.com/images/system/autoecole/${props.image}` : `https://cdn.abyedh.com/images/system/autoecole/${props.image}`} alt="user-img" 
                /> </>);
}

export default TableImage