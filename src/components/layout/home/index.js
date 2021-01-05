import React from 'react';
// import { useLocation } from 'react-router-dom';
import Header from '../header';
import Tabs from '../tabs';

import style from './home.module.css';

function HomeLayout(props) {
    // const location = useLocation();

    return <div className={style.home}>
        <Header />
        <Tabs />
        {props.children}
    </div>
}

export default HomeLayout;