import React, { useState, useEffect } from 'react';

import Style from './groupItem.module.css';

function GroupItem({ picture, title, lastMessage, unreadCount}) {
    const [icon, setIcon] = useState(null)
    useEffect(() => {
        if (picture.data) {
            setIcon(`data:${picture.content_type};base64,${picture.data}`)
        } else {
            setIcon(picture)
        }
    }, [picture])
    return (
        <div className={Style.item}>
            <div className={Style.image_box}>
                {
                    icon && <img src={icon} className={Style.image} alt={'Icon'} />
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