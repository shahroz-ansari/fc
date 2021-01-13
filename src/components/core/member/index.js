import React from 'react';

import Style from './member.module.css';

function Member({ picture, title}) {
    return (
        <div className={Style.item}>
            <div className={Style.image_box}>
                {
                    picture && <img src={picture} className={Style.image} alt={picture} />
                }
            </div>
            <div className={Style.name}>{title}</div>
            <button className={Style.addButton} onClick={() => {console.log('added')}}>Add</button>
        </div>
    )
}

Member.defaultProps = {
    picture: '',
    title: 'Member Name',
}
export default Member;