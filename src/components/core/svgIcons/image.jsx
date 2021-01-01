import React from 'react';

function Image({fill, width, height}) {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill={fill}>
            <path d="M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5
             1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 
             5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z"/>
        </svg>
    )
}

Image.defaultProps = {
    fill: 'black',
    width: '24',
    height: '24'
}

export default Image;