import React, { useEffect, useRef, useState } from 'react';

import Style from './tabs.module.css';
import { useHistory, useLocation } from 'react-router-dom';
import { tabsState } from '../../../store/layout';

function Tabs() {
    const [state, setState] = useState(tabsState.value)
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        const subscription = tabsState.subscribe(setState)

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    useEffect(() => {
        switch(location.pathname) {
            case '/groups': tabsState.next({ show: true,  active: 'groups'}); break;
            case '/invitations': tabsState.next({ show: true,  active: 'invitations'}); break;
            default: tabsState.next({ show: false });
        }
    }, [location])

    const sliderRef = useRef(null);
    const tabsRef = useRef(null);

    useEffect(() => {
        const testSlider = () => {
            const activeEl = tabsRef.current.querySelector(`.${Style.active}`);
            sliderRef.current.style.left = `${activeEl.offsetLeft}px`;
            sliderRef.current.style.width = `${activeEl.offsetWidth}px`;
        };
        
        testSlider();
        window.addEventListener('resize', testSlider);
        
        return () => {
            window.removeEventListener('resize', testSlider);
        }
    }, []);

    function setSlider(e) {
        const width = e.target.offsetWidth + 'px';
        const position = e.target.offsetLeft + 'px';
        sliderRef.current.style.width = width;
        sliderRef.current.style.left = position;
    }

    if (!state.show) {
        return null;
    }
    return (
        <div className={Style.tabs} ref={tabsRef}>
            <div className={Style.slider} ref={sliderRef}></div>
            <div className={`${Style.tab} ${state.active === 'groups' ? Style.active : '' }`}
                onClick={(e) => {
                    setSlider(e)
                    history.push('/groups');
                }}>Groups</div>
            <div id="test" className={`${Style.tab} ${state.active === 'invitations' ? Style.active : '' }`}
                onClick={(e) => {
                    setSlider(e)
                    history.push('/invitations');
                    
                }}>Invitations</div>
        </div>
    )
}

export default Tabs;