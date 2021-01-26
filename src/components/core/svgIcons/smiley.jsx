import React from 'react';

function Smiley({fill, width, height, style}) {
    return (
        <svg className={style} width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3.5 
                8c.828 0 1.5.671 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.671-1.5-1.5.672-1.5 1.5-1.5zm-7 0c.828 0 
                1.5.671 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.671-1.5-1.5.672-1.5 1.5-1.5zm3.501 10c-2.801 
                0-4.874-1.846-6.001-3.566l.493-.493c1.512 1.195 3.174 1.931 5.508 1.931 2.333 0 3.994-.736 
                5.506-1.931l.493.493c-1.127 1.72-3.199 3.566-5.999 3.566z"/>
        </svg>
    )
}

Smiley.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default Smiley;