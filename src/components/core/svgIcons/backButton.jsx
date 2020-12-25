import React from 'react';

function BackButton({fill, width, height, style}) {
    return (
        <svg className={style} width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83
                2.829-12.17-11.996z"/>
        </svg>
    )
}

BackButton.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default BackButton;