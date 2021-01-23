import React from 'react';

import Style from './member.module.css';

function Member({ picture, name, status, handleAdd }) {
    return (
        <div className={Style.item}>
            <div className={Style.image_box}>
                {
                    picture && <img src={picture} className={Style.image} alt={picture} />
                }
            </div>
            <div className={Style.name}>{name}</div>
            {
                status === 0 &&
                <button className={Style.addButton} onClick={handleAdd}>Add</button>
            }
            {
                status === 1 && <p>&#10004;</p>
            }
        </div>
    )
}

Member.defaultProps = {
    picture: '',
    name: '',
    handleAdd: () => { },
    status: 0 // 0 can add, 1 already added, 2 add request already sent
}
export default Member;