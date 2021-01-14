import React from 'react';
import Header from '../header';
import Tabs from '../tabs';

import style from './home.module.css';

function HomeLayout(props) {

    return <div className={style.home}>
        <Header />
        <Tabs />
        {props.children}
    </div>
}

export default HomeLayout;