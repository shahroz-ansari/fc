import React from 'react';

import Style from './listItem.module.css';

function ListItem() {
    return (
        <div className={Style.item}>
            <div className={Style.image_box}></div>
            <div className={Style.info_box}>
                <div className={Style.name}>Happy Family</div>
                <div className={Style.message}>last unread message</div>
            </div>
            <div className={Style.count}>4</div>
        </div>
    )
}

export default ListItem;