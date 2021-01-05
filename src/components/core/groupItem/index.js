import React from 'react';

import Style from './groupItem.module.css';

function GroupItem({ picture, title, lastMessage, unreadCount}) {
    return (
        <div className={Style.item}>
            <div className={Style.image_box}>
                {
                    picture && <img src={picture} className={Style.image} alt={picture} />
                }
           </div>
            <div className={Style.info_box}>
                <div className={Style.name}>{title}</div>
                {
                    lastMessage && <div className={Style.message}>{lastMessage}</div>
                }
            </div>
            {
                unreadCount > 0 && <div className={Style.count}>{unreadCount}</div>
            }
        </div>
    )
}

export default GroupItem;