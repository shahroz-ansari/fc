import React, { useState, useEffect } from 'react';
import BackButton from '../../core/svgIcons/backButton';
import MenuDots from '../../core/svgIcons/menuDots';

import Style from './header.module.css';
import { headerState } from '../../../store/layout';
import { useHistory } from 'react-router-dom';

function Header() {
    const [state, setState] = useState(headerState.value)

    const history = useHistory();

    useEffect(() => {
        const subscription = headerState.subscribe(setState)

        return () => {
            subscription.unsubscribe();
        }
    }, [])
    return (
        <div className={Style.header}>
            {
                !state.logo ? <>
                    <span  onClick={history.goBack}>
                        <BackButton style={Style.go_back}/>
                    </span>
                    <div className={Style.channel}>
                        { state.text && 
                            <div className={Style.channel_name}>{state.text}</div>
                        }
                        { state.subText &&
                            <div className={Style.channel_info}>{state.subText}</div>
                        }
                    </div>
                </> : <div className={Style.logo}>Fc</div>
            }
            <MenuDots style={Style.menu} />
        </div>
    )
}

export default Header;