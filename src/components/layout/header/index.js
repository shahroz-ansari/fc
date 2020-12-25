import React from 'react';
import BackButton from '../../core/svgIcons/backButton';
import MenuDots from '../../core/svgIcons/menuDots';

import Style from './header.module.css';

function Header() {

    return (
        <div className={Style.header}>
            {
                false ? <> <BackButton style={Style.go_back}/>
                    <div className={Style.channel}>
                        <div className={Style.channel_name}>Channel Name</div>
                        <div className={Style.channel_info}>Channel </div>
                    </div>
                </> : <div className={Style.logo}>Fc</div>
            }
            <MenuDots style={Style.menu} />
        </div>
    )
}

export default Header;