import React, { useState } from 'react';

import Style from './tabs.module.css';

function Tabs() {
    const [activeTab, setActiveTab] = useState(1)
    return (
        <div className={Style.tabs}>
            <div className={`${Style.tab} ${activeTab === 1 ? Style.active : '' }`} onClick={() => setActiveTab(1)}>Groups</div>
            <div className={`${Style.tab} ${activeTab === 2 ? Style.active : '' }`} onClick={() => setActiveTab(2)}>Invitations</div>
            <div className={`${Style.tab} ${activeTab === 3 ? Style.active : '' }`} onClick={() => setActiveTab(3)}>Friends</div>
        </div>
    )
}

export default Tabs;