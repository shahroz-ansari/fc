import React from 'react';

function MenuDots({fill, width, height, style}) {
    return (
        <svg className={style} width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path d="M12 18c1.657 0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657
             0 3 1.343 3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3zm0-9c1.657 0 3 1.343 3 3s-1.343 
             3-3 3-3-1.343-3-3 1.343-3 3-3z"/>
        </svg>
    )
}

MenuDots.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default MenuDots;