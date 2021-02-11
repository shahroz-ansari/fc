import React, { useCallback, useRef, useState, useEffect } from 'react';
import style from './chats.module.css';

import Attachment from '../../core/svgIcons/attachment';
import Camera from '../../core/svgIcons/camera';
import Smiley2 from '../../core/svgIcons/smiley2';
import Send from '../../core/svgIcons/send';
import ChatBubble from '../../core/chatBubble';
import { syncUpdateChats } from '../../../store/db';
import { useParams } from 'react-router-dom';
import { _getGroupChats } from '../../../services/local';

function Chats() {
    const textareaRef = useRef(null);
    const [chats, setChats] = useState([]);
    const [text, setText] = useState('');
    const { groupId } = useParams();

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

    useEffect(() => {
        const updateNewChats = async function() {
            const groupChats = await _getGroupChats(groupId);
            groupChats && setChats(groupChats);
        }
        updateNewChats();

        const updateChatsCallback = function(updates) {
            if(updates.indexOf(groupId) > -1){
                syncUpdateChats.remove(groupId);

                updateNewChats();
            }
        };

        const subscription = syncUpdateChats.subscribe(updateChatsCallback);

        return () => {
            subscription.unsubscribe();
        }
    }, [groupId]);

    return (
        <div className={style.container}>
            <div className={style.chats}>
                {
                    chats.map((val, i) => <ChatBubble message={'nnnn'} time={'10:20'} key={i} />)
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