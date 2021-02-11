import React from 'react';

import style from './chatBubble.module.css';

function ChatBubble({ message, time }) {
    return (
        <div className={style.bubble}>
            <div className={style.text}>{message}</div>
            <div className={style.info}>
                <div className={style.time}>{time}</div>
            </div>
        </div>
    )
}

export default ChatBubble;