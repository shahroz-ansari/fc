import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../header';

import style from './home.module.css';

function HomeLayout(props) {
    const location = useLocation();

    return <div className={style.home}>
        <Header />
        {props.children}
    </div>
}

export default HomeLayout;