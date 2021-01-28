import React from 'react';
import CheckMark from '../../core/svgIcons/checkMark';
import Close from '../../core/svgIcons/close';

import Style from './invitations.module.css';

function Invitations({ picture, name, status, handleAccept, handleDecline }) {
    return (
        <div className={Style.item}>
            <div className={Style.image_box}>
                {
                    picture && <img src={picture} className={Style.image} alt={picture} />
                }
            </div>
            <div className={Style.name}>{name || 'Happy Family'}</div>
            {
                <>
                    <Close fill='crimson' width='33' height='33' onClick={handleDecline} className={Style.close} />
                    <CheckMark fill='#009688' width='33' height='33' onClick={handleAccept} />
                </>
            }
        </div>
    )
}

Invitations.defaultProps = {
    picture: '',
    name: '',
    handleAccept: () => { },
    handleDecline: () => { console.log('decline') }
}
export default Invitations;