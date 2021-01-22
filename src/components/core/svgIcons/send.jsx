import React from 'react';

function Send({fill, width, height, ...props}) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} {...props}>
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.507
             19l-1.507-6-6-1.5 12-4.5-4.493 12z"/>
        </svg>
    )
}

Send.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default Send;





