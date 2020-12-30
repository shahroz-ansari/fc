import React, { useEffect, useRef, useState } from 'react';

import Style from './tabs.module.css';

function Tabs() {
    const [activeTab, setActiveTab] = useState(1);
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
    return (
        <div className={Style.tabs} ref={tabsRef}>
            <div className={Style.slider} ref={sliderRef}></div>
            <div className={`${Style.tab} ${activeTab === 1 ? Style.active : '' }`}
                onClick={(e) => {
                    setSlider(e)
                    setActiveTab(1);
                }}>Groups</div>
            <div id="test" className={`${Style.tab} ${activeTab === 2 ? Style.active : '' }`}
                onClick={(e) => {
                    setSlider(e)
                    setActiveTab(2);
                }}>Invitations</div>
            <div className={`${Style.tab} ${activeTab === 3 ? Style.active : '' }`}
                onClick={(e) => {
                    setSlider(e)
                    setActiveTab(3);
                }}>Friends</div>
        </div>
    )
}

export default Tabs;