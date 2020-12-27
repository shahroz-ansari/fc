import React from 'react';

function AddButton({fill, width, height, style}) {
    return (
        <svg className={style} width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6
             13h-5v5h-2v-5h-5v-2h5v-5h2v5h5v2z"/>
        </svg>
    )
}

AddButton.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default AddButton;