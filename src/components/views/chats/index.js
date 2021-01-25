import React, { useState } from 'react';
import style from './chats.module.css';

import Attachment from '../../core/svgIcons/attachment';
import Camera from '../../core/svgIcons/camera';
import Smiley2 from '../../core/svgIcons/smiley2';
import Send from '../../core/svgIcons/send';

function Chats() {
    function handleBahavior(max, ptb) {
        let prevTextLength;
        let baseHeight;

        return (e) => {
            const el = e.target;
            baseHeight === undefined && (baseHeight = el.clientHeight)
            el.textLength < prevTextLength && (el.style.height = `${baseHeight - ptb}px`)
            
            if(ptb !== undefined) {
                const height = el.scrollHeight - ptb;
                console.log(height, ptb, el.scrollHeight, el.scrollHeight - ptb)
                el.style.height = height <= max ? `${height}px` : `${max}px`;
            }
            prevTextLength = el.textLength;
        }

    }

    return (
        <div className={style.container}>
            <div className={style.chats}>
                {
                    ['Hello!', 'This is FC', 'how are you?', 'another text', 'this is a long text which comes in more than a line', 'this is very very long text which acquires many lines this is very very long text which acquires many lines this is very very long text which acquires many lines', 'more text', 'some more text']
                    .map((val, i) => {
                        return <div className={style.bubble} key={i}>
                            <div className={style.text}>{val}</div>
                            <div className={style.info}>
                                <div className={style.time}>1:05</div>
                            </div>
                        </div>
                    })
                }
            </div>
            <div className={style.footer}>
                <div className={style.inputs}>
                    <Smiley2 className={style.icons} fill={'#888'} />
                        <textarea
                            className={style.input} 
                            onChange={handleBahavior(100, 4)}
                            rows={1} 
                            cols={10}
                            placeholder={'Type a message'}>
                        </textarea>
                    <Attachment className={style.icons} fill={'#888'} />
                    <Camera className={style.icons} fill={'#888'} />
                </div>
                <Send fill={'#009688'} className={style.send} width={40} height={40} />
            </div>
        </div>
    )
}

export default Chats;