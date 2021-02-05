import React, { useCallback, useRef, useState, useEffect } from 'react';
import style from './chats.module.css';

import Attachment from '../../core/svgIcons/attachment';
import Camera from '../../core/svgIcons/camera';
import Smiley2 from '../../core/svgIcons/smiley2';
import Send from '../../core/svgIcons/send';

function Chats() {
    const textareaRef = useRef(null);
    const [chats, setChats] = useState(['defualt Text message']);
    const [text, setText] = useState('');

    const handleInputBahavior = useCallback(
        ((max, ptb) => {
            let prevTextLength;
            let baseHeight;
    
            return () => {
                const el = textareaRef.current;
                baseHeight === undefined && (baseHeight = el.clientHeight)
                el.textLength < prevTextLength && (el.style.height = `${baseHeight - ptb}px`)
                
                if(ptb !== undefined) {
                    const height = el.scrollHeight - ptb;
                    el.style.height = height <= max ? `${height}px` : `${max}px`;
                }
                prevTextLength = el.textLength;
            }
    
        })(100, 4), []
    )

    useEffect(() => {
        handleInputBahavior();
    }, [chats, text])

    return (
        <div className={style.container}>
            <div className={style.chats}>
                {
                    chats.map((val, i) => {
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
                            ref={textareaRef}
                            className={style.input} 
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            rows={1} 
                            cols={10}
                            placeholder={'Type a message'}>
                        </textarea>
                    <Attachment className={style.icons} fill={'#888'} />
                    <Camera className={style.icons} fill={'#888'} />
                </div>
                <Send 
                    fill={'#009688'} 
                    className={style.send} 
                    width={40} 
                    height={40}
                    onClick={() => {
                        setChats([...chats, text]);
                        setText('');
                    }} />
            </div>
        </div>
    )
}

export default Chats;