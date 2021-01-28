import React from 'react';

function CheckMark({fill, width, height, ...props}) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={fill} {...props}>
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-1.25
             17.292l-4.5-4.364 1.857-1.858 2.643 2.506 5.643-5.784 1.857 1.857-7.5 7.643z"/>
        </svg>
    )
}

CheckMark.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default CheckMark;